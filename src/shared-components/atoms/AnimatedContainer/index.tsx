import React, { ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

/**
 * A simple animated container component with fade-in animation
 */
export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className,
  delay = 100,
  duration = 500
}) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
    config: { duration }
  });

  return (
    <animated.div 
      className={className} 
      style={{
        ...fadeIn,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
    >
      {children}
    </animated.div>
  );
};

export default AnimatedContainer; 