import { useInView } from 'react-intersection-observer';
import { useSpring, config } from '@react-spring/web';

export const useRealWorldImpactAnimation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: inView ? 1 : 0 },
    config: { ...config.gentle },
    reset: false
  });

  return { ref, inView, fadeIn };
}; 