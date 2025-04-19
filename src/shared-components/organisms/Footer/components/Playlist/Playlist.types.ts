import { RefObject } from 'react';
import { SoundCloudTrack } from '@shared-components/organisms/Footer/Footer.types';

export interface PlaylistProps {
    currentTrack: SoundCloudTrack | null;
    isPlaying: boolean;
    progress: number;
    colors: any;
    progressBarRef: RefObject<HTMLDivElement>;
    colorScheme: string;
    displayTracks: SoundCloudTrack[];
    onPlayToggle: () => void;
    onMinimizeToggle: () => void;
    onPlaylistToggle: () => void;
    onTrackSelect: (trackId: number | string) => void;
    startUserInteraction: () => void;
    isPlaylistOpen: boolean;
    tracks: SoundCloudTrack[];
    currentTrackIndex: number;
    onMinimizePlayer: () => void;
} 