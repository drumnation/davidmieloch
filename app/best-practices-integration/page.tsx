'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SpinnerLoader } from '../../src/components';

// Dynamically import the BestPractices component with no SSR to prevent hydration issues
const BestPractices = dynamic(
  () => import('../../src/shared-components/sections/BestPractices'), 
  { 
    ssr: false,
    loading: () => (
      <SpinnerLoader 
        type="circle"
        color="#2196f3"
        size={60}
        fullPage={true}
        text="Loading Best Practices Integration..."
      />
    )
  }
);

export default function BestPracticesIntegrationPage() {
  return (
    <Suspense fallback={null}>
      <BestPractices />
    </Suspense>
  );
} 