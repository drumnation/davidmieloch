'use client';

import React from 'react';
import { Box, Divider } from '@mantine/core';
import { FiZap } from 'react-icons/fi';
import { Button as AtomButton } from '@/shared-components/atoms';
import { ActionButtonsProps } from './ActionButtons.types';
import {
    ActionContainer,
    NoteBox
} from './ActionButtons.styles';

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    isLoading,
    populateTestData
}) => {
    return (
        <Box style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            <NoteBox>
                💡 This generator assumes AI tools are part of the process — we're testing system thinking, not syntax recall.
            </NoteBox>

            <Divider my="md" style={{ opacity: 0.3 }} />

            <ActionContainer>
                {process.env.NODE_ENV === 'development' && (
                    <AtomButton
                        type="button"
                        onClick={populateTestData}
                        variant="secondary"
                    >
                        Test Data
                    </AtomButton>
                )}
                <AtomButton
                    type="submit"
                    disabled={isLoading}
                    icon={<FiZap size={16} />}
                >
                    {isLoading ? 'Generating...' : 'Generate Interview'}
                </AtomButton>
            </ActionContainer>
        </Box>
    );
}; 