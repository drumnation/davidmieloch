'use client';

import React from 'react';
import { Hero } from '../src/shared-components/organisms/Hero';

export default function HomePage() {
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