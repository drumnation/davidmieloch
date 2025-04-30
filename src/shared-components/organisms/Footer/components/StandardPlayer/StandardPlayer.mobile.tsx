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
import { useRef, useEffect } from 'react';
import { useJoyride } from '@/providers/JoyrideProvider';
import { Step } from 'react-joyride';
import { RiUserVoiceFill } from 'react-icons/ri';
import { BsMusicNoteList, BsFillLayersFill } from 'react-icons/bs';
import { AiOutlineControl } from 'react-icons/ai';
import { useJoyrideTour } from '@/hooks/useJoyrideTour';

// --- Mobile Tour Steps ---
const mobilePlayerTourSteps: Step[] = [
    {
        target: '#mobile-narration-toggle',
        content: (
            <Box>
                <Group gap="xs" mb="xs"><RiUserVoiceFill size={20} /><Text fw={600}>Page Narration</Text></Group>
                <Text size="sm" mb="md">Tap here to listen to this page.</Text>
            </Box>
        ),
        placement: 'top-start', disableBeacon: true,
    },
    {
        target: '#mobile-music-toggle',
        content: (
            <Box>
                <Group gap="xs" mb="xs"><BsMusicNoteList size={20} /><Text fw={600}>Background Music</Text></Group>
                <Text size="sm">Tap here to listen to some of my compositions.</Text>
            </Box>
        ),
        placement: 'top-end', disableBeacon: true,
    },
    {
        target: '#mobile-pill-control-bar',
        content: (
            <Box>
                <Group gap="xs" mb="xs"><BsFillLayersFill size={20} /><Text fw={600}>Layered Audio</Text></Group>
                <Text size="sm">Enable both narration and music to listen simultaneously.</Text>
            </Box>
        ),
        placement: 'top', disableBeacon: true,
    },
    {
        target: '#mobile-control-mode-switch',
        content: (
            <Box>
                <Group gap="xs" mb="xs"><AiOutlineControl size={20} /><Text fw={600}>Control Mode</Text></Group>
                <Text size="sm">Use this switch to control either Music or Narration playback/seek when both are active.</Text>
            </Box>
        ),
        placement: 'top', disableBeacon: true,
    },
    {
        target: '#mobile-play-pause-button',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <IoIosPlayCircle size={20} />
                    <Text fw={600}>Start Listening!</Text>
                </Group>
                <Text size="sm">Tap play to start the layered narration experience!</Text>
            </Box>
        ),
        placement: 'top',
        disableBeacon: true,
    },
];
// --- End Mobile Tour Steps ---

const TOUR_STORAGE_KEY = 'playerTourCompletedMobile';

export const StandardPlayerMobile = (props: StandardPlayerProps) => {
    // --- Use the custom hook --- 
    const { handleManualStart: handleStartTour } = useJoyrideTour({
        steps: mobilePlayerTourSteps,
        storageKey: TOUR_STORAGE_KEY,
        options: { autoStartDelay: 150 } // Using 150ms delay as before
    });
    // --- End Joyride Setup ---

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
                            size="lg"
                            style={getButtonStyles(colorScheme, theme)}
                        >
                            {controlMode === 'narration' ? <TbRewindBackward10 size={28} /> : <IoPlaySkipBackCircleOutline size={28} />}
                        </ActionIcon>
                    </Tooltip>
                    <ActionIcon
                        id="mobile-play-pause-button"
                        onClick={handlePlayPause}
                        aria-label={isEffectivelyPlaying ? "Pause" : "Play"}
                        disabled={!displayTrackAvailable}
                        size="xl"
                        style={getButtonStyles(colorScheme, theme)}
                    >
                        {isEffectivelyPlaying ? <IoPauseCircleSharp size={36} /> : <IoIosPlayCircle size={36} />}
                    </ActionIcon>
                    <Tooltip label="Next Track" position="bottom" withArrow disabled={!isMusicTrackAvailable}>
                        <ActionIcon
                            onClick={handleNextTrack}
                            aria-label="Next track"
                            disabled={!isMusicTrackAvailable}
                            size="lg"
                            style={getButtonStyles(colorScheme, theme)}
                        >
                            {controlMode === 'narration' ? <TbRewindForward10 size={28} /> : <IoPlaySkipForwardCircleOutline size={28} />}
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

            <Center style={{ ...getBottomRowStyle(), marginBottom: 5 }}>
                <PillControlBar
                    onPlaylistClick={onPlaylistToggle}
                    onMinimizeClick={onMinimizeToggle}
                    onTourClick={handleStartTour}
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