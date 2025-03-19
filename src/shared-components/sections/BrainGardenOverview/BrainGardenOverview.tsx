"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../organisms/Hero';
import { BrainGardenOverviewProps } from './BrainGardenOverview.types';
import { useBrainGardenOverview } from './BrainGardenOverview.hook';
import {
  Container,
  ContentSection,
  fadeIn,
  GlobalStyles
} from './BrainGardenOverview.styles';

// Import all the section components
import { SystemOverviewSection } from './components/SystemOverviewSection';
import { CoreComponentsSection } from './components/CoreComponentsSection';
import { TeamCustomizationSection } from './components/TeamCustomizationSection';
import { ForceMultipliersSection } from './components/ForceMultipliersSection';
import { GardenMetaphorSection } from './components/GardenMetaphorSection';
import { SystemArchitectureSection } from './components/SystemArchitectureSection';
import { NextEvolutionSection } from './components/NextEvolutionSection';
import { TransitionSection } from './components/TransitionSection';

export const BrainGardenOverview: React.FC<BrainGardenOverviewProps> = (props) => {
  const {
    className,
    enhancedHeroProps,
    introProps,
    processedCoreComponents,
    processedForceMultipliers,
    systemArchitectureProps,
    processedNavigation,
    processedKeyBenefits,
    processedCTA,
    transitionProps
  } = useBrainGardenOverview(props);

  // Process the data to ensure all icons are properly handled
  const safeData = {
    coreComponents: {
      features: processedCoreComponents.features.map(feature => ({
        ...feature,
        icon: feature.icon || 'star'
      }))
    },
    forceMultipliers: {
      features: processedForceMultipliers.features.map(feature => ({
        ...feature,
        icon: feature.icon || 'star'
      }))
    },
    navigation: {
      sections: processedNavigation.sections.map(section => ({
        ...section,
        icon: section.icon || 'star'
      }))
    },
    keyBenefits: {
      stats: processedKeyBenefits.stats.map(stat => ({
        ...stat,
        icon: stat.icon || 'star'
      }))
    }
  };

  // Enhanced animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.2,
        duration: 0.6 
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <Container className={className}>
        <GlobalStyles />
        
        {/* Hero Section */}
        <Hero {...enhancedHeroProps} />
        
        {/* Content Section with White Background */}
        <ContentSection
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          {/* Introduction Section */}
          <motion.div variants={sectionVariants}>
            <SystemOverviewSection introProps={introProps} />
          </motion.div>
          
          {/* Core Components Section */}
          <motion.div variants={sectionVariants}>
            <CoreComponentsSection coreComponentsProps={safeData.coreComponents} />
          </motion.div>
          
          {/* Team Customization Section */}
          <motion.div variants={sectionVariants}>
            <TeamCustomizationSection />
          </motion.div>
          
          {/* Force Multipliers Section */}
          <motion.div variants={sectionVariants}>
            <ForceMultipliersSection forceMultipliersProps={safeData.forceMultipliers} />
          </motion.div>
          
          {/* The Garden Metaphor Section */}
          <motion.div variants={sectionVariants}>
            <GardenMetaphorSection />
          </motion.div>
          
          {/* System Architecture Section */}
          <motion.div variants={sectionVariants}>
            <SystemArchitectureSection systemArchitectureProps={systemArchitectureProps} />
          </motion.div>
          
          {/* The Next Evolution Section */}
          <motion.div variants={sectionVariants}>
            <NextEvolutionSection />
          </motion.div>
          
          {/* Transition to Technical Implementation Section */}
          <motion.div 
            variants={sectionVariants}
            transition={{ delay: 0.2 }}
          >
            <TransitionSection {...transitionProps} />
          </motion.div>
        
        </ContentSection>
      </Container>
    </motion.div>
  );
};