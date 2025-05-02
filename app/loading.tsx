'use client';

import React from 'react';
import { Center, Loader } from '@mantine/core';

// This root loading file is automatically rendered by Next.js during navigation
// within the main content area while the page component loads.
// The global FullScreenLoader provides initial feedback.
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Center style={{ height: '100vh' }}>
      <Loader color="blue" size="xl" type="dots" />
    </Center>
  );
} 