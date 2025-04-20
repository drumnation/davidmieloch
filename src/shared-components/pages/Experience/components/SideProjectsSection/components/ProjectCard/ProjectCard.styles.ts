import styled, { css } from 'styled-components';
import { MediaContainer } from '../MediaRenderer/MediaRenderer.styles';
import { ProjectCategory } from '../../SideProjectsSection.types';

// Remove the layout wrappers specific to the 2-column layout
/*
export const ProjectContentWrapper = styled.div` ... `;
export const ProjectMainContent = styled.div` ... `;
export const ProjectMediaContent = styled.div` ... `;
*/

// Base container
export const ProjectCardContainer = styled.div<{ $halfWidth: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  width: 100%;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Full-row: Apply padding/margins directly to children */
  ${({ $halfWidth }) => !$halfWidth && css`
    grid-column: 1 / -1;

    // Apply horizontal padding to content sections
    ${ProjectDescription},
    ${ProjectImpact},
    ${ProjectLinks},
    ${MediaContainer} { // Apply to MediaContainer as well
       padding-left: 1.5rem;
       padding-right: 1.5rem;
    }

    // Add vertical spacing between sections
    ${ProjectDescription} { margin-top: 1rem; }
    ${ProjectImpact} { 
      margin-top: 1rem; 
      padding-top: 1rem; // Padding for border
      border-top: 1px solid rgba(0, 0, 0, 0.1); 
    }
    ${ProjectLinks} { margin-top: 1rem; }
    ${MediaContainer} { margin-top: 1rem; }

    // Add bottom padding ONLY to the last element rendered
    > ${ProjectDescription}:last-child,
    > ${ProjectImpact}:last-child,
    > ${ProjectLinks}:last-child,
    > ${MediaContainer}:last-child {
        padding-bottom: 1.5rem;
    }
  `}

  /* Half-width cards: Similar direct padding/margin */
  ${({ $halfWidth }) => $halfWidth && css`
     ${ProjectDescription},
     ${ProjectImpact},
     ${ProjectLinks},
     ${MediaContainer} { 
       padding-left: 1.5rem;
       padding-right: 1.5rem;
     }
     ${ProjectDescription} { padding-top: 1rem; }
     ${ProjectImpact} { 
        padding-top: 1rem; 
        margin-top: 1rem; 
        border-top: 1px solid rgba(0, 0, 0, 0.1); 
     }
     ${ProjectLinks} { padding-top: 1rem; }
     ${MediaContainer} { padding-top: 1rem; }

     /* Add bottom padding to the last element */
     > :last-child { padding-bottom: 1.5rem; } 
  `}

  /* Remove mobile override for flex wrappers as they are gone */
  /*
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $halfWidth }) => !$halfWidth && css` ... `}
  }
  */
`;

// --- Add Color Helper Functions --- 
const getCategoryColor = (category: ProjectCategory): string => {
  switch (category) {
    case 'Personal Innovation Lab':
      return '#e0f2fe'; // Light Blue
    case 'Developer Tools':
      return '#dcfce7'; // Light Green
    case 'SaaS Applications':
      return '#f3e8ff'; // Light Purple
    case 'Digital Marketing':
      return '#ffedd5'; // Light Orange
    default:
      return '#f3f2ef'; // Default Gray
  }
};

const getCategoryTextColor = (category: ProjectCategory): string => {
  switch (category) {
    case 'Personal Innovation Lab':
      return '#0c4a6e'; // Dark Blue
    case 'Developer Tools':
      return '#166534'; // Dark Green
    case 'SaaS Applications':
      return '#581c87'; // Dark Purple
    case 'Digital Marketing':
      return '#7c2d12'; // Dark Orange
    default:
      return '#1f2937'; // Dark Gray
  }
};

// --- Update CategoryPill --- 
// Accept $category prop and apply dynamic styles
export const CategoryPill = styled.span<{ $category: ProjectCategory }>`
  // Base appearance styles
  border-radius: 20px;
  padding: 3px 10px; // Adjusted padding slightly
  font-size: 0.75rem;
  font-weight: 500; // Adjusted weight slightly
  white-space: nowrap;
  display: inline-flex;
  line-height: 1.4;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  border: 1px solid transparent; // Start with transparent border
  
  // Apply dynamic colors
  ${({ $category }) => css`
    background-color: ${getCategoryColor($category)};
    color: ${getCategoryTextColor($category)};
    // Optional: Add a subtle border matching text color
    // border-color: ${getCategoryTextColor($category)}; 
  `}

  // Desktop positioning (remains the same)
  margin-left: auto; 
  align-self: center;
  height: fit-content;

  // Mobile positioning override (remains the same)
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: 0; 
    align-self: center; 
  }
`;

// These need padding applied within their parent container now
export const ProjectDescription = styled.div`
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.8);
  line-height: 1.5;

  .markdown-container { padding: 0; }
  &.prompt-forge-description { font-size: 0.75rem; }
`;

export const ProjectImpact = styled.div`
  font-weight: 600;
  color: #2196f3; /* Use fallback color */
  font-size: 0.9rem;
  line-height: 1.5;

  .markdown-container { padding: 0; font-weight: 600; }
`;

export const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ProjectLink = styled.a`
  text-decoration: none;
  color: #2196f3; /* Use fallback color */
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover { text-decoration: underline; }
  svg { margin-right: 0.25rem; }
`; 