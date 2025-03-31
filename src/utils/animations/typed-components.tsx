import React from 'react';
import { animated, SpringValue, AnimatedComponent } from '@react-spring/web';

// Define our simplified types
export type AnimatedProp<T> = SpringValue<T> | T;

export type SpringStyles = {
  [K in keyof React.CSSProperties]: AnimatedProp<React.CSSProperties[K]>;
};

// Create a helper function to filter out framer-motion props
const filterFramerProps = (props: any) => {
  const {
    variants,
    initial,
    animate,
    exit,
    whileHover,
    whileTap,
    transition,
    ...rest
  } = props;
  return rest;
};

// Helper function to convert spring values to regular CSS styles
// This is useful for incremental migration where we can't use animated components directly
export const springToCss = (
  springStyles: Record<string, AnimatedProp<string | number>> | undefined
): Record<string, string | number> => {
  if (!springStyles) return {};
  
  const cssStyles: Record<string, string | number> = {};
  
  // Process each property in the spring styles
  Object.entries(springStyles).forEach(([key, value]) => {
    // If it's a SpringValue, get its current value
    if (typeof value === 'object' && 'get' in value) {
      cssStyles[key] = value.get();
    } else {
      // If it's already a primitive value, use it directly
      cssStyles[key] = value;
    }
    
    // Special handling for transform properties that might be combined
    if (key === 'opacity' || key.includes('transform')) {
      if (typeof cssStyles[key] === 'number' && isNaN(cssStyles[key] as number)) {
        cssStyles[key] = 0; // Default fallback
      }
    }
  });
  
  return cssStyles;
};

// Animated components with proper type handling
export const AnimatedDiv = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & { 
    style?: any;  // Use 'any' to avoid TypeScript complexity with nested spring values
  }
>((props, ref) => {
  const filteredProps = filterFramerProps(props);
  return <animated.div ref={ref} {...filteredProps} />;
});
AnimatedDiv.displayName = 'AnimatedDiv';

export const AnimatedSection = React.forwardRef<
  HTMLElement,
  Omit<React.HTMLAttributes<HTMLElement>, 'style'> & { style?: any }
>((props, ref) => {
  const filteredProps = filterFramerProps(props);
  return <animated.section ref={ref} {...filteredProps} />;
});
AnimatedSection.displayName = 'AnimatedSection';

export const AnimatedArticle = React.forwardRef<
  HTMLElement,
  Omit<React.HTMLAttributes<HTMLElement>, 'style'> & { style?: any }
>((props, ref) => {
  const filteredProps = filterFramerProps(props);
  return <animated.article ref={ref} {...filteredProps} />;
});
AnimatedArticle.displayName = 'AnimatedArticle';

export const AnimatedH1 = React.forwardRef<
  HTMLHeadingElement,
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'style'> & { style?: any }
>((props, ref) => {
  const filteredProps = filterFramerProps(props);
  return <animated.h1 ref={ref} {...filteredProps} />;
});
AnimatedH1.displayName = 'AnimatedH1';

export const AnimatedH2 = React.forwardRef<
  HTMLHeadingElement,
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'style'> & { style?: any }
>((props, ref) => {
  const filteredProps = filterFramerProps(props);
  return <animated.h2 ref={ref} {...filteredProps} />;
});
AnimatedH2.displayName = 'AnimatedH2';

export const AnimatedH3 = React.forwardRef<
  HTMLHeadingElement,
  Omit<React.HTMLAttributes<HTMLHeadingElement>, 'style'> & { style?: any }
>((props, ref) => {
  const filteredProps = filterFramerProps(props);
  return <animated.h3 ref={ref} {...filteredProps} />;
});
AnimatedH3.displayName = 'AnimatedH3';

export const AnimatedParagraph = React.forwardRef<
  HTMLParagraphElement,
  Omit<React.HTMLAttributes<HTMLParagraphElement>, 'style'> & { style?: any }
>((props, ref) => {
  const filteredProps = filterFramerProps(props);
  return <animated.p ref={ref} {...filteredProps} />;
});
AnimatedParagraph.displayName = 'AnimatedParagraph';

// Utility functions for common animations

// Utility to convert framer-motion fadeIn style to react-spring
export const frameFadeInToSpring = (delay: number = 0) => ({
  from: { opacity: 0 },
  to: { opacity: 1 },
  config: { duration: 500 },
  delay
});

// Utility to convert framer-motion fadeUp style to react-spring
export const frameFadeUpToSpring = (delay: number = 0) => ({
  from: { opacity: 0, transform: 'translateY(20px)' },
  to: { opacity: 1, transform: 'translateY(0px)' },
  config: { duration: 600 },
  delay
});

// For common IntersectionObserver setups
export const defaultIntersectionOptions = {
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '-100px'
}; 