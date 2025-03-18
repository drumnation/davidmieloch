"use client";

import { useState, useCallback } from 'react';
import { SoundCloudTrack } from './Footer.types';

export const useFooterPlayer = (tracks: SoundCloudTrack[]) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentComplete, setPercentComplete] = useState(0);
  
  // Simple toggle for expanding/collapsing the player
  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);
  
  // Toggle play/pause or select a new track
  const togglePlay = useCallback((trackId: number) => {
    if (activeTrack === trackId) {
      setIsPlaying(prev => !prev);
    } else {
      setActiveTrack(trackId);
      setIsPlaying(true);
      // Reset time when changing tracks
      setCurrentTime(0);
      setPercentComplete(0);
    }
  }, [activeTrack]);
  
  // Toggle mute state
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);
  
  // Format time for display (mm:ss)
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);
  
  // Update progress from external source (SoundCloud Widget)
  const updateProgress = useCallback((timeInSeconds: number, durationInSeconds: number) => {
    setCurrentTime(timeInSeconds);
    setDuration(durationInSeconds);
    setPercentComplete(durationInSeconds > 0 ? (timeInSeconds / durationInSeconds) * 100 : 0);
  }, []);
  
  // Get the current track object
  const currentTrack = activeTrack ? tracks.find(t => t.id === activeTrack) : null;
  
  return {
    isExpanded,
    isPlaying,
    activeTrack,
    volume,
    isMuted,
    duration,
    currentTime,
    currentTrack,
    percentComplete,
    toggleExpand,
    togglePlay,
    toggleMute,
    formatTime,
    setVolume,
    updateProgress,
    setActiveTrack,
    setIsPlaying
  };
}; 