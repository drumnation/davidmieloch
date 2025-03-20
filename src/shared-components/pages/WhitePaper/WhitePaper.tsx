"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AiSkepticToExpert } from '../../sections/AiSkepticToExpert';
import { AiAutopilotAnalogy } from '../../sections/AiAutopilotAnalogy';
import { BrainGardenOverview } from '../../sections/BrainGardenOverview';
import { WhitePaperProps } from './WhitePaper.types';
import { RealWorldImpact } from '@/shared-components/sections/RealWorldImpact';

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

export const WhitePaper: React.FC<WhitePaperProps> = ({
  className,
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
      <AiSkepticToExpert />
      <AiAutopilotAnalogy />
      <BrainGardenOverview />
      <RealWorldImpact />
      {/* Additional sections will be added here as they are developed */}
    </MotionDiv>
  );
};

export default WhitePaper;