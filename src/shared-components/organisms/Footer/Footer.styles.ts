"use client";

import styled from 'styled-components';

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

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 50;
  background-color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.background 
      : defaultColors.light.background};
`;

export const GradientBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
`;

export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.background 
      : defaultColors.light.background};
  border-top: 1px solid ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.border 
      : defaultColors.light.border};
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.text 
      : defaultColors.light.text};
`;

export const SocialAnchor = styled.a`
  text-decoration: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.textSecondary 
      : defaultColors.light.textSecondary};
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }
`;

export const MiniPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  background-color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.background 
      : defaultColors.light.background};
`;

export const TrackInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TrackTitle = styled.div`
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.text 
      : defaultColors.light.text};
  font-weight: 500;
  font-size: 0.875rem;
`;

export const TrackArtist = styled.div`
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.textMuted 
      : defaultColors.light.textMuted};
  font-size: 0.75rem;
`;

export const TrackArtwork = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  margin-right: 0.75rem;
  object-fit: cover;
`;

export const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MiniWaveformContainer = styled.div`
  flex: 1;
  margin: 0 1rem;
  max-width: 50%;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

export const ProgressContainer = styled.div`
  flex: 1;
  margin: 0 1rem;
  max-width: 50%;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.progressBackground 
      : defaultColors.light.progressBackground};
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
  position: relative;
`;

export const ProgressFill = styled.div<{ width?: string }>`
  height: 100%;
  background-color: #4361EE;
  width: ${props => props.width || '0%'};
`;

export const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.textMuted 
      : defaultColors.light.textMuted};
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlButton = styled.button`
  padding: 0.25rem;
  margin-right: 0.5rem;
  border-radius: 9999px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.text 
      : defaultColors.light.text};
  
  &:hover {
    background-color: ${({ theme }) => 
      theme.colorScheme === 'dark' 
        ? defaultColors.dark.hoverBackground 
        : defaultColors.light.hoverBackground};
  }
  
  &:focus {
    outline: none;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  background: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.progressBackground 
      : defaultColors.light.progressBackground};
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #4361EE;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #4361EE;
    cursor: pointer;
    border: none;
  }
`;

export const ExpandedPlayerContainer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.border 
      : defaultColors.light.border};
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  background-color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.background 
      : defaultColors.light.background};
`;

export const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => 
      theme.colorScheme === 'dark' 
        ? defaultColors.dark.scrollTrack 
        : defaultColors.light.scrollTrack};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => 
      theme.colorScheme === 'dark' 
        ? defaultColors.dark.scrollThumb 
        : defaultColors.light.scrollThumb};
    border-radius: 4px;
  }
`;

export const TrackItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.isActive 
    ? props.theme.colorScheme === 'dark' 
      ? defaultColors.dark.activeTrackBackground
      : defaultColors.light.activeTrackBackground
    : 'transparent'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.isActive 
      ? props.theme.colorScheme === 'dark' 
        ? defaultColors.dark.activeTrackHoverBackground
        : defaultColors.light.activeTrackHoverBackground
      : props.theme.colorScheme === 'dark' 
        ? defaultColors.dark.inactiveTrackHoverBackground
        : defaultColors.light.inactiveTrackHoverBackground};
  }
`;

export const TrackItemTitle = styled.div`
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.text 
      : defaultColors.light.text};
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const TrackItemArtist = styled.div`
  color: ${({ theme }) => 
    theme.colorScheme === 'dark' 
      ? defaultColors.dark.textMuted 
      : defaultColors.light.textMuted};
  font-size: 0.75rem;
`;

export const TrackItemContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const TrackItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SoundCloudLink = styled.a`
  font-size: 0.75rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ActiveTrackContainer = styled.div`
  margin-bottom: 1rem;
  border-radius: 4px;
  overflow: hidden;
`;

export const ActiveTrackHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
`;

export const ActiveTrackArtwork = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 4px;
  margin-right: 0.75rem;
  object-fit: cover;
`;

export const WaveformContainer = styled.div`
  height: 160px;
  width: 100%;
`;

export const TrackControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
`;

export const SocialLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-end;
`;

export const CopyrightSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  width: 100%;
`;