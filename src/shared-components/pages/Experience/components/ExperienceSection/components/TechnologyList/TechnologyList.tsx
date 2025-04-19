import React from 'react';
import {
    TechnologiesList as StyledTechnologiesList,
    TechnologyItem,
    TechListHeader
} from './TechnologyList.styles'; // Import local styles
import { TechIcon } from '@shared-components/atoms/TechIcon/index'; // Adjust path if needed based on final location
import { TechnologyListProps } from './TechnologyList.types'; // Import types

export const TechnologyList: React.FC<TechnologyListProps> = ({
    technologies,
    showLabels = true,
}) => {
    if (!technologies || technologies.length === 0) {
        return null;
    }

    return (
        <>
            {!showLabels && (
                <TechListHeader>
                    Tech Stack ({technologies.length})
                </TechListHeader>
            )}
            <StyledTechnologiesList className="technologies-list">
                {technologies.map((tech: string) => (
                    <TechnologyItem key={tech}>
                        <TechIcon
                            name={tech}
                            size={20}
                            showLabel={showLabels}
                            labelPosition="right"
                            showTooltip={true}
                        />
                    </TechnologyItem>
                ))}
            </StyledTechnologiesList>
        </>
    );
}; 