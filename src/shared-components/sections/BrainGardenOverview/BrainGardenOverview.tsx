"use client";

import React from 'react';
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

  // Create separate intersection observers for each section
  const [systemRef, systemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [coreRef, coreInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [forceRef, forceInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [gardenRef, gardenInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [architectureRef, architectureInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [evolutionRef, evolutionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [transitionRef, transitionInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const fadeInStyle = (inView: boolean) => ({
    opacity: inView ? 1 : 0,
    transform: `translateY(${inView ? 0 : 30}px)`,
    transition: 'opacity 0.6s ease-out, transform 0.8s ease-out'
  });

  return (
    <div>
      <Container className={className}>
        {/* Hero Section */}
        <Hero {...enhancedHeroProps} />
        
        {/* Content Section with White Background */}
        <ContentSection>
          {/* Introduction Section */}
          <div ref={systemRef} style={fadeInStyle(systemInView)}>
            <SystemOverviewSection introProps={introProps} />
          </div>
          
          {/* Core Components Section */}
          <div ref={coreRef} style={fadeInStyle(coreInView)}>
            <CoreComponentsSection coreComponentsProps={safeData.coreComponents} />
          </div>
          
          {/* Team Customization Section */}
          <div ref={teamRef} style={fadeInStyle(teamInView)}>
            <TeamCustomizationSection />
          </div>
          
          {/* Force Multipliers Section */}
          <div ref={forceRef} style={fadeInStyle(forceInView)}>
            <ForceMultipliersSection forceMultipliersProps={safeData.forceMultipliers} />
          </div>
          
          {/* The Garden Metaphor Section */}
          <div ref={gardenRef} style={fadeInStyle(gardenInView)}>
            <GardenMetaphorSection />
          </div>
          
          {/* System Architecture Section */}
          <div ref={architectureRef} style={fadeInStyle(architectureInView)}>
            <SystemArchitectureSection systemArchitectureProps={systemArchitectureProps} />
          </div>
          
          {/* The Next Evolution Section */}
          <div ref={evolutionRef} style={fadeInStyle(evolutionInView)}>
            <NextEvolutionSection />
          </div>
          
          {/* Transition to Technical Implementation Section */}
          <div ref={transitionRef} style={fadeInStyle(transitionInView)}>
            <TransitionSection {...transitionProps} />
          </div>
        </ContentSection>
      </Container>
    </div>
  );
};