"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { WhitePaperProps } from './WhitePaper.types';
import { SpinnerLoader } from '../../../components';

// Import components directly
import { AiSkepticToExpert } from '../../sections/AiSkepticToExpert';
import { AiAutopilotAnalogy } from '../../sections/AiAutopilotAnalogy';
import { BrainGardenOverview } from '../../sections/BrainGardenOverview';
import { RealWorldImpact } from '../../sections/RealWorldImpact';

// Create styled components for animation
const FadeInContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
  animation-delay: 100ms;
  position: relative;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const WhitePaper: React.FC<WhitePaperProps> = ({
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Fix for hydration issues and ensure content is loaded
  useEffect(() => {
    // Use requestAnimationFrame to ensure the browser has painted before removing loader
    const loadTimer = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsLoading(false);
      });
    }, 300); // Small delay to ensure transition is smooth

    return () => clearTimeout(loadTimer);
  }, []);

  // Show spinner while loading
  if (isLoading) {
    return <SpinnerLoader type="hash" color="#2196f3" size={70} fullPage={true} />;
  }

  return (
    <ContentContainer className={className}>
      <FadeInContainer>
        <ErrorBoundary fallback={<div>Error loading skeptic to expert section. Please refresh.</div>}>
          <AiSkepticToExpert />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading autopilot section. Please refresh.</div>}>
          <AiAutopilotAnalogy />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading overview section. Please refresh.</div>}>
          <BrainGardenOverview />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>Error loading impact section. Please refresh.</div>}>
          <RealWorldImpact />
        </ErrorBoundary>
        {/* Additional sections will be added here as they are developed */}
      </FadeInContainer>
    </ContentContainer>
  );
};

export default WhitePaper;