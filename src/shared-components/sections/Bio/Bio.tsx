"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../organisms/Hero';
import SideNavigation from '../../organisms/SideNavigation';
import { Grid, Box } from '@mantine/core';
import { 
  BioContainer, 
  ContentSection,
  ContentContainer,
  fadeIn,
  staggerContainer,
  GlobalStyles
} from './Bio.styles';
import { BioProps } from './Bio.types';
import { BIO_SECTIONS } from './Bio.constants';

// Import sub-components
import { BioIntro } from './sub-components/BioIntro';
import { ProfessionalJourney } from './sub-components/ProfessionalJourney';
import { TechnicalExpertise } from './sub-components/TechnicalExpertise';
import { FeaturedMedia } from './sub-components/FeaturedMedia';

export const Bio: React.FC<BioProps> = ({ id = 'bio', className }) => {
  const [activeSection, setActiveSection] = useState('bio-intro');
  
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
          <Grid gutter={40}>
            {/* Side Navigation */}
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Box hiddenFrom="md" mb="xl">
                <h3>About Me</h3>
              </Box>
              <SideNavigation 
                items={BIO_SECTIONS} 
                activeId={activeSection}
                style="light"
                onItemClick={(id) => setActiveSection(id)}
              />
            </Grid.Col>

            {/* Main Content */}
            <Grid.Col span={{ base: 12, md: 9 }}>
              <BioIntro />
              <ProfessionalJourney />
              <TechnicalExpertise />
              <FeaturedMedia />
            </Grid.Col>
          </Grid>
        </ContentContainer>
      </ContentSection>
    </BioContainer>
  );
};

export default Bio; 