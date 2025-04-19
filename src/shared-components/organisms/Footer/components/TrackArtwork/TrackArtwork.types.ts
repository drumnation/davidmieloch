export interface TrackArtworkProps {
    artwork?: string;
    title?: string;
    isPlaying: boolean;
    onClick: () => void;
    size?: number;
    iconSize?: number;
} 