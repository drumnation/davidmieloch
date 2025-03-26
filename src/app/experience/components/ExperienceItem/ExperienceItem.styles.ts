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
  margin: 0.5rem 0 0;
  padding-left: 1.5rem;
`;

export const BulletPoint = styled.li`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
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
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MediaContainer = styled.div<{ $isWide?: boolean }>`
  width: 100%;
  max-width: ${({ $isWide }) => $isWide ? '100%' : '400px'};
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  flex: ${({ $isWide }) => $isWide ? '1 0 100%' : '1 0 calc(50% - 8px)'};
  
  iframe, img {
    display: block;
    width: 100%;
  }
  
  &.pdf-container {
    display: flex;
    flex-direction: column;
    
    .pdf-thumbnail {
      position: relative;
      padding-top: 56.25%; /* 16:9 aspect ratio */
      background-color: ${({ theme }) => theme.colors.background.light};
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
      background-color: ${({ theme }) => theme.colors.background.light};
      border-top: 1px solid ${({ theme }) => theme.colors.border};
    }
  }
`; 