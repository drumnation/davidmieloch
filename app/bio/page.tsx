'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PageWrapper } from '@shared-components/templates/PageWrapper';

// Dynamically import the Bio component
const Bio = dynamic(
  () => import('../../src/shared-components/pages/Bio/Bio').then(mod => mod.default), 
  { 
    ssr: false,
    // Using null fallback for Suspense, global loader handles initial state
    loading: () => null 
  }
);

export default function BioPage() {
  return (
    <PageWrapper>
      <Suspense fallback={null}>
        <Bio />
      </Suspense>
    </PageWrapper>
  );
} 