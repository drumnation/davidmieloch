import { FC } from 'react';
import { IntegrationSystemDiagram } from '../../../../../components/Diagrams/IntegrationSystemDiagram/IntegrationSystemDiagram';
import { DiagramClientWrapper } from '../../../../../components/Diagrams/_wrappers/DiagramClientWrapper';
import { Typography } from '../../../../../shared-components/atoms/Typography';
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
        <IntegrationSystemDiagram
          title=""
          theme="default"
          width="100%"
          height="400px"
          showZoomControls={false}
          accessibilityDescription="Integration System Diagram showing the workflow between development, agent, and integration components"
        />
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