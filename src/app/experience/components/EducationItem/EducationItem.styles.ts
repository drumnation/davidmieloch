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

export const MediaContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  iframe, img {
    display: block;
    width: 100%;
  }
`; 