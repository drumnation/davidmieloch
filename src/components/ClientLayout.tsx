'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { AppShell } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks'; // No longer needed?
// import { MantineProvider } from '@mantine/core'; // No longer needed?
import { ThemeProvider } from '@providers/ThemeProvider'; // Keep ThemeProvider for now
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
  // No need to get colorScheme here anymore

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

  // Inner component - no longer needs to access theme context directly
  const AppShellWithTheme = ({ children }: { children: React.ReactNode }) => {
    // const { colorScheme } = useMantineTheme(); // Remove hook
    // const isDark = colorScheme === 'dark'; // Remove derived variable

    return (
      <AppShell
        header={{ height: 60 }}
        styles={() => ({
          main: {
            // These CSS variables are set by the outer ThemeProvider based on the determined colorScheme
            backgroundColor: 'var(--background-light)', // Use the variable directly
            transition: 'background-color 200ms ease',
          },
          root: {
            backgroundColor: 'var(--background-light)', // Use the variable directly
            transition: 'background-color 200ms ease',
            overflowX: 'hidden',
          }
          // The correct background (light or dark) will be applied via the theme class set on body/html
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
      {/* ThemeProvider still needed to set up context for MantineProvider */}
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