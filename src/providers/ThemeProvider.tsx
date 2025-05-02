"use client";

import React, { useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components'; // Re-enable SC provider import
import '@mantine/core/styles.css';
import '@xyflow/react/dist/style.css';
import '../styles/globals.css';
import { MantineProvider } from './MantineProvider'; // Our custom MantineProvider wrapper
import { ThemeContext, ThemeContextType } from '../contexts/ThemeContext'; // Keep context import for now, might remove later
import { usePathname } from 'next/navigation';
import { useMantineTheme } from '@mantine/core'; // Import Mantine theme hook
import { DualAudioProvider } from '@/shared-components/organisms/Footer/components/dual-audio/DualAudioContext'; // Import DualAudioProvider
import { ReduxProvider } from './ReduxProvider'; // Import ReduxProvider

// Keep useTheme hook export for now, as Header/Footer still use it for colorScheme
// We might remove this later if Header/Footer can get colorScheme differently.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Intermediate component to access Mantine theme and provide it to styled-components
const StyledComponentsBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mantineTheme = useMantineTheme();
  // Now we can pass the actual Mantine theme to styled-components
  return <StyledThemeProvider theme={mantineTheme}>{children}</StyledThemeProvider>;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isRoot = pathname?.split('?')[0].replace(/\/+$/, '') === '' || pathname === '/';
  const colorScheme = isRoot ? 'dark' : 'light';

  const toggleColorScheme = () => {
    console.warn('toggleColorScheme is not implemented for route-based theme');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Restore the useEffect for applying theme classes
  React.useEffect(() => {
    // Maybe run this even if not mounted? No, likely causes hydration errors.
    if (!mounted) return;
    document.body.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    // Use the state variable colorScheme which is derived from usePathname
    const themeClass = colorScheme === 'dark' ? 'dark-theme' : 'light-theme';
    document.body.classList.add(themeClass);
    document.documentElement.classList.add(themeClass);
    document.documentElement.style.colorScheme = colorScheme;
    console.log('[ThemeProvider] Applied theme via useEffect:', colorScheme);
  }, [colorScheme, mounted]); // Depend on colorScheme state and mounted

  // Restore the !mounted check to prevent premature rendering?
  // This was likely preventing the worse flashing before, despite causing its own flash.
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <MantineProvider colorScheme={colorScheme}>
        <ReduxProvider>
          <DualAudioProvider>
            <StyledComponentsBridge>
              {children}
            </StyledComponentsBridge>
          </DualAudioProvider>
        </ReduxProvider>
      </MantineProvider>
    </ThemeContext.Provider>
  );
}; 