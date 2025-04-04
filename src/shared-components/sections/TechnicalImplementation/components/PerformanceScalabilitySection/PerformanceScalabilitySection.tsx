import React from 'react';
import { FC } from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { PerformanceScalabilityDiagramClient } from '../../../../../components/diagrams/PerformanceScalabilityDiagram';
import { DiagramClientWrapper } from '../../../../../components/diagrams/_wrappers/DiagramClientWrapper';
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
        <PerformanceScalabilityDiagramClient
          width="100%"
          height="500px"
          showZoomControls={false}
          backgroundColor="rgba(74, 158, 255, 0.05)"
          accessibilityDescription="Performance and Scalability Diagram showing strategies for Distribution, Caching, and Optimization"
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