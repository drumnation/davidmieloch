"use client";

import React, { ReactNode, forwardRef, ComponentPropsWithoutRef } from 'react';
import { animated } from '@react-spring/web';

// Extend the div props without ref
type AnimatedDivProps = ComponentPropsWithoutRef<'div'>;

interface WrapperProps extends AnimatedDivProps {
  children: ReactNode;
  className?: string;
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