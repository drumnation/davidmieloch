import { ReactNode } from 'react';

export interface SocialLink {
  name: string;
  icon: ReactNode;
  url: string;
}

export interface SoundCloudTrack {
  id: number;
  title: string;
  artist: string;
  url: string;
  waveformUrl?: string;
  artwork: string;
  duration: number; // duration in seconds
}

export interface FooterProps {
  socialLinks?: SocialLink[];
  soundCloudTracks?: SoundCloudTrack[];
} 