import { ReactNode } from 'react';
import { MantineSize } from '@mantine/core';
import { SocialLink, SoundCloudTrack } from '../organisms/Footer/Footer.types';

export interface PageTemplateProps {
  children: ReactNode;
  socialLinks?: SocialLink[];
  soundCloudTracks?: SoundCloudTrack[];
  withContainer?: boolean;
  containerSize?: MantineSize | (string & {});
  withAnimation?: boolean;
  animationKey?: string;
  title?: string;
  description?: string;
} 