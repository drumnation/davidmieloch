import styled from 'styled-components';

export const TeamContextContainer = styled.div`
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
    
    .mantine-InputWrapper-label, .mantine-InputWrapper-description, .mantine-Text-root {
      text-align: center;
    }
  }
`; 