import styled from 'styled-components';

export const QuickStartContainer = styled.div`
  margin-top: 1.5rem;
  
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const PresetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    width: 100%;
    align-items: center;
  }
`;

export const PresetButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`; 