"use client";

import { Box, Container, MantineTheme } from '@mantine/core';
import { FooterProps } from './Footer.types';
import { useFooterUI } from './useFooterUI.hook';
import { useDualAudio } from './components/dual-audio/DualAudioContext';
import { getFooterContainerStyle, FooterResponsiveContainer } from './Footer.styles';
import { GradientBorder } from './components/GradientBorder';
import { MiniPlayer } from './components/MiniPlayer';
import { StandardPlayer } from './components/StandardPlayer';
import { Playlist } from './components/Playlist';
import { musicPlaylist } from './components/dual-audio/playlists/musicPlaylist';
import { useFooter } from './Footer.hook';
import { useCallback, useEffect } from 'react';
import { AudioTrack } from './components/dual-audio/DualAudio.types';
import { useFooterStatefulLogic } from './Footer.hook';
import styled from '@emotion/styled';

export const Footer = ({ socialLinks }: FooterProps) => {
  const {
    musicAudioRef,
    voiceAudioRef,
    isMusicPlaying,
    activeMusicTrack,
    musicCurrentTime,
    musicDuration,
    musicVolume,
    playMusic,
    pauseMusic,
    seekMusic,
    setMusicVolume,
    loadMusicTrack,
    isVoicePlaying,
    activeVoiceTrack,
    voiceCurrentTime,
    voiceDuration,
    voiceVolume,
    playVoice,
    pauseVoice,
    seekVoice,
    setVoiceVolume,
    isMusicLooping,
    toggleMusicLooping,
    playNextMusicTrack,
    musicError,
    voiceError,
    isMusicEnabled,
    isNarrationEnabled,
    toggleMusic,
    toggleNarration,
    isExpanded,
    isMiniMode,
    isMounted,
    colors,
    progressBarRef,
    handleMinimizeToggle,
    handlePlaylistToggle,
    colorScheme,
    startUserInteraction,
    handleMusicTrackSelect,
    isEffectivelyPlaying,
    activeDisplayTrackDetails,
    displayArtwork,
    activeTiming,
    progress,
    currentPlaylist,
    currentMusicTrackIndex,
    handlePlayPause,
    handleSeek,
    handleNextMusicTrack,
    handlePrevMusicTrack,
    miniPlayerDisplayTitle,
  } = useFooterStatefulLogic();

  if (!isMounted) {
    return <Box w="100%" h="0" data-testid="footer-hydrating" />;
  }

  return (
    <Box
      style={getFooterContainerStyle(colors, isMiniMode, isExpanded)}
      data-testid="footer"
    >
      <GradientBorder />
      <audio ref={musicAudioRef} preload="metadata" hidden />
      <audio ref={voiceAudioRef} preload="metadata" hidden />

      {isMiniMode && (
        <Container size="lg" style={{ height: '100%' }}>
          <MiniPlayer
            currentTrack={activeDisplayTrackDetails}
            artworkUrl={displayArtwork}
            isPlaying={isEffectivelyPlaying}
            progress={progress}
            colors={colors}
            progressBarRef={progressBarRef}
            colorScheme={colorScheme}
            onPlayToggle={handlePlayPause}
            onMinimizeToggle={handleMinimizeToggle}
            startUserInteraction={startUserInteraction}
            displayTitle={miniPlayerDisplayTitle}
          />
        </Container>
      )}

      {!isMiniMode && !isExpanded && (
        <FooterResponsiveContainer style={{ marginBottom: '10px' }}>
          <Container size="lg" style={{ height: '100%' }}>
            <StandardPlayer
              currentTrack={activeMusicTrack}
              isPlaying={isEffectivelyPlaying}
              progress={progress}
              musicVolume={musicVolume}
              voiceVolume={voiceVolume}
              activeVoiceTrack={activeVoiceTrack}
              isMusicPlaying={isMusicPlaying}
              isVoicePlaying={isVoicePlaying}
              voiceCurrentTime={voiceCurrentTime}
              voiceDuration={voiceDuration}
              isMusicEnabled={isMusicEnabled}
              isNarrationEnabled={isNarrationEnabled}
              colors={colors}
              progressBarRef={progressBarRef}
              colorScheme={colorScheme}
              currentTime={activeTiming.current}
              duration={activeTiming.duration}
              onPlayToggle={handlePlayPause}
              onSeekMusic={(progress: number) => {
                if (musicDuration > 0) {
                  const time = (progress / 100) * musicDuration;
                  seekMusic(time);
                }
              }}
              onSeekNarration={(progress: number) => {
                if (voiceDuration > 0) {
                  const time = (progress / 100) * voiceDuration;
                  seekVoice(time);
                }
              }}
              onMusicVolumeChange={setMusicVolume}
              onVoiceVolumeChange={setVoiceVolume}
              toggleMusic={toggleMusic}
              toggleNarration={toggleNarration}
              playMusic={playMusic}
              pauseMusic={pauseMusic}
              playVoice={playVoice}
              pauseVoice={pauseVoice}
              onMinimizeToggle={handleMinimizeToggle}
              onPlaylistToggle={handlePlaylistToggle}
              onPrevTrack={handlePrevMusicTrack}
              onNextTrack={handleNextMusicTrack}
              startUserInteraction={startUserInteraction}
            />
          </Container>
        </FooterResponsiveContainer>
      )}

      {!isMiniMode && isExpanded && (
        <Container size="lg" style={{ height: '100%' }}>
          <Playlist
            currentTrack={activeMusicTrack}
            isPlaying={isMusicPlaying}
            colors={colors}
            colorScheme={colorScheme}
            tracks={currentPlaylist}
            currentTrackIndex={currentMusicTrackIndex}
            onMinimizeToggle={handleMinimizeToggle}
            onPlaylistToggle={handlePlaylistToggle}
            onTrackSelect={handleMusicTrackSelect}
            startUserInteraction={startUserInteraction}
            isPlaylistOpen={isExpanded}
          />
        </Container>
      )}
    </Box>
  );
}; 