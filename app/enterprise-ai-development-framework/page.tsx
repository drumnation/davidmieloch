'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PageWrapper } from '@shared-components/templates/PageWrapper';

// Dynamic import of WhitePaper
const WhitePaper = dynamic(
  () => import('../../src/shared-components/pages/WhitePaper'),
  { 
    loading: () => null, 
    ssr: false 
  }
);

export default function EnterpriseAiDevelopmentFrameworkPage() {
  return (
    <PageWrapper>
      <Suspense fallback={null}>
        <WhitePaper />
      </Suspense>
    </PageWrapper>
  );
} 