import { useInView } from 'react-intersection-observer';
import { CSSProperties } from 'react';
// Import Mantine hook for media query
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export interface UseSectionVisibilityOptions {
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
  // No longer passing isSm, hook will determine it
}

export interface UseSectionVisibilityResult {
  ref: any;
  inView: boolean;
  style: CSSProperties;
}

/**
 * Custom hook to handle section visibility with IntersectionObserver
 * and return appropriate styling for fade-in animations
 */
export const useSectionVisibility = (options: UseSectionVisibilityOptions = {}): UseSectionVisibilityResult => {
  const {
    triggerOnce = true,
    threshold = 0.1,
    rootMargin = '0px'
  } = options;

  // Get theme and check for mobile breakpoint internally
  const theme = useMantineTheme();
  const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin
  });

  // Create fade-in style based on visibility, BUT only apply hiding styles on non-mobile
  const style: CSSProperties = {
    opacity: !isSm || inView ? 1 : 0, // Opacity is 1 on mobile OR when inView on desktop
    visibility: !isSm || inView ? 'visible' : 'hidden', // Visible on mobile OR when inView on desktop
    pointerEvents: !isSm || inView ? 'auto' : 'none', // Enabled on mobile OR when inView on desktop
    willChange: isSm ? 'opacity' : undefined, // Only apply willChange on desktop
    transition: isSm ? (inView // Only apply transition on desktop
      ? 'visibility 0s, opacity 0.6s ease-out'
      : 'opacity 0.6s ease-out, visibility 0s 0.6s') : undefined,
  };

  return { ref, inView, style };
}; 