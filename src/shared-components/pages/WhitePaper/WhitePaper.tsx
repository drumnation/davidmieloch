"use client";

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from '@shared-components/molecules/ErrorBoundary';
import { WhitePaperProps } from './WhitePaper.types';
import { Container, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { SubNavController } from '@shared-components/navigation/PageSubNav';
import { SubNavItem } from '@shared-components/navigation/PageSubNav/PageSubNav.types';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { selectIsPlayerMinimized } from '@store/slices/playerUiSlice';
import { useMediaQuery } from '@mantine/hooks';

// Import components directly
import { AiSkepticToExpert } from './components/AiSkepticToExpert/AiSkepticToExpert';
import { AiAutopilotAnalogy } from './components/AiAutopilotAnalogy/AiAutopilotAnalogy';
import { BrainGardenOverview } from './components/BrainGardenOverview/BrainGardenOverview';
import { RealWorldImpact } from './components/RealWorldImpact/RealWorldImpact';
import { Hero } from '@shared-components/organisms/Hero';

// Import content constants for BrainGardenOverview
import { defaultContent as brainGardenContent } from './components/BrainGardenOverview/BrainGardenOverview.constants';

// Import icons
import {
  IconTransform,
  IconPlaneTilt,
  IconPlant2,
  IconChartInfographic,
  IconTargetArrow,
  IconQuote,
  IconChecklist,
  IconNews,
  IconTextCaption,
  IconInfoCircle,
  IconDeviceDesktopAnalytics, // For Reality
  IconMessageCircleQuestion, // For Trend
  IconListCheck, // For Solutions
  IconArrowBigDownLines, // For Conclusion
  IconTable, // Comparison Table
  IconMasksTheater, // Reality vs Hollywood
  IconFocusCentered, // Strategy
  IconChartArcs, // Dunning Kruger
  IconVectorTriangle, // Diagram
  IconAlertTriangle, // Warning
  IconFileCode2, // Alternative icon for Blueprint
  IconSettingsCog, // System Overview
  IconAtom2, // Core Components
  IconUsersGroup, // Team Customization
  IconMultiplier1x, // Force Multipliers
  IconFlower, // Metaphor
  IconTopologyStar3, // Architecture
  IconTrendingUp, // Evolution
  IconSwitchHorizontal, // Transition
  IconFileCertificate, // Conclusion Intro
  IconBulb, // Insights
  IconSchema, // Framework
  IconPlayerPlay, // Current State
  IconHandClick // CTA
} from '@tabler/icons-react';

// Create styled components for animation
const FadeInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: 100ms;
  position: relative;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const OuterContainer = styled.div`
  width: 100%;
  position: relative;
`;

// Define accurate two-tier navigation items based on component structure
const whitePaperNavItems: SubNavItem[] = [
  // AI Skeptic to Expert (Level 0)
  { id: 'skeptic-to-expert', title: 'AI Skeptic to Expert', level: 0, icon: <IconTransform size={18} /> },
  { id: 'skeptic-reality', title: 'Reality of AI Tools', level: 1, icon: <IconDeviceDesktopAnalytics size={16} /> },
  { id: 'skeptic-quotes', title: 'Developer Quotes', level: 1, icon: <IconQuote size={16} /> },
  { id: 'skeptic-trend', title: 'The Disturbing Trend', level: 1, icon: <IconMessageCircleQuestion size={16} /> },
  { id: 'skeptic-solutions', title: 'Problems & Solutions', level: 1, icon: <IconListCheck size={16} /> },
  { id: 'skeptic-conclusion', title: 'From Skeptic to Innovator', level: 1, icon: <IconArrowBigDownLines size={16} /> },

  // AI Autopilot Analogy (Level 0)
  { id: 'autopilot-analogy', title: 'AI Autopilot Analogy', level: 0, icon: <IconPlaneTilt size={18} /> },
  { id: 'autopilot-hero', title: 'Hero', level: 1, icon: <IconTargetArrow size={16} /> },
  { id: 'autopilot-intro', title: 'Introduction', level: 1, icon: <IconInfoCircle size={16} /> },
  { id: 'autopilot-comparison', title: 'Comparison Table', level: 1, icon: <IconTable size={16} /> },
  { id: 'autopilot-reality', title: 'Reality vs Hollywood', level: 1, icon: <IconMasksTheater size={16} /> },
  { id: 'autopilot-strategy', title: 'Strategic Focus', level: 1, icon: <IconFocusCentered size={16} /> },
  { id: 'autopilot-dunning-kruger', title: 'Dunning-Kruger Effect', level: 1, icon: <IconChartArcs size={16} /> },
  { id: 'autopilot-warning', title: 'Critical Warning', level: 1, icon: <IconAlertTriangle size={16} /> },
  { id: 'autopilot-blueprint', title: 'Leadership Blueprint', level: 1, icon: <IconFileCode2 size={16} /> },

  // Brain Garden Overview (Level 0)
  { id: 'brain-garden-overview', title: 'Brain Garden Overview', level: 0, icon: <IconPlant2 size={18} /> },
  { id: 'garden-system-overview', title: 'System Overview', level: 1, icon: <IconSettingsCog size={16} /> },
  { id: 'garden-core-components', title: 'Core Components', level: 1, icon: <IconAtom2 size={16} /> },
  { id: 'garden-team-customization', title: 'Team Customization', level: 1, icon: <IconUsersGroup size={16} /> },
  { id: 'garden-force-multipliers', title: 'Force Multipliers', level: 1, icon: <IconMultiplier1x size={16} /> },
  { id: 'garden-metaphor', title: 'The Garden Metaphor', level: 1, icon: <IconFlower size={16} /> },
  { id: 'garden-evolution', title: 'The Next Evolution', level: 1, icon: <IconTrendingUp size={16} /> },
  { id: 'garden-transition', title: 'Transition', level: 1, icon: <IconSwitchHorizontal size={16} /> },

  // Real World Impact (Level 0)
  { id: 'real-world-impact', title: 'Real World Impact', level: 0, icon: <IconChartInfographic size={18} /> },
  { id: 'impact-hero', title: 'Hero', level: 1, icon: <IconTargetArrow size={16} /> },
  { id: 'impact-conclusion-intro', title: 'Conclusion Intro', level: 1, icon: <IconFileCertificate size={16} /> },
  { id: 'impact-insights', title: 'Journey Insights', level: 1, icon: <IconBulb size={16} /> },
  { id: 'impact-framework', title: 'The Framework', level: 1, icon: <IconSchema size={16} /> },
  { id: 'impact-current-state', title: 'Current State', level: 1, icon: <IconPlayerPlay size={16} /> },
  { id: 'impact-cta', title: 'Call To Action', level: 1, icon: <IconHandClick size={16} /> },
];

export const WhitePaper: React.FC<WhitePaperProps> = ({ id = 'whitepaper', className, onReady }) => {
  // Get player state from Redux store
  const isPlayerMinimized = useSelector(selectIsPlayerMinimized);

  // Check viewport size
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  return (
    <Container id={id} className={className}>
      {/* Conditionally render SubNavController based on viewport and player state */}
      {(isDesktop || isPlayerMinimized) && <SubNavController items={whitePaperNavItems} />}

      <OuterContainer>
        <FadeInContainer>
          <div id="skeptic-to-expert" style={{ scrollMarginTop: '100px' }}>
            <ErrorBoundary fallback={<div>Error loading skeptic to expert section. Please refresh.</div>}>
              <AiSkepticToExpert onReady={onReady} />
            </ErrorBoundary>
          </div>
          <div id="autopilot-analogy" style={{ scrollMarginTop: '100px' }}>
            <ErrorBoundary fallback={<div>Error loading autopilot section. Please refresh.</div>}>
              <AiAutopilotAnalogy />
            </ErrorBoundary>
          </div>
          <div id="brain-garden-overview" style={{ scrollMarginTop: '100px' }}>
            <ErrorBoundary fallback={<div>Error loading overview section. Please refresh.</div>}>
              <BrainGardenOverview
                heroProps={brainGardenContent.hero}
                introProps={brainGardenContent.intro}
                coreComponentsProps={brainGardenContent.coreComponents}
                forceMultipliersProps={brainGardenContent.forceMultipliers}
                systemArchitectureProps={brainGardenContent.systemArchitecture}
                navigationProps={brainGardenContent.navigation}
                keyBenefitsProps={brainGardenContent.keyBenefits}
                ctaProps={brainGardenContent.cta}
              />
            </ErrorBoundary>
          </div>
          <div id="real-world-impact" style={{ scrollMarginTop: '100px' }}>
            <ErrorBoundary fallback={<div>Error loading impact section. Please refresh.</div>}>
              <RealWorldImpact />
            </ErrorBoundary>
          </div>
          {/* Additional sections will be added here as they are developed */}
        </FadeInContainer>
      </OuterContainer>
    </Container>
  );
};

export default WhitePaper;