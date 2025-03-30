'use client';

import React, { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingPortal } from '../../src/components';

// Dynamically import the Experience component with no SSR to prevent hydration issues
const Experience = dynamic(
  () => import('../../src/shared-components/sections/Experience/Experience').then(mod => mod.default), 
  { 
    ssr: false,
    loading: () => null
  }
);

export default function ExperiencePage() {
  // State to control loading visibility
  const [isLoading, setIsLoading] = useState(true);
  
  // Use effect to handle component loading
  useEffect(() => {
    // Create a timeout to give the component time to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingPortal 
        show={isLoading}
        type="pulse"
        color="#2196f3"
        size={60}
        text="Loading Experience..."
      />
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
    </>
  );
} 