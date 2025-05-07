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
    STREAMING = 'streaming', // New stage specifically for streaming content
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
    const [isStreaming, setIsStreaming] = useState(false);

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

    // Effect for initial progress based on API stage
    useEffect(() => {
        if (apiStage === ApiStage.IDLE) {
            setProgress(0);
            setCurrentStep(0);
            setIsStreaming(false);
        } else if (apiStage === ApiStage.PREPARING) {
            setProgress(15);
            setCurrentStep(0);
            setIsStreaming(false);
        } else if (apiStage === ApiStage.REQUESTING) {
            setProgress(30);
            setIsStreaming(false);
        } else if (apiStage === ApiStage.STREAMING) {
            setProgress(75);
            setIsStreaming(true);
        } else if (apiStage === ApiStage.COMPLETED) {
            setProgress(100);
            setIsStreaming(false);
        } else if (apiStage === ApiStage.ERROR) {
            setIsStreaming(false);
        }
    }, [apiStage]);

    // Effect for cycling thinking steps and their associated progress
    useEffect(() => {
        let thinkingInterval: NodeJS.Timeout | undefined;

        // Only run thinking animation if we're processing but not streaming yet
        if (isLoading && apiStage === ApiStage.PROCESSING && !isStreaming) {
            const thinkingStepsLength = thinkingSteps.length;
            const baseProgress = 30;
            const thinkingProgressRange = 45;

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
    }, [isLoading, apiStage, isStreaming, currentStep]);

    const handleChange = (field: string, value: any) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setCurrentStep(0);
        setApiStage(ApiStage.PREPARING);
        setMarkdown('');

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
                throw new Error(`Failed to generate interview: ${response.status}`);
            }

            // Switch to processing stage for the thinking animation
            setApiStage(ApiStage.PROCESSING);

            // Give time for the thinking animation to cycle through steps
            // This is essential for the thinking steps to be visible
            await new Promise(resolve => setTimeout(resolve, 8000));

            // Now switch to streaming mode
            setApiStage(ApiStage.STREAMING);

            // Get the reader from the response body
            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('Failed to get response stream reader');
            }

            const decoder = new TextDecoder();
            let accumulatedMarkdown = '';
            let chunkCount = 0;

            // Start collecting chunks
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                // Decode the chunk and append to our accumulator
                const chunk = decoder.decode(value, { stream: true });
                accumulatedMarkdown += chunk;
                chunkCount++;

                // Immediately update markdown as we receive chunks
                // This ensures the typewriter-like effect during streaming
                setMarkdown(prevMarkdown => prevMarkdown + chunk);

                // Force a small delay to allow the UI to render between chunks
                // This makes the typewriter effect more visible
                await new Promise(resolve => setTimeout(resolve, 50));

                // Update progress based on chunk size and count
                // Calculate the progress to go from 75% to 95% during streaming
                // This reserves the last 5% for completion
                const streamingStartProgress = 75;
                const streamingEndProgress = 95;
                const streamingRange = streamingEndProgress - streamingStartProgress;

                // Estimate total chunks (usually between 20-30)
                const estimatedTotalChunks = 25;
                const chunkProgress = (chunkCount / estimatedTotalChunks) * streamingRange;

                // Ensure progress doesn't exceed the end value
                const newProgress = Math.min(streamingStartProgress + chunkProgress, streamingEndProgress);
                setProgress(newProgress);
            }

            // Mark as complete
            setApiStage(ApiStage.COMPLETED);
            setProgress(100);

            // Final decoder flush
            const finalChunk = decoder.decode();
            if (finalChunk) {
                // Also update the UI with the final chunk
                setMarkdown(prevMarkdown => prevMarkdown + finalChunk);
            }
        } catch (err) {
            console.error('Interview generation error:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setApiStage(ApiStage.ERROR);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
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
        loadingBoxRef,
        apiStage,
        progress,
        copied,
        handleChange,
        handleSubmit,
        saveToFile,
        populateTestData,
        applyPreset,
        copyToClipboard,
        thinkingSteps
    };
}; 