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
import { PersistentFooter } from '@shared-components/organisms/PersistentFooter'; // Uncomment import
import { setupSpringDebugger } from '@utils/animations/spring-debug'; // Path Alias
import { FullScreenLoader } from '@shared-components/organisms/FullScreenLoader'; // Path Alias

const HEADER_HEIGHT = 60;
const FOOTER_HEIGHT = 60;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize spring debugger in both dev and production
  useEffect(() => {
    if (typeof window === 'undefined') return;
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
    return (
      <AppShell
        header={{ height: HEADER_HEIGHT }}
        styles={() => ({
          main: {
            backgroundColor: 'var(--background-light)',
            transition: 'background-color 200ms ease',
            flexGrow: 1,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          },
          root: {
            backgroundColor: 'var(--background-light)',
            transition: 'background-color 200ms ease',
            overflowX: 'hidden',
            minHeight: '100vh',
          }
        })}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          {children}
        </AppShell.Main>

        {/* Apply styles directly to AppShell.Footer */}
        <AppShell.Footer
          style={{
            padding: 0,
            border: 0,
            position: 'relative', // Add relative positioning
            zIndex: 10000     // Add high z-index 
          }}
        >
          <PersistentFooter data-print-hidden="true" />
        </AppShell.Footer>

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