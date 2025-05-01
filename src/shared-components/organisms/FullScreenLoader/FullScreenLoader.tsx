'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { useLoading } from '@contexts/LoadingContext';
import { SpinnerLoader } from '@shared-components/atoms/SpinnerLoader';
import { OverlayContainer } from './FullScreenLoader.styles';

/**
 * FullScreenLoader Component
 * 
 * Renders a full-screen loading overlay controlled by the LoadingContext.
 * Uses React Portal to attach directly to document.body.
 * Conditionally disables itself on the /contact route.
 */
export function FullScreenLoader() {
  // Get isLoading, loadingText, and spinnerType from context
  const { isLoading, loadingText, spinnerType } = useLoading();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Ensure component is mounted on the client before attempting to portal
    setIsMounted(true);
  }, []);

  // Determine if the loader should be active
  const shouldShowLoader = isLoading && pathname !== '/contact';

  // Don't render anything during SSR or if not loading/on contact page
  if (!isMounted) {
    return null;
  }

  // Conditionally render the portal based on shouldShowLoader
  // The OverlayContainer itself can remain in the DOM for structure if needed,
  // but we'll control visibility and content rendering based on shouldShowLoader.
  // A simpler approach for now: only portal when needed.
  if (!shouldShowLoader) {
    return null; // Completely skip rendering if loader shouldn't be shown
  }

  return createPortal(
    <OverlayContainer
      data-visible={shouldShowLoader} // Use combined condition for visibility
      aria-hidden={!shouldShowLoader}
      aria-live="assertive" // Announce changes to screen readers
      role="status" // Semantically identify as status update
    >
      {/* Render spinner only when shouldShowLoader is true */}
      {shouldShowLoader && (
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