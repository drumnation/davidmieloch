'use client';

import React from 'react';
import { Select, Title, Divider, Text } from '@mantine/core';
import { TeamContextSectionProps } from './TeamContextSection.types';
import {
    TeamContextContainer,
    FormFieldsContainer
} from './TeamContextSection.styles';

export const TeamContextSection: React.FC<TeamContextSectionProps> = ({
    teamFluencyLevel,
    handleChange
}) => {
    return (
        <TeamContextContainer>
            <Title order={4} mb="md" style={{ textAlign: 'center' }}>Team Context</Title>
            <Divider my="md" />

            <FormFieldsContainer>
                <div>
                    <Select
                        label="Team AI Fluency Level"
                        placeholder="Select team fluency level"
                        data={[
                            { value: 'novice', label: 'Novice - Limited AI experience' },
                            { value: 'familiar', label: 'Familiar - Some AI experience' },
                            { value: 'proficient', label: 'Proficient - Regular AI usage' },
                            { value: 'expert', label: 'Expert - AI-first development' },
                        ]}
                        value={teamFluencyLevel}
                        onChange={(value) => handleChange('teamFluencyLevel', value)}
                        required
                    />
                    <Text size="sm" color="gray.6" mt={5}>
                        How fluent is your team with using or reviewing AI-assisted code?
                    </Text>
                </div>
            </FormFieldsContainer>
        </TeamContextContainer>
    );
}; 