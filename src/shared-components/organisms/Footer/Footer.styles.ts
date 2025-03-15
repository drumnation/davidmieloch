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
  background-color: ${({ theme }) => theme.colorScheme === 'dark' ? '#1A1B1E' : '#f8f9fa'};
`;

export const GradientBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
`;

export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colorScheme === 'dark' ? '#1A1B1E' : '#f8f9fa'};
  border-top: 1px solid ${({ theme }) => theme.colorScheme === 'dark' ? '#2D3748' : '#E2E8F0'};
  color: ${({ theme }) => theme.colorScheme === 'dark' ? '#ffffff' : '#141517'};
`;

export const SocialAnchor = styled.a`
  text-decoration: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  color: ${({ theme }) => theme.colorScheme === 'dark' ? '#A6A7AB' : '#5c5f66'};
  
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
`;

export const TrackInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TrackTitle = styled.div`
  color: ${({ theme }) => theme.colorScheme === 'dark' ? '#ffffff' : '#141517'};
  font-weight: 500;
  font-size: 0.875rem;
`;

export const TrackArtist = styled.div`
  color: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(20, 21, 23, 0.7)'};
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
  background-color: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(20, 21, 23, 0.1)'};
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
  color: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(20, 21, 23, 0.7)'};
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
  color: ${({ theme }) => theme.colorScheme === 'dark' ? '#ffffff' : '#141517'};
  
  &:hover {
    background-color: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(100, 100, 100, 0.2)' : 'rgba(100, 100, 100, 0.1)'};
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
  background: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(20, 21, 23, 0.2)'};
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
  border-top: 1px solid ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.5)' : 'rgba(200, 200, 200, 0.5)'};
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  background-color: ${({ theme }) => theme.colorScheme === 'dark' ? '#1A1B1E' : '#f8f9fa'};
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
    background: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(200, 200, 200, 0.2)'};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(100, 100, 100, 0.2)'};
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
      ? 'rgba(67, 97, 238, 0.2)' 
      : 'rgba(67, 97, 238, 0.1)' 
    : 'transparent'};
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.isActive 
      ? props.theme.colorScheme === 'dark' 
        ? 'rgba(67, 97, 238, 0.3)' 
        : 'rgba(67, 97, 238, 0.2)' 
      : props.theme.colorScheme === 'dark' 
        ? 'rgba(255, 255, 255, 0.05)' 
        : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const TrackItemTitle = styled.div`
  color: ${({ theme }) => theme.colorScheme === 'dark' ? '#ffffff' : '#141517'};
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

export const TrackItemArtist = styled.div`
  color: ${({ theme }) => theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(20, 21, 23, 0.7)'};
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