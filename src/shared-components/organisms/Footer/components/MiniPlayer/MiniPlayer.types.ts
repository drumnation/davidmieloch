import { RefObject } from 'react';
import { SoundCloudTrack } from '../../Footer.types';

export interface MiniPlayerProps {
    currentTrack: SoundCloudTrack | null;
    isPlaying: boolean;
    progress: number;
    colors: any;
    progressBarRef: RefObject<HTMLDivElement>;
    colorScheme: string;
    onPlayToggle: () => void;
    onMinimizeToggle: () => void;
    startUserInteraction: () => void;
} 