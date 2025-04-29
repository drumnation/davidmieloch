import React, { ReactNode } from 'react';
// import { ThemeProvider } from 'styled-components'; // Remove SC import
import { MantineProvider } from '@mantine/core';
// import { theme as styledTheme } from '../styles/theme/styled-theme'; // Remove SC theme import
import { theme as mantineTheme } from '../styles/theme';
import { Provider } from 'react-redux'; // Import Redux Provider
import { store } from '../store'; // Import the Redux store

// Create a wrapper component that provides Mantine theme and Redux store
interface TestWrapperProps {
  children: ReactNode;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
    <Provider store={store}> {/* Add Redux Provider */}
      <MantineProvider theme={mantineTheme}>
        {/* <ThemeProvider theme={styledTheme}> */}{/* Remove SC Provider */}
        {children}
        {/* </ThemeProvider> */}
      </MantineProvider>
    </Provider>
  );
};

// Helper function to wrap components in tests
export const renderWithProviders = (component: React.ReactElement) => {
  return <TestWrapper>{component}</TestWrapper>;
}; 