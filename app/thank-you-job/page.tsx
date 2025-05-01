'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PageWrapper } from '@shared-components/templates/PageWrapper';

// Dynamic import of BestPractices
const ThankYouJob = dynamic(
    () => import('@/shared-components/pages/ThankYouJob').then((mod) => mod.ThankYouJob),
    {
        loading: () => null,
        ssr: false
    }
);

// Add a console log to see if this file is being used
console.log('Loading thank-you-job page');

const ThankYouJobPage = () => {
    return (
        <PageWrapper>
            <Suspense fallback={null}>
                <ThankYouJob />
            </Suspense>
        </PageWrapper>
    );
};

export default ThankYouJobPage; 