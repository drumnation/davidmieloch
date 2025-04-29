"use client";

import { CSSProperties } from 'react';

// Artwork overlay for showing play/pause on hover
export const artworkOverlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s',
    borderRadius: '4px',
    pointerEvents: 'none', // Prevent overlay from blocking clicks
};

// Track artwork image styling
export const trackArtworkStyle: CSSProperties = {
    display: 'block',
    borderRadius: '4px',
    objectFit: 'cover',
};

// Progress bar container styling
export const progressBarContainerStyle: CSSProperties = {
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
};

// Progress bar fill styling
export const progressFillStyle: CSSProperties = {
    height: '100%',
    background: 'linear-gradient(90deg, #4361EE, #00BCBD)',
    borderRadius: '2px',
    transition: 'width 0.1s linear',
};

// Track list container styling
export const trackListContainerStyle: CSSProperties = {
    maxHeight: '200px',
    overflowY: 'auto',
    paddingRight: '0.5rem',
};

// Base styling for track items in playlist
export const trackItemBaseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '0.25rem',
    transition: 'background-color 0.15s ease',
};

// Footer container style generator
export const getFooterContainerStyle = (
    colors: any,
    isMiniMode: boolean,
    isExpanded: boolean
): CSSProperties => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: colors.background,
    borderTop: `1px solid ${colors.border}`,
    color: colors.text,
    boxShadow: isMiniMode ? '0 -1px 3px rgba(0,0,0,0.1)' : '0 -2px 10px rgba(0,0,0,0.15)',
    height: 'auto',
    minHeight: isMiniMode ? '64px' : '90px',
    transition: 'height 0.3s ease',
    overflow: 'hidden',
});

// Gradient border styling
export const gradientBorderStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #4361EE, #00BCBD)',
    zIndex: 1,
};

// Mini mode group styling
export const miniModeGroupStyle: CSSProperties = {
    height: '100%',
    padding: '0 0.5rem',
    flexWrap: 'nowrap',
};

// Open player container styling
export const openPlayerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '120px',
    padding: '0.75rem 1rem',
    maxWidth: 1000,
    margin: '0 auto',
};

// Playlist container styling
export const playlistContainerStyle: CSSProperties = {
    maxWidth: 1000,
    margin: '0 auto',
    paddingBottom: '1rem',
};

// Compact controls style in expanded mode
export const compactControlsStyle: CSSProperties = {
    padding: '0.3rem 0.5rem',
    height: '55px',
    flexWrap: 'nowrap',
};

// Playlist content area style
export const playlistContentStyle: CSSProperties = {
    padding: '1rem',
}; 