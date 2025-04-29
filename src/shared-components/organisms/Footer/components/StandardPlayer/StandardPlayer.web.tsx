"use client";

import { Box, Text, ActionIcon, Group, Slider, Tooltip, Button, Flex } from '@mantine/core';
import {
    LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic, LuMic, LuMusic,
    LuHeadphones, LuVolume1, LuVolume2
} from 'react-icons/lu';
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
    flexShrink0
} from './StandardPlayer.web.styles';
import { useStandardPlayerWeb } from './StandardPlayer.web.hook';
import { formatTime } from '../../Footer.logic';
import { useRef } from 'react';

// NOTE: This component assumes it's only rendered on desktop.

export const StandardPlayerWeb = (props: StandardPlayerProps) => {
    const {
        theme,
        progressBarContainerRef,
        artworkBoxRef,
        artworkBoxHeight,
        controlMode,
        setControlMode,
        isMusicHovered,
        setIsMusicHovered,
        isNarrationHovered,
        setIsNarrationHovered,
        toggleControlMode,
        showToggle,
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
    } = useStandardPlayerWeb(props);

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

    return (
        <Flex
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
                            <Button
                                onClick={toggleControlMode}
                                variant="filled"
                                color={controlMode === 'music' ? 'blue' : 'cyan'}
                                radius="xl"
                                size="sm"
                                style={buttonToggle}
                                aria-label={controlMode === 'music' ? 'Switch to narration controls' : 'Switch to music controls'}
                            >
                                {controlMode === 'music' ? <LuHeadphones size={20} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /> : <LuMusic size={20} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />}
                            </Button>
                        )}
                        <Tooltip label="Previous Track" position="bottom" withArrow disabled={!isMusicActive || !activeMusicTrack}>
                            <ActionIcon onClick={() => { startUserInteraction?.(); onPrevTrack(); }} aria-label="Previous track" disabled={!isMusicActive || !activeMusicTrack} {...iconProps} size="sm">
                                <LuSkipBack size={16} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />
                            </ActionIcon>
                        </Tooltip>
                        <ActionIcon onClick={handlePlayPause} aria-label={isEffectivelyPlaying ? 'Pause' : 'Play'} disabled={!displayTrackAvailable} {...iconProps} size="lg">
                            {isEffectivelyPlaying ? <LuPause size={22} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /> : <LuPlay size={22} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />}
                        </ActionIcon>
                        <Tooltip label="Next Track" position="bottom" withArrow disabled={!isMusicActive || !activeMusicTrack}>
                            <ActionIcon onClick={() => { startUserInteraction?.(); onNextTrack(); }} aria-label="Next track" disabled={!isMusicActive || !activeMusicTrack} {...iconProps} size="sm">
                                <LuSkipForward size={16} color={colorScheme === 'dark' ? theme.white : 'currentColor'} />
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
                    <Box style={cardCol(theme, colorScheme, colors)}>
                        <Group gap="xs" align="center" wrap="nowrap" style={groupMarginRight}>
                            <Button
                                leftSection={
                                    isNarrationHovered
                                        ? (isVoicePlaying ? <LuPause size={14} color={theme.black} /> : <LuPlay size={14} color={theme.black} />)
                                        : <LuHeadphones size={14} color={theme.black} />
                                }
                                variant="filled"
                                color={iconProps.color}
                                size="xs"
                                w={110}
                                onClick={() => {
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
                                aria-pressed={isNarrationEnabled}
                                styles={{
                                    root: {
                                        borderTopLeftRadius: theme.radius.md,
                                        borderTopRightRadius: theme.radius.md,
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 0,
                                        background: isNarrationEnabled ? theme.white : theme.colors.dark[5],
                                        color: isNarrationEnabled ? theme.colors.dark[7] : theme.colors.gray[3],
                                        fontWeight: 600,
                                    },
                                }}
                                onMouseEnter={() => setIsNarrationHovered(true)}
                                onMouseLeave={() => setIsNarrationHovered(false)}
                            >
                                Narration
                            </Button>
                            {isNarrationEnabled && (
                                <Tooltip label="Narration Volume" position="top" withArrow>
                                    <Group gap={2} wrap="nowrap" align="center" style={{ cursor: 'pointer' }}>
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume1 size={12} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /></ActionIcon>
                                        <Slider value={voiceVolume} onChange={onVoiceVolumeChange} min={0} max={1} step={0.01} size={2} thumbSize={10} style={sliderStyle} color={iconProps.color} aria-label="Narration volume" styles={{ thumb: { transition: 'transform 0.1s ease', ':hover': { transform: 'scale(1.2)' } }, track: { transition: 'all 0.1s ease' } }} />
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume2 size={14} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /></ActionIcon>
                                    </Group>
                                </Tooltip>
                            )}
                        </Group>
                        <Group gap="xs" align="center" wrap="nowrap" style={groupMarginRight}>
                            <Button
                                leftSection={
                                    isMusicHovered
                                        ? (isMusicPlaying ? <LuPause size={14} color={theme.black} /> : <LuPlay size={14} color={theme.black} />)
                                        : <LuMusic size={14} color={theme.black} />
                                }
                                variant="filled"
                                color={iconProps.color}
                                size="xs"
                                w={110}
                                onClick={() => {
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
                                aria-pressed={isMusicEnabled}
                                styles={{
                                    root: {
                                        borderTopLeftRadius: 0,
                                        borderTopRightRadius: 0,
                                        borderBottomLeftRadius: theme.radius.md,
                                        borderBottomRightRadius: theme.radius.md,
                                        background: isMusicEnabled ? theme.white : theme.colors.dark[5],
                                        color: isMusicEnabled ? theme.colors.dark[7] : theme.colors.gray[3],
                                        fontWeight: 600,
                                    },
                                }}
                                onMouseEnter={() => setIsMusicHovered(true)}
                                onMouseLeave={() => setIsMusicHovered(false)}
                            >
                                Music
                            </Button>
                            {isMusicEnabled && (
                                <Tooltip label="Music Volume" position="top" withArrow>
                                    <Group gap={2} wrap="nowrap" align="center" style={{ cursor: 'pointer' }}>
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume1 size={12} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /></ActionIcon>
                                        <Slider value={musicVolume} onChange={onMusicVolumeChange} min={0} max={1} step={0.01} size={2} thumbSize={10} style={sliderStyle} color={iconProps.color} aria-label="Music volume" styles={{ thumb: { transition: 'transform 0.1s ease', ':hover': { transform: 'scale(1.2)' } }, track: { transition: 'all 0.1s ease' } }} />
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume2 size={14} color={colorScheme === 'dark' ? theme.white : 'currentColor'} /></ActionIcon>
                                    </Group>
                                </Tooltip>
                            )}
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
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
}; 