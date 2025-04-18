"use client";

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ErrorBoundary } from '@shared-components/molecules/ErrorBoundary';
import { WhitePaperProps } from './WhitePaper.types';
import { Container } from '@mantine/core';
import dynamic from 'next/dynamic';
import { Hero, HeroProps } from '@shared-components/organisms/Hero';

// Import components directly
import { AiSkepticToExpert } from './components/AiSkepticToExpert/AiSkepticToExpert';
import { AiAutopilotAnalogy } from './components/AiAutopilotAnalogy/AiAutopilotAnalogy';
import { BrainGardenOverview } from './components/BrainGardenOverview/BrainGardenOverview';
import { RealWorldImpact } from './components/RealWorldImpact/RealWorldImpact';

// Create styled components for animation
const FadeInContainer = styled.div`
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

const OuterContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const WhitePaper: React.FC<WhitePaperProps> = ({ id = 'whitepaper', className, onReady }) => {
  // Directly return the content. The loading is handled by the global loader during navigation.
  return (
    <Container id={id} className={className}>
      <OuterContainer>
        <FadeInContainer>
          <ErrorBoundary fallback={<div>Error loading skeptic to expert section. Please refresh.</div>}>
            <AiSkepticToExpert onReady={onReady} />
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
      </OuterContainer>
    </Container>
  );
};

export default WhitePaper;