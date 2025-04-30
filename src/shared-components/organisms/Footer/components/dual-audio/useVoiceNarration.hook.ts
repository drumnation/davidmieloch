import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioTrack } from './DualAudio.types';
import { useVoiceTrackLoader } from './useVoiceTrackLoader';
import { handleAudioError } from './useDualAudioController.logic';

const FULL_VOLUME = 1;

export function useVoiceNarration() {
    // State for voice narration
    const [isNarrationEnabled, setIsNarrationEnabled] = useState(true);
    const [isVoicePlaying, setIsVoicePlaying] = useState(false);
    const [activeVoiceTrack, setActiveVoiceTrack] = useState<AudioTrack | null>(null);
    const [voiceCurrentTime, setVoiceCurrentTime] = useState(0);
    const [voiceDuration, setVoiceDuration] = useState(0);
    const [voiceVolume, setVoiceVolume] = useState(FULL_VOLUME);
    const [isVoiceMuted, setIsVoiceMuted] = useState(false);
    const [voiceError, setVoiceError] = useState<string | null>(null);
    const [isAudioReady, setIsAudioReady] = useState(false);

    // Reference to the audio element
    const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize voice narration
    useEffect(() => {
        console.log('[DEBUG] Audio initialization check:', {
            hasAudioRef: !!voiceAudioRef.current,
            currentIsAudioReady: isAudioReady
        });

        if (voiceAudioRef.current) {
            console.log('[DEBUG] Setting audio ready to true');
            setIsAudioReady(true);
        }
    }, [voiceAudioRef.current]);

    // Play voice narration
    const playVoice = useCallback(() => {
        console.log('[DEBUG] playVoice called with:', {
            isNarrationEnabled,
            hasAudioRef: !!voiceAudioRef.current,
            activeVoiceTrack,
            audioSrc: voiceAudioRef.current?.src
        });

        setVoiceError(null);
        if (!isNarrationEnabled) {
            console.log('[DEBUG] Narration is disabled, returning early');
            return;
        }

        if (voiceAudioRef.current && activeVoiceTrack) {
            console.log('[DEBUG] Attempting to play voice track:', activeVoiceTrack.title);
            voiceAudioRef.current.play()
                .then(() => {
                    console.log('[DEBUG] Voice playback started successfully');
                    setIsVoicePlaying(true);
                })
                .catch(error => {
                    console.error('[DEBUG] Voice playback error:', error);
                    handleAudioError(
                        'voice',
                        error,
                        () => { }, // We don't need music error here
                        setVoiceError,
                        () => { }, // We don't need music playing state here
                        setIsVoicePlaying
                    );
                });
        } else {
            if (!activeVoiceTrack) {
                console.log('[DEBUG] No voice track loaded for this page');
                setVoiceError('No voice track loaded for this page.');
            }
            if (!voiceAudioRef.current) {
                console.log('[DEBUG] No audio element reference available');
            }
        }
    }, [isNarrationEnabled, activeVoiceTrack]);

    // Pause voice narration
    const pauseVoice = useCallback(() => {
        if (voiceAudioRef.current) {
            voiceAudioRef.current.pause();
            setIsVoicePlaying(false);
        }
    }, []);

    // Seek to a specific time in voice narration
    const seekVoice = useCallback((seconds: number) => {
        if (voiceAudioRef.current) {
            try {
                const clampedTime = Math.min(Math.max(0, seconds), voiceDuration);
                voiceAudioRef.current.currentTime = clampedTime;
                setVoiceCurrentTime(clampedTime);
            } catch (error) {
                // Ignore seek errors
            }
        }
    }, [voiceDuration]);

    // Set voice volume
    const setVoiceVolumeHandler = useCallback((volume: number) => {
        if (voiceAudioRef.current) {
            const clampedVolume = Math.min(Math.max(0, volume), 1);
            if (isNarrationEnabled) {
                voiceAudioRef.current.volume = clampedVolume;
                setVoiceVolume(clampedVolume);
                setIsVoiceMuted(clampedVolume === 0);
            }
        }
    }, [isNarrationEnabled]);

    // Load voice track
    const loadVoiceTrack = useCallback((track: AudioTrack | null) => {
        console.log('[DEBUG] loadVoiceTrack called with track:', track);

        if (voiceAudioRef.current) {
            try {
                setVoiceError(null);
                const currentSrc = voiceAudioRef.current.src.replace(window.location.origin, '');

                if (track && track.src !== currentSrc) {
                    console.log('[DEBUG] Loading new voice track:', track.title, track.src);
                    pauseVoice();
                    setVoiceCurrentTime(0);
                    setVoiceDuration(0);

                    const errorHandler = () => {
                        const error = voiceAudioRef.current?.error;
                        if (error) {
                            console.error('[DEBUG] Voice audio error:', error);
                            const errorMessage = `Voice error (${error.code}): ${error.message}`;
                            setVoiceError(errorMessage);
                        }
                    };

                    voiceAudioRef.current.onerror = errorHandler;
                    voiceAudioRef.current.src = track.src;
                    voiceAudioRef.current.load();
                    setActiveVoiceTrack(track);

                    if (isNarrationEnabled) {
                        setVoiceVolumeHandler(voiceVolume);
                    }
                } else if (!track && voiceAudioRef.current.hasAttribute('src') && voiceAudioRef.current.src !== '') {
                    console.log('[DEBUG] Clearing voice track');
                    pauseVoice();
                    voiceAudioRef.current.removeAttribute('src');
                    voiceAudioRef.current.load();
                    setActiveVoiceTrack(null);
                    setVoiceCurrentTime(0);
                    setVoiceDuration(0);
                }
            } catch (error) {
                console.error('[DEBUG] Error in loadVoiceTrack:', error);
                if (error instanceof Error) setVoiceError(error.message);
            }
        } else {
            console.log('[DEBUG] No audio element reference in loadVoiceTrack');
        }
    }, [pauseVoice, setVoiceVolumeHandler, isNarrationEnabled, voiceVolume]);

    // Set up event listeners for voice playback
    useEffect(() => {
        const voiceAudio = voiceAudioRef.current;
        if (!voiceAudio) return;

        const handleVoiceMetadata = () => {
            if (voiceAudio) setVoiceDuration(voiceAudio.duration);
        };

        const handleVoiceTimeUpdate = () => {
            if (voiceAudio) setVoiceCurrentTime(voiceAudio.currentTime);
        };

        const handleVoiceEnded = () => {
            setIsVoicePlaying(false);
        };

        const handleVoiceError = () => {
            const error = voiceAudio.error;
            if (error) {
                console.error('[DEBUG] Voice audio error event:', error);
                const errorMessage = `Voice error (${error.code}): ${error.message}`;
                setVoiceError(errorMessage);
                setIsVoicePlaying(false);
            }
        };

        voiceAudio.addEventListener('loadedmetadata', handleVoiceMetadata);
        voiceAudio.addEventListener('timeupdate', handleVoiceTimeUpdate);
        voiceAudio.addEventListener('ended', handleVoiceEnded);
        voiceAudio.addEventListener('error', handleVoiceError);

        return () => {
            voiceAudio.removeEventListener('loadedmetadata', handleVoiceMetadata);
            voiceAudio.removeEventListener('timeupdate', handleVoiceTimeUpdate);
            voiceAudio.removeEventListener('ended', handleVoiceEnded);
            voiceAudio.removeEventListener('error', handleVoiceError);
        };
    }, []);

    // Use the voice track loader to load tracks based on the route
    useVoiceTrackLoader(loadVoiceTrack, isAudioReady);

    // Toggle narration on/off
    const toggleNarration = useCallback(() => {
        console.log('[DEBUG] toggleNarration called, current value:', isNarrationEnabled);
        setIsNarrationEnabled(prev => !prev);
    }, [isNarrationEnabled]);

    return {
        // References
        voiceAudioRef,

        // State
        isNarrationEnabled,
        isVoicePlaying,
        activeVoiceTrack,
        voiceCurrentTime,
        voiceDuration,
        voiceVolume,
        isVoiceMuted,
        voiceError,

        // Actions
        playVoice,
        pauseVoice,
        seekVoice,
        setVoiceVolume: setVoiceVolumeHandler,
        loadVoiceTrack,
        toggleNarration,
    };
} 