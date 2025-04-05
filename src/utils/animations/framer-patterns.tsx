import React from 'react';
import { motion, HTMLMotionProps, Variants, AnimationControls, useAnimation } from 'framer-motion';
import { useSsrSafeAnimation, createSsrSafeVariants, MotionSafe } from './ssr-safe';

/**
 * Common animation variants for fade animations
 */
export const fadeVariants = createSsrSafeVariants({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
});

/**
 * Common animation variants for slide animations
 */
export const slideUpVariants = createSsrSafeVariants({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
});

/**
 * Common animation variants for scale animations
 */
export const scaleVariants = createSsrSafeVariants({
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 }
});

/**
 * Stagger children variants
 */
export const staggerContainerVariants = createSsrSafeVariants({
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
});

/**
 * Fade-in component (replaces useSpring({ opacity }))
 */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  componentName: string;
}> = ({
  children,
  delay = 0,
  duration = 0.5,
  componentName
}) => (
  <MotionSafe
    componentName={componentName}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration, delay }}
  >
    {children}
  </MotionSafe>
);

/**
 * Slide up and fade in component (replaces common useSpring pattern)
 */
export const SlideUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  componentName: string;
}> = ({
  children,
  delay = 0,
  duration = 0.5,
  distance = 50,
  componentName
}) => (
  <MotionSafe
    componentName={componentName}
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </MotionSafe>
);

/**
 * Trail component for creating staggered animations (replaces useTrail)
 * Use with children that are wrapped in individual motion components
 */
export const Trail: React.FC<{
  children: React.ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  componentName: string;
}> = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0.2,
  componentName
}) => {
  const { shouldAnimate, animate, initial } = useSsrSafeAnimation(componentName);
  
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };
  
  return (
    <motion.div
      initial={initial}
      animate={shouldAnimate ? animate : initial}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

/**
 * Spring value adapter - provides a similar API to React Spring's useSpring hook
 * Allows for a more gradual migration pattern
 */
export function useFramerSpring(initialValues: Record<string, number>) {
  const controls = useAnimation();
  
  // Function to update spring values (similar to React Spring's API)
  const animateTo = (values: Record<string, number>, options?: { delay?: number; duration?: number }) => {
    controls.start({
      ...values,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        ...options
      }
    });
  };
  
  // Initial setup
  React.useEffect(() => {
    controls.set(initialValues);
  }, []);
  
  return {
    controls,
    animateTo,
    // Values accessor (similar to React Spring's springs object)
    values: initialValues
  };
}

/**
 * Sequence animation adapter (replacement for useChain)
 */
export function useAnimationSequence() {
  const controls = useAnimation();
  
  // Create a sequence of animations
  const sequence = async (animations: Array<{
    values: Record<string, any>;
    options?: { delay?: number; duration?: number };
  }>) => {
    for (const anim of animations) {
      await controls.start({
        ...anim.values,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 100,
          ...anim.options
        }
      });
    }
  };
  
  return {
    controls,
    sequence
  };
} 