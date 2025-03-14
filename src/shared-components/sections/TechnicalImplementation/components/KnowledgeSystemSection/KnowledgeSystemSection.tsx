import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { MermaidDiagram } from '../../../../../shared-components/molecules/MermaidDiagram';
import { ContentBlock, DiagramContainer, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { KnowledgeSystemSectionProps } from './KnowledgeSystemSection.types';

const Paragraph = styled(Typography)`
  margin-bottom: 1.5rem;
`;

const ConclusionParagraph = styled(Typography)`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

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
        <MermaidDiagram definition={knowledgeFlowDiagram} />
      </DiagramContainer>

      {knowledgeSystem.flowDescription && (
        <Paragraph variant="body">
          {knowledgeSystem.flowDescription}
        </Paragraph>
      )}

      <SubsectionTitle>Key Features</SubsectionTitle>
      <ul>
        {knowledgeSystem.features.map((feature, index) => (
          <li key={index}>
            <Typography variant="body">
              <strong>{feature.title}</strong> - {feature.description}
            </Typography>
          </li>
        ))}
      </ul>

      {knowledgeSystem.conclusion && (
        <ConclusionParagraph variant="body">
          {knowledgeSystem.conclusion}
        </ConclusionParagraph>
      )}
    </ContentBlock>
  );
};

export default KnowledgeSystemSection; 