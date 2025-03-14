import { FC } from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { MermaidDiagram } from '../../../../../shared-components/molecules/MermaidDiagram';
import { ContentBlock, DiagramContainer, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { AgentSystemSectionProps } from './AgentSystemSection.types';

export const AgentSystemSection: FC<AgentSystemSectionProps> = ({
  className,
  agentSystem,
  agentSystemDiagram
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{agentSystem.title}</SectionTitle>
      <Typography variant="body">
        {agentSystem.description}
      </Typography>

      <DiagramContainer>
        <MermaidDiagram definition={agentSystemDiagram} />
      </DiagramContainer>

      <SubsectionTitle>Real-World Example</SubsectionTitle>
      <Typography variant="body">
        When implementing a new feature, the system:
      </Typography>
      <ul>
        {agentSystem.realWorldExample.map((example, index) => (
          <li key={index}>
            <Typography variant="body">{example}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>Benefits</SubsectionTitle>
      <ul>
        {agentSystem.benefits.map((benefit, index) => (
          <li key={index}>
            <Typography variant="body">{benefit}</Typography>
          </li>
        ))}
      </ul>
    </ContentBlock>
  );
};

export default AgentSystemSection; 