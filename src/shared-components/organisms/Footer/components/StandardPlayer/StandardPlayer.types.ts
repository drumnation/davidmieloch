import { RefObject } from 'react';
import { SoundCloudTrack } from '../../Footer.types';

export interface StandardPlayerProps {
    currentTrack: SoundCloudTrack | null;
    isPlaying: boolean;
    progress: number;
    colors: any;
    progressBarRef: RefObject<HTMLDivElement>;
    colorScheme: string;
    currentTime: number;
    duration: number;
    onPlayToggle: () => void;
    onMinimizeToggle: () => void;
    onPlaylistToggle: () => void;
    onPrevTrack: () => void;
    onNextTrack: () => void;
    startUserInteraction: () => void;
} 