import { BlockType } from './RecursiveJourney.types';

// Add logic functions here
export const parseBlockTitle = (title: string): { hasStep: boolean; stepPart: string; contentPart: string } => {
    const stepMatch = title.match(/^(Step \d+:)(.*)/i);
    if (stepMatch) {
        return {
            hasStep: true,
            stepPart: stepMatch[1].trim(),
            contentPart: stepMatch[2].trim(),
        };
    }
    return {
        hasStep: false,
        stepPart: '',
        contentPart: title.trim(),
    };
};

// Add other logic functions as needed 