'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { SpinnerLoader, SpinnerLoaderProps } from './SpinnerLoader';
import styled from 'styled-components';

// Overlay container that will be portaled to document.body
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 9999;
`;

export interface LoadingPortalProps extends Omit<SpinnerLoaderProps, 'fullPage'> {
  /**
   * Whether to show the loading spinner
   */
  show: boolean;
}

/**
 * A loading spinner component that uses React's createPortal to render
 * directly to document.body, ensuring it's always properly positioned
 * regardless of the parent component layout.
 */
export function LoadingPortal({ 
  show, 
  type = 'circle',
  color = '#2196f3',
  size = 60,
  text,
  className
}: LoadingPortalProps) {
  // Only render in the browser, not during SSR
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Don't render anything if not showing or not mounted (SSR)
  if (!show || !isMounted) {
    return null;
  }

  // Render spinner portal to document.body
  return createPortal(
    <LoadingOverlay className={className}>
      <SpinnerLoader
        type={type}
        color={color}
        size={size}
        fullPage={false} // We handle the positioning here
        text={text}
      />
    </LoadingOverlay>,
    document.body
  );
} 