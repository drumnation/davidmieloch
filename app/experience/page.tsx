'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PageWrapper } from '@shared-components/templates/PageWrapper';

// Dynamically import the Experience component
const Experience = dynamic(
  () => import('../../src/shared-components/pages/Experience').then(mod => mod.Experience), 
  { 
    ssr: false,
    // Using null fallback for Suspense, global loader handles initial state
    loading: () => null
  }
);

export default function ExperiencePage() {
  return (
    <PageWrapper>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </PageWrapper>
  );
} 