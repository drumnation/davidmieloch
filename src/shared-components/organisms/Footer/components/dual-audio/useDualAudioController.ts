import { useState, useRef, MutableRefObject, useCallback, useEffect } from 'react';
import { AudioMode, AudioTrack, DualAudioControllerState, DualAudioControllerActions, DualAudioContextType } from './DualAudio.types';
import { useVoiceTrackLoader } from './useVoiceTrackLoader';
import { musicPlaylist } from './playlists/musicPlaylist';
import { usePathname } from 'next/navigation';
import { voiceTracks } from './playlists/voiceTracks';

// Add refs to the context type
export type DualAudioContextTypeWithRefs = DualAudioContextType & {
    musicAudioRef: MutableRefObject<HTMLAudioElement | null>;
    voiceAudioRef: MutableRefObject<HTMLAudioElement | null>;
};

const DUCK_VOLUME = 0.2; // Volume level for music when voice is playing
const FULL_VOLUME = 1; // Assuming default full volume is 1

export function useDualAudioController(): DualAudioContextTypeWithRefs {
    // Mode state
    // const [mode, setMode] = useState<AudioMode>(AudioMode.BOTH); // Removed mode
    const [isMusicEnabled, setIsMusicEnabled] = useState(true); // Default true
    const [isNarrationEnabled, setIsNarrationEnabled] = useState(true); // Default true

    // Music state
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [activeMusicTrack, setActiveMusicTrack] = useState<AudioTrack | null>(null);
    const [musicCurrentTime, setMusicCurrentTime] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0);
    const [musicVolume, setMusicVolume] = useState(FULL_VOLUME); // Use constant
    const [isMusicMuted, setIsMusicMuted] = useState(false);
    const [isMusicLooping, setIsMusicLooping] = useState(true); // Add looping state
    const musicTargetVolumeRef = useRef(FULL_VOLUME); // Store the user-set volume

    // Error states
    const [musicError, setMusicError] = useState<string | null>(null);
    const [voiceError, setVoiceError] = useState<string | null>(null);

    // Voice state
    const [isVoicePlaying, setIsVoicePlaying] = useState(false);
    const [activeVoiceTrack, setActiveVoiceTrack] = useState<AudioTrack | null>(null);
    const [voiceCurrentTime, setVoiceCurrentTime] = useState(0);
    const [voiceDuration, setVoiceDuration] = useState(0);
    const [voiceVolume, setVoiceVolume] = useState(FULL_VOLUME); // Use constant
    const [isVoiceMuted, setIsVoiceMuted] = useState(false);

    // Audio elements
    const musicAudioRef = useRef<HTMLAudioElement | null>(null);
    const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
    const [isAudioReady, setIsAudioReady] = useState(false); // State to track ref readiness

    // --- Ducking Logic --- 
    const applyMusicVolume = useCallback((targetVolume: number) => {
        if (musicAudioRef.current) {
            musicAudioRef.current.volume = targetVolume;
            setMusicVolume(targetVolume); // Update state for UI
            setIsMusicMuted(targetVolume === 0); // Update mute state based on actual volume
        }
    }, []);

    // Effect to handle ducking when voice starts/stops in BOTH mode
    useEffect(() => {
        // Ducking only applies if both are enabled
        if (isMusicEnabled && isNarrationEnabled) {
            if (isVoicePlaying) {
                applyMusicVolume(DUCK_VOLUME); // Duck music
            } else {
                applyMusicVolume(musicTargetVolumeRef.current); // Restore user-set volume
            }
        }
    }, [isVoicePlaying, isMusicEnabled, isNarrationEnabled, applyMusicVolume]);

    // Helper function to handle audio playback errors
    const handleAudioError = useCallback((errorType: 'music' | 'voice', error: Error) => {
        const errorMsg = error.message || 'Unknown error occurred';
        const errorCode = (error as any).code; // Type assertion for potential error code

        // Log the error for debugging
        console.error(`Error playing ${errorType} audio:`, error);

        // Set appropriate error state
        if (errorType === 'music') {
            setMusicError(errorMsg);
            // Update UI state to reflect error
            setIsMusicPlaying(false);
        } else {
            setVoiceError(errorMsg);
            // Update UI state to reflect error
            setIsVoicePlaying(false);
        }

        // Handle common error scenarios
        if (errorMsg.includes('play() failed') || errorMsg.includes('user didn\'t interact')) {
            // Likely an autoplay restriction issue
            console.warn(`${errorType} playback requires user interaction due to browser policies`);
            // Could notify the UI to show a "click to play" button
        } else if (errorMsg.includes('network') || errorMsg.includes('fetch') || errorCode === 2) {
            // Network error or file not found
            console.warn(`Could not load ${errorType} file. Check network connection and file path`);
        }
    }, []);

    // Actions
    const playMusic = useCallback(() => {
        // Clear any previous errors when attempting to play
        setMusicError(null);

        // Only play if music is enabled
        if (!isMusicEnabled) {
            console.log('[Controller] playMusic called but music is disabled.');
            return;
        }

        if (musicAudioRef.current) {
            musicAudioRef.current.play()
                .then(() => {
                    setIsMusicPlaying(true);
                })
                .catch(error => {
                    handleAudioError('music', error);
                });
        }
    }, [handleAudioError, isMusicEnabled]);

    const pauseMusic = useCallback(() => {
        console.log('[Controller] pauseMusic called');
        musicAudioRef.current?.pause();
        setIsMusicPlaying(false);
    }, []);

    const seekMusic = useCallback((seconds: number) => {
        if (musicAudioRef.current) {
            try {
                const clampedTime = Math.min(Math.max(0, seconds), musicDuration);
                musicAudioRef.current.currentTime = clampedTime;
                setMusicCurrentTime(clampedTime);
            } catch (error) {
                console.error('Error seeking music:', error);
                // Some browsers restrict seeking if the media isn't fully loaded
                if (error instanceof Error && error.message.includes('loaded')) {
                    // Could notify user that media is still loading
                }
            }
        }
    }, [musicDuration]);

    // Update this to store the target volume for ducking
    const setMusicVolumeHandler = useCallback((volume: number) => {
        const clampedVolume = Math.min(Math.max(0, volume), 1);
        musicTargetVolumeRef.current = clampedVolume; // Store user's intended volume
        // Apply volume only if music is enabled AND (not ducked or narration disabled)
        if (isMusicEnabled && (!isNarrationEnabled || !isVoicePlaying)) {
            applyMusicVolume(clampedVolume);
        }
    }, [isMusicEnabled, isNarrationEnabled, isVoicePlaying, applyMusicVolume]);

    const playVoice = useCallback(() => {
        // Clear any previous errors when attempting to play
        setVoiceError(null);

        // Only play if narration is enabled
        if (!isNarrationEnabled) {
            console.log('[Controller] playVoice called but narration is disabled.');
            return;
        }

        console.log('[Controller] Attempting playVoice. ActiveVoiceTrack:', activeVoiceTrack, 'Ref:', !!voiceAudioRef.current);

        if (voiceAudioRef.current && activeVoiceTrack) {
            // If we're in BOTH mode, ensure music is playing first to get proper ducking
            if (isMusicEnabled && isNarrationEnabled && !isMusicPlaying && activeMusicTrack) {
                console.log('Voice playback: Ensuring music is playing first in BOTH mode');
                // Start music playback first
                try {
                    musicAudioRef.current?.play()
                        .then(() => {
                            setIsMusicPlaying(true);
                            // Now play voice after ensuring music is playing
                            setTimeout(() => {
                                voiceAudioRef.current?.play()
                                    .then(() => {
                                        setIsVoicePlaying(true);
                                    })
                                    .catch(error => {
                                        handleAudioError('voice', error);
                                    });
                            }, 50); // Small delay to ensure music starts first
                        })
                        .catch(error => {
                            handleAudioError('music', error);
                            // Still try to play voice even if music failed
                            voiceAudioRef.current?.play()
                                .then(() => {
                                    setIsVoicePlaying(true);
                                })
                                .catch(voiceError => {
                                    handleAudioError('voice', voiceError);
                                });
                        });
                } catch (error) {
                    console.error('Error starting music before voice in BOTH mode:', error);
                    // Still try to play voice even if music failed
                    voiceAudioRef.current?.play()
                        .then(() => {
                            setIsVoicePlaying(true);
                        })
                        .catch(error => {
                            handleAudioError('voice', error);
                        });
                }
            } else {
                // Normal voice playback (not in BOTH mode or music already playing)
                console.log('[Controller] Calling voiceAudioRef.current.play() for track:', activeVoiceTrack?.src);
                voiceAudioRef.current.play()
                    .then(() => {
                        console.log('[Controller] voiceAudioRef.current.play() resolved.');
                        setIsVoicePlaying(true);
                    })
                    .catch(error => {
                        console.error('[Controller] voiceAudioRef.current.play() rejected:', error);
                        handleAudioError('voice', error);
                    });
            }
        } else {
            console.warn('[Controller] playVoice called but ref or activeVoiceTrack is missing.');
            if (!activeVoiceTrack) setVoiceError('No voice track loaded for this page.');
        }
    }, [handleAudioError, isMusicEnabled, isNarrationEnabled, isMusicPlaying, activeMusicTrack, musicAudioRef, activeVoiceTrack]);

    const pauseVoice = useCallback(() => {
        voiceAudioRef.current?.pause();
        setIsVoicePlaying(false);
    }, []);

    const seekVoice = useCallback((seconds: number) => {
        if (voiceAudioRef.current) {
            try {
                const clampedTime = Math.min(Math.max(0, seconds), voiceDuration);
                voiceAudioRef.current.currentTime = clampedTime;
                setVoiceCurrentTime(clampedTime);
            } catch (error) {
                console.error('Error seeking voice:', error);
                // Handle potential seeking errors
            }
        }
    }, [voiceDuration]);

    const setVoiceVolumeHandler = useCallback((volume: number) => {
        if (voiceAudioRef.current) {
            const clampedVolume = Math.min(Math.max(0, volume), 1);
            // Only apply volume if narration is enabled
            if (isNarrationEnabled) {
                voiceAudioRef.current.volume = clampedVolume;
                setVoiceVolume(clampedVolume);
                setIsVoiceMuted(clampedVolume === 0);
            }
        }
    }, [isNarrationEnabled]); // Add dependency

    // Add function to toggle music looping
    const toggleMusicLooping = useCallback(() => {
        setIsMusicLooping(prev => !prev);
    }, []);

    const loadMusicTrack = useCallback(async (track: AudioTrack) => {
        console.log(`[Controller] loadMusicTrack called for track: ${track.id}. Current src: ${musicAudioRef.current?.src}`);
        const audio = musicAudioRef.current;
        if (!audio) {
            console.warn('[Controller] loadMusicTrack called but musicAudioRef is null!');
            return;
        }

        try {
            setMusicError(null);
            const currentSrc = audio.src.replace(window.location.origin, '');
            console.log(`[Controller] loadMusicTrack Check: track.src = ${track.src}, currentSrc = ${currentSrc}, src_differs = ${track.src !== currentSrc}`);

            if (track.src !== currentSrc) {
                console.log('[Controller] loadMusicTrack: Source differs. Pausing...');
                pauseMusic(); // Call pause first
                await new Promise(res => setTimeout(res, 50)); // Short delay to ensure pause takes effect

                console.log(`[Controller] Setting state and loading new track src: ${track.src}`);
                setActiveMusicTrack(track); // Set state after pause
                setMusicCurrentTime(0);
                setMusicDuration(0);
                console.log(`[Controller] setActiveMusicTrack called with track: ${track.id}`);

                console.log(`[Controller] Setting src to ${track.src} and calling load()`);
                audio.src = track.src;
                audio.load(); // Triggers 'loadedmetadata' eventually via main listener

                // Apply volume after setting src/load
                // Apply volume only if music is enabled and potentially ducked
                const targetVol = (isMusicEnabled && isNarrationEnabled && isVoicePlaying) ? DUCK_VOLUME : musicTargetVolumeRef.current;
                applyMusicVolume(targetVol);

                // Play after load is initiated (metadata listener will update duration)
                console.log(`[Controller] Calling playMusic() after load initiated for track: ${track.id}`);
                playMusic();

            } else {
                console.log('[Controller] loadMusicTrack: Source is the same. Ensuring playback state.');
                setActiveMusicTrack(track); // Ensure state is correct
                if (!isMusicPlaying) playMusic(); // If same track selected but wasn't playing, play it.
            }
        } catch (error) {
            console.error('Error loading music track:', error);
            if (error instanceof Error) {
                setMusicError(error.message);
            }
        }
    }, [pauseMusic, applyMusicVolume, isMusicEnabled, isNarrationEnabled, isVoicePlaying, playMusic, isMusicPlaying]);

    const loadVoiceTrack = useCallback((track: AudioTrack | null) => {
        console.log('[Controller] loadVoiceTrack called with:', track);
        if (voiceAudioRef.current) {
            try {
                // Clear any previous errors
                setVoiceError(null);

                const currentSrc = voiceAudioRef.current.src.replace(window.location.origin, '');
                console.log(`[Controller] loadVoiceTrack Check: track exists = ${!!track}, track.src = ${track?.src}, currentSrc = ${currentSrc}, src_differs = ${track?.src !== currentSrc}`);

                if (track && track.src !== currentSrc) {
                    console.log('[Controller] loadVoiceTrack: Condition MET. Loading new track.');
                    pauseVoice();
                    setVoiceCurrentTime(0);
                    setVoiceDuration(0);

                    // Add error handler for the loading process
                    const errorHandler = () => {
                        const error = voiceAudioRef.current?.error;
                        if (error) {
                            const errorMessage = `Voice error (${error.code}): ${error.message}`;
                            setVoiceError(errorMessage);
                            console.error(errorMessage);
                        }
                    };

                    // Set up error handling
                    voiceAudioRef.current.onerror = errorHandler;

                    voiceAudioRef.current.src = track.src;
                    voiceAudioRef.current.load();
                    setActiveVoiceTrack(track);
                    console.log('[Controller] setActiveVoiceTrack called with:', track);
                    // Only apply if narration is enabled
                    if (isNarrationEnabled) {
                        setVoiceVolumeHandler(voiceVolume);
                    }
                } else if (!track && voiceAudioRef.current.hasAttribute('src') && voiceAudioRef.current.src !== '') {
                    console.log('[Controller] Clearing existing voice track source.');
                    pauseVoice();
                    voiceAudioRef.current.removeAttribute('src');
                    voiceAudioRef.current.load(); // Need to call load() after removing src
                    setActiveVoiceTrack(null); // Re-add state update
                    setVoiceCurrentTime(0); // Re-add state update
                    setVoiceDuration(0); // Re-add state update
                    console.log('[Controller] setActiveVoiceTrack called with null.'); // Re-add log
                } else {
                    console.log('[Controller] loadVoiceTrack: Condition NOT MET to load or clear track.');
                }
            } catch (error) {
                console.error('Error loading voice track:', error);
                if (error instanceof Error) {
                    setVoiceError(error.message);
                }
            }
        } else {
            console.warn('[Controller] loadVoiceTrack called but voiceAudioRef is null!')
        }
    }, [pauseVoice, setVoiceVolumeHandler, isNarrationEnabled, voiceVolume]);

    // Function to play next track in playlist
    const playNextMusicTrack = useCallback(() => {
        if (!activeMusicTrack) return;

        try {
            // Find current track index in playlist
            const currentIndex = musicPlaylist.findIndex(track => track.id === activeMusicTrack.id);
            if (currentIndex === -1) {
                console.warn('Current music track not found in playlist');
                return;
            }

            // Get next track index (with looping)
            const nextIndex = isMusicLooping
                ? (currentIndex + 1) % musicPlaylist.length // Loop back to first track if at end
                : currentIndex + 1; // Just move to next or stop if at end

            // If we have a next track to play
            if (nextIndex < musicPlaylist.length) {
                const nextTrack = musicPlaylist[nextIndex];
                loadMusicTrack(nextTrack);
                playMusic();
            } else {
                console.log('End of playlist reached and looping is disabled');
            }
        } catch (error) {
            console.error('Error playing next track:', error);
            if (error instanceof Error) {
                setMusicError(`Failed to play next track: ${error.message}`);
            }
        }
    }, [activeMusicTrack, isMusicLooping, loadMusicTrack, playMusic]);

    // --- Dynamic Voice Track Loading --- 
    useVoiceTrackLoader(loadVoiceTrack, isAudioReady);

    // --- Audio Event Listeners --- 
    useEffect(() => {
        const musicAudio = musicAudioRef.current;
        const voiceAudio = voiceAudioRef.current;

        const handleMusicMetadata = () => musicAudio && setMusicDuration(musicAudio.duration);
        const handleVoiceMetadata = () => voiceAudio && setVoiceDuration(voiceAudio.duration);

        const handleMusicTimeUpdate = () => musicAudio && setMusicCurrentTime(musicAudio.currentTime);
        const handleVoiceTimeUpdate = () => voiceAudio && setVoiceCurrentTime(voiceAudio.currentTime);

        const handleMusicEnded = () => {
            setIsMusicPlaying(false);
            // Auto-advance to the next track in the playlist
            playNextMusicTrack();
        };

        const handleVoiceEnded = () => {
            setIsVoicePlaying(false);

            // If music is still enabled, restore its volume
            if (isMusicEnabled) {
                console.log('[Controller] Voice ended, restoring music volume.');
                applyMusicVolume(musicTargetVolumeRef.current);
            }

            // We keep the active voice track reference so user can replay it if desired
            // But we don't automatically clear or queue another voice track
        };

        // Audio error handling
        const handleMusicError = () => {
            if (musicAudio && musicAudio.error) {
                const errorCode = musicAudio.error.code;
                const errorMsg = musicAudio.error.message || `Audio error code: ${errorCode}`;
                setMusicError(errorMsg);
                console.error('Music player error:', errorMsg);
            }
        };

        const handleVoiceError = () => {
            if (voiceAudio && voiceAudio.error) {
                const errorCode = voiceAudio.error.code;
                const errorMsg = voiceAudio.error.message || `Audio error code: ${errorCode}`;
                setVoiceError(errorMsg);
                console.error('Voice player error:', errorMsg);
            }
        };

        // Add listeners
        musicAudio?.addEventListener('loadedmetadata', handleMusicMetadata);
        musicAudio?.addEventListener('timeupdate', handleMusicTimeUpdate);
        musicAudio?.addEventListener('ended', handleMusicEnded);
        musicAudio?.addEventListener('error', handleMusicError);

        voiceAudio?.addEventListener('loadedmetadata', handleVoiceMetadata);
        voiceAudio?.addEventListener('timeupdate', handleVoiceTimeUpdate);
        voiceAudio?.addEventListener('ended', handleVoiceEnded);
        voiceAudio?.addEventListener('error', handleVoiceError);

        // Cleanup
        return () => {
            musicAudio?.removeEventListener('loadedmetadata', handleMusicMetadata);
            musicAudio?.removeEventListener('timeupdate', handleMusicTimeUpdate);
            musicAudio?.removeEventListener('ended', handleMusicEnded);
            musicAudio?.removeEventListener('error', handleMusicError);

            voiceAudio?.removeEventListener('loadedmetadata', handleVoiceMetadata);
            voiceAudio?.removeEventListener('timeupdate', handleVoiceTimeUpdate);
            voiceAudio?.removeEventListener('ended', handleVoiceEnded);
            voiceAudio?.removeEventListener('error', handleVoiceError);
        };
    }, [applyMusicVolume, musicTargetVolumeRef, playNextMusicTrack, isMusicEnabled]);

    // --- Effect for Initial Load & Ref Readiness --- 
    const pathname = usePathname(); // Get current path
    useEffect(() => {
        // This effect runs when the component mounts and refs are potentially assigned
        if (musicAudioRef.current && voiceAudioRef.current && !isAudioReady) {
            console.log('[Controller] Audio refs are ready. Performing initial load.');
            setIsAudioReady(true); // Signal readiness

            // Perform initial music load (if needed)
            if (!activeMusicTrack && musicPlaylist.length > 0) {
                console.log('[Controller] Loading initial music track.');
                loadMusicTrack(musicPlaylist[0]);
            }

            // Perform initial voice load
            const path = pathname;
            let pageSlug = path.replace(/^\/|\/$/g, '');
            if (pageSlug === '') {
                pageSlug = 'home';
            }
            const initialVoiceTrack = voiceTracks.find((track: AudioTrack) => track.id === pageSlug);
            console.log(`[Controller] Initial voice track check for path: ${path}, slug: ${pageSlug}. Found:`, initialVoiceTrack ? initialVoiceTrack.id : 'None');
            if (initialVoiceTrack) {
                loadVoiceTrack(initialVoiceTrack);
            } else {
                loadVoiceTrack(null); // Ensure voice is cleared if no initial match
            }
        }
        // Rerun if path changes *before* refs are ready (though unlikely needed)
        // Also rerun if refs change (e.g. conditional rendering, though not used here) 
    }, [pathname, musicAudioRef, voiceAudioRef, isAudioReady, loadMusicTrack, loadVoiceTrack, activeMusicTrack]);

    // --- Toggle Logic --- 
    const toggleMusic = useCallback(() => {
        setIsMusicEnabled(prev => {
            const newState = !prev;
            // Prevent disabling both
            if (!newState && !isNarrationEnabled) {
                setIsNarrationEnabled(true);
                playVoice(); // Auto-play narration if it was re-enabled
            }
            // Pause/play music based on new state
            if (!newState) {
                pauseMusic();
            } else if (activeMusicTrack) {
                playMusic(); // Auto-play if enabled and track exists
            }
            return newState;
        });
    }, [isNarrationEnabled, pauseMusic, playMusic, playVoice, activeMusicTrack]);

    const toggleNarration = useCallback(() => {
        setIsNarrationEnabled(prev => {
            const newState = !prev;
            // Prevent disabling both
            if (!newState && !isMusicEnabled) {
                setIsMusicEnabled(true);
                playMusic(); // Auto-play music if it was re-enabled
            }
            // Pause/play voice based on new state
            if (!newState) {
                pauseVoice();
                // If music is playing, restore its volume when voice is disabled
                if (isMusicEnabled) applyMusicVolume(musicTargetVolumeRef.current);
            } else if (activeVoiceTrack) {
                playVoice(); // Auto-play if enabled and track exists
            }
            return newState;
        });
    }, [isMusicEnabled, pauseVoice, playVoice, playMusic, activeVoiceTrack, applyMusicVolume]);

    return {
        // State
        isMusicPlaying,
        isVoicePlaying,
        activeMusicTrack,
        activeVoiceTrack,
        musicCurrentTime,
        voiceCurrentTime,
        musicDuration,
        voiceDuration,
        musicVolume,
        voiceVolume,
        isMusicMuted,
        isVoiceMuted,
        isMusicLooping,
        musicError,
        voiceError,
        isMusicEnabled,
        isNarrationEnabled,

        // Actions
        playMusic,
        pauseMusic,
        seekMusic,
        setMusicVolume: setMusicVolumeHandler,
        playVoice,
        pauseVoice,
        seekVoice,
        setVoiceVolume: setVoiceVolumeHandler,
        loadMusicTrack,
        loadVoiceTrack,
        toggleMusicLooping,
        playNextMusicTrack,
        toggleMusic,
        toggleNarration,

        // Refs
        musicAudioRef,
        voiceAudioRef,
    };
} 