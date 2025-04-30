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
  IconHandClick, // CTA
  IconCrosshair,
  IconFileText,
  IconRobot,
  IconCpu,
  IconBrain
} from '@tabler/icons-react';

// Import new components
import { RecursiveJourney } from './components/RecursiveJourney/RecursiveJourney';
import { BrainGardenSurvival } from './components/BrainGardenSurvival/BrainGardenSurvival';

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
  { id: 'autopilot-introduction', title: 'Introduction', level: 1, icon: <IconInfoCircle size={16} /> },
  { id: 'autopilot-comparison', title: 'Comparison Table', level: 1, icon: <IconTable size={16} /> },
  { id: 'autopilot-reality', title: 'Reality vs Hollywood', level: 1, icon: <IconMasksTheater size={16} /> },
  { id: 'autopilot-strategic-focus', title: 'Strategic Focus', level: 1, icon: <IconCrosshair size={16} /> },
  { id: 'ai-integration-journey', title: 'AI Integration Journey', level: 1, icon: <IconChartArcs size={16} /> },
  { id: 'autopilot-critical-warning', title: 'Critical Warning', level: 1, icon: <IconAlertTriangle size={16} /> },
  { id: 'autopilot-leadership-blueprint', title: 'Leadership Blueprint', level: 1, icon: <IconFileText size={16} /> },

  // Brain Garden Overview (Level 0)
  { id: 'brain-garden-overview', title: 'Brain Garden Overview', level: 0, icon: <IconPlant2 size={18} /> },
  { id: 'garden-system-overview', title: 'System Overview', level: 1, icon: <IconSettingsCog size={16} /> },
  { id: 'garden-core-components', title: 'Core Components', level: 1, icon: <IconAtom2 size={16} /> },
  { id: 'garden-team-customization', title: 'Team Customization', level: 1, icon: <IconUsersGroup size={16} /> },
  { id: 'garden-force-multipliers', title: 'Force Multipliers', level: 1, icon: <IconMultiplier1x size={16} /> },
  { id: 'garden-metaphor', title: 'The Garden Metaphor', level: 1, icon: <IconFlower size={16} /> },
  { id: 'garden-evolution', title: 'The Next Evolution', level: 1, icon: <IconTrendingUp size={16} /> },

  // Recursive Journey (Level 0)
  { id: 'recursive-journey', title: 'Recursive Journey', level: 0, icon: <IconChartArcs size={18} /> },
  { id: 'context-initialization', title: 'Context Initialization', level: 1, icon: <IconPlayerPlay size={16} /> },
  { id: 'feature-task-planning', title: 'Feature Task Planning', level: 1, icon: <IconChecklist size={16} /> },
  { id: 'intelligent-execution', title: 'Intelligent Execution', level: 1, icon: <IconRobot size={16} /> },
  { id: 'self-rescue-skill-jacks', title: 'Self-Rescue with Skill Jacks', level: 1, icon: <IconCpu size={16} /> },
  { id: 'protecting-the-brain', title: 'Protecting the Brain', level: 1, icon: <IconBrain size={16} /> },
  { id: 'why-it-works', title: 'Why It Works', level: 1, icon: <IconInfoCircle size={16} /> },

  // Brain Garden Survival (Level 0) - renamed to "The Breakthrough"
  { id: 'brain-garden-survival', title: 'The Breakthrough', level: 0, icon: <IconPlant2 size={18} /> },
  { id: 'why-continuous-evolution-matters', title: 'Why Evolution Matters', level: 1, icon: <IconTrendingUp size={16} /> },
  { id: 'when-you-hire-me', title: 'Inheriting the Future', level: 1, icon: <IconHandClick size={16} /> },
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
          <div id="recursive-journey" style={{ scrollMarginTop: '100px' }}>
            <ErrorBoundary fallback={<div>Error loading recursive journey section. Please refresh.</div>}>
              <RecursiveJourney />
            </ErrorBoundary>
          </div>
          <div id="brain-garden-survival" style={{ scrollMarginTop: '100px' }}>
            <ErrorBoundary fallback={<div>Error loading brain garden survival section. Please refresh.</div>}>
              <BrainGardenSurvival />
            </ErrorBoundary>
          </div>
        </FadeInContainer>
      </OuterContainer>
    </Container>
  );
};

export default WhitePaper;