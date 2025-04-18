'use client';

import React from 'react';
import { Container } from '@mantine/core';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <Container size="lg" className={className}>
      {children}
    </Container>
  );
}; 