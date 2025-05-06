import { ReactNode } from 'react';

// Form values interface
export interface FormValues {
    roleTitle: string;
    domainFocus: string;
    projectContext: string;
    aiMaturityLevel: string;
    assessmentFormat: string;
    timeLimit: string;
    teamFluencyLevel: string;
}

// Preset interface
export interface Preset {
    name: string;
    icon: ReactNode;
    values: FormValues;
}

// Thinking step animation type
export type ThinkingStep = string;

// Component props interface
export interface InterviewGeneratorProps {
    // Add any props if needed for the component in the future
} 