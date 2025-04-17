'use client';

import React, { useEffect } from 'react';
import { AppShell, Container } from '@mantine/core';
import { ThemeProvider, useTheme } from '../providers/ThemeProvider';
import { ClarityProvider } from '../providers/ClarityProvider';
import { Header } from '../shared-components/organisms/Header';
import { PersistentFooter } from '../shared-components/organisms/PersistentFooter';
import { setupSpringDebugger } from '../utils/animations/spring-debug';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme } = useTheme();
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

  return (
    <ThemeProvider>
      <ClarityProvider>
        <AppShell
          header={{ height: 60 }}
          padding="md"
          styles={() => ({
            main: {
              backgroundColor: isDark ? 'var(--background-dark)' : 'var(--background-light)',
              transition: 'background-color 200ms ease',
            },
            root: {
              backgroundColor: isDark ? 'var(--background-dark)' : 'var(--background-light)',
              transition: 'background-color 200ms ease',
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
      </ClarityProvider>
    </ThemeProvider>
  );
} 