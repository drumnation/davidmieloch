"use client";

import { Box, Container, Button, Slider, Select } from '@mantine/core';
import { FooterProps } from './Footer.types';
import { useFooterUI } from './useFooterUI.hook';
import { useDualAudio } from './dual-audio/DualAudioContext';
import { AudioMode, AudioTrack } from './dual-audio/DualAudio.types';
import { getFooterContainerStyle } from './Footer.ui.styles';
import { GradientBorder } from './components/GradientBorder';
import { MiniPlayer } from './components/MiniPlayer';
import { StandardPlayer } from './components/StandardPlayer';
import { Playlist } from './components/Playlist';
import { musicPlaylist } from './dual-audio/playlists/musicPlaylist';
import { useFooter } from './Footer.hook';
import { useEffect } from 'react';

export const Footer = ({ socialLinks }: FooterProps) => {
  const { theme, isDark, currentYear } = useFooter();
  const {
    musicAudioRef,
    voiceAudioRef,
    mode,
    setMode,
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
    loadVoiceTrack,
  } = useDualAudio();

  const {
    isExpanded,
    isMiniMode,
    isMounted,
    colors,
    progressBarRef,
    handleMinimizeToggle,
    handlePlaylistToggle,
    colorScheme,
    startUserInteraction,
  } = useFooterUI({});

  const isEffectivelyPlaying = mode === AudioMode.MUSIC_ONLY ? isMusicPlaying : (mode === AudioMode.VOICE_ONLY ? isVoicePlaying : (isMusicPlaying || isVoicePlaying));
  const activeDisplayTrackDetails = mode === AudioMode.VOICE_ONLY ? activeVoiceTrack : activeMusicTrack;
  const displayArtwork = activeMusicTrack?.artwork;
  const activeTiming = mode === AudioMode.MUSIC_ONLY
    ? { current: musicCurrentTime, duration: musicDuration }
    : { current: voiceCurrentTime, duration: voiceDuration };
  const progress = activeTiming.duration > 0 ? (activeTiming.current / activeTiming.duration) * 100 : 0;
  const activeVolume = mode === AudioMode.MUSIC_ONLY ? musicVolume : voiceVolume;

  const handlePlayPause = () => {
    console.log('[Footer] handlePlayPause called. Mode:', mode, 'isMusicPlaying:', isMusicPlaying, 'isVoicePlaying:', isVoicePlaying);
    startUserInteraction?.();
    if (mode === AudioMode.MUSIC_ONLY) {
      isMusicPlaying ? pauseMusic() : playMusic();
    } else if (mode === AudioMode.VOICE_ONLY) {
      isVoicePlaying ? pauseVoice() : playVoice();
    } else {
      if (isVoicePlaying || isMusicPlaying) {
        console.log('[Footer] Pausing both');
        pauseVoice();
        pauseMusic();
      } else {
        console.log('[Footer] Playing both');
        playVoice();
        playMusic();
      }
    }
  };

  const handleSeek = (newProgress: number) => {
    startUserInteraction?.();
    const duration = mode === AudioMode.MUSIC_ONLY ? musicDuration : voiceDuration;
    if (duration > 0) {
      const time = (newProgress / 100) * duration;
      if (mode === AudioMode.MUSIC_ONLY) {
        seekMusic(time);
      } else {
        seekVoice(time);
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    startUserInteraction?.();
    if (mode === AudioMode.MUSIC_ONLY) {
      setMusicVolume(newVolume);
    } else {
      setVoiceVolume(newVolume);
    }
  };

  const handleMusicTrackSelect = (track: AudioTrack) => {
    startUserInteraction?.();
    loadMusicTrack(track);
    playMusic();
  };

  const handleNextMusicTrack = () => {
    const currentIndex = musicPlaylist.findIndex(t => t.id === activeMusicTrack?.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % musicPlaylist.length;
      handleMusicTrackSelect(musicPlaylist[nextIndex]);
    }
  };

  const handlePrevMusicTrack = () => {
    const currentIndex = musicPlaylist.findIndex(t => t.id === activeMusicTrack?.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length;
      handleMusicTrackSelect(musicPlaylist[prevIndex]);
    }
  };

  useEffect(() => {
    if (isMounted && !activeMusicTrack && musicPlaylist.length > 0) {
      loadMusicTrack(musicPlaylist[0]);
    }
  }, [isMounted, activeMusicTrack, loadMusicTrack]);

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
          />
        </Container>
      )}

      {!isMiniMode && !isExpanded && (
        <Container size="lg" style={{ height: '100%' }}>
          <StandardPlayer
            currentTrack={activeDisplayTrackDetails}
            artworkUrl={displayArtwork}
            isPlaying={isEffectivelyPlaying}
            progress={progress}
            colors={colors}
            progressBarRef={progressBarRef}
            colorScheme={colorScheme}
            currentTime={activeTiming.current}
            duration={activeTiming.duration}
            volume={activeVolume}
            mode={mode}
            onPlayToggle={handlePlayPause}
            onVolumeChange={handleVolumeChange}
            onSeek={handleSeek}
            onModeChange={setMode}
            onMinimizeToggle={handleMinimizeToggle}
            onPlaylistToggle={handlePlaylistToggle}
            onPrevTrack={handlePrevMusicTrack}
            onNextTrack={handleNextMusicTrack}
            startUserInteraction={startUserInteraction}
          />
        </Container>
      )}

      {!isMiniMode && isExpanded && (
        <Container size="lg" style={{ height: '100%' }}>
          <Playlist
            currentTrack={activeMusicTrack}
            isPlaying={isMusicPlaying}
            colors={colors}
            colorScheme={colorScheme}
            tracks={musicPlaylist}
            onMinimizeToggle={handleMinimizeToggle}
            onPlaylistToggle={handlePlaylistToggle}
            onTrackSelect={handleMusicTrackSelect}
            startUserInteraction={startUserInteraction}
            isPlaylistOpen={isExpanded}
            currentTrackIndex={musicPlaylist.findIndex(t => t.id === activeMusicTrack?.id)}
          />
        </Container>
      )}
    </Box>
  );
}; 