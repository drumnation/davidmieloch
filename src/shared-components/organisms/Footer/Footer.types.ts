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
  directUrl?: string; // Direct link to SoundCloud track
  waveformUrl?: string;
  artwork: string;
  duration: number; // duration in seconds
  playCount?: number; // number of plays on SoundCloud
}

export interface FooterProps {
  socialLinks?: SocialLink[];
  soundCloudTracks?: SoundCloudTrack[];
} 