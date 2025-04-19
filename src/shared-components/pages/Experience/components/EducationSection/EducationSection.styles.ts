import styled from 'styled-components';

export const SectionContainer = styled.section`
  padding: 2rem 1.5rem; /* Add horizontal padding */
  /* Add a subtle background and border radius */
  background-color: #ffffff; /* Or theme background */
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); /* Subtle shadow */
  margin-bottom: 2rem; /* Add space below the section card */

  /* Remove border-bottom if sections are visually separated by cards/wrappers */
  /* border-bottom: 1px solid #e0e0e0; */

  /* Removed h2 styles, will use SectionTitle */
  /* h2 { ... } */
`;

// Added SectionHeader based on SideProjectsSection styles
export const SectionHeader = styled.div`
  margin-bottom: 1.5rem; /* Adjust spacing as needed */
  padding: 0; /* Removed horizontal padding */
`;

// Added SectionTitle based on SideProjectsSection styles
export const SectionTitle = styled.h2`
  font-size: 1.8rem; /* Match old h2 style */
  font-weight: 600;
  color: #333; /* Match old h2 style */
  margin: 0;
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
  padding: 1rem; /* Added padding */
`;

export const MediaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* Consistent gap */
  margin-top: 1rem;
  box-sizing: border-box; /* Ensure padding/border included in width */
`;

interface MediaContainerProps {
  $isWide?: boolean;
}

export const MediaContainer = styled.div<MediaContainerProps>`
  /* Use 49% for half-width to be safer with gaps/rounding */
  width: ${props => props.$isWide ? '100%' : '49%'};
  margin-bottom: 8px;
  position: relative; /* Needed for absolute positioning inside */
  /* overflow: hidden; */ /* Temporarily commented out for debugging */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  box-sizing: border-box; /* Ensure padding/border included in width */

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

  /* Embed specific styles - Using aspect ratio padding */
  .embed-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio (9 / 16 * 100) */
    height: 0;
    overflow: hidden;
    width: 100%; /* Ensure it takes full width of MediaContainer */
    border-radius: 8px; /* Match MediaContainer radius */
  }

  .embed-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
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

// Wrapper for the list of education items to apply gap
export const EducationItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* This creates space between items */
  padding: 0; /* Removed horizontal padding */
`; 