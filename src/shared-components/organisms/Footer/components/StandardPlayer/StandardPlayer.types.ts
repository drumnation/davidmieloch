import { RefObject } from 'react';
// import { SoundCloudTrack } from '../../Footer.types'; // Remove old type
import { AudioTrack, AudioMode } from '../../dual-audio/DualAudio.types'; // Import new types

export interface StandardPlayerProps {
    currentTrack: AudioTrack | null; // Update type
    isPlaying: boolean;
    progress: number;
    colors: any;
    progressBarRef: RefObject<HTMLDivElement>;
    colorScheme: string;
    currentTime: number;
    duration: number;
    volume: number; // Add volume
    mode: AudioMode; // Add mode
    onPlayToggle: () => void;
    onMinimizeToggle: () => void;
    onPlaylistToggle: () => void;
    onPrevTrack: () => void;
    onNextTrack: () => void;
    onVolumeChange: (volume: number) => void; // Add volume handler
    onModeChange: (mode: AudioMode) => void; // Add mode handler
    onSeek: (progress: number) => void; // Add seek handler (takes progress 0-100)
    startUserInteraction?: () => void; // Make optional
} 