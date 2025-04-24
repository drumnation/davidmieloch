import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@shared-components/atoms/Icon';
import { FrameworkSectionProps, FrameworkComponent } from '../../RealWorldImpact.types';
import { FeatureGrid } from '@shared-components/organisms/FeatureGrid/FeatureGrid';
import { getColumnCount } from '../../RealWorldImpact.utils';

// Animation variants for container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

// Animation variants for component sections
const componentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 25
    }
  }
};

// Animation variants for titles
const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
};

export const FrameworkSection: React.FC<FrameworkSectionProps> = ({ components }) => {
  if (!Array.isArray(components) || components.length === 0) {
    console.warn('No components provided to FrameworkSection');
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {components.map((component: FrameworkComponent, index) => {
        const columnCount = getColumnCount(component.features.length);

        return (
          <motion.div
            key={`${component.title}-${index}`}
            variants={componentVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '2rem' }}
          >
            <motion.h3
              variants={titleVariants}
              style={{
                fontSize: '1.75rem',
                marginBottom: '1.5rem',
                display: 'inline-block',
                position: 'relative'
              }}
            >
              {component.title}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #2196f3, #64b5f6)',
                  borderRadius: '2px'
                }}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureGrid
                features={component.features.map(feature => {
                  // Handle both string features and object features with keyword/description
                  if (typeof feature === 'string') {
                    return {
                      title: '',
                      description: feature,
                      icon: component.icon ? (
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon name={component.icon} size={24} />
                        </motion.div>
                      ) : undefined
                    };
                  } else {
                    return {
                      title: feature.keyword,
                      description: feature.description,
                      icon: component.icon ? (
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon name={component.icon} size={24} />
                        </motion.div>
                      ) : undefined
                    };
                  }
                })}
                columns={columnCount}
                style="accent-cards"
                animation="none" // We're handling animation with Framer Motion
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}; 