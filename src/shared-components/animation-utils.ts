// Export specific functions to avoid potential circular references
import {
  useSpring,
  useSprings,
  useTrail,
  useChain,
  useTransition,
  animated,
  config
} from '@react-spring/web';

// Export the SpringConfig type properly with 'export type'
import type { SpringConfig } from '@react-spring/web';
export type { SpringConfig };

// Export commonly used functions and objects
export {
  useSpring,
  useSprings,
  useTrail,
  useChain,
  useTransition,
  animated,
  config
};

// Create animated version of common HTML elements
export const AnimatedDiv = animated.div;
export const AnimatedSpan = animated.span;
export const AnimatedImg = animated.img;
export const AnimatedSection = animated.section;
export const AnimatedP = animated.p;
export const AnimatedH1 = animated.h1;
export const AnimatedH2 = animated.h2;
export const AnimatedH3 = animated.h3;

// Common animation presets
export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 }
  },
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 60 }
  },
  slideIn: {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 280, friction: 60 }
  }
}; 