'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors?.background?.light || '#f8f8f8'};
  color: ${({ theme }) => theme.colors?.text?.secondary || '#666'};
`;

const WrapperContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  position: relative;
`;

interface ReactFlowClientWrapperProps {
  children: React.ReactNode;
  className?: string;
  loadingMessage?: string;
  debug?: boolean;
}

/**
 * Client-side wrapper for React Flow diagrams with explicit client-side rendering support
 * This component:
 * 1. Ensures React Flow only renders on the client side
 * 2. Provides proper ReactFlowProvider context
 * 3. Handles mounting and initialization detection
 * 4. Includes debug features for diagnosing render issues
 */
export const ReactFlowClientWrapper: React.FC<ReactFlowClientWrapperProps> = ({
  children,
  className,
  loadingMessage = 'Loading diagram...',
  debug = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mountedTimestampRef = useRef<number>(0);

  // Debug logging function
  const logDebug = (message: string, data?: any) => {
    if (debug) {
      console.log(`[ReactFlowClientWrapper] ${message}`, data || '');
    }
  };

  // Track DOM mounting and initialization
  useEffect(() => {
    mountedTimestampRef.current = Date.now();
    logDebug('Component mounting started');
    
    // Short delay to ensure DOM is fully ready
    const initTimer = setTimeout(() => {
      setMounted(true);
      logDebug('Component mounted', {
        timestamp: Date.now(),
        mountTime: Date.now() - mountedTimestampRef.current + 'ms',
        domNode: wrapperRef.current,
        dimensions: wrapperRef.current ? {
          width: wrapperRef.current.offsetWidth,
          height: wrapperRef.current.offsetHeight
        } : null
      });
    }, 50);
    
    return () => {
      clearTimeout(initTimer);
      logDebug('Component unmounting');
    };
  }, [debug]);

  // Log state changes for debugging
  useEffect(() => {
    logDebug('Mounted state changed', { mounted });
  }, [mounted, debug]);

  // Only render the actual content on the client after mounting
  if (!mounted) {
    return (
      <LoadingContainer className={className} ref={wrapperRef}>
        <div>{loadingMessage}</div>
      </LoadingContainer>
    );
  }

  return (
    <WrapperContainer className={className} ref={wrapperRef}>
      <ReactFlowProvider>
        {children}
      </ReactFlowProvider>
    </WrapperContainer>
  );
};

export default ReactFlowClientWrapper; 