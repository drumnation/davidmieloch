import styled from 'styled-components';

export const AISettingsContainer = styled.div`
  margin-top: 1.25rem;
  
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const FormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  @media (max-width: 480px) {
    width: 100%;
    
    .mantine-InputWrapper-label, .mantine-InputWrapper-description, .mantine-Text-root, .mantine-RadioGroup-label {
      text-align: center;
    }
  }
`;

export const SettingsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const RadioWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`; 