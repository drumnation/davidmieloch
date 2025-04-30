import React, { useCallback, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useTourContext } from '../../contexts/TourContext';

type TourGuideProps = {
    tourId: string; // 'app' for main app tour, or feature ID for feature tours
    steps: Step[];
    run?: boolean;
    continuous?: boolean;
    showSkipButton?: boolean;
    showProgress?: boolean;
    disableCloseOnEsc?: boolean;
    styles?: any;
    children?: React.ReactNode;
    isFeatureTour?: boolean; // Whether this is a feature-specific tour
    debug?: boolean;
};

export const TourGuideWithContext: React.FC<TourGuideProps> = ({
    tourId,
    steps,
    run = true,
    continuous = true,
    showSkipButton = true,
    showProgress = true,
    disableCloseOnEsc = false,
    styles,
    children,
    isFeatureTour = false,
    debug = false,
}) => {
    const tourContext = useTourContext();

    // Get the appropriate tour state based on whether this is app or feature tour
    const tourState = isFeatureTour
        ? tourContext.featureTour(tourId)
        : tourContext.appTour;

    // Add debugging effect
    useEffect(() => {
        if (debug) {
            console.log(`[TourGuideWithContext] Tour state for ${tourId}:`, {
                isReady: tourState.isReady,
                state: tourState.state,
                run,
                shouldRun: tourState.isReady && !tourState.state.completed && !tourState.state.skipped && run,
                stepsExist: steps.length > 0,
                isFeatureTour,
                steps
            });
        }
    }, [debug, tourId, tourState, run, steps, isFeatureTour]);

    const handleJoyrideCallback = useCallback((data: CallBackProps) => {
        const { index, status, type } = data;

        if (debug) {
            console.log(`[TourGuideWithContext] Callback for ${tourId}:`, data);
        }

        // Update tour state based on actions
        if (status === STATUS.FINISHED) {
            tourState.completeTour();
        }

        if (status === STATUS.SKIPPED) {
            tourState.skipTour();
        }

        // Update the current step
        if (type === 'step:after' && index !== undefined) {
            tourState.setStep(index + 1);
        }
    }, [tourState, tourId, debug]);

    // Only run the tour if:
    // 1. The hook is initialized
    // 2. The tour has not been completed or skipped
    // 3. The run prop is true
    const shouldRun = tourState.isReady && !tourState.state.completed && !tourState.state.skipped && run;

    // Check for target element existence
    useEffect(() => {
        if (debug && shouldRun) {
            steps.forEach((step, index) => {
                const target = document.querySelector(step.target as string);
                console.log(`[TourGuideWithContext] Step ${index + 1} target "${step.target}" exists:`, !!target);
            });
        }
    }, [debug, shouldRun, steps]);

    return (
        <>
            {children}

            {tourState.isReady && (
                <Joyride
                    callback={handleJoyrideCallback}
                    continuous={continuous}
                    run={shouldRun}
                    scrollToFirstStep
                    showProgress={showProgress}
                    showSkipButton={showSkipButton}
                    stepIndex={tourState.state.currentStep}
                    steps={steps}
                    styles={styles}
                    disableCloseOnEsc={disableCloseOnEsc}
                    debug={debug}
                />
            )}
        </>
    );
}; 