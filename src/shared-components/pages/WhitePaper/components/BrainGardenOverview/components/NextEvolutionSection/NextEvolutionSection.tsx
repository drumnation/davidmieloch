import React from 'react';
import { Typography } from '@shared-components/atoms/Typography';
import { NextEvolutionSectionProps } from './NextEvolutionSection.types';
import { NextEvolutionSectionMobile } from './NextEvolutionSection.mobile';
import { NextEvolutionSectionWeb } from './NextEvolutionSection.web';
import {
  ContentContainer,
  fadeInUp,
  staggerContainer
} from '../../BrainGardenOverview.styles';
import {
  SectionTitleComponent
} from '../../BrainGardenOverview.logic';
import {
  TimelineContainer,
  TimelineMainLine,
  PhaseContainer,
  PhaseTitle,
  PhaseContent,
  PhaseItemsList,
  PhaseItem,
  PhaseItemDot,
  PhaseItemContent,
  CapabilityCardsGrid,
  CapabilityCard,
  ResearchAreaContainer,
  ResearchGridContainer,
  ResearchAreaCard,
  IconWrapper,
  VisionValueContainer,
  SectionSubTitleComponent,
  BenefitGrid,
  BenefitCard,
} from './NextEvolutionSection.styles';
import { Grid, Paper, Box, useMantineTheme, MantineTheme } from '@mantine/core';
import {
  BiNetworkChart,
  BiBrain,
  BiPlug,
  BiCog,
  BiCodeAlt,
  BiExtension,
  BiShow
} from 'react-icons/bi';
import { GiPuzzle } from 'react-icons/gi';
import { useMediaQuery } from '@mantine/hooks';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';

// Import required icons
import { BsCodeSlash } from 'react-icons/bs';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaBrain } from 'react-icons/fa';

// Define the type for a timeline item
interface TimelineItem {
  title: string;
  description: string;
}

// Define types for R&D and Principles
interface ResearchAreaItem {
  icon: React.ElementType;
  title: string;
  description: string;
}
interface PrincipleItemData {
  icon: React.ElementType;
  title: string;
  description: string;
}

// Helper for keyword highlighting
const HighlightKeywords: React.FC<{ text: string }> = ({ text }) => {
  const keywords = [
    'multi-agent collaboration', 'hierarchical task delegation', 'specialized agent roles',
    'on-demand skill integration', 'Skill-Jacks via MCP', 'universal memory compatibility', 'advanced knowledge graph capabilities',
    'deep integrations', 'developer tools', 'user environments',
    'feedback loops', 'dynamic rule profile management', 'autonomously enhance'
  ];
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? <strong key={index}>{part}</strong> : part
      )}
    </>
  );
};

// Use styled components with media queries to handle the display logic
const MobileWrapper = styled.div`
  display: block;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopWrapper = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

export const NextEvolutionSection: React.FC<NextEvolutionSectionProps> = (props) => {
  return (
    <>
      <MobileWrapper>
        <NextEvolutionSectionMobile {...props} />
      </MobileWrapper>
      <DesktopWrapper>
        <NextEvolutionSectionWeb {...props} />
      </DesktopWrapper>
    </>
  );
};