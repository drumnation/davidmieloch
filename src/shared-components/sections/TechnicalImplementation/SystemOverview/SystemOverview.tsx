import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../shared-components/atoms/Typography';
import { SystemOverviewContainer, DiagramWrapper } from './SystemOverview.styles';
import { SystemOverviewProps } from './SystemOverview.types';
import { MermaidDiagram } from '../../../../shared-components/molecules/MermaidDiagram';
import { ContentBlock, SectionTitle, SubsectionTitle } from '../TechnicalImplementation.styles';

const IntroText = styled(Typography)`
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
`;

const ExampleSection = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.elevation2};
  margin-bottom: 1.5rem;
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 1rem;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 1rem 0;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
`;

const TaskItem = styled.li`
  padding: 0.5rem 0;
  font-family: monospace;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Caption = styled(Typography)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: 0.5rem;
`;

const SystemOverview: FC<SystemOverviewProps> = ({ 
  className, 
  diagram, 
  introduction,
  showZoomControls = true,
  accessibilityDescription,
  promptExample,
  taskExample,
  githubExample
}) => {
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

  const defaultAccessibilityDescription = 
    "Brain Garden System Architecture diagram showing the main system connected to various subsystems including Knowledge System, " +
    "Prompt System, Agent System, Integration System, and Documentation System. " +
    "Each subsystem has its own components that handle specific functionalities.";

  return (
    <SystemOverviewContainer className={className}>
      {introduction && (
        <IntroText variant="body">
          {introduction}
        </IntroText>
      )}
      <DiagramWrapper>
        <MermaidDiagram 
          definition={diagram || defaultDefinition}
          showZoomControls={showZoomControls}
          accessibilityDescription={accessibilityDescription || defaultAccessibilityDescription}
          responsive={true}
          height="auto"
        />
      </DiagramWrapper>

      {/* Examples Section */}
      <ExampleSection>
        {promptExample && (
          <ContentBlock>
            <SubsectionTitle>{promptExample.title}</SubsectionTitle>
            <Typography variant="body">{promptExample.description}</Typography>
            <Card>
              <CodeBlock>{promptExample.prompt}</CodeBlock>
            </Card>
          </ContentBlock>
        )}

        {taskExample && (
          <ContentBlock>
            <SubsectionTitle>{taskExample.title}</SubsectionTitle>
            <Typography variant="body">{taskExample.description}</Typography>
            <Card>
              <TaskList>
                {taskExample.tasks.map((task, index) => (
                  <TaskItem key={index}>{task}</TaskItem>
                ))}
              </TaskList>
            </Card>
          </ContentBlock>
        )}

        {githubExample && (
          <ContentBlock>
            <SubsectionTitle>{githubExample.title}</SubsectionTitle>
            <Typography variant="body">{githubExample.description}</Typography>
            <Card>
              <ImageContainer>
                <img 
                  src={githubExample.image} 
                  alt="GitHub Integration Example" 
                  onError={(e) => {
                    // Fallback for missing image
                    e.currentTarget.src = "https://via.placeholder.com/800x400?text=GitHub+Integration+Example";
                  }}
                />
              </ImageContainer>
              <Caption variant="caption">{githubExample.caption}</Caption>
            </Card>
          </ContentBlock>
        )}
      </ExampleSection>
    </SystemOverviewContainer>
  );
};

export default SystemOverview;