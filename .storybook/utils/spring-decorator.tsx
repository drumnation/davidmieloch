import React from 'react';

/**
 * Decorator for making React Spring animations work properly in Storybook.
 * This ensures that animations run on the client side only and not during SSR.
 */
export const withSpringAnimations = (Story: React.ComponentType) => {
  // Create a small delay to ensure animations begin after component mount
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    // Small delay to ensure animation is smoother
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="react-spring-container" data-testid="react-spring-container">
      {/* We wrap the story in a div to control when it renders */}
      {mounted ? <Story /> : <div style={{ height: '100%', minHeight: '100px' }} />}
    </div>
  );
};

/**
 * Helper to disable animations for testing and static builds
 */
export const disableAnimationsForTesting = () => {
  // When in testing environment, disable animations
  if (process.env.NODE_ENV === 'test') {
    return {
      from: {},
      to: {},
      config: { duration: 0 },
    };
  }
  
  return null;
}; 