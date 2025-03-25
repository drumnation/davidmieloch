"use client";

import React, { useEffect, useState } from 'react';
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
import { TransitionDiv, TransitionContainer } from '../../../utils/animations/migration-helpers';

// Import sub-components
import BioIntro from './sub-components/BioIntro';
import TechnicalExpertise from './sub-components/TechnicalExpertise';
import FeaturedMedia from './sub-components/FeaturedMedia';
import Testimonials from './sub-components/Testimonials';

export const Bio: React.FC<BioProps> = ({ id = 'bio', className }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Use useEffect to trigger animations after mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <TransitionDiv
        variants={fadeIn}
        animate="visible"
        initial="visible"
        className="bio-content-section"
        style={{ opacity: 1 }}
      >
        <TransitionContainer
          className="bio-content-container"
          style={{ opacity: 1 }}
        >
          <BioIntro />
          <FeaturedMedia />
          <Testimonials />
          <TechnicalExpertise />
        </TransitionContainer>
      </TransitionDiv>
    </BioContainer>
  );
};

export default Bio; 