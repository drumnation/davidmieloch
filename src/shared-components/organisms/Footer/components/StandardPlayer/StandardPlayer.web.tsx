"use client";

import { Box, Text, ActionIcon, Group, Slider, Tooltip, Button, Flex, Alert, Checkbox } from '@mantine/core';
import {
    LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic, LuMic, LuMusic,
    LuHeadphones, LuVolume1, LuVolume2, LuVolumeX
} from 'react-icons/lu';
import { MdRecordVoiceOver, MdVoiceOverOff, MdMusicOff, MdOutlineSyncAlt } from 'react-icons/md';
import { TbRewindBackward10, TbRewindForward10, TbRoute } from 'react-icons/tb';
import { IoPlaySharp } from 'react-icons/io5';
import { IoMdPause } from 'react-icons/io';
import { useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { StandardPlayerProps } from './StandardPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import {
    getOpenPlayerStyle,
    getArtworkBoxStyle,
    flexGrowRow,
    flexGrowCol,
    metadataCol,
    buttonToggle,
    groupFullWidth,
    progressBarBox,
    progressBarInner,
    timeTextLeft,
    timeTextRight,
    emptyBar,
    cardRow,
    cardCol,
    groupMarginRight,
    sliderStyle,
    playlistBtn,
    playlistBtnRoot,
    minimizeBtnRoot,
    flexShrink0,
    controlToggleGroup,
    controlToggleIcon
} from './StandardPlayer.web.styles';
import { useStandardPlayerWeb } from './StandardPlayer.web.hook';
import { formatTime } from '../../Footer.logic';
import { useRef, useEffect, useState, useMemo } from 'react';
import { useJoyrideTour } from '@/hooks/useJoyrideTour';
import { Step } from 'react-joyride';
import { AiOutlineControl } from 'react-icons/ai';
import { BsFillLayersFill, BsMusicNoteList } from 'react-icons/bs';
import { RiUserVoiceFill } from 'react-icons/ri';

// NOTE: This component assumes it's only rendered on desktop.

const TOUR_STORAGE_KEY = 'playerTourCompleted';

// Use base steps definition from outside
const basePlayerTourSteps: Step[] = [
    {
        target: '#narration-button-group',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <RiUserVoiceFill size={20} />
                    <Text fw={600}>Page Narration</Text>
                </Group>
                <Text size="sm" mb="md">Click here to listen to this page. Every page on this site has a spoken version to listen to.</Text>
            </Box>
        ),
        placement: 'left',
        disableBeacon: true,
    },
    {
        target: '#music-button-group',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <BsMusicNoteList size={20} />
                    <Text fw={600}>Background Music</Text>
                </Group>
                <Text size="sm">I'm also a composer and musician. Click here to check out some of my compositions.</Text>
            </Box>
        ),
        placement: 'left',
        disableBeacon: true,
    },
    {
        target: '#audio-toggle-buttons-container',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <BsFillLayersFill size={20} />
                    <Text fw={600}>Layered Audio</Text>
                </Group>
                <Text size="sm">Enable both at the same time to listen in the background with narration. Disable narration to hear music at full volume.</Text>
            </Box>
        ),
        placement: 'top',
        disableBeacon: true,
    },
    {
        target: '#narration-music-toggle',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <AiOutlineControl size={20} />
                    <Text fw={600}>Control Mode</Text>
                </Group>
                <Text size="sm">While both are activated, use this toggle selector to change whether the seek bar and player controls affect the Music or the Narration.</Text>
            </Box>
        ),
        placement: 'top',
        disableBeacon: true,
    },
    {
        target: '#play-pause-button',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <IoPlaySharp size={20} />
                    <Text fw={600}>Start Listening!</Text>
                </Group>
                <Text size="sm">Click play to start the layered narration experience!</Text>
            </Box>
        ),
        placement: 'top',
        disableBeacon: true,
    },
];

export const StandardPlayerWeb = (props: StandardPlayerProps) => {
    // Use the custom hook
    const { handleManualStart: handleStartTour } = useJoyrideTour({
        steps: basePlayerTourSteps,
        storageKey: TOUR_STORAGE_KEY,
        options: { autoStartDelay: 150 } // Optional: Adjust delay if needed
    });

    const {
        currentTrack: activeMusicTrack,
        colors,
        progressBarRef,
        colorScheme,
        onPlayToggle,
        onMinimizeToggle,
        onPlaylistToggle,
        onPrevTrack,
        onNextTrack,
        onSeekMusic,
        onSeekNarration,
        startUserInteraction,
        isMusicEnabled,
        isNarrationEnabled,
        musicVolume,
        voiceVolume,
        toggleMusic,
        toggleNarration,
        onMusicVolumeChange,
        onVoiceVolumeChange,
        activeVoiceTrack,
        isMusicPlaying,
        isVoicePlaying,
        playMusic,
        pauseMusic,
        playVoice,
        pauseVoice,
    } = props;

    // Add debug logging for voice track state - use a ref to prevent multiple logs during development
    const hasLoggedVoiceState = useRef<string | null>(null);

    useEffect(() => {
        // Only log when state actually changes or hasn't been logged yet
        const stateString = JSON.stringify({
            isNarrationEnabled,
            hasTrack: !!activeVoiceTrack,
            trackTitle: activeVoiceTrack?.title,
            isPlaying: isVoicePlaying
        });

        if (hasLoggedVoiceState.current === null || hasLoggedVoiceState.current !== stateString) {
            console.log('[DEBUG] StandardPlayer voice state:', {
                isNarrationEnabled,
                hasActiveVoiceTrack: !!activeVoiceTrack,
                activeVoiceTrackTitle: activeVoiceTrack?.title || 'none',
                isVoicePlaying,
                hasPlayVoiceFunction: !!playVoice,
                playVoiceType: typeof playVoice
            });

            // Check if narration button click would work
            if (isNarrationEnabled && activeVoiceTrack && playVoice) {
                console.log('[DEBUG] Narration button should be functional');
            } else {
                console.log('[DEBUG] Issues with narration button:', {
                    narrationEnabled: isNarrationEnabled,
                    hasTrack: !!activeVoiceTrack,
                    hasPlayFunction: !!playVoice
                });
            }

            hasLoggedVoiceState.current = stateString;
        }
    }, [isNarrationEnabled, activeVoiceTrack, isVoicePlaying, playVoice]);

    const {
        theme,
        progressBarContainerRef,
        artworkBoxRef,
        artworkBoxHeight,
        controlMode,
        setControlMode,
        toggleControlMode,
        showToggle,
        isMusicHovered,
        setIsMusicHovered,
        isNarrationHovered,
        setIsNarrationHovered,
        isMusicActive,
        isNarrationActive,
        isEffectivelyPlaying,
        displayControlTrack,
        displayCurrentTime,
        displayDuration,
        displayTrackAvailable,
        handlePlayPause,
        handleProgressBarClick,
        displayTitle,
        displayArtist,
        iconProps,
        layeredAudioMessage,
        handleRewindNarration,
        handleForwardNarration,
    } = useStandardPlayerWeb(props);

    return (
        <Flex
            id="standard-audio-player"
            align="center"
            justify="space-between"
            gap="md"
            style={getOpenPlayerStyle(theme, colors)}
        >
            <Box
                ref={artworkBoxRef}
                style={getArtworkBoxStyle()}
            >
                <TrackArtwork
                    artwork={activeMusicTrack?.artwork}
                    title={activeMusicTrack?.title}
                    isPlaying={isEffectivelyPlaying}
                    onClick={() => {
                        startUserInteraction?.();
                        onPlayToggle();
                    }}
                    size={artworkBoxHeight || 72}
                    iconSize={(artworkBoxHeight || 72) * 0.5}
                />
            </Box>
            <Flex direction="row" align="center" justify="center" style={flexGrowRow}>
                <Flex direction="column" align="center" justify="center" gap={4} style={flexGrowCol}>
                    <Flex direction="column" align="center" style={metadataCol}>
                        <Text size="sm" fw={600} lineClamp={1} c={colors.text} ta="center">
                            {displayTitle}
                        </Text>
                        {displayArtist && (
                            <Text size="xs" lineClamp={1} c={colors.textSecondary} ta="center">
                                {displayArtist}
                            </Text>
                        )}
                    </Flex>
                    <Group justify="center" align="center" gap="xs" wrap="nowrap" style={groupFullWidth}>
                        {showToggle && (
                            <Group
                                id="narration-music-toggle"
                                gap={2}
                                style={controlToggleGroup(theme, colorScheme)}
                                onClick={toggleControlMode}
                                role="button"
                                aria-label={controlMode === 'music' ? "Switch to narration controls" : "Switch to music controls"}
                                tabIndex={0}
                            >
                                <Tooltip label="Control Music" position="bottom" withArrow>
                                    <ActionIcon size="sm" variant={controlMode === 'music' ? "filled" : "subtle"} color={controlMode === 'music' ? "blue" : (colorScheme === 'dark' ? 'gray' : 'dark')} radius="xl" style={controlToggleIcon(theme, colorScheme, controlMode === 'music')}>
                                        <LuMusic size={16} />
                                    </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Control Narration" position="bottom" withArrow>
                                    <ActionIcon size="sm" variant={controlMode === 'narration' ? "filled" : "subtle"} color={controlMode === 'narration' ? "cyan" : (colorScheme === 'dark' ? 'gray' : 'dark')} radius="xl" style={controlToggleIcon(theme, colorScheme, controlMode === 'narration')}>
                                        <MdRecordVoiceOver size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        )}
                        <Tooltip
                            label={controlMode === 'narration' ? "Rewind 10s" : "Previous Track"}
                            position="bottom"
                            withArrow
                            disabled={controlMode === 'narration' ? !isNarrationActive || !activeVoiceTrack : !isMusicActive || !activeMusicTrack}
                        >
                            <ActionIcon
                                onClick={() => {
                                    startUserInteraction?.();
                                    if (controlMode === 'narration') {
                                        handleRewindNarration();
                                    } else {
                                        onPrevTrack();
                                    }
                                }}
                                aria-label={controlMode === 'narration' ? "Rewind 10 seconds" : "Previous track"}
                                disabled={controlMode === 'narration' ? !isNarrationActive || !activeVoiceTrack : !isMusicActive || !activeMusicTrack}
                                {...iconProps}
                                size="sm"
                            >
                                {controlMode === 'narration' ?
                                    <TbRewindBackward10 size={16} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /> :
                                    <LuSkipBack size={16} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />
                                }
                            </ActionIcon>
                        </Tooltip>
                        <ActionIcon id="play-pause-button" onClick={handlePlayPause} aria-label={isEffectivelyPlaying ? 'Pause' : 'Play'} disabled={!displayTrackAvailable} {...iconProps} size="lg">
                            {isEffectivelyPlaying ? <LuPause size={22} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /> : <LuPlay size={22} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />}
                        </ActionIcon>
                        <Tooltip
                            label={controlMode === 'narration' ? "Forward 10s" : "Next Track"}
                            position="bottom"
                            withArrow
                            disabled={controlMode === 'narration' ? !isNarrationActive || !activeVoiceTrack : !isMusicActive || !activeMusicTrack}
                        >
                            <ActionIcon
                                onClick={() => {
                                    startUserInteraction?.();
                                    if (controlMode === 'narration') {
                                        handleForwardNarration();
                                    } else {
                                        onNextTrack();
                                    }
                                }}
                                aria-label={controlMode === 'narration' ? "Forward 10 seconds" : "Next track"}
                                disabled={controlMode === 'narration' ? !isNarrationActive || !activeVoiceTrack : !isMusicActive || !activeMusicTrack}
                                {...iconProps}
                                size="sm"
                            >
                                {controlMode === 'narration' ?
                                    <TbRewindForward10 size={16} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /> :
                                    <LuSkipForward size={16} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />
                                }
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    <Box style={progressBarBox}>
                        {displayTrackAvailable ? (
                            <Group align="center" gap="xs" wrap="nowrap">
                                <Text size="xs" c={colors.textMuted} style={timeTextLeft}>
                                    {formatTime(displayCurrentTime)}
                                </Text>
                                <Box
                                    ref={progressBarContainerRef}
                                    onClick={handleProgressBarClick}
                                    style={progressBarInner}
                                >
                                    <ProgressBar
                                        progress={displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0}
                                        backgroundColor={controlMode === 'narration' ? theme.colors.cyan[6] : colors.progressBackground}
                                        barRef={progressBarRef}
                                    />
                                </Box>
                                <Text size="xs" c={colors.textMuted} style={timeTextRight}>
                                    {formatTime(displayDuration)}
                                </Text>
                            </Group>
                        ) : (
                            <Box style={emptyBar(colors)} />
                        )}
                    </Box>
                </Flex>
            </Flex>
            <Flex align="center" gap="lg" style={flexShrink0}>
                <Box style={cardRow(theme)}>
                    <Box
                        id="audio-toggle-buttons-container"
                        style={cardCol(theme, colorScheme, colors)}
                    >
                        <Group
                            id="narration-button-group"
                            gap="xs"
                            align="center"
                            wrap="nowrap"
                            style={groupMarginRight}
                        >
                            <Button
                                id="narration-enable-button"
                                variant={isNarrationEnabled && isVoicePlaying ? "filled" : "subtle"}
                                color={isNarrationEnabled && isVoicePlaying ? "cyan" : (colorScheme === 'dark' ? 'gray' : 'dark')}
                                size="sm"
                                radius="xl"
                                px="sm"
                                onClick={() => {
                                    startUserInteraction?.();
                                    if (isNarrationEnabled) {
                                        if (isVoicePlaying) pauseVoice?.(); else playVoice?.();
                                    } else {
                                        toggleNarration?.();
                                    }
                                }}
                                aria-label={isNarrationEnabled ? (isVoicePlaying ? "Pause Narration" : "Play Narration") : "Enable Narration"}
                                styles={{
                                    root: {
                                        minWidth: 110,
                                        border: `1px solid ${colorScheme === 'dark' ? theme.white : theme.black}`,
                                    },
                                    section: { marginRight: 0 }
                                }}
                            >
                                <Group gap="xs" wrap="nowrap" align="center">
                                    {isNarrationEnabled
                                        ? isVoicePlaying
                                            ? <MdRecordVoiceOver size={14} color={theme.white} />
                                            : <MdVoiceOverOff size={14} color={colorScheme === 'dark' ? theme.white : theme.black} />
                                        : <MdVoiceOverOff size={14} color={theme.colors.gray[5]} />
                                    }
                                    <Text size="xs" c={isNarrationEnabled && isVoicePlaying ? theme.white : 'inherit'}>
                                        Narration
                                    </Text>
                                </Group>
                            </Button>
                        </Group>
                        <Group
                            id="music-button-group"
                            gap="xs"
                            align="center"
                            wrap="nowrap"
                            style={groupMarginRight}
                            mt={10}
                        >
                            <Button
                                id="music-enable-button"
                                variant={isMusicEnabled && isMusicPlaying ? "filled" : "subtle"}
                                color={isMusicEnabled && isMusicPlaying ? "blue" : (colorScheme === 'dark' ? 'gray' : 'dark')}
                                size="sm"
                                radius="xl"
                                px="sm"
                                onClick={() => {
                                    startUserInteraction?.();
                                    if (isMusicEnabled) {
                                        if (isMusicPlaying) pauseMusic?.(); else playMusic?.();
                                    } else {
                                        toggleMusic?.();
                                    }
                                }}
                                aria-label={isMusicEnabled ? (isMusicPlaying ? "Pause Music" : "Play Music") : "Enable Music"}
                                styles={{
                                    root: {
                                        minWidth: 110,
                                        border: `1px solid ${colorScheme === 'dark' ? theme.white : theme.black}`,
                                    },
                                    section: { marginRight: 0 }
                                }}
                            >
                                <Group gap="xs" wrap="nowrap" align="center">
                                    {isMusicEnabled
                                        ? isMusicPlaying
                                            ? <LuMusic size={14} color={theme.white} />
                                            : <MdMusicOff size={14} color={colorScheme === 'dark' ? theme.white : theme.black} />
                                        : <MdMusicOff size={14} color={theme.colors.gray[5]} />
                                    }
                                    <Text size="xs" c={isMusicEnabled && isMusicPlaying ? theme.white : 'inherit'}>
                                        Music
                                    </Text>
                                </Group>
                            </Button>
                        </Group>
                    </Box>
                    <Box style={playlistBtn(theme, colorScheme, colors)}>
                        <Tooltip label="Playlist" position="left" withArrow>
                            <Button
                                onClick={onPlaylistToggle}
                                aria-label="Show playlist"
                                variant="white"
                                color={iconProps.color}
                                size="xs"
                                styles={{ root: playlistBtnRoot(theme, colorScheme, colors) }}
                            >
                                <LuListMusic size={20} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Minimize" position="left" withArrow>
                            <Button
                                onClick={onMinimizeToggle}
                                aria-label="Minimize player"
                                variant="white"
                                color={iconProps.color}
                                size="xs"
                                styles={{ root: minimizeBtnRoot(theme, colorScheme, colors) }}
                            >
                                <LuChevronDown size={20} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Player Tour" position="left" withArrow>
                            <Button
                                onClick={handleStartTour}
                                aria-label="Start player feature tour"
                                variant="white"
                                color={iconProps.color}
                                size="xs"
                                styles={{ root: minimizeBtnRoot(theme, colorScheme, colors) }}
                            >
                                <TbRoute size={20} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Flex>
            {layeredAudioMessage && (
                <Alert color="yellow" style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                    {layeredAudioMessage}
                </Alert>
            )}
        </Flex>
    );
}; 