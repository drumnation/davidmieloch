import { RefObject } from 'react';
import { ApiStage } from '../../InterviewGenerator.hook';

export interface LoadingIndicatorProps {
    isLoading: boolean;
    currentStep: number;
    thinkingSteps: string[];
    loadingBoxRef: RefObject<HTMLDivElement>;
    apiStage: ApiStage;
    progress: number;
}
