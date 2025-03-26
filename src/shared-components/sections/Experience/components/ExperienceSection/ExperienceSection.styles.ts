import styled from 'styled-components';

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

export const ExperienceItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  position: relative;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
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
  }
  
  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
`;

export const ExperienceContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 2px;
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

export const MediaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MediaContainer = styled.div<{ $isWide?: boolean }>`
  flex: ${({ $isWide }) => $isWide ? '1 0 100%' : '1 0 calc(50% - 8px)'};
  max-width: ${({ $isWide }) => $isWide ? '100%' : 'calc(50% - 8px)'};
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex: 1 0 100%;
    max-width: 100%;
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
  }
  
  iframe {
    width: 100%;
    border: none;
    display: block;
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
`; 