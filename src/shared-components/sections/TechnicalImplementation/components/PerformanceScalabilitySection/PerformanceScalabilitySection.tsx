import { FC } from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { PerformanceScalabilityDiagram } from '../../../../../shared-components/diagrams/PerformanceScalabilityDiagram/PerformanceScalabilityDiagram';
import { ContentBlock, DiagramContainer, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { PerformanceScalabilitySectionProps } from './PerformanceScalabilitySection.types';

export const PerformanceScalabilitySection: FC<PerformanceScalabilitySectionProps> = ({
  className,
  performanceScalability,
  performanceScalabilityDiagram
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{performanceScalability.title}</SectionTitle>
      <Typography variant="body">
        {performanceScalability.description}
      </Typography>

      <DiagramContainer>
        <PerformanceScalabilityDiagram
          title=""
          theme="default"
          width="100%"
          height="400px"
          showZoomControls={false}
          accessibilityDescription="Performance Scalability Diagram showing how the system scales with increasing demands"
        />
      </DiagramContainer>

      <SubsectionTitle>Enterprise-Scale Benefits</SubsectionTitle>
      <ul>
        {performanceScalability.benefits.map((benefit, index) => (
          <li key={index}>
            <Typography variant="body">{benefit}</Typography>
          </li>
        ))}
      </ul>
    </ContentBlock>
  );
};

export default PerformanceScalabilitySection; 