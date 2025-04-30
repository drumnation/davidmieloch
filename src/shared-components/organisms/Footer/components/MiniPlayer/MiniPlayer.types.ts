import { RefObject } from 'react';
import { MantineColorScheme } from '@mantine/core';
// import { SoundCloudTrack } from '../../Footer.types'; // Remove old type
import { AudioTrack } from '../dual-audio/DualAudio.types'; // Import new type

export interface MiniPlayerProps {
    currentTrack: AudioTrack | null; // Update type
    isPlaying: boolean;
    progress: number;
    colors: any;
    progressBarRef: RefObject<HTMLDivElement>;
    colorScheme: MantineColorScheme;
    onPlayToggle: () => void;
    onMinimizeToggle: () => void;
    startUserInteraction?: () => void; // Make optional if not always passed
    displayTitle?: string;
} 