import React from 'react';

export enum AudioMode {
    VOICE_ONLY = 'voice-only',
    MUSIC_ONLY = 'music-only',
    BOTH = 'both',
}

export interface AudioTrack {
    id: string;
    title: string;
    src: string;         // File path (relative to /public/audio)
    artist?: string;   // Optional: Added artist field
    artwork?: string;    // Optional artwork path
    duration?: number;   // Optional, can be fetched after preload
    description?: string; // Optional: Added description field
}

export interface Playlist {
    tracks: AudioTrack[];
}

export interface VoiceTrackMapping {
    [routePath: string]: AudioTrack;  // E.g., '/ai-transformation' -> Voice track
}

export interface DualAudioControllerState {
    // Playback states
    isMusicPlaying: boolean;
    isVoicePlaying: boolean;

    // Track metadata
    activeMusicTrack: AudioTrack | null;
    activeVoiceTrack: AudioTrack | null;

    // Seek and timing
    musicCurrentTime: number;
    voiceCurrentTime: number;
    musicDuration: number;
    voiceDuration: number;

    // Volume
    musicVolume: number; // 0 to 1
    voiceVolume: number; // 0 to 1

    // Flags
    isMusicMuted: boolean;
    isVoiceMuted: boolean;
    isMusicLooping: boolean;

    // Error states
    musicError: string | null; // Track music playback errors
    voiceError: string | null; // Track voice playback errors

    // New state flags for toggles
    isMusicEnabled: boolean;
    isNarrationEnabled: boolean;
}

export interface DualAudioControllerActions {
    playMusic: () => void;
    pauseMusic: () => void;
    seekMusic: (seconds: number) => void;
    setMusicVolume: (volume: number) => void;

    playVoice: () => void;
    pauseVoice: () => void;
    seekVoice: (seconds: number) => void;
    setVoiceVolume: (volume: number) => void;

    loadMusicTrack: (track: AudioTrack) => void;
    loadVoiceTrack: (track: AudioTrack | null) => void;
    toggleMusicLooping: () => void;
    playNextMusicTrack: () => void;

    // New toggle actions
    toggleMusic: () => void;
    toggleNarration: () => void;

    // Ducked audio mode
    setDuckedMode?: (ducked: boolean) => void;
}

export type DualAudioContextType = DualAudioControllerState & DualAudioControllerActions;

// Add the type that includes audio element refs
export interface DualAudioContextTypeWithRefs extends DualAudioContextType {
    musicAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
    voiceAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
} 