'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLoading } from '@contexts/LoadingContext';
import { SpinnerLoader } from '@shared-components/atoms/SpinnerLoader';
import { OverlayContainer } from './FullScreenLoader.styles';

/**
 * FullScreenLoader Component
 * 
 * Renders a full-screen loading overlay controlled by the LoadingContext.
 * Uses React Portal to attach directly to document.body.
 */
export function FullScreenLoader() {
  // Get isLoading, loadingText, and spinnerType from context
  const { isLoading, loadingText, spinnerType } = useLoading();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure component is mounted on the client before attempting to portal
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR or if not loading
  if (!isMounted) {
    return null;
  }

  return createPortal(
    <OverlayContainer 
      data-visible={isLoading} 
      aria-hidden={!isLoading} 
      aria-live="assertive" // Announce changes to screen readers
      role="status" // Semantically identify as status update
    >
      {/* We only render the spinner *contents* when isLoading is true, 
          but the overlay is always in the DOM for smooth transitions */}
      {isLoading && (
        <SpinnerLoader 
          // Use the spinnerType from context
          type={spinnerType} 
          color="#2196f3" // Consider theme variable
          size={70} 
          text={loadingText || undefined} // Pass text from context
        />
      )}
    </OverlayContainer>,
    document.body
  );
} 