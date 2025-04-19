// Styles specific to LinkDisplay, if any
import styled from 'styled-components';

// --- Styles moved from ExperienceSection.logic.tsx ---

export const LinkThumbnailWrapper = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  background-color: #eee;
`;

export const LinkThumbnailAnchor = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;
LinkThumbnailAnchor.defaultProps = {
    target: "_blank",
    rel: "noopener noreferrer"
}

// LinkThumbnailImageStyle is an object, move to utils or use inline

export const LinkPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #333;
  padding: 20px;
  text-align: center;

  svg {
    margin-bottom: 12px;
    width: 48px;
    height: 48px;
    // Icon color can be customized here or via props
  }

  .placeholder-text {
    font-weight: 500;
    font-size: 14px;
    color: #555;
  }
`;

export const LinkContentWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.1); // This might need adjustment based on layout (MediaContainer adds border?)
  @media (max-width: 768px) {
     border-left: none;
     border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const LinkTitle = styled.h4`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

export const LinkDescriptionWrapper = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 16px 0;
  line-height: 1.5;
  flex-grow: 1;
`;

export const LinkButtonAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #3366cc;
  color: white;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: background-color 0.2s ease;
  margin-top: auto;
  align-self: flex-start;

  &:hover {
    background-color: #2952a3;
  }

  svg {
    margin-left: 8px;
    width: 16px;
    height: 16px;
    path {
       fill: white;
    }
  }
`;
LinkButtonAnchor.defaultProps = {
    target: "_blank",
    rel: "noopener noreferrer"
}

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

// --- End Moved Styles --- 