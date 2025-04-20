"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useFooter } from './Footer.hook';
import { usePlayer } from '../../../providers/PlayerProvider';
import { SoundCloudTrack } from './Footer.types';
import { USER_INTERACTION_TIMEOUT, SCROLL_THRESHOLD, getColorsByScheme } from './Footer.logic';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/index';
import { setPlayerMinimized } from '@store/slices/playerUiSlice';

export interface UseFooterUIProps {
    soundCloudTracks?: SoundCloudTrack[];
}

export const useFooterUI = ({ soundCloudTracks = [] }: UseFooterUIProps) => {
    // UI state
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMiniMode, setIsMiniModeState] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [interactionTimeout, setInteractionTimeout] = useState<NodeJS.Timeout | null>(null);
    const [userIntentionalMinimize, setUserIntentionalMinimize] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Refs
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Redux dispatch
    const dispatch = useDispatch<AppDispatch>();

    // Wrapper to update local and global state
    const setIsMiniMode = useCallback((value: boolean | ((prevState: boolean) => boolean)) => {
        const newValue = typeof value === 'function'
            ? value(isMiniMode)
            : value;

        setIsMiniModeState(newValue);
        dispatch(setPlayerMinimized(newValue));
    }, [dispatch, isMiniMode]);

    // Get theme and player data
    const { colorScheme } = useTheme();
    const { tracks: hookTracks } = useFooter([], soundCloudTracks);
    const {
        tracks,
        currentTrack,
        isPlaying,
        togglePlay,
        playTrack,
        nextTrack,
        prevTrack,
        currentTime,
        duration,
        progress
    } = usePlayer();

    // Get colors based on theme
    const colors = getColorsByScheme(colorScheme);

    // Use the tracks from player context or fallback to hook tracks
    const displayTracks = tracks.length > 0 ? tracks : hookTracks;

    // Client-side only
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle scroll event for responsive UI
    useEffect(() => {
        if (!isMounted) return;

        const handleScroll = () => {
            // Skip if user is currently interacting with player controls
            if (isUserInteracting) return;

            // If player is expanded, don't auto-minimize/maximize via scroll
            if (isExpanded) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDistance = Math.abs(scrollTop - lastScrollTop);

            // Only act if scroll distance is significant
            if (scrollDistance > SCROLL_THRESHOLD) {
                const isScrollingDown = scrollTop > lastScrollTop;

                if (isScrollingDown) {
                    // Scrolling Down: Always minimize if not already mini
                    if (!isMiniMode) {
                        setIsMiniMode(true);
                        // Ensure playlist is also closed if open
                        if (isExpanded) setIsExpanded(false);
                        setUserIntentionalMinimize(false); // Scroll caused minimize
                    }
                } else {
                    // Scrolling Up: Maximize ONLY if currently mini AND not intentionally minimized by user
                    if (isMiniMode && !userIntentionalMinimize) {
                        setIsMiniMode(false);
                    }
                }
            }

            // Update scroll position
            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMounted, lastScrollTop, isMiniMode, isUserInteracting, isExpanded, userIntentionalMinimize, setIsMiniMode]);

    // Set a temporary flag when user manually interacts with controls
    const startUserInteraction = useCallback(() => {
        setIsUserInteracting(true);

        // Clear any existing timeout
        if (interactionTimeout) {
            clearTimeout(interactionTimeout);
        }

        // Reset the flag after a delay
        const timeout = setTimeout(() => {
            setIsUserInteracting(false);
        }, USER_INTERACTION_TIMEOUT);

        setInteractionTimeout(timeout);
    }, [interactionTimeout]);

    // Toggle minimize/maximize
    const handleMinimizeToggle = useCallback(() => {
        startUserInteraction();

        if (isMiniMode) {
            // User is maximizing FROM mini mode
            setIsMiniMode(false);
            setIsExpanded(false); // Go to Open state
            setUserIntentionalMinimize(false); // User action overrides scroll intention
        }
        else {
            // User is minimizing TO mini mode (from Open or Playlist)
            setIsExpanded(false); // Ensure playlist is closed
            setIsMiniMode(true);
            setUserIntentionalMinimize(true); // User explicitly chose minimize
        }
    }, [isMiniMode, startUserInteraction, setIsMiniMode]);

    // Toggle playlist view
    const handlePlaylistToggle = useCallback(() => {
        startUserInteraction();
        setIsExpanded(prev => !prev);
    }, [startUserInteraction]);

    // Handle track selection
    const handleTrackSelect = useCallback((trackId: number | string) => {
        startUserInteraction();
        playTrack(trackId);
    }, [playTrack, startUserInteraction]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (interactionTimeout) {
                clearTimeout(interactionTimeout);
            }
        };
    }, [interactionTimeout]);

    return {
        // State
        isExpanded,
        isMiniMode,
        isMounted,
        colors,
        progressBarRef,
        displayTracks,

        // Player state
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        progress,

        // Methods
        startUserInteraction,
        handleMinimizeToggle,
        handlePlaylistToggle,
        handleTrackSelect,
        togglePlay,
        nextTrack,
        prevTrack,
        colorScheme
    };
}; 