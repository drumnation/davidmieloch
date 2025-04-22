import styled from 'styled-components';
import { MantineTheme, rgba } from '@mantine/core';

export const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FiltersRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  width: 100%;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => (theme as MantineTheme).colors.gray[7]};
`;

export const ErrorMessage = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => rgba((theme as MantineTheme).colors.red[7], 0.1)};
  border: 1px solid ${({ theme }) => rgba((theme as MantineTheme).colors.red[7], 0.2)};
  border-radius: 8px;
  color: ${({ theme }) => (theme as MantineTheme).colors.red[7]};
`; 