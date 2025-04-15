import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { MantineProvider } from '@mantine/core';
import { theme as styledTheme } from '../styles/theme/styled-theme';
import { theme as mantineTheme } from '../styles/theme';

// Create a wrapper component that provides both Mantine and styled-components theme
interface TestWrapperProps {
  children: ReactNode;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
    <MantineProvider theme={mantineTheme}>
      <ThemeProvider theme={styledTheme}>
        {children}
      </ThemeProvider>
    </MantineProvider>
  );
};

// Helper function to wrap components in tests
export const renderWithProviders = (component: React.ReactElement) => {
  return <TestWrapper>{component}</TestWrapper>;
}; 