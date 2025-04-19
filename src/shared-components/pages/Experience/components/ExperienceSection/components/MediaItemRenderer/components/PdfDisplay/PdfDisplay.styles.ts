// Styles specific to PdfDisplay, if any
import styled from 'styled-components';

// --- Styles moved from ExperienceSection.logic.tsx ---

export const PdfThumbnailLink = styled.a<{ $height?: number | string }>`
  display: block;
  position: relative;
  width: 100%;
  background-color: #f5f5f5;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  ${({ $height }) =>
    $height
      ? `height: ${typeof $height === 'number' ? `${$height}px` : $height};`
      : `padding-top: 56.25%; /* 16:9 Aspect Ratio */`
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .pdf-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.2s ease;

    svg {
      margin-right: 8px;
    }
  }

  &:hover .pdf-overlay {
    opacity: 1;
  }
`;
PdfThumbnailLink.defaultProps = {
  target: "_blank",
  rel: "noopener noreferrer"
}

// PdfThumbnailImageStyle is an object, used inline or converted

export const PdfOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: 500;
  svg {
    margin-right: 8px;
    fill: white;
  }
`;

export const PdfTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px; 
  font-size: 1rem; 
  font-weight: 500; 
  background-color: #f9f9f9; 
  border-top: 1px solid #eee; 
`;

export const PdfTitleContent = styled.div`
  display: flex;
  align-items: center;
`;

export const PdfLabel = styled.span`
  background: #E74C3C;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
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