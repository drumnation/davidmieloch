'use client';

import React from 'react';
import { Container, Text, Title, Button } from '@mantine/core';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <Container size="md" style={{ paddingTop: '5rem', textAlign: 'center' }}>
          <Title order={1} size="2.5rem" mb="xl" style={{ color: '#e53e3e' }}>
            Critical Application Error
          </Title>
          <Text mb="xl" size="lg">
            The application encountered a serious error and couldn't load properly.
          </Text>
          
          {process.env.NODE_ENV !== 'production' && (
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
          
          <Button 
            color="blue" 
            onClick={reset}
            style={{ marginTop: '2rem' }}
          >
            Try again
          </Button>
        </Container>
      </body>
    </html>
  );
} 