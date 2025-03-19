"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../organisms/Hero';
import { 
  BioContainer, 
  ContentSection,
  ContentContainer,
  fadeIn,
  staggerContainer,
  GlobalStyles
} from './Bio.styles';
import { BioProps } from './Bio.types';

// Import sub-components
import { BioIntro } from './sub-components/BioIntro';
import { TechnicalExpertise } from './sub-components/TechnicalExpertise';
import { FeaturedMedia } from './sub-components/FeaturedMedia';

export const Bio: React.FC<BioProps> = ({ id = 'bio', className }) => {
  // Hero props
  const heroProps = {
    title: "David Mieloch",
    subtitle: "Orchestrating Code with Rhythmic Precision",
    background: 'image' as const,
    backgroundImage: '/orchestra.jpg',
    backgroundOverlay: true,
    overlayOpacity: 0.6,
    pattern: 'none' as const,
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    className: 'bio-hero-bg'
  };

  return (
    <BioContainer id={id} className={className}>
      <GlobalStyles />
      
      {/* Hero Section */}
      <Hero {...heroProps} />
      
      {/* Content Section with White Background */}
      <ContentSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        <ContentContainer
          variants={staggerContainer}
        >
          <BioIntro />
          <TechnicalExpertise />
          <FeaturedMedia />
        </ContentContainer>
      </ContentSection>
    </BioContainer>
  );
};

export default Bio; 