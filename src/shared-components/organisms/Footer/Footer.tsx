"use client";

import { Box, Container } from '@mantine/core';
import { FooterProps } from './Footer.types';
import { useFooterUI } from './useFooterUI.hook';
import { getFooterContainerStyle } from './Footer.ui.styles';
import { GradientBorder } from './components/GradientBorder';
import { MiniPlayer } from './components/MiniPlayer';
import { StandardPlayer } from './components/StandardPlayer';
import { Playlist } from './components/Playlist';

export const Footer = ({ soundCloudTracks = [] }: FooterProps) => {
  const {
    // State
    isExpanded,
    isMiniMode,
    isMounted,
    colors,
    progressBarRef,
    displayTracks,

    // Player state
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,

    // Methods
    startUserInteraction,
    handleMinimizeToggle,
    handlePlaylistToggle,
    handleTrackSelect,
    togglePlay,
    nextTrack,
    prevTrack,
    colorScheme
  } = useFooterUI({ soundCloudTracks });

  // If not mounted yet, return an empty footer to prevent hydration errors
  if (!isMounted) {
    return (
      <Box
        w="100%"
        h="0"
        data-testid="footer-hydrating"
      />
    );
  }

  return (
    <Box
      style={getFooterContainerStyle(colors, isMiniMode, isExpanded)}
      data-testid="footer"
    >
      <GradientBorder />

      {/* Mini Mode Player */}
      {isMiniMode && (
        <Container size="lg" style={{ height: '100%' }}>
          <MiniPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            colors={colors}
            progressBarRef={progressBarRef}
            colorScheme={colorScheme}
            onPlayToggle={togglePlay}
            onMinimizeToggle={handleMinimizeToggle}
            startUserInteraction={startUserInteraction}
          />
        </Container>
      )}

      {/* Standard Player */}
      {!isMiniMode && !isExpanded && (
        <Container size="lg" style={{ height: '100%' }}>
          <StandardPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            colors={colors}
            progressBarRef={progressBarRef}
            colorScheme={colorScheme}
            currentTime={currentTime}
            duration={duration}
            onPlayToggle={togglePlay}
            onMinimizeToggle={handleMinimizeToggle}
            onPlaylistToggle={handlePlaylistToggle}
            onPrevTrack={prevTrack}
            onNextTrack={nextTrack}
            startUserInteraction={startUserInteraction}
          />
        </Container>
      )}

      {/* Playlist */}
      {!isMiniMode && isExpanded && (
        <Container size="lg" style={{ height: '100%' }}>
          <Playlist
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            progress={progress}
            colors={colors}
            progressBarRef={progressBarRef}
            colorScheme={colorScheme}
            displayTracks={displayTracks}
            onPlayToggle={togglePlay}
            onMinimizeToggle={handleMinimizeToggle}
            onPlaylistToggle={handlePlaylistToggle}
            onTrackSelect={handleTrackSelect}
            startUserInteraction={startUserInteraction}
            isPlaylistOpen={isExpanded}
            tracks={displayTracks}
            currentTrackIndex={displayTracks.findIndex(track => track.id === currentTrack?.id)}
            onMinimizePlayer={handleMinimizeToggle}
          />
        </Container>
      )}
    </Box>
  );
}; 