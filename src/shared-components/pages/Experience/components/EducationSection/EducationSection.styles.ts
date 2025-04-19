import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: 2rem 0;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

export const EducationItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
  gap: 1.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SchoolLogo = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f0f0f0; // Fallback background
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
    align-self: flex-start; /* Keep logo aligned left on mobile */
  }

  img, iframe {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Changed from cover to contain */
    border-radius: 6px;
    border: none;
  }
`;

export const EducationContent = styled.div`
  flex-grow: 1;
`;

export const EducationSchool = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #222;
`;

export const EducationMetadataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: #555;
`;

export const EducationDegree = styled.span`
  font-weight: 500;
`;

export const EducationDates = styled.span`
  font-style: italic;
  white-space: nowrap;
`;

export const EducationDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
  margin-top: 0.8rem;
  margin-bottom: 1rem;
`;

export const MediaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Consistent gap */
  margin-top: 1rem;
`;

interface MediaContainerProps {
  $isWide?: boolean;
}

export const MediaContainer = styled.div<MediaContainerProps>`
  width: ${props => props.$isWide ? '100%' : 'calc(50% - 4px)'};
  margin-bottom: 8px;
  position: relative; /* Needed for absolute positioning inside */
  overflow: hidden; /* Ensure content respects border radius */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  /* Image specific styles */
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
    cursor: pointer;
    border-radius: 8px 8px 0 0; /* Only top radius if description exists */

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .media-description {
    padding: 8px 10px;
    font-size: 0.85rem;
    color: #555;
    background-color: #f9f9f9;
    border-top: 1px solid #eee;
  }

  /* PDF specific styles */
  .pdf-container {
    width: 100%; /* Take full width of MediaContainer */
    display: flex;
    flex-direction: column;
  }

  .pdf-thumbnail {
    display: block;
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    background-color: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .pdf-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.9rem;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    svg {
      margin-bottom: 8px;
      fill: white;
    }

    ${'.pdf-thumbnail'}:hover & {
      opacity: 1;
    }
  }

  .pdf-title {
    padding: 8px 10px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
    background-color: #f9f9f9;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    border-radius: 0 0 8px 8px;

    svg {
      flex-shrink: 0;
      margin-right: 8px;
      vertical-align: middle;
      fill: #E74C3C; /* PDF red */
    }
  }

  /* Embed specific styles */
  .embed-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* Default 16:9 */
    height: 0; /* Required for padding-bottom trick */
    overflow: hidden;
    border-radius: 8px;

    &.has-defined-height {
      padding-bottom: 0;
      height: auto; /* Use explicit height */
    }

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      max-width: 100%;
      border: none;
      border-radius: 8px;

      &.has-defined-height {
        position: static; /* Let iframe size itself */
      }
    }
  }
`;

// Styles for the Image Modal
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  cursor: default;
  display: flex; /* Use flex to help center image */
  flex-direction: column; /* Stack image and title */
  align-items: center; /* Center image horizontally */
  justify-content: center; /* Center image vertically */
`;

export const ModalImage = styled.img`
  display: block; /* Prevent extra space below image */
  max-width: 100%;
  max-height: calc(90vh - 60px); /* Adjust max height considering padding and title */
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
`;

export const ModalTitle = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 10px 15px;
  border-radius: 0 0 4px 4px;
  text-align: center;
  font-size: 1rem;
  margin-top: -4px; /* Overlap slightly with image bottom */
  width: 100%;
  box-sizing: border-box;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: -10px; /* Position slightly outside content area */
  right: -10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 24px;
  line-height: 36px; /* Center the '×' */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`; 