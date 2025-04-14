import { animations } from '../../../utils/animations/react-spring-animations';

// Replaces Framer Motion's fadeIn variant with React Spring config
export const fadeIn = animations.fadeUp;

// Stagger container is handled differently in React Spring
// This will be used as a base config that can be modified for staggered children
export const staggerContainer = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  config: { duration: 300 }
};

// Replaces Framer Motion's scaleIn variant with React Spring config
export const scaleIn = animations.zoomIn;

// Replaces Framer Motion's slideInLeft variant with React Spring config
export const slideInLeft = animations.slideRight;

// Replaces Framer Motion's slideInRight variant with React Spring config
export const slideInRight = animations.slideLeft; 