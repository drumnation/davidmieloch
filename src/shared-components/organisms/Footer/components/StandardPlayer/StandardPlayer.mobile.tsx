"use client";

import { Box, Text, ActionIcon, Group, Tooltip, Flex, Center } from '@mantine/core';
import { LuChevronDown, LuListMusic, LuMic, LuMusic, LuVolume1, LuVolume2 } from 'react-icons/lu';
import { IoIosPlayCircle } from 'react-icons/io';
import { IoPauseCircleSharp, IoPlaySkipBackCircleOutline, IoPlaySkipForwardCircleOutline } from 'react-icons/io5';
import { TbRewindBackward10, TbRewindForward10 } from 'react-icons/tb';
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
    getProgressBarBoxStyle,
    getProgressBarContainerStyle,
    getTimeTextStyle,
    getEmptyBarStyle,
    getButtonStyles,
    getBottomRowStyle,
} from './StandardPlayer.mobile.styles';
// import { isIOSMobile } from '@utils/platform'; // Remove this line

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
    // const isIOS = isIOSMobile(); // Remove this line

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
                </Box>
                <Flex direction="column" align="center" justify="space-around" style={{ flexGrow: 1, overflow: 'hidden', minWidth: 0 }}>
                    <Flex direction="column" align="flex-start">
                        <Text size="xs" fw={600} lineClamp={1} c={colors.text}>
                            {displayTitle}
                        </Text>
                        {displayArtist && (
                            <Text size="xs" lineClamp={1} c={colors.textSecondary}>
                                {displayArtist}
                            </Text>
                        )}
                    </Flex>
                </Flex>
            </Flex>

            <Center>
                <Group justify="center" gap="sm" wrap="nowrap">
                    <Tooltip label="Previous Track" position="bottom" withArrow disabled={!isMusicTrackAvailable}>
                        <ActionIcon
                            onClick={handlePrevTrack}
                            aria-label="Previous track"
                            disabled={!isMusicTrackAvailable}
                            size="md"
                            style={getButtonStyles()}
                        >
                            {controlMode === 'narration' ? <TbRewindBackward10 size={24} color="black" /> : <IoPlaySkipBackCircleOutline size={24} color="black" />}
                        </ActionIcon>
                    </Tooltip>
                    <ActionIcon
                        onClick={handlePlayPause}
                        aria-label={isEffectivelyPlaying ? "Pause" : "Play"}
                        disabled={!displayTrackAvailable}
                        size="lg"
                        style={getButtonStyles()}
                    >
                        {isEffectivelyPlaying ? <IoPauseCircleSharp size={30} color="black" /> : <IoIosPlayCircle size={30} color="black" />}
                    </ActionIcon>
                    <Tooltip label="Next Track" position="bottom" withArrow disabled={!isMusicTrackAvailable}>
                        <ActionIcon
                            onClick={handleNextTrack}
                            aria-label="Next track"
                            disabled={!isMusicTrackAvailable}
                            size="md"
                            style={getButtonStyles()}
                        >
                            {controlMode === 'narration' ? <TbRewindForward10 size={24} color="black" /> : <IoPlaySkipForwardCircleOutline size={24} color="black" />}
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Center>

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
                            toggleNarration && toggleNarration();
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
                    controlMode={controlMode}
                    onControlModeToggle={toggleControlMode}
                    showControlModeToggle={showToggle}
                    colorScheme={colorScheme === 'dark' ? 'dark' : 'light'}
                    sliderWidth={56}
                    gap={4}
                    isNarrationPlaying={isVoicePlaying}
                    isMusicPlaying={isMusicPlaying}
                />
            </Center>
        </Flex>
    );
}; 