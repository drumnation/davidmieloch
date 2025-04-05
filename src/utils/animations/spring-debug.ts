import { Globals, SpringValue } from '@react-spring/core';

/**
 * Monitors spring observers to detect circular dependencies
 * Import this at the app entry point before any components are rendered
 */
export const setupSpringDebugger = () => {
  // Safety check for SSR
  if (typeof window === 'undefined') return;

  // Let's be more aggressive for now to prevent the app from crashing
  console.log('[SpringDebugger] Adding global skipAnimation to prevent Maximum Call Stack Size errors');
  Globals.assign({ skipAnimation: true });

  try {
    // Keep track of observer chains to detect circular dependencies
    const observerChains = new Map<string, string[]>();
    const maxChainLength = 50; // Threshold for detecting potential infinite loops

    // Create a test spring to access the prototype
    const testSpring = new SpringValue(0);
    const originalEventObserved = (window as any).__REACT_SPRING_PATCHED ? 
      null : 
      Object.getPrototypeOf(testSpring).eventObserved;

    if (!originalEventObserved || (window as any).__REACT_SPRING_PATCHED) {
      console.log('[SpringDebugger] Already patched or could not find eventObserved');
      return;
    }

    // Patch the eventObserved method to track chains
    const patchedEventObserved = function(this: any, ...args: any[]) {
      const springId = this.id || Math.random().toString(36).substring(2, 10);
      const callerId = args[0]?.id || 'unknown';
      
      // Get or create the chain for this spring
      let chain = observerChains.get(springId) || [];
      
      // Add the current caller to the chain
      chain = [...chain, callerId];
      
      // Check for potential infinite loops
      if (chain.length > maxChainLength) {
        const chainStr = chain.slice(-20).join(' → ');
        console.error(`[SpringDebugger] Potential infinite loop detected in spring observers! Chain: ${chainStr}`);
        console.trace(`[SpringDebugger] Stack trace for spring ${springId}`);
        
        // Comment this out if you want to continue despite the warning
        console.error(`[SpringDebugger] Disabling all animations globally to prevent crash`);
        Globals.assign({ skipAnimation: true });
        return null; // Don't call original to break the cycle
      }
      
      // Update the chain
      observerChains.set(springId, chain);
      
      // Call the original method
      return originalEventObserved.apply(this, args);
    };

    // Apply the patch
    const springProto = Object.getPrototypeOf(testSpring);
    springProto.eventObserved = patchedEventObserved;
    (window as any).__REACT_SPRING_PATCHED = true;
    
    console.log('[SpringDebugger] Successfully patched react-spring for debugging');
  } catch (error) {
    console.error('[SpringDebugger] Error during setup:', error);
  }
};

/**
 * Use this to replace `springToCss` usage with a safe alternative
 * 
 * Example:
 * Before: <div style={springToCss(styles)}>
 * After: <div style={safeSpringToCss(styles)}>
 */
export const safeSpringToCss = (springStyles: Record<string, any>) => {
  // Create a non-reactive copy of spring values
  const cssStyles: Record<string, any> = {};
  
  // Safety check for SSR
  if (typeof window === 'undefined') return cssStyles;
  
  try {
    for (const key in springStyles) {
      if (springStyles[key] && typeof springStyles[key].get === 'function') {
        try {
          // Use toJSON if available to avoid triggering observers
          if (typeof springStyles[key].toJSON === 'function') {
            cssStyles[key] = springStyles[key].toJSON();
          } else {
            // Prevent infinite recursion entirely with a static value
            console.warn(`[SpringDebugger] Bypassing spring.get() for "${key}" to prevent potential recursion`);
            cssStyles[key] = 0; // Safe fallback without calling get()
          }
        } catch (e) {
          console.error(`[SpringDebugger] Error getting spring value for "${key}":`, e);
          cssStyles[key] = 0; // Safe fallback
        }
      } else {
        cssStyles[key] = springStyles[key];
      }
    }
  } catch (error) {
    console.error('[SpringDebugger] Error in safeSpringToCss:', error);
  }
  
  return cssStyles;
};

/**
 * Wraps a spring's get method to provide debug info and safe fallbacks
 */
export const createSafeSpringGetter = (spring: any, name: string = 'unnamed') => {
  // Safety check for SSR
  if (typeof window === 'undefined') return () => 0;
  
  if (!spring || typeof spring.get !== 'function') {
    console.error(`[SpringDebugger] Invalid spring object passed to createSafeSpringGetter`);
    return () => 0;
  }
  
  return () => {
    try {
      // Check if animations are globally disabled
      if (Globals.skipAnimation) {
        return 0; // Return static value if animations are disabled
      }
      
      const value = spring.get();
      return value;
    } catch (e) {
      console.error(`[SpringDebugger] Error in spring.get() for "${name}":`, e);
      return 0; // Safe fallback
    }
  };
}; 