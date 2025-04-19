export { Footer } from './Footer';
export { useFooter, getDefaultSocialLinks } from './Footer.hook';
export { useFooterPlayer } from './Footer.player.hook';
export { useFooterUI } from './useFooterUI.hook';
export * from './Footer.types';
export * from './Footer.logic';
export * from './Footer.ui.styles';

// Export components from component folders
export { GradientBorder } from './components/GradientBorder';
export { MiniPlayer } from './components/MiniPlayer';
export { StandardPlayer } from './components/StandardPlayer';
export { TrackArtwork } from './components/TrackArtwork';
export { ProgressBar } from './components/ProgressBar';
export { Playlist } from './components/Playlist';

// Re-export types for convenience
export type { GradientBorderProps } from './components/GradientBorder';
export type { MiniPlayerProps } from './components/MiniPlayer';
export type { StandardPlayerProps } from './components/StandardPlayer';
export type { TrackArtworkProps } from './components/TrackArtwork/TrackArtwork.types';
export type { ProgressBarProps } from './components/ProgressBar';
export type { PlaylistProps } from './components/Playlist'; 