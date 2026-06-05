import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioMode, AudioTrack, DualAudioControllerState, DualAudioControllerActions, DualAudioContextType, DualAudioContextTypeWithRefs } from './DualAudio.types';
import { useVoiceTrackLoader } from './useVoiceTrackLoader';
import { musicPlaylist } from './playlists/musicPlaylist';
import { usePathname } from 'next/navigation';
import { voiceTracks } from './playlists/voiceTracks';
import { handleAudioError, getNextMusicTrack } from './useDualAudioController.logic';
import { getVoiceTrackIdFromPathname } from './voiceTrackRouting';

const FULL_VOLUME = 1;

export function useDualAudioController(): DualAudioContextTypeWithRefs {
    const [isMusicEnabled, setIsMusicEnabled] = useState(true);
    const [isNarrationEnabled, setIsNarrationEnabled] = useState(true);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [activeMusicTrack, setActiveMusicTrack] = useState<AudioTrack | null>(null);
    const [musicCurrentTime, setMusicCurrentTime] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0);
    const [musicVolume, setMusicVolume] = useState(FULL_VOLUME);
    const [isMusicMuted, setIsMusicMuted] = useState(false);
    const [isMusicLooping, setIsMusicLooping] = useState(true);
    const musicTargetVolumeRef = useRef(FULL_VOLUME);
    const [musicError, setMusicError] = useState<string | null>(null);
    const [voiceError, setVoiceError] = useState<string | null>(null);
    const [isVoicePlaying, setIsVoicePlaying] = useState(false);
    const [activeVoiceTrack, setActiveVoiceTrack] = useState<AudioTrack | null>(null);
    const [voiceCurrentTime, setVoiceCurrentTime] = useState(0);
    const [voiceDuration, setVoiceDuration] = useState(0);
    const [voiceVolume, setVoiceVolume] = useState(FULL_VOLUME);
    const [isVoiceMuted, setIsVoiceMuted] = useState(false);
    const musicAudioRef = useRef<HTMLAudioElement | null>(null);
    const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
    const voicePlaybackIntentRef = useRef(false);
    const [isAudioReady, setIsAudioReady] = useState(false);

    const applyMusicVolume = useCallback((targetVolume: number) => {
        if (musicAudioRef.current) {
            const clamped = Math.min(Math.max(0, targetVolume), 1);
            musicAudioRef.current.volume = clamped;
            setMusicVolume(clamped);
            setIsMusicMuted(clamped === 0);
        }
    }, []);

    useEffect(() => {
        const audio = musicAudioRef.current;
        if (!audio) return;
        const reapplyUserVolume = () => {
            applyMusicVolume(musicTargetVolumeRef.current);
        };
        audio.addEventListener('play', reapplyUserVolume);
        audio.addEventListener('loadedmetadata', reapplyUserVolume);
        return () => {
            audio.removeEventListener('play', reapplyUserVolume);
            audio.removeEventListener('loadedmetadata', reapplyUserVolume);
        };
    }, [musicAudioRef, applyMusicVolume]);

    const playMusic = useCallback(() => {
        setMusicError(null);
        if (!isMusicEnabled) return;
        if (musicAudioRef.current) {
            applyMusicVolume(musicTargetVolumeRef.current);
            musicAudioRef.current.play()
                .then(() => setIsMusicPlaying(true))
                .catch(error => handleAudioError('music', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
        }
    }, [isMusicEnabled, applyMusicVolume]);

    const pauseMusic = useCallback(() => {
        musicAudioRef.current?.pause();
        setIsMusicPlaying(false);
    }, []);

    const seekMusic = useCallback((seconds: number) => {
        if (musicAudioRef.current) {
            try {
                const clampedTime = Math.min(Math.max(0, seconds), musicDuration);
                musicAudioRef.current.currentTime = clampedTime;
                setMusicCurrentTime(clampedTime);
            } catch (error) { }
        }
    }, [musicDuration]);

    const setMusicVolumeHandler = useCallback((volume: number) => {
        const clampedVolume = Math.min(Math.max(0, volume), 1);
        musicTargetVolumeRef.current = clampedVolume;
        if (isMusicEnabled) {
            applyMusicVolume(clampedVolume);
        }
    }, [isMusicEnabled, applyMusicVolume]);

    const playVoice = useCallback(() => {
        setVoiceError(null);
        if (!isNarrationEnabled) return;
        if (voiceAudioRef.current && activeVoiceTrack) {
            voiceAudioRef.current.play()
                .then(() => {
                    voicePlaybackIntentRef.current = true;
                    setIsVoicePlaying(true);
                })
                .catch(error => handleAudioError('voice', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
        } else {
            if (!activeVoiceTrack) setVoiceError('No voice track loaded for this page.');
        }
    }, [isNarrationEnabled, activeVoiceTrack]);

    const pauseVoice = useCallback(() => {
        voicePlaybackIntentRef.current = false;
        voiceAudioRef.current?.pause();
        setIsVoicePlaying(false);
    }, []);

    const seekVoice = useCallback((seconds: number) => {
        if (voiceAudioRef.current) {
            try {
                const clampedTime = Math.min(Math.max(0, seconds), voiceDuration);
                voiceAudioRef.current.currentTime = clampedTime;
                setVoiceCurrentTime(clampedTime);
            } catch (error) { }
        }
    }, [voiceDuration]);

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

    const toggleMusicLooping = useCallback(() => {
        setIsMusicLooping(prev => !prev);
    }, []);

    const loadMusicTrack = useCallback(async (track: AudioTrack) => {
        const audio = musicAudioRef.current;
        if (!audio) return;
        try {
            setMusicError(null);

            const targetSrc = isVoicePlaying
                ? track.src.replace('/audio/music/', '/audio/music-ducked/')
                : track.src;

            const currentSrc = audio.src.replace(window.location.origin, '');

            if (targetSrc !== currentSrc) {
                const wasPlaying = !audio.paused;

                setIsMusicPlaying(false);

                setActiveMusicTrack(track);
                setMusicCurrentTime(0);
                setMusicDuration(0);

                console.log(`Loading NEW music track: ${targetSrc}`);
                audio.src = targetSrc;

                const handleCanPlay = () => {
                    console.log(`Track ${targetSrc} can play.`);
                    applyMusicVolume(musicTargetVolumeRef.current);

                    if (wasPlaying) {
                        console.log(`Autoplaying newly loaded track: ${targetSrc}`);
                        playMusic();
                    }
                    audio.removeEventListener('canplay', handleCanPlay);
                    audio.removeEventListener('error', handleLoadError);
                };

                const handleLoadError = (e: Event) => {
                    console.error(`Error loading audio source ${targetSrc}:`, e);
                    setMusicError(`Error loading audio: ${targetSrc}`);
                    audio.removeEventListener('canplay', handleCanPlay);
                    audio.removeEventListener('error', handleLoadError);
                };

                audio.addEventListener('canplay', handleCanPlay);
                audio.addEventListener('error', handleLoadError);

                audio.load();

            } else {
                setActiveMusicTrack(track);
                if (!isMusicPlaying) {
                    playMusic();
                }
            }
        } catch (error) {
            console.error("Error in loadMusicTrack:", error);
            if (error instanceof Error) setMusicError(error.message);
        }
    }, [
        musicAudioRef,
        isVoicePlaying,
        isMusicPlaying,
        applyMusicVolume,
        playMusic,
    ]);

    const loadVoiceTrack = useCallback((track: AudioTrack | null) => {
        if (voiceAudioRef.current) {
            try {
                setVoiceError(null);
                const audio = voiceAudioRef.current;
                const currentSrc = audio.src.replace(window.location.origin, '');
                const shouldResume = isNarrationEnabled && voicePlaybackIntentRef.current;
                if (track && track.src !== currentSrc) {
                    audio.pause();
                    setIsVoicePlaying(false);
                    setVoiceCurrentTime(0);
                    setVoiceDuration(0);
                    const errorHandler = () => {
                        const error = audio.error;
                        if (error) {
                            voicePlaybackIntentRef.current = false;
                            const errorMessage = `Voice error (${error.code}): ${error.message}`;
                            setVoiceError(errorMessage);
                        }
                        audio.removeEventListener('canplay', canPlayHandler);
                        audio.removeEventListener('error', errorHandler);
                    };
                    const canPlayHandler = () => {
                        if (shouldResume) {
                            audio.play()
                                .then(() => {
                                    voicePlaybackIntentRef.current = true;
                                    setIsVoicePlaying(true);
                                })
                                .catch(error => handleAudioError('voice', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
                        }
                        audio.removeEventListener('canplay', canPlayHandler);
                        audio.removeEventListener('error', errorHandler);
                    };
                    audio.addEventListener('canplay', canPlayHandler);
                    audio.addEventListener('error', errorHandler);
                    audio.src = track.src;
                    audio.load();
                    setActiveVoiceTrack(track);
                    if (isNarrationEnabled) setVoiceVolumeHandler(voiceVolume);
                } else if (!track && audio.hasAttribute('src') && audio.src !== '') {
                    pauseVoice();
                    audio.removeAttribute('src');
                    audio.load();
                    setActiveVoiceTrack(null);
                    setVoiceCurrentTime(0);
                    setVoiceDuration(0);
                }
            } catch (error) {
                if (error instanceof Error) setVoiceError(error.message);
            }
        }
    }, [
        isNarrationEnabled,
        isVoicePlaying,
        pauseVoice,
        setVoiceVolumeHandler,
        voiceVolume,
    ]);

    const playNextMusicTrack = useCallback(() => {
        const nextTrack = getNextMusicTrack(activeMusicTrack, isMusicLooping);
        if (nextTrack) {
            console.log("Playing next track:", nextTrack.title);
            loadMusicTrack(nextTrack);
        }
    }, [activeMusicTrack, isMusicLooping, loadMusicTrack]);

    useVoiceTrackLoader(loadVoiceTrack, isAudioReady);

    // Effect to handle live source swapping when narration state changes
    useEffect(() => {
        const audio = musicAudioRef.current;
        // Ensure this runs only client-side and conditions are met
        if (typeof window === 'undefined' || !audio || !activeMusicTrack || !isMusicEnabled || !isNarrationEnabled) {
            return;
        }

        // Determine the target URL based on current narration state
        const targetUrl = isVoicePlaying
            ? activeMusicTrack.src.replace('/audio/music/', '/audio/music-ducked/')
            : activeMusicTrack.src;

        // Normalize current URL (remove origin)
        let currentUrl = '';
        try {
            currentUrl = audio.src ? new URL(audio.src).pathname : '';
        } catch (e) {
            console.warn("Could not parse current audio src URL:", audio.src);
            currentUrl = audio.src; // Fallback if URL parsing fails
        }

        // Normalize target URL (assuming it's relative like /audio/...)
        const normalizedTargetUrl = targetUrl.startsWith('/') ? targetUrl : '/' + targetUrl;


        // Only swap if the target URL is different from the current one
        if (normalizedTargetUrl !== currentUrl) {
            console.log(`Live Swapping: Current=${currentUrl}, Target=${normalizedTargetUrl}`);
            const currentTime = audio.currentTime;
            const wasPlaying = !audio.paused;

            // Store previous src for error handling
            const previousSrc = audio.src;

            // Set the new source
            audio.src = targetUrl;

            const handleCanPlaySwap = () => {
                console.log(`Live Swap: ${targetUrl} ready.`);
                // Restore playback time
                // Check duration to prevent seeking past the end if the new track is shorter (shouldn't happen with identical files)
                if (currentTime < audio.duration) {
                    audio.currentTime = currentTime;
                } else {
                    // If somehow the saved time is beyond the new duration, seek to start
                    audio.currentTime = 0;
                }
                setMusicCurrentTime(audio.currentTime); // Update state

                // Resume playback if it was playing
                if (wasPlaying) {
                    audio.play().catch(e => {
                        console.error("Error resuming playback after live swap:", e);
                        setMusicError(`Playback error after swap: ${e}`);
                        // Optionally try to revert to previous source on error?
                    });
                }
                // Cleanup listeners
                audio.removeEventListener('canplay', handleCanPlaySwap);
                audio.removeEventListener('error', handleErrorSwap);
            };

            const handleErrorSwap = (e: Event) => {
                console.error(`Error loading swapped audio source ${targetUrl}. Current src was ${previousSrc}:`, e);
                setMusicError(`Error loading swapped audio: ${targetUrl}`);
                // Attempt to revert? Be cautious of loops.
                // audio.src = previousSrc; 
                // audio.load();
                // Consider just stopping or notifying user.

                // Cleanup listeners even on error
                audio.removeEventListener('canplay', handleCanPlaySwap);
                audio.removeEventListener('error', handleErrorSwap);
            };

            // Add listeners for the swap
            audio.addEventListener('canplay', handleCanPlaySwap);
            audio.addEventListener('error', handleErrorSwap);

            // Load the new source
            audio.load();
        }

    }, [isVoicePlaying, activeMusicTrack, isMusicEnabled, isNarrationEnabled, musicAudioRef]); // Add musicAudioRef

    useEffect(() => {
        const musicAudio = musicAudioRef.current;
        const voiceAudio = voiceAudioRef.current;
        const handleMusicMetadata = () => musicAudio && setMusicDuration(musicAudio.duration);
        const handleVoiceMetadata = () => voiceAudio && setVoiceDuration(voiceAudio.duration);
        const handleMusicTimeUpdate = () => musicAudio && setMusicCurrentTime(musicAudio.currentTime);
        const handleVoiceTimeUpdate = () => voiceAudio && setVoiceCurrentTime(voiceAudio.currentTime);
        const handleMusicEnded = () => {
            setIsMusicPlaying(false);
            playNextMusicTrack();
        };
        const handleVoiceEnded = () => {
            voicePlaybackIntentRef.current = false;
            setIsVoicePlaying(false);
            if (isMusicEnabled) applyMusicVolume(musicTargetVolumeRef.current);
        };
        const handleMusicError = () => {
            if (musicAudio && musicAudio.error) {
                const errorCode = musicAudio.error.code;
                const errorMsg = musicAudio.error.message || `Audio error code: ${errorCode}`;
                setMusicError(errorMsg);
            }
        };
        const handleVoiceError = () => {
            if (voiceAudio && voiceAudio.error) {
                const errorCode = voiceAudio.error.code;
                const errorMsg = voiceAudio.error.message || `Audio error code: ${errorCode}`;
                setVoiceError(errorMsg);
            }
        };
        musicAudio?.addEventListener('loadedmetadata', handleMusicMetadata);
        musicAudio?.addEventListener('timeupdate', handleMusicTimeUpdate);
        musicAudio?.addEventListener('ended', handleMusicEnded);
        musicAudio?.addEventListener('error', handleMusicError);
        voiceAudio?.addEventListener('loadedmetadata', handleVoiceMetadata);
        voiceAudio?.addEventListener('timeupdate', handleVoiceTimeUpdate);
        voiceAudio?.addEventListener('ended', handleVoiceEnded);
        voiceAudio?.addEventListener('error', handleVoiceError);
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

    const pathname = usePathname();
    useEffect(() => {
        if (musicAudioRef.current && voiceAudioRef.current && !isAudioReady) {
            setIsAudioReady(true);
            if (!activeMusicTrack && musicPlaylist.length > 0) {
                loadMusicTrack(musicPlaylist[0]);
            }
            if (pathname) {
                const pageSlug = getVoiceTrackIdFromPathname(pathname);
                const initialVoiceTrack = voiceTracks.find((track: AudioTrack) => track.id === pageSlug);
                if (initialVoiceTrack) {
                    loadVoiceTrack(initialVoiceTrack);
                } else {
                    loadVoiceTrack(null);
                }
            } else {
                loadVoiceTrack(null);
            }
        }
    }, [pathname, musicAudioRef, voiceAudioRef, isAudioReady, loadMusicTrack, loadVoiceTrack, activeMusicTrack]);

    const toggleMusic = useCallback(() => {
        setIsMusicEnabled(prev => {
            const newState = !prev;
            if (!newState && !isNarrationEnabled) {
                setIsNarrationEnabled(true);
                playVoice();
            }
            if (!newState) {
                pauseMusic();
            } else if (activeMusicTrack) {
                playMusic();
            }
            return newState;
        });
    }, [isNarrationEnabled, pauseMusic, playMusic, playVoice, activeMusicTrack]);

    const toggleNarration = useCallback(() => {
        setIsNarrationEnabled(prev => {
            const newState = !prev;
            if (!newState) {
                pauseVoice();
                if (isMusicEnabled) applyMusicVolume(musicTargetVolumeRef.current);
            } else {
                if (activeVoiceTrack) {
                    playVoice();
                }
            }
            return newState;
        });
    }, [isMusicEnabled, pauseVoice, playVoice, activeVoiceTrack, applyMusicVolume]);

    return {
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
        musicAudioRef,
        voiceAudioRef,
    };
}
