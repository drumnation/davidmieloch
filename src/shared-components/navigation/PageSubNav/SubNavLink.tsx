import React, { useState, useEffect } from 'react';
import { NavLink, Box, Text, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { SubNavItem } from './PageSubNav.types';

// Define the IDs of Level 1 items under 'Key Practice Areas' that shouldn't be interactive links
const NON_INTERACTIVE_CATEGORY_IDS = [
    'component-architecture',
    'monorepo-architecture',
    'modern-tooling',
    'comprehensive-testing',
    'ci-cd-pipeline',
    'incremental-adoption'
];

interface SubNavLinkProps {
    item: SubNavItem;
    onClick?: (() => void) | undefined;
    isExpanded?: boolean | undefined; // Represents if the parent list has this item expanded
    isActive?: boolean;
    hasSubItems?: boolean; // Add the new prop
}

export const SubNavLink: React.FC<SubNavLinkProps> = ({ item, onClick, isExpanded, isActive, hasSubItems }) => {
    const theme = useMantineTheme();
    const isHeader = item.level === 0; // Keep this check if specific header styling is needed
    const [isLinkValid, setIsLinkValid] = useState(false);

    // Check if the target element exists
    useEffect(() => {
        const element = document.getElementById(item.id);
        setIsLinkValid(!!element);
    }, [item.id]);

    // Determine if this specific item should be non-interactive (e.g., category headers)
    const isNonInteractiveCategory =
        item.level === 1 && NON_INTERACTIVE_CATEGORY_IDS.includes(item.id);

    // Determine overall interactiveness for scrolling/linking
    const isInteractive = isLinkValid && !isNonInteractiveCategory;

    // Determine if the item itself is clickable (either interactive link OR hasSubItems to toggle)
    const isClickable = isInteractive || hasSubItems;

    // ** FIX: Use the onClick handler passed down directly from SubNavList **
    // This handler already manages toggling and link clicks (like closing mobile drawer)
    const effectiveClickHandler = onClick;

    // ** FIX: Correct logic for the right section icon **
    // Show chevron only if the item hasSubItems
    const rightSectionIcon = hasSubItems
        ? (isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />)
        : null;

    const textStyle = {
        fontWeight: isActive && isInteractive ? 600 : (isHeader ? 600 : 400),
        fontSize: isHeader ? theme.fontSizes.sm : theme.fontSizes.xs,
        color: isActive && isInteractive ? theme.primaryColor : 'inherit',
    };

    const navLinkStyle = {
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        borderLeft: !isHeader // Keep level-based indentation visual cue
            ? `3px solid ${isActive && isInteractive ? theme.primaryColor : theme.colors.gray[3]}`
            : 'none',
        paddingLeft: !isHeader // Keep level-based padding
            ? (item.level * 15) + (item.icon ? 0 : 22) // level > 0 will have padding
            : theme.spacing.xs, // level === 0 padding
        borderTop: isHeader ? `1px solid ${theme.colors.gray[2]}` : 'none',
    };

    return (
        <NavLink
            active={!!(isActive && isInteractive)} // Only mark as active if it's the interactive link itself
            href={isInteractive ? `#${item.id}` : undefined}
            label={<Text style={textStyle}>{item.title}</Text>}
            // Use the corrected handler
            onClick={effectiveClickHandler}
            // Prevent default link behavior ONLY if it's non-interactive AND doesn't have children
            // Let the effectiveClickHandler manage prevention otherwise
            // Mantine's NavLink doesn't have a simple preventDefault prop, handled in effectiveClickHandler
            variant="subtle"
            leftSection={item.icon ? <Box style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</Box> : undefined}
            // Use corrected icon
            rightSection={rightSectionIcon}
            style={navLinkStyle}
            color={theme.colors.gray[7]}
            py={isHeader ? `calc(${theme.spacing.sm} - 1px)` : theme.spacing.sm}
            data-link-interactive={isInteractive}
            styles={{
                root: {
                    // Make clickable if it's interactive OR has children
                    cursor: isClickable ? 'pointer' : 'default',
                    // Allow events if clickable
                    pointerEvents: isClickable ? 'auto' : 'none',
                    // Dim only if not clickable
                    opacity: isClickable ? 1 : 0.7,
                    // Improve hover feedback with a more noticeable transition
                    transition: 'all 0.2s ease',
                    '&:hover': isClickable ? {
                        backgroundColor: isActive ? 'rgba(66, 153, 225, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                        borderLeftColor: !isHeader && isInteractive ? theme.colors[theme.primaryColor][5] : undefined,
                    } : undefined,
                },
                label: {
                    // fontWeight handled in textStyle
                }
            }}
        />
    );
};

// Removed the local hasChildren helper as it's now calculated inline. 