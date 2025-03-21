import { config, SpringConfig } from '@react-spring/web';

interface AnimationPreset {
  from: Record<string, any>;
  to: Record<string, any>;
  config?: SpringConfig;
  delay?: number;
}

/**
 * Animation utilities for React Spring
 */

/**
 * Animation configuration presets for consistent animations
 */
export const springPresets = {
  /**
   * Default animation preset with balanced tension and friction.
   * Good for most UI animations.
   */
  default: {
    tension: 280,
    friction: 60
  } as SpringConfig,
  
  /**
   * Gentle animation preset with low tension and higher friction.
   * Good for subtle UI animations.
   */
  gentle: {
    tension: 170,
    friction: 26
  } as SpringConfig,
  
  /**
   * Slow animation preset with low tension.
   * Good for emphasis or dramatic animations.
   */
  slow: {
    tension: 100,
    friction: 40,
    precision: 0.001
  } as SpringConfig,
  
  /**
   * Bouncy animation preset with high tension and low friction.
   * Good for playful elements or drawing attention.
   */
  bouncy: {
    tension: 400,
    friction: 15
  } as SpringConfig,
  
  /**
   * Instant animation preset that completes quickly.
   * Good for elements that should appear almost immediately.
   */
  instant: {
    tension: 800,
    friction: 40
  } as SpringConfig,
  
  // Standard fade in
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 }
  },
  
  // Rapid fade in
  quickFadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 }
  },
  
  // Slow fade in
  slowFadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 }
  },
  
  // Fade up animation
  fadeUp: {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { ...config.gentle }
  },
  
  // Bounce effect
  bounce: {
    from: { transform: 'scale(0.9)' },
    to: { transform: 'scale(1)' },
    config: { tension: 300, friction: 10 }
  },
  
  // Slide in from left
  slideInLeft: {
    from: { opacity: 0, transform: 'translateX(-30px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 280, friction: 24 }
  },
  
  // Slide in from right
  slideInRight: {
    from: { opacity: 0, transform: 'translateX(30px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 280, friction: 24 }
  },
  
  // Scale in
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 200, friction: 20 }
  },
  
  // Reveal
  reveal: {
    from: { opacity: 0, maxHeight: 0, overflow: 'hidden' },
    to: { opacity: 1, maxHeight: 1000, overflow: 'hidden' },
    config: { tension: 120, friction: 14 }
  }
};

/**
 * Custom easing functions for advanced animations
 */
export const easings = {
  /**
   * Cubic bezier easing 
   */
  easeInOut: (t: number) => 
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  /**
   * Ease out (cubic)
   */
  easeOut: (t: number) => 
    1 - Math.pow(1 - t, 3),

  /**
   * Ease in (cubic)
   */
  easeIn: (t: number) => 
    t * t * t
};

/**
 * Common animation variants for consistent animations across components
 */
export const springVariants = {
  /**
   * Fade in animation
   */
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: springPresets.default
  },
  
  /**
   * Fade in from bottom animation
   */
  fadeInUp: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: springPresets.default
  },
  
  /**
   * Fade in from left animation
   */
  fadeInRight: {
    from: { opacity: 0, x: -40 },
    to: { opacity: 1, x: 0 },
    config: springPresets.default
  },
  
  /**
   * Scale up animation
   */
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    config: springPresets.default
  },
  
  /**
   * Staggered children animations
   * @param index The index of the child element
   * @param baseDelay The base delay in ms before starting animations
   * @param staggerDelay The delay between each staggered child
   */
  stagger: (index: number, baseDelay = 100, staggerDelay = 50) => ({
    delay: baseDelay + (index * staggerDelay)
  })
};

/**
 * Helper to create multiple staggered animations with delay
 * @param count Number of items to animate
 * @param basePreset Base animation preset
 * @param staggerDelay Delay between each item in ms
 * @param initialDelay Initial delay in ms before the first animation
 * @returns Array of animation presets with staggered delays
 */
export const createStaggeredAnimations = (
  count: number,
  basePreset: AnimationPreset,
  staggerDelay = 100,
  initialDelay = 0
): AnimationPreset[] => {
  return Array(count)
    .fill(0)
    .map((_, i) => ({
      ...basePreset,
      delay: initialDelay + i * staggerDelay,
    }));
};

/**
 * Helper to create animations for scroll-based reveal
 * @param preset Base animation preset
 * @param rootMargin Margin around the root
 * @returns Animation configuration for scroll reveal
 */
export const createScrollRevealConfig = (
  preset: AnimationPreset,
  rootMargin = '-100px 0px'
) => {
  return {
    from: preset.from,
    to: preset.to,
    config: preset.config,
    delay: preset.delay,
    onRest: undefined as undefined | (() => void)
  };
};

/**
 * Generate animations for a list of items
 * @param items Array of items to animate
 * @param preset Animation preset to use
 * @param staggerDelay Delay between each item
 * @returns Animation styles for each item
 */
export const mapItemsToAnimations = <T>(
  items: T[],
  preset: AnimationPreset,
  staggerDelay = 100
) => {
  return createStaggeredAnimations(
    items.length,
    preset,
    staggerDelay
  );
}; 