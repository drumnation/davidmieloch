import styled from 'styled-components';
import { ContentContainer as BaseContentContainer, SectionSubtitle } from '../../BrainGardenOverview.styles';

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

export const ActTitle = styled(SectionSubtitle)`
  color: #6772e5; 
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

export const HighlightBox = styled.div`
  background: rgba(103, 114, 229, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  border-left: 4px solid #6772e5;
`;

export const Speaker = styled.span`
  font-weight: bold;
  color: #6772e5;
`;

export const CodeSnippet = styled.pre`
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 4px;
  border-left: 3px solid #6772e5;
  margin: 0.75rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
`;

// You can add specific styles for this component here if needed
// For now, we'll reuse the styles from the parent component