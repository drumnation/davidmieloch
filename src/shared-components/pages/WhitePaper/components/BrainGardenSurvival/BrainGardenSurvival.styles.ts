import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Box, Card, Container, List, Text } from '@mantine/core';

// Spacing constants for consistent layout
const SPACING = {
  container: '2rem',
  section: '3rem',
  element: '1.5rem',
  paragraph: '1rem',
  paragraphBreak: '2.5rem',
};

export const ContentSection = styled.div`
  padding: 4rem 2rem;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => theme.colors.dark[8]};
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const Subsection = styled.div`
  margin: 3rem 0;
  padding-left: 1.5rem;
  border-left: 3px solid ${({ theme }) => theme.colors[theme.primaryColor][5]};
  
  @media (max-width: 768px) {
    margin: 2rem 0;
    padding-left: 1rem;
  }
`;

export const SectionParagraph = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #000;
  max-width: 720px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1976d2;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const HighlightBox = styled.div`
  background-color: ${({ theme }) => `${theme.colors[theme.primaryColor][0]}`};
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][5]};
  padding: 1.25rem;
  margin: 1.5rem 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadows.xs};
  
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => `rgba(${theme.colors[theme.primaryColor][9]}, 0.15)`};
  }
`;

export const InsightCallout = styled.div`
  background-color: ${({ theme }) => `${theme.colors.cyan[0]}`};
  border: 1px solid ${({ theme }) => theme.colors.cyan[3]};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.25rem;
  margin: 2rem 0;
  position: relative;
  
  &::before {
    content: 'Key Insight';
    display: block;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.cyan[7]};
    margin-bottom: 0.75rem;
  }
  
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => `rgba(${theme.colors.cyan[9]}, 0.15)`};
    border-color: ${({ theme }) => theme.colors.cyan[7]};
    
    &::before {
      color: ${({ theme }) => theme.colors.cyan[5]};
    }
  }
`;

export const CTAContainer = styled(motion.div)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors[theme.primaryColor][6]}, ${({ theme }) => theme.colors.cyan[6]});
  padding: 3rem 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
  color: white;
  margin-top: 4rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-top: 3rem;
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

export const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Styled-components that reference Mantine theme values
export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: calc(var(--mantine-spacing-xl) * 2);

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 100%;

  @media (min-width: 992px) {
    max-width: 55%;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 900;
  line-height: 1.2;
  color: var(--mantine-color-blue-6);

  @media (min-width: 992px) {
    font-size: 52px;
  }
`;

export const HeroDescription = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: var(--mantine-color-gray-7);
`;

export const HeroButton = styled.button`
  margin-top: var(--mantine-spacing-md);
  background-color: var(--mantine-color-blue-6);
  color: var(--mantine-color-white);
  
  &:hover {
    background-color: var(--mantine-color-blue-7);
  }
`;

export const HeroImageContainer = styled.div`
  margin-top: var(--mantine-spacing-lg);
  width: 100%;

  @media (min-width: 992px) {
    margin-top: 0;
    width: 40%;
  }
`;

export const HeroImage = styled.img`
  border-radius: var(--mantine-radius-md);
  box-shadow: var(--mantine-shadow-md);
`;

export const SectionDescriptionText = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: var(--mantine-color-gray-7);
  margin-bottom: var(--mantine-spacing-lg);
`;

export const HighlightCardStyled = styled.div`
  background-color: var(--mantine-color-gray-0);
  border-color: var(--mantine-color-blue-1);
  border-width: 2px;
`;

export const HighlightTitleStyled = styled.h3`
  color: var(--mantine-color-blue-6);
  font-weight: 700;
`;

export const HighlightTextStyled = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #000;
`;

export const InsightBoxStyled = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][6]};
  border-radius: ${({ theme }) => theme.radius.sm}px;
`;

export const InsightTextStyled = styled.div`
  color: #000;
`;

export const CTASectionStyled = styled.div`
  margin-top: var(--mantine-spacing-xl-3);
  margin-bottom: var(--mantine-spacing-xl-2);
`;

export const SeparatorLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--mantine-color-gray-3);
  margin: 0.5rem 0 1rem 0;
`;

export const HeadingText = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  color: #000;
`;

export const SubHeadingText = styled.div`
  font-weight: 700;
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  color: #000;
`;

export const BlueInfoCard = styled.div`
  background-color: rgba(66, 133, 244, 0.08);
  border-color: var(--mantine-color-blue-3);
`;

export const ItalicQuoteBox = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  border-left: 3px solid var(--mantine-color-gray-5);
  border-radius: 4px;
  font-style: italic;
  margin: 1rem 0;
  padding: 1rem;
`;

export const GreenInfoCard = styled.div`
  background-color: rgba(100, 180, 100, 0.05);
  border-color: var(--mantine-color-green-3);
  max-width: 400px;
  margin-bottom: 16px;
`;

export const BrainGardenHeading = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const StepList = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #000;
  margin-bottom: 24px;
`;

export const DescriptionText = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: #000;
  margin-bottom: 20px;
`;

export const BlueCalloutBox = styled.div`
  background-color: rgba(66, 133, 244, 0.05);
  border-radius: 4px;
  text-align: center;
  padding: 1rem;
`;

export const LargeDescriptionText = styled.div`
  font-size: 24px;
  line-height: 1.6;
  color: #000;
  font-weight: 400;
  margin-bottom: 24px;
`;

export const ScrollableSection = styled.div`
  scroll-margin-top: 100px;
`;

// New Vertical Stack Container
export const VerticalStackContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1.75rem; /* Reduced gap */
    width: 100%;
    margin: 0 auto; /* Keep centering */
    padding-left: 1rem; /* px-4 */
    padding-right: 1rem; /* px-4 */

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding-left: 1.5rem; /* sm:px-6 */
        padding-right: 1.5rem; /* sm:px-6 */
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        padding-left: 2rem; /* lg:px-8 */
        padding-right: 2rem; /* lg:px-8 */
    }
`;

export const StyledContainer = styled(Container)`
    padding-top: 4rem;
`;

// Subtle divider for transition
export const TransitionDivider = styled(Box)`
    height: 1px;
    background: linear-gradient(to right, transparent, ${({ theme }) => theme.colors.gray[3]}, transparent);
    margin-top: 1rem; // Add some space above the divider
    margin-bottom: 2rem; // Add space below the divider before the next section
    opacity: 0.6;
`;

// Centering styles for SectionTitle in Card 1
export const CenteredTitle = styled.div`
    text-align: center;
    margin-bottom: 0 !important; // Override default margin if necessary

    h2 {
        margin-bottom: 0 !important; // Target the h2 specifically
    }
`;

// Wrapper to center content within specific cards
export const CenteredContentWrapper = styled(Box)`
    max-width: 720px; /* Max width for readable text */
    margin-left: auto;
    margin-right: auto;
    width: 100%; /* Ensure it takes full width up to max-width */
`;

// Icon wrapper for Card 2
export const IconWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.blue[0]}; /* bg-blue-100 */
    color: ${({ theme }) => theme.colors.blue[6]}; /* text-blue-600 */
    border-radius: 50%; /* rounded-full */
    padding: ${({ theme }) => theme.spacing.xs}; /* p-2ish */
    display: inline-flex; /* To fit content */
    align-items: center;
    justify-content: center;
    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

// Styled callout for Card 5
export const HighlightCallout = styled.div`
    background-color: ${({ theme }) => theme.colors.blue[0]};
    border-left: 4px solid ${({ theme }) => theme.colors.blue[5]};
    border-radius: ${({ theme }) => theme.radius.sm};
    padding: ${({ theme }) => theme.spacing.md};
`;

export const StyledBoxWithFirstChildMargin = styled(Box)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > *:first-child {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    text-align: left;
    & > *:first-child {
      margin-bottom: 0;
    }
  }
`; 