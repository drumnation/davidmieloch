import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../shared-components/atoms/Typography';
import { SystemOverviewContainer, DiagramWrapper } from './SystemOverview.styles';
import { SystemOverviewProps } from './SystemOverview.types';
import { MermaidDiagram } from '../../../../shared-components/molecules/MermaidDiagram';

const IntroText = styled(Typography)`
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
`;

const SystemOverview: FC<SystemOverviewProps> = ({ className, diagram, introduction }) => {
  const defaultDefinition = `
    graph TD
      BG[Brain Garden System] --> PB[Project-Specific Brains]
      BG --> DCM[Dynamic Context Management]
      BG --> IDSM[Intelligent Directory Structure]
      BG --> MAC[Multi-Agent Collaboration]
      BG --> ADP[Atomic Design for Prompts]
      BG --> TM[Task Management]
      BG --> AVT[Automated Validation & Testing]
      BG --> CLI[CLI & Standards System]
      
      classDef system fill:#f96,stroke:#333
      classDef component fill:#58f,stroke:#333
      
      class BG system
      class PB,DCM,IDSM,MAC,ADP,TM,AVT,CLI component
  `;

  return (
    <SystemOverviewContainer className={className}>
      {introduction && (
        <IntroText variant="body">
          {introduction}
        </IntroText>
      )}
      <DiagramWrapper>
        <MermaidDiagram definition={diagram || defaultDefinition} />
      </DiagramWrapper>
    </SystemOverviewContainer>
  );
};

export default SystemOverview;