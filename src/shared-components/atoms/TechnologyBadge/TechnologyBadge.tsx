import React from 'react';
import { Badge, BadgeProps } from '@mantine/core';
import { TechIcon } from '@shared-components/atoms/TechIcon';

interface TechnologyBadgeProps extends BadgeProps {
    technologyName: string;
}

// Wrap Mantine Badge for consistent technology display
export const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({
    technologyName,
    ...badgeProps
}) => {
    return (
        <Badge
            variant="light"
            size="sm"
            radius="xl"
            leftSection={<TechIcon name={technologyName} size={14} showTooltip={false} />}
            {...badgeProps}
        >
            {technologyName}
        </Badge>
    );
};

export default TechnologyBadge; 