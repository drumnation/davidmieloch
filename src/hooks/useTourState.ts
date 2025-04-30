import { useState, useEffect } from 'react';

type TourOptions = {
    tourId: string;
    storageType?: 'local' | 'session';
    defaultState?: {
        completed: boolean;
        skipped: boolean;
        currentStep: number;
    };
    debug?: boolean;
};

export const useTourState = (options: TourOptions) => {
    const {
        tourId,
        storageType = 'local',
        defaultState = { completed: false, skipped: false, currentStep: 0 },
        debug = false
    } = options;

    const storageKey = `tour-state-${tourId}`;

    // Initial state is the default until we can check storage in useEffect
    const [tourState, setTourState] = useState(defaultState);
    // Track if we've initialized from storage to prevent unnecessary re-renders
    const [isInitialized, setIsInitialized] = useState(false);

    // Load state from storage on mount (browser-only)
    useEffect(() => {
        if (typeof window === 'undefined') {
            if (debug) console.log(`[useTourState] Window undefined (SSR), skipping load for "${tourId}"`);
            return;
        }

        if (isInitialized) {
            if (debug) console.log(`[useTourState] Already initialized for "${tourId}", skipping load`);
            return;
        }

        try {
            const storage = storageType === 'local' ? localStorage : sessionStorage;
            const savedState = storage.getItem(storageKey);

            if (debug) {
                console.log(`[useTourState] Loading state for "${tourId}":`, {
                    storageKey,
                    savedState: savedState ? JSON.parse(savedState) : null,
                    defaultState
                });
            }

            if (savedState) {
                setTourState(JSON.parse(savedState));
            }
            setIsInitialized(true);
        } catch (error) {
            console.error(`[useTourState] Error loading tour state for "${tourId}":`, error);
            setIsInitialized(true);
        }
    }, [storageKey, storageType, isInitialized, tourId, debug, defaultState]);

    // Persist state changes to storage
    const updateTourState = (newState: Partial<typeof tourState>) => {
        try {
            const updatedState = { ...tourState, ...newState };
            setTourState(updatedState);

            if (typeof window !== 'undefined') {
                const storage = storageType === 'local' ? localStorage : sessionStorage;
                storage.setItem(storageKey, JSON.stringify(updatedState));

                if (debug) {
                    console.log(`[useTourState] Updated state for "${tourId}":`, {
                        previous: tourState,
                        new: updatedState,
                        storageKey
                    });
                }
            }
        } catch (error) {
            console.error(`[useTourState] Error saving tour state for "${tourId}":`, error);
        }
    };

    // Convenience methods
    const completeTour = () => {
        if (debug) console.log(`[useTourState] Completing tour "${tourId}"`);
        updateTourState({ completed: true });
    };

    const skipTour = () => {
        if (debug) console.log(`[useTourState] Skipping tour "${tourId}"`);
        updateTourState({ skipped: true });
    };

    const resetTour = () => {
        if (debug) console.log(`[useTourState] Resetting tour "${tourId}" to`, defaultState);
        updateTourState({ ...defaultState });
    };

    const setStep = (step: number) => {
        if (debug) console.log(`[useTourState] Setting step for "${tourId}" to`, step);
        updateTourState({ currentStep: step });
    };

    return {
        tourState,
        updateTourState,
        completeTour,
        skipTour,
        resetTour,
        setStep,
        isReady: isInitialized
    };
}; 