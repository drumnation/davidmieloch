'use client';

import React, { createContext, useContext } from 'react';

export type ThemeContextType = {
  colorScheme: 'dark' | 'light';
  toggleColorScheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  colorScheme: 'light',
  toggleColorScheme: () => null,
});

export const useTheme = () => useContext(ThemeContext); 