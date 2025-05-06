'use client';

import React from 'react';
import { TextInput, Select, Textarea, Title, Divider } from '@mantine/core';
import { RoleContextSectionProps } from './RoleContextSection.types';
import {
    RoleContextContainer,
    FormFieldsContainer
} from './RoleContextSection.styles';

export const RoleContextSection: React.FC<RoleContextSectionProps> = ({
    roleTitle,
    domainFocus,
    projectContext,
    handleChange
}) => {
    return (
        <RoleContextContainer>
            <Title order={4} mb="md" style={{ textAlign: 'center' }}>Role Context</Title>
            <Divider my="md" />

            <FormFieldsContainer>
                <TextInput
                    label="Role Title"
                    placeholder="e.g., Senior Frontend Engineer"
                    value={roleTitle}
                    onChange={(e) => handleChange('roleTitle', e.target.value)}
                    required
                />

                <Select
                    label="Domain Focus"
                    placeholder="Select domain focus"
                    data={[
                        { value: 'web-frontend', label: 'Web Frontend' },
                        { value: 'backend', label: 'Backend Development' },
                        { value: 'fullstack', label: 'Full Stack Development' },
                        { value: 'mobile', label: 'Mobile Development' },
                        { value: 'devops', label: 'DevOps' },
                        { value: 'data-science', label: 'Data Science' },
                        { value: 'ai-ml', label: 'AI/ML Engineering' },
                    ]}
                    value={domainFocus}
                    onChange={(value) => handleChange('domainFocus', value)}
                    required
                />

                <Textarea
                    label="Project Context"
                    description="Describe the project/scenario the candidate would be working on"
                    placeholder="Building an internal LLM-powered support tool for customer service."
                    minRows={4}
                    value={projectContext}
                    onChange={(e) => handleChange('projectContext', e.target.value)}
                    required
                />
            </FormFieldsContainer>
        </RoleContextContainer>
    );
}; 