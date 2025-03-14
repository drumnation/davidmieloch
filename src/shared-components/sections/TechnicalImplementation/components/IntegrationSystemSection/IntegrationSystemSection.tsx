import { FC } from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { MermaidDiagram } from '../../../../../shared-components/molecules/MermaidDiagram';
import { ContentBlock, DiagramContainer, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { IntegrationSystemSectionProps } from './IntegrationSystemSection.types';

export const IntegrationSystemSection: FC<IntegrationSystemSectionProps> = ({
  className,
  integrationSystem,
  integrationSystemDiagram
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{integrationSystem.title}</SectionTitle>
      <Typography variant="body">
        {integrationSystem.description}
      </Typography>

      <DiagramContainer>
        <MermaidDiagram definition={integrationSystemDiagram} />
      </DiagramContainer>

      <SubsectionTitle>Real-World Integration Example</SubsectionTitle>
      <Typography variant="body">
        Here&apos;s how the system works in practice:
      </Typography>

      <SubsectionTitle>Developer Starts Work</SubsectionTitle>
      <ul>
        {integrationSystem.developerStart.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>During Development</SubsectionTitle>
      <ul>
        {integrationSystem.duringDevelopment.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>Code Integration</SubsectionTitle>
      <ul>
        {integrationSystem.codeIntegration.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>
    </ContentBlock>
  );
};

export default IntegrationSystemSection; 