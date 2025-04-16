import styled from 'styled-components';

export const HomePageContainer = styled.div`
  width: 100%;
`;

export const PersonaNav = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 3rem auto;
  max-width: 800px;
`;

export const CharacteristicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CTASection = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

export const FrameworksSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`; 