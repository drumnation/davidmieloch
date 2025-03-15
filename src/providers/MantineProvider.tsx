"use client";

import { MantineProvider as BaseMantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '../styles/theme';

export function MantineProvider({
  children,
  colorScheme = 'light'
}: {
  children: React.ReactNode;
  colorScheme?: 'light' | 'dark';
}) {
  return (
    <BaseMantineProvider theme={theme} forceColorScheme={colorScheme}>
      {children}
    </BaseMantineProvider>
  );
}