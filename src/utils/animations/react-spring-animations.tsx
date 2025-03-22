"use client";

import React from 'react';
import { 
  animated as springAnimated, 
  useSpring, 
  useSprings, 
  useTransition
} from '@react-spring/web';

// Export react-spring hooks directly
export { useSpring, useSprings, useTransition };

// Export the original animated from react-spring
export { springAnimated as animated };

// Create a simple animated div component that properly handles children
export const AnimatedDiv = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <springAnimated.div ref={ref} {...props} />;
});
AnimatedDiv.displayName = 'AnimatedDiv';

// Common animation presets that can be used with useSpring
export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 }
  },
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 500 }
  },
  fadeDown: {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 500 }
  },
  zoomIn: {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 200, friction: 20 }
  },
  slideRight: {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 300, friction: 30 }
  },
  slideLeft: {
    from: { opacity: 0, transform: 'translateX(20px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    config: { tension: 300, friction: 30 }
  }
};

// Simple placeholder for components transitioning from AnimatePresence
export const AnimatePresence: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};

// Export a simplified motion object that just uses AnimatedDiv
export const motion = {
  div: AnimatedDiv
}; 