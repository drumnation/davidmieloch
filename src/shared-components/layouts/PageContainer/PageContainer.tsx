'use client';

import React from 'react';
import { Container } from '@mantine/core';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <Container
      size="lg"
      className={className}
      styles={(theme) => ({
        root: {
          '@media (maxWidth: 768px)': {
            padding: '0.75rem',
          },
          '@media (maxWidth: 480px)': {
            padding: '0.25rem',
            maxWidth: '100%',
          }
        }
      })}
    >
      {children}
    </Container>
  );
}; 