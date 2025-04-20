import React, { useState } from 'react';
import {
    Drawer, Box, Title, ScrollArea, Affix, ActionIcon, Tooltip,
    useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconList } from '@tabler/icons-react';
import { SubNavItem } from './PageSubNav.types';
import { SubNavList } from './SubNavList';

interface SubNavMobileProps {
    items: SubNavItem[];
    title?: string;
}

export const SubNavMobile: React.FC<SubNavMobileProps> = ({ items, title = 'Page Navigation' }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const theme = useMantineTheme();

    const handleHeaderClick = (itemId: string) => {
        setExpandedSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };

    const handleLinkClick = () => {
        close();
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
                title={<Title order={4} c={theme.colors.gray[8]}>{title}</Title>}
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
                        expandedSections={expandedSections}
                        onHeaderClick={handleHeaderClick}
                        onLinkClick={handleLinkClick}
                    />
                </ScrollArea>
            </Drawer>
        </>
    );
}; 