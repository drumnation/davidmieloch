import { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Typography } from '../../../../shared-components/atoms/Typography';
import { SystemOverviewContainer, DiagramWrapper } from './SystemOverview.styles';
import { SystemOverviewProps } from './SystemOverview.types';
import { SystemOverviewDiagram } from '../../../../shared-components/diagrams/SystemOverviewDiagram/SystemOverviewDiagram';
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
        <SystemOverviewDiagram
          title=""
          theme="default"
          width="100%"
          height="400px"
          showZoomControls={showZoomControls}
          accessibilityDescription={accessibilityDescription || defaultAccessibilityDescription}
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
                <Image 
                  src={githubExample.image} 
                  alt="GitHub Integration Example" 
                  width={800}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                  onError={(e) => {
                    // Fallback for missing image
                    // @ts-expect-error - Next.js Image doesn't have the same onError type but this works
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