"use client";

import React from 'react';
import { Hero } from '../../organisms/Hero';
import { useBrainGardenOverview } from './BrainGardenOverview.hook';
import {
  Container,
  ContentSection,
} from './BrainGardenOverview.styles';
import { BrainGardenOverviewProps } from './BrainGardenOverview.types';
import { AnimatedSection } from './BrainGardenOverview.logic';
import { useSectionVisibility } from './hooks';

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

  // Create section visibility hooks for each section
  const systemVisibility = useSectionVisibility();
  const coreVisibility = useSectionVisibility();
  const teamVisibility = useSectionVisibility();
  const forceVisibility = useSectionVisibility({ 
    threshold: 0,
    rootMargin: '0px 0px -10% 0px'
  });
  const gardenVisibility = useSectionVisibility();
  const architectureVisibility = useSectionVisibility();
  const evolutionVisibility = useSectionVisibility();
  const transitionVisibility = useSectionVisibility();

  return (
    <Container className={className}>
      {/* Hero Section */}
      <Hero {...enhancedHeroProps} />
      
      {/* Content Section with White Background */}
      <ContentSection>
        {/* Introduction Section */}
        <AnimatedSection visibilityProps={systemVisibility}>
          <SystemOverviewSection introProps={introProps} />
        </AnimatedSection>
        
        {/* Core Components Section */}
        <AnimatedSection visibilityProps={coreVisibility}>
          <CoreComponentsSection coreComponentsProps={safeData.coreComponents} />
        </AnimatedSection>
        
        {/* Team Customization Section */}
        <AnimatedSection visibilityProps={teamVisibility}>
          <TeamCustomizationSection />
        </AnimatedSection>
        
        {/* Force Multipliers Section */}
        <AnimatedSection 
          visibilityProps={forceVisibility} 
          id="force-multiplier-debug-container"
        >
          <ForceMultipliersSection forceMultipliersProps={safeData.forceMultipliers} />
        </AnimatedSection>
        
        {/* The Garden Metaphor Section */}
        <AnimatedSection visibilityProps={gardenVisibility}>
          <GardenMetaphorSection />
        </AnimatedSection>
        
        {/* System Architecture Section */}
        <AnimatedSection visibilityProps={architectureVisibility}>
          <SystemArchitectureSection systemArchitectureProps={systemArchitectureProps} />
        </AnimatedSection>
        
        {/* The Next Evolution Section */}
        <AnimatedSection visibilityProps={evolutionVisibility}>
          <NextEvolutionSection />
        </AnimatedSection>
        
        {/* Transition to Technical Implementation Section */}
        <AnimatedSection visibilityProps={transitionVisibility}>
          <TransitionSection {...transitionProps} />
        </AnimatedSection>
      </ContentSection>
    </Container>
  );
};