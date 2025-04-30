"use client";

import { Box, Text, ActionIcon, Group } from '@mantine/core';
import { LuChevronUp } from 'react-icons/lu';
import { miniModeGroupStyle } from '../../Footer.styles';
import { MiniPlayerProps } from './MiniPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { MiniPlayerContainer, MiniPlayerTopRow, MiniPlayerArtworkMeta, MiniPlayerMetadata, MiniPlayerChevron, MiniPlayerProgressBar } from './MiniPlayer.styles';

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
    startUserInteraction,
    displayTitle
}: MiniPlayerProps & { artworkUrl?: string }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const displayArtwork = artworkUrl || currentTrack?.artwork;

    return (
        <MiniPlayerContainer $colorScheme={colorScheme}>
            {isMobile ? (
                <>
                    <MiniPlayerTopRow>
                        <MiniPlayerArtworkMeta>
                            <TrackArtwork
                                artwork={displayArtwork}
                                title={currentTrack?.title}
                                isPlaying={isPlaying}
                                onClick={() => { startUserInteraction?.(); onPlayToggle(); }}
                                size={30}
                                iconSize={15}
                            />
                            <MiniPlayerMetadata>
                                <Text size="xs" fw={600} lineClamp={1} c={colors.text}>
                                    {displayTitle}
                                </Text>
                            </MiniPlayerMetadata>
                        </MiniPlayerArtworkMeta>
                        <MiniPlayerChevron>
                            <ActionIcon
                                variant="subtle"
                                color={colorScheme === 'dark' ? 'gray' : 'dark'}
                                radius="xl"
                                size="sm"
                                onClick={onMinimizeToggle}
                                aria-label="Expand player"
                            >
                                <LuChevronUp size={14} />
                            </ActionIcon>
                        </MiniPlayerChevron>
                    </MiniPlayerTopRow>
                    <MiniPlayerProgressBar>
                        <ProgressBar
                            progress={progress}
                            backgroundColor={colors.progressBackground}
                            barRef={progressBarRef}
                        />
                    </MiniPlayerProgressBar>
                </>
            ) : (
                <MiniPlayerTopRow>
                    <MiniPlayerArtworkMeta>
                        <TrackArtwork
                            artwork={displayArtwork}
                            title={currentTrack?.title}
                            isPlaying={isPlaying}
                            onClick={() => { startUserInteraction?.(); onPlayToggle(); }}
                            size={40}
                            iconSize={18}
                        />
                        <MiniPlayerMetadata>
                            <Text size="sm" fw={600} lineClamp={1} c={colors.text}>
                                {displayTitle}
                            </Text>
                        </MiniPlayerMetadata>
                    </MiniPlayerArtworkMeta>
                    <MiniPlayerProgressBar>
                        <ProgressBar
                            progress={progress}
                            backgroundColor={colors.progressBackground}
                            barRef={progressBarRef}
                        />
                    </MiniPlayerProgressBar>
                    <MiniPlayerChevron>
                        <ActionIcon
                            variant="subtle"
                            color={colorScheme === 'dark' ? 'gray' : 'dark'}
                            radius="xl"
                            size="sm"
                            onClick={onMinimizeToggle}
                            aria-label="Expand player"
                        >
                            <LuChevronUp size={16} />
                        </ActionIcon>
                    </MiniPlayerChevron>
                </MiniPlayerTopRow>
            )}
        </MiniPlayerContainer>
    );
}; 