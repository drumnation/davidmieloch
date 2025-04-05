import styled from 'styled-components';
import { SPACING, COLORS } from '../../AiSkepticToExpert.shared';

// Re-export SPACING for use in the component
export { SPACING };

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${SPACING.container};
  
  @media (max-width: 576px) {
    padding: 0 ${SPACING.mobile.container};
  }
`; 