"use client";

import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 50;
`;

export const GradientBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
`;

export const SocialLinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-end;
`;

export const SocialAnchor = styled.a`
  text-decoration: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }
`;

export const MiniPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

export const TrackInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TrackArtwork = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.75rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MiniWaveformContainer = styled.div`
  flex-grow: 1;
  margin: 0 1rem;
  position: relative;
  height: 1.5rem;
`;

export const ProgressBar = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 9999px;
  bottom: 0;
`;

export const ProgressFill = styled.div<{ width: string }>`
  height: 100%;
  border-radius: 9999px;
  width: ${props => props.width};
`;

export const TimeDisplay = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  top: -4px;
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
  
  &:hover {
    background-color: rgba(100, 100, 100, 0.2);
  }
  
  &:focus {
    outline: none;
  }
`;

export const ExpandedPlayerContainer = styled.div`
  padding: 1rem;
  border-top-width: 1px;
  max-height: 24rem;
  overflow-y: auto;
`;

export const ActiveTrackContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
`;

export const ActiveTrackHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ActiveTrackArtwork = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 0.75rem;
`;

export const WaveformContainer = styled.div`
  height: 5rem;
  margin-top: 0.5rem;
  border-radius: 0.375rem;
  overflow: hidden;
`;

export const TrackControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const VolumeSlider = styled.input`
  width: 6rem;
  height: 0.5rem;
  border-radius: 9999px;
  appearance: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
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

export const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TrackItem = styled.li<{ isActive: boolean }>`
  display: flex;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.isActive ? 'rgba(100, 100, 100, 0.2)' : 'transparent'};
  
  &:hover {
    background-color: rgba(100, 100, 100, 0.2);
  }
`;

export const TrackItemContent = styled.div`
  margin-left: 0.75rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TrackItemControls = styled.div`
  display: flex;
  align-items: center;
`;

export const SoundCloudLink = styled.a`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const FooterInfo = styled.div`
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top-width: 1px;
`;

export const CopyrightSection = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  width: 100%;
`; 