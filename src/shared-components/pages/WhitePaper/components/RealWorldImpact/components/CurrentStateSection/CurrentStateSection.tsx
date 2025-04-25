import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@shared-components/atoms/Icon';
import { StateSectionProps, StateSection } from '../../RealWorldImpact.types';
import { getColumnCount } from '../../RealWorldImpact.utils';
import {
  FcBullish, FcWorkflow, FcIdea,
  FcAcceptDatabase, FcDocument, FcDataProtection
} from 'react-icons/fc';
import styled from 'styled-components';

interface FeatureCardProps {
  color?: string;
}

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

// Animation variants for the section titles
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

// Animation variants for the grid container
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

// Animation variants for individual cards
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.8
    }
  }
};

// Create a card component with better styling
const FeatureCard = styled(motion.div) <FeatureCardProps>`
  background: ${({ color }) => color || '#10b981'};
  color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
  
  svg {
    font-size: 2rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
  
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: white;
  }
  
  .feature-details {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.3);

    strong {
      font-weight: 600;
      color: white;
    }

    p {
      margin: 0.25rem 0 0.75rem;
      font-size: 0.9rem;
      line-height: 1.5;
      color: #f0f0f0;
    }
  }
`;

// Map icons for each capability/impact point
const getIconForPoint = (title: string, index: number): React.ReactNode => {
  if (title === "Enhanced Capabilities") {
    const icons = [
      <FcWorkflow key="workflow" />, // Conceptualize and implement
      <FcBullish key="bullish" />,   // Accelerate feature development
      <FcIdea key="idea" />          // Focus on innovation
    ];
    return index < icons.length ? icons[index] : <Icon name="star" size={24} />;
  }
  else if (title === "Measurable Impact") {
    const icons = [
      <FcAcceptDatabase key="db" />,  // Unprecedented consistency
      <FcDocument key="doc" />,       // Comprehensive documentation
      <FcDataProtection key="data" /> // Knowledge preservation
    ];
    return index < icons.length ? icons[index] : <Icon name="star" size={24} />;
  }

  return <Icon name="star" size={24} />;
};

// Get color for card based on section and index
const getCardColor = (sectionTitle: string, index: number): string => {
  if (sectionTitle === "Enhanced Capabilities") {
    const colors = [
      '#10b981', // Green
      '#059669', // Darker green
      '#047857'  // Deepest green
    ];
    return index < colors.length ? colors[index] : '#10b981';
  }
  else if (sectionTitle === "Measurable Impact") {
    const colors = [
      '#0ea5e9', // Blue
      '#0284c7', // Darker blue
      '#0369a1'  // Deepest blue
    ];
    return index < colors.length ? colors[index] : '#0ea5e9';
  }

  return '#10b981';
};

export const CurrentStateSection: React.FC<StateSectionProps> = ({ sections }) => {
  if (!Array.isArray(sections) || sections.length === 0) {
    console.warn('No sections provided to CurrentStateSection');
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {sections.map((section: StateSection, sectionIndex) => {
        // Define the gradient color based on section title
        const gradientColor = section.title === "Enhanced Capabilities"
          ? 'linear-gradient(90deg, #10b981, #047857)'
          : 'linear-gradient(90deg, #0ea5e9, #0369a1)';

        return (
          <motion.div
            key={`${section.title}-${sectionIndex}`}
            style={{ marginBottom: '2rem' }}
            variants={titleVariants}
          >
            <motion.h3
              style={{
                fontSize: '1.75rem',
                marginBottom: '1.5rem',
                fontWeight: 600,
                position: 'relative',
                display: 'inline-block'
              }}
            >
              {section.title}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  right: '150%',
                  height: '3px',
                  background: gradientColor,
                  borderRadius: '2px'
                }}
                animate={{ right: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.h3>

            <motion.div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}
              variants={gridVariants}
            >
              {section.points.map((point, pointIndex) => (
                <FeatureCard
                  key={`${section.title}-point-${pointIndex}`}
                  color={getCardColor(section.title, pointIndex)}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + (pointIndex * 0.1),
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      rotate: [0, -5, 5, -3, 3, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {getIconForPoint(section.title, pointIndex)}
                  </motion.div>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (pointIndex * 0.1) }}
                  >
                    {typeof point === 'string' ? point : point.keyword}
                  </motion.h4>
                  {typeof point !== 'string' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + (pointIndex * 0.1) }}
                    >
                      {point.description}
                    </motion.p>
                  )}
                </FeatureCard>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}; 