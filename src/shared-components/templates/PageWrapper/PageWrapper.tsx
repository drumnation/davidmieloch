'use client';

import React, { useEffect, useCallback } from 'react';
import { useLoading } from '@contexts/LoadingContext';
import { usePathname } from 'next/navigation';

interface PageWrapperProps {
  children: React.ReactNode;
  onReady?: () => void;
}

export function PageWrapper({ children, onReady }: PageWrapperProps) {
  const { signalPageReady } = useLoading();
  const pathname = usePathname();

  const handlePageReady = useCallback(() => {
    console.log(`[PageWrapper] Page ${pathname} signaling ready`);
    signalPageReady();
    onReady?.();
  }, [pathname, signalPageReady, onReady]);

  // Signal page ready when component mounts
  useEffect(() => {
    // Small delay to allow child components to initialize
    const timeoutId = setTimeout(handlePageReady, 100);
    return () => clearTimeout(timeoutId);
  }, [handlePageReady]);

  return <>{children}</>;
} 