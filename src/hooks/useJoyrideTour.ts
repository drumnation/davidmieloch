import { useRef, useEffect, useCallback } from 'react';
import { Step } from 'react-joyride';
import { useJoyride } from '@/providers/JoyrideProvider';

interface UseJoyrideTourProps {
    steps: Step[];
    storageKey: string;
    options?: {
        autoStartDelay?: number; // Optional delay for auto-start
    };
}

interface UseJoyrideTourReturn {
    handleManualStart: () => void;
}

/**
 * Hook to manage Joyride tour steps registration and auto-start logic.
 * Encapsulates checking localStorage, handling StrictMode double effects,
 * and providing a manual start trigger.
 */
export const useJoyrideTour = ({
    steps: stepsFromProps,
    storageKey,
    options = {},
}: UseJoyrideTourProps): UseJoyrideTourReturn => {
    const { setTour, startTour } = useJoyride();
    const didAttemptSchedulingRef = useRef(false);
    const autoStartTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
    const isMountedRef = useRef(false);
    const { autoStartDelay = 250 } = options;

    // --- Mount/Unmount Effect ---
    useEffect(() => {
        isMountedRef.current = true;
        console.log(`[useJoyrideTour - ${storageKey}] Component mounted.`);
        didAttemptSchedulingRef.current = false;
        return () => {
            isMountedRef.current = false;
            console.log(`[useJoyrideTour - ${storageKey}] Component unmounted.`);
            if (autoStartTimeoutIdRef.current) {
                console.log(`[useJoyrideTour - ${storageKey}] Clearing timeout ${autoStartTimeoutIdRef.current} on unmount.`);
                clearTimeout(autoStartTimeoutIdRef.current);
                autoStartTimeoutIdRef.current = null;
            }
        };
    }, [storageKey]);

    // --- Schedule Auto Start Function ---
    const scheduleAutoStart = useCallback(() => {
        const hookId = storageKey;
        if (autoStartTimeoutIdRef.current !== null) {
            console.log(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Aborting, timeout already pending (${autoStartTimeoutIdRef.current}).`);
            return;
        }

        try {
            const tourCompleted = localStorage.getItem(storageKey);
            console.log(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Checked localStorage '${storageKey}':`, tourCompleted);

            if (!tourCompleted) {
                console.log(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Tour not completed, queueing startTour()...`);
                autoStartTimeoutIdRef.current = setTimeout(() => {
                    const timeoutIdWhenRun = autoStartTimeoutIdRef.current;
                    autoStartTimeoutIdRef.current = null;
                    if (isMountedRef.current) {
                        console.log(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Timeout ${timeoutIdWhenRun} executing startTour() with ${stepsFromProps.length} steps.`);
                        startTour(stepsFromProps);
                    } else {
                        console.log(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Timeout ${timeoutIdWhenRun} fired but component unmounted.`);
                    }
                }, autoStartDelay);
                console.log(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Timeout queued with ID: ${autoStartTimeoutIdRef.current}`);
            } else {
                console.log(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Tour already completed.`);
            }
        } catch (error) {
            console.error(`[useJoyrideTour - ${hookId}] scheduleAutoStart: Failed to read localStorage`, error);
        }
    }, [storageKey, autoStartDelay, startTour, stepsFromProps]);

    // --- Effect to Register Steps & Trigger Scheduling ---
    useEffect(() => {
        const hookId = storageKey;
        console.log(`[useJoyrideTour - ${hookId}] Register/Schedule Effect running (Steps: ${stepsFromProps.length}, Attempted: ${didAttemptSchedulingRef.current}, Pending Timeout: ${autoStartTimeoutIdRef.current})...`);

        if (stepsFromProps.length > 0) {
            console.log(`[useJoyrideTour - ${hookId}] Registering ${stepsFromProps.length} steps.`);
            setTour(stepsFromProps);

            if (!didAttemptSchedulingRef.current && autoStartTimeoutIdRef.current === null) {
                console.log(`[useJoyrideTour - ${hookId}] Attempting scheduleAutoStart (conditions met)...`);
                didAttemptSchedulingRef.current = true;
                scheduleAutoStart();
            } else if (didAttemptSchedulingRef.current) {
                console.log(`[useJoyrideTour - ${hookId}] Skipping schedule: Already attempted.`);
            } else if (autoStartTimeoutIdRef.current !== null) {
                console.log(`[useJoyrideTour - ${hookId}] Skipping schedule: Timeout already pending (${autoStartTimeoutIdRef.current}).`);
            }

        } else {
            console.log(`[useJoyrideTour - ${hookId}] No steps provided.`);
            setTour([]);
            if (didAttemptSchedulingRef.current) {
                console.log(`[useJoyrideTour - ${hookId}] Resetting scheduling attempt flag because steps are empty.`);
                didAttemptSchedulingRef.current = false;
            }
            if (autoStartTimeoutIdRef.current) {
                console.log(`[useJoyrideTour - ${hookId}] Clearing pending timeout ${autoStartTimeoutIdRef.current} because steps became empty.`);
                clearTimeout(autoStartTimeoutIdRef.current);
                autoStartTimeoutIdRef.current = null;
            }
        }

        // Cleanup
        return () => {
            console.log(`[useJoyrideTour - ${hookId}] Register/Schedule Effect cleanup.`);
        };
    }, [stepsFromProps, storageKey, setTour, scheduleAutoStart]);


    // --- Manual Start Handler ---
    const handleManualStart = useCallback(() => {
        const hookId = storageKey;
        console.log(`[useJoyrideTour - ${hookId}] Manual start triggered.`);
        if (autoStartTimeoutIdRef.current) {
            console.log(`[useJoyrideTour - ${hookId}] Manual start: Clearing pending auto-start timeout ${autoStartTimeoutIdRef.current}.`);
            clearTimeout(autoStartTimeoutIdRef.current);
            autoStartTimeoutIdRef.current = null;
        }
        if (!didAttemptSchedulingRef.current) {
            console.log(`[useJoyrideTour - ${hookId}] Manual start: Setting scheduling attempt flag.`);
            didAttemptSchedulingRef.current = true;
        }

        if (stepsFromProps.length > 0) {
            console.log(`[useJoyrideTour - ${hookId}] Manual start: Calling startTour with ${stepsFromProps.length} steps.`);
            startTour(stepsFromProps);
        } else {
            console.log(`[useJoyrideTour - ${hookId}] Manual start: No steps available.`);
        }
    }, [stepsFromProps, storageKey, setTour, startTour]);

    return { handleManualStart };
}; 