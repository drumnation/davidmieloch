'use client';

import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { useTheme } from '../../../providers/ThemeProvider';
import { usePathname, useRouter } from 'next/navigation';
import { getIsActive } from './Header.logic';
import { HeaderHookReturn } from './Header.types';

export const useHeaderState = (): HeaderHookReturn => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const pathname = usePathname();
  const router = useRouter();
  
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [socialHovered, setSocialHovered] = useState<string | null>(null);
  const [experienceHovered, setExperienceHovered] = useState(false);
  const [mobileHovered, setMobileHovered] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const [forceUpdate, setForceUpdate] = useState(0);
  
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (isLoading && loadingPath === pathname) {
      setIsLoading(false);
      setLoadingPath(null);
    }
  }, [pathname, isLoading, loadingPath]);

  // Log theme values for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure this runs client-side
      console.log('[Header Debug] colorScheme:', colorScheme);
      console.log('[Header Debug] isDark:', isDark);
      console.log('[Header Debug] theme.white:', theme.white);
      console.log('[Header Debug] theme.black:', theme.black);
      console.log('[Header Debug] theme.colors.gray[5]:', theme.colors.gray[5]);
      console.log('[Header Debug] theme.colors.gray[3]:', theme.colors.gray[3]);
    }
  }, [colorScheme, isDark, theme]);

  const handleNavigation = (href: string) => {
    if (href === pathname) return;
    
    setIsLoading(true);
    setLoadingPath(href);
    
    close();
    
    router.push(href);
  };

  const isActive = (href: string) => getIsActive(pathname, href);

  const handleLinkHover = (label: string) => {
    console.log('Hovering over:', label);
    setHoveredLink(label);
  };

  const handleLinkLeave = () => {
    console.log('Leaving link');
    setHoveredLink(null);
  };

  return {
    opened,
    toggle,
    close,
    theme,
    isDark,
    pathname,
    isLoading,
    loadingPath,
    logoHovered,
    setLogoHovered,
    socialHovered,
    setSocialHovered,
    experienceHovered,
    setExperienceHovered,
    mobileHovered,
    setMobileHovered,
    hoveredLink,
    setHoveredLink,
    handleNavigation,
    isActive,
    handleLinkHover,
    handleLinkLeave,
  };
}; 