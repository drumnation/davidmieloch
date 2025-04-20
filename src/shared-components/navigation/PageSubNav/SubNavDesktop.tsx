import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Box, Paper, Title, Affix, ActionIcon, Group, Tooltip, Text, Stack } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { SubNavItem } from './PageSubNav.types';
import { SubNavList } from './SubNavList';
import { useScrollSpy } from './useScrollSpy';
import { getParentId } from './PageSubNav.utils';

interface SubNavDesktopProps {
    items: SubNavItem[];
    title?: string;
}

export const SubNavDesktop: React.FC<SubNavDesktopProps> = ({ items, title = 'On this page' }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [currentActiveId, setCurrentActiveId] = useState<string | null>(null);
    const previousActiveIdRef = useRef<string | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const sectionIds = useMemo(() => {
        const flattenItems = (nodes: SubNavItem[]): string[] => {
            let ids: string[] = [];
            for (const node of nodes) {
                if (node.id) ids.push(node.id);
                if (node.children) {
                    ids = ids.concat(flattenItems(node.children));
                }
            }
            return ids;
        };
        return flattenItems(items);
    }, [items]);
    // Explicitly type the hook's return value
    const {
        activeId: scrollSpyActiveId,
        attachScrollListener,
        detachScrollListener
    }: {
        activeId: string | null;
        attachScrollListener: (performInitialCheck?: boolean) => void;
        detachScrollListener: () => void;
    } = useScrollSpy({ ids: sectionIds, offset: 99 });

    useEffect(() => {
        if (!scrollTimeoutRef.current && scrollSpyActiveId) {
            setCurrentActiveId(scrollSpyActiveId);

            const newParentId = getParentId(scrollSpyActiveId, items);
            const oldParentId = getParentId(previousActiveIdRef.current, items);

            if (newParentId && newParentId !== oldParentId) {
                console.log(`[ScrollSpy Effect] Auto-expanding section: ${newParentId}`);
                setExpandedSections(new Set([newParentId]));
            }
            previousActiveIdRef.current = scrollSpyActiveId;

        } else {
            // console.log(`[ScrollSpy Effect] Skipping update due to active click timeout.`);
        }
    }, [scrollSpyActiveId, items]);

    useEffect(() => {
        const initialParentId = getParentId(currentActiveId, items);
        if (initialParentId) {
            setExpandedSections(new Set([initialParentId]));
        }
        previousActiveIdRef.current = currentActiveId;
    }, []);

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const handleHeaderClick = (itemId: string) => {
        // Find the index of the clicked item
        const itemIndex = items.findIndex(item => item.id === itemId);
        let firstSubItemId: string | null = null;
        if (itemIndex !== -1 && itemIndex + 1 < items.length && items[itemIndex + 1].level === 1) {
            firstSubItemId = items[itemIndex + 1].id;
        }

        // Toggle expansion state
        setExpandedSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                // Optional: Keep only one section open
                newSet.clear(); // Clear others when expanding a new one via header click
                newSet.add(itemId);
            }
            return newSet;
        });

        // If we found a sub-item, activate it (scrolls and sets active state)
        if (firstSubItemId) {
            console.log(`[Desktop HeaderClick] Activating first sub-item: ${firstSubItemId}`);
            handleLinkActivation(firstSubItemId);
        }
    };

    const handleLinkActivation = (id: string) => {
        console.log(`[Click Handler] Activating link: ${id}`);
        if (scrollTimeoutRef.current) {
            console.log(`[Click Handler] Clearing previous timeout.`);
            clearTimeout(scrollTimeoutRef.current);
        }

        console.log(`[Click Handler] Detaching scroll listener.`);
        detachScrollListener();

        console.log(`[Click Handler] Setting currentActiveId = ${id}`);
        setCurrentActiveId(id);
        const clickedParentId = getParentId(id, items);
        if (clickedParentId) {
            console.log(`[Click Handler] Expanding parent on click: ${clickedParentId}`);
            setExpandedSections(new Set([clickedParentId]));
        }
        previousActiveIdRef.current = id;

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Set timeout to re-attach the listener after scroll likely finishes
        console.log(`[Click Handler] Setting timeout to force active ID and re-attach listener.`);
        scrollTimeoutRef.current = setTimeout(() => {
            console.log(`[Timeout] Forcing active ID back to ${id} after scroll.`);
            setCurrentActiveId(id); // Force the clicked ID again after scroll
            console.log(`[Timeout] Re-attaching scroll listener without initial check.`);
            attachScrollListener(false); // Re-attach WITHOUT immediate check
            scrollTimeoutRef.current = null; // Clear the ref
        }, 500); // Adjust timeout duration if needed
    };

    const toggleMinimize = () => setIsMinimized((prev) => !prev);

    return (
        <Affix position={{ top: 80, left: 20 }} zIndex={50}>
            <Paper
                withBorder
                shadow="xs"
                p={isMinimized ? "xs" : "md"}
                style={{
                    maxHeight: 'calc(100vh - 120px)',
                    overflow: 'hidden',
                    width: isMinimized ? 50 : 250,
                    transition: 'width 0.2s ease-in-out, padding 0.2s ease-in-out',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: isMinimized ? 'var(--mantine-color-gray-0)' : 'white',
                }}
            >
                {isMinimized ? (
                    <Stack align="center" gap="xs" style={{ height: '100%' }}>
                        <Tooltip label="Expand Navigation" position="right">
                            <ActionIcon onClick={toggleMinimize} variant="light" size="sm">
                                <IconChevronRight size={16} />
                            </ActionIcon>
                        </Tooltip>
                        <Text
                            size="xs"
                            fw={600}
                            c="dimmed"
                            style={{
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.1,
                            }}
                        >
                            {title}
                        </Text>
                    </Stack>
                ) : (
                    <>
                        <Group justify="space-between" align="center" wrap="nowrap" mb="sm">
                            <Title order={5}>{title}</Title>
                            <Tooltip label="Collapse Navigation" position="right">
                                <ActionIcon onClick={toggleMinimize} variant="light" size="sm">
                                    <IconChevronLeft size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                        <Box style={{ flexGrow: 1, overflowY: 'auto' }}>
                            <SubNavList
                                items={items}
                                activeId={currentActiveId}
                                expandedSections={expandedSections}
                                onHeaderClick={handleHeaderClick}
                                onLinkActivate={handleLinkActivation}
                            />
                        </Box>
                    </>
                )}
            </Paper>
        </Affix>
    );
}; 