"use client";

import { Box, Text, ActionIcon, Group, Tooltip, Flex, Center, useMantineTheme, Button } from '@mantine/core';
import {
    LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic, LuMic, LuMusic,
    LuHeadphones, LuVolume1, LuVolume2
} from 'react-icons/lu';
import { formatTime } from '../../Footer.logic';
import { StandardPlayerProps } from './StandardPlayer.types';
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import { useCallback, useRef, useEffect, useState } from 'react';
import { PillControlBar } from '../../../../molecules/PillControlBar';

// NOTE: This component assumes it's only rendered on mobile.

export const StandardPlayerMobile = ({
    currentTrack: activeMusicTrack,
    progress,
    colors,
    progressBarRef,
    colorScheme,
    currentTime: musicCurrentTime,
    duration: musicDuration,
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
    voiceCurrentTime,
    voiceDuration,
    playMusic,
    pauseMusic,
    playVoice,
    pauseVoice,
}: StandardPlayerProps) => {

    const progressBarContainerRef = useRef<HTMLDivElement>(null);
    const theme = useMantineTheme();
    const [controlMode, setControlMode] = useState<'music' | 'narration'>(isMusicEnabled ? 'music' : 'narration');

    useEffect(() => {
        if (isMusicEnabled && isNarrationEnabled) return;
        if (isMusicEnabled) setControlMode('music');
        else if (isNarrationEnabled) setControlMode('narration');
    }, [isMusicEnabled, isNarrationEnabled]);

    const showToggle = isMusicEnabled && isNarrationEnabled;
    const toggleControlMode = () => {
        setControlMode((prev) => (prev === 'narration' ? 'music' : 'narration'));
    };

    const isMusicActive = controlMode === 'music';
    const isNarrationActive = controlMode === 'narration';
    const isEffectivelyPlaying = isMusicPlaying || isVoicePlaying;
    const displayControlTrack = controlMode === 'music' ? activeMusicTrack : activeVoiceTrack;
    const displayCurrentTime = controlMode === 'music' ? musicCurrentTime : voiceCurrentTime;
    const displayDuration = controlMode === 'music' ? musicDuration : voiceDuration;
    const displayTrackAvailable = !!displayControlTrack;

    const handlePlayPause = () => {
        startUserInteraction?.();
        if (isMusicEnabled && isNarrationEnabled) {
            onPlayToggle();
            onPlayToggle();
        } else {
            onPlayToggle();
        }
    };

    const handleProgressBarClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarContainerRef.current || displayDuration <= 0) return;
        startUserInteraction?.();
        const rect = progressBarContainerRef.current.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const containerWidth = rect.width;
        const newProgress = (clickX / containerWidth) * 100;
        if (controlMode === 'music') {
            onSeekMusic(Math.max(0, Math.min(100, newProgress)));
        } else if (controlMode === 'narration') {
            onSeekNarration(Math.max(0, Math.min(100, newProgress)));
        }
    }, [displayDuration, onSeekMusic, onSeekNarration, controlMode, startUserInteraction]);

    // --- Display Logic ---
    let displayTitle = '';
    if (controlMode === 'narration') {
        if (isMusicEnabled && isNarrationEnabled && activeMusicTrack?.title) {
            displayTitle = `Narration + ${activeMusicTrack.title}`;
        } else {
            displayTitle = 'Narration';
        }
    } else if (controlMode === 'music' && activeMusicTrack?.title) {
        displayTitle = activeMusicTrack.title;
    } else {
        displayTitle = 'Audio Player';
    }

    const displayArtist = isMusicEnabled && isNarrationEnabled && activeVoiceTrack && activeMusicTrack
        ? "Narration and Music by David Mieloch"
        : isNarrationEnabled && activeVoiceTrack
            ? "Narration by David Mieloch"
            : activeMusicTrack?.artist || "Music by David Mieloch";

    // Button styling
    const buttonStyles = {
        border: '1px solid black',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '20px',
    };

    const artworkSize = 56;

    return (
        <Flex
            direction="column"
            justify="space-between"
            gap={6}
            style={{
                height: 'auto',
                minHeight: '110px',
                width: '100%',
                padding: '8px 12px'
            }}
        >
            {/* --- Top Row: Contains Art Column | Meta/Controls/Seek Column --- */}
            <Flex align="stretch" gap="sm" style={{ width: '100%', flexGrow: 1 }}>
                {/* Col 1: Art (Full Height) */}
                <Box style={{ height: 'auto', width: `${artworkSize + 10}px`, flexShrink: 0 }}>
                    <TrackArtwork
                        artwork={activeMusicTrack?.artwork}
                        title={activeMusicTrack?.title}
                        isPlaying={isEffectivelyPlaying}
                        onClick={() => { startUserInteraction?.(); onPlayToggle(); }}
                        size={artworkSize + 10}
                        iconSize={(artworkSize + 10) * 0.5}
                    />
                    {/* Toggle Button always centered under artwork */}
                    <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
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
                                {controlMode === 'music' ? <LuMusic size={18} /> : <LuHeadphones size={18} />}
                            </Button>
                        )}
                    </Box>
                </Box>
                {/* Col 2: Meta / Playback Stack (centered) */}
                <Flex direction="column" align="center" justify="space-around" style={{ flexGrow: 1, overflow: 'hidden', minWidth: 0 }}>
                    {/* Meta */}
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
                    {/* Playback Controls */}
                    <Group justify="center" gap="sm" wrap="nowrap">
                        <Tooltip label="Previous Track" position="bottom" withArrow disabled={!isMusicActive || !activeMusicTrack}>
                            <ActionIcon
                                onClick={() => { startUserInteraction?.(); onPrevTrack(); }}
                                aria-label="Previous track"
                                disabled={!isMusicActive || !activeMusicTrack}
                                size="md"
                                style={buttonStyles}
                            >
                                <LuSkipBack size={18} />
                            </ActionIcon>
                        </Tooltip>
                        <ActionIcon
                            onClick={handlePlayPause}
                            aria-label={isEffectivelyPlaying ? "Pause" : "Play"}
                            disabled={!displayTrackAvailable}
                            size="lg"
                            style={buttonStyles}
                        >
                            {isEffectivelyPlaying ? <LuPause size={24} /> : <LuPlay size={24} />}
                        </ActionIcon>
                        <Tooltip label="Next Track" position="bottom" withArrow disabled={!isMusicActive || !activeMusicTrack}>
                            <ActionIcon
                                onClick={() => { startUserInteraction?.(); onNextTrack(); }}
                                aria-label="Next track"
                                disabled={!isMusicActive || !activeMusicTrack}
                                size="md"
                                style={buttonStyles}
                            >
                                <LuSkipForward size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Flex>
            </Flex>

            {/* --- Seek Bar Row: Seek + Time --- */}
            <Box style={{ width: '100%', padding: '0 8px' }}>
                {displayTrackAvailable ? (
                    <Group align="center" gap="xs" wrap="nowrap">
                        <Text size="xs" c={colors.textMuted} style={{ whiteSpace: 'nowrap', width: 35, textAlign: 'right' }}>
                            {formatTime(displayCurrentTime)}
                        </Text>
                        <Box ref={progressBarContainerRef} onClick={handleProgressBarClick} style={{ flexGrow: 1, cursor: 'pointer', padding: '8px 0', margin: '-8px 0' }}>
                            <ProgressBar progress={displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0} backgroundColor={isNarrationActive ? theme.colors.cyan[6] : colors.progressBackground} barRef={progressBarRef} />
                        </Box>
                        <Text size="xs" c={colors.textMuted} style={{ whiteSpace: 'nowrap', width: 35, textAlign: 'left' }}>
                            {formatTime(displayDuration)}
                        </Text>
                    </Group>
                ) : (
                    <Box style={{ width: '100%', height: '4px', backgroundColor: colors.progressBackground, borderRadius: '2px', marginTop: '4px' }} />
                )}
            </Box>

            {/* --- Bottom Row: ONE ROW CONTROL BAR --- */}
            <Center style={{ width: '100%', marginTop: '8px' }}>
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
                />
            </Center>
        </Flex>
    );
}; 