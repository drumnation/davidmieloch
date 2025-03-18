"use client";

import { AppShell, Container } from '@mantine/core';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Header } from '../organisms/Header';
import { PageTemplateProps } from './PageTemplate.types';

const MotionDiv = motion.div;

export const PageTemplate = ({ 
  children, 
  withContainer = true,
  containerSize = 'xl',
  withAnimation = true,
  animationKey,
}: PageTemplateProps) => {
  // Use App Router hooks if available, otherwise use undefined
  const pathname = usePathname?.() || '';
  
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const content = withContainer ? (
    <Container size={containerSize} py="xl">
      {children}
    </Container>
  ) : children;

  const animatedContent = withAnimation ? (
    <MotionDiv
      key={animationKey || pathname || 'page'}
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {content}
    </MotionDiv>
  ) : content;

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 80 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        {animatedContent}
      </AppShell.Main>
    </AppShell>
  );
};

export default PageTemplate; 