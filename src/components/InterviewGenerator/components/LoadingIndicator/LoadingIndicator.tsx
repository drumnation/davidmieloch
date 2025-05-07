'use client';

import React from 'react';
import { Loader, Progress } from '@mantine/core';
import { LoadingIndicatorProps } from './LoadingIndicator.types';
import { ApiStage } from '../../InterviewGenerator.hook';
import {
    LoadingBox,
    LoadingText,
    ProgressContainer,
    StageLabel
} from './LoadingIndicator.styles';

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    isLoading,
    currentStep,
    thinkingSteps,
    loadingBoxRef,
    apiStage,
    progress
}) => {
    if (!isLoading) return null;

    // Get appropriate message based on API stage
    const getStageMessage = () => {
        switch (apiStage) {
            case ApiStage.PREPARING:
                return 'Preparing prompt and context...';
            case ApiStage.REQUESTING:
                return 'Sending request to AI model...';
            case ApiStage.PROCESSING:
                return thinkingSteps[currentStep]; // Use thinking steps during processing
            case ApiStage.STREAMING:
                return 'Receiving interview challenge...';
            case ApiStage.COMPLETED:
                return 'Generation complete!';
            case ApiStage.ERROR:
                return 'An error occurred. Please try again.';
            default:
                return 'Loading...';
        }
    };

    // Get a friendly name for the current stage
    const getStageFriendlyName = () => {
        switch (apiStage) {
            case ApiStage.PROCESSING:
                return 'AI Processing';
            case ApiStage.STREAMING:
                return 'Streaming Content';
            default:
                return apiStage;
        }
    };

    return (
        <LoadingBox ref={loadingBoxRef}>
            <Loader color="white" size="md" />
            <LoadingText>{getStageMessage()}</LoadingText>

            <ProgressContainer>
                <StageLabel>{getStageFriendlyName()}</StageLabel>
                <Progress
                    value={progress}
                    color="rgba(136, 130, 255, 0.8)"
                    radius="xl"
                    size="md"
                    striped
                    animated
                />
                <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
                    {Math.round(progress)}% Complete
                </div>
            </ProgressContainer>
        </LoadingBox>
    );
}; 