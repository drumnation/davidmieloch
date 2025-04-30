import React, { useCallback, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useTourState } from '../../hooks/useTourState';

export type TourGuideProps = {
    tourId: string;
    steps: Step[];
    run?: boolean;
    continuous?: boolean;
    showSkipButton?: boolean;
    showProgress?: boolean;
    disableCloseOnEsc?: boolean;
    styles?: any;
    children?: React.ReactNode;
    debug?: boolean;
};

export const TourGuide: React.FC<TourGuideProps> = ({
    tourId,
    steps,
    run = true,
    continuous = true,
    showSkipButton = true,
    showProgress = true,
    disableCloseOnEsc = false,
    styles,
    children,
    debug = false,
}) => {
    const {
        tourState,
        completeTour,
        skipTour,
        setStep,
        isReady
    } = useTourState({
        tourId,
        defaultState: {
            completed: false,
            skipped: false,
            currentStep: 0
        }
    });

    // Add debugging effect
    useEffect(() => {
        if (debug) {
            console.log(`[TourGuide] Tour state for ${tourId}:`, {
                isReady,
                tourState,
                run,
                shouldRun: isReady && !tourState.completed && !tourState.skipped && run,
                stepsExist: steps.length > 0,
                steps
            });
        }
    }, [debug, tourId, isReady, tourState, run, steps]);

    const handleJoyrideCallback = useCallback((data: CallBackProps) => {
        const { action, index, status, type } = data;

        if (debug) {
            console.log(`[TourGuide] Callback:`, data);
        }

        // Update tour state based on actions
        if (status === STATUS.FINISHED) {
            completeTour();
        }

        if (status === STATUS.SKIPPED) {
            skipTour();
        }

        // Update the current step
        if (type === 'step:after' && index !== undefined) {
            setStep(index + 1);
        }
    }, [completeTour, skipTour, setStep, debug]);

    // Only run the tour if:
    // 1. The hook is initialized
    // 2. The tour has not been completed or skipped
    // 3. The run prop is true
    const shouldRun = isReady && !tourState.completed && !tourState.skipped && run;

    return (
        <>
            {children}

            {isReady && (
                <Joyride
                    callback={handleJoyrideCallback}
                    continuous={continuous}
                    run={shouldRun}
                    scrollToFirstStep
                    showProgress={showProgress}
                    showSkipButton={showSkipButton}
                    stepIndex={tourState.currentStep}
                    steps={steps}
                    styles={styles}
                    disableCloseOnEsc={disableCloseOnEsc}
                    debug={debug}
                />
            )}
        </>
    );
}; 