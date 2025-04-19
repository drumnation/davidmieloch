// Styles specific to ImageDisplay, if any
import styled from 'styled-components';

// Moved from ExperienceSection.logic.tsx
export const MediaImageWrapper = styled.div`
  position: relative;
  width: 100%;
  // Remove forced aspect-ratio
  // aspect-ratio: 16/9; /* Default aspect ratio, adjust if needed */
  overflow: hidden; // Keep overflow hidden for potential border-radius on image
`;

// MediaImageStyle is an object, moved to utils

export const MediaTitleWrapper = styled.div`
  padding: 12px 15px;
  font-size: 1rem;
  font-weight: 500;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
`;

// MediaTitleLogoStyle is an object used inline, will be refactored

export const MediaDescriptionWrapper = styled.div`
  padding: 8px 15px;
  font-size: 0.85rem;
  color: rgba(0,0,0,0.6);
`;

// New styled component for the title logo image
export const TitleLogoImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: 8px;
  overflow: visible;
  display: flex; // To center if needed
  align-items: center;
  justify-content: center;
  // Props will handle conditional styles like border-radius, background, padding
`; 