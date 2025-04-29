"use client";

// Helper function for formatting time display
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Default colors based on theme
export const defaultColors = {
    light: {
        background: '#f0f0f0',
        text: '#141517',
        textSecondary: '#5c5f66',
        border: 'rgba(0, 0, 0, 0.1)',
        progressBackground: 'rgba(20, 21, 23, 0.1)',
        textMuted: 'rgba(20, 21, 23, 0.7)',
        hoverBackground: 'rgba(100, 100, 100, 0.1)',
        scrollTrack: 'rgba(200, 200, 200, 0.2)',
        scrollThumb: 'rgba(100, 100, 100, 0.2)',
        activeTrackBackground: 'rgba(67, 97, 238, 0.1)',
        activeTrackHoverBackground: 'rgba(67, 97, 238, 0.2)',
        inactiveTrackHoverBackground: 'rgba(0, 0, 0, 0.05)'
    },
    dark: {
        background: '#1A1B1E',
        text: '#ffffff',
        textSecondary: '#A6A7AB',
        border: 'rgba(0, 188, 212, 0.1)',
        progressBackground: 'rgba(255, 255, 255, 0.1)',
        textMuted: 'rgba(255, 255, 255, 0.7)',
        hoverBackground: 'rgba(100, 100, 100, 0.2)',
        scrollTrack: 'rgba(0, 0, 0, 0.2)',
        scrollThumb: 'rgba(255, 255, 255, 0.2)',
        activeTrackBackground: 'rgba(67, 97, 238, 0.2)',
        activeTrackHoverBackground: 'rgba(67, 97, 238, 0.3)',
        inactiveTrackHoverBackground: 'rgba(255, 255, 255, 0.05)'
    }
};

// Helper to get colors based on active theme
export const getColorsByScheme = (colorScheme: string) =>
    colorScheme === 'dark' ? defaultColors.dark : defaultColors.light;

// Default timeout for user interaction tracking in milliseconds
export const USER_INTERACTION_TIMEOUT = 2000;

// Scroll threshold for determining significant scroll events
export const SCROLL_THRESHOLD = 10;

// Footer component visual states
export enum FooterState {
    MINI = 'mini',
    OPEN = 'open',
    EXPANDED = 'expanded'
}

// Default player heights
export const PLAYER_HEIGHTS = {
    MINI: '54px',
    OPEN: '120px',
    EXPANDED: 'auto'
}; 