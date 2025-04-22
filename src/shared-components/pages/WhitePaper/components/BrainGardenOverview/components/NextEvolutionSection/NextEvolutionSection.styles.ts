import styled from 'styled-components';
// Removed keyframes from @emotion/react
// Removed Box, Grid, Paper from @mui/material
import { Grid as MantineGrid, Paper as MantinePaper, Box as MantineBox, PaperProps } from '@mantine/core'; // Import Mantine components & PaperProps
import { SPACING } from '../../BrainGardenOverview.styles';
// import { Typography } from '@shared-components/atoms/Typography';

// Animation variants (keeping these for reference but they won't be used anymore)
export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const cardStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const phaseStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.3
    }
  }
};

// Timeline styles
export const TimelineContainer = styled.div`
  position: relative;
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`;

export const TimelineMainLine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: 4px;
  background-color: #e0e0e0;
`;

export const PhaseContainer = styled.div`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PhaseTitle = styled.div`
  background-color: #6A0DAD;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const PhaseContent = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 48rem;

  @media (max-width: 768px) {
    /* Target the first Typography (title) */
    & > span[data-variant="body"][data-weight="bold"] {
      display: block;
    }

    /* Target the separator span */
    .timeline-separator {
      display: none;
    }

    /* Target the second Typography (description) */
    & > span[data-variant="body"][data-color="secondary"] {
      display: block;
      margin-top: 0.25rem; /* Add some space between title and description */
    }
  }
`;

export const PhaseItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PhaseItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const PhaseItemDot = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 0.25rem;
`;

export const PhaseItemContent = styled.div`
  flex: 1;

  /* Hide the separator span globally */
  .timeline-separator {
    display: none;
  }

  @media (max-width: 768px) {
    /* Mobile-specific styles */
    /* Add space above the description wrapper */
    .timeline-description-wrapper {
      margin-top: 0.25rem;
    }
    
    /* Remove the rule forcing inline display as it's no longer needed */
    /* & > span[data-variant="body"][data-weight="bold"],
    .timeline-description-wrapper > span[data-variant="body"][data-color="secondary"] {
      display: inline;
    } */
  }
`;

// Capability cards styles
export const CapabilityCardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

export const CapabilityCard = styled.div`
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  width: 100%;
  
  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

// Research area styles
export const ResearchAreaContainer = styled(MantineBox)`
  margin-top: 3rem;
`;

export const ResearchGridContainer = styled(MantineGrid)`
  // Inherits Mantine Grid props like gutter, etc.
`;

// Update ResearchAreaCard to style Mantine Paper
export const ResearchAreaCard = styled(MantinePaper).attrs({
  shadow: 'xs',
  padding: 'lg',
  withBorder: true,
})`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  // Use styled-components theme
  border-color: ${({ theme }) => theme.colors.border || '#e0e0e0'}; 
  background-color: ${({ theme }) => theme.colors.background?.paper || '#ffffff'}; // Use standard theme structure
`;

// Shared Icon Wrapper Style (using Mantine Box)
export const IconWrapper = styled(MantineBox)`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  // Use styled-components theme
  color: ${({ theme }) => theme.colors.primary || '#2563eb'}; 
  line-height: 1;
`;

// New Section: From Vision to Value
export const VisionValueContainer = styled(MantineBox)`
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

// Title for the new section and R&D section
export const SectionSubTitleComponent = styled(MantineBox)`
  margin-bottom: 1.5rem;
  text-align: left; /* Default alignment - Removed mobile centering */
`;

export const BenefitGrid = styled(MantineGrid)`
  margin-bottom: 3rem;
`;

// BenefitCard styling Mantine Paper
export const BenefitCard = styled(MantinePaper).attrs({
  shadow: 'xs',
  padding: 'lg',
  withBorder: true,
})`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  // Use styled-components theme
  border-color: ${({ theme }) => theme.colors.border || '#e0e0e0'}; 
  background-color: ${({ theme }) => theme.colors.background?.light || '#f8f9fa'}; // Use standard theme structure
`;

// RESTORED: PrincipleList
export const PrincipleList = styled(MantineBox)`
  margin-bottom: 2rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr; // Default to single column
  /* Removed media query for larger screens */
`;

// RESTORED: PrincipleCard styling Mantine Paper
export const PrincipleCard = styled(MantinePaper).attrs({
  shadow: 'xs',
  padding: 'lg',
  withBorder: true,
  component: 'div',
})`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   height: 100%;
   // Use styled-components theme
   border-color: ${({ theme }) => theme.colors.border || '#e0e0e0'};
   background-color: ${({ theme }) => theme.colors.background?.paper || '#ffffff'}; // Use standard theme structure
`;