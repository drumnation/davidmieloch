"use client";

import { useEffect, useState } from 'react';
import { Footer } from '../Footer';
import { PersistentFooterProps } from './PersistentFooter.types';
import { PersistentFooterContainer } from './PersistentFooter.styles';
import { useAudioCrossfade } from './PersistentFooter.hook';

export const PersistentFooter = ({
  socialLinks = [],
  soundCloudTracks = []
}: PersistentFooterProps) => {
  const [isClient, setIsClient] = useState(false);
  // Use our new crossfade hook
  const { isCrossfading } = useAudioCrossfade();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <PersistentFooterContainer
      data-print-hidden="true"
      aria-hidden="true"
    >
      <Footer
        socialLinks={socialLinks}
        soundCloudTracks={soundCloudTracks}
      />
    </PersistentFooterContainer>
  );
};
