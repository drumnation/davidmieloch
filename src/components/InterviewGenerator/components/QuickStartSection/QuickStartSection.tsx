'use client';

import React from 'react';
import { Title, Divider, Tooltip, Group, Center } from '@mantine/core';
import { Typography, Button as AtomButton } from '@/shared-components/atoms';
import { QuickStartSectionProps } from './QuickStartSection.types';
import {
    QuickStartContainer,
    PresetsContainer,
    PresetButton
} from './QuickStartSection.styles';

export const QuickStartSection: React.FC<QuickStartSectionProps> = ({
    presets,
    applyPreset
}) => {
    return (
        <QuickStartContainer>
            <Title order={4} mb="md" style={{ textAlign: 'center' }}>Quick Start</Title>
            <Divider my="md" />

            <PresetsContainer>
                <Center style={{ width: '100%' }}>
                    <Typography as="span" weight="semibold">Presets:</Typography>
                </Center>
                <Group gap="md" justify="center" w="100%">
                    {presets.map(preset => (
                        <Tooltip
                            key={preset.name}
                            label="Load example configuration for this role"
                            position="top"
                            withArrow
                        >
                            <span>
                                <AtomButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => applyPreset(preset.name)}
                                >
                                    <PresetButton>
                                        {preset.icon}
                                        {preset.name}
                                    </PresetButton>
                                </AtomButton>
                            </span>
                        </Tooltip>
                    ))}
                </Group>
            </PresetsContainer>
        </QuickStartContainer>
    );
}; 