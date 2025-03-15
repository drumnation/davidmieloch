"use client";

import { useColorScheme } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { SocialLink, SoundCloudTrack } from './Footer.types';

// This function will be used in the Footer component to create the social links with JSX
export const getDefaultSocialLinks = () => {
  return [
    { name: 'GitHub', url: 'https://github.com/dmieloch' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/dmieloch' },
    { name: 'Medium', url: 'https://medium.com/@davidmieloch' },
  ];
};

export const useFooter = (
  socialLinks?: SocialLink[],
  soundCloudTracks?: SoundCloudTrack[]
) => {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const currentYear = new Date().getFullYear();

  const defaultSoundCloudTracks: SoundCloudTrack[] = [
    { 
      id: 1,
      title: 'Orchestral & Chamber Ensemble',
      artist: 'David Mieloch', 
      url: 'https://soundcloud.com/davidmieloch/sets/orchestral-chamber-ensemble-1',
      artwork: 'https://i1.sndcdn.com/artworks-000108171431-w61ayi-t500x500.jpg',
      duration: 184
    },
    { 
      id: 2,
      title: 'Video Game Music Examples',
      artist: 'David Mieloch',
      url: 'https://soundcloud.com/davidmieloch/sets/video-game-music-examples',
      artwork: 'https://i1.sndcdn.com/artworks-000108171431-w61ayi-t500x500.jpg',
      duration: 210
    },
  ];

  const links = socialLinks || [];
  const tracks = soundCloudTracks || defaultSoundCloudTracks;

  return {
    theme,
    isDark,
    currentYear,
    links,
    tracks
  };
}; 