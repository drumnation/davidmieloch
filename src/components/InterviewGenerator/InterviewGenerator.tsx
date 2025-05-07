'use client';

import React from 'react';
import { Box } from '@mantine/core';
import { Typography, TypographyColor } from '@/shared-components/atoms';
import { PageContainer } from '@/shared-components/layouts/PageContainer';
import {
    PageWrapper,
    FormContentContainer,
    StyledForm,
    Subtitle,
    HeroImage,
    HeroTitle
} from './InterviewGenerator.styles';
import {
    QuickStartSection,
    RoleContextSection,
    AISettingsSection,
    TeamContextSection,
    ActionButtons,
    LoadingIndicator,
    ResultPreview
} from './components';
import { useInterviewGenerator } from './InterviewGenerator.hook';
import { ApiStage } from './InterviewGenerator.hook';
import { previewAnimation, presets } from './InterviewGenerator.logic';

export const InterviewGenerator: React.FC = () => {
    const {
        formValues,
        handleChange,
        handleSubmit,
        timeOptions,
        isLoading,
        markdown,
        error,
        apiStage,
        progress,
        loadingBoxRef,
        currentStep,
        copied,
        saveToFile,
        populateTestData,
        applyPreset,
        copyToClipboard,
        thinkingSteps
    } = useInterviewGenerator();

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

                        {isLoading && (apiStage === ApiStage.PROCESSING || apiStage === ApiStage.STREAMING || apiStage === ApiStage.REQUESTING) && (
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

                    {markdown && (apiStage === ApiStage.COMPLETED || apiStage === ApiStage.STREAMING) && (
                        <ResultPreview
                            markdown={markdown}
                            saveToFile={saveToFile}
                            copyToClipboard={copyToClipboard}
                            copied={copied}
                            previewAnimation={previewAnimation}
                        />
                    )}
                </div>
            </PageContainer>
        </PageWrapper>
    );
}; 