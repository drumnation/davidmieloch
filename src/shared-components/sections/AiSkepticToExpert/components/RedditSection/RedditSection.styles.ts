import styled from 'styled-components';
import { SPACING, COLORS } from '../../AiSkepticToExpert.shared';

// Re-export SPACING for use in the component
export { SPACING };

export const RedditLink = styled.a`
  display: block;
  margin-top: ${SPACING.paragraph};
  margin-bottom: ${SPACING.paragraphBreak};
  padding: 0;
  background-color: ${COLORS.background.secondary};
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const RedditLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-left: 4px solid ${COLORS.primary};
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
  background-color: ${COLORS.background.light};
`;

export const RedditContentColumn = styled.div`
  padding: ${SPACING.container};
  flex-grow: 1;
`; 