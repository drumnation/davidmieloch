'use client';

import React from 'react';
import { Container, Text, Title, Button, Group } from '@mantine/core';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container size="md" style={{ paddingTop: '5rem', textAlign: 'center' }}>
      <Title order={1} size="3rem" mb="xl">404</Title>
      <Title order={2} mb="md">Page Not Found</Title>
      <Text mb="xl">The page you are looking for does not exist or has been moved.</Text>
      <Group justify="center">
        <Link href="/" passHref>
          <Button component="a" size="md">
            Return to Home
          </Button>
        </Link>
      </Group>
    </Container>
  );
} 