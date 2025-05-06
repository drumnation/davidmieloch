'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    TextInput,
    Select,
    Textarea,
    Radio,
    Switch,
    Box,
    Paper,
    Divider,
    Title,
    Tooltip,
    Group,
    CopyButton
} from '@mantine/core';
import styled, { css } from 'styled-components';
import { FiEdit, FiCode, FiUsers, FiLayers, FiClock, FiZap, FiSave, FiCopy, FiCheckCircle } from 'react-icons/fi';
import { Typography, TypographyColor, Button as AtomButton } from '@/shared-components/atoms';
import { PageContainer } from '@/shared-components/layouts/PageContainer';
import { useLoading } from '@/contexts/LoadingContext';
import { motion } from 'framer-motion';
import { MarkdownRenderer } from '@/shared-components/molecules/MarkdownRenderer';
import { sampleData, presets, getTimeOptions, thinkingSteps, previewAnimation as logicPreviewAnimation, FormValues, Preset as LogicPreset } from './InterviewGenerator.logic';
import {
    QuickStartSection,
    RoleContextSection,
    AISettingsSection,
    TeamContextSection,
    ActionButtons,
    LoadingIndicator,
    ResultPreview
} from './components';
import {
    PageWrapper,
    FormContentContainer,
    StyledForm,
    Subtitle,
    HeroImage,
    HeroTitle
} from './InterviewGenerator.styles';
import { ApiStage } from './InterviewGenerator.hook';

// Styled components for the page layout and form elements
const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PreviewContainer = styled(Paper)`
  padding: 1.5rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  h2 {
    margin: 0;
  }
  
  button {
    margin-left: auto;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const RadioWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PresetsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledPresetButton = styled(AtomButton)`
  /* Override default ghost hover */
  &&&:hover {
    background-color: ${({ theme }) => theme.colors.gray[1]}; 
    color: ${({ theme }) => theme.colors.blue[6]};
    text-shadow: none;
  }
`;

// Animation variants for the preview
const previewAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const InterviewGenerator: React.FC = () => {
    const { signalPageReady } = useLoading();
    const [formValues, setFormValues] = useState<FormValues>({
        roleTitle: '',
        domainFocus: '',
        projectContext: '',
        aiMaturityLevel: '',
        assessmentFormat: 'take-home',
        timeLimit: '',
        canUseAiTools: true,
        teamFluencyLevel: ''
    });

    const [markdown, setMarkdown] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeOptions, setTimeOptions] = useState(getTimeOptions('take-home'));
    const [currentStep, setCurrentStep] = useState(0);
    const loadingBoxRef = useRef<HTMLDivElement>(null);
    const [apiStage, setApiStage] = useState<ApiStage>(ApiStage.IDLE);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        signalPageReady();
    }, [signalPageReady]);

    useEffect(() => {
        setTimeOptions(getTimeOptions(formValues.assessmentFormat));
        const validOptions = getTimeOptions(formValues.assessmentFormat).map(option => option.value);
        if (formValues.timeLimit && !validOptions.includes(formValues.timeLimit)) {
            setFormValues(prev => ({ ...prev, timeLimit: '' }));
        }
    }, [formValues.assessmentFormat, formValues.timeLimit]);

    const handleChange = useCallback((field: string, value: any) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setApiStage(ApiStage.PROCESSING);
        setProgress(0);
        setMarkdown('');
        setCurrentStep(0);

        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % thinkingSteps.length);
            setProgress(prev => Math.min(prev + (100 / (thinkingSteps.length * 2)), 90));
        }, 600);

        try {
            const response = await fetch('/api/interview-generator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inputs: formValues }),
            });

            clearInterval(interval);
            setProgress(100);

            if (!response.ok) throw new Error('Failed to generate interview. Please try again.');
            const data = await response.json();
            setMarkdown(data.markdown);
            setApiStage(ApiStage.COMPLETED);
        } catch (err) {
            clearInterval(interval);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setApiStage(ApiStage.ERROR);
        } finally {
            setIsLoading(false);
        }
    }, [formValues]);

    const saveToFile = useCallback(() => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formValues.roleTitle.replace(/\s+/g, '-').toLowerCase() || 'interview'}-challenge.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [markdown, formValues.roleTitle]);

    const populateTestData = useCallback(() => {
        const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];
        const randomPresetValues = getRandomItem(presets).values;
        setFormValues({
            ...randomPresetValues,
            canUseAiTools: Math.random() > 0.3,
        });
    }, []);

    const applyPreset = useCallback((presetName: string) => {
        const preset = presets.find(p => p.name === presetName);
        if (preset) setFormValues(preset.values);
    }, []);

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(markdown).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [markdown]);

    return (
        <PageWrapper>
            <PageContainer>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Hero image section */}
                    <HeroImage>
                        <HeroTitle>AI-Native Interview Generator</HeroTitle>
                        <Subtitle>
                            Craft interview challenges that test how engineers <em>think with AI</em> — system design, workflow orchestration, and judgment under real-world pressure.
                        </Subtitle>
                    </HeroImage>

                    <FormContentContainer>
                        <StyledForm onSubmit={handleSubmit}>
                            <QuickStartSection presets={presets} applyPreset={applyPreset} />

                            <RoleContextSection
                                roleTitle={formValues.roleTitle}
                                domainFocus={formValues.domainFocus}
                                projectContext={formValues.projectContext}
                                handleChange={handleChange}
                            />

                            <AISettingsSection
                                aiMaturityLevel={formValues.aiMaturityLevel}
                                assessmentFormat={formValues.assessmentFormat}
                                timeLimit={formValues.timeLimit}
                                handleChange={handleChange}
                                timeOptions={timeOptions}
                            />

                            <TeamContextSection
                                teamFluencyLevel={formValues.teamFluencyLevel}
                                handleChange={handleChange}
                            />

                            <ActionButtons
                                isLoading={isLoading}
                                populateTestData={populateTestData}
                            />
                        </StyledForm>

                        {isLoading && apiStage === ApiStage.PROCESSING && (
                            <LoadingIndicator
                                isLoading={isLoading}
                                currentStep={currentStep}
                                thinkingSteps={thinkingSteps}
                                loadingBoxRef={loadingBoxRef}
                                apiStage={apiStage}
                                progress={progress}
                            />
                        )}

                        {error && (
                            <Box mt="lg" p="md" style={{ border: '1px solid red', borderRadius: '4px', backgroundColor: '#fff5f5' }}>
                                <Typography weight="bold" color={('red.7' as TypographyColor)}>Error:</Typography>
                                <Typography color={('red.7' as TypographyColor)}>{error}</Typography>
                            </Box>
                        )}
                    </FormContentContainer>

                    {markdown && apiStage === ApiStage.COMPLETED && (
                        <ResultPreview
                            markdown={markdown}
                            saveToFile={saveToFile}
                            previewAnimation={logicPreviewAnimation}
                            copyToClipboard={copyToClipboard}
                            copied={copied}
                        />
                    )}
                </div>
            </PageContainer>
        </PageWrapper>
    );
}; 