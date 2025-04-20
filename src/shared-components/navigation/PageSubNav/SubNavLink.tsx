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
    isExpanded?: boolean | undefined;
}

export const SubNavLink: React.FC<SubNavLinkProps> = ({ item, onClick, isExpanded }) => {
    const theme = useMantineTheme();
    const isHeader = item.level === 0;
    const [isLinkValid, setIsLinkValid] = useState(false);

    // Check if the target element exists
    useEffect(() => {
        const element = document.getElementById(item.id);
        setIsLinkValid(!!element);
    }, [item.id]);

    // Determine if this specific item should be non-interactive
    const isNonInteractiveCategory =
        item.level === 1 && NON_INTERACTIVE_CATEGORY_IDS.includes(item.id);

    // Determine overall interactiveness
    const isInteractive = isLinkValid && !isNonInteractiveCategory;

    const handleScrollClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        // Only scroll if the link is interactive
        if (isInteractive) {
            const element = document.getElementById(item.id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        // Always call original onClick (e.g., for closing drawer) if it exists
        // But only if the item isn't specifically a non-interactive category header
        if (onClick && !isNonInteractiveCategory) {
            onClick();
        }
    };

    // Determine the actual click handler:
    // - If it's a header with children, use the toggle handler (passed via onClick).
    // - If it's interactive, use the scroll handler.
    // - Otherwise (non-interactive), use null or prevent default.
    const effectiveClickHandler = (isHeader && isExpanded !== undefined)
        ? onClick
        : (isInteractive ? handleScrollClick : (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault());

    // Determine the right section icon:
    // Show only if it's a header AND isExpanded is defined (meaning it has children).
    const rightSectionIcon = (isHeader && isExpanded !== undefined)
        ? (isExpanded ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />)
        : null;

    const textStyle = {
        fontWeight: isHeader ? 600 : 400,
        fontSize: isHeader ? theme.fontSizes.sm : theme.fontSizes.xs,
    };

    const navLinkStyle = {
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        borderLeft: !isHeader ? `3px solid ${theme.colors.gray[3]}` : 'none',
        paddingLeft: !isHeader
            ? (item.level * 15) + (item.icon ? 0 : 22)
            : theme.spacing.xs,
        borderTop: isHeader ? `1px solid ${theme.colors.gray[2]}` : 'none',
    };

    return (
        <NavLink
            // Conditionally set href only if link is interactive
            href={isInteractive ? `#${item.id}` : undefined}
            label={<Text style={textStyle}>{item.title}</Text>}
            onClick={effectiveClickHandler}
            variant="subtle"
            leftSection={item.icon ? <Box style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</Box> : undefined}
            rightSection={rightSectionIcon}
            style={navLinkStyle}
            color={theme.colors.gray[7]}
            py={isHeader ? `calc(${theme.spacing.sm} - 1px)` : theme.spacing.sm}
            data-link-interactive={isInteractive} // Custom data attribute
            styles={{
                root: {
                    cursor: isInteractive ? 'pointer' : 'default',
                    // Keep pointer events enabled for headers with children, disable for others if non-interactive
                    pointerEvents: (isHeader && isExpanded !== undefined) || isInteractive ? 'auto' : 'none',
                    // Optionally dim non-interactive items slightly
                    opacity: isInteractive ? 1 : 0.7,
                }
            }}
        />
    );
}; 