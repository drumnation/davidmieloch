import React, { CSSProperties, ReactElement } from 'react';
import { SpringValue, useSpring } from '@react-spring/web';

// Type for animation variants (Framer Motion style)
export interface AnimationVariant {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  [key: string]: any;
}

export interface AnimationVariants {
  hidden: AnimationVariant;
  visible: AnimationVariant;
  [key: string]: AnimationVariant;
}

// Convert Framer Motion variants to CSS transition styles
export const variantToCssTransition = (
  variants: AnimationVariants,
  currentState: 'hidden' | 'visible' | string = 'visible',
  baseTransition: string = 'all 0.6s ease-out'
): CSSProperties => {
  const variant = variants[currentState];
  
  if (!variant) {
    return {};
  }

  // Create the base style
  const style: CSSProperties = {
    transition: baseTransition,
  };

  // Map variant properties to CSS properties
  if (variant.opacity !== undefined) {
    style.opacity = variant.opacity;
  }

  if (variant.y !== undefined) {
    style.transform = `${style.transform || ''} translateY(${variant.y}px)`.trim();
  }

  if (variant.x !== undefined) {
    style.transform = `${style.transform || ''} translateX(${variant.x}px)`.trim();
  }

  if (variant.scale !== undefined) {
    style.transform = `${style.transform || ''} scale(${variant.scale})`.trim();
  }

  if (variant.rotate !== undefined) {
    style.transform = `${style.transform || ''} rotate(${variant.rotate}deg)`.trim();
  }

  return style;
};

// Convert Framer Motion variants to React Spring config
export const variantToSpringConfig = (
  variants: AnimationVariants,
  isVisible: boolean = true
) => {
  const targetVariant = isVisible ? variants.visible : variants.hidden;
  
  if (!targetVariant) {
    return {};
  }

  // Create spring config for each property
  const config = {
    from: { ...variants.hidden },
    to: { ...targetVariant },
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
    },
  };

  return config;
};

// Convert Framer Motion animation variants to React Spring
export const useVariantSpring = (
  variants: AnimationVariants,
  isVisible: boolean = true
) => {
  const springConfig = variantToSpringConfig(variants, isVisible);
  return useSpring(springConfig);
};

// Convert a spring value to CSS string
export const springToCss = (
  spring: Record<string, SpringValue<number>> | undefined
): CSSProperties => {
  if (!spring) return {};

  const style: CSSProperties = {};
  
  if (spring.opacity) {
    style.opacity = spring.opacity.get();
  }
  
  // Handle transform properties
  const transformProps = [];
  
  if (spring.y) {
    transformProps.push(`translateY(${spring.y.get()}px)`);
  }
  
  if (spring.x) {
    transformProps.push(`translateX(${spring.x.get()}px)`);
  }
  
  if (spring.scale) {
    transformProps.push(`scale(${spring.scale.get()})`);
  }
  
  if (spring.rotate) {
    transformProps.push(`rotate(${spring.rotate.get()}deg)`);
  }
  
  if (transformProps.length > 0) {
    style.transform = transformProps.join(' ');
  }
  
  return style;
};

// Create a CSS transition component that mimics Framer Motion's motion components
export const TransitionDiv: React.FC<{
  variants?: AnimationVariants;
  initial?: string;
  animate?: string;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ 
  variants, 
  initial = 'hidden', 
  animate = 'visible', 
  children, 
  className, 
  style = {} 
}) => {
  let combinedStyle = style;
  
  if (variants) {
    // Get transition from the visible variant if available
    const transitionDuration = variants.visible?.transition?.duration || 0.6;
    const transitionEase = variants.visible?.transition?.ease || 'ease-out';
    const baseTransition = `all ${transitionDuration}s ${transitionEase}`;
    
    // Combine with variant-based styles
    combinedStyle = {
      ...combinedStyle,
      ...variantToCssTransition(variants, animate, baseTransition)
    };
  }
  
  return (
    <div className={className} style={combinedStyle}>
      {children}
    </div>
  );
};

// Interface for child props that need to be extended with style
interface StyledChildProps {
  style?: CSSProperties;
}

// Create a staggered container for CSS transitions
export const TransitionContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}> = ({ 
  children, 
  className, 
  style = {} 
}) => {
  // Convert children to array to enable staggering
  const childrenArray = React.Children.toArray(children);
  
  // Add delay to each child for staggering effect
  const staggeredChildren = childrenArray.map((child, index) => {
    if (React.isValidElement<StyledChildProps>(child)) {
      return React.cloneElement(child, {
        style: {
          ...(child.props.style || {}),
          transitionDelay: `${index * 0.1}s`,
        },
      });
    }
    return child;
  });
  
  return (
    <div className={className} style={style}>
      {staggeredChildren}
    </div>
  );
}; 