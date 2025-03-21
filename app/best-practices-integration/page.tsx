'use client';

import React, { Suspense } from 'react';
import { Container, Text, Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

// Dynamically import the BestPractices component with no SSR to prevent hydration issues
const BestPractices = dynamic(
  () => import('../../src/shared-components/sections/BestPractices'), 
  { 
    ssr: false,
    loading: () => (
      <Container style={{ padding: '4rem 0', textAlign: 'center' }}>
        <Loader size="lg" />
        <Text mt="md">Loading content...</Text>
      </Container>
    )
  }
);

export default function BestPracticesIntegrationPage() {
  return (
    <Suspense fallback={
      <Container style={{ padding: '4rem 0', textAlign: 'center' }}>
        <Loader size="lg" />
        <Text mt="md">Loading content...</Text>
      </Container>
    }>
      <BestPractices />
    </Suspense>
  );
} 