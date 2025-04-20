import React from 'react';
import { Box } from '@mantine/core';
import { SubNavItem } from './PageSubNav.types';
import { SubNavLink } from './SubNavLink';

interface SubNavListProps {
    items: SubNavItem[];
    expandedSections?: Set<string>; // Make optional for desktop
    onHeaderClick?: (itemId: string) => void; // Make optional for desktop
    onLinkClick?: () => void; // Handler for Level 1+ clicks (closes drawer)
}

export const SubNavList: React.FC<SubNavListProps> = ({
    items,
    expandedSections,
    onHeaderClick,
    onLinkClick,
}) => {
    // Desktop case (no accordion)
    if (!expandedSections || !onHeaderClick) {
        return (
            <Box>
                {items.map((item) => (
                    <SubNavLink key={item.id} item={item} onClick={onLinkClick} />
                ))}
            </Box>
        );
    }

    // Mobile Accordion Logic
    const renderedItems = [];
    let currentParentId: string | null = null;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.level === 0) {
            currentParentId = item.id;
            // Check if this header has children
            const hasChildren = items[i + 1] && items[i + 1].level > 0;

            renderedItems.push(
                <SubNavLink
                    key={item.id}
                    item={item}
                    // Pass isExpanded only if it has children, otherwise pass undefined
                    isExpanded={hasChildren ? expandedSections.has(item.id) : undefined}
                    // Use onHeaderClick only if it has children, otherwise use onLinkClick (scroll & close)
                    onClick={hasChildren ? () => onHeaderClick(item.id) : onLinkClick}
                />
            );
        } else if (currentParentId && expandedSections.has(currentParentId)) {
            // Render nested item if parent is expanded
            renderedItems.push(
                <SubNavLink key={item.id} item={item} onClick={onLinkClick} />
            );
        }
    }

    return <Box>{renderedItems}</Box>;
}; 