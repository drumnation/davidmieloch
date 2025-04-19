"use client";

import { Box, Text, ActionIcon, Group, Center, Flex } from '@mantine/core';
import {
    LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic
} from 'react-icons/lu';
import { openPlayerStyle } from '../../Footer.styles';
import { formatTime } from '../../Footer.logic';
import { StandardPlayerProps } from './StandardPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import { useEffect, useState } from 'react';

export const StandardPlayer = ({
    currentTrack,
    isPlaying,
    progress,
    colors,
    progressBarRef,
    colorScheme,
    currentTime,
    duration,
    onPlayToggle,
    onMinimizeToggle,
    onPlaylistToggle,
    onPrevTrack,
    onNextTrack,
    startUserInteraction
}: StandardPlayerProps) => {
    const [isMobile, setIsMobile] = useState(false);

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

    return (
        <Box style={openPlayerStyle}>
            <Box style={{
                marginRight: isMobile ? '0.75rem' : '1.5rem',
                width: isMobile ? '4.5rem' : '6.25rem',
                height: isMobile ? '4.5rem' : '6.25rem',
                flexShrink: 0
            }}>
                <TrackArtwork
                    artwork={currentTrack?.artwork}
                    title={currentTrack?.title}
                    isPlaying={isPlaying}
                    onClick={() => { startUserInteraction(); onPlayToggle(); }}
                    size={isMobile ? 72 : 100}
                    iconSize={isMobile ? 36 : 50}
                />
            </Box>

            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Group justify="space-between" align="center" style={{ width: '100%', paddingRight: isMobile ? '0.5rem' : '1rem', flexWrap: 'nowrap' }}>
                    <Flex direction="column" align="center" style={{
                        flex: 1,
                        width: '100%',
                        maxWidth: isMobile ? 'calc(100% - 50px)' : '100%'
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
                            {currentTrack?.title || 'My Music'}
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
                                variant="subtle"
                                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                                radius="xl"
                                size={isMobile ? "sm" : "md"}
                                style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                                onClick={() => { startUserInteraction(); onPrevTrack(); }}
                                aria-label="Previous track"
                                disabled={!currentTrack}
                            >
                                <LuSkipBack size={isMobile ? 16 : 18} />
                            </ActionIcon>
                            <ActionIcon
                                variant="subtle"
                                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                                radius="xl"
                                size={isMobile ? "md" : "lg"}
                                style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                                onClick={() => { startUserInteraction(); onPlayToggle(); }}
                                aria-label={isPlaying ? "Pause" : "Start playing"}
                                disabled={!currentTrack}
                            >
                                {isPlaying ? <LuPause size={isMobile ? 20 : 24} /> : <LuPlay size={isMobile ? 20 : 24} />}
                            </ActionIcon>
                            <ActionIcon
                                variant="subtle"
                                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                                radius="xl"
                                size={isMobile ? "sm" : "md"}
                                style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                                onClick={() => { startUserInteraction(); onNextTrack(); }}
                                aria-label="Next track"
                                disabled={!currentTrack}
                            >
                                <LuSkipForward size={isMobile ? 16 : 18} />
                            </ActionIcon>
                        </Group>
                    </Flex>

                    <Group
                        gap={isMobile ? "xs" : "xs"}
                        style={{
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: 'center',
                            flexShrink: 0,
                            marginLeft: isMobile ? '0.25rem' : 0
                        }}
                    >
                        <ActionIcon
                            variant="subtle"
                            color={colorScheme === 'dark' ? 'gray' : 'dark'}
                            radius="xl"
                            size={isMobile ? "xs" : "sm"}
                            style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                            onClick={onPlaylistToggle}
                            aria-label="Show playlist"
                        >
                            <LuListMusic size={isMobile ? 16 : 18} />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            color={colorScheme === 'dark' ? 'gray' : 'dark'}
                            radius="xl"
                            size={isMobile ? "xs" : "sm"}
                            style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                            onClick={onMinimizeToggle}
                            aria-label="Minimize player"
                        >
                            <LuChevronDown size={isMobile ? 16 : 18} />
                        </ActionIcon>
                    </Group>
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
                        <Box style={{ flex: 1, position: 'relative', padding: '10px 0', margin: '-10px 0' }}>
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