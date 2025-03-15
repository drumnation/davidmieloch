"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { SoundCloudTrack } from './Footer.types';
import WaveSurfer from 'wavesurfer.js';

export const useFooterPlayer = (tracks: SoundCloudTrack[]) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  
  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);
  
  const togglePlay = useCallback((trackId: number) => {
    if (activeTrack === trackId) {
      setIsPlaying(prev => !prev);
      
      if (wavesurferRef.current) {
        if (isPlaying) {
          wavesurferRef.current.pause();
        } else {
          wavesurferRef.current.play();
        }
      }
    } else {
      setActiveTrack(trackId);
      setIsPlaying(true);
      setCurrentTime(0);
      
      // Load the new track in WaveSurfer
      if (wavesurferRef.current) {
        const track = tracks.find(t => t.id === trackId);
        if (track) {
          wavesurferRef.current.load(track.url);
        }
      }
    }
  }, [activeTrack, isPlaying, tracks]);
  
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    
    if (wavesurferRef.current) {
      wavesurferRef.current.setMuted(!isMuted);
    }
  }, [isMuted]);
  
  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);
  
  // Initialize WaveSurfer when component mounts or when active track changes
  useEffect(() => {
    const initializeWaveSurfer = async () => {
      try {
        if (activeTrack) {
          const track = tracks.find(t => t.id === activeTrack);
          
          if (track) {
            if (wavesurferRef.current) {
              wavesurferRef.current.destroy();
            }
            
            const container = document.getElementById('waveform');
            if (container) {
              wavesurferRef.current = WaveSurfer.create({
                container: '#waveform',
                waveColor: '#8B9CCB',
                progressColor: '#4361EE',
                url: track.url,
                height: 80,
                barWidth: 2,
                barGap: 1,
                barRadius: 3,
                cursorWidth: 1,
                cursorColor: '#fff',
                normalize: true,
              });
              
              wavesurferRef.current.on('ready', () => {
                if (wavesurferRef.current) {
                  setDuration(wavesurferRef.current.getDuration());
                  wavesurferRef.current.setVolume(volume / 100);
                  if (isPlaying) {
                    wavesurferRef.current.play();
                  }
                }
              });
              
              wavesurferRef.current.on('audioprocess', () => {
                if (wavesurferRef.current) {
                  setCurrentTime(wavesurferRef.current.getCurrentTime());
                }
              });
              
              wavesurferRef.current.on('finish', () => {
                setIsPlaying(false);
              });
            }
          }
        }
      } catch (error) {
        console.error('Error initializing WaveSurfer:', error);
      }
    };
    
    if (typeof window !== 'undefined') {
      initializeWaveSurfer();
    }
    
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [activeTrack, isPlaying, tracks, volume]);
  
  // Handle volume changes
  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(isMuted ? 0 : volume / 100);
    }
  }, [volume, isMuted]);
  
  // Handle play/pause state changes
  useEffect(() => {
    if (wavesurferRef.current && activeTrack) {
      if (isPlaying) {
        wavesurferRef.current.play();
      } else {
        wavesurferRef.current.pause();
      }
    }
  }, [isPlaying, activeTrack]);
  
  // Add keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && activeTrack) {
        e.preventDefault();
        togglePlay(activeTrack);
      }
      
      if (e.code === 'ArrowLeft' && activeTrack && wavesurferRef.current) {
        wavesurferRef.current.skip(-5);
      }
      
      if (e.code === 'ArrowRight' && activeTrack && wavesurferRef.current) {
        wavesurferRef.current.skip(5);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeTrack, togglePlay]);
  
  const currentTrack = activeTrack ? tracks.find(t => t.id === activeTrack) : null;
  const percentComplete = duration ? (currentTime / duration) * 100 : 0;
  
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
  };
}; 