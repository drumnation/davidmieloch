import styled from 'styled-components';

// Base container for all media items
export const MediaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;

  /* Handle different width items */
  .quarter-width-item {
    width: calc(25% - 0.75rem); /* Adjust gap */
    @media (max-width: 900px) {
      width: calc(50% - 0.5rem);
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 100%;
    }
  }
  .third-width-item {
    width: calc(33.33% - 0.67rem); /* Adjust gap */
    @media (max-width: 900px) {
        width: calc(50% - 0.5rem);
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 100%;
    }
  }
  .half-width-item {
    width: calc(50% - 0.5rem);
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 100%;
    }
  }
  /* Add similar rules for half-width if needed, or handle via direct style props */
`;

// Individual media item wrapper - Reverted to original shadow/margin, removed border/background
export const MediaItem = styled.div`
  width: 100%; // Keep width definition
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Original shadow */
  margin-top: 1rem; /* Original margin */
`;

// Styling for images - Ensure image itself has top radius if needed
export const MediaImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  /* Remove border-radius if applied to MediaItem container */
  /* border-top-left-radius: 8px; */
  /* border-top-right-radius: 8px; */
`;

// Styling for videos - Ensure video itself has top radius if needed
export const MediaVideo = styled.video`
  display: block;
  width: 100%;
  max-height: 400px;
  /* Remove border-radius if applied to MediaItem container */
  /* border-top-left-radius: 8px; */
  /* border-top-right-radius: 8px; */
`;

// Styling for audio player
export const MediaAudio = styled.audio`
  width: 100%;
  margin-top: 0.5rem;
`;

// Container for audio thumbnail and text
export const AudioInfoContainer = styled.div`
  display: flex;
  align-items: flex-start; /* Align items to the top */
  padding: 0.75rem;
  gap: 0.75rem;
  flex-grow: 1;

  .audio-text-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

export const AudioThumbnailContainer = styled.div`
  flex-shrink: 0;
  img {
    border-radius: 4px;
  }
`;

// Styling for embedded content (iframes)
export const MediaEmbed = styled.div`
  width: 100%;
  iframe {
    width: 100%;
    border: none;
    border-radius: 8px;
    display: block; /* Remove extra space below iframe */
  }
`;

export const CroppedMediaEmbed = styled.div<{ $cropHeight?: string }>`
  width: 100%;
  height: ${({ $cropHeight }) => $cropHeight || 'auto'};
  overflow: hidden;
  position: relative;
  border-radius: 8px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; // Will be controlled by parent height
    border: none;
  }
`;

// Styling for PDF viewer
export const PDFViewer = styled.div`
  width: 100%;
  height: 600px; /* Default height, can be overridden */
  border-radius: 8px;
  overflow: hidden; /* Hide scrollbars if iframe has them */

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .pdf-fallback {
    padding: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: var(--color-text-muted);
    a {
      color: var(--color-accent-fg);
      text-decoration: underline;
    }
  }
`;

// Shared title styling - Restored original background, padding, border
export const MediaTitle = styled.div`
  font-size: 1rem; /* Original size */
  font-weight: 600; /* Original weight */
  margin: 0; /* Original margin */
  color: rgba(0, 0, 0, 0.9); /* Original color */
  display: flex;
  align-items: center;
  padding: 10px 15px; /* Original padding */
  background-color: #f9f9f9; /* Original background */
  border-bottom: 1px solid rgba(0, 0, 0, 0.08); /* Original border */
`;

// Shared description styling - Add padding consistent with title?
export const MediaDescription = styled.div`
  font-size: 0.875rem; /* Original size */
  color: rgba(0, 0, 0, 0.7); /* Original color */
  padding: 10px 15px 15px; /* Match horizontal padding, add bottom */
  flex-grow: 1;
  line-height: 1.4;

  p {
    margin: 0.5rem 0; /* Original p margin */
    &:last-child {
        margin-bottom: 0;
    }
  }
`;

// Styling for link types
export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border-muted);
  border-radius: 8px;
  background-color: var(--color-canvas-subtle);
  overflow: hidden;
  width: 100%;
  /* Removed fixed height from here, will control in component */

  /* Container for thumbnail and content */
  > div {
    display: flex;
    flex: 1;

    /* --- Mobile Styles --- */
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: column;
    }
  }

  .link-thumbnail {
    flex-shrink: 0;
    width: 150px; /* Default width for desktop */

    /* --- Mobile Styles --- */
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 100%; /* Full width on mobile */
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;

      /* --- Mobile Styles --- */
      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        max-height: 200px; /* Constrain height on mobile */
        object-fit: cover; /* Ensure image covers the area */
      }
    }
  }

  .link-content {
    padding: 0; /* Remove padding here, title/desc/button will have own */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Push button to bottom */
    flex-grow: 1;

    /* --- Mobile Styles --- */
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      width: 100%; /* Ensure content takes full width */
    }
  }

  .link-title {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    background-color: #f9f9f9;
    padding: 10px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0 0 8px 0;

    span { flex-grow: 1; }
  }

  .link-description {
    font-size: 0.9rem; /* Original size */
    color: rgba(0, 0, 0, 0.7); /* Original color */
    margin-bottom: 16px; /* Original margin */
    flex-grow: 1;
    padding: 0 15px; /* Add horizontal padding */
    p {
      margin: 0.5rem 0;
      line-height: 1.4;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .link-button {
    background-color: #0073b1; /* Original blue background */
    color: white; /* Original white text */
    border: none; /* Original: no border */
    border-radius: 4px; /* Original radius */
    padding: 8px 16px; /* Original padding */
    font-size: 0.85rem; /* Original font size */
    font-weight: 600; /* Original font weight */
    cursor: pointer;
    transition: background-color 0.2s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    align-self: flex-start; /* Align to start */
    margin: 0 15px 15px; /* Add margin for spacing */

    &:hover {
      background-color: #006097; /* Original hover */
      text-decoration: none;
    }
  }
`;

// Container for grouped media items
export const MediaGroup = styled.div<{ $layout?: 'default' | 'stack' }>`
  display: flex;
  flex-direction: ${({ $layout }) => ($layout === 'stack' ? 'column' : 'row')};
  flex-wrap: wrap; // Allow wrapping within groups if needed
  gap: 0.5rem; // Smaller gap within groups
  width: 100%; // Default width
  border: none; // Groups typically don't have their own border
  background-color: transparent;
  padding: 0;

  /* Adjust width based on class */
  &.quarter-width-group {
    width: calc(25% - 0.75rem);
  }
  &.third-width-group {
    width: calc(33.33% - 0.67rem);
  }
  &.half-width-group {
    width: calc(50% - 0.5rem);
  }

  /* Responsive adjustments for groups */
  @media (max-width: 900px) {
    &.quarter-width-group, &.third-width-group, &.half-width-group {
        width: calc(50% - 0.5rem);
    }
  }
  @media (max-width: 600px) {
    &.quarter-width-group, &.third-width-group, &.half-width-group {
        width: 100%;
    }
  }

  /* Ensure items within the group take appropriate space */
  & > ${MediaItem} {
    /* By default, items in a row group might share space */
    /* You might need specific rules here depending on the desired layout */
    flex-grow: 1; // Example: make items share space equally
    width: auto; // Override the default 100% width from MediaItem

    /* If layout is stack, make items full width of the group */
    ${({ $layout }) => $layout === 'stack' && `
      width: 100%;
      flex-grow: 0; // Don't grow vertically unless needed
    `}
  }
`;

// Specific content wrapper for stack layout in groups
export const MediaGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`; 