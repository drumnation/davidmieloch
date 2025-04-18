'use client'; // Mark as a Client Component because we use useEffect

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { CodeExamples } from '@shared-components/pages/CodeExamples';
import { Repository } from '@shared-components/types/Repository.types';
import { useLoading } from '@contexts/LoadingContext'; // Import useLoading

interface CodeExamplesClientProps {
  repositories: Repository[];
  rateLimited: boolean;
  children?: React.ReactNode;
}

export default function CodeExamplesClient({ repositories, rateLimited }: CodeExamplesClientProps) {
  const { signalPageReady } = useLoading(); // Get signalPageReady from context
  const router = useRouter(); // Get router instance

  // Effect to REDIRECT if rate limited
  useEffect(() => {
    if (rateLimited) {
      console.log('Rate limit detected on client, redirecting to /experience...');
      // window.open('https://github.com/drumnation', '_blank'); // Remove window.open
      router.push('/experience'); // Redirect to /experience
    }
  }, [rateLimited, router]); // Add router to dependency array

  // Effect to signal page is ready once mounted
  useEffect(() => {
    // Only signal ready if we are *not* about to redirect
    if (!rateLimited) {
      console.log('[CodeExamplesClient] Signaling page ready.');
      signalPageReady(); 
    }
  }, [signalPageReady, rateLimited]); // Add rateLimited dependency

  // Avoid rendering the main content if we are redirecting
  if (rateLimited) {
    return null; // Or render a minimal loading/redirecting message
  }

  return <CodeExamples repositories={repositories} />;
} 