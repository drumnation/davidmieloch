import React from 'react';
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
import { ParallelDevelopmentSection } from './components/ParallelDevelopmentSection';
import { ForceMultipliersSection } from './components/ForceMultipliersSection';
import { GardenMetaphorSection } from './components/GardenMetaphorSection';
import { SystemArchitectureSection } from './components/SystemArchitectureSection';
import { NextEvolutionSection } from './components/NextEvolutionSection';
import { NavigationSection } from './components/NavigationSection';
import { HumanAdvantageSection } from './components/HumanAdvantageSection';
import { KeyBenefitsSection } from './components/KeyBenefitsSection';
import { CTASection } from './components/CTASection';

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
    processedCTA
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

  return (
    <Container className={className}>
      <GlobalStyles />
      
      {/* Hero Section */}
      <Hero {...enhancedHeroProps} />
      
      {/* Content Section with White Background */}
      <ContentSection
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
      >
        {/* Introduction Section */}
        <SystemOverviewSection introProps={introProps} />
        
        {/* Core Components Section */}
        <CoreComponentsSection coreComponentsProps={safeData.coreComponents} />
        
        {/* Team Customization Section */}
        <TeamCustomizationSection />
        
        {/* Parallel Development Section */}
        <ParallelDevelopmentSection />
        
        {/* Force Multipliers Section */}
        <ForceMultipliersSection forceMultipliersProps={safeData.forceMultipliers} />
        
        {/* The Garden Metaphor Section */}
        <GardenMetaphorSection />
        
        {/* System Architecture Section */}
        <SystemArchitectureSection systemArchitectureProps={systemArchitectureProps} />
        
        {/* The Next Evolution Section */}
        <NextEvolutionSection />
        
        {/* Navigation Section */}
        <NavigationSection navigationProps={safeData.navigation} />
        
        {/* The Human Advantage Section */}
        <HumanAdvantageSection />
        
        {/* Key Benefits Section */}
        <KeyBenefitsSection keyBenefitsProps={safeData.keyBenefits} />
        
        {/* CTA Section */}
        <CTASection ctaProps={processedCTA} />
      </ContentSection>
    </Container>
  );
};