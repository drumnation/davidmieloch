"use client";

import React from 'react';
import { Box, Text, ActionIcon, Group, Tooltip, Button, Flex, Alert, SegmentedControl } from '@mantine/core';
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
        target: '#audio-toggle-buttons-container',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <BsFillLayersFill size={20} />
                    <Text fw={600}>Dual Audio Experience</Text>
                </Group>
                <Text size="sm">Welcome to my audio player! You can listen to page narration, background music, or both simultaneously.</Text>
            </Box>
        ),
        placement: 'left',
        disableBeacon: true,
    },
    {
        target: '#combined-pill-button',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <RiUserVoiceFill size={20} />
                    <BsMusicNoteList size={20} />
                    <Text fw={600}>Audio Controls</Text>
                </Group>
                <Text size="sm">Enable narration to hear this page read aloud, or music to enjoy my compositions. Toggle either one on/off at any time.</Text>
            </Box>
        ),
        placement: 'left',
        disableBeacon: true,
        styles: {
            options: {
                width: 320, // Wider tooltip for this combined explanation
            }
        }
    },
    {
        target: '#play-pause-button',
        content: (
            <Box>
                <Group gap="xs" mb="xs">
                    <IoPlaySharp size={20} />
                    <Text fw={600}>Start Listening!</Text>
                </Group>
                <Text size="sm">Click play to begin. Use the narration/music toggle above to switch which audio source the controls affect when both are enabled.</Text>
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

    // Handler for narration button
    const handleNarrationClick = () => {
        startUserInteraction?.();
        if (isNarrationEnabled) {
            if (isVoicePlaying) pauseVoice?.(); else playVoice?.();
        } else {
            toggleNarration?.();
        }
    };

    // Handler for music button
    const handleMusicClick = () => {
        startUserInteraction?.();
        if (isMusicEnabled) {
            if (isMusicPlaying) pauseMusic?.(); else playMusic?.();
        } else {
            toggleMusic?.();
        }
    };

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
            <Flex direction="column" align="center" gap="sm" style={flexShrink0}>
                {/* Combined Narration/Music Pill Button */}
                <Box id="audio-toggle-buttons-container">
                    <Flex
                        id="combined-pill-button"
                        direction="row"
                        styles={{
                            root: {
                                border: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
                                borderRadius: theme.radius.xl,
                                overflow: 'hidden',
                            }
                        }}
                    >
                        {/* Narration Button */}
                        <Button
                            id="narration-button-group"
                            variant={isNarrationEnabled && isVoicePlaying ? "filled" : "subtle"}
                            color={isNarrationEnabled && isVoicePlaying ? "cyan" : (colorScheme === 'dark' ? 'gray' : 'dark')}
                            size="sm"
                            radius={0}
                            px="sm"
                            onClick={handleNarrationClick}
                            aria-label={isNarrationEnabled ? (isVoicePlaying ? "Pause Narration" : "Play Narration") : "Enable Narration"}
                            styles={{
                                root: {
                                    width: '120px',
                                    borderRight: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
                                    borderRadius: `${theme.radius.xl}px 0 0 ${theme.radius.xl}px`,
                                }
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

                        {/* Music Button */}
                        <Button
                            id="music-button-group"
                            variant={isMusicEnabled && isMusicPlaying ? "filled" : "subtle"}
                            color={isMusicEnabled && isMusicPlaying ? "blue" : (colorScheme === 'dark' ? 'gray' : 'dark')}
                            size="sm"
                            radius={0}
                            px="sm"
                            onClick={handleMusicClick}
                            aria-label={isMusicEnabled ? (isMusicPlaying ? "Pause Music" : "Play Music") : "Enable Music"}
                            styles={{
                                root: {
                                    width: '120px',
                                    borderRadius: `0 ${theme.radius.xl}px ${theme.radius.xl}px 0`,
                                }
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
                    </Flex>
                </Box>

                {/* Playlist and Minimize Buttons */}
                <Box id="playlist-minimize-container">
                    <Flex
                        id="playlist-minimize-pill"
                        direction="row"
                        styles={{
                            root: {
                                border: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
                                borderRadius: theme.radius.xl,
                                overflow: 'hidden',
                            }
                        }}
                    >
                        {/* Playlist Button */}
                        <Button
                            variant="subtle"
                            color={colorScheme === 'dark' ? 'gray' : 'dark'}
                            size="sm"
                            radius={0}
                            onClick={onPlaylistToggle}
                            aria-label="Show playlist"
                            leftSection={<LuListMusic size={14} />}
                            styles={{
                                root: {
                                    width: '120px',
                                    borderRight: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
                                    borderRadius: `${theme.radius.xl}px 0 0 ${theme.radius.xl}px`,
                                },
                                label: {
                                    fontSize: '12px',
                                    fontWeight: 'normal'
                                }
                            }}
                        >
                            Playlist
                        </Button>

                        {/* Minimize Button */}
                        <Button
                            variant="subtle"
                            color={colorScheme === 'dark' ? 'gray' : 'dark'}
                            size="sm"
                            radius={0}
                            onClick={onMinimizeToggle}
                            aria-label="Minimize player"
                            leftSection={<LuChevronDown size={14} />}
                            styles={{
                                root: {
                                    width: '120px',
                                    borderRadius: `0 ${theme.radius.xl}px ${theme.radius.xl}px 0`,
                                },
                                label: {
                                    fontSize: '12px',
                                    fontWeight: 'normal'
                                }
                            }}
                        >
                            Minimize
                        </Button>
                    </Flex>
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