import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ComparisonTableProps } from './ComparisonTable.types';
import { Stack, Card, Text, Title, Group, Divider, Box, useMantineTheme } from '@mantine/core';
import { IconUser, IconCpu } from '@tabler/icons-react';
import * as S from './ComparisonTable.styles';
import { sectionContainerWithoutMarginStyle } from '../../pages/WhitePaper/components/AiAutopilotAnalogy/AiAutopilotAnalogy.styles'; // Import for padding values

// Mobile version with stacked layout using Mantine components
export const ComparisonTableMobile: React.FC<ComparisonTableProps> = ({
    leftTitle,
    rightTitle,
    items,
    variant = 'default', // Variant might influence mobile styling too
    className,
}) => {
    const theme = useMantineTheme();
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-50px", // Adjusted rootMargin for mobile
        threshold: 0.1
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (inView) {
            setIsVisible(true);
        }
    }, [inView]);

    const getBackgroundColor = (themeVariant: typeof variant) => {
        return theme.white;
    };

    const getTextColor = (themeVariant: typeof variant) => {
        return theme.black;
    };

    const categoryTitleColor = variant === 'accent' ? theme.colors.blue[6] : theme.primaryColor;

    // Get horizontal padding from the shared style
    const horizontalPadding = sectionContainerWithoutMarginStyle.paddingLeft; // Assuming paddingLeft and paddingRight are the same

    return (
        <Stack
            ref={ref}
            className={className}
            gap="lg"
            style={{
                paddingLeft: horizontalPadding,
                paddingRight: horizontalPadding,
            }}
        >
            {items.map((item, index) => (
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    key={index}
                    className={isVisible ? 'visible' : ''}
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`,
                        backgroundColor: getBackgroundColor(variant),
                        color: getTextColor(variant),
                    }}
                >
                    <Stack gap="xs">
                        <Title order={4} c={categoryTitleColor}>{item.category}</Title>
                        <Divider my="xs" />
                        <Group gap="xs" wrap="nowrap">
                            <IconUser size={18} color={getTextColor(variant)} />
                            <Text size="sm" fw={700} style={{ color: getTextColor(variant) }}>{leftTitle}:</Text>
                        </Group>
                        <Text size="sm" style={{ color: getTextColor(variant), paddingLeft: '26px' }}>{item.leftContent}</Text>

                        <Divider my="xs" variant="dashed" />
                        <Group gap="xs" wrap="nowrap">
                            <IconCpu size={18} color={getTextColor(variant)} />
                            <Text size="sm" fw={700} style={{ color: getTextColor(variant) }}>{rightTitle}:</Text>
                        </Group>
                        <Text size="sm" style={{ color: getTextColor(variant), paddingLeft: '26px' }}>{item.rightContent}</Text>
                    </Stack>
                </Card>
            ))}
        </Stack>
    );
}; 