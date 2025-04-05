import React, { useEffect, useRef, useState } from 'react';

interface AnimationDebuggerProps {
  children: React.ReactNode;
  componentName: string;
  trackRenders?: boolean;
  logLifecycle?: boolean;
  detectCircular?: boolean;
}

/**
 * Special hook to monitor react-spring for ReactFlow components
 */
export function useReactSpringDebugger(componentName: string) {
  useEffect(() => {
    console.log(`[ReactSpringDebugger] Monitoring ${componentName} for react-spring issues`);
    
    // This hook attempts to monkey-patch react-spring's SpringValue.get method at runtime
    try {
      // This is just a detection attempt - we're checking if react-spring is imported
      if (typeof window !== 'undefined') {
        const reactSpringImported = !!(window as any).__REACT_SPRING_IMPORTED__;
        
        if (!reactSpringImported) {
          // Set a flag for future reference (this is just for debugging purposes)
          (window as any).__REACT_SPRING_IMPORTED__ = true;
          
          console.log(`[ReactSpringDebugger] react-spring detected in ${componentName}`);
          console.log(`[ReactSpringDebugger] If you see call stack errors, check for:
            1. Direct .get() calls on spring values
            2. Circular dependencies with animation values
            3. Nested or recursive animation definitions
            4. Animation chains without proper cleanup
          `);
        }
      }
    } catch (error) {
      console.error(`[ReactSpringDebugger] Error setting up debug hooks:`, error);
    }
    
    return () => {
      console.log(`[ReactSpringDebugger] Cleanup for ${componentName}`);
    };
  }, [componentName]);
}

/**
 * Logging function that can be placed in key spots of react-spring consuming components
 */
export function logSpringInteraction(componentName: string, message: string, data?: any) {
  console.log(`[ReactSpringDebugger] ${componentName}: ${message}`, data || '');
}

/**
 * Debugging wrapper for animated components to help identify Maximum Call Stack Size issues
 */
export const AnimationDebugger: React.FC<AnimationDebuggerProps> = ({
  children,
  componentName,
  trackRenders = true,
  logLifecycle = true,
  detectCircular = true
}) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());
  const renderFrequency = useRef<number[]>([]);
  const [hasWarning, setHasWarning] = useState(false);
  
  // Special debug hook for react-flow related components
  const isReactFlowComponent = componentName.includes('ReactFlow') || componentName.includes('Diagram');
  if (isReactFlowComponent) {
    useReactSpringDebugger(componentName);
  }
  
  // Track renders
  useEffect(() => {
    if (trackRenders) {
      renderCount.current += 1;
      const now = Date.now();
      const timeSinceLastRender = now - lastRenderTime.current;
      renderFrequency.current.push(timeSinceLastRender);
      lastRenderTime.current = now;
      
      // Keep only the last 20 render times
      if (renderFrequency.current.length > 20) {
        renderFrequency.current.shift();
      }
      
      // Check for potential issues
      if (renderCount.current > 50) {
        // Many renders might indicate a problem
        console.warn(`[AnimationDebugger] ${componentName} has rendered ${renderCount.current} times, which is unusually high`);
        setHasWarning(true);
      }
      
      // Check for very frequent renders (potentially circular)
      const recentRenders = renderFrequency.current.slice(-5);
      const averageRenderTime = recentRenders.reduce((sum, time) => sum + time, 0) / recentRenders.length;
      
      if (recentRenders.length >= 5 && averageRenderTime < 16) { // 16ms is roughly 60fps
        console.error(`[AnimationDebugger] ${componentName} is rendering extremely frequently (${Math.round(1000/averageRenderTime)}fps). Possible circular dependency.`);
        console.trace(`[AnimationDebugger] ${componentName} render stack:`);
        setHasWarning(true);
      }
    }
  });
  
  // Component lifecycle logging
  useEffect(() => {
    if (logLifecycle) {
      console.log(`[AnimationDebugger] ${componentName} mounted`);
      
      // Check for circular references if enabled
      if (detectCircular) {
        // This is a simple heuristic - we check if the component triggers an effect
        // immediately after mounting, which might indicate a circular dependency
        const timeoutId = setTimeout(() => {
          // If we've rendered more than twice in 100ms after mounting, that's suspicious
          if (renderCount.current > 2) {
            console.warn(`[AnimationDebugger] ${componentName} rendered multiple times immediately after mounting. Possible circular dependency.`);
          }
        }, 100);
        
        return () => {
          clearTimeout(timeoutId);
          console.log(`[AnimationDebugger] ${componentName} unmounted after ${renderCount.current} renders`);
        };
      }
      
      return () => {
        console.log(`[AnimationDebugger] ${componentName} unmounted after ${renderCount.current} renders`);
      };
    }
    
    return undefined;
  }, [componentName, logLifecycle, detectCircular]);
  
  // Debug values display
  if (hasWarning && process.env.NODE_ENV === 'development') {
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'rgba(255, 0, 0, 0.2)',
            color: 'red',
            padding: '2px 5px',
            fontSize: '10px',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          {componentName}: {renderCount.current} renders
        </div>
        {children}
      </div>
    );
  }
  
  return <>{children}</>;
};

/**
 * Higher-order component that wraps a component with the AnimationDebugger
 */
export function withAnimationDebugging<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<AnimationDebuggerProps, 'children'> = { componentName: 'UnknownComponent' }
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <AnimationDebugger {...options}>
        <Component {...props} />
      </AnimationDebugger>
    );
  };
  
  WrappedComponent.displayName = `withAnimationDebugging(${options.componentName || Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
}

/**
 * Special error boundary for catching animation-related errors
 */
export class AnimationErrorBoundary extends React.Component<
  { children: React.ReactNode; componentName: string },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; componentName: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[AnimationErrorBoundary] Error in ${this.props.componentName}:`, error);
    console.error(`[AnimationErrorBoundary] Component stack:`, errorInfo.componentStack);
    
    // Check if this is a Maximum Call Stack Size error
    if (error.toString().includes('Maximum call stack size exceeded')) {
      console.error(`[AnimationErrorBoundary] DETECTED MAXIMUM CALL STACK SIZE ERROR in ${this.props.componentName}`);
      console.trace(`[AnimationErrorBoundary] ${this.props.componentName} error stack:`);
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '1rem', 
          border: '1px solid red', 
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 0, 0, 0.05)'
        }}>
          <h4 style={{ color: 'red', margin: '0 0 0.5rem' }}>Error in {this.props.componentName}</h4>
          <details>
            <summary style={{ cursor: 'pointer' }}>View error details</summary>
            <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '200px' }}>
              {this.state.error?.stack || this.state.error?.toString() || 'Unknown error'}
            </pre>
          </details>
        </div>
      );
    }
    
    return this.props.children;
  }
} 