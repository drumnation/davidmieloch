'use client'

import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react'
import { CallBackProps, STATUS, Step } from 'react-joyride'
import dynamic from 'next/dynamic'
import { useMantineTheme } from '@mantine/core'

// Dynamically import Joyride with SSR disabled
const Joyride = dynamic(() => import('react-joyride'), {
    ssr: false,
})

interface JoyrideContextProps {
    startTour: (steps: Step[], storageKey: string) => void
    setTour: (newSteps: Step[]) => void
}

const JoyrideContext = createContext<JoyrideContextProps | undefined>(undefined)

interface JoyrideProviderProps {
    children: ReactNode
}

export const JoyrideProvider: React.FC<JoyrideProviderProps> = ({ children }) => {
    const [steps, setSteps] = useState<Step[]>([])
    const [run, setRun] = useState(false)
    const [currentStorageKey, setCurrentStorageKey] = useState<string | null>(null)
    const theme = useMantineTheme()

    const startTour = useCallback((initialSteps: Step[], storageKey: string) => {
        const stepsToUse = initialSteps ?? steps;
        if (stepsToUse.length > 0) {
            console.log(`[JoyrideProvider] startTour called for key "${storageKey}" (using ${initialSteps ? 'initialSteps' : 'state steps'}) and setting run = true.`);
            if (initialSteps && initialSteps !== steps) {
                console.log(`[JoyrideProvider] startTour: Setting state steps from initialSteps.`);
                setSteps(initialSteps);
            }
            setCurrentStorageKey(storageKey);
            setRun(true);
        } else {
            console.log(`[JoyrideProvider] startTour called for key "${storageKey}" but no steps available.`);
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

        console.log(`[JoyrideProvider] Callback received for tour with key "${currentStorageKey}": Status: ${status}, Type: ${type}, Lifecycle: ${lifecycle}`);

        if (finishedStatuses.includes(status)) {
            console.log(`[JoyrideProvider] Tour "${currentStorageKey}" finished or skipped, setting run=false and updating localStorage.`);
            setRun(false)
            if (currentStorageKey) {
                try {
                    localStorage.setItem(currentStorageKey, 'true')
                    console.log(`[JoyrideProvider] localStorage ${currentStorageKey} set to true.`);
                } catch (error) {
                    console.error(`[JoyrideProvider] Failed to save to localStorage for key ${currentStorageKey} on tour end`, error);
                } finally {
                    setCurrentStorageKey(null);
                }
            } else {
                console.warn(`[JoyrideProvider] Tour finished or skipped, but currentStorageKey was not set. Cannot update localStorage.`);
            }
        } else if (status === STATUS.ERROR) {
            console.error(`[JoyrideProvider] Joyride error status for tour key "${currentStorageKey}":`, data);
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