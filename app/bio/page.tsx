'use client';

import React, { Suspense } from 'react';
import { Container, Text, Loader } from '@mantine/core';
import dynamic from 'next/dynamic';

// Dynamically import the Bio component with no SSR to prevent hydration issues
const Bio = dynamic(
  () => import('../../src/shared-components/sections/Bio'), 
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

export default function BioPage() {
  return (
    <Suspense fallback={
      <Container style={{ padding: '4rem 0', textAlign: 'center' }}>
        <Loader size="lg" />
        <Text mt="md">Loading content...</Text>
      </Container>
    }>
      <Bio />
    </Suspense>
  );
} 