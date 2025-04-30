'use client'

import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react'
import JoyrideInternal, { CallBackProps, STATUS, Step, EVENTS } from 'react-joyride'
import dynamic from 'next/dynamic'
import { useMantineTheme } from '@mantine/core'

// Dynamically import Joyride with SSR disabled
const Joyride = dynamic(() => import('react-joyride'), {
    ssr: false,
})

interface JoyrideContextProps {
    startTour: (initialSteps?: Step[]) => void
    setTour: (newSteps: Step[]) => void
}

const JoyrideContext = createContext<JoyrideContextProps | undefined>(undefined)

interface JoyrideProviderProps {
    children: ReactNode
}

const TOUR_STORAGE_KEY = 'playerTourCompleted';

export const JoyrideProvider: React.FC<JoyrideProviderProps> = ({ children }) => {
    const [steps, setSteps] = useState<Step[]>([])
    const [run, setRun] = useState(false)
    const theme = useMantineTheme()

    const startTour = useCallback((initialSteps?: Step[]) => {
        const stepsToUse = initialSteps ?? steps;
        if (stepsToUse.length > 0) {
            console.log(`[JoyrideProvider] startTour called (using ${initialSteps ? 'initialSteps' : 'state steps'}) and setting run = true.`);
            if (initialSteps && initialSteps !== steps) {
                console.log(`[JoyrideProvider] startTour: Setting state steps from initialSteps.`);
                setSteps(initialSteps);
            }
            setRun(true);
        } else {
            console.log('[JoyrideProvider] startTour called but no steps available.');
        }
    }, [steps]);

    const setTour = useCallback((newSteps: Step[]) => {
        console.log('[JoyrideProvider] setTour called with', newSteps.length, 'steps.');
        setSteps(newSteps);
        if (newSteps.length === 0 && run) {
            console.log('[JoyrideProvider] Steps cleared while tour was running, setting run = false.');
            setRun(false);
        }
    }, [run]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, type, lifecycle } = data
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

        console.log(`[JoyrideProvider] Callback received: Status: ${status}, Type: ${type}, Lifecycle: ${lifecycle}`);

        if (finishedStatuses.includes(status)) {
            console.log('[JoyrideProvider] Tour finished or skipped, setting run=false and updating localStorage.');
            setRun(false)
            try {
                localStorage.setItem(TOUR_STORAGE_KEY, 'true')
                console.log(`[JoyrideProvider] localStorage ${TOUR_STORAGE_KEY} set to true.`);
            } catch (error) {
                console.error("[JoyrideProvider] Failed to save to localStorage on tour end", error);
            }
        } else if (status === STATUS.ERROR) {
            console.error('[JoyrideProvider] Joyride error status:', data);
        }
    }

    return (
        <JoyrideContext.Provider value={{ startTour, setTour }}>
            {children}
            {steps.length > 0 && (
                <Joyride
                    steps={steps}
                    run={run}
                    callback={handleJoyrideCallback}
                    continuous
                    showProgress
                    showSkipButton
                    scrollToFirstStep={false}
                    disableScrollParentFix={true}
                    spotlightClicks={false}
                    disableOverlayClose={true}
                    styles={{
                        options: {
                            zIndex: 10000,
                            arrowColor: '#fff',
                            backgroundColor: '#fff',
                            primaryColor: theme.colors.blue[6],
                            textColor: theme.colors.dark[8],
                        },
                        spotlight: {
                            backgroundColor: 'transparent',
                            borderRadius: theme.radius.sm,
                        },
                        overlay: {
                            position: 'fixed',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            zIndex: 9999,
                        },
                        tooltip: {
                            borderRadius: theme.radius.md,
                            padding: theme.spacing.md,
                            zIndex: 10001,
                        },
                        buttonNext: {
                            backgroundColor: theme.colors.blue[6],
                            borderRadius: theme.radius.sm,
                        },
                        buttonBack: {
                            color: theme.colors.blue[6],
                            marginRight: theme.spacing.sm,
                        },
                        buttonSkip: {
                            color: theme.colors.gray[6],
                        }
                    }}
                    spotlightPadding={15}
                />
            )}
        </JoyrideContext.Provider>
    )
}

export const useJoyride = (): JoyrideContextProps => {
    const context = useContext(JoyrideContext)
    if (!context) {
        throw new Error('useJoyride must be used within a JoyrideProvider')
    }
    return context
} 