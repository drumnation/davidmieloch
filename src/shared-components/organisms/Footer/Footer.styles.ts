"use client";

import styled from 'styled-components';
import { CSSProperties } from 'react';
import { getPageThemeMode, getThemeColors, ThemeMode } from '@/utils/theme-utils';

// Define color scheme type
type ColorScheme = 'light' | 'dark';

// Use our utility to get theme colors
const getColorsForScheme = (scheme: ColorScheme | undefined) => {
  // If scheme is explicitly provided, use it, otherwise fall back to light mode
  const themeMode: ThemeMode = scheme === 'dark' ? 'dark' : 'light';
  return getThemeColors(themeMode);
};

// Define prop type for components needing colorScheme
interface ColorSchemeProps {
  $colorScheme?: ColorScheme;
}

export const FooterContainer = styled.div<ColorSchemeProps & {
  $isExpanded?: boolean;
  $isMiniMode?: boolean;
}>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 50;
  background-color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.tertiary};
  height: ${props => props.$isExpanded ? '300px' : props.$isMiniMode ? '54px' : 'auto'};
  @media (max-width: 768px) {
    height: ${props => (!props.$isMiniMode && !props.$isExpanded) ? '140px' : ''};
  }
  transition: height 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
  transform: translateY(${props => props.$isMiniMode ? '0' : '0'});
  will-change: height, transform, opacity;
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.primary};
`;

export const GradientBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
`;

export const FooterInfo = styled.div<ColorSchemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.tertiary};
  border-top: 1px solid ${({ $colorScheme }) => getColorsForScheme($colorScheme).border.primary};
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.primary};
`;

export const SocialAnchor = styled.a<ColorSchemeProps>`
  text-decoration: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.secondary};
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }
`;

export const MiniPlayerContainer = styled.div<ColorSchemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  background-color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.tertiary};
`;

export const MiniModeContainer = styled.div<ColorSchemeProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  height: 54px;
  background-color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.tertiary};
      
  /* Ensure all direct children are perfectly centered */
  & > * {
    display: flex;
    align-items: center;
  }
`;

export const TrackInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ArtworkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.2s;
`;

export const ArtworkContainer = styled.div`
  position: relative;
  
  &:hover ${ArtworkOverlay} {
    opacity: 1;
  }
`;

export const TrackTitle = styled.div<ColorSchemeProps>`
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.primary};
  font-weight: 500;
  font-size: 1.1rem;
`;

export const TrackArtist = styled.div<ColorSchemeProps>`
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.secondary};
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

export const ProgressBar = styled.div<ColorSchemeProps>`
  width: 100%;
  height: 4px;
  background-color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.secondary};
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

export const TimeDisplay = styled.div<ColorSchemeProps>`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.secondary};
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlButton = styled.button<ColorSchemeProps>`
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
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.primary};
  
  &:hover {
    background-color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.hover};
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

export const VolumeSlider = styled.input<ColorSchemeProps>`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  background: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.secondary};
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

export const ExpandedPlayerContainer = styled.div<ColorSchemeProps>`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ $colorScheme }) => getColorsForScheme($colorScheme).border.primary};
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  background-color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.tertiary};
`;

export const TrackList = styled.div<ColorSchemeProps>`
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
    background: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.scrollTrack};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ $colorScheme }) => getColorsForScheme($colorScheme).background.scrollThumb};
    border-radius: 4px;
  }
`;

export const TrackItem = styled.div<ColorSchemeProps & { $isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.$isActive
    ? getColorsForScheme(props.$colorScheme).background.activeTrackBackground
    : 'transparent'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.$isActive
    ? getColorsForScheme(props.$colorScheme).background.activeTrackHoverBackground
    : getColorsForScheme(props.$colorScheme).background.inactiveTrackHoverBackground};
  }
`;

export const TrackItemTitle = styled.div<ColorSchemeProps>`
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.primary};
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const TrackItemArtist = styled.div<ColorSchemeProps>`
  color: ${({ $colorScheme }) => getColorsForScheme($colorScheme).text.secondary};
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

// Inline styles for components

// Artwork overlay for showing play/pause on hover
export const artworkOverlayStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.2s',
  borderRadius: '4px',
  pointerEvents: 'none', // Prevent overlay from blocking clicks
};

// Track artwork image styling
export const trackArtworkStyle: CSSProperties = {
  display: 'block',
  borderRadius: '4px',
  objectFit: 'cover',
};

// Progress bar container styling
export const progressBarContainerStyle: CSSProperties = {
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
};

// Progress bar fill styling
export const progressFillStyle: CSSProperties = {
  height: '100%',
  background: 'linear-gradient(90deg, #4361EE, #00BCBD)',
  borderRadius: '2px',
  transition: 'width 0.1s linear',
};

// Track list container styling
export const trackListContainerStyle: CSSProperties = {
  maxHeight: '200px',
  overflowY: 'auto',
  paddingRight: '0.5rem',
};

// Base styling for track items in playlist
export const trackItemBaseStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '0.25rem',
  transition: 'background-color 0.15s ease',
};

// Helper to get footer container style based on page theme
export const getFooterContainerStyle = (
  colors: any,
  isMiniMode: boolean,
  isExpanded: boolean
): CSSProperties => {
  // Hardcoded colors for consistency
  return {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    zIndex: 50,
    backgroundColor: colors.background,
    height: isExpanded ? '300px' : isMiniMode ? '54px' : 'auto',
    transition: 'height 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.2s ease-in-out',
    transform: 'translateY(0)',
    willChange: 'height, transform, opacity',
    color: colors.text
  };
};

// Gradient border styling
export const gradientBorderStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '2px',
  background: 'linear-gradient(90deg, #4361EE, #00BCBD)',
  zIndex: 1,
};

// Mini mode group styling
export const miniModeGroupStyle: CSSProperties = {
  height: '100%',
  padding: '0 0.5rem',
  flexWrap: 'nowrap',
};

// Open player container styling
export const openPlayerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  height: '120px',
  padding: '0.75rem 1rem',
  maxWidth: 1000,
  margin: '0 auto',
};

// Playlist container styling
export const playlistContainerStyle: CSSProperties = {
  maxWidth: 1000,
  margin: '0 auto',
  paddingBottom: '1rem',
};

// Compact controls style in expanded mode
export const compactControlsStyle: CSSProperties = {
  padding: '0.3rem 0.5rem',
  height: '55px',
  flexWrap: 'nowrap',
};

// Playlist content area style
export const playlistContentStyle: CSSProperties = {
  padding: '1rem',
};

export const FooterResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    height: 140px;
  }
`;