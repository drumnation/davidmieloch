import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ComparisonTableProps } from './ComparisonTable.types';
import { Stack, Card, Text, Title, Group, Divider, Box, useMantineTheme } from '@mantine/core';
import { IconUser, IconCpu } from '@tabler/icons-react';
import * as S from './ComparisonTable.styles';
import { sectionContainerWithoutMarginStyle } from '../../pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.styles'; // Import for padding values
import { usePathname } from 'next/navigation';

// Mobile version with stacked layout using Mantine components
export const ComparisonTableMobile: React.FC<ComparisonTableProps> = ({
    leftTitle,
    rightTitle,
    items,
    variant = 'default', // Variant might influence mobile styling too
    className,
}) => {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    // Only use accent/dark variant on homepage
    const effectiveVariant = isHomePage ? variant : 'default';

    const theme = useMantineTheme();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-50px",
        threshold: 0.1
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (inView) {
            setIsVisible(true);
        }
    }, [inView]);

    // Get color based on the variant and whether we're in a light context
    const headerBgColor = effectiveVariant === 'accent'
        ? theme.colors.blue[7]
        : theme.colors.gray[1];

    const headerTextColor = effectiveVariant === 'accent'
        ? theme.white
        : theme.black;

    const cardBgColor = theme.white;
    const cardTextColor = theme.black;

    return (
        <Box ref={ref} className={className}>
            <Stack gap="lg">
                {/* Header Card */}
                <Card
                    p="md"
                    radius="md"
                    style={{
                        backgroundColor: headerBgColor,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.3s ease, transform 0.5s ease',
                    }}
                >
                    <Stack align="center" gap="xs">
                        <Group gap="xs">
                            <IconUser size={20} color={headerTextColor} />
                            <Title order={5} style={{ color: headerTextColor }}>{leftTitle}</Title>
                        </Group>
                        <Text size="sm" style={{ color: headerTextColor }}>vs.</Text>
                        <Group gap="xs">
                            <IconCpu size={20} color={headerTextColor} />
                            <Title order={5} style={{ color: headerTextColor }}>{rightTitle}</Title>
                        </Group>
                    </Stack>
                </Card>

                {/* Comparison Cards */}
                {items.map((item, index) => (
                    <Card
                        key={index}
                        p="lg"
                        radius="md"
                        style={{
                            backgroundColor: cardBgColor,
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `opacity 0.3s ease, transform 0.5s ease ${index * 0.1}s`,
                        }}
                    >
                        <Title order={6} mb="xs">{item.category}</Title>
                        <Divider mb="md" />

                        <Stack gap="md">
                            <Box>
                                <Group gap="xs" mb="xs">
                                    <IconUser size={16} color={cardTextColor} />
                                    <Text size="sm" fw={600}>{leftTitle}</Text>
                                </Group>
                                <Text size="sm">{item.leftContent}</Text>
                            </Box>

                            <Box>
                                <Group gap="xs" mb="xs">
                                    <IconCpu size={16} color={cardTextColor} />
                                    <Text size="sm" fw={600}>{rightTitle}</Text>
                                </Group>
                                <Text size="sm">{item.rightContent}</Text>
                            </Box>
                        </Stack>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}; 