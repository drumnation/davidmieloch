"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode, useRef } from 'react';
import dynamic from 'next/dynamic';
import { SoundCloudTrack } from '../shared-components/organisms/Footer/Footer.types';
import type ReactPlayerType from 'react-player';

// Dynamically import ReactPlayer with SSR disabled to prevent hydration mismatch
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <div style={{ display: 'none' }}></div>,
});

// Add a type for the internal player
interface ReactPlayerWithInternals extends ReactPlayerType {
  player?: {
    seekTo?: (fraction: number) => void;
  };
}

// Define the context type
interface PlayerContextType {
  tracks: SoundCloudTrack[];
  setTracks: (tracks: SoundCloudTrack[]) => void;
  currentTrack: SoundCloudTrack | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playTrack: (trackId: number | string) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  seekTo: (fraction: number) => void;
  playerReady: boolean;
}

// Create the context with default values to prevent undefined errors
const defaultContextValue: PlayerContextType = {
  tracks: [],
  setTracks: () => {},
  currentTrack: null,
  isPlaying: false,
  togglePlay: () => {},
  playTrack: () => {},
  nextTrack: () => {},
  prevTrack: () => {},
  currentTime: 0,
  duration: 0,
  progress: 0,
  volume: 0.8,
  setVolume: () => {},
  isMuted: false,
  toggleMute: () => {},
  seekTo: () => {},
  playerReady: false
};

// Create the context with the default value
const PlayerContext = createContext<PlayerContextType>(defaultContextValue);

// Export the hook for using the context
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

// Provider component
export function PlayerProvider({ children }: { children: ReactNode }) {
  // Add a state to track if we're on the client
  const [isClient, setIsClient] = useState(false);
  
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<number | null>(null);
  const [volume, setVolume] = useState(0.8); // 0 to 1
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tracks, setTracks] = useState<SoundCloudTrack[]>([]);
  const [playerReady, setPlayerReady] = useState(false);
  
  // Refs
  const playerRef = useRef<ReactPlayerWithInternals>(null);
  
  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Get the current track object
  const currentTrack = activeTrackId !== null 
    ? tracks.find(t => t.id === activeTrackId) || null 
    : null;
  
  // Initialize the first track if no active track
  useEffect(() => {
    if (isClient && tracks.length > 0 && activeTrackId === null) {
      console.log('Initializing first track:', tracks[0]);
      setActiveTrackId(tracks[0].id);
    }
  }, [isClient, tracks, activeTrackId]);
  
  // Custom setTracks function with debugging
  const setTracksWithDebug = useCallback((newTracks: SoundCloudTrack[]) => {
    if (!isClient) return; // Don't update tracks on server
    
    console.log('Setting tracks:', newTracks);
    // Only update tracks if they're different to prevent unnecessary re-renders
    if (JSON.stringify(newTracks) !== JSON.stringify(tracks)) {
      setTracks(newTracks);
    }
  }, [isClient, tracks]);
  
  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!isClient) return; // Don't toggle on server
    
    console.log('Toggle play/pause. Current state:', isPlaying);
    setIsPlaying(prev => !prev);
  }, [isClient, isPlaying]);
  
  // Toggle mute state
  const toggleMute = useCallback(() => {
    if (!isClient) return; // Don't toggle on server
    
    setIsMuted(prev => !prev);
  }, [isClient]);
  
  // Handle seeking
  const seekTo = useCallback((fraction: number) => {
    if (!isClient) return; // Don't seek on server
    
    console.log('Seeking to:', fraction);
    if (!playerRef.current) {
      console.warn('Player ref is not available for seeking');
      return;
    }
    
    try {
      // Update our internal state first
      const newTime = fraction * duration;
      setCurrentTime(newTime);
      setProgress(fraction * 100);
      
      // Then try to use the player's seekTo method
      if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
        console.log('Using standard seekTo method');
        playerRef.current.seekTo(fraction, 'fraction');
      } else if (playerRef.current && playerRef.current.player && typeof playerRef.current.player.seekTo === 'function') {
        console.log('Using player.seekTo method');
        playerRef.current.player.seekTo(fraction);
      } else {
        console.warn('Could not find a valid seekTo method on the player');
        
        // Force a reload of the player at the new position if we couldn't use seekTo
        if (isPlaying) {
          setIsPlaying(false);
          setTimeout(() => {
            setIsPlaying(true);
          }, 50);
        }
      }
    } catch (error) {
      console.error('Error in seekTo:', error);
    }
  }, [isClient, duration, isPlaying]);
  
  // Play a specific track
  const playTrack = useCallback((trackId: number | string) => {
    if (!isClient) return; // Don't play on server
    
    console.log('Playing track:', trackId);
    const numericId = typeof trackId === 'string' ? Number(trackId) : trackId;
    setActiveTrackId(numericId);
    setIsPlaying(true);
    setCurrentTime(0);
    setProgress(0);
  }, [isClient]);
  
  // Go to next track
  const goToNextTrack = useCallback(() => {
    if (!isClient) return; // Don't navigate on server
    
    console.log('Going to next track');
    if (!currentTrack || !tracks.length) {
      console.warn('No current track or tracks available');
      return;
    }
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    const nextTrackId = tracks[nextIndex].id;
    
    console.log('Next track index:', nextIndex, 'Next track ID:', nextTrackId);
    setActiveTrackId(nextTrackId);
    setIsPlaying(true);
    setCurrentTime(0);
    setProgress(0);
  }, [isClient, currentTrack, tracks]);
  
  // Go to previous track
  const goToPrevTrack = useCallback(() => {
    if (!isClient) return; // Don't navigate on server
    
    console.log('Going to previous track');
    if (!currentTrack || !tracks.length) {
      console.warn('No current track or tracks available');
      return;
    }
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    const prevTrackId = tracks[prevIndex].id;
    
    console.log('Previous track index:', prevIndex, 'Previous track ID:', prevTrackId);
    setActiveTrackId(prevTrackId);
    setIsPlaying(true);
    setCurrentTime(0);
    setProgress(0);
  }, [isClient, currentTrack, tracks]);
  
  // Handle progress updates
  const handleProgress = useCallback((state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!isClient) return; // Don't update on server
    
    setCurrentTime(state.playedSeconds);
    setProgress(state.played * 100); // Convert to percentage
  }, [isClient]);
  
  // Handle duration change
  const handleDuration = useCallback((duration: number) => {
    if (!isClient) return; // Don't update on server
    
    console.log('Duration set:', duration);
    setDuration(duration);
  }, [isClient]);
  
  // Handle end of track
  const handleEnded = useCallback(() => {
    if (!isClient) return; // Don't handle on server
    
    console.log('Track ended, going to next track');
    goToNextTrack();
  }, [isClient, goToNextTrack]);
  
  // Handle player ready
  const handleReady = useCallback(() => {
    if (!isClient) return; // Don't update on server
    
    console.log('Player is ready');
    setPlayerReady(true);
  }, [isClient]);
  
  // Handle player error
  const handleError = useCallback((error: Error | string) => {
    if (!isClient) return; // Don't handle on server
    
    console.error('Player error:', error);
  }, [isClient]);
  
  // Persist volume settings in localStorage
  useEffect(() => {
    // Only run on client side
    if (!isClient) return;
    
    try {
      // Load saved volume settings
      const savedVolume = localStorage.getItem('player-volume');
      const savedMuted = localStorage.getItem('player-muted');
      
      if (savedVolume) {
        setVolume(parseFloat(savedVolume));
      }
      
      if (savedMuted) {
        setIsMuted(savedMuted === 'true');
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, [isClient]);
  
  // Save volume settings when they change
  useEffect(() => {
    // Only run on client side
    if (!isClient) return;
    
    try {
      localStorage.setItem('player-volume', volume.toString());
      localStorage.setItem('player-muted', isMuted.toString());
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [isClient, volume, isMuted]);
  
  // Get the current track URL - ensure it's properly formatted for SoundCloud
  const getFormattedUrl = (track: SoundCloudTrack | null) => {
    if (!track) return '';
    
    // If directUrl is available and it's a SoundCloud URL, use it
    if (track.directUrl && track.directUrl.includes('soundcloud.com')) {
      console.log('Using direct SoundCloud URL:', track.directUrl);
      return track.directUrl;
    }
    
    // Otherwise use the API URL
    console.log('Using API URL:', track.url);
    return track.url;
  };
  
  // Don't render anything on the server
  if (!isClient) {
    return <>{children}</>;
  }
  
  // The value to be provided to the context
  const contextValue: PlayerContextType = {
    tracks,
    setTracks: setTracksWithDebug,
    currentTrack,
    isPlaying,
    togglePlay,
    playTrack,
    nextTrack: goToNextTrack,
    prevTrack: goToPrevTrack,
    currentTime,
    duration,
    progress,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    seekTo,
    playerReady
  };
  
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
      
      {/* Only render the player if we have a current track */}
      {currentTrack && (
        <div style={{ display: 'none' }}>
          <ReactPlayer
            ref={playerRef}
            url={getFormattedUrl(currentTrack)}
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            onReady={handleReady}
            onError={handleError}
            width="0"
            height="0"
            config={{
              soundcloud: {
                options: {
                  auto_play: isPlaying,
                  show_artwork: false,
                  visual: false,
                  buying: false,
                  sharing: false,
                  download: false,
                  show_playcount: false,
                  show_user: false,
                  single_active: true
                }
              }
            }}
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
} 