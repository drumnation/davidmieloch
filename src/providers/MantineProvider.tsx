import { MantineProvider as BaseMantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#e6f7ff',
      '#bae7ff',
      '#91d5ff',
      '#69c0ff',
      '#40a9ff',
      '#1890ff',
      '#096dd9',
      '#0050b3',
      '#003a8c',
      '#002766',
    ],
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  defaultRadius: 'md',
});

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </BaseMantineProvider>
  );
} 