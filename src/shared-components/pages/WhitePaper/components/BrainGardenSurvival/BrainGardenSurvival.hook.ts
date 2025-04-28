import { useState } from 'react';
import { BrainGardenSurvivalProps } from './BrainGardenSurvival.types';

export const useBrainGardenSurvival = (initialProps: BrainGardenSurvivalProps) => {
    // Currently, this component doesn't have any stateful logic
    // This hook is created to follow the pattern and can be expanded in the future

    return {
        // Return any values or functions that would be needed by the component
        isLoading: initialProps.loading || false,
    };
}; 