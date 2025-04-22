import styled from 'styled-components';
import { MantineTheme } from '@mantine/core';

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

export const LoadingText = styled.div`
  margin-top: 1.25rem;
  font-size: 1.1rem;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
  text-align: center;
  font-weight: 500;
`; 