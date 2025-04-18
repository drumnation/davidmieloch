'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Title } from '@mantine/core';
import { SpinnerLoader } from '@shared-components/atoms/SpinnerLoader';

// Dynamically import the BestPractices component
const BestPractices = dynamic(() => import('../../src/shared-components/pages/BestPractices'), {
  loading: () => (
    <SpinnerLoader 
      type="circle" 
      color="#1976d2" 
      size={50} 
      text="Loading Best Practices Integration..."
    />
  ),
  ssr: false,
});

export default function BestPracticesIntegrationPage() {
  return (
    <Suspense fallback={null}>
      <BestPractices />
    </Suspense>
  );
} 