import { useState, useEffect, useRef } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { StandardPlayerProps } from './StandardPlayer.types';

// Custom hook for StandardPlayerWeb stateful logic
export function useStandardPlayerWeb(props: StandardPlayerProps) {
    const theme = useMantineTheme();
    const progressBarContainerRef = useRef<HTMLDivElement>(null);
    const { ref: artworkBoxRef, height: artworkBoxHeight } = useElementSize();
    const [controlMode, setControlMode] = useState<'music' | 'narration'>(props.isMusicEnabled ? 'music' : 'narration');
    const [isMusicHovered, setIsMusicHovered] = useState(false);
    const [isNarrationHovered, setIsNarrationHovered] = useState(false);

    useEffect(() => {
        if (props.isMusicEnabled && props.isNarrationEnabled) return;
        if (props.isMusicEnabled) setControlMode('music');
        else if (props.isNarrationEnabled) setControlMode('narration');
    }, [props.isMusicEnabled, props.isNarrationEnabled]);

    const toggleControlMode = () => {
        setControlMode((prev) => (prev === 'narration' ? 'music' : 'narration'));
    };

    const showToggle = props.isMusicEnabled && props.isNarrationEnabled;
    const isMusicActive = controlMode === 'music';
    const isNarrationActive = controlMode === 'narration';
    const isEffectivelyPlaying = props.isMusicPlaying || props.isVoicePlaying;
    const displayControlTrack = controlMode === 'music' ? props.currentTrack : props.activeVoiceTrack;
    const displayCurrentTime = controlMode === 'music' ? props.currentTime : props.voiceCurrentTime;
    const displayDuration = controlMode === 'music' ? props.duration : props.voiceDuration;
    const displayTrackAvailable = !!displayControlTrack;

    const handlePlayPause = () => {
        props.startUserInteraction?.();
        if (props.isMusicEnabled && props.isNarrationEnabled) {
            props.onPlayToggle();
            props.onPlayToggle();
        } else {
            props.onPlayToggle();
        }
    };

    const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarContainerRef.current || displayDuration <= 0) return;
        props.startUserInteraction?.();
        const rect = progressBarContainerRef.current.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const containerWidth = rect.width;
        const newProgress = (clickX / containerWidth) * 100;
        if (controlMode === 'music') {
            props.onSeekMusic(Math.max(0, Math.min(100, newProgress)));
        } else if (controlMode === 'narration') {
            props.onSeekNarration(Math.max(0, Math.min(100, newProgress)));
        }
    };

    let combinedTitle = '';
    if (props.isNarrationEnabled && props.activeVoiceTrack?.title) {
        combinedTitle = props.activeVoiceTrack.title;
    }
    if (props.isMusicEnabled && props.currentTrack?.title) {
        if (combinedTitle) {
            combinedTitle += ` + ${props.currentTrack.title}`;
        } else {
            combinedTitle = props.currentTrack.title;
        }
    }
    if (!combinedTitle) combinedTitle = 'Audio Player';
    const displayTitle = combinedTitle;

    const displayArtist = props.isMusicEnabled && props.isNarrationEnabled && props.activeVoiceTrack && props.currentTrack
        ? 'Narration and Music by David Mieloch'
        : props.isNarrationEnabled && props.activeVoiceTrack
            ? 'Narration by David Mieloch'
            : props.currentTrack?.artist || 'Music by David Mieloch';

    const iconProps = {
        variant: 'subtle',
        color: props.colorScheme === 'dark' ? 'gray' : 'dark',
        radius: 'xl',
        style: { ':hover': { backgroundColor: props.colors.hoverBackground } },
    };

    return {
        theme,
        progressBarContainerRef,
        artworkBoxRef,
        artworkBoxHeight,
        controlMode,
        setControlMode,
        isMusicHovered,
        setIsMusicHovered,
        isNarrationHovered,
        setIsNarrationHovered,
        toggleControlMode,
        showToggle,
        isMusicActive,
        isNarrationActive,
        isEffectivelyPlaying,
        displayControlTrack,
        displayCurrentTime,
        displayDuration,
        displayTrackAvailable,
        handlePlayPause,
        handleProgressBarClick,
        displayTitle,
        displayArtist,
        iconProps,
    };
}

// Add other hooks as needed for event handlers, etc. 