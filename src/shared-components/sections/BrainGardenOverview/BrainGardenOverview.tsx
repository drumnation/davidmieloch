"use client";

import React from 'react';
import { useSpring, useTrail } from '@react-spring/web';
import { Hero } from '../../organisms/Hero';
import { useBrainGardenOverview } from './BrainGardenOverview.hook';
import {
  Container,
  ContentSection,
} from './BrainGardenOverview.styles';
import { useInView } from 'react-intersection-observer';

// Import all the section components
import { SystemOverviewSection } from './components/SystemOverviewSection';
import { CoreComponentsSection } from './components/CoreComponentsSection';
import { TeamCustomizationSection } from './components/TeamCustomizationSection';
import { ForceMultipliersSection } from './components/ForceMultipliersSection';
import { GardenMetaphorSection } from './components/GardenMetaphorSection';
import { SystemArchitectureSection } from './components/SystemArchitectureSection';
import { NextEvolutionSection } from './components/NextEvolutionSection';
import { TransitionSection } from './components/TransitionSection';

export const BrainGardenOverview = () => {
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
  } = useBrainGardenOverview({});

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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div>
      <Container className={className}>
        {/* Hero Section */}
        <Hero {...enhancedHeroProps} />
        
        {/* Content Section with White Background */}
        <ContentSection ref={ref}>
          {/* Introduction Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s' }}>
            <SystemOverviewSection introProps={introProps} />
          </div>
          
          {/* Core Components Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s' }}>
            <CoreComponentsSection coreComponentsProps={safeData.coreComponents} />
          </div>
          
          {/* Team Customization Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s' }}>
            <TeamCustomizationSection />
          </div>
          
          {/* Force Multipliers Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s' }}>
            <ForceMultipliersSection forceMultipliersProps={safeData.forceMultipliers} />
          </div>
          
          {/* The Garden Metaphor Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s' }}>
            <GardenMetaphorSection />
          </div>
          
          {/* System Architecture Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s' }}>
            <SystemArchitectureSection systemArchitectureProps={systemArchitectureProps} />
          </div>
          
          {/* The Next Evolution Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s' }}>
            <NextEvolutionSection />
          </div>
          
          {/* Transition to Technical Implementation Section */}
          <div style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: 'opacity 0.6s, transform 0.8s', transitionDelay: '0.2s' }}>
            <TransitionSection {...transitionProps} />
          </div>
        </ContentSection>
      </Container>
    </div>
  );
};