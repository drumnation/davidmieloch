'use client';

import { useState, useEffect, useRef } from 'react';
import { FormValues } from './InterviewGenerator.types';
import { getTimeOptions, generateTestData, presets, thinkingSteps } from './InterviewGenerator.logic.tsx';
import { useLoading } from '@/contexts/LoadingContext';

// API call stages
export enum ApiStage {
    IDLE = 'idle',
    PREPARING = 'preparing',
    REQUESTING = 'requesting',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    ERROR = 'error'
}

export const useInterviewGenerator = () => {
    const { signalPageReady } = useLoading();
    const [formValues, setFormValues] = useState<FormValues>({
        roleTitle: '',
        domainFocus: '',
        projectContext: '',
        aiMaturityLevel: '',
        assessmentFormat: 'take-home',
        timeLimit: '',
        teamFluencyLevel: ''
    });

    const [markdown, setMarkdown] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeOptions, setTimeOptions] = useState(getTimeOptions('take-home'));
    const [currentStep, setCurrentStep] = useState(0);
    const [copied, setCopied] = useState(false);

    // Add API stage tracking
    const [apiStage, setApiStage] = useState<ApiStage>(ApiStage.IDLE);
    const [progress, setProgress] = useState(0);

    // Add a ref for the loading box
    const loadingBoxRef = useRef<HTMLDivElement>(null);

    // Signal the page is ready to hide the loading overlay
    useEffect(() => {
        signalPageReady();
    }, [signalPageReady]);

    // Update time options when assessment format changes
    useEffect(() => {
        setTimeOptions(getTimeOptions(formValues.assessmentFormat));

        // Reset time limit if current selection isn't valid for new format
        const validOptions = getTimeOptions(formValues.assessmentFormat).map(option => option.value);
        if (formValues.timeLimit && !validOptions.includes(formValues.timeLimit)) {
            setFormValues(prev => ({ ...prev, timeLimit: '' }));
        }
    }, [formValues.assessmentFormat]);

    // Effect for cycling thinking steps and their associated progress
    useEffect(() => {
        let thinkingInterval: NodeJS.Timeout | undefined;

        if (isLoading && apiStage === ApiStage.PROCESSING) {
            const thinkingStepsLength = thinkingSteps.length;
            const baseProgress = 25;
            const thinkingProgressRange = 70;

            thinkingInterval = setInterval(() => {
                setCurrentStep((prevStep) => {
                    const nextStep = prevStep + 1;
                    if (nextStep < thinkingStepsLength) {
                        const currentThinkingProgress = (nextStep / thinkingStepsLength) * thinkingProgressRange;
                        setProgress(baseProgress + currentThinkingProgress);
                        // Scroll only once when processing starts and first step is about to be set
                        if (prevStep === 0 && nextStep === 1) {
                            setTimeout(() => {
                                loadingBoxRef.current?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'center'
                                });
                            }, 100);
                        }
                        return nextStep;
                    }
                    clearInterval(thinkingInterval);
                    setProgress(baseProgress + thinkingProgressRange);
                    return prevStep;
                });
            }, 1800);

            // Initial scroll if currentStep is already 0 when PROCESSING starts
            if (currentStep === 0) {
                setTimeout(() => {
                    loadingBoxRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }

        }

        return () => {
            if (thinkingInterval) {
                clearInterval(thinkingInterval);
            }
        };
    }, [isLoading, apiStage]); // Only re-run if isLoading or apiStage changes

    // Effect for initial progress based on API stage (simplified)
    useEffect(() => {
        if (apiStage === ApiStage.IDLE) {
            setProgress(0);
            setCurrentStep(0); // Reset step for next run
        } else if (apiStage === ApiStage.PREPARING) {
            setProgress(10);
            setCurrentStep(0); // Ensure steps start from 0 if preparing
        } else if (apiStage === ApiStage.REQUESTING) {
            setProgress(25); // "Sending request..." phase
        } else if (apiStage === ApiStage.COMPLETED) {
            setProgress(100);
        } else if (apiStage === ApiStage.ERROR) {
            // Optionally set a specific progress for error, or leave as is
        }
        // Progress during ApiStage.PROCESSING is handled by the thinkingInterval effect
    }, [apiStage]);

    const handleChange = (field: string, value: any) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setCurrentStep(0); // Reset current step at the beginning of a new submission
        setApiStage(ApiStage.PREPARING);

        try {
            // Preparing data and prompt
            await new Promise(resolve => setTimeout(resolve, 800));
            setApiStage(ApiStage.REQUESTING);

            // Making API request
            const response = await fetch('/api/interview-generator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: formValues }),
            });

            if (!response.ok) {
                setApiStage(ApiStage.ERROR);
                throw new Error('Failed to generate interview');
            }

            setApiStage(ApiStage.PROCESSING);

            // Processing response
            const data = await response.json();
            let finalMarkdown = data.markdown;

            if (typeof finalMarkdown === 'string') {
                // Attempt to clean up by explicitly removing various markdown code block markers
                finalMarkdown = finalMarkdown.trim();

                // 1. First, remove any opening markdown code block markers (pattern: ```md, ``md, etc.)
                if (finalMarkdown.startsWith('```md') || finalMarkdown.startsWith('``md')) {
                    finalMarkdown = finalMarkdown.replace(/^(```md|``md)/, '').trim();
                }

                // 2. Also check for just backticks at the beginning
                if (finalMarkdown.startsWith('```') || finalMarkdown.startsWith('``')) {
                    finalMarkdown = finalMarkdown.replace(/^(```|``)/, '').trim();
                }

                // 3. Remove any closing code block backticks
                if (finalMarkdown.endsWith('```') || finalMarkdown.endsWith('``')) {
                    finalMarkdown = finalMarkdown.replace(/(```|``)$/, '').trim();
                }

                // 4. If we still have a format like ``md at the beginning of the text, remove it
                const lines = finalMarkdown.split('\n');
                if (lines.length > 0 && (lines[0].trim() === '``md' || lines[0].trim() === '``')) {
                    lines.shift();
                    finalMarkdown = lines.join('\n').trim();
                }
            }

            // Ensure thinking steps progress shows 95% before moving to completed
            // This might already be handled if the thinking interval completed
            // If not, explicitly set it if it's less than 95 and stage was PROCESSING
            if (progress < 95 && apiStage === ApiStage.PROCESSING) {
                setProgress(95);
            }
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay for UI to catch up

            setApiStage(ApiStage.COMPLETED);

            // Slight delay to show 100% before completing
            await new Promise(resolve => setTimeout(resolve, 300));
            setMarkdown(finalMarkdown);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setApiStage(ApiStage.ERROR);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setApiStage(ApiStage.IDLE);
            }, 500);
        }
    };

    const saveToFile = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formValues.roleTitle.replace(/\s+/g, '-').toLowerCase()}-interview.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Populate form with random test data
    const populateTestData = () => {
        setFormValues(generateTestData());
    };

    // Apply a preset to the form
    const applyPreset = (presetName: string) => {
        const preset = presets.find(p => p.name === presetName);
        if (preset) {
            setFormValues(preset.values);
        }
    };

    // Add the copy function
    const copyToClipboard = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        formValues,
        markdown,
        isLoading,
        error,
        timeOptions,
        currentStep,
        copied,
        loadingBoxRef,
        apiStage,
        progress,
        handleChange,
        handleSubmit,
        saveToFile,
        populateTestData,
        applyPreset,
        copyToClipboard
    };
}; 