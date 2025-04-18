'use client';

import React from 'react';
import { SpinnerLoader } from '@shared-components/atoms/SpinnerLoader';

// This group loading file is rendered by Next.js for routes in (common)
// within the main content area while the page component loads.
// The global FullScreenLoader provides initial feedback.
export default function CommonLoading() {
  // Wrap spinner in a centering container
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)', // Approximate height minus header/footer
        width: '100%',
      }}
    >
      <SpinnerLoader 
        type="circle" // Choose a suitable default type
        text="Loading content..." 
      />
    </div>
  );
} 