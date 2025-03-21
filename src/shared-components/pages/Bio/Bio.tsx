"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bio as BioSection } from '../../sections/Bio';
import type { BioPageProps } from './Bio.types';

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

export const BioPage: React.FC<BioPageProps> = ({
  className,
  id = 'bio',
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
      <BioSection id={id} />
      {/* Additional sections can be added here if needed */}
    </MotionDiv>
  );
};

export default BioPage; 