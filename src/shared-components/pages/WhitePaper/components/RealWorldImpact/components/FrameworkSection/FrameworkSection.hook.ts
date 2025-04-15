import { useInView } from 'react-intersection-observer';
import { useSpring, config } from '@react-spring/web';

export const useFrameworkSectionAnimation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { 
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px)' : 'translateY(20px)'
    },
    config: { ...config.gentle },
    reset: false
  });

  return { ref, inView, animation };
}; 