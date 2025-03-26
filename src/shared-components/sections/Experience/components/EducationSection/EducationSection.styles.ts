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

export const EducationItem = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const SchoolLogo = styled.div`
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

export const EducationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

export const EducationSchool = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.9);
`;

export const EducationMetadataRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
`;

export const EducationDegree = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  color: rgba(0, 0, 0, 0.9);
`;

export const EducationDates = styled.p`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  &:before {
    content: "•";
    margin-right: 4px;
  }
`;

export const EducationDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 16px;
`;

export const MediaContainer = styled.div<{ isWide?: boolean }>`
  width: 100%;
  max-width: ${({ isWide }) => isWide ? '100%' : '400px'};
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  flex: ${({ isWide }) => isWide ? '1 0 100%' : '1 0 calc(50% - 8px)'};
  
  iframe, img {
    display: block;
    width: 100%;
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