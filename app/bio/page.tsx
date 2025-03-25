'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SpinnerLoader } from '../../src/components';

// Dynamically import the Bio component with no SSR to prevent hydration issues
const Bio = dynamic(
  () => import('../../src/shared-components/sections/Bio/Bio').then(mod => mod.default), 
  { 
    ssr: false,
    loading: () => (
      <SpinnerLoader 
        type="pulse"
        color="#2196f3"
        size={60}
        fullPage={true}
        text="Loading Bio..."
      />
    )
  }
);

export default function BioPage() {
  return (
    <Suspense fallback={null}>
      <Bio />
    </Suspense>
  );
} 