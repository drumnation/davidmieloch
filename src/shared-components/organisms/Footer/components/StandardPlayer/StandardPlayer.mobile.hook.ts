import { useCallback, useRef, useEffect, useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { StandardPlayerProps } from './StandardPlayer.types';

export function useStandardPlayerMobile(props: StandardPlayerProps) {
    const progressBarContainerRef = useRef<HTMLDivElement>(null);
    const theme = useMantineTheme();
    const [controlMode, setControlMode] = useState<'music' | 'narration'>(props.isMusicEnabled ? 'music' : 'narration');

    useEffect(() => {
        if (props.isMusicEnabled && props.isNarrationEnabled) return;
        if (props.isMusicEnabled) setControlMode('music');
        else if (props.isNarrationEnabled) setControlMode('narration');
    }, [props.isMusicEnabled, props.isNarrationEnabled]);

    const showToggle = props.isMusicEnabled && props.isNarrationEnabled;
    const toggleControlMode = () => {
        setControlMode((prev) => (prev === 'narration' ? 'music' : 'narration'));
    };

    // Always allow arrows if there is a music track
    const isMusicTrackAvailable = !!props.currentTrack;
    const isEffectivelyPlaying = props.isMusicPlaying || props.isVoicePlaying;
    const isNarrationActive = controlMode === 'narration';
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

    const handleProgressBarClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
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
    }, [displayDuration, props.onSeekMusic, props.onSeekNarration, controlMode, props.startUserInteraction]);

    // Always use music playlist navigation for arrows
    const handlePrevTrack = () => {
        props.startUserInteraction?.();
        if (controlMode === 'narration') {
            const newTime = Math.max(0, props.voiceCurrentTime - 10);
            if (props.voiceDuration > 0) {
                const newProgress = (newTime / props.voiceDuration) * 100;
                props.onSeekNarration(newProgress);
            }
        } else {
            props.onPrevTrack();
        }
    };
    const handleNextTrack = () => {
        props.startUserInteraction?.();
        if (controlMode === 'narration') {
            const newTime = Math.min(props.voiceDuration, props.voiceCurrentTime + 10);
            if (props.voiceDuration > 0) {
                const newProgress = (newTime / props.voiceDuration) * 100;
                props.onSeekNarration(newProgress);
            }
        } else {
            props.onNextTrack();
        }
    };

    return {
        theme,
        progressBarContainerRef,
        controlMode,
        setControlMode,
        showToggle,
        toggleControlMode,
        isEffectivelyPlaying,
        isNarrationActive,
        displayControlTrack,
        displayCurrentTime,
        displayDuration,
        displayTrackAvailable,
        handlePlayPause,
        handleProgressBarClick,
        handlePrevTrack,
        handleNextTrack,
        isMusicTrackAvailable,
    };
} 