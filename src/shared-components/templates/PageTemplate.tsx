"use client";

import { AppShell, Container } from '@mantine/core';
import { motion } from 'framer-motion';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer/Footer';
import { PageTemplateProps } from './PageTemplate.types';

const MotionDiv = motion.div;

export const PageTemplate = ({ 
  children, 
  socialLinks,
  soundCloudTracks,
  withContainer = true,
  containerSize = 'xl',
  withAnimation = true,
  animationKey,
}: PageTemplateProps) => {
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
      key={animationKey || 'page'}
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
      footer={{ height: 'auto' }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        {animatedContent}
      </AppShell.Main>

      <AppShell.Footer>
        <Footer 
          socialLinks={socialLinks}
          soundCloudTracks={soundCloudTracks}
        />
      </AppShell.Footer>
    </AppShell>
  );
};

export default PageTemplate; 