"use client";

import React, { PropsWithChildren } from 'react';
import { AppShell, Container } from '@mantine/core';
import { animated, SpringValue, useSpring, to, Interpolation } from '@react-spring/web';
import { usePathname } from 'next/navigation';
import { Header } from '../organisms/Header';
import { useInView } from 'react-intersection-observer';

// Define properly typed animated div that handles spring values correctly
type AnimatedDivProps = PropsWithChildren<{
  style?: {
    opacity?: SpringValue<number>;
    transform?: string | SpringValue<string> | Interpolation<number, string>;
  };
}>;

// Create a properly typed AnimatedDiv component that works with React Spring
const AnimatedDiv = animated.div as React.FC<AnimatedDivProps>;

export interface PageTemplateProps {
  children: React.ReactNode;
  withContainer?: boolean;
  containerSize?: string;
  withAnimation?: boolean;
  animationKey?: string;
  className?: string;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  children,
  withContainer = true,
  containerSize = 'xl',
  withAnimation = true,
  animationKey,
  className = '',
}) => {
  // Use App Router hooks if available, otherwise use undefined
  const pathname = usePathname?.() || '';
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const springs = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: {
      mass: 1,
      tension: 180,
      friction: 24,
    },
  });

  const content = withContainer ? (
    <Container size={containerSize} py="xl">
      {children}
    </Container>
  ) : children;

  return (
    <div className={className} ref={ref}>
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 80 }}
        padding="md"
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main>
          {withAnimation ? (
            <AnimatedDiv
              style={{
                opacity: springs.opacity,
                transform: springs.y.to(y => `translateY(${y}px)`),
              }}
            >
              {content}
            </AnimatedDiv>
          ) : (
            content
          )}
        </AppShell.Main>
      </AppShell>
    </div>
  );
};

export default PageTemplate; 