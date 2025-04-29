"use client";

import { useEffect, useState } from 'react';
import { Footer } from '../Footer';
import { PersistentFooterProps } from './PersistentFooter.types';

export const PersistentFooter = ({
  socialLinks = []
}: PersistentFooterProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className="persistent-footer"
      data-print-hidden="true"
      aria-hidden="true"
      style={{ display: 'contents' }}
    >
      <Footer
        socialLinks={socialLinks}
      />
    </div>
  );
};
