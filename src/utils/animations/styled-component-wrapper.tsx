"use client";

import React, { ReactNode, forwardRef } from 'react';
import { animated } from '@react-spring/web';

interface WrapperProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * A wrapper component for styled-components that use animated.div from React Spring
 * This ensures that the children prop is properly passed through
 */
export const AnimatedWrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <animated.div ref={ref} className={className} {...rest}>
        {children}
      </animated.div>
    );
  }
);

AnimatedWrapper.displayName = 'AnimatedWrapper';

export default AnimatedWrapper; 