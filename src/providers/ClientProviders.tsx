"use client";

import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from './ThemeProvider';
import { store } from '@/store';
import { logger } from '@/utils/logger';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  logger.info('Client providers rendering');
  
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
} 