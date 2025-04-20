'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { AppShell } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks'; // No longer needed?
// import { MantineProvider } from '@mantine/core'; // No longer needed?
import { ThemeProvider, useTheme } from '@providers/ThemeProvider'; // Path Alias
import { ClarityProvider } from '@providers/ClarityProvider'; // Path Alias
import { LoadingProvider } from '@contexts/LoadingContext'; // Path Alias
import { Header } from '@shared-components/organisms/Header'; // Path Alias
import { PersistentFooter } from '@shared-components/organisms/PersistentFooter'; // Path Alias
import { setupSpringDebugger } from '@utils/animations/spring-debug'; // Path Alias
import { FullScreenLoader } from '@shared-components/organisms/FullScreenLoader'; // Path Alias

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme } = useTheme(); // Needs to be inside ThemeProvider
  const isDark = colorScheme === 'dark';

  // Initialize spring debugger in both dev and production
  useEffect(() => {
    // Skip in SSR context
    if (typeof window === 'undefined') return;

    // Constants for easy toggling
    const ENABLE_IN_PROD = true; // Set to false to disable in production
    const isProduction = process.env.NODE_ENV === 'production';

    try {
      if (isProduction && ENABLE_IN_PROD) {
        console.log('[Debug] Setting up spring debugger in production mode (safety measures active)');
        setupSpringDebugger();
      } else if (!isProduction) {
        console.log('[Debug] Setting up spring debugger in development mode');
        setupSpringDebugger();
      }
    } catch (e) {
      console.error('[Error] Failed setting up spring debugger:', e);
    }
  }, []);

  // Inner component to access theme context
  const AppShellWithTheme = ({ children }: { children: React.ReactNode }) => {
    const { colorScheme } = useTheme();
    const isDark = colorScheme === 'dark';

    return (
      <AppShell
        header={{ height: 60 }}
        styles={() => ({
          main: {
            backgroundColor: isDark ? 'var(--background-dark)' : 'var(--background-light)',
            transition: 'background-color 200ms ease',
          },
          root: {
            backgroundColor: isDark ? 'var(--background-dark)' : 'var(--background-light)',
            transition: 'background-color 200ms ease',
            overflowX: 'hidden',
          }
        })}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          {children}
        </AppShell.Main>

        <PersistentFooter data-print-hidden="true" />
      </AppShell>
    );
  };

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ClarityProvider>
          <LoadingProvider>
            <AppShellWithTheme>{children}</AppShellWithTheme>
            <FullScreenLoader />
          </LoadingProvider>
        </ClarityProvider>
      </ThemeProvider>
    </Provider>
  );
} 