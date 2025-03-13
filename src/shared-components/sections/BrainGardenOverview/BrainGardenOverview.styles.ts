import styled from 'styled-components';
import { motion } from 'framer-motion';
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
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
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

export const ContentSection = styled(motion.div)`
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
  
  @media (max-width: 576px) {
    padding-top: calc(${SPACING.section} * 0.75);
    padding-bottom: calc(${SPACING.section} * 0.75);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    margin-top: -16px;
  }
`;

export const ContentContainer = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto ${SPACING.section};
  padding: 0 ${SPACING.container};
  
  @media (max-width: 576px) {
    margin-bottom: calc(${SPACING.section} * 0.75);
    padding: 0 ${SPACING.container};
  }
`;

export const ContentContainerNoMargin = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${SPACING.container};
`;

export const BackgroundSection = styled(motion.div)`
  width: 100%;
  background-color: #f8f9fa;
  padding: ${SPACING.section} 0;
  margin-bottom: ${SPACING.section};
  
  @media (max-width: 576px) {
    padding: calc(${SPACING.section} * 0.75) 0;
    margin-bottom: calc(${SPACING.section} * 0.75);
  }
`;

export const AccentBackgroundSection = styled(motion.div)`
  width: 100%;
  background-color: #f0f7ff;
  padding: ${SPACING.section} 0;
  margin-bottom: ${SPACING.section};
  
  @media (max-width: 576px) {
    padding: calc(${SPACING.section} * 0.75) 0;
    margin-bottom: calc(${SPACING.section} * 0.75);
  }
`;

export const GradientBackgroundSection = styled(motion.div)`
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

export const IntroBlock = styled(motion.div)`
  background: linear-gradient(135deg, #6772e5 0%, #4ca5ff 100%);
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

export const NavigationGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const StatsGrid = styled(motion.div)`
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

export const StatCard = styled(motion.div)`
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
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
`;

export const IconContainer = styled.div`
  margin-bottom: 1rem;
  color: var(--primary-blue);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CTABlock = styled(motion.div)`
  background: linear-gradient(135deg, #6772e5 0%, #4ca5ff 100%);
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
  background: var(--primary-blue);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: var(--primary-purple);
  }
`;

export const MermaidContainer = styled(motion.div)`
  width: 100%;
  margin: ${SPACING.paragraph} 0;
  display: flex;
  justify-content: center;
`;