"use client";

import { Box, Text, ActionIcon, Group, Image } from '@mantine/core';
import { LuChevronUp, LuChevronDown } from 'react-icons/lu';
import {
    playlistContainerStyle,
    compactControlsStyle,
    playlistContentStyle,
    trackListContainerStyle,
    trackItemBaseStyle,
    trackArtworkStyle
} from '../../Footer.styles';
import { PlaylistProps } from './Playlist.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';

export const Playlist = ({
    currentTrack,
    isPlaying,
    progress,
    colors,
    progressBarRef,
    colorScheme,
    displayTracks,
    onPlayToggle,
    onMinimizeToggle,
    onPlaylistToggle,
    onTrackSelect,
    startUserInteraction
}: PlaylistProps) => {
    return (
        <Box style={playlistContainerStyle}>
            {/* Compact Controls Section */}
            <Group
                justify="space-between"
                align="center"
                style={{ ...compactControlsStyle, borderBottom: `1px solid ${colors.border}` }}
            >
                <TrackArtwork
                    artwork={currentTrack?.artwork}
                    title={currentTrack?.title}
                    isPlaying={isPlaying}
                    onClick={() => { startUserInteraction(); onPlayToggle(); }}
                    size={30}
                    iconSize={15}
                />

                <Box style={{ flex: 1, overflow: 'hidden', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                    <Text size="xs" fw={600} lineClamp={1} c={colors.text}>{currentTrack?.title || 'Track'}</Text>
                    <Text size="xs" lineClamp={1} c={colors.textSecondary}>{currentTrack?.artist || '-'}</Text>
                </Box>

                <Box style={{ flex: 2, margin: '0 0.75rem' }}>
                    <ProgressBar
                        progress={progress}
                        backgroundColor={colors.progressBackground}
                        barRef={progressBarRef}
                    />
                </Box>

                <Group gap="xs">
                    <ActionIcon
                        variant="subtle"
                        color={colorScheme === 'dark' ? 'gray' : 'dark'}
                        radius="xl"
                        size="sm"
                        style={{ ':hover': { backgroundColor: colors.hoverBackground } }}
                        onClick={onPlaylistToggle}
                        aria-label="Hide playlist"
                    >
                        <LuChevronUp size={14} />
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
                        <LuChevronDown size={14} />
                    </ActionIcon>
                </Group>
            </Group>

            {/* Playlist Section */}
            <Box style={playlistContentStyle}>
                <Text size="sm" fw={600} c={colors.textSecondary} mb="0.5rem">My Tracks</Text>
                <Box style={{ ...trackListContainerStyle, scrollbarWidth: 'thin', scrollbarColor: `${colors.scrollThumb} ${colors.scrollTrack}` }}>
                    {displayTracks && displayTracks.length > 0 ? (
                        displayTracks.map((track) => (
                            <Box
                                key={track.id}
                                onClick={() => onTrackSelect(track.id)}
                                style={{
                                    ...trackItemBaseStyle,
                                    backgroundColor: currentTrack?.id === track.id ? colors.activeTrackBackground : 'transparent',
                                }}
                            >
                                <Group align="center" style={{ width: '100%', flexWrap: 'nowrap' }}>
                                    {track.artwork && (
                                        <Box style={{ width: '2rem', height: '2rem', marginRight: '0.75rem', flexShrink: 0 }}>
                                            <Image
                                                src={track.artwork}
                                                alt={track.title ? `${track.title} artwork` : 'Track artwork'}
                                                width={32}
                                                height={32}
                                                radius="sm"
                                                style={trackArtworkStyle}
                                            />
                                        </Box>
                                    )}
                                    <Box style={{ overflow: 'hidden' }}>
                                        <Text size="sm" lineClamp={1} fw={500} c={colors.text}>{track.title}</Text>
                                        <Text size="xs" lineClamp={1} c={colors.textSecondary}>{track.artist}</Text>
                                    </Box>
                                </Group>
                            </Box>
                        ))
                    ) : (
                        <Text size="sm" c={colors.textMuted} style={{ padding: "0.5rem", textAlign: 'center' }}>No tracks available</Text>
                    )}
                </Box>
            </Box>
        </Box>
    );
}; 