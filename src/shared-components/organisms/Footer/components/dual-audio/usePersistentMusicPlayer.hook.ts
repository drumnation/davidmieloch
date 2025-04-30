import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectActiveMusicTrack,
    selectIsMusicEnabled,
    selectIsMusicLooping,
    selectIsMusicPlaying,
    selectMusicVolume,
    selectMusicCurrentTime,
    selectMusicDuration,
    selectMusicError,
    setActiveMusicTrack,
    setMusicCurrentTime,
    setMusicDuration,
    setMusicEnabled,
    setMusicError,
    setMusicLooping,
    setMusicPlaying,
    setMusicVolume,
    toggleMusicLooping
} from '@store/slices/audioSlice';
import { AudioTrack } from './DualAudio.types';
import { getNextMusicTrack, handleAudioError } from './useDualAudioController.logic';

const FULL_VOLUME = 1;

// Create a cache for preloaded audio elements
interface PreloadedAudio {
    normal: HTMLAudioElement;
    ducked: HTMLAudioElement;
    track: AudioTrack;
}

export function usePersistentMusicPlayer() {
    const dispatch = useDispatch();

    // References
    const musicAudioRef = useRef<HTMLAudioElement | null>(null);
    const musicTargetVolumeRef = useRef(FULL_VOLUME);
    const [isDuckedMode, setIsDuckedMode] = useState(false);
    const [isMusicMuted, setIsMusicMuted] = useState(false);

    // Audio preloading system
    const preloadCacheRef = useRef<Map<string, PreloadedAudio>>(new Map());
    const preloadedNextTrackRef = useRef<PreloadedAudio | null>(null);

    // Selectors
    const isMusicEnabled = useSelector(selectIsMusicEnabled);
    const isMusicPlaying = useSelector(selectIsMusicPlaying);
    const isMusicLooping = useSelector(selectIsMusicLooping);
    const activeMusicTrack = useSelector(selectActiveMusicTrack);
    const musicVolume = useSelector(selectMusicVolume);
    const musicCurrentTime = useSelector(selectMusicCurrentTime);
    const musicDuration = useSelector(selectMusicDuration);
    const musicError = useSelector(selectMusicError);

    // Apply volume to the audio element
    const applyMusicVolume = useCallback((targetVolume: number) => {
        if (musicAudioRef.current) {
            const clamped = Math.min(Math.max(0, targetVolume), 1);
            musicAudioRef.current.volume = clamped;
            dispatch(setMusicVolume(clamped));
            setIsMusicMuted(clamped === 0);
        }
    }, [dispatch]);

    // Initialize audio element volume when it's ready
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
    }, [applyMusicVolume]);

    // Preload audio for a given track
    const preloadAudioTrack = useCallback((track: AudioTrack): Promise<PreloadedAudio> => {
        const trackKey = track.id.toString();

        // Check if this track is already preloaded
        if (preloadCacheRef.current.has(trackKey)) {
            return Promise.resolve(preloadCacheRef.current.get(trackKey)!);
        }

        // Create new audio elements for both normal and ducked versions
        const normalAudio = new Audio();
        const duckedAudio = new Audio();

        // Set normal path
        const normalPath = track.src;
        // Set ducked path
        const duckedPath = track.src.replace('/audio/music/', '/audio/music-ducked/');

        // Setup preloaded object
        const preloaded: PreloadedAudio = {
            normal: normalAudio,
            ducked: duckedAudio,
            track
        };

        // Store in cache
        preloadCacheRef.current.set(trackKey, preloaded);

        console.log(`Preloading track: ${track.title} (ID: ${track.id})`);

        // Load both versions in parallel
        return Promise.all([
            new Promise<void>((resolve) => {
                normalAudio.src = normalPath;
                normalAudio.preload = 'auto';

                const handleLoaded = () => {
                    console.log(`Preloaded normal version of: ${track.title}`);
                    normalAudio.removeEventListener('canplaythrough', handleLoaded);
                    resolve();
                };

                const handleError = () => {
                    console.warn(`Failed to preload normal version of: ${track.title}`);
                    normalAudio.removeEventListener('error', handleError);
                    // Resolve anyway to not block the Promise.all
                    resolve();
                };

                normalAudio.addEventListener('canplaythrough', handleLoaded);
                normalAudio.addEventListener('error', handleError);
                normalAudio.load();
            }),
            new Promise<void>((resolve) => {
                duckedAudio.src = duckedPath;
                duckedAudio.preload = 'auto';

                const handleLoaded = () => {
                    console.log(`Preloaded ducked version of: ${track.title}`);
                    duckedAudio.removeEventListener('canplaythrough', handleLoaded);
                    resolve();
                };

                const handleError = () => {
                    console.warn(`Failed to preload ducked version of: ${track.title}`);
                    duckedAudio.removeEventListener('error', handleError);
                    // Resolve anyway to not block the Promise.all
                    resolve();
                };

                duckedAudio.addEventListener('canplaythrough', handleLoaded);
                duckedAudio.addEventListener('error', handleError);
                duckedAudio.load();
            })
        ]).then(() => preloaded);
    }, []);

    // Preload the next track in the playlist
    const preloadNextTrack = useCallback(() => {
        const nextTrack = getNextMusicTrack(activeMusicTrack, isMusicLooping);
        if (nextTrack && activeMusicTrack && nextTrack.id !== activeMusicTrack.id) {
            console.log(`Preloading next track: ${nextTrack.title}`);
            preloadAudioTrack(nextTrack).then(preloaded => {
                preloadedNextTrackRef.current = preloaded;
            });
        }
    }, [activeMusicTrack, isMusicLooping, preloadAudioTrack]);

    // Apply the preloaded audio to the current audio element
    const applyPreloadedAudio = useCallback((preloaded: PreloadedAudio, isDucked: boolean) => {
        if (musicAudioRef.current) {
            const sourceAudio = isDucked ? preloaded.ducked : preloaded.normal;

            if (sourceAudio.readyState >= 2) { // HAVE_CURRENT_DATA or better
                // Transfer the loaded audio's properties to our main audio element
                musicAudioRef.current.src = sourceAudio.src;

                // Dispatch actions to update Redux store
                dispatch(setActiveMusicTrack(preloaded.track));
                dispatch(setMusicDuration(sourceAudio.duration));

                return true;
            }
        }
        return false;
    }, [dispatch]);

    // Play music
    const playMusic = useCallback(() => {
        dispatch(setMusicError(null));
        if (!isMusicEnabled) return;

        if (musicAudioRef.current) {
            applyMusicVolume(musicTargetVolumeRef.current);
            musicAudioRef.current.play()
                .then(() => dispatch(setMusicPlaying(true)))
                .catch(error => {
                    handleAudioError(
                        'music',
                        error,
                        (msg) => dispatch(setMusicError(msg)),
                        () => { }, // We don't need voice error here
                        (state) => dispatch(setMusicPlaying(state)),
                        () => { } // We don't need voice playing state here
                    );
                });
        }
    }, [isMusicEnabled, applyMusicVolume, dispatch]);

    // Pause music
    const pauseMusic = useCallback(() => {
        if (musicAudioRef.current) {
            musicAudioRef.current.pause();
            dispatch(setMusicPlaying(false));
        }
    }, [dispatch]);

    // Seek to a specific time in the music track
    const seekMusic = useCallback((seconds: number) => {
        if (musicAudioRef.current) {
            try {
                const clampedTime = Math.min(Math.max(0, seconds), musicDuration);
                musicAudioRef.current.currentTime = clampedTime;
                dispatch(setMusicCurrentTime(clampedTime));
            } catch (error) {
                // Ignore seek errors
            }
        }
    }, [musicDuration, dispatch]);

    // Set music volume
    const setMusicVolumeHandler = useCallback((volume: number) => {
        const clampedVolume = Math.min(Math.max(0, volume), 1);
        musicTargetVolumeRef.current = clampedVolume;

        if (isMusicEnabled) {
            applyMusicVolume(clampedVolume);
        }
    }, [isMusicEnabled, applyMusicVolume]);

    // Toggle music looping
    const toggleMusicLoopingHandler = useCallback(() => {
        dispatch(toggleMusicLooping());
    }, [dispatch]);

    // Set whether to use ducked music tracks
    const setDuckedMode = useCallback((ducked: boolean) => {
        if (ducked !== isDuckedMode) {
            setIsDuckedMode(ducked);
            // If we have an active track, apply the alternate version
            if (activeMusicTrack) {
                const currentTime = musicAudioRef.current?.currentTime || 0;
                const wasPlaying = isMusicPlaying;

                // Check if we have this track preloaded
                const trackKey = activeMusicTrack.id.toString();
                const preloaded = preloadCacheRef.current.get(trackKey);

                if (preloaded) {
                    console.log(`Switching to ${ducked ? 'ducked' : 'normal'} version using preloaded audio`);

                    // Temporarily pause while we swap sources
                    if (wasPlaying && musicAudioRef.current) {
                        musicAudioRef.current.pause();
                    }

                    // Apply the preloaded audio
                    const applied = applyPreloadedAudio(preloaded, ducked);

                    if (applied && musicAudioRef.current) {
                        // Restore playback position
                        musicAudioRef.current.currentTime = currentTime;

                        // Resume playback if it was playing
                        if (wasPlaying) {
                            musicAudioRef.current.play()
                                .then(() => dispatch(setMusicPlaying(true)))
                                .catch(err => console.error("Error resuming playback:", err));
                        }
                    } else {
                        // Fallback to the old method if preloaded audio couldn't be applied
                        fallbackSwitchMode(ducked, currentTime, wasPlaying);
                    }
                } else {
                    // Fallback to the old method
                    fallbackSwitchMode(ducked, currentTime, wasPlaying);
                }
            }
        }
    }, [activeMusicTrack, isDuckedMode, isMusicPlaying, dispatch, applyPreloadedAudio]);

    // Fallback method for switching modes (used when preloaded audio isn't available)
    const fallbackSwitchMode = useCallback((ducked: boolean, currentTime: number, wasPlaying: boolean) => {
        if (!activeMusicTrack || !musicAudioRef.current) return;

        const savedTime = currentTime;
        const savedPlayState = wasPlaying;

        // Apply the ducked/normal source based on current state
        const targetSrc = ducked
            ? activeMusicTrack.src.replace('/audio/music/', '/audio/music-ducked/')
            : activeMusicTrack.src;

        const currentSrc = musicAudioRef.current.src.replace(window.location.origin, '');

        // Only reload if the source is different
        if (targetSrc !== currentSrc) {
            dispatch(setMusicPlaying(false));

            console.log(`Fallback switching to ${ducked ? 'ducked' : 'normal'} music: ${targetSrc}`);
            musicAudioRef.current.src = targetSrc;

            const handleCanPlay = () => {
                // Restore position and play state
                if (savedTime > 0 && musicAudioRef.current) {
                    musicAudioRef.current.currentTime = savedTime;
                }

                if (savedPlayState) {
                    playMusic();
                }

                if (musicAudioRef.current) {
                    musicAudioRef.current.removeEventListener('canplay', handleCanPlay);
                }
            };

            musicAudioRef.current.addEventListener('canplay', handleCanPlay);
            musicAudioRef.current.load();
        }
    }, [activeMusicTrack, dispatch, playMusic]);

    // Load a music track
    const loadMusicTrack = useCallback(async (track: AudioTrack) => {
        const audio = musicAudioRef.current;
        if (!audio) return;

        try {
            dispatch(setMusicError(null));

            // Check if we have this track preloaded
            const trackKey = track.id.toString();
            const preloaded = preloadCacheRef.current.get(trackKey);

            if (preloaded) {
                // We have a preloaded version, use it!
                console.log(`Loading preloaded ${isDuckedMode ? 'ducked' : 'normal'} track: ${track.title}`);

                const wasPlaying = !audio.paused;

                // Update Redux state
                dispatch(setMusicPlaying(false));
                dispatch(setMusicCurrentTime(0));

                // Apply the preloaded audio
                const applied = applyPreloadedAudio(preloaded, isDuckedMode);

                if (applied) {
                    // Apply volume
                    applyMusicVolume(musicTargetVolumeRef.current);

                    // If we were playing before, resume playback
                    if (wasPlaying) {
                        playMusic();
                    }

                    // Preload the next track for seamless transitions
                    preloadNextTrack();

                    return;
                }
                // If we couldn't apply the preloaded audio, fall through to the fallback method
            }

            // Fallback method - direct loading
            // Apply ducked path if in ducked mode
            const targetSrc = isDuckedMode
                ? track.src.replace('/audio/music/', '/audio/music-ducked/')
                : track.src;

            const currentSrc = audio.src.replace(window.location.origin, '');

            if (targetSrc !== currentSrc) {
                const wasPlaying = !audio.paused;

                dispatch(setMusicPlaying(false));
                dispatch(setActiveMusicTrack(track));
                dispatch(setMusicCurrentTime(0));
                dispatch(setMusicDuration(0));

                console.log(`Fallback loading ${isDuckedMode ? 'ducked' : 'normal'} music track: ${targetSrc}`);
                audio.src = targetSrc;

                const handleCanPlay = () => {
                    console.log(`Track ${targetSrc} can play.`);
                    applyMusicVolume(musicTargetVolumeRef.current);

                    if (wasPlaying) {
                        console.log(`Autoplaying newly loaded track: ${targetSrc}`);
                        playMusic();
                    }

                    // Start preloading the next track for seamless transitions
                    preloadNextTrack();

                    audio.removeEventListener('canplay', handleCanPlay);
                    audio.removeEventListener('error', handleLoadError);
                };

                const handleLoadError = (e: Event) => {
                    console.error(`Error loading audio source ${targetSrc}:`, e);
                    dispatch(setMusicError(`Error loading audio: ${targetSrc}`));
                    audio.removeEventListener('canplay', handleCanPlay);
                    audio.removeEventListener('error', handleLoadError);
                };

                audio.addEventListener('canplay', handleCanPlay);
                audio.addEventListener('error', handleLoadError);

                audio.load();
            } else {
                dispatch(setActiveMusicTrack(track));
                if (!isMusicPlaying) {
                    playMusic();
                }

                // Preload the next track even if we're loading the same file
                preloadNextTrack();
            }

            // Start preloading this track (both versions) if not already in cache
            if (!preloadCacheRef.current.has(trackKey)) {
                preloadAudioTrack(track).catch(err =>
                    console.warn(`Background preloading failed for track ${track.title}:`, err)
                );
            }
        } catch (error) {
            console.error("Error in loadMusicTrack:", error);
            if (error instanceof Error) dispatch(setMusicError(error.message));
        }
    }, [
        applyMusicVolume,
        playMusic,
        isMusicPlaying,
        dispatch,
        isDuckedMode,
        applyPreloadedAudio,
        preloadAudioTrack,
        preloadNextTrack
    ]);

    // Play the next music track
    const playNextMusicTrack = useCallback(() => {
        const nextTrack = getNextMusicTrack(activeMusicTrack, isMusicLooping);
        if (nextTrack) {
            console.log("Playing next track:", nextTrack.title);

            // Check if we have this track preloaded as "next track"
            if (
                preloadedNextTrackRef.current &&
                preloadedNextTrackRef.current.track.id === nextTrack.id
            ) {
                console.log("Using preloaded next track!");

                // Apply the preloaded next track
                const wasPlaying = isMusicPlaying;
                dispatch(setMusicPlaying(false));
                dispatch(setMusicCurrentTime(0));

                const applied = applyPreloadedAudio(preloadedNextTrackRef.current, isDuckedMode);

                if (applied && musicAudioRef.current) {
                    // Reset the next track reference
                    preloadedNextTrackRef.current = null;

                    // Apply volume and play
                    applyMusicVolume(musicTargetVolumeRef.current);

                    if (wasPlaying) {
                        playMusic();
                    }

                    // Preload the next track
                    preloadNextTrack();
                    return;
                }
            }

            // Fallback to regular loading
            loadMusicTrack(nextTrack);
        }
    }, [
        activeMusicTrack,
        isMusicLooping,
        loadMusicTrack,
        isMusicPlaying,
        isDuckedMode,
        applyPreloadedAudio,
        dispatch,
        applyMusicVolume,
        playMusic,
        preloadNextTrack
    ]);

    // Set up event listeners for music playback
    useEffect(() => {
        const musicAudio = musicAudioRef.current;
        if (!musicAudio) return;

        const handleMusicMetadata = () => {
            if (musicAudio) dispatch(setMusicDuration(musicAudio.duration));
        };

        const handleMusicTimeUpdate = () => {
            if (musicAudio) dispatch(setMusicCurrentTime(musicAudio.currentTime));
        };

        const handleMusicEnded = () => {
            playNextMusicTrack();
        };

        const handleMusicError = () => {
            const error = musicAudio.error;
            if (error) {
                const errorMessage = `Music error (${error.code}): ${error.message}`;
                dispatch(setMusicError(errorMessage));
                dispatch(setMusicPlaying(false));
            }
        };

        musicAudio.addEventListener('loadedmetadata', handleMusicMetadata);
        musicAudio.addEventListener('timeupdate', handleMusicTimeUpdate);
        musicAudio.addEventListener('ended', handleMusicEnded);
        musicAudio.addEventListener('error', handleMusicError);

        return () => {
            musicAudio.removeEventListener('loadedmetadata', handleMusicMetadata);
            musicAudio.removeEventListener('timeupdate', handleMusicTimeUpdate);
            musicAudio.removeEventListener('ended', handleMusicEnded);
            musicAudio.removeEventListener('error', handleMusicError);
        };
    }, [dispatch, playNextMusicTrack]);

    // Enable/disable music
    const toggleMusic = useCallback(() => {
        dispatch(setMusicEnabled(!isMusicEnabled));
    }, [isMusicEnabled, dispatch]);

    // Preload initial track and next track when component mounts
    useEffect(() => {
        if (activeMusicTrack) {
            // Preload the current track (both versions)
            preloadAudioTrack(activeMusicTrack).catch(err =>
                console.warn(`Initial preloading failed for track ${activeMusicTrack.title}:`, err)
            );

            // Also preload the next track
            preloadNextTrack();
        }
    }, []);

    return {
        // References
        musicAudioRef,

        // State
        isMusicEnabled,
        isMusicPlaying,
        isMusicLooping,
        activeMusicTrack,
        musicCurrentTime,
        musicDuration,
        musicVolume,
        musicError,
        isMusicMuted,

        // Actions
        playMusic,
        pauseMusic,
        seekMusic,
        setMusicVolume: setMusicVolumeHandler,
        toggleMusicLooping: toggleMusicLoopingHandler,
        loadMusicTrack,
        playNextMusicTrack,
        toggleMusic,
        setDuckedMode,

        // Preloading methods
        preloadAudioTrack,
        preloadNextTrack,
    };
} 