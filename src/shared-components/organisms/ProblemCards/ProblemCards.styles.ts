import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';
import { Typography } from '../../atoms/Typography/Typography';
import { Card } from '../../atoms/Card/Card';

export const ProblemCard = styled(Card)`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => (theme as MantineTheme).colors.blue[6]};
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &.gradient {
    background: ${({ theme }) => (theme as MantineTheme).colors.blue[6]};
    color: white;
  }
  
  &.accent {
    background-color: ${({ theme }) => (theme as MantineTheme).colors.blue[6]};
    color: white;
    border-left: 4px solid rgba(255, 255, 255, 0.3);
  }
`;

export const Title = styled(Typography)`
  margin-bottom: 1.5rem;
  color: white;
  font-weight: bold;
`;

export const Description = styled(Typography)`
  margin-bottom: 1.5rem;
  flex-grow: 1;
  color: white;
  line-height: 1.6;
`;

export const PlainTextContent = styled.div`
  margin-top: auto;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem;
  white-space: pre-line;
`; 