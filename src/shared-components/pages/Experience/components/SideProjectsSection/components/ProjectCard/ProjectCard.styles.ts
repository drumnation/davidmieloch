import styled, { css } from 'styled-components';
import { MediaContainer } from '../MediaRenderer/MediaRenderer.styles';

// Base container - Reverted border, shadow, padding, and hover
export const ProjectCardContainer = styled.div<{ $halfWidth: boolean }>`
  background-color: white; // Keep original background
  border-radius: 8px;
  padding: 0; // Original had no direct padding
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); // Original shadow
  transition: transform 0.3s ease, box-shadow 0.3s ease; // Original transition
  position: relative;
  width: 100%;

  &:hover {
    transform: translateY(-5px); // Original hover transform
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Original hover shadow
  }

  /* Original internal padding logic (Applied differently now within components potentially) */
  /* Consider applying padding directly to ProjectDescription, ProjectImpact, ProjectLinks, MediaContainer if needed */
  /* Example: Add padding-left/right: 1.5rem; to relevant children */

  /* Full-row specific layout */
  ${({ $halfWidth }) => !$halfWidth && css`
    grid-column: 1 / -1; // Keep spanning grid
    /* Remove the specific flex layout for project-content, */
    /* allowing content to flow vertically by default */

    /* Apply horizontal padding directly to children */
    ${ProjectDescription},
    ${ProjectImpact},
    ${ProjectLinks},
    ${MediaContainer} { // Target MediaContainer specifically if needed
       padding-left: 1.5rem;
       padding-right: 1.5rem;
       padding-top: 0;
       padding-bottom: 0; /* Explicitly remove bottom padding from all children initially */
    }

    /* Apply specific top margins for spacing */
    ${ProjectImpact} {
      margin-top: 1rem;
      padding-top: 1rem; /* Keep padding for the border-top */
    }
    ${ProjectLinks} {
      margin-top: 1rem;
    }
    ${MediaContainer} {
      margin-top: 1rem;
    }

    /* Add bottom padding ONLY to the very last element */
    /* Removing this selector for now to debug spacing */
    /*
    > :last-child {
        padding-bottom: 1.5rem;
    }
    */

    /* Ensure last paragraph within impact has no bottom margin */
    ${ProjectImpact} p:last-child {
        margin-bottom: 0;
    }

    /* Remove previous last-child selectors that might be too specific */
    /*
    ${ProjectLinks}:last-child,
    ${MediaContainer}:last-child,
    ${ProjectImpact}:last-child { // Added ProjectImpact here
        padding-bottom: 1.5rem;
    }
    */

    /* Remove or comment out the specific rules for .project-content, .project-main, .project-media */
    /*
    .project-content {
      display: flex;
      gap: 2rem;
      padding: 0 0 1.5rem 0;
      margin-top: 0;

      @media (max-width: 900px) {
        flex-direction: column;
        gap: 1rem;
        padding: 0 0 1rem 0;
      }
    }

    .project-main {
      flex: 1;
      min-width: 0;
    }

    .project-media {
      flex-basis: 40%;
      max-width: 45%;
      flex-shrink: 0;

      @media (max-width: 900px) {
        max-width: 100%;
        flex-basis: auto;
      }

      ${MediaContainer} {
         margin-top: 0;
      }
    }
    */
  `}
`;

// Reverted ProjectHeader styles
export const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px; // Original gap
  background-color: white; // Original background
  padding: 8px; // Original padding
  border-radius: 6px; // Original radius
  border-bottom: 1px solid rgba(0, 0, 0, 0.1); // Original border

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Reverted HeaderLeft styles (mostly subtle changes)
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; // Match header gap? Original didn't specify here.
  flex: 1; // Keep flex grow
  min-width: 0;
`;

// Reverted HeaderContent styles
export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px; // Original padding
  flex: 1;
  min-width: 0;
`;

// ProjectTitle seems okay, check font size/weight if needed
export const ProjectTitle = styled.h3`
  font-size: 1.1rem; // Original likely smaller? Check screenshot.
  font-weight: 600;
  margin: 0;
  color: rgba(0, 0, 0, 0.9); // Original color
  line-height: 1.3;
`;

// HeaderDateRow seems okay
export const HeaderDateRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.7); // Original color
`;

// HeaderDate seems okay
export const HeaderDate = styled.span``;

// HeaderRepoLink seems okay, check color
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

// Reverted CategoryPill styles exactly
export const CategoryPill = styled.span`
  background-color: #f3f2ef !important;
  color: rgba(0, 0, 0, 0.7) !important;
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  display: inline-flex;
  margin-left: auto; // Keep auto margin for positioning
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  align-self: center;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  opacity: 1 !important;

  @media (max-width: 576px) {
    margin-left: 60px; // Original mobile alignment
    margin-top: 4px;
  }

  /* Remove current theme-based overrides */
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

// Reverted ProjectDescription styles
export const ProjectDescription = styled.div`
  font-size: 0.9rem; // Check original size
  color: rgba(0, 0, 0, 0.9); // Original color
  line-height: 1.5;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem 0; // Apply padding here instead of container

  p:last-child {
    margin-bottom: 0;
  }

  &.prompt-forge-description {
    /* Add specific styles for Prompt Forge if needed */
  }
`;

// Revert ProjectImpact styles to original color and font-weight
export const ProjectImpact = styled.div`
  font-size: 0.85rem;
  color: #2196f3; // Set base color to original blue
  font-weight: 600; // Set base font weight to original
  line-height: 1.4;
  margin-top: 1rem;
  padding: 1rem 1.5rem 0; // Top and horizontal padding
  border-top: 1px dashed rgba(0,0,0,0.15);
  margin-bottom: 0;

  /* Remove strong tag override if base weight is 600 */
  /* strong {
    font-weight: 600; // Already covered by base style
    color: rgba(0,0,0,0.9);
  } */

   p:last-child {
    margin-bottom: 0;
  }

  /* Remove link-specific styling as the whole block is blue */
  /*
  p > a {
    color: #2196f3 !important;
    text-decoration: none !important;
    font-weight: 500 !important;
    &:hover {
      text-decoration: underline !important;
    }
  }
  */
`;

// Reverted ProjectLinks styles
export const ProjectLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem; // Original gap
  padding: 0 1.5rem 1.5rem; // Apply padding here
`;

// Reverted ProjectLink styles
export const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem; // Original size
  font-weight: 600; // Original weight
  color: #0073b1; // Original color
  background-color: #e6f2f7; // Original background
  border: 1px solid transparent; // Original border
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d0e8f1; // Original hover background
    color: #005c8a; // Original hover color
    box-shadow: 0 1px 2px rgba(0,0,0,0.1); // Original hover shadow
  }

  svg {
    width: 13px; // Original size
    height: 13px; // Original size
  }
`; 