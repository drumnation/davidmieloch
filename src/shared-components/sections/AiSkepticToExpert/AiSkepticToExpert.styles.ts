import styled from 'styled-components';
import { motion } from 'framer-motion';

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

export const RedditLink = styled(motion.a)`
  display: block;
  margin-top: ${SPACING.paragraph};
  margin-bottom: ${SPACING.paragraphBreak};
  padding: 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${SPACING.container};
  background-color: rgba(255, 69, 0, 0.05);
  min-height: 60px;
  
  @media (min-width: 576px) {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    min-width: 80px;
  }
`;

export const RedditContentColumn = styled.div`
  padding: ${SPACING.container};
  flex-grow: 1;
`;

export const CardGrid = styled(motion.div)`
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