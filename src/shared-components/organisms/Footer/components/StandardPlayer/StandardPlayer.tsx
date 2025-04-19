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
    return (
        <Box style={openPlayerStyle}>
            <Box style={{ marginRight: '1.5rem', width: '6.25rem', height: '6.25rem', flexShrink: 0 }}>
                <TrackArtwork
                    artwork={currentTrack?.artwork}
                    title={currentTrack?.title}
                    isPlaying={isPlaying}
                    onClick={() => { startUserInteraction(); onPlayToggle(); }}
                    size={100}
                    iconSize={50}
                />
            </Box>

            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Group justify="space-between" align="center" style={{ width: '100%', paddingRight: '1rem', flexWrap: 'nowrap' }}>
                    <Flex direction="column" align="center" style={{ flex: 1 }}>
                        <Text size="md" fw={600} lineClamp={1} c={colors.text} style={{ textAlign: 'center' }}>
                            {currentTrack?.title || 'My Music'}
                        </Text>
                        {currentTrack && <Text size="sm" lineClamp={1} c={colors.textSecondary} style={{ textAlign: 'center' }}>
                            {currentTrack.artist}
                        </Text>}

                        <Group justify="center" gap="md" style={{ marginTop: '0.5rem' }}>
                            <ActionIcon
                                variant="subtle"
                                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                                radius="xl"
                                size="md"
                                style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                                onClick={() => { startUserInteraction(); onPrevTrack(); }}
                                aria-label="Previous track"
                                disabled={!currentTrack}
                            >
                                <LuSkipBack size={18} />
                            </ActionIcon>
                            <ActionIcon
                                variant="subtle"
                                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                                radius="xl"
                                size="lg"
                                style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                                onClick={() => { startUserInteraction(); onPlayToggle(); }}
                                aria-label={isPlaying ? "Pause" : "Start playing"}
                                disabled={!currentTrack}
                            >
                                {isPlaying ? <LuPause size={24} /> : <LuPlay size={24} />}
                            </ActionIcon>
                            <ActionIcon
                                variant="subtle"
                                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                                radius="xl"
                                size="md"
                                style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                                onClick={() => { startUserInteraction(); onNextTrack(); }}
                                aria-label="Next track"
                                disabled={!currentTrack}
                            >
                                <LuSkipForward size={18} />
                            </ActionIcon>
                        </Group>
                    </Flex>

                    <Group gap="xs" style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 0 }}>
                        <ActionIcon
                            variant="subtle"
                            color={colorScheme === 'dark' ? 'gray' : 'dark'}
                            radius="xl"
                            size="sm"
                            style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                            onClick={onPlaylistToggle}
                            aria-label="Show playlist"
                        >
                            <LuListMusic size={18} />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            color={colorScheme === 'dark' ? 'gray' : 'dark'}
                            radius="xl"
                            size="sm"
                            style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                            onClick={onMinimizeToggle}
                            aria-label="Minimize player"
                        >
                            <LuChevronDown size={18} />
                        </ActionIcon>
                    </Group>
                </Group>

                {currentTrack ? (
                    <Group align="center" gap="xs" style={{ width: '100%', paddingRight: '1rem', flexWrap: 'nowrap' }}>
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