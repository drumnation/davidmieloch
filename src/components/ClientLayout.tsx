'use client';

import React from 'react';
import { AppShell, Container } from '@mantine/core';
import { ThemeProvider } from '../providers/ThemeProvider';
import Header from '../shared-components/organisms/Header';
import { PersistentFooter } from '../shared-components/organisms/PersistentFooter';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        
        <AppShell.Main>
          <Container size="lg" py="md">
            {children}
          </Container>
        </AppShell.Main>
        
        <PersistentFooter data-print-hidden="true" />
      </AppShell>
    </ThemeProvider>
  );
} 