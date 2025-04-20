import React from 'react';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SubNavItem } from './PageSubNav.types';
import { SubNavDesktop } from './SubNavDesktop';
import { SubNavMobile } from './SubNavMobile';

interface SubNavControllerProps {
    items: SubNavItem[];
    title?: string;
}

export const SubNavController: React.FC<SubNavControllerProps> = ({ items, title }) => {
    const theme = useMantineTheme();
    // Use Mantine's theme breakpoints for reliable switching
    // Adjust 'md' (992px by default) if needed
    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

    if (!items || items.length === 0) {
        return null; // Don't render anything if there are no items
    }

    return isDesktop ? (
        <SubNavDesktop items={items} title={title} />
    ) : (
        <SubNavMobile items={items} title={title} />
    );
}; 