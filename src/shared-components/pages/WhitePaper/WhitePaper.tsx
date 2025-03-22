"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { WhitePaperProps } from './WhitePaper.types';

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
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const WhitePaper: React.FC<WhitePaperProps> = ({
  className,
}) => {
  const [isClient, setIsClient] = useState(false);
  
  // Fix for hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render on client-side to prevent hydration mismatch
  if (!isClient) {
    return <div style={{ minHeight: '100vh' }}>Loading...</div>;
  }

  return (
    <div className={className} style={{ width: '100%' }}>
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
    </div>
  );
};

export default WhitePaper;