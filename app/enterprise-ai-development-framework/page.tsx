'use client';

import React, { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { H1, H2, H3, H4, Text, TextLead } from "@/src/shared-components/atoms/Typography";
import { Container, ContentContainer } from "@/src/shared-components/atoms/Container";
import { Tabs, TabPanel } from '@/src/shared-components/atoms/Tabs';
import styled from "styled-components";
import './enterprise-styles.css';

// Fix the dynamic import to properly handle the error case
const WhitePaper = dynamic(
  () => import('../../src/shared-components/pages/WhitePaper'),
  { 
    // Remove the loading indicator since WhitePaper already has its own loading state
    loading: () => null,
    ssr: false // Disable SSR for this component to prevent hydration issues
  }
);

export default function EnterpriseAiDevelopmentFrameworkPage() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Add error boundary effect
    const handleErrors = (event: ErrorEvent) => {
      console.error('Runtime error caught:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', handleErrors);
    return () => window.removeEventListener('error', handleErrors);
  }, []);

  if (hasError) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>We couldn't load the content. Please try refreshing the page.</p>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <WhitePaper />
    </Suspense>
  );
} 