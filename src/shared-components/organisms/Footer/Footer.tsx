"use client";

import { Box, Text } from '@mantine/core';
import { Music, ChevronUp, ChevronDown, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { 
  FooterContainer, 
  GradientBorder, 
  MiniPlayerContainer,
  ProgressBar,
  ProgressFill,
  ControlsContainer,
  ControlButton,
  ExpandedPlayerContainer,
  TrackList,
  TrackItem,
  TrackTitle,
  TrackArtist,
  TrackItemTitle,
  TrackItemArtist,
  TrackArtwork,
  TrackDetails,
  TrackItemContent
} from './Footer.styles';
import { FooterProps } from './Footer.types';
import { useFooter } from './Footer.hook';
import { usePlayer } from '../../../providers/PlayerProvider';
import { useTheme } from '../../../providers';

// Define default colors to use during server-side rendering
const defaultColors = {
  light: {
    background: '#f0f0f0', // Darker off-white
    text: '#141517',
    textSecondary: '#5c5f66',
    border: 'rgba(0, 0, 0, 0.1)', // Aligned with Header.tsx
    progressBackground: 'rgba(20, 21, 23, 0.1)',
    textMuted: 'rgba(20, 21, 23, 0.7)',
    hoverBackground: 'rgba(100, 100, 100, 0.1)',
    scrollTrack: 'rgba(200, 200, 200, 0.2)',
    scrollThumb: 'rgba(100, 100, 100, 0.2)',
    activeTrackBackground: 'rgba(67, 97, 238, 0.1)',
    activeTrackHoverBackground: 'rgba(67, 97, 238, 0.2)',
    inactiveTrackHoverBackground: 'rgba(0, 0, 0, 0.05)'
  },
  dark: {
    background: '#1A1B1E',
    text: '#ffffff',
    textSecondary: '#A6A7AB',
    border: 'rgba(0, 188, 212, 0.1)', // Aligned with Header.tsx
    progressBackground: 'rgba(255, 255, 255, 0.1)',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    hoverBackground: 'rgba(100, 100, 100, 0.2)',
    scrollTrack: 'rgba(0, 0, 0, 0.2)',
    scrollThumb: 'rgba(255, 255, 255, 0.2)',
    activeTrackBackground: 'rgba(67, 97, 238, 0.2)',
    activeTrackHoverBackground: 'rgba(67, 97, 238, 0.3)',
    inactiveTrackHoverBackground: 'rgba(255, 255, 255, 0.05)'
  }
};

export const Footer = ({ 
  soundCloudTracks = []
}: FooterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { tracks: hookTracks } = useFooter([], soundCloudTracks);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { colorScheme } = useTheme();
  
  // Only render on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const {
    tracks,
    currentTrack,
    isPlaying,
    togglePlay,
    playTrack,
    nextTrack,
    prevTrack,
    currentTime,
    duration,
    progress
  } = usePlayer();

  // Get the appropriate colors based on the current theme
  const colors = colorScheme === 'dark' ? defaultColors.dark : defaultColors.light;

  // Use the tracks from the player context or fallback to hook tracks
  const displayTracks = tracks.length > 0 ? tracks : hookTracks;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTrackSelect = (trackId: number | string) => {
    console.log('Selecting track:', trackId);
    playTrack(trackId);
  };

  // If not mounted yet, return an empty footer to prevent hydration errors
  if (!isMounted) {
    return (
      <Box 
        w="100%"
        style={{
          borderTop: `1px solid ${colors.border}`,
          height: "80px" // Minimum height to prevent layout shift
        }}
      />
    );
  }

  return (
    <Box 
      w="100%"
      style={{
        borderTop: `1px solid ${colors.border}`
      }}
    >
      <FooterContainer>
        <GradientBorder style={{ background: colors.border }} />
        
        {/* Collapsed Mini Player */}
        <MiniPlayerContainer>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '0.75rem 1rem'
          }}>
            {/* Top row: Track info and controls */}
            <div style={{
              display: 'flex',
              width: '100%',
              marginBottom: '0.375rem',
              alignItems: 'center'
            }}>
              {/* Track artwork */}
              <div style={{ marginRight: '1.5rem' }}>
                {currentTrack?.artwork ? (
                  <TrackArtwork 
                    src={currentTrack.artwork} 
                    alt={`${currentTrack.title} artwork`} 
                    style={{ width: '6.25rem', height: '6.25rem' }}
                  />
                ) : (
                  <div style={{ 
                    width: '6.25rem', 
                    height: '6.25rem', 
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px'
                  }}>
                    <Music size={50} style={{ color: '#4361EE' }} />
                  </div>
                )}
              </div>
              
              {/* Track info and controls */}
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                paddingRight: '2rem'
              }}>
                {/* Track title and artist */}
                <div style={{ marginBottom: '0.75rem', textAlign: 'center' }}>
                  <TrackTitle style={{ fontSize: '1.1rem' }}>{currentTrack?.title || 'My Music'}</TrackTitle>
                  {currentTrack && <TrackArtist>{currentTrack.artist}</TrackArtist>}
                </div>
                
                {/* Playback controls */}
                <ControlsContainer style={{ alignSelf: 'center' }}>
                  <ControlButton 
                    onClick={prevTrack}
                    aria-label="Previous track"
                    disabled={!currentTrack}
                  >
                    <SkipBack size={18} style={{ color: colors.text }} />
                  </ControlButton>
                  
                  <ControlButton 
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Start playing"}
                    disabled={!currentTrack}
                    style={{ margin: '0 0.75rem' }}
                  >
                    {isPlaying ? (
                      <Pause size={24} style={{ color: colors.text }} />
                    ) : (
                      <Play size={24} style={{ color: colors.text }} />
                    )}
                  </ControlButton>
                  
                  <ControlButton 
                    onClick={nextTrack}
                    aria-label="Next track"
                    disabled={!currentTrack}
                  >
                    <SkipForward size={18} style={{ color: colors.text }} />
                  </ControlButton>
                </ControlsContainer>
              </div>
              
              {/* Expand button */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '2.5rem' // Match approximate width of the end time
              }}>
                <ControlButton 
                  onClick={handleToggleExpand}
                  aria-label={isExpanded ? "Collapse player" : "Expand player"}
                >
                  {isExpanded ? (
                    <ChevronUp size={18} style={{ color: colors.text }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: colors.text }} />
                  )}
                </ControlButton>
              </div>
            </div>
            
            {/* Bottom row: Timeline */}
            {currentTrack ? (
              <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Text size="xs" style={{ color: colors.textMuted, marginRight: '0.5rem', whiteSpace: 'nowrap' }}>
                  {formatTime(currentTime)}
                </Text>
                <div 
                  style={{ 
                    flex: 1, 
                    position: 'relative',
                    padding: '10px 0',
                    margin: '-10px 0'
                  }}
                >
                  <ProgressBar ref={progressBarRef}>
                    <ProgressFill style={{ width: `${progress}%` }} />
                  </ProgressBar>
                </div>
                <Text size="xs" style={{ color: colors.textMuted, marginLeft: '0.5rem', whiteSpace: 'nowrap', width: '2.5rem', textAlign: 'center' }}>
                  {formatTime(duration)}
                </Text>
              </div>
            ) : (
              <div style={{ width: '100%', height: '4px', backgroundColor: colors.progressBackground, borderRadius: '2px' }} />
            )}
          </div>
        </MiniPlayerContainer>
        
        {/* Expanded Player */}
        {isExpanded && (
          <ExpandedPlayerContainer>
            <Text size="sm" fw={600} style={{ color: colors.textSecondary, marginBottom: "0.5rem" }}>My Tracks</Text>
            
            {/* Track list */}
            <TrackList>
              {displayTracks && displayTracks.length > 0 ? (
                displayTracks.map((track) => (
                  <TrackItem 
                    key={track.id}
                    onClick={() => handleTrackSelect(track.id)}
                    isActive={currentTrack?.id === track.id}
                  >
                    <TrackItemContent>
                      {track.artwork && (
                        <TrackArtwork 
                          src={track.artwork} 
                          alt={`${track.title} artwork`} 
                          style={{ width: '2rem', height: '2rem' }}
                        />
                      )}
                      <TrackDetails>
                        <TrackItemTitle>{track.title}</TrackItemTitle>
                        <TrackItemArtist>{track.artist}</TrackItemArtist>
                      </TrackDetails>
                    </TrackItemContent>
                  </TrackItem>
                ))
              ) : (
                <Text size="sm" style={{ color: colors.textMuted, padding: "0.5rem" }}>
                  No tracks available
                </Text>
              )}
            </TrackList>
          </ExpandedPlayerContainer>
        )}
      </FooterContainer>
    </Box>
  );
}; 