// Styles specific to EmbedDisplay, if any
import styled from 'styled-components';

// --- Styles moved from ExperienceSection.logic.tsx ---

export const EmbedVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
  max-height: var(--embed-height, 400px); // Use CSS variable for height
`;

export const EmbedIframe = styled.iframe`
  width: 100%;
  border: none;
  display: block;
  height: var(--embed-height, 400px); // Use CSS variable for height
`;

export const EmbedTitleWrapper = styled.div`
  padding: 8px 15px; // Adjusted padding
  font-size: 1rem;
  font-weight: 500;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
`;

// Reused from ImageDisplay or define locally if needed
export const TitleLogoImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: 8px;
  overflow: visible;
  display: flex; 
  align-items: center;
  justify-content: center;
`;

export const MediaDescriptionWrapper = styled.div` // Reused from ImageDisplay
  padding: 8px 15px;
  font-size: 0.85rem;
  color: rgba(0,0,0,0.6);
`;

// --- End Moved Styles --- 