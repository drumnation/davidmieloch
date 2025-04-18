'use client'; // Make this a client component to use hooks

import React from 'react'; // Import React
import Home from '../src/shared-components/pages/Home';
import { PageWrapper } from '@shared-components/templates/PageWrapper';

export default function HomePage() {
  return (
    <PageWrapper>
      <Home />
    </PageWrapper>
  );
} 