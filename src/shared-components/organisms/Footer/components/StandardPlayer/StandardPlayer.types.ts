import { RefObject } from 'react';
// import { SoundCloudTrack } from '../../Footer.types'; // Remove old type
import { AudioTrack, AudioMode } from '../dual-audio/DualAudio.types'; // Import new types

export interface StandardPlayerProps {
    currentTrack: AudioTrack | null; // Update type
    isPlaying: boolean;
    progress: number;
    colors: any;
    progressBarRef: RefObject<HTMLDivElement>;
    colorScheme: 'light' | 'dark';
    currentTime: number;
    duration: number;
    onPlayToggle: () => void;
    onMinimizeToggle: () => void;
    onPlaylistToggle: () => void;
    onPrevTrack: () => void;
    onNextTrack: () => void;
    /** @deprecated Use onSeekMusic and onSeekNarration instead */
    onSeek?: (progress: number) => void;
    onSeekMusic: (progress: number) => void;
    onSeekNarration: (progress: number) => void;
    startUserInteraction?: () => void; // Make optional

    // New props for toggles & independent volume
    isMusicEnabled: boolean;
    isNarrationEnabled: boolean;
    musicVolume: number; // Separate music volume prop
    voiceVolume: number; // Separate voice volume prop
    toggleMusic: () => void;
    toggleNarration: () => void;
    onMusicVolumeChange: (volume: number) => void; // Separate handler
    onVoiceVolumeChange: (volume: number) => void; // Separate handler

    // Additional context needed for display logic
    activeVoiceTrack: AudioTrack | null;
    isMusicPlaying: boolean;
    isVoicePlaying: boolean;
    voiceCurrentTime: number;
    voiceDuration: number;

    playMusic?: () => void;
    pauseMusic?: () => void;
    playVoice?: () => void;
    pauseVoice?: () => void;
} 