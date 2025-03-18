"use client";

import { useEffect, useRef, useState } from 'react';
import { Footer } from '../Footer';
import { PersistentFooterProps } from './PersistentFooter.types';
import { usePlayer } from '../../../providers/PlayerProvider';
import { useFooter } from '../Footer/Footer.hook';

export const PersistentFooter = ({
  socialLinks = []
}: PersistentFooterProps) => {
  const { tracks, setTracks } = usePlayer();
  // Get all default tracks from the useFooter hook
  const { tracks: defaultTracks } = useFooter(socialLinks, []);
  const initializedRef = useRef(false);
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Initialize tracks in the context only once when the component mounts
  useEffect(() => {
    // Only set tracks if they haven't been set yet and we have default tracks
    if (isClient && !initializedRef.current && defaultTracks && defaultTracks.length > 0 && tracks.length === 0) {
      console.log('Setting default tracks from PersistentFooter:', defaultTracks);
      setTracks(defaultTracks);
      initializedRef.current = true;
    }
  }, [isClient, defaultTracks, setTracks, tracks.length]);
  
  // Don't render anything on the server
  if (!isClient) {
    return null;
  }
  
  return (
    <Footer 
      socialLinks={socialLinks}
      soundCloudTracks={tracks.length > 0 ? tracks : defaultTracks}
    />
  );
};
 