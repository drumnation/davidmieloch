import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';
import { createGlobalStyle } from 'styled-components';

// Define consistent spacing variables that can be reused across components
export const SPACING = {
  section: '5rem',
  paragraph: '2rem',
  paragraphBreak: '2.5rem',
  element: '1.5rem',
  container: '2rem',
  
  // Responsive spacing for mobile
  mobile: {
    section: '3rem',
    paragraph: '1.5rem',
    paragraphBreak: '2rem',
    element: '1rem',
    container: '1.25rem'
  }
};

// Custom styles for the component
export const GlobalStyles = createGlobalStyle`
  .custom-hero-bg::before {
    background-position: center top !important;
    background-position-y: -115px !important;
  }
`;

// Animation variants
export const fadeIn = {
  hidden: { 
    opacity: 0
  },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 10, // Reduced y offset to minimize layout shift
    height: "auto" // Maintain height even in hidden state
  },
  visible: { 
    opacity: 1, 
    y: 0,
    height: "auto",
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const pulse = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Component styles
export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const ContentSection = styled.div`
  width: 100%;
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  margin-top: -24px;
  position: relative;
  z-index: 2;
  padding-top: ${SPACING.section};
  padding-bottom: ${SPACING.section};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 1000px; /* Ensure sufficient height for positioned content */
  
  & > div {
    width: 100%; /* Ensure full width for all direct children */
  }
  
  @media (max-width: 576px) {
    padding-top: calc(${SPACING.section} * 0.75);
    padding-bottom: calc(${SPACING.section} * 0.75);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    margin-top: -16px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto ${SPACING.section};
  padding: 0 ${SPACING.container};
  
  @media (max-width: 576px) {
    margin-bottom: calc(${SPACING.section} * 0.75);
    padding: 0 ${SPACING.container};
  }
`;

export const ContentContainerNoMargin = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${SPACING.container};
`;

export const BackgroundSection = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  padding: ${SPACING.section} 0;
  margin-bottom: ${SPACING.section};
  
  @media (max-width: 576px) {
    padding: calc(${SPACING.section} * 0.75) 0;
    margin-bottom: calc(${SPACING.section} * 0.75);
  }
`;

export const WhiteBackgroundSection = styled.div`
  width: 100%;
  background-color: #fff;
  padding: ${SPACING.section} 0;
  margin-bottom: ${SPACING.section};
  
  @media (max-width: 576px) {
    padding: calc(${SPACING.section} * 0.75) 0;
    margin-bottom: calc(${SPACING.section} * 0.75);
  }
`;

export const AccentBackgroundSection = styled.div`
  width: 100%;
  background-color: #f0f7ff;
  padding: ${SPACING.section} 0;
  margin-bottom: ${SPACING.section};
  
  @media (max-width: 576px) {
    padding: calc(${SPACING.section} * 0.75) 0;
    margin-bottom: calc(${SPACING.section} * 0.75);
  }
`;

export const GradientBackgroundSection = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #6772e5 0%, #4ca5ff 100%);
  padding: ${SPACING.section} 0;
  margin-bottom: ${SPACING.section};
  color: white;
  
  @media (max-width: 576px) {
    padding: calc(${SPACING.section} * 0.75) 0;
    margin-bottom: calc(${SPACING.section} * 0.75);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${SPACING.paragraph};
  color: inherit;
  
  @media (max-width: 576px) {
    font-size: 1.75rem;
  }
`;

export const SectionSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${SPACING.element};
  color: inherit;
  
  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
`;

export const IntroBlock = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 12px;
  padding: ${SPACING.container};
  color: white;
  margin-bottom: ${SPACING.paragraphBreak};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const IntroText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0;
`;

export const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  
  & > div {
    height: 100%;
    display: flex;
  }
  
  & > div > * {
    flex: 1;
    height: 100%;
    width: 100%;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: ${SPACING.container};
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
`;

export const IconContainer = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CTABlock = styled.div`
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 12px;
  padding: ${SPACING.container};
  color: white;
  margin-top: ${SPACING.paragraphBreak};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const CTATitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${SPACING.element};
`;

export const CTADescription = styled.p`
  font-size: 1.125rem;
  margin-bottom: ${SPACING.paragraph};
`;

export const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary.main};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary.main};
  }
`;

export const MermaidContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: ${SPACING.paragraph} auto;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  overflow-x: auto;
  
  /* Enhance text size for better readability */
  svg {
    font-size: 14px;
    max-width: 100%;
    height: auto !important;
    
    /* Make node text more readable */
    .nodeLabel {
      font-size: 16px;
      font-weight: 500;
      white-space: nowrap; /* Prevent label text wrapping */
    }
    
    /* Adjust relationship lines */
    .edgePath {
      stroke-width: 2px;
    }
    
    /* Prevent labels from being cut off */
    .node rect, .node polygon, .node circle, .node ellipse {
      rx: 5;
      ry: 5;
      padding: 10px;
    }
    
    /* Improve spacing between nodes */
    .nodes {
      margin: 10px;
    }
    
    /* Ensure subgraph labels don't get cut off */
    .cluster .cluster-label {
      font-weight: bold;
      font-size: 16px;
    }
    
    .cluster rect {
      rx: 5;
      ry: 5;
      padding: 8px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    
    svg {
      font-size: 12px;
      .nodeLabel {
        font-size: 14px;
      }
    }
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(135deg, #4a9eff 0%, #9d4eff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  font-weight: bold;
`;

export const PowerfulTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  
  svg {
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));
  }
`;

export const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  padding: 2rem;
  background: rgba(74, 158, 255, 0.05);
  border-radius: 12px;
`;

export const ImpactMetric = styled.div`
  text-align: center;
  
  .number {
    display: block;
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const BeforeAfter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(74, 158, 255, 0.05);
  border-radius: 12px;
  margin-top: 1rem;
  
  .before, .after {
    h4 {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.text.secondary};
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 1.1rem;
      line-height: 1.4;
    }
  }
  
  .before {
    position: relative;
    padding-right: 2rem;
    
    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      background: ${({ theme }) => theme.colors.border.light};
    }
    
    h4 {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
  
  .after {
    h4 {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;