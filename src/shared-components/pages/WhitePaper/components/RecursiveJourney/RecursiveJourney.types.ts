// Define props and other types here
import React from 'react';

// Fully defined BlockType to match all our needs
export interface BlockType {
    title: string;
    summary: string;
    content: string[] | string; // Allow content to be string or string array
    icon?: React.ReactNode; // Optional icon prop
    exampleFile?: string; // Optional example file path
    secondExampleFile?: string; // Optional second example file path
    exampleLabel?: string; // Optional example label
    specialStyle?: 'terminal' | 'warning' | string; // Optional special styling
}

export interface RecursiveJourneyProps {
    className?: string; // Optional className prop
}

export interface StepContentProps {
    block: BlockType;
    index: number;
    navId: string;
}

export interface ExampleViewerProps {
    fileName: string;
    label?: string;
}

export interface JourneyContentProps {
    introduction: string[];
    blocks: BlockType[];
    blockNavIds: string[];
    conclusion: string[];
    cta: string;
} 