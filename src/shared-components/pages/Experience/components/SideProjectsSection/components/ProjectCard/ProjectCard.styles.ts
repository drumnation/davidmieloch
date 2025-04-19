import styled, { css } from 'styled-components';
import { MediaContainer } from '../MediaRenderer/MediaRenderer.styles';

// Define content containers for better structure
export const ProjectContentWrapper = styled.div`
  display: flex;
  padding: 1.5rem; // Apply padding here
  padding-top: 1rem; // Reduce top padding slightly
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { // Adjust breakpoint as needed (e.g., 900px)
    flex-direction: column;
    padding: 1rem; // Adjust mobile padding
    gap: 1rem;
  }
`;

export const ProjectMainContent = styled.div`
  flex: 1; // Takes up remaining space
  min-width: 0; // Prevents content from overflowing flex item
`;

export const ProjectMediaContent = styled.div`
  flex-basis: 40%; // Adjust basis as needed
  max-width: 45%; // Adjust max-width as needed
  flex-shrink: 0;

  ${MediaContainer} {
    margin-top: 0; // Remove top margin if already spaced by ProjectContentWrapper gap
    padding: 0; // MediaContainer shouldn't need internal padding if wrapper has it
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) { // Use same breakpoint as wrapper
    flex-basis: auto;
    max-width: 100%;
    width: 100%;
  }
`;

// Base container
export const ProjectCardContainer = styled.div<{ $halfWidth: boolean }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  width: 100%;
  overflow: hidden; // Add overflow hidden to prevent children spilling out

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Full-row specific layout uses the new wrappers */
  ${({ $halfWidth }) => !$halfWidth && css`
    grid-column: 1 / -1;

    /* Remove direct padding/margin styles previously applied to children */
    ${ProjectDescription},
    ${ProjectImpact},
    ${ProjectLinks} {
       padding: 0;
       margin: 0;
    }

    /* Add specific spacing *between* elements within ProjectMainContent */
    ${ProjectMainContent} > ${ProjectDescription} + ${ProjectImpact} {
      margin-top: 1rem; 
      padding-top: 1rem; /* Add padding if border is needed */
      border-top: 1px solid rgba(0, 0, 0, 0.1); /* Use fallback color */
    }
    ${ProjectMainContent} > ${ProjectImpact} + ${ProjectLinks} {
      margin-top: 1rem;
    }
     ${ProjectMainContent} > ${ProjectDescription} + ${ProjectLinks} { // If no impact
      margin-top: 1rem;
    }
  `}

  /* Half-width cards need basic padding */
  ${({ $halfWidth }) => $halfWidth && css`
     ${ProjectDescription},
     ${ProjectImpact},
     ${ProjectLinks},
     ${MediaContainer} { 
       padding-left: 1.5rem;
       padding-right: 1.5rem;
     }
     ${ProjectDescription} { padding-top: 1rem; }
     ${ProjectImpact} { padding-top: 1rem; margin-top: 1rem; border-top: 1px solid rgba(0, 0, 0, 0.1); }
     ${ProjectLinks} { padding-top: 1rem; }
     ${MediaContainer} { padding-top: 1rem; }

     /* Add bottom padding to the last element */
     > :last-child { padding-bottom: 1.5rem; }
  `}

  /* Mobile responsiveness - MOVED TO CORRECT LOCATION */
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    /* Styles for full-width cards on mobile */
    ${({ $halfWidth }) => !$halfWidth && css`
      ${ProjectContentWrapper} { // Target the wrapper 
        flex-direction: column;
        padding: 1rem; // Adjust padding
        gap: 1rem;
      }
      ${ProjectMediaContent} { // Target the media container
         flex-basis: auto;
         max-width: 100%;
         width: 100%;
      }
    `}
    /* Add any general mobile styles for BOTH half and full cards here if needed */
  }
`;

// ProjectHeader: Use column layout, center items
export const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column; // Stack elements vertically
  align-items: center; // Center items horizontally
  text-align: center; // Center text elements
  padding: 16px 8px 8px 8px; // Adjust padding (more top)
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  gap: 8px; // Consistent gap between items
`;

// ProjectTitle: Ensure full width for centering, adjust margins
export const ProjectTitle = styled.h3`
  font-size: 1.1rem; 
  font-weight: 600;
  margin: 0; // Remove default margins
  color: rgba(0, 0, 0, 0.9); 
  line-height: 1.3;
  width: 100%; // Ensure it takes full width for centering
`;

// Create ProjectMetaContainer for Date & Category
export const ProjectMetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px; // Small gap between date and category
  margin-top: 4px; // Space below the logo
`;

// HeaderDateRow: Keep styles, used inside ProjectMetaContainer
export const HeaderDateRow = styled.div`
  display: flex;
  flex-wrap: wrap; // Keep wrap just in case
  align-items: center;
  justify-content: center; // Center date/repo link
  gap: 0.5rem 1rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7); 
`;

// HeaderDate: Keep styles
export const HeaderDate = styled.span``;

// HeaderRepoLink: Keep styles
export const HeaderRepoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: rgba(0, 0, 0, 0.7); // Original color
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #0073b1; // Original hover color
    text-decoration: underline;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

// CategoryPill: Remove positioning styles, adjust margin
export const CategoryPill = styled.span`
  // Keep original appearance styles
  background-color: #f3f2ef !important; 
  color: rgba(0, 0, 0, 0.7) !important;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  display: inline-flex;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  opacity: 1 !important;
  
  // Remove positioning: margin-left: auto, align-self, height
  // Margin top will be handled by ProjectMetaContainer gap

  // Remove mobile-specific margin adjustments
  /*
  @media (max-width: 576px) {
    margin-left: 60px; 
    margin-top: 4px;
  }
  */

  // Keep category-specific overrides if needed, though the base style uses !important
  &.developer-tools,
  &.saas-applications {
    background-color: #f3f2ef !important;
    color: rgba(0, 0, 0, 0.7) !important;
  }
`;

// Restore original TechnologiesList styling (padding and border-bottom)
export const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 8px 8px 12px 8px; /* Original padding */
  margin: 0; /* Remove margin if border handles spacing */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); /* Original border */
`;

// Ensure TechnologyItem has the correct background, padding, and radius
export const TechnologyItem = styled.div`
  background-color: #f3f2ef; /* Light gray background */
  border-radius: 4px; /* Slightly rounded corners */
  padding: 4px 8px; /* Compact padding */
  display: inline-flex; /* Align icon and text */
  align-items: center;
  gap: 0.4rem; /* Space between icon/text if icon present */
  font-size: 0.8rem; /* Match filter button size */
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  line-height: 1.4;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e6e5e4; /* Subtle hover */
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