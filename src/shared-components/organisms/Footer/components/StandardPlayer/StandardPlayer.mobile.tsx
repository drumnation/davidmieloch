"use client";

import { Box, Text, ActionIcon, Group, Tooltip, Flex, Center, Button } from '@mantine/core';
import { LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic, LuMic, LuMusic, LuHeadphones, LuVolume1, LuVolume2 } from 'react-icons/lu';
import { formatTime } from '../../Footer.logic';
import { StandardPlayerProps } from './StandardPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import { PillControlBar } from '../../../../molecules/PillControlBar';
import { useStandardPlayerMobile } from './StandardPlayer.mobile.hook';
import { getDisplayTitle, getDisplayArtist } from './StandardPlayer.mobile.logic';
import {
    getPlayerContainerStyle,
    getArtworkBoxStyle,
    getToggleButtonBoxStyle,
    getProgressBarBoxStyle,
    getProgressBarContainerStyle,
    getTimeTextStyle,
    getEmptyBarStyle,
    getButtonStyles,
    getBottomRowStyle,
} from './StandardPlayer.mobile.styles';
import { isIOSMobile } from '@utils/platform';

export const StandardPlayerMobile = (props: StandardPlayerProps) => {
    const {
        theme,
        progressBarContainerRef,
        controlMode,
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
    } = useStandardPlayerMobile(props);

    const {
        currentTrack: activeMusicTrack,
        colors,
        progressBarRef,
        colorScheme,
        startUserInteraction,
        isMusicEnabled,
        isNarrationEnabled,
        musicVolume,
        voiceVolume,
        onMusicVolumeChange,
        onVoiceVolumeChange,
        onPlaylistToggle,
        onMinimizeToggle,
        toggleMusic,
        toggleNarration,
        activeVoiceTrack,
        isMusicPlaying,
        isVoicePlaying,
        playMusic,
        pauseMusic,
        playVoice,
        pauseVoice,
    } = props;

    const displayTitle = getDisplayTitle(controlMode, isMusicEnabled, isNarrationEnabled, activeMusicTrack, activeVoiceTrack);
    const displayArtist = getDisplayArtist(isMusicEnabled, isNarrationEnabled, activeMusicTrack, activeVoiceTrack);
    const artworkSize = 56;
    const isIOS = isIOSMobile();

    return (
        <Flex
            direction="column"
            justify="space-between"
            gap={6}
            style={getPlayerContainerStyle()}
        >
            <Flex align="stretch" gap="sm" style={{ width: '100%', flexGrow: 1 }}>
                <Box style={getArtworkBoxStyle(artworkSize)}>
                    <TrackArtwork
                        artwork={activeMusicTrack?.artwork}
                        title={activeMusicTrack?.title}
                        isPlaying={isEffectivelyPlaying}
                        onClick={() => { startUserInteraction?.(); props.onPlayToggle(); }}
                        size={artworkSize + 10}
                        iconSize={(artworkSize + 10) * 0.5}
                    />
                    <Box style={getToggleButtonBoxStyle()}>
                        {showToggle && (
                            <Button
                                onClick={toggleControlMode}
                                variant="filled"
                                color={controlMode === 'music' ? 'blue' : 'indigo'}
                                radius="xl"
                                size="xs"
                                style={{ minWidth: 48, padding: '0 12px' }}
                                aria-label="Toggle playback mode"
                            >
                                {controlMode === 'music' ? <LuMusic size={18} color={colorScheme === 'dark' ? theme.white : 'black'} /> : <LuHeadphones size={18} color={colorScheme === 'dark' ? theme.white : 'black'} />}
                            </Button>
                        )}
                    </Box>
                </Box>
                <Flex direction="column" align="center" justify="space-around" style={{ flexGrow: 1, overflow: 'hidden', minWidth: 0 }}>
                    <Flex direction="column" align="center">
                        <Text size="xs" fw={600} lineClamp={1} c={colors.text}>
                            {displayTitle}
                        </Text>
                        {displayArtist && (
                            <Text size="xs" lineClamp={1} c={colors.textSecondary}>
                                {displayArtist}
                            </Text>
                        )}
                    </Flex>
                    <Group justify="center" gap="sm" wrap="nowrap">
                        <Tooltip label="Previous Track" position="bottom" withArrow disabled={!isMusicTrackAvailable}>
                            <ActionIcon
                                onClick={handlePrevTrack}
                                aria-label="Previous track"
                                disabled={!isMusicTrackAvailable}
                                size="md"
                                style={getButtonStyles()}
                            >
                                <LuSkipBack size={18} color="black" />
                            </ActionIcon>
                        </Tooltip>
                        <ActionIcon
                            onClick={handlePlayPause}
                            aria-label={isEffectivelyPlaying ? "Pause" : "Play"}
                            disabled={!displayTrackAvailable}
                            size="lg"
                            style={getButtonStyles()}
                        >
                            {isEffectivelyPlaying ? <LuPause size={24} color="black" /> : <LuPlay size={24} color="black" />}
                        </ActionIcon>
                        <Tooltip label="Next Track" position="bottom" withArrow disabled={!isMusicTrackAvailable}>
                            <ActionIcon
                                onClick={handleNextTrack}
                                aria-label="Next track"
                                disabled={!isMusicTrackAvailable}
                                size="md"
                                style={getButtonStyles()}
                            >
                                <LuSkipForward size={18} color="black" />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Flex>
            </Flex>
            <Box style={getProgressBarBoxStyle()}>
                {displayTrackAvailable ? (
                    <Group align="center" gap="xs" wrap="nowrap">
                        <Text size="xs" c={colors.textMuted} style={getTimeTextStyle('right')}>
                            {formatTime(displayCurrentTime)}
                        </Text>
                        <Box ref={progressBarContainerRef} onClick={handleProgressBarClick} style={getProgressBarContainerStyle()}>
                            <ProgressBar progress={displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0} backgroundColor={isNarrationActive ? theme.colors.cyan[6] : colors.progressBackground} barRef={progressBarRef} />
                        </Box>
                        <Text size="xs" c={colors.textMuted} style={getTimeTextStyle('left')}>
                            {formatTime(displayDuration)}
                        </Text>
                    </Group>
                ) : (
                    <Box style={getEmptyBarStyle(colors)} />
                )}
            </Box>
            <Center style={getBottomRowStyle()}>
                <PillControlBar
                    voiceVolume={voiceVolume}
                    musicVolume={musicVolume}
                    onVoiceVolumeChange={controlMode !== 'music' ? (v) => { startUserInteraction?.(); onVoiceVolumeChange(v); } : () => { }}
                    onMusicVolumeChange={controlMode !== 'narration' ? (v) => { startUserInteraction?.(); onMusicVolumeChange(v); } : () => { }}
                    onPlaylistClick={onPlaylistToggle}
                    onMinimizeClick={onMinimizeToggle}
                    isNarrationEnabled={isNarrationEnabled}
                    isMusicEnabled={isMusicEnabled}
                    onToggleNarration={() => {
                        startUserInteraction?.();
                        if (isNarrationEnabled) {
                            if (isVoicePlaying) {
                                pauseVoice && pauseVoice();
                            } else {
                                playVoice && playVoice();
                            }
                        } else {
                            toggleNarration();
                        }
                    }}
                    onToggleMusic={() => {
                        startUserInteraction?.();
                        if (isMusicEnabled) {
                            if (isMusicPlaying) {
                                pauseMusic && pauseMusic();
                            } else {
                                playMusic && playMusic();
                            }
                        } else {
                            toggleMusic();
                        }
                    }}
                    colorScheme={colorScheme === 'dark' ? 'dark' : 'light'}
                    sliderWidth={56}
                    gap={4}
                    isIOS={isIOS}
                />
            </Center>
        </Flex>
    );
}; 