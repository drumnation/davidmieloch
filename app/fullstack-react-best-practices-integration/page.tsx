'use client';

import React, { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingPortal } from '../../src/components';

// Add a console log to see if this file is being used
console.log('Loading fullstack-react-best-practices-integration page');

// Dynamically import the BestPractices component with no SSR to prevent hydration issues
const BestPractices = dynamic(
  () => import('../../src/shared-components/sections/BestPractices'), 
  { 
    ssr: false,
    loading: () => null, // Return null in the loading function
  }
);

export default function FullStackReactBestPracticesPage() {
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
        type="circle"
        color="#2196f3"
        size={60}
        text="Loading FullStack React Best Practices..."
      />
      <Suspense fallback={null}>
        <BestPractices />
      </Suspense>
    </>
  );
} 