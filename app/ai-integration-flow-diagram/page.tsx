'use client';

import React, { Suspense } from 'react';
import { AiIntegrationFlowDiagram } from '../../src/components/diagrams/AiIntegrationFlowDiagram';
import { SpinnerLoader } from '../../src/components';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
  }
`;

export default function AiIntegrationFlowDiagramPage() {
  return (
    <PageContainer>
      <Header>
        <h1>Enterprise AI Integration Framework</h1>
        <p>
          This diagram illustrates our recommended approach for integrating AI into development workflows.
          Following a systematic process helps organizations maximize the benefits of AI while minimizing risks.
        </p>
      </Header>
      
      <Suspense fallback={
        <SpinnerLoader 
          type="circle"
          color="#2196f3"
          size={60}
          fullPage={false}
          text="Loading AI Integration Flow Diagram..."
        />
      }>
        <AiIntegrationFlowDiagram 
          title="Enterprise AI Integration Process"
          description="A structured approach to integrating AI technologies into development workflows"
          height="1000px"
          width="100%"
          theme="default"
          showZoomControls={false}
          debug={true}
        />
      </Suspense>
    </PageContainer>
  );
} 