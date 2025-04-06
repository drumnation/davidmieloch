import styled from 'styled-components';

export const StyledExperienceItem = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Logo = styled.div`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  padding: 2px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
`;

export const CompanyInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

export const Title = styled.div`
  margin-bottom: 0.5rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
  
  h4 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0.25rem 0 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MetadataRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 1rem;
`;

export const Period = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

export const Location = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  
  &:before {
    content: "•";
    margin-right: 4px;
  }
`;

export const Description = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const BulletPoints = styled.ul`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  padding-left: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export const BulletPoint = styled.li`
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Activities = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin-bottom: 1rem;
  
  strong {
    font-weight: 600;
  }
`;

export const MediaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  align-items: stretch; /* Make all children the same height */
  
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
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  
  @media (max-width: 768px) {
    flex: 1 0 100%;
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
    flex: 1; /* Fill available space */
  }
  
  .media-caption {
    padding: 12px 15px;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
    background-color: ${({ theme }) => theme.colors.background.light};
    margin-top: auto; /* Push to bottom */
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  &.pdf-container {
    .pdf-thumbnail {
      position: relative;
      padding-top: 56.25%; /* 16:9 aspect ratio */
      background-color: ${({ theme }) => theme.colors.background.light};
      cursor: pointer;
      flex: 1;
      
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
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        font-weight: 600;
        font-size: 1.1rem;
        
        svg {
          margin-right: 10px;
          width: 36px;
          height: 36px;
        }
      }
    }
    
    .pdf-title {
      padding: 12px 15px;
      font-size: 1rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.text.secondary};
      background-color: ${({ theme }) => theme.colors.background.light};
      margin-top: auto; /* Push to bottom */
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
  
  &.link-container {
    .link-preview {
      position: relative;
      display: block;
      padding-top: 56.25%; /* 16:9 aspect ratio */
      background-color: ${({ theme }) => theme.colors.background.light};
      cursor: pointer;
      flex: 1;
      
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
        background-color: rgba(0, 0, 0, 0.05);
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 600;
        font-size: 1.1rem;
        
        svg {
          margin-bottom: 12px;
          width: 48px;
          height: 48px;
        }
      }
    }
    
    .link-description {
      color: ${({ theme }) => theme.colors.text.secondary};
      font-weight: normal;
    }
  }
`; 