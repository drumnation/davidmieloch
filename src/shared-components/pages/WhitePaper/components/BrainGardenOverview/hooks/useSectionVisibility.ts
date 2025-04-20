import { useInView } from 'react-intersection-observer';
import { CSSProperties } from 'react';

export interface UseSectionVisibilityOptions {
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
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

  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
    rootMargin
  });

  // Create fade-in style based on visibility
  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    visibility: inView ? 'visible' : 'hidden',
    pointerEvents: inView ? 'auto' : 'none',
    willChange: 'opacity',
    transition: inView
      ? 'visibility 0s, opacity 0.6s ease-out'
      : 'opacity 0.6s ease-out, visibility 0s 0.6s'
  };

  return { ref, inView, style };
}; 