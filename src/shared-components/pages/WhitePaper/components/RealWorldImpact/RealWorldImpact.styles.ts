import styled, { createGlobalStyle, css, RuleSet } from 'styled-components';
import { motion } from 'framer-motion';
import { Typography } from '@shared-components/atoms/Typography';
import { StyledProps } from './RealWorldImpact.types';
import { MantineTheme, rem } from '@mantine/core';
import React from 'react';

// Helper to safely parse theme spacing values
const parseSpacing = (value: string | number): number => {
  if (typeof value === 'number') return value;
  // Use rem conversion internally for calculations if needed, or just parse
  const parsed = parseFloat(value.toString().replace('rem', ''));
  return isNaN(parsed) ? 0 : parsed * 16; // Assuming base 16px for rem
};

// SPACING values are now constants derived from a theme instance if needed
// Or better, use theme directly in styled components where possible
// Let's define some standard values based on common Mantine sizes
const MantineSizes = {
  xs: rem(10),
  sm: rem(12),
  md: rem(16),
  lg: rem(24),
  xl: rem(32),
};

// Define SPACING constants using MantineSizes or rem()
export const SPACING_CONSTANTS = {
  section: `${rem(64)}`, // Use string concatenation instead of arithmetic
  paragraph: MantineSizes.xl,
  paragraphBreak: MantineSizes.xl,
  element: MantineSizes.lg,
  elementBreak: rem(40),
  container: MantineSizes.lg,
  sectionBreak: rem(80),
  contentWidth: '1200px',
  mobile: {
    section: `${rem(48)}`, // Use string concatenation instead of arithmetic
    paragraph: MantineSizes.lg,
    paragraphBreak: MantineSizes.lg,
    element: MantineSizes.md,
    elementBreak: rem(20),
    container: MantineSizes.md,
    sectionBreak: rem(40),
  },
  mobileBreak: MantineSizes.md,
  BASE: rem(16),
  X_SMALL: rem(8),
  SMALL: rem(12),
  LARGE: rem(32),
};

// Define styles requiring theme access as functions returning RuleSet
const getRealWorldImpactSectionStyle = (theme: MantineTheme): RuleSet<object> => css`
  max-width: ${SPACING_CONSTANTS.contentWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

export const GlobalStyles = createGlobalStyle<{ theme: MantineTheme }>`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.black};

    [data-mantine-color-scheme="dark"] & {
       background-color: ${({ theme }) => theme.colors.dark[7]};
       color: ${({ theme }) => theme.colors.dark[0]};
    }
  }

  .real-world-impact-content-section {
     /* Apply styles using the function */
     ${({ theme }) => getRealWorldImpactSectionStyle(theme)}
  }
`;

export const containerStyle = (theme: MantineTheme): RuleSet<object> => css`
  max-width: ${SPACING_CONSTANTS.contentWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

export const contentSectionStyle = (theme: MantineTheme) => ({
  maxWidth: SPACING_CONSTANTS.contentWidth,
  margin: '0 auto',
  padding: `0 ${theme.spacing.lg}`,
});

export const sectionContainerStyle = {
  marginBottom: SPACING_CONSTANTS.sectionBreak,
  width: '100%',
};

export const sectionContainerWithoutMarginStyle = {
  width: '100%',
};

export const sectionContainerTopMarginStyle = {
  marginTop: SPACING_CONSTANTS.sectionBreak,
  width: '100%',
};

export const sectionContainerSmallTopMarginStyle = {
  marginTop: SPACING_CONSTANTS.paragraphBreak,
  width: '100%',
};

// Use css prop or style objects for theme-dependent styles not in styled components
export const comparisonSectionStyle = {
  backgroundColor: (theme: MantineTheme) =>
    theme.colors.dark[7],
  borderRadius: (theme: MantineTheme) => theme.radius.md,
  padding: SPACING_CONSTANTS.BASE,
  marginBottom: SPACING_CONSTANTS.BASE,
};

export const titleContainerStyle = {
  marginBottom: SPACING_CONSTANTS.elementBreak,
};

export const paragraphContainerStyle = {
  marginBottom: SPACING_CONSTANTS.paragraphBreak,
};

export const paragraphContainerNoMarginStyle = {
  marginBottom: 0,
};

export const paragraphContainerTopMarginStyle = {
  marginTop: SPACING_CONSTANTS.paragraphBreak,
};

export const titleBlockStyle = (theme: MantineTheme) => ({
  marginBottom: theme.spacing.md,
});

export const descriptionBlockStyle = (theme: MantineTheme) => ({
  marginBottom: theme.spacing.xl,
  maxWidth: '800px',
});

// Correctly type styled components with MantineTheme
interface StyledComponentProps {
  theme: MantineTheme;
}

export const QuoteContainer = styled.div<StyledComponentProps>`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  [data-mantine-color-scheme="dark"] & {
    background-color: ${({ theme }) => theme.colors.dark[6]};
  }
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-left: ${rem(4)} solid ${({ theme }) => theme.colors[theme.primaryColor][6]};
  position: relative;
  margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.lg}`};
`;

export const QuoteText = styled.p<StyledComponentProps>`
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.black};
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const QuoteAuthor = styled.p<StyledComponentProps>`
  font-weight: 600;
  text-align: right;
  color: ${({ theme }) => theme.black};
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const QuoteIcon = styled.div<StyledComponentProps>`
  position: absolute;
  top: -${({ theme }) => theme.spacing.md};
  left: -${({ theme }) => theme.spacing.md};
  font-size: ${rem(48)}; // 3rem
  opacity: 0.1;
  color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
`;

export const StrategyCard = styled.div<StyledComponentProps>`
  padding: ${({ theme }) => theme.spacing.lg};
  border: ${rem(1)} solid ${({ theme }) => theme.colors.gray[3]};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.shadows.xs};

  [data-mantine-color-scheme="dark"] & {
    border-color: ${({ theme }) => theme.colors.dark[4]};
    background: ${({ theme }) => theme.colors.dark[7]};
  }

  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.black};
    [data-mantine-color-scheme="dark"] & {
       color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.gray[8]};
  }
`;

export const Section = styled.div<StyledComponentProps>`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2<StyledComponentProps>`
  font-size: ${rem(40)}; // 2.5rem
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.black};
   [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
   }
`;

export const SectionDescription = styled.div<StyledComponentProps>`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${rem(17.6)}; // 1.1rem
  color: ${({ theme }) => theme.black};
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const InsightCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.blue[6]}, ${({ theme }) => theme.colors.cyan[6]});
    opacity: 0.7;
  }

  h3 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  }

  p {
    color: ${({ theme }) => theme.black};
    line-height: 1.6;
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
`;

export const MetricsGrid = styled.div<StyledComponentProps>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${rem(300)}, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const MetricItem = styled.div<StyledComponentProps>`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};

  h4 {
    font-size: ${rem(32)}; // 2rem
    margin: 0;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin: ${({ theme }) => theme.spacing.xs} 0 0;
    color: ${({ theme }) => theme.black};
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
`;

export const FeatureList = styled.ul<StyledComponentProps>`
  list-style: none;
  padding: 0;
  margin: ${SPACING_CONSTANTS.paragraphBreak} 0;
`;

export const FeatureItem = styled.li<StyledComponentProps>`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  }
`;

export const ActionButton = styled.a<StyledComponentProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  margin-right: ${SPACING_CONSTANTS.elementBreak};
  margin-bottom: ${SPACING_CONSTANTS.elementBreak};
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors[theme.primaryColor][8]};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: ${(props: any) =>
    props.children &&
      React.Children.count(props.children) === 2 ?
      '1fr 1fr' :
      'repeat(auto-fill, minmax(300px, 1fr))'
  };
  }
`;

export const ClosingMessage = styled(Typography)`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  margin: ${SPACING_CONSTANTS.paragraphBreak} auto;
  text-align: center;
  font-weight: 500;
`;

export const WarningBox = styled.div`
  width: 100%;
  padding: 2rem;
  margin-top: 3rem;
  background-color: #ffebee;
  border-left: 4px solid #f44336;
`;

export const WarningContent = styled.div`
  color: ${({ theme }) => theme.black};
  
  h3 {
    color: #d32f2f;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  pre {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border-radius: 4px;
    overflow: auto;
    font-family: monospace;
    font-size: 0.9rem;
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
    
    h3 {
      color: #ef5350;
    }
    
    pre {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
`;

export const QuoteBox = styled.blockquote`
  background: linear-gradient(45deg, ${({ theme }) => theme.colors[theme.primaryColor][6]}, ${({ theme }) => theme.colors.blue[6]});
  color: ${({ theme }) => theme.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  position: relative;
  margin: 2rem 0;
  font-style: italic;
  
  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.6;
  }
  
  footer {
    margin-top: 1rem;
    font-weight: bold;
    text-align: right;
  }
`;

export const QuoteContext = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #e6f7ff;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const BlueprintCard = styled.div<StyledComponentProps>`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const BlueprintHeader = styled.div`
  padding: 1.25rem;
  background-color: #1976d2;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const BlueprintContent = styled.div`
  padding: 1.5rem;
  background-color: #ffffff;
`;

export const BottomLineBox = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  h3 {
    color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.black};
    line-height: 1.6;
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
`;

export const ContentSection = styled.section`
  background-color: var(--mantine-color-body);
  padding: 2rem 0;
`;

export const ContentContainer = styled.div<StyledComponentProps>`
  ${({ theme }) => containerStyle(theme)}
  display: flex;
  flex-direction: column;
`;

export const AnimatedSection = styled(motion.section)`
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

export const Card = styled(motion.div)`
  background: var(--mantine-color-body);
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 2rem;
  border: 1px solid var(--mantine-color-default-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

export const MetricCard = styled.div`
  background: var(--mantine-color-body);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
  text-align: center;
  border: 1px solid var(--mantine-color-default-border);
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;
`;

export const ClosingContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 4rem auto 0;
  padding: 2rem;
  background: var(--mantine-color-body);
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid var(--mantine-color-default-border);
`;

export const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: ${SPACING_CONSTANTS.paragraph};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CaseStudyCard = styled(Card)`
  // Additional case study specific styles can go here
`;

export const CaseStudyImageContainer = styled.div`
  height: 180px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
`;

export const CaseStudyContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CaseStudyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--mantine-color-text);
`;

export const CaseStudyDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.black};
  margin-bottom: 1rem;
  flex: 1;
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const CaseStudyTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

export const CaseStudyTag = styled.span`
  background-color: ${({ theme }) => theme.colors[theme.primaryColor][0] || theme.colors.blue[0]};
  color: ${({ theme }) => theme.colors[theme.primaryColor][6] || theme.colors.blue[6]};
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: white;
  padding: 1.5rem 1.5rem 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 10;
`;

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding-right: 40px;
`;

export const ModalContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  flex: 1;
`;

export const ModalDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.black};
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const ModalSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const ModalSectionTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.black};
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ModalImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 1.5rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
`;

export const ResultList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ResultItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  &:before {
    content: "•";
    color: var(--primary-blue);
    font-weight: bold;
    margin-right: 0.75rem;
  }
`;

export const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  background-color: var(--primary-blue);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--primary-purple);
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.black};
  
  @media (max-width: 576px) {
    font-size: 1.5rem;
    margin-bottom: ${SPACING_CONSTANTS.mobile.element};
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const SubSectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.black};
  
  @media (max-width: 576px) {
    font-size: 1.25rem;
    margin-bottom: ${SPACING_CONSTANTS.mobile.element};
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const Paragraph = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${SPACING_CONSTANTS.paragraph};
  color: ${({ theme }) => theme.black};
  
  @media (max-width: 576px) {
    font-size: 1rem;
    margin-bottom: ${SPACING_CONSTANTS.mobile.paragraph};
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const ParagraphList = styled.div`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${SPACING_CONSTANTS.paragraph};
  color: ${({ theme }) => theme.black};
  
  @media (max-width: 576px) {
    font-size: 1rem;
    margin-bottom: ${SPACING_CONSTANTS.mobile.paragraph};
  }
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const ComponentWrapper = styled.div<{ position?: string }>`
  width: 100%;
  margin: ${SPACING_CONSTANTS.element} 0;
  
  ${props => props.position === 'left' && `
    align-self: flex-start;
    max-width: 800px;
  `}
  
  ${props => props.position === 'right' && `
    align-self: flex-end;
    max-width: 800px;
  `}
  
  ${props => props.position === 'center' && `
    align-self: center;
    max-width: 800px;
  `}
  
  ${props => props.position === 'full-width' && `
    max-width: 100%;
  `}
  
  @media (max-width: 992px) {
    max-width: 100% !important;
    margin: ${SPACING_CONSTANTS.mobile.section} 0;
  }
`;

export const GridItem = styled.div`
  height: 100%;
  
  & > div {
    height: 100%;
  }
`;

export const StatsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: ${SPACING_CONSTANTS.paragraph} 0;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${SPACING_CONSTANTS.mobile.element};
    margin: ${SPACING_CONSTANTS.mobile.paragraph} 0;
  }
`;

export const AccentCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue[6]}, ${({ theme }) => theme.colors.cyan[6]});
  color: ${({ theme }) => theme.white};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  ul {
    margin-top: 1rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export const GradientCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.blue[6]}, ${({ theme }) => theme.colors.cyan[6]});
  color: ${({ theme }) => theme.white};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: 2rem;
  
  h2, h3 {
    font-weight: 700;
  }
  
  h2 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const Quote = styled.blockquote`
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 2rem 0;
  padding: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][6]};
  background-color: rgba(52, 152, 219, 0.05);
  border-radius: 0 8px 8px 0;
  color: ${({ theme }) => theme.black};
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;

export const CodeBlock = styled.div`
  background: ${({ theme }) => theme.colors.dark[8]};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  overflow: auto;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.1);
  
  pre {
    margin: 0;
    
    code {
      font-family: 'Fira Code', monospace;
      color: #e6e6e6;
      
      .keyword {
        color: #569CD6;
      }
      
      .string {
        color: #CE9178;
      }
      
      .comment {
        color: #6A9955;
      }
      
      .type {
        color: #4EC9B0;
      }
      
      .number {
        color: #B5CEA8;
      }
    }
  }
`;

export const ProblemCard = styled(Card)`
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.yellow[6]};
  font-weight: 600;
  
  h4 {
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.black};
  }
`;

export const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
  text-align: center;
  
  .value {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
    margin-bottom: 0.5rem;
  }
  
  .label {
    color: ${({ theme }) => theme.black};
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
`;

export const ProblemCategoryBox = styled.div`
  background-color: ${({ theme }) => theme.colors.yellow[6]};
  color: ${({ theme }) => theme.black};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

export const TimelineContainer = styled.div`
  margin: ${SPACING_CONSTANTS.BASE} 0;
  position: relative;
  padding-left: ${SPACING_CONSTANTS.BASE};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 4px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  }
`;

export const TimelineItem = styled.div`
  margin-bottom: ${SPACING_CONSTANTS.BASE};
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    left: -${SPACING_CONSTANTS.BASE};
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
  }
  
  h3 {
    margin-bottom: ${SPACING_CONSTANTS.X_SMALL};
    color: ${({ theme }) => theme.black};
  }
  
  .date {
    color: ${({ theme }) => theme.black};
    font-size: 0.9rem;
    margin-bottom: ${SPACING_CONSTANTS.X_SMALL};
    
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.black};
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
`;

export const CtaButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.blue[6]};
  border-radius: 4px;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

export const BackgroundSection = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  padding: ${SPACING_CONSTANTS.section} 0;
  margin-bottom: ${SPACING_CONSTANTS.section};
  
  @media (max-width: 576px) {
    padding: calc(${SPACING_CONSTANTS.section} * 0.75) 0;
    margin-bottom: calc(${SPACING_CONSTANTS.section} * 0.75);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${SPACING_CONSTANTS.elementBreak};
  margin: ${SPACING_CONSTANTS.paragraphBreak} 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${SPACING_CONSTANTS.mobile.element};
    margin: ${SPACING_CONSTANTS.mobile.paragraph} 0;
  }
`;

export const TeamMemberCard = styled.div`
  text-align: center;
  
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 1rem;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.colors[theme.primaryColor][6] || theme.colors.blue[6]};
  }
  h5 {
    margin: 0.5rem 0 0.25rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6] || theme.colors.blue[6]};
  }
  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.gray[8]};
  }
`;

export const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][6] || theme.colors.blue[6]};

  p:first-of-type {
    font-style: italic;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.black};
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
  
  p:last-of-type {
    font-weight: 600;
    text-align: right;
    margin: 0;
    color: ${({ theme }) => theme.colors[theme.primaryColor][6] || theme.colors.blue[6]};
  }
`;

export const ComparisonCard = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${SPACING_CONSTANTS.BASE};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  height: 100%;
  
  h3 {
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
    margin-bottom: ${SPACING_CONSTANTS.SMALL};
  }
  
  ul {
    padding-left: 1.5rem;
    margin: ${SPACING_CONSTANTS.SMALL} 0;
    
    li {
      margin-bottom: ${SPACING_CONSTANTS.X_SMALL};
    }
  }
`;

export const HeadLine = styled.div`
  margin-bottom: ${SPACING_CONSTANTS.BASE};
  
  h2 {
    font-size: 2rem;
    margin-bottom: ${SPACING_CONSTANTS.SMALL};
    color: ${({ theme }) => theme.black};
  }
  
  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.black};
    max-width: 800px;
    [data-mantine-color-scheme="dark"] & {
      color: ${({ theme }) => theme.colors.dark[0]};
    }
  }
`;

export const ChartContainer = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${SPACING_CONSTANTS.BASE};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${SPACING_CONSTANTS.BASE};
`;

export const SectionDivider = styled.div`
  margin: ${SPACING_CONSTANTS.LARGE} 0;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[3]};
`;

export const CtaContainer = styled.div`
  background: linear-gradient(45deg, ${({ theme }) => theme.colors[theme.primaryColor][6]}, ${({ theme }) => theme.colors.blue[6]});
  color: ${({ theme }) => theme.white};
  padding: ${SPACING_CONSTANTS.BASE};
  border-radius: ${({ theme }) => theme.radius.md};
  margin: ${SPACING_CONSTANTS.LARGE} 0;
  text-align: center;
  
  h2 {
    margin-bottom: ${SPACING_CONSTANTS.SMALL};
  }
  
  p {
    margin-bottom: ${SPACING_CONSTANTS.BASE};
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const CardWithTitleAndBrandBar = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors[theme.primaryColor][6]}, 
      ${({ theme }) => theme.colors.blue[6]}
    );
  }
`;

export const KeyPoint = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  .icon {
    color: ${({ theme }) => theme.colors[theme.primaryColor][6]};
    margin-right: 1rem;
    min-width: 24px;
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.black};
  }
`;

export const HighlightBox = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-left: 4px solid ${({ theme }) => theme.colors[theme.primaryColor][6]};
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 ${({ theme }) => theme.radius.md} ${({ theme }) => theme.radius.md} 0;
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.black};
  }
  
  strong {
    color: ${({ theme }) => theme.colors[theme.primaryColor][7]};
  }
`;

export const ChallengeSolutionTitle = styled.h3`
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.blue[6]};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

export const ChallengeSolutionDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.black};
  
  [data-mantine-color-scheme="dark"] & {
    color: ${({ theme }) => theme.colors.dark[0]};
  }
`;