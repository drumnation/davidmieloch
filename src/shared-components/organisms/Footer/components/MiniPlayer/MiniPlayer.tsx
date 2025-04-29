"use client";

import { Box, Text, ActionIcon, Group } from '@mantine/core';
import { LuChevronUp } from 'react-icons/lu';
import { miniModeGroupStyle } from '../../Footer.styles';
import { MiniPlayerProps } from './MiniPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';

export const MiniPlayer = ({
    currentTrack,
    artworkUrl,
    isPlaying,
    progress,
    colors,
    progressBarRef,
    colorScheme,
    onPlayToggle,
    onMinimizeToggle,
    startUserInteraction
}: MiniPlayerProps & { artworkUrl?: string }) => {
    return (
        <Group justify="space-between" align="center" style={miniModeGroupStyle}>
            <Group align="center" gap="xs" style={{ overflow: 'hidden', flexShrink: 1, flexWrap: 'nowrap' }}>
                <TrackArtwork
                    artwork={artworkUrl}
                    title={currentTrack?.title}
                    isPlaying={isPlaying}
                    onClick={() => { startUserInteraction?.(); onPlayToggle(); }}
                    size={30}
                    iconSize={15}
                />
                <Box style={{ overflow: 'hidden' }}>
                    <Text size="xs" fw={600} lineClamp={1} c={colors.text}>
                        {currentTrack?.title || 'Track'}
                    </Text>
                    <Text size="xs" lineClamp={1} c={colors.textSecondary}>
                        {currentTrack?.artist || '-'}
                    </Text>
                </Box>
            </Group>

            <Box style={{ flex: 1, margin: '0 0.5rem' }}>
                <ProgressBar
                    progress={progress}
                    backgroundColor={colors.progressBackground}
                    barRef={progressBarRef}
                />
            </Box>

            <ActionIcon
                variant="subtle"
                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                radius="xl"
                size="sm"
                style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                onClick={onMinimizeToggle}
                aria-label="Expand player"
            >
                <LuChevronUp size={14} />
            </ActionIcon>
        </Group>
    );
}; 