import { FC } from 'react';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { MermaidDiagram } from '../../../../../shared-components/molecules/MermaidDiagram';
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
        <MermaidDiagram definition={performanceScalabilityDiagram} />
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