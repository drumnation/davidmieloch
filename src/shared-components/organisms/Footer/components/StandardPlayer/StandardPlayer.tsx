"use client";

import { Box, Text, ActionIcon, Group, Center, Flex, Slider, Select } from '@mantine/core';
import {
    LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic, LuMic, LuMusic, LuWaves
} from 'react-icons/lu';
import { openPlayerStyle } from '../../Footer.styles';
import { formatTime } from '../../Footer.logic';
import { StandardPlayerProps } from './StandardPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import { useEffect, useState, useCallback, useRef } from 'react';
import { AudioMode } from '../../dual-audio/DualAudio.types';

export const StandardPlayer = ({
    currentTrack,
    artworkUrl,
    isPlaying,
    progress,
    colors,
    progressBarRef,
    colorScheme,
    currentTime,
    duration,
    volume,
    mode,
    onPlayToggle,
    onMinimizeToggle,
    onPlaylistToggle,
    onPrevTrack,
    onNextTrack,
    onVolumeChange,
    onModeChange,
    onSeek,
    startUserInteraction
}: StandardPlayerProps & { artworkUrl?: string }) => {
    const [isMobile, setIsMobile] = useState(false);
    const progressBarContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 576);
        };

        // Set initial value
        checkMobile();

        // Add event listener
        window.addEventListener('resize', checkMobile);

        // Clean up
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handler for clicks on the progress bar container
    const handleProgressBarClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarContainerRef.current || duration <= 0) return;
        startUserInteraction?.();

        const rect = progressBarContainerRef.current.getBoundingClientRect();
        const clickX = event.clientX - rect.left; // X position within the container
        const containerWidth = rect.width;
        const newProgress = (clickX / containerWidth) * 100;

        onSeek(Math.max(0, Math.min(100, newProgress))); // Call unified seek, clamp value 0-100
    }, [duration, onSeek, startUserInteraction]);

    // Map modes to icons and labels for the Select component
    const modeSelectData = [
        { value: AudioMode.BOTH, label: 'Voice + Music', icon: LuWaves },
        { value: AudioMode.VOICE_ONLY, label: 'Voice Only', icon: LuMic },
        { value: AudioMode.MUSIC_ONLY, label: 'Music Only', icon: LuMusic },
    ];

    // Define iconProps inside the component scope
    const iconProps = {
        variant: "subtle",
        color: colorScheme === 'dark' ? 'gray' : 'dark',
        radius: "xl",
        style: { ':hover': { backgroundColor: colors.hoverBackground } }
    };

    return (
        <Box style={openPlayerStyle}>
            <Box style={{
                marginRight: isMobile ? '0.75rem' : '1.5rem',
                width: isMobile ? '4.5rem' : '6.25rem',
                height: isMobile ? '4.5rem' : '6.25rem',
                flexShrink: 0
            }}>
                <TrackArtwork
                    artwork={artworkUrl}
                    title={currentTrack?.title}
                    isPlaying={isPlaying}
                    onClick={() => { startUserInteraction?.(); onPlayToggle(); }}
                    size={isMobile ? 72 : 100}
                    iconSize={isMobile ? 36 : 50}
                />
            </Box>

            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Group justify="space-between" align="center" style={{ width: '100%', paddingRight: isMobile ? '0.5rem' : '1rem', flexWrap: 'nowrap' }}>
                    <Flex direction="column" align="center" style={{
                        flex: 1,
                        width: '100%',
                        maxWidth: isMobile ? 'calc(100% - 80px)' : 'calc(100% - 150px)'
                    }}>
                        <Text
                            size={isMobile ? "sm" : "md"}
                            fw={600}
                            lineClamp={1}
                            c={colors.text}
                            style={{
                                textAlign: 'center',
                                width: '100%',
                                padding: isMobile ? '0 0.25rem' : 0
                            }}
                        >
                            {currentTrack?.title || (mode === AudioMode.MUSIC_ONLY ? 'Music' : 'Voice')}
                        </Text>
                        {currentTrack && (
                            <Text
                                size={isMobile ? "xs" : "sm"}
                                lineClamp={1}
                                c={colors.textSecondary}
                                style={{
                                    textAlign: 'center',
                                    width: '100%',
                                    padding: isMobile ? '0 0.25rem' : 0
                                }}
                            >
                                {currentTrack.artist}
                            </Text>
                        )}

                        <Group justify="center" gap={isMobile ? "sm" : "md"} style={{ marginTop: '0.5rem' }}>
                            <ActionIcon
                                onClick={() => { startUserInteraction?.(); onPrevTrack(); }}
                                aria-label="Previous track"
                                disabled={mode === AudioMode.VOICE_ONLY || !currentTrack}
                                {...iconProps}
                            >
                                <LuSkipBack size={isMobile ? 16 : 18} />
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => { startUserInteraction?.(); onPlayToggle(); }}
                                aria-label={isPlaying ? "Pause" : "Play"}
                                disabled={!currentTrack}
                                {...iconProps}
                                size={isMobile ? "md" : "lg"}
                            >
                                {isPlaying ? <LuPause size={isMobile ? 20 : 24} /> : <LuPlay size={isMobile ? 20 : 24} />}
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => { startUserInteraction?.(); onNextTrack(); }}
                                aria-label="Next track"
                                disabled={mode === AudioMode.VOICE_ONLY || !currentTrack}
                                {...iconProps}
                            >
                                <LuSkipForward size={isMobile ? 16 : 18} />
                            </ActionIcon>
                        </Group>
                    </Flex>

                    <Flex direction={isMobile ? 'column' : 'row'} gap={isMobile ? 'xs' : 'sm'} align="center" style={{ flexShrink: 0 }}>
                        <Select
                            size={isMobile ? 'xs' : 'sm'}
                            value={mode}
                            onChange={(value) => { startUserInteraction?.(); onModeChange(value as AudioMode); }}
                            data={modeSelectData.map(({ value, label }) => ({ value, label }))}
                            style={{ width: isMobile ? 120 : 150 }}
                            aria-label="Select playback mode"
                            styles={(theme) => ({
                                dropdown: {
                                    backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                                    borderColor: colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
                                },
                                option: {
                                    color: colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                                    '&:hover': {
                                        backgroundColor: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                                        color: colorScheme === 'dark' ? theme.white : theme.black,
                                    },
                                },
                            })}
                        />

                        {!isMobile && (
                            <Slider
                                value={volume}
                                onChange={(value) => { startUserInteraction?.(); onVolumeChange(value); }}
                                min={0}
                                max={1}
                                step={0.01}
                                label={`Volume: ${Math.round(volume * 100)}%`}
                                size="sm"
                                style={{ width: 80 }}
                                color={iconProps.color}
                                aria-label="Volume control"
                            />
                        )}

                        <Group gap={isMobile ? "xs" : "xs"} style={{ flexDirection: isMobile ? 'row' : 'row' }}>
                            <ActionIcon
                                onClick={onPlaylistToggle}
                                aria-label="Show playlist"
                                {...iconProps}
                                size={isMobile ? "sm" : "sm"}
                            >
                                <LuListMusic size={isMobile ? 16 : 18} />
                            </ActionIcon>
                            <ActionIcon
                                onClick={onMinimizeToggle}
                                aria-label="Minimize player"
                                {...iconProps}
                                size={isMobile ? "sm" : "sm"}
                            >
                                <LuChevronDown size={isMobile ? 16 : 18} />
                            </ActionIcon>
                        </Group>
                    </Flex>
                </Group>

                {currentTrack ? (
                    <Group
                        align="center"
                        gap="xs"
                        style={{
                            width: '100%',
                            padding: isMobile ? '0 0.25rem' : '0 1rem 0 0',
                            flexWrap: 'nowrap'
                        }}
                    >
                        <Text size="xs" c={colors.textMuted} style={{ whiteSpace: 'nowrap', width: 40, textAlign: 'right' }}>
                            {formatTime(currentTime)}
                        </Text>
                        <Box
                            ref={progressBarContainerRef}
                            onClick={handleProgressBarClick}
                            style={{ flex: 1, cursor: 'pointer', position: 'relative', padding: '10px 0', margin: '-10px 0' }}
                        >
                            <ProgressBar
                                progress={progress}
                                backgroundColor={colors.progressBackground}
                                barRef={progressBarRef}
                            />
                        </Box>
                        <Text size="xs" c={colors.textMuted} style={{ whiteSpace: 'nowrap', width: 40, textAlign: 'left' }}>
                            {formatTime(duration)}
                        </Text>
                    </Group>
                ) : (
                    <Box style={{ width: '100%', height: '4px', backgroundColor: colors.progressBackground, borderRadius: '2px' }} />
                )}
            </Box>
        </Box>
    );
}; 