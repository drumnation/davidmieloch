import { useState, useRef, MutableRefObject, useCallback, useEffect } from 'react';
import { AudioMode, AudioTrack, DualAudioControllerState, DualAudioControllerActions, DualAudioContextType } from './DualAudio.types';
import { useVoiceTrackLoader } from './useVoiceTrackLoader';

// Add refs to the context type
export type DualAudioContextTypeWithRefs = DualAudioContextType & {
    musicAudioRef: MutableRefObject<HTMLAudioElement | null>;
    voiceAudioRef: MutableRefObject<HTMLAudioElement | null>;
};

export function useDualAudioController(): DualAudioContextTypeWithRefs {
    // Mode state
    const [mode, setMode] = useState<AudioMode>(AudioMode.BOTH);

    // Music state
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [activeMusicTrack, setActiveMusicTrack] = useState<AudioTrack | null>(null);
    const [musicCurrentTime, setMusicCurrentTime] = useState(0);
    const [musicDuration, setMusicDuration] = useState(0);
    const [musicVolume, setMusicVolume] = useState(1);
    const [isMusicMuted, setIsMusicMuted] = useState(false);

    // Voice state
    const [isVoicePlaying, setIsVoicePlaying] = useState(false);
    const [activeVoiceTrack, setActiveVoiceTrack] = useState<AudioTrack | null>(null);
    const [voiceCurrentTime, setVoiceCurrentTime] = useState(0);
    const [voiceDuration, setVoiceDuration] = useState(0);
    const [voiceVolume, setVoiceVolume] = useState(1);
    const [isVoiceMuted, setIsVoiceMuted] = useState(false);

    // Audio elements
    const musicAudioRef = useRef<HTMLAudioElement | null>(null);
    const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

    // Actions (placeholders for now)
    const playMusic = useCallback(() => {
        musicAudioRef.current?.play();
        setIsMusicPlaying(true);
        // TODO: Handle potential errors, sync with voice state based on mode
    }, []);

    const pauseMusic = useCallback(() => {
        musicAudioRef.current?.pause();
        setIsMusicPlaying(false);
        // TODO: Sync with voice state based on mode
    }, []);

    const seekMusic = useCallback((seconds: number) => {
        if (musicAudioRef.current) {
            musicAudioRef.current.currentTime = seconds;
            setMusicCurrentTime(seconds);
        }
    }, []);

    const setMusicVolumeHandler = useCallback((volume: number) => {
        if (musicAudioRef.current) {
            musicAudioRef.current.volume = volume;
            setMusicVolume(volume);
            setIsMusicMuted(volume === 0);
        }
    }, []);

    const playVoice = useCallback(() => {
        voiceAudioRef.current?.play();
        setIsVoicePlaying(true);
        // TODO: Handle potential errors, sync with music state (ducking)
    }, []);

    const pauseVoice = useCallback(() => {
        voiceAudioRef.current?.pause();
        setIsVoicePlaying(false);
        // TODO: Sync with music state (unducking)
    }, []);

    const seekVoice = useCallback((seconds: number) => {
        if (voiceAudioRef.current) {
            voiceAudioRef.current.currentTime = seconds;
            setVoiceCurrentTime(seconds);
        }
    }, []);

    const setVoiceVolumeHandler = useCallback((volume: number) => {
        if (voiceAudioRef.current) {
            voiceAudioRef.current.volume = volume;
            setVoiceVolume(volume);
            setIsVoiceMuted(volume === 0);
        }
    }, []);

    const loadMusicTrack = useCallback((track: AudioTrack) => {
        if (musicAudioRef.current && track.src !== musicAudioRef.current.src) {
            // Pause existing track? Reset time?
            pauseMusic();
            setMusicCurrentTime(0);
            setMusicDuration(0);
            musicAudioRef.current.src = track.src;
            musicAudioRef.current.load(); // Important to load new source
            setActiveMusicTrack(track);
            // Don't autoplay here, let user decide via playMusic
        }
    }, [pauseMusic]);

    // Make loadVoiceTrack accept null and wrap in useCallback
    const loadVoiceTrack = useCallback((track: AudioTrack | null) => {
        if (voiceAudioRef.current) {
            const currentSrc = voiceAudioRef.current.src.replace(window.location.origin, ''); // Normalize src
            if (track && track.src !== currentSrc) {
                pauseVoice();
                setVoiceCurrentTime(0);
                setVoiceDuration(0);
                voiceAudioRef.current.src = track.src;
                voiceAudioRef.current.load();
                setActiveVoiceTrack(track);
            } else if (!track && activeVoiceTrack) {
                // Clear the voice track if null is passed
                pauseVoice();
                voiceAudioRef.current.removeAttribute('src'); // Remove src
                voiceAudioRef.current.load();
                setActiveVoiceTrack(null);
                setVoiceCurrentTime(0);
                setVoiceDuration(0);
            }
        }
    }, [activeVoiceTrack, pauseVoice]);

    // --- Dynamic Voice Track Loading --- 
    useVoiceTrackLoader(loadVoiceTrack); // Use the helper hook

    // --- Audio Event Listeners --- 
    useEffect(() => {
        const musicAudio = musicAudioRef.current;
        const voiceAudio = voiceAudioRef.current;

        const handleMusicMetadata = () => {
            if (musicAudio) {
                setMusicDuration(musicAudio.duration);
            }
        };
        const handleVoiceMetadata = () => {
            if (voiceAudio) {
                setVoiceDuration(voiceAudio.duration);
            }
        };

        // TODO: Implement onTimeUpdate for both
        // TODO: Implement onEnded for both

        musicAudio?.addEventListener('loadedmetadata', handleMusicMetadata);
        voiceAudio?.addEventListener('loadedmetadata', handleVoiceMetadata);

        return () => {
            musicAudio?.removeEventListener('loadedmetadata', handleMusicMetadata);
            voiceAudio?.removeEventListener('loadedmetadata', handleVoiceMetadata);
        };
    }, []); // Run once on mount

    // TODO: Implement ducking logic when voice plays/pauses in BOTH mode.
    // TODO: Handle initial track loading (e.g., first music track, initial voice track based on route). - Music part done in Footer.tsx

    return {
        // State
        isMusicPlaying,
        isVoicePlaying,
        mode,
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

        // Actions
        playMusic,
        pauseMusic,
        seekMusic,
        setMusicVolume: setMusicVolumeHandler,
        playVoice,
        pauseVoice,
        seekVoice,
        setVoiceVolume: setVoiceVolumeHandler,
        setMode,
        loadMusicTrack,
        loadVoiceTrack,

        // Refs
        musicAudioRef,
        voiceAudioRef,
    };
} 