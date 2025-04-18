"use client";

import { Box, Text } from '@mantine/core';
import { Music, ChevronUp, ChevronDown, Play, Pause, SkipBack, SkipForward, X, Plus, ListMusic } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { 
  FooterContainer, 
  GradientBorder, 
  MiniPlayerContainer,
  MiniModeContainer,
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
  TrackItemContent,
  ArtworkOverlay,
  ArtworkContainer
} from './Footer.styles';
import { FooterProps } from './Footer.types';
import { useFooter } from './Footer.hook';
import { usePlayer } from '../../../providers/PlayerProvider';
import { useTheme } from '../../../contexts/ThemeContext';

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
  const [isMiniMode, setIsMiniMode] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [interactionTimeout, setInteractionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [userIntentionalMinimize, setUserIntentionalMinimize] = useState(false);
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

  // Handle scroll event to automatically minimize/maximize player
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      // Skip if user is currently interacting with player controls
      if (isUserInteracting) return;
      
      // If player is expanded, don't auto-minimize/maximize via scroll
      if (isExpanded) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollThreshold = 10; // Small threshold
      const scrollDistance = Math.abs(scrollTop - lastScrollTop);

      // Only act if scroll distance is significant
      if (scrollDistance > scrollThreshold) {
          const isScrollingDown = scrollTop > lastScrollTop;

          if (isScrollingDown) {
              // Scrolling Down: Always minimize if not already mini
              if (!isMiniMode) {
                  setIsMiniMode(true);
                  // Ensure playlist is also closed if open
                  if (isExpanded) setIsExpanded(false); 
                  setUserIntentionalMinimize(false); // Scroll caused minimize
              }
          } else {
              // Scrolling Up: Maximize ONLY if currently mini AND not intentionally minimized by user
              if (isMiniMode && !userIntentionalMinimize) {
                  setIsMiniMode(false);
              }
          }
      }
      
      // Update scroll position *after* logic
      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMounted, lastScrollTop, isMiniMode, isUserInteracting, isExpanded, userIntentionalMinimize]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Set a temporary flag when user manually interacts with controls
  const startUserInteraction = () => {
    setIsUserInteracting(true);
    
    // Clear any existing timeout
    if (interactionTimeout) {
      clearTimeout(interactionTimeout);
    }
    
    // Reset the flag after a delay
    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000); // 2 seconds grace period
    
    setInteractionTimeout(timeout);
  };

  // Renamed from handleTriStateButton - only toggles minimize/maximize
  const handleMinimizeToggle = () => {
    startUserInteraction();
    
    if (isMiniMode) {
      // User is maximizing FROM mini mode
      setIsMiniMode(false);
      setIsExpanded(false); // Go to Open state
      setUserIntentionalMinimize(false); // User action overrides scroll intention
    } 
    else {
      // User is minimizing TO mini mode (from Open or Playlist)
      setIsExpanded(false); // Ensure playlist is closed
      setIsMiniMode(true);
      setUserIntentionalMinimize(true); // User explicitly chose minimize
    }
  };

  // New handler to exclusively toggle the playlist view
  const handlePlaylistToggle = () => {
    startUserInteraction();
    setIsExpanded(prev => !prev);
  };

  const handleTrackSelect = (trackId: number | string) => {
    startUserInteraction();
    console.log('Selecting track:', trackId);
    playTrack(trackId);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeout) {
        clearTimeout(interactionTimeout);
      }
    };
  }, [interactionTimeout]);

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
    <FooterContainer 
      style={{ 
        backgroundColor: colors.background,
        borderTop: `1px solid ${colors.border}`,
        color: colors.text,
        boxShadow: isMiniMode ? '0 -1px 3px rgba(0,0,0,0.1)' : '0 -2px 10px rgba(0,0,0,0.15)'
      }}
      $isExpanded={isExpanded}
      $isMiniMode={isMiniMode}
      data-testid="footer"
      data-loaded="true"
      className="Footer-loaded"
      $colorScheme={colorScheme}
    >
      {/* Gradient border */}
      <GradientBorder />
      
      {/* --------------- Mini Mode Player --------------- */}
      {isMiniMode && (
        <MiniModeContainer $colorScheme={colorScheme}>
          {/* Track artwork */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative'
            }} 
            onClick={() => {
              startUserInteraction();
              togglePlay();
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {currentTrack?.artwork ? (
              <ArtworkContainer style={{ display: 'flex', alignItems: 'center' }}>
                <TrackArtwork 
                  src={currentTrack.artwork} 
                  alt={`${currentTrack.title} artwork`} 
                  style={{ width: '30px', height: '30px', margin: 0 }}
                />
                <ArtworkOverlay>
                  {isPlaying ? (
                    <Pause size={12} style={{ color: '#fff' }} />
                  ) : (
                    <Play size={12} style={{ color: '#fff' }} />
                  )}
                </ArtworkOverlay>
              </ArtworkContainer>
            ) : (
              <div style={{ 
                width: '30px', 
                height: '30px', 
                backgroundColor: 'rgba(67, 97, 238, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                margin: 0
              }}>
                <Music size={15} style={{ color: '#4361EE' }} />
              </div>
            )}
          </div>
          
          {/* Progress bar */}
          <div style={{ flex: 1, margin: '0 0.5rem' }}>
            <ProgressBar ref={progressBarRef} $colorScheme={colorScheme} style={{ margin: 0, width: '100%' }}>
              <ProgressFill style={{ width: `${progress}%` }} />
            </ProgressBar>
          </div>
          
          {/* Maximize Button (from mini mode) */}
          <ControlButton 
            onClick={handleMinimizeToggle}
            aria-label="Expand player"
            style={{ padding: 0, margin: 0 }}
            $colorScheme={colorScheme}
          >
            <ChevronUp size={14} style={{ color: colors.text }} />
          </ControlButton>
        </MiniModeContainer>
      )}

      {/* --------------- Open State Player (!isMiniMode && !isExpanded) --------------- */}
      {!isMiniMode && !isExpanded && (
        <MiniPlayerContainer $colorScheme={colorScheme}>
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
                  <ArtworkContainer 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => {
                      startUserInteraction();
                      togglePlay();
                    }}
                  >
                    <TrackArtwork 
                      src={currentTrack.artwork} 
                      alt={`${currentTrack.title} artwork`} 
                      style={{ width: '6.25rem', height: '6.25rem' }}
                    />
                    <ArtworkOverlay>
                      {isPlaying ? (
                        <Pause size={24} style={{ color: '#fff' }} />
                      ) : (
                        <Play size={24} style={{ color: '#fff' }} />
                      )}
                    </ArtworkOverlay>
                  </ArtworkContainer>
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
                  <TrackTitle $colorScheme={colorScheme}>{currentTrack?.title || 'My Music'}</TrackTitle>
                  {currentTrack && <TrackArtist $colorScheme={colorScheme}>{currentTrack.artist}</TrackArtist>}
                </div>
                
                {/* Playback controls */}
                <ControlsContainer style={{ alignSelf: 'center' }}>
                  <ControlButton 
                    onClick={() => {
                      startUserInteraction();
                      prevTrack();
                    }}
                    aria-label="Previous track"
                    disabled={!currentTrack}
                    $colorScheme={colorScheme}
                  >
                    <SkipBack size={18} style={{ color: colors.text }} />
                  </ControlButton>
                  
                  <ControlButton 
                    onClick={() => {
                      startUserInteraction();
                      togglePlay();
                    }}
                    aria-label={isPlaying ? "Pause" : "Start playing"}
                    disabled={!currentTrack}
                    style={{ margin: '0 0.75rem' }}
                    $colorScheme={colorScheme}
                  >
                    {isPlaying ? (
                      <Pause size={24} style={{ color: colors.text }} />
                    ) : (
                      <Play size={24} style={{ color: colors.text }} />
                    )}
                  </ControlButton>
                  
                  <ControlButton 
                    onClick={() => {
                      startUserInteraction();
                      nextTrack();
                    }}
                    aria-label="Next track"
                    disabled={!currentTrack}
                    $colorScheme={colorScheme}
                  >
                    <SkipForward size={18} style={{ color: colors.text }} />
                  </ControlButton>
                </ControlsContainer>
              </div>
              
              {/* Container for Playlist and Minimize buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* Playlist Toggle Button (Added) */}
                <ControlButton 
                  onClick={handlePlaylistToggle}
                  aria-label="Show playlist"
                  $colorScheme={colorScheme}
                >
                  <ListMusic size={18} style={{ color: colors.text }} />
                </ControlButton>

                {/* Minimize Button (Chevron Down) */}
                <ControlButton 
                  onClick={handleMinimizeToggle}
                  aria-label="Minimize player"
                  $colorScheme={colorScheme}
                >
                  <ChevronDown size={18} style={{ color: colors.text }} />
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
                  <ProgressBar ref={progressBarRef} $colorScheme={colorScheme}>
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
      )}

      {/* --------------- Playlist State (!isMiniMode && isExpanded) --------------- */}
      {!isMiniMode && isExpanded && (
        <>
          {/* 1. Compact Controls Section (Mimics MiniModeContainer layout) */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              boxSizing: 'border-box', // Ensure padding is included in height
              justifyContent: 'space-between',
              padding: '0.3rem 0.5rem', // Added top/bottom padding (0.3rem), kept left/right
              maxWidth: '1000px',
              margin: '0 auto',
              width: '100%',
              height: '55px', // Increased height slightly for padding
              borderBottom: `1px solid ${colors.border}`,
              backgroundColor: colors.background // Ensure background matches
            }}
          >
            {/* Compact Controls: Artwork + Play/Pause Overlay */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                position: 'relative'
              }} 
              onClick={() => { startUserInteraction(); togglePlay(); }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {currentTrack?.artwork ? (
                <ArtworkContainer style={{ display: 'flex', alignItems: 'center' }}>
                  <TrackArtwork 
                    src={currentTrack.artwork} 
                    alt={`${currentTrack.title} artwork`} 
                    style={{ width: '30px', height: '30px', margin: 0 }} // Mini size
                  />
                  <ArtworkOverlay>
                    {isPlaying ? <Pause size={12} style={{ color: '#fff' }} /> : <Play size={12} style={{ color: '#fff' }} />}
                  </ArtworkOverlay>
                </ArtworkContainer>
              ) : (
                <div style={{ width: '30px', height: '30px', backgroundColor: 'rgba(67, 97, 238, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', margin: 0 }}>
                  <Music size={15} style={{ color: '#4361EE' }} />
                </div>
              )}
            </div>

            {/* Compact Controls: TODO: Add compact title/artist here if needed */}

            {/* Compact Controls: Progress Bar */}
            <div style={{ flex: 1, margin: '0 0.75rem', display: 'flex', alignItems: 'center', height: '100%' }}>
              <ProgressBar ref={progressBarRef} $colorScheme={colorScheme} style={{ margin: 0, width: '100%' }}>
                <ProgressFill style={{ width: `${progress}%` }} />
              </ProgressBar>
            </div>
            
            {/* Compact Controls: Container for Playlist and Minimize buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {/* Playlist Toggle Button (Active) */}
              <ControlButton 
                onClick={handlePlaylistToggle}
                aria-label="Hide playlist"
                style={{ padding: '0.15rem' }}
                $colorScheme={colorScheme}
              >
                <ListMusic size={14} style={{ color: colors.text }} />
              </ControlButton>
              
              {/* Minimize Button (Chevron Down) - Replaced to ensure correct handler */}
               <ControlButton 
                 onClick={handleMinimizeToggle} // Corrected handler
                 aria-label="Minimize player" // Correct label
                 style={{ padding: '0.15rem' }} // Match compact style
                 $colorScheme={colorScheme}
               >
                 <ChevronDown size={14} style={{ color: colors.text }} />
               </ControlButton>
             </div>
          </div>

          {/* 2. Expanded Player (Playlist) Section */}
          <ExpandedPlayerContainer $colorScheme={colorScheme}>
            <Text size="sm" fw={600} style={{ color: colors.textSecondary, marginBottom: "0.5rem" }}>My Tracks</Text>
            <TrackList $colorScheme={colorScheme}>
              {displayTracks && displayTracks.length > 0 ? (
                displayTracks.map((track) => (
                  <TrackItem 
                    key={track.id}
                    onClick={() => handleTrackSelect(track.id)}
                    $isActive={currentTrack?.id === track.id}
                    $colorScheme={colorScheme}
                  >
                    <TrackItemContent>
                      {track.artwork && (
                        <TrackArtwork 
                          src={track.artwork} 
                          alt={`${track.title} artwork`} 
                          style={{ width: '2rem', height: '2rem' }} // Size for playlist items
                        />
                      )}
                      <TrackDetails>
                        <TrackItemTitle $colorScheme={colorScheme}>{track.title}</TrackItemTitle>
                        <TrackItemArtist $colorScheme={colorScheme}>{track.artist}</TrackItemArtist>
                      </TrackDetails>
                    </TrackItemContent>
                  </TrackItem>
                ))
              ) : (
                <Text size="sm" style={{ color: colors.textMuted, padding: "0.5rem" }}>No tracks available</Text>
              )}
            </TrackList>
          </ExpandedPlayerContainer>
        </>
      )}
    </FooterContainer>
  );
}; 