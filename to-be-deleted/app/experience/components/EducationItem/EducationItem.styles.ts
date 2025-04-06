import styled from 'styled-components';

export const StyledEducationItem = styled.div`
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

export const SchoolInfo = styled.div`
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

export const Activities = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  
  strong {
    font-weight: 600;
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