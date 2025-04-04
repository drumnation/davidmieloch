import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { KnowledgeSystemDiagram } from '../../../../../components/diagrams/KnowledgeSystemDiagram/KnowledgeSystemDiagram';
import { DiagramClientWrapper } from '../../../../../components/diagrams/_wrappers/DiagramClientWrapper';
import { ContentBlock, DiagramContainer, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { KnowledgeSystemSectionProps } from './KnowledgeSystemSection.types';

const Paragraph = styled(Typography)`
  margin-bottom: 1.5rem;
`;

const ConclusionParagraph = styled(Typography)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.elevation2};
  }
`;

const FeatureTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.25rem;
`;

const FeatureDescription = styled(Typography)`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1.25rem;
`;

const ProblemsList = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 1.25rem;
  margin-top: auto;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ProblemTitle = styled(Typography)`
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: ${({ theme }) => theme.colors.primary};
    margin-right: 8px;
    border-radius: 2px;
  }
`;

const ProblemItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CheckMark = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: #4caf50;
    border-radius: 50%;
  }
  
  &:after {
    content: '';
    position: absolute;
    left: 6px;
    top: 3px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const ProblemText = styled(Typography)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 2rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

// Helper function to extract problem statements from feature titles
const getProblemsForFeature = (title: string): string[] => {
  if (title.includes("Dynamic Context Management")) {
    return [
      "Minimizes hallucination problems",
      "Enhances agent knowledge situationally",
      "Keeps agents focused on important tasks",
      "Prevents inappropriate actions"
    ];
  } else if (title.includes("Intelligent Directory Structure")) {
    return [
      "Prevents file duplication in wrong locations",
      "Stops incorrect conclusions about project structure",
      "Prevents incorrect configuration file edits",
      "Avoids accidental file deletions"
    ];
  } else if (title.includes("Shared Knowledge Repository")) {
    return [
      "Aligns agents with best practices",
      "Breaks agents out of problem-solving loops",
      "Provides divergent information when stuck",
      "Matches agents with their specialty"
    ];
  }
  return [];
};

export const KnowledgeSystemSection: FC<KnowledgeSystemSectionProps> = ({
  className,
  knowledgeSystem,
  knowledgeFlowDiagram
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{knowledgeSystem.title}</SectionTitle>
      <Paragraph variant="body">
        {knowledgeSystem.description}
      </Paragraph>

      {knowledgeSystem.introduction && (
        <Paragraph variant="body">
          {knowledgeSystem.introduction}
        </Paragraph>
      )}

      <DiagramContainer>
        <KnowledgeSystemDiagram
          title="" 
          theme="default"
          width="100%"
          height="400px"
          showZoomControls={false}
          accessibilityDescription="Knowledge System Diagram showing the flow from Developer Action to Team Benefits through Knowledge Capture, Analysis, and Shared Understanding"
        />
      </DiagramContainer>

      {knowledgeSystem.flowDescription && (
        <Paragraph variant="body">
          {knowledgeSystem.flowDescription}
        </Paragraph>
      )}

      <SubsectionTitle>Key Features</SubsectionTitle>
      <FeaturesGrid>
        {knowledgeSystem.features.map((feature, index) => {
          const problems = getProblemsForFeature(feature.title);
          
          return (
            <FeatureCard key={index}>
              <FeatureTitle variant="h3">
                {feature.title}
              </FeatureTitle>
              <FeatureDescription variant="body">
                {feature.description}
              </FeatureDescription>
              
              <ProblemsList>
                <ProblemTitle variant="body">Problems Solved</ProblemTitle>
                {problems.map((problem, i) => (
                  <ProblemItem key={i}>
                    <CheckMark />
                    <ProblemText variant="body">{problem}</ProblemText>
                  </ProblemItem>
                ))}
              </ProblemsList>
            </FeatureCard>
          );
        })}
      </FeaturesGrid>

      {knowledgeSystem.conclusion && (
        <ConclusionParagraph variant="body">
          {knowledgeSystem.conclusion}
        </ConclusionParagraph>
      )}
    </ContentBlock>
  );
};

export default KnowledgeSystemSection; 