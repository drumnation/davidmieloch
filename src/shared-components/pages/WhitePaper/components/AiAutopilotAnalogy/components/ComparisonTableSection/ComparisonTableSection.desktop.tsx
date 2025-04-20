import React from 'react';
import { ComparisonTable } from '@shared-components/molecules/ComparisonTable';
import { SectionSubtitle } from '../ui-components';
import { comparisonSectionStyle, sectionContainerWithoutMarginStyle } from '../../AiAutopilotAnalogy.styles';

// Define props here
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

// Ensure ONLY the desktop component is here
export const ComparisonTableSectionDesktop: React.FC<ComparisonTableSectionProps> = ({
    leftTitle,
    rightTitle,
    items,
    className
}) => {
    return (
        <div className={className} style={comparisonSectionStyle}>
            <div style={sectionContainerWithoutMarginStyle}>
                {/* Desktop uses the standard subtitle */}
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