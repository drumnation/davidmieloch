import React from 'react';
import PageTemplate from '@/shared-components/templates/PageTemplate';
import Image from 'next/image';

export const metadata = {
  title: 'Best Practices Integration | David Mieloch',
  description: 'Learn about best practices integration for modern software development.',
};

function Hero() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <Image src="/mieloch.png" alt="David Mieloch" width={400} height={400} style={{ marginBottom: '2rem' }} />
      <h1>Welcome to David Mieloch&apos;s Portfolio</h1>
      <p>Software architect, full-stack developer, and team lead with a background in music composition.</p>
    </div>
  );
}

export default function BestPracticesIntegrationPage() {
  return (
    <PageTemplate>
      <Hero />
    </PageTemplate>
  );
}