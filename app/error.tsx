'use client';

import React, { useEffect } from 'react';
import { Container, Text, Title, Button, Group } from '@mantine/core';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <Container size="md" style={{ paddingTop: '5rem', textAlign: 'center' }}>
      <Title order={1} size="2.5rem" mb="xl" style={{ color: '#e53e3e' }}>Something went wrong</Title>
      <Text mb="xl" size="lg">The application encountered an error and couldn&apos;t load properly.</Text>
      
      {error.message && process.env.NODE_ENV !== 'production' && (
        <Container
          p="md"
          mb="xl"
          style={{
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: '0.5rem',
            textAlign: 'left',
            maxHeight: '200px',
            overflow: 'auto',
          }}
        >
          <Text style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
            {error.message}
          </Text>
        </Container>
      )}
      
      <Group justify="center" gap="md">
        <Button color="blue" onClick={reset}>
          Try again
        </Button>
        <Button component="a" href="/" variant="outline">
          Return to Home
        </Button>
      </Group>
    </Container>
  );
} 