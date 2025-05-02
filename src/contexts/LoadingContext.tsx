'use client';

import React, { createContext, useState, useContext, useMemo, useCallback, useRef, useEffect } from 'react';
import { SpinnerType } from '@shared-components/atoms/SpinnerLoader';
import { usePathname } from 'next/navigation';

const availableSpinnerTypes: SpinnerType[] = [
  'clip',
  'beat',
  'bar',
  'circle',
  'climbing-box',
  'hash',
  'pulse',
  'ring',
  'scale'
];

interface LoadingContextState {
  isLoading: boolean;
  loadingText: string | null;
  spinnerType: SpinnerType;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
  signalPageReady: () => void;
}

const LoadingContext = createContext<LoadingContextState | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [spinnerType, setSpinnerType] = useState<SpinnerType>('circle');

  const isNavCompleteRef = useRef(true);
  const isPageReadyRef = useRef(false);
  const pathname = usePathname();

  // Reset page ready state on route change
  useEffect(() => {
    console.log(`[LoadingContext] Route changed to: ${pathname}. Resetting page ready.`);
    isPageReadyRef.current = false;
    setLoadingText('Loading page...'); // Keep setting default text if desired, or remove too
  }, [pathname]);

  const showLoading = useCallback((text?: string) => {
    console.log('[LoadingContext] showLoading called');
    isNavCompleteRef.current = false;
    isPageReadyRef.current = false;

    const randomIndex = Math.floor(Math.random() * availableSpinnerTypes.length);
    const randomType = availableSpinnerTypes[randomIndex];

    setSpinnerType(randomType);
    setLoadingText(text || 'Loading...'); // Also set a fallback here if text is empty
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    console.log('[LoadingContext] hideLoading called (Nav Complete Signal)');
    isNavCompleteRef.current = true;
    if (isPageReadyRef.current) {
      console.log('[LoadingContext] hideLoading: Page was ready, setting isLoading=false');
      setIsLoading(false);
    }
  }, []);

  const signalPageReady = useCallback(() => {
    console.log('[LoadingContext] signalPageReady called');
    isPageReadyRef.current = true;
    if (isNavCompleteRef.current) {
      console.log('[LoadingContext] signalPageReady: Nav was complete, setting isLoading=false');
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(() => ({
    isLoading,
    loadingText,
    spinnerType,
    showLoading,
    hideLoading,
    signalPageReady,
  }), [isLoading, loadingText, spinnerType, showLoading, hideLoading, signalPageReady]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextState => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 