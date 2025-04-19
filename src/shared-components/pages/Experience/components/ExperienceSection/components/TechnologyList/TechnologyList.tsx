import React from 'react';
import {
    TechnologiesList as StyledTechnologiesList,
    TechnologyItem,
} from './TechnologyList.styles'; // Import local styles
import { TechIcon } from '@shared-components/atoms/TechIcon/index'; // Adjust path if needed based on final location
import { TechnologyListProps } from './TechnologyList.types'; // Import types

export const TechnologyList: React.FC<TechnologyListProps> = ({
    technologies,
}) => {
    if (!technologies || technologies.length === 0) {
        return null;
    }

    return (
        <StyledTechnologiesList className="technologies-list">
            {technologies.map((tech: string) => (
                <TechnologyItem key={tech}>
                    <TechIcon
                        name={tech}
                        size={20}
                        showLabel={true}
                        labelPosition="right"
                        showTooltip={true}
                    />
                </TechnologyItem>
            ))}
        </StyledTechnologiesList>
    );
}; 