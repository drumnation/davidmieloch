import styled from 'styled-components';
import { TechIconContainer } from '@shared-components/atoms/TechIcon/TechIcon.styles'; // Assuming TechIcon uses styled-components

export const SectionContainer = styled.section`
  margin-bottom: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  
  h2 {
    font-size: 1.25rem;
    margin-bottom: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
  }
`;

// Add back original ExperienceItem styling from HEAD:ExperienceSection.styles.ts
export const ExperienceItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  position: relative;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  padding: 0;
  
  /* Add padding to child elements except TechnologiesList and ExperienceHeader */
  > *:not(.technologies-list):not(.project-header) {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 32px;
  }
`;

// Add back original Header styling from HEAD:ExperienceSection.styles.ts
export const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

export const CompanyLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
  padding: 2px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px;
  flex: 1;
  min-width: 0;
`;

export const ExperienceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const ExperienceTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.9);
`;

export const ExperienceMetadataRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
`;

export const ExperienceCompany = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
`;

export const ExperienceDates = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  &:before {
    content: "•";
    margin-right: 4px;
  }
`;

export const ExperienceLocation = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  &:before {
    content: "•";
    margin-right: 4px;
  }
`;

// Restore original ExperienceDescription styling from HEAD:ExperienceSection.styles.ts
export const ExperienceDescription = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 8px;
  
  ul {
    margin-top: 8px;
    padding-left: 18px;
    
    li {
      margin-bottom: 8px;
      position: relative;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

// Add back original bullet point styling from HEAD:ExperienceSection.tsx
export const BulletList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BulletItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const BulletIcon = styled.div`
  flex-shrink: 0;
  background: #f5f5f5;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  svg {
    color: #555;
    width: 14px;
    height: 14px;
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: #eef1f6;
    svg {
      color: #3366cc;
    }
  }
`;

export const BulletText = styled.div`
  flex: 1;
  
  /* Fix vertical alignment with markdown content */
  > div {
    width: 100%;
  }

  /* Remove margins from paragraphs to improve vertical alignment */
  p {
    margin: 0;
    line-height: 1.5;
  }

  /* Ensure proper spacing in lists */
  ul, ol {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
`;

// Add back original Media styling from HEAD:ExperienceSection.styles.ts
export const MediaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
  margin-top: 16px;
  margin-bottom: 16px;
  
  .quarter-width-image {
    flex: 0 0 23.5% !important;
    max-width: 23.5% !important;
    margin-bottom: 16px !important;
  }
  
  .third-width-image {
    flex: 0 0 31.33% !important;
    max-width: 31.33% !important;
    margin-bottom: 16px !important;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    
    .quarter-width-image,
    .third-width-image {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
  }
`;

export const MediaContainer = styled.div<{ $isWide?: boolean }>`
  flex: ${({ $isWide }) => $isWide ? '0 0 100%' : '0 0 48.5%'};
  max-width: ${({ $isWide }) => $isWide ? '100%' : '48.5%'};
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px 8px 0 0;
  }
  
  iframe {
    width: 100%;
    border: none;
    display: block;
  }
  
  /* Add styles for clickable images */
  &:has(> img) {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
  
  &.quarter-width-image {
    &:hover {
      z-index: 1;
    }
  }
  
  &.pdf-container {
    display: flex;
    flex-direction: column;
    
    .pdf-thumbnail {
      position: relative;
      padding-top: 56.25%; /* 16:9 aspect ratio */
      background-color: #f5f5f5;
      cursor: pointer;
      
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
        
        svg {
          margin-right: 8px;
        }
      }
    }
    
    .pdf-title {
      padding: 12px;
      font-weight: 500;
      background-color: #f9f9f9;
      border-top: 1px solid #eee;
    }
  }
  
  &.link-container {
    display: flex;
    flex-direction: row;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    min-height: 160px;
    max-height: 180px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .link-thumbnail {
      position: relative;
      width: 280px;
      height: 100%;
      flex-shrink: 0;
      background-color: #f0f0f0;
      cursor: pointer;
      
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .link-placeholder {
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
        }
        
        .placeholder-text {
          font-weight: 500;
          font-size: 14px;
          color: #555;
        }
      }
    }
    
    .link-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background-color: #fff;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .link-title {
      font-weight: 600;
      font-size: 16px;
      color: #000;
      margin: 0 0 8px 0;
      line-height: 1.4;
    }
    
    .link-description {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      margin: 0 0 16px 0;
      line-height: 1.5;
      flex-grow: 1;
    }
    
    .link-button {
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
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      max-height: none;
      
      .link-thumbnail {
        width: 100%;
        height: 180px;
      }
      
      .link-content {
        border-left: none;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

// Add MediaGroup container for group media type
const MediaGroup = styled.div<{ $layout?: 'default' | 'stack'; $width?: string }>`
  display: flex;
  flex-direction: ${props => props.$layout === 'stack' ? 'column' : 'row'};
  flex-wrap: wrap;
  gap: 8px;
  width: ${props => props.$width || '100%'};
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  
  &.half-width-group {
    width: 48.5%;
    flex: 0 0 48.5%;
  }
  
  &.third-width-group {
    width: 31.33%;
    flex: 0 0 31.33%;
  }
  
  &.quarter-width-group {
    width: 23.5%;
    flex: 0 0 23.5%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 100%;
    
    &.half-width-group,
    &.third-width-group,
    &.quarter-width-group {
      width: 100%;
      flex: 0 0 100%;
    }
  }
`;

const MediaGroupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0;
  
  > div {
    margin-bottom: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  img {
    border-radius: 0 !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    
    &:hover {
      transform: none;
    }
  }
`;

// Restore original CompanyDescription styling from HEAD:ExperienceSection.tsx
export const CompanyDescription = styled.div`
  margin-bottom: 26px;
  padding: 1px 0;
  transform: scale(1); /* Force repaint */
  
  /* Target the paragraph directly */
  & > div > p,
  & > div div p {
    font-size: 16px !important;
    line-height: 1.5 !important;
    color: rgba(0, 0, 0, 0.85) !important;
    font-weight: 500 !important;
    margin-bottom: 0.8em !important;
  }
  
  @media screen and (min-width: 768px) {
    & > div > p,
    & > div div p {
      font-size: 18px !important;
    }
  }
  
  & > div > p:last-child,
  & > div div p:last-child {
    margin-bottom: 0 !important;
  }
  
  /* Override any compact styles from MarkdownRenderer */
  & > div {
    font-size: inherit !important;
  }
`;

/*
export const StyledTechIcon = styled(TechIcon)`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;
*/ 