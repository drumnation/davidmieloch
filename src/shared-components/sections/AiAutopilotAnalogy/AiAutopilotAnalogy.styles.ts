import { CSSProperties } from 'react';

// Define consistent spacing variables that can be reused across components
export const SPACING = {
  section: '4rem',
  paragraph: '1.5rem',
  paragraphBreak: '2rem',
  element: '1rem',
  container: '1.5rem'
};

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
  alignItems: 'stretch' 
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
  margin: `${SPACING.section} auto 0`,
  padding: `0 ${SPACING.container}`
};

export const sectionContainerSmallTopMarginStyle: CSSProperties = { 
  width: '100%',
  maxWidth: '1000px', 
  margin: `1.5rem auto 0`,
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
  marginBottom: SPACING.paragraphBreak 
};

export const paragraphContainerTopMarginStyle: CSSProperties = { 
  marginTop: SPACING.paragraphBreak 
};

export const paragraphContainerNoMarginStyle: CSSProperties = { 
  marginBottom: '0' 
};

export const realityVsHollywoodContainerStyle: CSSProperties = { 
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  width: '100%',
  margin: '2rem 0'
};

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
  marginBottom: SPACING.paragraphBreak,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '1.5rem 0'
};

export const titleBlockStyle: CSSProperties = { 
  display: 'block', 
  marginBottom: '1.5rem' 
};

export const descriptionBlockStyle: CSSProperties = { 
  display: 'block' 
};

export const itemsContainerStyle: CSSProperties = { 
  display: 'flex', 
  flexDirection: 'column', 
  gap: '1rem' 
};