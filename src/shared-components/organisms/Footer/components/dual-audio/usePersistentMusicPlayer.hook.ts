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

export function usePersistentMusicPlayer() {
    const dispatch = useDispatch();

    // References
    const musicAudioRef = useRef<HTMLAudioElement | null>(null);
    const musicTargetVolumeRef = useRef(FULL_VOLUME);
    const [isDuckedMode, setIsDuckedMode] = useState(false);
    const [isMusicMuted, setIsMusicMuted] = useState(false);

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
            // If we have an active track, reload it with the new ducked/non-ducked path
            if (activeMusicTrack) {
                const currentTime = musicAudioRef.current?.currentTime || 0;
                const wasPlaying = isMusicPlaying;

                // Store these values before reloading
                const savedTime = currentTime;
                const savedPlayState = wasPlaying;

                // Create a new track object with modified src
                const updatedTrack = {
                    ...activeMusicTrack,
                    // Don't actually change the track.src property - we'll use the ducked mode state
                    // when loading the track to determine the actual src URL
                };

                // Reload the track with updated path
                if (musicAudioRef.current) {
                    // Apply the ducked/normal source based on current state
                    const targetSrc = ducked
                        ? activeMusicTrack.src.replace('/audio/music/', '/audio/music-ducked/')
                        : activeMusicTrack.src;

                    const currentSrc = musicAudioRef.current.src.replace(window.location.origin, '');

                    // Only reload if the source is different
                    if (targetSrc !== currentSrc) {
                        dispatch(setMusicPlaying(false));

                        console.log(`Switching to ${ducked ? 'ducked' : 'normal'} music: ${targetSrc}`);
                        musicAudioRef.current.src = targetSrc;

                        const handleCanPlay = () => {
                            // Restore position and play state
                            if (savedTime > 0) {
                                musicAudioRef.current!.currentTime = savedTime;
                            }

                            if (savedPlayState) {
                                playMusic();
                            }

                            musicAudioRef.current!.removeEventListener('canplay', handleCanPlay);
                        };

                        musicAudioRef.current.addEventListener('canplay', handleCanPlay);
                        musicAudioRef.current.load();
                    }
                }
            }
        }
    }, [activeMusicTrack, isDuckedMode, isMusicPlaying, dispatch, playMusic]);

    // Load a music track
    const loadMusicTrack = useCallback(async (track: AudioTrack) => {
        const audio = musicAudioRef.current;
        if (!audio) return;

        try {
            dispatch(setMusicError(null));

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

                console.log(`Loading ${isDuckedMode ? 'ducked' : 'normal'} music track: ${targetSrc}`);
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
        isDuckedMode
    ]);

    // Play the next music track
    const playNextMusicTrack = useCallback(() => {
        const nextTrack = getNextMusicTrack(activeMusicTrack, isMusicLooping);
        if (nextTrack) {
            console.log("Playing next track:", nextTrack.title);
            loadMusicTrack(nextTrack);
        }
    }, [activeMusicTrack, isMusicLooping, loadMusicTrack]);

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
    };
} 