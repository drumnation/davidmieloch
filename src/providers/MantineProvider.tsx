"use client";

import React from 'react';
import { MantineProvider as BaseMantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from '../styles/theme';

// Convert the theme to a Mantine theme object using createTheme
const mantineTheme = createTheme(theme);

export function MantineProvider({
  children,
  colorScheme = 'light'
}: {
  children: React.ReactNode;
  colorScheme?: 'light' | 'dark';
}) {
  return (
    <BaseMantineProvider theme={mantineTheme} defaultColorScheme={colorScheme}>
      {children}
    </BaseMantineProvider>
  );
}