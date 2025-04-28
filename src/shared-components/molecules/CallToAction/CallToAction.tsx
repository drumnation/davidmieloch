import React from 'react';
import { Title, Text, Button, Paper } from '@mantine/core';
import { CallToActionProps } from './CallToAction.types';

export const CallToAction: React.FC<CallToActionProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    variant = 'primary'
}) => {
    return (
        <Paper
            p="xl"
            radius="md"
            shadow="md"
            style={{
                background: 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
                padding: 'var(--mantine-spacing-xl) var(--mantine-spacing-xl)',
                textAlign: 'center',
            }}
        >
            <Title
                order={2}
                mb="md"
                style={{
                    color: 'white',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                }}
            >
                {title}
            </Title>
            {description && (
                <Text
                    mb="xl"
                    style={{
                        color: 'white',
                        opacity: 0.9,
                        maxWidth: 600,
                        margin: '0 auto',
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
                size="lg"
                variant="white"
                style={{
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                }}
            >
                {buttonText}
            </Button>
        </Paper>
    );
};

export default CallToAction; 