import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { AnimationVariants } from '../../../utils/animations/migration-helpers';

// Define consistent spacing variables that can be reused across components
export const SPACING = {
  section: '4rem',
  paragraph: '1.5rem',
  paragraphBreak: '2rem', // Added specific spacing for paragraph breaks
  element: '1rem',
  container: '1.5rem',
  
  // Responsive spacing for mobile
  mobile: {
    section: '2.5rem',
    paragraph: '1.25rem',
    paragraphBreak: '1.5rem',
    element: '0.75rem',
    container: '1rem'
  }
};

// Global styles for animation classes
export const GlobalStyles = createGlobalStyle`
  .ai-skeptic-content-section {
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
  }

  .ai-skeptic-content-container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto ${SPACING.section};
    padding: 0 ${SPACING.container};
    
    @media (max-width: 576px) {
      margin-bottom: calc(${SPACING.section} * 0.75);
      padding: 0 ${SPACING.container};
    }
  }
`;

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

export const RedditLink = styled.a`
  display: block;
  margin-top: ${SPACING.paragraph};
  margin-bottom: ${SPACING.paragraphBreak};
  padding: 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const RedditLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-left: 4px solid #6772e5;
  border-radius: 8px;
  
  @media (min-width: 576px) {
    flex-direction: row;
  }
`;

export const RedditIconColumn = styled.div`
  padding: ${SPACING.container};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const RedditContentColumn = styled.div`
  padding: ${SPACING.container};
  flex-grow: 1;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Animation variants for use with migration helpers
export const fadeIn: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const fadeInUp: AnimationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const staggerContainer: AnimationVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};