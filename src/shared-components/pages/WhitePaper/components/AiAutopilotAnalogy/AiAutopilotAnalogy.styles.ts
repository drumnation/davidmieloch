import { CSSProperties } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Define consistent spacing variables that can be reused across components
export const SPACING = {
  section: '4rem',
  paragraph: '1.5rem',
  paragraphBreak: '2rem',
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
  .autopilot-content-section {
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

// Component styles
export const containerStyle: CSSProperties = { 
  width: '100%', 
  margin: '0 auto', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'stretch',
  position: 'relative'
};

export const contentSectionStyle: CSSProperties = { 
  width: '100%',
  backgroundColor: '#fff',
  borderTopLeftRadius: '24px',
  borderTopRightRadius: '24px',
  marginTop: '-24px',
  position: 'relative',
  zIndex: 2,
  paddingTop: SPACING.section,
  paddingBottom: SPACING.section,
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch'
};

export const sectionContainerStyle: CSSProperties = { 
  width: '100%',
  maxWidth: '1000px', 
  margin: `0 auto ${SPACING.section}`,
  padding: `0 ${SPACING.container}`
};

export const sectionContainerWithoutMarginStyle: CSSProperties = { 
  width: '100%',
  maxWidth: '1000px', 
  margin: '0 auto',
  padding: `0 ${SPACING.container}`
};

export const sectionContainerTopMarginStyle: CSSProperties = { 
  width: '100%',
  maxWidth: '1000px', 
  margin: `${SPACING.section} auto`,
  padding: `0 ${SPACING.container}`
};

export const sectionContainerSmallTopMarginStyle: CSSProperties = { 
  width: '100%',
  maxWidth: '1000px', 
  margin: `${SPACING.paragraphBreak} auto`,
  padding: `0 ${SPACING.container}`
};

export const comparisonSectionStyle: CSSProperties = { 
  width: '100%', 
  backgroundColor: '#f8f9fa',
  padding: `${SPACING.section} 0`,
  marginBottom: SPACING.section
};

export const titleContainerStyle: CSSProperties = { 
  marginBottom: SPACING.paragraph 
};

export const paragraphContainerStyle: CSSProperties = { 
  marginBottom: SPACING.paragraph 
};

export const paragraphContainerTopMarginStyle: CSSProperties = { 
  marginTop: SPACING.paragraph,
  marginBottom: SPACING.paragraph
};

export const paragraphContainerNoMarginStyle: CSSProperties = { 
  marginBottom: 0 
};

export const realityVsHollywoodContainerStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  width: '100%',
  marginTop: SPACING.paragraph
};

export const RealityVsHollywoodContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  margin-top: ${SPACING.paragraph};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const realityItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: '#f0f7ff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
};

export const hollywoodItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: '#fff0f0',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
};

export const iconContainerRealityStyle: CSSProperties = { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  color: 'var(--primary-blue)',
  marginBottom: '0.5rem'
};

export const iconContainerHollywoodStyle: CSSProperties = { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  color: 'var(--accent-red)',
  marginBottom: '0.5rem'
};

export const itemContentStyle: CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center' 
};

export const mermaidContainerStyle: CSSProperties = { 
  width: '100%',
  maxWidth: '1000px',
  margin: `${SPACING.paragraph} auto`,
  padding: `0 ${SPACING.container}`
};

export const titleBlockStyle: CSSProperties = { 
  marginBottom: SPACING.element 
};

export const descriptionBlockStyle: CSSProperties = { 
  marginBottom: SPACING.paragraph 
};

export const itemsContainerStyle: CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '1rem' 
};