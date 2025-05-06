'use client';

import React from 'react';
import { Select, Radio, Title, Divider, Tooltip } from '@mantine/core';
import { FiEdit, FiCode, FiUsers, FiLayers } from 'react-icons/fi';
import { AISettingsSectionProps } from './AISettingsSection.types';
import {
    AISettingsContainer,
    FormFieldsContainer,
    SettingsRow,
    RadioContainer,
    RadioWithIcon
} from './AISettingsSection.styles';

export const AISettingsSection: React.FC<AISettingsSectionProps> = ({
    aiMaturityLevel,
    assessmentFormat,
    timeLimit,
    timeOptions,
    handleChange
}) => {
    return (
        <AISettingsContainer>
            <Title order={4} mb="md" style={{ textAlign: 'center' }}>AI & Assessment Settings</Title>
            <Divider my="md" />

            <FormFieldsContainer>
                {/* First row: AI Maturity and Time Limit side by side */}
                <SettingsRow>
                    <Tooltip
                        label="How advanced should the AI skills be for this role?"
                        position="top-start"
                        withArrow
                    >
                        <Select
                            label="AI Maturity Level"
                            placeholder="Select maturity level"
                            data={[
                                { value: 'beginner', label: 'Beginner - Basic prompting' },
                                { value: 'intermediate', label: 'Intermediate - Advanced prompting strategies' },
                                { value: 'advanced', label: 'Advanced - Complex workflows with multiple tools' },
                                { value: 'expert', label: 'Expert - AI-native development' },
                            ]}
                            value={aiMaturityLevel}
                            onChange={(value) => handleChange('aiMaturityLevel', value)}
                            required
                        />
                    </Tooltip>

                    <Tooltip
                        label="Time allotted for the assessment (options adjust based on format)"
                        position="top-start"
                        withArrow
                    >
                        <Select
                            label="Time Limit"
                            placeholder="Select time limit"
                            data={timeOptions}
                            value={timeLimit}
                            onChange={(value) => handleChange('timeLimit', value)}
                            required
                        />
                    </Tooltip>
                </SettingsRow>

                {/* Second row: Assessment Format full width */}
                <div>
                    <Radio.Group
                        label="Assessment Format"
                        value={assessmentFormat}
                        onChange={(value) => handleChange('assessmentFormat', value)}
                        required
                    >
                        <RadioContainer>
                            <Radio
                                value="take-home"
                                label={
                                    <RadioWithIcon>
                                        <FiEdit size={16} />
                                        <span>Take-home Challenge</span>
                                    </RadioWithIcon>
                                }
                            />
                            <Radio
                                value="live-coding"
                                label={
                                    <RadioWithIcon>
                                        <FiCode size={16} />
                                        <span>Live Coding Session</span>
                                    </RadioWithIcon>
                                }
                            />
                            <Radio
                                value="pair-programming"
                                label={
                                    <RadioWithIcon>
                                        <FiUsers size={16} />
                                        <span>Pair Programming</span>
                                    </RadioWithIcon>
                                }
                            />
                            <Radio
                                value="architecture-review"
                                label={
                                    <RadioWithIcon>
                                        <FiLayers size={16} />
                                        <span>Architecture Review</span>
                                    </RadioWithIcon>
                                }
                            />
                        </RadioContainer>
                    </Radio.Group>
                </div>
            </FormFieldsContainer>
        </AISettingsContainer>
    );
}; 