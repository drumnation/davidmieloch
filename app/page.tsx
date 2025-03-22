'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Hero } from '../src/shared-components/organisms/Hero';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/enterprise-ai-development-framework');
  }, [router]);

  // We'll still return the Hero component as a fallback while redirecting
  const heroProps = {
    title: "David Mieloch",
    subtitle: "Software Architect & Developer",
    description: "Building elegant solutions to complex problems",
    background: 'gradient' as const,
    gradientColors: ['#4361ee', '#3f37c9'],
    textColor: 'light' as const,
    animation: 'fade-up' as const,
    cta: {
      primary: {
        text: 'View Projects',
        link: '/enterprise-ai-development-framework'
      },
      secondary: {
        text: 'About Me',
        link: '/bio'
      }
    }
  };

  return (
    <div>
      <Hero {...heroProps} />
    </div>
  );
} 