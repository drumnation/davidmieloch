import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn, SlideUp, Trail, fadeVariants, slideUpVariants } from '../framer-patterns';
import { ANIMATION_CONFIG, ANIMATION_LIBRARY } from '../../feature-flags';

/**
 * Test component to demonstrate Framer Motion animation patterns
 * and verify the feature flag system is working correctly
 */
const FramerMotionTest: React.FC = () => {
  // Component name for feature flag system
  const componentName = 'FramerMotionTest';
  
  // Enable this component for testing
  React.useEffect(() => {
    // Add this component to enabled components
    if (!ANIMATION_CONFIG.enabledComponents.includes(componentName)) {
      ANIMATION_CONFIG.enabledComponents.push(componentName);
    }
    
    // Set library to Framer Motion for testing
    ANIMATION_CONFIG.library = ANIMATION_LIBRARY.FRAMER_MOTION;
    
    // Cleanup
    return () => {
      const index = ANIMATION_CONFIG.enabledComponents.indexOf(componentName);
      if (index !== -1) {
        ANIMATION_CONFIG.enabledComponents.splice(index, 1);
      }
    };
  }, []);
  
  // Sample items for staggered animations
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  
  return (
    <div className="framer-motion-test" style={{ padding: '2rem' }}>
      <h2>Framer Motion Animation Tests</h2>
      
      <section>
        <h3>Simple Fade In</h3>
        <FadeIn componentName={componentName} delay={0.2}>
          <div style={{ padding: '1rem', background: '#f0f0f0' }}>
            This content fades in with a slight delay
          </div>
        </FadeIn>
      </section>
      
      <section style={{ marginTop: '2rem' }}>
        <h3>Slide Up Animation</h3>
        <SlideUp componentName={componentName} delay={0.4} distance={30}>
          <div style={{ padding: '1rem', background: '#e6f7ff' }}>
            This content slides up from below
          </div>
        </SlideUp>
      </section>
      
      <section style={{ marginTop: '2rem' }}>
        <h3>Staggered Trail Animation</h3>
        <Trail componentName={componentName} staggerDelay={0.1} initialDelay={0.6}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={slideUpVariants}
              style={{ padding: '0.5rem', background: '#f9f0ff', marginBottom: '0.5rem' }}
            >
              {item}
            </motion.div>
          ))}
        </Trail>
      </section>
      
      <section style={{ marginTop: '2rem' }}>
        <h3>Variants-based Animation</h3>
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0.8, rotate: -5 },
            animate: { 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: { duration: 0.5, delay: 0.8 }
            }
          }}
          initial="initial"
          animate="animate"
          style={{ 
            padding: '1rem', 
            background: '#fff0f6', 
            width: '100%', 
            maxWidth: '300px'
          }}
        >
          This uses custom variants with scale and rotation
        </motion.div>
      </section>
    </div>
  );
};

export default FramerMotionTest; 