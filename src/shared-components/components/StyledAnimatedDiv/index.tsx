import React, { ReactNode } from 'react';
import { animated } from '@react-spring/web';
import type { SpringValue, AnimatedProps } from '@react-spring/web';

interface StyledAnimatedDivProps {
  children: ReactNode;
  className?: string;
  style: {
    opacity?: SpringValue<number>;
    transform?: SpringValue<string>;
    [key: string]: any;
  };
}

/**
 * A styled animated div component that properly handles children and spring animations
 */
export const StyledAnimatedDiv = ({
  children,
  className,
  style
}: StyledAnimatedDivProps) => {
  // Using animated.div with proper type annotations
  const AnimatedDiv = animated.div;
  
  return (
    <AnimatedDiv 
      className={className} 
      style={style}
    >
      {children}
    </AnimatedDiv>
  );
};

export default StyledAnimatedDiv; 