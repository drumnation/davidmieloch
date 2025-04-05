import React from 'react';
import { ComparisonTable } from '../../../../molecules/ComparisonTable';
import { SectionSubtitle } from '../ui-components';
import { comparisonSectionStyle, sectionContainerWithoutMarginStyle } from '../../AiAutopilotAnalogy.styles';

interface ComparisonTableSectionProps {
  leftTitle: string;
  rightTitle: string;
  items: Array<{
    category: string;
    leftContent: string;
    rightContent: string;
  }>;
  className?: string;
}

export const ComparisonTableSection: React.FC<ComparisonTableSectionProps> = ({
  leftTitle,
  rightTitle,
  items,
  className
}) => {
  return (
    <div className={className} style={comparisonSectionStyle}>
      <div style={sectionContainerWithoutMarginStyle}>
        <SectionSubtitle title="Human Pilot vs. AI Autopilot" />
        <ComparisonTable 
          leftTitle={leftTitle}
          rightTitle={rightTitle}
          items={items}
          variant="accent"
        />
      </div>
    </div>
  );
}; 