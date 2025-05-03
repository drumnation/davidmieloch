'use client';

import { usePathname } from 'next/navigation';

// Type for theme mode
export type ThemeMode = 'dark' | 'light';

// Helper to determine if a route is the home page
export const isHomePage = (pathname: string | null): boolean => {
    return pathname === '/' || pathname === '';
};

// React hook to determine the theme mode based on the current route
export const usePageThemeMode = (): ThemeMode => {
    const pathname = usePathname();
    return isHomePage(pathname) ? 'dark' : 'light';
};

// Static function to get theme mode for a given pathname
export const getPageThemeMode = (pathname: string | null): ThemeMode => {
    return isHomePage(pathname) ? 'dark' : 'light';
};

// Hard-coded color values for light mode
export const lightModeColors = {
    background: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
        tertiary: '#f0f0f0',
        hover: 'rgba(100, 100, 100, 0.1)',
        scrollTrack: 'rgba(200, 200, 200, 0.2)',
        scrollThumb: 'rgba(100, 100, 100, 0.2)',
        activeTrackBackground: 'rgba(67, 97, 238, 0.1)',
        activeTrackHoverBackground: 'rgba(67, 97, 238, 0.2)',
        inactiveTrackHoverBackground: 'rgba(0, 0, 0, 0.05)'
    },
    text: {
        primary: '#141517',
        secondary: '#5c5f66',
        muted: '#909296'
    },
    border: {
        primary: 'rgba(0, 0, 0, 0.1)',
        secondary: 'rgba(0, 0, 0, 0.05)'
    },
    accent: {
        primary: '#4361ee',
        secondary: '#7209b7',
        gradient: 'linear-gradient(90deg, #4361ee, #7209b7)'
    }
};

// Hard-coded color values for dark mode (home page)
export const darkModeColors = {
    background: {
        primary: '#0a0c1e',
        secondary: '#10131f',
        tertiary: '#1A1B1E',
        hover: 'rgba(100, 100, 100, 0.2)',
        scrollTrack: 'rgba(0, 0, 0, 0.2)',
        scrollThumb: 'rgba(255, 255, 255, 0.2)',
        activeTrackBackground: 'rgba(67, 97, 238, 0.2)',
        activeTrackHoverBackground: 'rgba(67, 97, 238, 0.3)',
        inactiveTrackHoverBackground: 'rgba(255, 255, 255, 0.05)'
    },
    text: {
        primary: '#ffffff',
        secondary: '#A6A7AB',
        muted: '#909296'
    },
    border: {
        primary: 'rgba(255, 255, 255, 0.1)',
        secondary: 'rgba(255, 255, 255, 0.05)'
    },
    accent: {
        primary: '#4361ee',
        secondary: '#7209b7',
        gradient: 'linear-gradient(90deg, #4361ee, #7209b7)'
    }
};

// Helper to get color values based on theme mode
export const getThemeColors = (mode: ThemeMode) => {
    return mode === 'dark' ? darkModeColors : lightModeColors;
};

// Helper for getting current page colors in components without hooks
export const getCurrentPageColors = (pathname: string | null) => {
    const mode = getPageThemeMode(pathname);
    return getThemeColors(mode);
}; 