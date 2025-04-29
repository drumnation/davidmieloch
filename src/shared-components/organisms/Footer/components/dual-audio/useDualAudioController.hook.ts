import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioMode, AudioTrack, DualAudioControllerState, DualAudioControllerActions, DualAudioContextType } from './DualAudio.types';
import { useVoiceTrackLoader } from './useVoiceTrackLoader';
import { musicPlaylist } from './playlists/musicPlaylist';
import { usePathname } from 'next/navigation';
import { voiceTracks } from './playlists/voiceTracks';
import { fadeAudioVolume } from './useDualAudioController.utils';
import { handleAudioError, getNextMusicTrack } from './useDualAudioController.logic';

export type DualAudioContextTypeWithRefs = DualAudioContextType & {
    musicAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
    voiceAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
};

const DUCK_VOLUME = 0.2;
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
    const [isAudioReady, setIsAudioReady] = useState(false);
    const [userOverrodeDuck, setUserOverrodeDuck] = useState(false);

    const getCurrentMusicVolume = useCallback(() => {
        if (isMusicEnabled && isNarrationEnabled && isVoicePlaying && !userOverrodeDuck) {
            return DUCK_VOLUME;
        }
        return musicTargetVolumeRef.current;
    }, [isMusicEnabled, isNarrationEnabled, isVoicePlaying, userOverrodeDuck]);

    const applyMusicVolume = useCallback((targetVolume: number) => {
        if (musicAudioRef.current) {
            const clamped = Math.min(Math.max(0, targetVolume), 1);
            fadeAudioVolume(musicAudioRef.current, clamped, 300);
            setMusicVolume(clamped);
            setIsMusicMuted(clamped === 0);
        }
    }, []);

    useEffect(() => {
        if (isMusicEnabled && isNarrationEnabled) {
            if (isVoicePlaying) {
                if (!userOverrodeDuck) {
                    applyMusicVolume(DUCK_VOLUME);
                } else {
                    applyMusicVolume(musicTargetVolumeRef.current);
                }
            } else {
                applyMusicVolume(musicTargetVolumeRef.current);
                setUserOverrodeDuck(false);
            }
        }
    }, [isVoicePlaying, isMusicEnabled, isNarrationEnabled, applyMusicVolume, userOverrodeDuck]);

    useEffect(() => {
        const audio = musicAudioRef.current;
        if (!audio) return;
        const reapplyVolume = () => {
            applyMusicVolume(getCurrentMusicVolume());
        };
        audio.addEventListener('play', reapplyVolume);
        audio.addEventListener('loadedmetadata', reapplyVolume);
        return () => {
            audio.removeEventListener('play', reapplyVolume);
            audio.removeEventListener('loadedmetadata', reapplyVolume);
        };
    }, [musicAudioRef, getCurrentMusicVolume, applyMusicVolume]);

    const playMusic = useCallback(() => {
        setMusicError(null);
        if (!isMusicEnabled) return;
        if (musicAudioRef.current) {
            musicAudioRef.current.play()
                .then(() => setIsMusicPlaying(true))
                .catch(error => handleAudioError('music', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
        }
    }, [isMusicEnabled]);

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
        if (isMusicEnabled && isNarrationEnabled && isVoicePlaying) {
            setUserOverrodeDuck(true);
            applyMusicVolume(clampedVolume);
        } else if (isMusicEnabled && (!isNarrationEnabled || !isVoicePlaying)) {
            applyMusicVolume(clampedVolume);
        }
    }, [isMusicEnabled, isNarrationEnabled, isVoicePlaying, applyMusicVolume]);

    const playVoice = useCallback(() => {
        setVoiceError(null);
        if (!isNarrationEnabled) return;
        if (voiceAudioRef.current && activeVoiceTrack) {
            if (isMusicEnabled && isNarrationEnabled && !isMusicPlaying && activeMusicTrack) {
                try {
                    musicAudioRef.current?.play()
                        .then(() => {
                            setIsMusicPlaying(true);
                            setTimeout(() => {
                                voiceAudioRef.current?.play()
                                    .then(() => setIsVoicePlaying(true))
                                    .catch(error => handleAudioError('voice', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
                            }, 50);
                        })
                        .catch(error => {
                            handleAudioError('music', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying);
                            voiceAudioRef.current?.play()
                                .then(() => setIsVoicePlaying(true))
                                .catch(voiceError => handleAudioError('voice', voiceError, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
                        });
                } catch (error) {
                    voiceAudioRef.current?.play()
                        .then(() => setIsVoicePlaying(true))
                        .catch(error => handleAudioError('voice', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
                }
            } else {
                voiceAudioRef.current.play()
                    .then(() => setIsVoicePlaying(true))
                    .catch(error => handleAudioError('voice', error, setMusicError, setVoiceError, setIsMusicPlaying, setIsVoicePlaying));
            }
        } else {
            if (!activeVoiceTrack) setVoiceError('No voice track loaded for this page.');
        }
    }, [isMusicEnabled, isNarrationEnabled, isMusicPlaying, activeMusicTrack, activeVoiceTrack]);

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
            const currentSrc = audio.src.replace(window.location.origin, '');
            if (track.src !== currentSrc) {
                pauseMusic();
                await new Promise(res => setTimeout(res, 50));
                setActiveMusicTrack(track);
                setMusicCurrentTime(0);
                setMusicDuration(0);
                audio.src = track.src;
                audio.load();
                const targetVol = (isMusicEnabled && isNarrationEnabled && isVoicePlaying) ? DUCK_VOLUME : musicTargetVolumeRef.current;
                applyMusicVolume(targetVol);
                playMusic();
            } else {
                setActiveMusicTrack(track);
                if (!isMusicPlaying) playMusic();
            }
        } catch (error) {
            if (error instanceof Error) setMusicError(error.message);
        }
    }, [pauseMusic, applyMusicVolume, isMusicEnabled, isNarrationEnabled, isVoicePlaying, playMusic, isMusicPlaying]);

    const loadVoiceTrack = useCallback((track: AudioTrack | null) => {
        if (voiceAudioRef.current) {
            try {
                setVoiceError(null);
                const currentSrc = voiceAudioRef.current.src.replace(window.location.origin, '');
                if (track && track.src !== currentSrc) {
                    pauseVoice();
                    setVoiceCurrentTime(0);
                    setVoiceDuration(0);
                    const errorHandler = () => {
                        const error = voiceAudioRef.current?.error;
                        if (error) {
                            const errorMessage = `Voice error (${error.code}): ${error.message}`;
                            setVoiceError(errorMessage);
                        }
                    };
                    voiceAudioRef.current.onerror = errorHandler;
                    voiceAudioRef.current.src = track.src;
                    voiceAudioRef.current.load();
                    setActiveVoiceTrack(track);
                    if (isNarrationEnabled) setVoiceVolumeHandler(voiceVolume);
                } else if (!track && voiceAudioRef.current.hasAttribute('src') && voiceAudioRef.current.src !== '') {
                    pauseVoice();
                    voiceAudioRef.current.removeAttribute('src');
                    voiceAudioRef.current.load();
                    setActiveVoiceTrack(null);
                    setVoiceCurrentTime(0);
                    setVoiceDuration(0);
                }
            } catch (error) {
                if (error instanceof Error) setVoiceError(error.message);
            }
        }
    }, [pauseVoice, setVoiceVolumeHandler, isNarrationEnabled, voiceVolume]);

    const playNextMusicTrack = useCallback(() => {
        const nextTrack = getNextMusicTrack(activeMusicTrack, isMusicLooping);
        if (nextTrack) {
            loadMusicTrack(nextTrack);
            playMusic();
        }
    }, [activeMusicTrack, isMusicLooping, loadMusicTrack, playMusic]);

    useVoiceTrackLoader(loadVoiceTrack, isAudioReady);

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
            let pageSlug = pathname.replace(/^\/|\/$/g, '');
            if (pageSlug === '') pageSlug = 'home';
            const initialVoiceTrack = voiceTracks.find((track: AudioTrack) => track.id === pageSlug);
            if (initialVoiceTrack) {
                loadVoiceTrack(initialVoiceTrack);
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
            if (!newState && !isMusicEnabled) {
                setIsMusicEnabled(true);
                playMusic();
            }
            if (!newState) {
                pauseVoice();
                if (isMusicEnabled) applyMusicVolume(musicTargetVolumeRef.current);
            } else if (activeVoiceTrack) {
                playVoice();
            }
            return newState;
        });
    }, [isMusicEnabled, pauseVoice, playVoice, playMusic, activeVoiceTrack, applyMusicVolume]);

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