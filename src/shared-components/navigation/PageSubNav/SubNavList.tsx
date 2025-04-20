import React, { useState } from 'react';
import { Box } from '@mantine/core';
import { SubNavItem } from './PageSubNav.types';
import { SubNavLink } from './SubNavLink';

interface SubNavListProps {
    items: SubNavItem[];
    activeId?: string | null; // Add activeId for scroll spy
    // Props specific to mobile accordion view
    expandedSections?: Set<string>;
    onHeaderClick?: (itemId: string) => void;
    // General click handler (e.g., for closing mobile drawer)
    onLinkClick?: () => void;
    // New handler for direct link activation (click)
    onLinkActivate?: (id: string) => void;
}

// Helper function to determine if an item or its children are active
const isItemActive = (item: SubNavItem, activeId: string | null | undefined): boolean => {
    if (!activeId) return false;
    // Direct match
    if (item.id === activeId) {
        return true;
    }
    // Check if a child is active (recursively)
    if (item.children) {
        const checkChildren = (children: SubNavItem[]): boolean => {
            for (const child of children) {
                if (child.id === activeId) return true;
                if (child.children && checkChildren(child.children)) return true;
            }
            return false;
        };
        return checkChildren(item.children);
    }
    return false;
};


export const SubNavList: React.FC<SubNavListProps> = ({
    items,
    activeId, // Destructure activeId (can be undefined)
    expandedSections,
    onHeaderClick,
    onLinkClick,
    onLinkActivate, // Destructure new prop
}) => {
    // State for managing expanded sections *specifically for the desktop flat list*
    const [desktopExpanded, setDesktopExpanded] = useState<Set<string>>(new Set());

    const toggleDesktopExpand = (id: string) => {
        setDesktopExpanded(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    // --- Desktop case (modified to handle level-based flat list) ---
    if (!expandedSections || !onHeaderClick) {
        const renderedItems: React.ReactNode[] = [];
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const isActive = isItemActive(item, activeId);

            if (item.level === 0) {
                // Find subsequent level 1 items for this level 0 item
                const subItems: SubNavItem[] = [];
                let j = i + 1;
                while (j < items.length && items[j].level === 1) {
                    subItems.push(items[j]);
                    j++;
                }

                const hasSubItems = subItems.length > 0;
                const isExpanded = desktopExpanded.has(item.id);

                renderedItems.push(
                    <SubNavLink
                        key={item.id}
                        item={item}
                        // Use toggle handler for level 0 with sub-items, otherwise activation handler
                        onClick={hasSubItems ? () => {
                            toggleDesktopExpand(item.id); // Expand/collapse
                            // Also activate the first sub-item
                            if (subItems.length > 0) {
                                console.log(`[Desktop Toggle] Activating first sub-item: ${subItems[0].id}`);
                                onLinkActivate?.(subItems[0].id);
                            }
                        } : () => onLinkActivate?.(item.id)}
                        isActive={isActive}
                        isExpanded={hasSubItems ? isExpanded : undefined}
                        hasSubItems={hasSubItems} // Pass the calculated flag
                    />
                );

                // Render sub-items if the section is expanded
                if (hasSubItems && isExpanded) {
                    subItems.forEach(subItem => {
                        const isSubActive = isItemActive(subItem, activeId);
                        renderedItems.push(
                            // Use Box for potential indentation styling if needed later
                            <Box key={subItem.id} /* style={{ paddingLeft: '1rem' }} */ >
                                <SubNavLink
                                    item={subItem}
                                    onClick={() => onLinkActivate?.(subItem.id)} // Use activation handler for sub-items
                                    isActive={isSubActive}
                                />
                            </Box>
                        );
                    });
                }
            } else {
                // If somehow a level 1 item appears before a level 0, ignore it in desktop flat mode
                // This shouldn't happen with the expected data structure but handles edge cases.
            }
        }

        return <Box>{renderedItems}</Box>;
    }

    // --- Mobile Accordion Logic ---
    const renderedItems = [];
    let currentParentId: string | null = null;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // Calculate active state for mobile item
        const isActive = isItemActive(item, activeId);

        if (item.level === 0) {
            currentParentId = item.id;
            // Check if this header has children by looking ahead
            const hasChildren = !!(item.children && item.children.length > 0);
            const isExpanded = hasChildren ? expandedSections.has(item.id) : undefined;

            // ** FIX: Calculate if level 0 has children for mobile mode too **
            let mobileHasSubItems = false;
            if (item.level === 0) {
                const j = i + 1;
                while (j < items.length && items[j].level === 1) {
                    mobileHasSubItems = true;
                    break; // Found at least one, no need to check further
                }
            }

            renderedItems.push(
                <SubNavLink
                    key={item.id}
                    item={item}
                    isExpanded={mobileHasSubItems ? isExpanded : undefined} // Correct expansion state usage
                    isActive={isActive} // Pass active state
                    hasSubItems={mobileHasSubItems} // Pass the flag for mobile
                    // Use onHeaderClick for headers with children, otherwise use activation handler
                    onClick={mobileHasSubItems ? () => onHeaderClick(item.id) : () => onLinkActivate?.(item.id)}
                />
            );
        } else if (currentParentId && expandedSections.has(currentParentId)) {
            // Render nested item (level 1+) only if its parent (level 0) is expanded
            // SubNavLink's internal padding logic handles the indentation based on item.level
            renderedItems.push(
                <SubNavLink
                    key={item.id}
                    item={item}
                    onClick={() => onLinkActivate?.(item.id)} // Nested items use activation handler
                    isActive={isActive} // Pass active state
                // isExpanded is not relevant for nested items themselves
                />
            );
        }
    }

    return <Box>{renderedItems}</Box>;
}; 