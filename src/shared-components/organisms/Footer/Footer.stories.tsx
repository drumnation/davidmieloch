import type { Meta, StoryObj } from '@storybook/react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandMedium } from '@tabler/icons-react';
import { Footer } from './Footer';
import { SocialLink, SoundCloudTrack } from './Footer.types';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Footer component with mobile-first design that adapts to different screen sizes. Contains social links, music tracks, and copyright information.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: <IconBrandGithub size={20} />, url: 'https://github.com/dmieloch' },
  { name: 'LinkedIn', icon: <IconBrandLinkedin size={20} />, url: 'https://linkedin.com/in/dmieloch' },
  { name: 'Medium', icon: <IconBrandMedium size={20} />, url: 'https://medium.com/@davidmieloch' },
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

/**
 * Mobile view of the default footer
 */
export const DefaultMobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Default footer as viewed on mobile devices. Layout stacks vertically for smaller screens, with touch-friendly spacing for links.',
      },
    },
  },
};

/**
 * Tablet view of the default footer
 */
export const DefaultTablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Default footer as viewed on tablet devices. Shows the responsive design between mobile and desktop sizes.',
      },
    },
  },
};

export const WithoutMusic: Story = {
  args: {
    socialLinks,
    soundCloudTracks: [],
  },
};

/**
 * Mobile view of the footer without music tracks
 */
export const WithoutMusicMobile: Story = {
  args: {
    ...WithoutMusic.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Footer without music tracks as viewed on mobile devices.',
      },
    },
  },
};

export const CustomSocialLinks: Story = {
  args: {
    socialLinks: [
      { name: 'GitHub', icon: <IconBrandGithub size={20} />, url: 'https://github.com/dmieloch' },
    ],
    soundCloudTracks,
  },
};

/**
 * Mobile view of the footer with custom social links
 */
export const CustomSocialLinksMobile: Story = {
  args: {
    ...CustomSocialLinks.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Footer with custom social links as viewed on mobile devices.',
      },
    },
  },
}; 