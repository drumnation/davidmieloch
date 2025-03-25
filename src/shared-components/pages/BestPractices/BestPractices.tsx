"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { BestPractices as BestPracticesSection } from '../../sections/BestPractices';
import { LetsWorkTogether } from '../../sections/BestPractices/subcomponents/LetsWorkTogether';
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

// Create a wrapper component that adds padding at the bottom to prevent content from being covered by the music player
const PageWrapper = styled(MotionDiv)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* Add a margin and padding at the bottom to prevent content from being covered by the music player */
  margin-bottom: 90px; /* Height of the music player + extra space */
`;

export const BestPractices: React.FC<BestPracticesProps> = ({
  className,
  id = 'best-practices',
}) => {
  return (
    <PageWrapper 
      className={className}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <BestPracticesSection id={id} />
      <LetsWorkTogether className="lets-work-together-section" />
    </PageWrapper>
  );
};

export default BestPractices;