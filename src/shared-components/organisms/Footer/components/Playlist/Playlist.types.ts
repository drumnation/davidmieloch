import { RefObject } from 'react';
// import { SoundCloudTrack } from '@shared-components/organisms/Footer/Footer.types'; // Remove old type
import { AudioTrack } from '@shared-components/organisms/Footer/dual-audio/DualAudio.types'; // Import new type

export interface PlaylistProps {
    currentTrack: AudioTrack | null; // Update type (This is the current *music* track)
    isPlaying: boolean; // Music playing state
    // progress: number; // Progress might be handled internally or not needed if seek bar isn't shown
    colors: any;
    // progressBarRef?: RefObject<HTMLDivElement>; // Remove if not used
    colorScheme: string;
    // displayTracks: SoundCloudTrack[]; // Remove old prop
    tracks: AudioTrack[]; // Use new prop with correct type (music playlist)
    // onPlayToggle: () => void; // Remove if click is handled by onTrackSelect
    onMinimizeToggle: () => void;
    onPlaylistToggle: () => void;
    onTrackSelect: (track: AudioTrack) => void; // Update parameter type
    startUserInteraction?: () => void; // Make optional
    isPlaylistOpen: boolean;
    currentTrackIndex?: number; // Keep optional index
    // onMinimizePlayer?: () => void; // Remove redundant prop
} 