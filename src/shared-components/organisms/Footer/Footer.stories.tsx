import type { Meta, StoryObj } from '@storybook/react';
import { TbBrandGithub, TbBrandLinkedin, TbBrandMedium } from 'react-icons/tb';
import { Footer } from './Footer';
import { SocialLink, SoundCloudTrack } from './Footer.types';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: <TbBrandGithub size={20} />, url: 'https://github.com/dmieloch' },
  { name: 'LinkedIn', icon: <TbBrandLinkedin size={20} />, url: 'https://linkedin.com/in/dmieloch' },
  { name: 'Medium', icon: <TbBrandMedium size={20} />, url: 'https://medium.com/@davidmieloch' },
];

const soundCloudTracks: SoundCloudTrack[] = [
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

export const Default: Story = {
  args: {
    socialLinks,
    soundCloudTracks,
  },
};

export const WithoutMusic: Story = {
  args: {
    socialLinks,
    soundCloudTracks: [],
  },
};

export const CustomSocialLinks: Story = {
  args: {
    socialLinks: [
      { name: 'GitHub', icon: <TbBrandGithub size={20} />, url: 'https://github.com/dmieloch' },
    ],
    soundCloudTracks,
  },
}; 