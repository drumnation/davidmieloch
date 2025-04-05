import { useEffect, useState } from 'react';
import { motion, HTMLMotionProps, Variant, Variants } from 'framer-motion';
import { isAnimationEnabled } from '../feature-flags';

/**
 * Hook to safely handle animations in SSR environment
 * @param componentName The name of the component for feature flag checking
 * @param enabled Optional override to explicitly enable/disable animations
 * @returns Object with animation state and helper properties
 */
export function useSsrSafeAnimation(componentName: string, enabled = true) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only enable animations after component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Check if animations should be enabled for this component
  const shouldAnimateByFlags = isAnimationEnabled(componentName);
  const shouldAnimate = isMounted && enabled && shouldAnimateByFlags;
  
  return {
    // For variants-based animations
    animate: shouldAnimate ? 'animate' : 'initial',
    // Boolean flag for conditional animations
    shouldAnimate,
    // For setting different initial states based on SSR
    initial: isMounted ? 'initial' : 'prerender',
    // Helper for debugging
    isMounted,
    // Helper for feature flag status
    enabledByFlags: shouldAnimateByFlags
  };
}

/**
 * HOC that wraps a component with SSR-safe animation capabilities
 * @param Component The component to wrap
 * @param componentName The name of the component for feature flag checking
 * @returns Wrapped component with SSR-safe animations
 */
export function withSsrSafeAnimation<P extends HTMLMotionProps<'div'>>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return (props: P) => {
    const { shouldAnimate, animate, initial } = useSsrSafeAnimation(componentName);
    
    if (!shouldAnimate) {
      // Return component with animations disabled
      return <Component {...props} animate={initial} />;
    }
    
    // Return component with animations enabled
    return <Component {...props} animate={animate} />;
  };
}

/**
 * Create SSR-safe variants for Framer Motion animations
 * @param variants The animation variants
 * @returns Enhanced variants with SSR safety
 */
export function createSsrSafeVariants(variants: Variants): Variants {
  return {
    // Add prerender state for SSR (typically matches initial)
    prerender: variants.initial || {},
    ...variants
  };
}

/**
 * SSR-safe motion component with built-in feature flag integration
 */
export function MotionSafe({
  componentName,
  children,
  variants,
  ...props
}: HTMLMotionProps<'div'> & {
  componentName: string;
  children: React.ReactNode;
}) {
  const { animate, initial, shouldAnimate } = useSsrSafeAnimation(componentName);
  
  // Handle case where variants are not provided
  const ssrSafeVariants = variants ? createSsrSafeVariants(variants) : undefined;
  
  return (
    <motion.div
      {...props}
      initial={initial}
      animate={shouldAnimate ? animate : initial}
      variants={ssrSafeVariants}
    >
      {children}
    </motion.div>
  );
} 