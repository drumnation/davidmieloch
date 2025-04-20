import React, { useState } from 'react';
import { Box, Paper, Title, Affix, ActionIcon, Group, Tooltip, Text, Stack } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { SubNavItem } from './PageSubNav.types';
import { SubNavList } from './SubNavList';

interface SubNavDesktopProps {
    items: SubNavItem[];
    title?: string;
}

export const SubNavDesktop: React.FC<SubNavDesktopProps> = ({ items, title = 'On this page' }) => {
    const [isMinimized, setIsMinimized] = useState(false);

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
                            <SubNavList items={items} />
                        </Box>
                    </>
                )}
            </Paper>
        </Affix>
    );
}; 