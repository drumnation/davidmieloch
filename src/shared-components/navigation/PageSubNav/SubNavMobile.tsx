import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    Drawer, Box, Title, ScrollArea, Affix, ActionIcon, Tooltip,
    useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconList } from '@tabler/icons-react';
import { SubNavItem } from './PageSubNav.types';
import { SubNavList } from './SubNavList';
import { useScrollSpy } from './useScrollSpy';
import { getParentId } from './PageSubNav.utils';

interface SubNavMobileProps {
    items: SubNavItem[];
    title?: string;
}

export const SubNavMobile: React.FC<SubNavMobileProps> = ({ items, title = 'Page Navigation' }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [currentActiveId, setCurrentActiveId] = useState<string | null>(null);
    const previousActiveIdRef = useRef<string | null>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const theme = useMantineTheme();

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
                setExpandedSections(new Set([newParentId]));
            }
            previousActiveIdRef.current = scrollSpyActiveId;
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
        setExpandedSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.clear();
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const handleLinkActivation = (id: string) => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        detachScrollListener();

        setCurrentActiveId(id);
        const clickedParentId = getParentId(id, items);
        if (clickedParentId) {
            setExpandedSections(new Set([clickedParentId]));
        }
        previousActiveIdRef.current = id;

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        close();

        scrollTimeoutRef.current = setTimeout(() => {
            setCurrentActiveId(id);
            attachScrollListener(false);
            scrollTimeoutRef.current = null;
        }, 500);
    };

    return (
        <>
            <Affix position={{ bottom: 60, right: 20 }} zIndex={1000}>
                <Tooltip label={title} position="left">
                    <ActionIcon
                        variant="filled"
                        color="blue"
                        size="xl"
                        radius="xl"
                        onClick={open}
                        aria-label={title}
                    >
                        <IconList size={24} />
                    </ActionIcon>
                </Tooltip>
            </Affix>
            <Drawer
                opened={opened}
                onClose={close}
                title={title}
                padding={0}
                size="md"
                position="left"
                zIndex={1001}
                styles={{
                    header: {
                        padding: theme.spacing.md,
                        paddingBottom: theme.spacing.sm,
                        marginBottom: 0,
                        borderBottom: `1px solid ${theme.colors.gray[2]}`,
                    },
                    body: {
                        height: 'calc(100% - 60px)',
                        padding: 0,
                    }
                }}
                closeButtonProps={{
                    color: 'dark',
                    size: 'lg',
                    "aria-label": "Close navigation"
                }}
            >
                <ScrollArea style={{ height: '100%' }} p="md">
                    <SubNavList
                        items={items}
                        activeId={currentActiveId}
                        expandedSections={expandedSections}
                        onHeaderClick={handleHeaderClick}
                        onLinkActivate={handleLinkActivation}
                    />
                </ScrollArea>
            </Drawer>
        </>
    );
}; 