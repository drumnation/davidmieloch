import { createContext, useContext, ReactNode, useEffect, useRef } from 'react';
import { DualAudioContextTypeWithRefs } from './DualAudio.types';
import { usePersistentMusicPlayer } from './usePersistentMusicPlayer.hook';
import { useVoiceNarration } from './useVoiceNarration.hook';

const DualAudioContext = createContext<DualAudioContextTypeWithRefs | undefined>(undefined);

export function DualAudioProvider({ children }: { children: ReactNode }) {
    // Use a ref to prevent duplicate logs during development hot reloads
    const hasLoggedMount = useRef(false);

    if (!hasLoggedMount.current) {
        console.log('[DEBUG] DualAudioProvider mounted');
        hasLoggedMount.current = true;
    }

    // Use our new hooks for persistent music and route-specific voice narration
    const musicPlayer = usePersistentMusicPlayer();
    const voiceNarration = useVoiceNarration();

    // Connect the voice narration state to the music player for ducked audio
    useEffect(() => {
        if (musicPlayer.activeMusicTrack && musicPlayer.setDuckedMode) {
            // When voice narration play state changes, reload the current track with the appropriate version
            // This will switch between normal and ducked audio based on isVoicePlaying
            musicPlayer.setDuckedMode(voiceNarration.isVoicePlaying);
        }
    }, [voiceNarration.isVoicePlaying, musicPlayer.activeMusicTrack, musicPlayer.setDuckedMode]);

    // When audio is playing, try to preload the next track
    useEffect(() => {
        if (musicPlayer.isMusicPlaying && musicPlayer.activeMusicTrack && musicPlayer.preloadNextTrack) {
            musicPlayer.preloadNextTrack();
        }
    }, [musicPlayer.isMusicPlaying, musicPlayer.activeMusicTrack, musicPlayer.preloadNextTrack]);

    // Log audio ref state just once on mount, not on every ref change
    useEffect(() => {
        console.log('[DEBUG] Initial audio refs state:', {
            hasMusicRef: !!musicPlayer.musicAudioRef.current,
            hasVoiceRef: !!voiceNarration.voiceAudioRef.current,
        });
    }, []); // Empty dependency array = run only on mount

    // Combine the hooks into a single context value
    const dualAudio: DualAudioContextTypeWithRefs = {
        // Music player state and controls
        musicAudioRef: musicPlayer.musicAudioRef,
        isMusicEnabled: musicPlayer.isMusicEnabled,
        isMusicPlaying: musicPlayer.isMusicPlaying,
        activeMusicTrack: musicPlayer.activeMusicTrack,
        musicCurrentTime: musicPlayer.musicCurrentTime,
        musicDuration: musicPlayer.musicDuration,
        musicVolume: musicPlayer.musicVolume,
        isMusicLooping: musicPlayer.isMusicLooping,
        isMusicMuted: musicPlayer.isMusicMuted,
        toggleMusicLooping: musicPlayer.toggleMusicLooping,
        playMusic: musicPlayer.playMusic,
        pauseMusic: musicPlayer.pauseMusic,
        seekMusic: musicPlayer.seekMusic,
        setMusicVolume: musicPlayer.setMusicVolume,
        loadMusicTrack: musicPlayer.loadMusicTrack,
        playNextMusicTrack: musicPlayer.playNextMusicTrack,
        musicError: musicPlayer.musicError,
        toggleMusic: musicPlayer.toggleMusic,
        setDuckedMode: musicPlayer.setDuckedMode,
        preloadAudioTrack: musicPlayer.preloadAudioTrack,
        preloadNextTrack: musicPlayer.preloadNextTrack,

        // Voice narration state and controls
        voiceAudioRef: voiceNarration.voiceAudioRef,
        isNarrationEnabled: voiceNarration.isNarrationEnabled,
        isVoicePlaying: voiceNarration.isVoicePlaying,
        activeVoiceTrack: voiceNarration.activeVoiceTrack,
        voiceCurrentTime: voiceNarration.voiceCurrentTime,
        voiceDuration: voiceNarration.voiceDuration,
        voiceVolume: voiceNarration.voiceVolume,
        isVoiceMuted: voiceNarration.isVoiceMuted || false,
        playVoice: voiceNarration.playVoice,
        pauseVoice: voiceNarration.pauseVoice,
        seekVoice: voiceNarration.seekVoice,
        setVoiceVolume: voiceNarration.setVoiceVolume,
        loadVoiceTrack: voiceNarration.loadVoiceTrack,
        voiceError: voiceNarration.voiceError,
        toggleNarration: voiceNarration.toggleNarration,
    };

    return (
        <DualAudioContext.Provider value={dualAudio}>
            <audio ref={musicPlayer.musicAudioRef} preload="auto" hidden />
            <audio ref={voiceNarration.voiceAudioRef} preload="auto" hidden />
            {children}
        </DualAudioContext.Provider>
    );
}

export function useDualAudio(): DualAudioContextTypeWithRefs {
    const context = useContext(DualAudioContext);
    if (!context) {
        throw new Error('useDualAudio must be used within a DualAudioProvider');
    }
    return context;
} 