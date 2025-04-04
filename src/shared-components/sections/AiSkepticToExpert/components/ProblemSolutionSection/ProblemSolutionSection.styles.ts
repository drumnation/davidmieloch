import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SPACING, COLORS } from '../../AiSkepticToExpert.shared';

// Re-export SPACING for use in the component
export { SPACING };

export const AccentBackgroundSection = styled.div`
  width: 100%;
  background-color: ${COLORS.background.accent};
  padding: ${SPACING.section} 0;
  margin-top: ${SPACING.section};
  margin-bottom: ${SPACING.section};
  
  @media (max-width: 576px) {
    padding: ${SPACING.mobile.section} 0;
    margin-top: ${SPACING.mobile.section};
    margin-bottom: ${SPACING.mobile.section};
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${SPACING.container};
  
  @media (max-width: 576px) {
    padding: 0 ${SPACING.mobile.container};
  }
`;

export const TitleContainer = styled.div`
  text-align: left;
  margin-bottom: 2.5rem;
  
  h2 {
    margin-bottom: 1.5rem;
  }
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