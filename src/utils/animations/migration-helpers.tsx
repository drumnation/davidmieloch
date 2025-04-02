import React, { CSSProperties, ReactElement } from 'react';
import { SpringValue, useSpring, animated, to } from '@react-spring/web';
import { safeSpringToCss } from './spring-debug';

// Type definitions for animation variants
export interface AnimationVariant {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  [key: string]: any;
}

// Main interface for animation variants
export interface AnimationVariantsRecord {
  hidden: AnimationVariant;
  visible: AnimationVariant;
  [key: string]: AnimationVariant;
}

// Legacy type alias (kept for backwards compatibility)
export type AnimationVariants = AnimationVariantsRecord;

// Convert Framer Motion variants to CSS transition styles
export const variantToCssTransition = (
  variants: AnimationVariantsRecord,
  currentState: 'hidden' | 'visible' | string = 'visible',
  baseTransition: string = 'all 0.6s ease-out'
): CSSProperties => {
  const variant = variants[currentState];
  
  if (!variant) {
    return {};
  }

  // Create the base style
  const style: CSSProperties = {
    transition: baseTransition,
  };

  // Map variant properties to CSS properties
  if (variant.opacity !== undefined) {
    style.opacity = variant.opacity;
  }

  if (variant.y !== undefined) {
    style.transform = `${style.transform || ''} translateY(${variant.y}px)`.trim();
  }

  if (variant.x !== undefined) {
    style.transform = `${style.transform || ''} translateX(${variant.x}px)`.trim();
  }

  if (variant.scale !== undefined) {
    style.transform = `${style.transform || ''} scale(${variant.scale})`.trim();
  }

  if (variant.rotate !== undefined) {
    style.transform = `${style.transform || ''} rotate(${variant.rotate}deg)`.trim();
  }

  return style;
};

// Convert Framer Motion variants to React Spring config
export const variantToSpringConfig = (
  variants: AnimationVariantsRecord,
  isVisible: boolean = true
) => {
  const targetVariant = isVisible ? variants.visible : variants.hidden;
  
  if (!targetVariant) {
    return {};
  }

  // Create spring config for each property
  const config = {
    from: { ...variants.hidden },
    to: { ...targetVariant },
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
    },
  };

  return config;
};

// Convert Framer Motion animation variants to React Spring
export const useVariantSpring = (
  variants: AnimationVariantsRecord,
  isVisible: boolean = true
) => {
  const springConfig = variantToSpringConfig(variants, isVisible);
  return useSpring(springConfig);
};

/**
 * LEGACY FUNCTION - DO NOT USE IN NEW CODE
 * 
 * Converts spring values to CSS-compatible object.
 * This is an anti-pattern and should be replaced with proper animated components.
 * 
 * @deprecated Use animated components instead:
 *   Bad:  <div style={springToCss(spring)}>
 *   Good: <animated.div style={spring}>
 */
export const springToCss = (springStyles: Record<string, any>) => {
  // Safety check for SSR
  if (typeof window === 'undefined') return {};
  
  try {
    console.warn(
      '[DEPRECATED] springToCss is an anti-pattern causing Maximum Call Stack Size errors. ' +
      'Use <animated.div> components instead. ' +
      'Stack trace:', new Error().stack
    );
  } catch (e) {
    // Ignore errors in warning
  }
  
  // EMERGENCY FIX: Return empty styles to avoid any animation processing
  // This effectively makes any component using springToCss render without animations
  // but prevents the Maximum Call Stack Size errors that crash the app
  console.error('[EMERGENCY] Disabling springToCss animations to prevent app crash');
  return {};
};

/**
 * A safer replacement for inline styling with spring values
 * To be used as a temporary migration path
 * 
 * @example
 * Before: <div style={springToCss(spring)}>Content</div>
 * After:  <SafeAnimated style={spring}>Content</SafeAnimated>
 */
export const SafeAnimated: React.FC<{
  style: Record<string, any>;
  className?: string;
  id?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}> = ({ style, children, as = 'div', ...props }) => {
  const Component = animated[as as keyof typeof animated];
  
  // Special error boundary just for animations
  return (
    <ErrorBoundary fallback={<div {...props}>{children}</div>}>
      <Component style={style} {...props}>
        {children}
      </Component>
    </ErrorBoundary>
  );
};

/**
 * Simple error boundary for animations
 */
class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.error('Animation error caught by boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Proper React Spring component replacement for springToCss
export const AnimatedSpringDiv: React.FC<{
  spring: Record<string, SpringValue<number>> | undefined;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ spring, children, className, style = {} }) => {
  if (!spring) {
    return <div className={className} style={style}>{children}</div>;
  }
  
  const animatedStyle = {
    ...style,
    opacity: spring.opacity,
    transform: combineSpringTransforms(spring)
  };
  
  return (
    <animated.div className={className} style={animatedStyle}>
      {children}
    </animated.div>
  );
};

// Create a CSS transition component that mimics Framer Motion's motion components
export const TransitionDiv: React.FC<{
  variants?: AnimationVariantsRecord;
  initial?: string;
  animate?: string;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ 
  variants, 
  initial = 'hidden', 
  animate = 'visible', 
  children, 
  className, 
  style = {} 
}) => {
  let combinedStyle = style;
  
  if (variants) {
    // Get transition from the visible variant if available
    const transitionDuration = variants.visible?.transition?.duration || 0.6;
    const transitionEase = variants.visible?.transition?.ease || 'ease-out';
    const baseTransition = `all ${transitionDuration}s ${transitionEase}`;
    
    // Combine with variant-based styles
    combinedStyle = {
      ...combinedStyle,
      ...variantToCssTransition(variants, animate, baseTransition)
    };
  }
  
  return (
    <div className={className} style={combinedStyle}>
      {children}
    </div>
  );
};

// Interface for child props that need to be extended with style
interface StyledChildProps {
  style?: CSSProperties;
}

// Create a staggered container for CSS transitions
export const TransitionContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ 
  children, 
  className, 
  style = {} 
}) => {
  // Convert children to array to enable staggering
  const childrenArray = React.Children.toArray(children);
  
  // Add delay to each child for staggering effect
  const staggeredChildren = childrenArray.map((child, index) => {
    if (React.isValidElement<StyledChildProps>(child)) {
      return React.cloneElement(child, {
        style: {
          ...(child.props.style || {}),
          transitionDelay: `${index * 0.1}s`,
        },
      });
    }
    return child;
  });
  
  return (
    <div className={className} style={style}>
      {staggeredChildren}
    </div>
  );
};

// Properly combine transforms for react-spring
export const combineSpringTransforms = (
  spring: Record<string, SpringValue<number>> | undefined
) => {
  if (!spring) return undefined;
  
  const transformProps: [SpringValue<number>, (val: number) => string][] = [];
  
  if (spring.y) {
    transformProps.push([spring.y, (y) => `translateY(${y}px)`]);
  }
  
  if (spring.x) {
    transformProps.push([spring.x, (x) => `translateX(${x}px)`]);
  }
  
  if (spring.scale) {
    transformProps.push([spring.scale, (scale) => `scale(${scale})`]);
  }
  
  if (spring.rotate) {
    transformProps.push([spring.rotate, (rotate) => `rotate(${rotate}deg)`]);
  }
  
  if (transformProps.length === 0) return undefined;
  
  if (transformProps.length === 1) {
    const [springValue, transformFn] = transformProps[0];
    return springValue.to(transformFn);
  }
  
  const springValues = transformProps.map(([spring]) => spring);
  const transformFns = transformProps.map(([, fn]) => fn);
  
  return to(springValues, (...values) => {
    return values.map((value, index) => transformFns[index](value)).join(' ');
  });
}; 