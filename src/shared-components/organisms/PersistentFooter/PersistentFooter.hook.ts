import { useEffect, useRef, useState } from 'react';
import { useDualAudio } from '../Footer/components/dual-audio/DualAudioContext';
import { CROSSFADE_DURATION, performAudioCrossfade } from './audioUtils';

export const useAudioCrossfade = () => {
    const {
        setDuckedMode,
        isVoicePlaying,
        isMusicEnabled,
        isMusicPlaying,
        musicVolume,
        activeMusicTrack,
        musicAudioRef,
    } = useDualAudio();

    // Track if we're currently crossfading
    const [isCrossfading, setIsCrossfading] = useState(false);
    // Store the last ducked state to detect changes
    const lastDuckedStateRef = useRef<boolean>(isVoicePlaying);
    // Reference to cleanup function
    const cleanupRef = useRef<(() => void) | null>(null);

    // Initialize crossfade when ducked state changes
    useEffect(() => {
        // Skip if conditions aren't right for crossfade
        const isClient = typeof window !== 'undefined';
        if (!isClient) return;

        const audio = musicAudioRef?.current;
        const isDesktop = window.innerWidth >= 768;

        if (
            !isDesktop ||
            !isMusicEnabled ||
            !isMusicPlaying ||
            !activeMusicTrack ||
            !audio ||
            !setDuckedMode || // Make sure setDuckedMode is available
            lastDuckedStateRef.current === isVoicePlaying ||
            isCrossfading
        ) {
            // Just update the last state reference without crossfading
            lastDuckedStateRef.current = isVoicePlaying;
            return;
        }

        // Start crossfade process
        setIsCrossfading(true);

        // Handle crossfade completion
        const onComplete = () => {
            setIsCrossfading(false);
            lastDuckedStateRef.current = isVoicePlaying;
        };

        // Create a safe wrapper for setDuckedMode
        const safeSetDuckedMode = (ducked: boolean) => {
            if (setDuckedMode) {
                setDuckedMode(ducked);
            }
        };

        // Use our utility function for safe crossfade
        cleanupRef.current = performAudioCrossfade(
            audio,
            isVoicePlaying,
            safeSetDuckedMode,
            musicVolume,
            onComplete
        );

        // Cleanup on unmount or when dependencies change
        return () => {
            if (cleanupRef.current) {
                cleanupRef.current();
                cleanupRef.current = null;
            }
        };
    }, [
        isVoicePlaying,
        isMusicEnabled,
        isMusicPlaying,
        activeMusicTrack,
        musicVolume,
        setDuckedMode,
        musicAudioRef,
        isCrossfading
    ]);

    return {
        isCrossfading
    };
}; 