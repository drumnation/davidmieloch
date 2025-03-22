import { AnimationVariants } from '../../../utils/animations/migration-helpers';

// Animation variants
export const fadeInUp: AnimationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const fadeIn: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const staggerContainer: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}; 