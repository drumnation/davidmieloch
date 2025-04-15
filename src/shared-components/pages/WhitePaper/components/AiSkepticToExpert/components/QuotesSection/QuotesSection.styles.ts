import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SPACING, COLORS } from '../../AiSkepticToExpert.shared';

// Re-export SPACING for use in the component
export { SPACING };

export const BackgroundSection = styled(motion.div)`
  width: 100%;
  background-color: ${COLORS.background.secondary};
  padding: ${SPACING.section} 0;
  margin: ${SPACING.section} 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  will-change: transform;
  transform: translateZ(0);
  
  @media (max-width: 576px) {
    padding: ${SPACING.mobile.section} 0;
    margin: ${SPACING.mobile.section} 0;
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