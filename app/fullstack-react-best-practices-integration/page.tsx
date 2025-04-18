'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PageWrapper } from '@shared-components/templates/PageWrapper';

// Dynamic import of BestPractices
const BestPractices = dynamic(
  () => import('@shared-components/pages/BestPractices'),
  { 
    loading: () => null,
    ssr: false 
  }
);

// Add a console log to see if this file is being used
console.log('Loading fullstack-react-best-practices-integration page');

const FullstackReactBestPracticesPage = () => {
  return (
    <PageWrapper>
      <Suspense fallback={null}>
        <BestPractices />
      </Suspense>
    </PageWrapper>
  );
};

export default FullstackReactBestPracticesPage; 