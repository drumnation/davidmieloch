"use client";

import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import { Hero } from '../../organisms/Hero';
import { RealWorldImpactProps } from './RealWorldImpact.types';
import { GlobalStyles, ContentSection } from './RealWorldImpact.styles';
import { defaultContent } from './RealWorldImpact.constants';
import { useRealWorldImpactAnimation } from './RealWorldImpact.hook';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ConclusionContent } from './components/ConclusionContent';
import { SpinnerLoader } from '../../../components';

export const RealWorldImpact: React.FC<RealWorldImpactProps> = ({ 
  heroProps = defaultContent.hero,
  className
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { ref, fadeIn } = useRealWorldImpactAnimation();

  useEffect(() => {
    // Simulate loading time or fetch data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SpinnerLoader
        type="ring"
        color="#2196f3" 
        size={60}
        fullPage={false}
        text="Loading Real World Impact..."
      />
    );
  }

  return (
    <ErrorBoundary>
      <animated.div ref={ref} style={fadeIn} className={className}>
        <GlobalStyles />
        <Hero {...heroProps} />
        <ContentSection>
          <ConclusionContent />
        </ContentSection>
      </animated.div>
    </ErrorBoundary>
  );
}; 