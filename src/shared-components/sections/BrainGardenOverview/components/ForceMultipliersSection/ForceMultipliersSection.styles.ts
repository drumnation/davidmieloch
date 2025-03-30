import styled from 'styled-components';
import { ContentContainer as BaseContentContainer } from '../../BrainGardenOverview.styles';

export const ForceMultiplierContainer = styled(BaseContentContainer)`
  min-height: 300px; /* Ensure minimum height */
  margin: 3rem 0; /* Add vertical margin */
  position: relative; /* Establish positioning context */
  z-index: 5; /* Ensure proper stacking with higher z-index */
  overflow: visible; /* Ensure content isn't clipped */
  background-color: #fff; /* Set background color */
  height: auto; /* Let height adapt to content */
  width: 100%; /* Ensure full width */
  display: block; /* Force block display */
`;

// You can add specific styles for this component here if needed
// For now, we'll reuse the styles from the parent component