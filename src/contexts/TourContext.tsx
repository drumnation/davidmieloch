import React, { createContext, useContext, ReactNode } from 'react';
import { useTourState } from '../hooks/useTourState';

type TourContextType = {
    // For the main app tour
    appTour: {
        state: {
            completed: boolean;
            skipped: boolean;
            currentStep: number;
        };
        completeTour: () => void;
        skipTour: () => void;
        resetTour: () => void;
        setStep: (step: number) => void;
        isReady: boolean;
    };
    // For any feature-specific tours
    featureTour: (featureId: string) => {
        state: {
            completed: boolean;
            skipped: boolean;
            currentStep: number;
        };
        completeTour: () => void;
        skipTour: () => void;
        resetTour: () => void;
        setStep: (step: number) => void;
        isReady: boolean;
    };
};

const TourContext = createContext<TourContextType | undefined>(undefined);

export type TourProviderProps = {
    children: ReactNode;
    debug?: boolean;
};

export const TourProvider: React.FC<TourProviderProps> = ({
    children,
    debug = false
}) => {
    // Main app tour state
    const appTourState = useTourState({
        tourId: 'app-main-tour',
        storageType: 'local',
        debug
    });

    // Create a function that returns tour state for any feature
    const getFeatureTourState = (featureId: string) => {
        // This is inefficient for many features as it creates a new hook for each call,
        // but for a handful of features it's fine. For many features, consider a different approach.
        const { tourState, completeTour, skipTour, resetTour, setStep, isReady } = useTourState({
            tourId: `feature-tour-${featureId}`,
            storageType: 'local',
            debug
        });

        return {
            state: tourState,
            completeTour,
            skipTour,
            resetTour,
            setStep,
            isReady,
        };
    };

    const contextValue: TourContextType = {
        appTour: {
            state: appTourState.tourState,
            completeTour: appTourState.completeTour,
            skipTour: appTourState.skipTour,
            resetTour: appTourState.resetTour,
            setStep: appTourState.setStep,
            isReady: appTourState.isReady,
        },
        featureTour: getFeatureTourState,
    };

    if (debug) {
        console.log('[TourContext] Provider initialized with debug mode:', {
            appTourState: appTourState.tourState,
            isReady: appTourState.isReady
        });
    }

    return (
        <TourContext.Provider value={contextValue}>
            {children}
        </TourContext.Provider>
    );
};

// Custom hook to use the tour context
export const useTourContext = () => {
    const context = useContext(TourContext);
    if (context === undefined) {
        throw new Error('useTourContext must be used within a TourProvider');
    }
    return context;
}; 