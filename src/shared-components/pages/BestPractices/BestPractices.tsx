"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BestPractices as BestPracticesSection } from '../../sections/BestPractices';
import type { BestPracticesProps } from '@/shared-components/pages/BestPractices/BestPractices.types';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Create a motion div component
const MotionDiv = motion.div;

export const BestPractices: React.FC<BestPracticesProps> = ({
  className,
  id = 'best-practices',
}) => {
  return (
    <MotionDiv 
      className={className}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      style={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
    >
      <BestPracticesSection id={id} />
      {/* Additional sections can be added here if needed */}
    </MotionDiv>
  );
};

export default BestPractices; 