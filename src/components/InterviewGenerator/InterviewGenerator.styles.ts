import styled from 'styled-components';
import { Paper } from '@mantine/core';
import { Typography } from '@/shared-components/atoms/Typography';
import { Button as AtomButton } from '@/shared-components/atoms/Button';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: #f9f9f9;
  padding-bottom: 120px; /* Add padding for mini player */
`;

export const HeroImage = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  background-image: url('/interview-generator-hero.png');
  background-size: cover;
  background-position: center 75%;
  background-repeat: no-repeat;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
`;

export const HeroTitle = styled.h1`
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1.5rem 0 0.5rem 0;
  text-align: center;
  letter-spacing: 0.5px;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 1rem 0 0.25rem 0;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const FormContentContainer = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    border-radius: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.25rem;
    border-radius: 8px;
    width: calc(100% - 0.5rem);
    margin: 0 auto;
    text-align: center;
  }
`;

export const StyledForm = styled.form`
  width: 100%;
  
  @media (max-width: 480px) {
    h2, h3, h4, label {
      text-align: center;
    }
    
    .mantine-Select-wrapper, .mantine-Textarea-wrapper, .mantine-TextInput-wrapper {
      text-align: left;
    }
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
  max-width: 690px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

// Additional styled components moved from InterviewGenerator.tsx
export const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const PreviewContainer = styled(Paper)`
  padding: 1.5rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.radius.md};
`;

export const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  h2 {
    margin: 0;
  }
  
  button {
    margin-left: auto;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const RadioWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PresetsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const StyledPresetButton = styled(AtomButton)`
  /* Override default ghost hover */
  &&&:hover {
    background-color: ${({ theme }) => theme.colors.gray[1]}; 
    color: ${({ theme }) => theme.colors.blue[6]};
    text-shadow: none;
  }
`;
