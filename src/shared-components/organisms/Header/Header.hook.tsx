'use client';

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { useTheme } from '../../../providers/ThemeProvider';
import { usePathname, useRouter } from 'next/navigation';
import { getIsActive } from './Header.logic';
import { HeaderHookReturn } from './Header.types';
// import { useLoading } from '@contexts/LoadingContext'; // Comment out if show/hideLoading are the only uses

export const useHeaderState = (): HeaderHookReturn => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const pathname = usePathname();
  const router = useRouter();
  // const { showLoading, hideLoading } = useLoading(); // Comment out useLoading hook

  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [socialHovered, setSocialHovered] = useState<string | null>(null);
  const [experienceHovered, setExperienceHovered] = useState(false);
  const [mobileHovered, setMobileHovered] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);

  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear navigation timeout
  const clearNavigationTimeout = useCallback(() => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearNavigationTimeout();
    };
  }, [clearNavigationTimeout]);

  // Handle the actual navigation after loading state is shown
  useLayoutEffect(() => {
    if (nextPath && isNavigating) {
      const startNavigation = async () => {
        try {
          // Start navigation
          await router.push(nextPath);

          // Set a timeout to ensure loading state persists during compilation
          // *** Keep timeout logic for now, but remove hideLoading call ***
          navigationTimeoutRef.current = setTimeout(() => {
            if (isNavigating) {
              // If we're still navigating after 10 seconds, something might be wrong
              // hideLoading(); // Comment out hideLoading
              setIsNavigating(false);
              setNextPath(null);
            }
          }, 10000); // 10 second safety timeout
        } catch (error) {
          console.error('[Header.hook] Error during router.push:', error);
          // hideLoading(); // Comment out hideLoading
          setIsNavigating(false);
          setNextPath(null);
        }
      };

      // Start the navigation process
      startNavigation();
    }
    // Update dependencies if useLoading was removed
  }, [nextPath, isNavigating, router /*, hideLoading */]);

  // Watch for pathname changes to handle loading state
  useEffect(() => {
    if (pathname !== nextPath && isNavigating) {
      // Navigation completed
      clearNavigationTimeout();
      // hideLoading(); // Comment out hideLoading
      setIsNavigating(false);
      setNextPath(null);
    }
    // Update dependencies if useLoading was removed
  }, [pathname, nextPath /*, hideLoading */, isNavigating, clearNavigationTimeout]);

  const handleNavigation = useCallback((href: string) => {
    if (href === pathname || isNavigating) {
      return;
    }

    // First, set up loading state synchronously
    // const pathLabel = href.split('/').pop()?.replace(/-/g, ' ') || 'page';
    // showLoading(`Loading ${pathLabel}...`); // Comment out showLoading
    setIsNavigating(true);
    setNextPath(href);
    close();

    // No need to await router.push here, let useLayoutEffect handle it

    // Update dependencies if useLoading was removed
  }, [pathname /*, showLoading */, close, isNavigating]);

  const isActive = (href: string) => {
    return pathname ? getIsActive(pathname, href) : false;
  };

  const handleLinkHover = (label: string) => {
    if (!isNavigating) {
      setHoveredLink(label);
    }
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
  };

  return {
    opened,
    toggle,
    close,
    theme,
    isDark,
    pathname: pathname || '',
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
    isNavigating, // Still needed to prevent double navigation clicks
  };
}; 