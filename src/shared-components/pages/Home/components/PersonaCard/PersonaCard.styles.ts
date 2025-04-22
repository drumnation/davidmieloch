import styled from 'styled-components';

export const PersonaCardContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 180px;
  min-height: 160px;
  height: 100%;
  justify-content: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
`;

export const PersonaIcon = styled.div`
  width: 48px;
  height: 48px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  svg {
    width: 32px;
    height: 32px;
    transition: transform 0.2s ease;
  }
  
  ${PersonaCardContainer}:hover & {
    background-color: #e2e8f0;
    transform: scale(1.1);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

export const PersonaTitle = styled.h4`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #343a40;
  text-align: center;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PersonaDescription = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  text-align: center;
  margin: 0;
`; 