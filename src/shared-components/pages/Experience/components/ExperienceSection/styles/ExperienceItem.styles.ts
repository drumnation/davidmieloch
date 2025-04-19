import styled from 'styled-components';

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

// Header area with logo and basic info
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