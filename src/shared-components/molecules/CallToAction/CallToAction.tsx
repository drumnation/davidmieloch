import React from 'react';
import { Title, Text, Button, Paper, Stack, Group, ThemeIcon } from '@mantine/core';
import { CallToActionProps } from './CallToAction.types';

export const CallToAction: React.FC<CallToActionProps> = ({
    title,
    subtitle,
    description,
    buttonText,
    buttonLink,
    variant = 'primary',
    icon
}) => {
    const background = variant === 'secondary'
        ? 'var(--mantine-color-gray-0)'
        : 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))';
    const textColor = variant === 'secondary' ? 'var(--mantine-color-black)' : 'white';
    const titleColor = variant === 'secondary' ? 'var(--mantine-color-blue-7)' : 'white';
    const buttonVariant = variant === 'secondary' ? 'gradient' : 'white';
    const iconColor = variant === 'secondary' ? 'blue' : 'white';

    return (
        <Paper
            p="xl"
            radius="md"
            shadow="md"
            style={{
                background: background,
                textAlign: 'center',
            }}
        >
            <Stack align="center" gap="md">
                <Group justify="center" gap="sm">
                    {icon && (
                        <ThemeIcon
                            variant={variant === 'secondary' ? 'light' : 'light'}
                            color={iconColor}
                            radius="xl"
                            size="lg"
                        >
                            {icon}
                        </ThemeIcon>
                    )}
                    <Stack gap={0} align="center">
                        <Title
                            order={2}
                            style={{
                                color: titleColor,
                                fontSize: '1.75rem',
                                fontWeight: 700,
                            }}
                        >
                            {title}
                        </Title>
                        {subtitle && (
                            <Text
                                size="sm"
                                mt={2}
                                style={{ color: textColor, opacity: 0.8 }}
                            >
                                {subtitle}
                            </Text>
                        )}
                    </Stack>
                </Group>

                {description && (
                    <Text
                        style={{
                            color: textColor,
                            opacity: 0.9,
                            maxWidth: 600,
                        }}
                    >
                        {description}
                    </Text>
                )}
                <Button
                    component="a"
                    href={buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                    variant={buttonVariant}
                    gradient={variant === 'secondary' ? { from: 'blue', to: 'cyan' } : undefined}
                    style={{
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        marginTop: 'var(--mantine-spacing-sm)'
                    }}
                >
                    {buttonText}
                </Button>
            </Stack>
        </Paper>
    );
};

export default CallToAction; 