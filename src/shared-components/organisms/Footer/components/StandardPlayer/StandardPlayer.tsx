"use client";

import { Box, Text, ActionIcon, Group, Center, Flex, Slider, Tooltip, SegmentedControl, Button } from '@mantine/core';
import {
    LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic, LuMic, LuMusic
} from 'react-icons/lu';
import { openPlayerStyle } from '../../Footer.styles';
import { formatTime } from '../../Footer.logic';
import { StandardPlayerProps } from './StandardPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { StandardPlayerMobile } from './StandardPlayer.mobile';
import { StandardPlayerWeb } from './StandardPlayer.web';

export const StandardPlayer = (props: StandardPlayerProps & { artworkUrl?: string }) => {
    const theme = useMantineTheme();
    // Using sm breakpoint for mobile detection, adjust if needed
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [isClient, setIsClient] = useState(false);

    // Ensure hydration is complete before rendering platform-specific component
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Render placeholder or null during SSR / hydration
        // Adjust height based on expected player size to prevent layout shift
        const baseHeight = 90;
        const mobileHeightFactor = 1.25;
        const mobileBreakpoint = parseInt(theme.breakpoints.sm || '768', 10); // Parse breakpoint string
        const ssrHeight = typeof window !== 'undefined' && window.innerWidth <= mobileBreakpoint ? `${baseHeight * mobileHeightFactor}px` : `${baseHeight}px`;
        return <Box style={{ height: ssrHeight, width: '100%' }} data-testid="standard-player-ssr" />;
    }

    return isMobile ? <StandardPlayerMobile {...props} /> : <StandardPlayerWeb {...props} />;
}; 