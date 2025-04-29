"use client";

import { Box, Text, ActionIcon, Group, Slider, Tooltip, Button, Flex } from '@mantine/core';
import {
    LuChevronDown, LuPlay, LuPause, LuSkipBack, LuSkipForward, LuListMusic, LuMic, LuMusic,
    LuHeadphones, LuVolume1, LuVolume2
} from 'react-icons/lu';
import { openPlayerStyle } from '../../Footer.styles'; // Keep desktop style
import { formatTime } from '../../Footer.logic';
import { StandardPlayerProps } from './StandardPlayer.types'; // Use shared types
import { TrackArtwork } from '../TrackArtwork';
import { ProgressBar } from '../ProgressBar';
import { useCallback, useRef, useState, useEffect } from 'react'; // Removed useState, useEffect for isMobile
import { useElementSize, useToggle } from '@mantine/hooks'; // Import hook to measure element size
import { useMantineTheme } from '@mantine/core';

// NOTE: This component assumes it's only rendered on desktop.

export const StandardPlayerWeb = ({
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
    // New props
    isMusicEnabled,
    isNarrationEnabled,
    musicVolume,
    voiceVolume,
    toggleMusic,
    toggleNarration,
    onMusicVolumeChange,
    onVoiceVolumeChange,
    // Context needed for display
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
    const { ref: artworkBoxRef, height: artworkBoxHeight } = useElementSize(); // Hook to measure artwork box
    const [controlMode, setControlMode] = useState<'music' | 'narration'>(isMusicEnabled ? 'music' : 'narration');
    const theme = useMantineTheme();
    const [isMusicHovered, setIsMusicHovered] = useState(false);
    const [isNarrationHovered, setIsNarrationHovered] = useState(false);

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
    // Refined Title Logic
    let combinedTitle = '';
    if (isNarrationEnabled && activeVoiceTrack?.title) {
        combinedTitle = activeVoiceTrack.title;
    }
    if (isMusicEnabled && activeMusicTrack?.title) {
        if (combinedTitle) {
            console.log(`[WebPlayer] Combining Titles: Narration='${combinedTitle}', Music='${activeMusicTrack.title}'`);
            combinedTitle += ` + ${activeMusicTrack.title}`;
        } else {
            combinedTitle = activeMusicTrack.title;
        }
    }
    if (!combinedTitle) combinedTitle = 'Audio Player'; // Fallback if nothing is loaded/enabled
    const displayTitle = combinedTitle;

    const displayArtist = isMusicEnabled && isNarrationEnabled && activeVoiceTrack && activeMusicTrack
        ? "Narration and Music by David Mieloch"
        : isNarrationEnabled && activeVoiceTrack
            ? "Narration by David Mieloch"
            : activeMusicTrack?.artist || "Music by David Mieloch";

    // --- Icon Props ---
    const iconProps = {
        variant: "subtle",
        color: colorScheme === 'dark' ? 'gray' : 'dark',
        radius: "xl",
        style: { ':hover': { backgroundColor: colors.hoverBackground } }
    };
    const volumeSliderWidth = 70; // Desktop width

    return (
        <Flex // Main Row Container
            align="center"
            justify="space-between"
            gap="md"
            style={{ ...openPlayerStyle, height: '100%', width: '100%', padding: '10px 16px' }}
        >
            {/* Column 1: Cover Art */}
            <Box
                ref={artworkBoxRef} // Assign ref to the box
                style={{
                    height: 'calc(100% - 4px)', // Slightly less than full height for padding 
                    aspectRatio: '1 / 1',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <TrackArtwork
                    artwork={activeMusicTrack?.artwork}
                    title={activeMusicTrack?.title}
                    isPlaying={isEffectivelyPlaying}
                    onClick={() => { startUserInteraction?.(); onPlayToggle(); }}
                    size={artworkBoxHeight || 72} // Use measured height, fallback to default
                    iconSize={(artworkBoxHeight || 72) * 0.5} // Calculate icon size based on actual size
                />
            </Box>

            {/* Column 2: Metadata/Controls/SeekBar with Toggle to the left of Seek Bar */}
            <Flex direction="row" align="center" justify="center" style={{ flexGrow: 1, minWidth: 0 }}>
                <Flex direction="column" align="center" justify="center" gap={4} style={{ flexGrow: 1, overflow: 'hidden', minWidth: 0 }}>
                    {/* Metadata */}
                    <Flex direction="column" align="center" style={{ width: '100%', maxWidth: '400px' }}>
                        <Text size="sm" fw={600} lineClamp={1} c={colors.text} ta="center">
                            {displayTitle}
                        </Text>
                        {displayArtist && (
                            <Text size="xs" lineClamp={1} c={colors.textSecondary} ta="center">
                                {displayArtist}
                            </Text>
                        )}
                    </Flex>

                    {/* Playback Controls - toggle button directly left of controls, all centered */}
                    <Group justify="center" align="center" gap="xs" wrap="nowrap" style={{ width: '100%' }}>
                        {showToggle && (
                            <Button
                                onClick={toggleControlMode}
                                variant="filled"
                                color={controlMode === 'music' ? 'blue' : 'cyan'}
                                radius="xl"
                                size="sm"
                                style={{ minWidth: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                aria-label={controlMode === 'music' ? 'Switch to narration controls' : 'Switch to music controls'}
                            >
                                {controlMode === 'music' ? <LuHeadphones size={20} /> : <LuMusic size={20} />}
                            </Button>
                        )}
                        <Tooltip label="Previous Track" position="bottom" withArrow disabled={!isMusicActive || !activeMusicTrack}>
                            <ActionIcon onClick={() => { startUserInteraction?.(); onPrevTrack(); }} aria-label="Previous track" disabled={!isMusicActive || !activeMusicTrack} {...iconProps} size="sm">
                                <LuSkipBack size={16} />
                            </ActionIcon>
                        </Tooltip>
                        <ActionIcon onClick={handlePlayPause} aria-label={isEffectivelyPlaying ? "Pause" : "Play"} disabled={!displayTrackAvailable} {...iconProps} size="lg">
                            {isEffectivelyPlaying ? <LuPause size={22} /> : <LuPlay size={22} />}
                        </ActionIcon>
                        <Tooltip label="Next Track" position="bottom" withArrow disabled={!isMusicActive || !activeMusicTrack}>
                            <ActionIcon onClick={() => { startUserInteraction?.(); onNextTrack(); }} aria-label="Next track" disabled={!isMusicActive || !activeMusicTrack} {...iconProps} size="sm">
                                <LuSkipForward size={16} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>

                    {/* Seek Bar Area - toggle button removed from here */}
                    <Box style={{ width: '100%' }}>
                        {displayTrackAvailable ? (
                            <Group align="center" gap="xs" wrap="nowrap">
                                <Text size="xs" c={colors.textMuted} style={{ whiteSpace: 'nowrap', width: 40, textAlign: 'right' }}>
                                    {formatTime(displayCurrentTime)}
                                </Text>
                                <Box
                                    ref={progressBarContainerRef}
                                    onClick={handleProgressBarClick}
                                    style={{ flexGrow: 1, cursor: 'pointer', padding: '8px 0', margin: '-8px 0' }}
                                >
                                    <ProgressBar
                                        progress={displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0}
                                        backgroundColor={controlMode === 'narration' ? theme.colors.cyan[6] : colors.progressBackground}
                                        barRef={progressBarRef}
                                    />
                                </Box>
                                <Text size="xs" c={colors.textMuted} style={{ whiteSpace: 'nowrap', width: 40, textAlign: 'left' }}>
                                    {formatTime(displayDuration)}
                                </Text>
                            </Group>
                        ) : (
                            <Box style={{ width: '100%', height: '4px', backgroundColor: colors.progressBackground, borderRadius: '2px', marginTop: '4px' }} />
                        )}
                    </Box>
                </Flex>
            </Flex>

            {/* Column 3: Mode Toggles, Volumes, Playlist/Minimize */}
            <Flex align="center" gap="lg" style={{ flexShrink: 0 }}>
                {/* Card + Buttons as a seamless flex row */}
                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', height: 'auto', boxShadow: theme.shadows.md, borderRadius: theme.radius.md }}>
                    {/* Card for Toggles & Sliders */}
                    <Box style={{
                        background: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                        borderTopLeftRadius: theme.radius.md,
                        borderBottomLeftRadius: theme.radius.md,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        border: `1px solid ${colors.border}`,
                        borderRight: 'none',
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        alignItems: 'stretch',
                        minWidth: 130,
                        flex: 1
                    }}>
                        {/* Narration Row */}
                        <Group gap="xs" align="center" wrap="nowrap" style={{ marginRight: 8 }}>
                            <Button
                                leftSection={
                                    isNarrationHovered
                                        ? (isVoicePlaying ? <LuPause size={14} /> : <LuPlay size={14} />)
                                        : <LuHeadphones size={14} />
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
                                        fontWeight: 600
                                    }
                                }}
                                onMouseEnter={() => setIsNarrationHovered(true)}
                                onMouseLeave={() => setIsNarrationHovered(false)}
                            >
                                Narration
                            </Button>
                            {isNarrationEnabled && (
                                <Tooltip label="Narration Volume" position="top" withArrow>
                                    <Group gap={2} wrap="nowrap" align="center" style={{ cursor: 'pointer' }}>
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume1 size={12} /></ActionIcon>
                                        <Slider value={voiceVolume} onChange={onVoiceVolumeChange} min={0} max={1} step={0.01} size={2} thumbSize={10} style={{ width: 70 }} color={iconProps.color} aria-label="Narration volume" styles={{ thumb: { transition: 'transform 0.1s ease', ':hover': { transform: 'scale(1.2)' } }, track: { transition: 'all 0.1s ease' } }} />
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume2 size={14} /></ActionIcon>
                                    </Group>
                                </Tooltip>
                            )}
                        </Group>
                        {/* Music Row */}
                        <Group gap="xs" align="center" wrap="nowrap" style={{ marginRight: 8 }}>
                            <Button
                                leftSection={
                                    isMusicHovered
                                        ? (isMusicPlaying ? <LuPause size={14} /> : <LuPlay size={14} />)
                                        : <LuMusic size={14} />
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
                                        fontWeight: 600
                                    }
                                }}
                                onMouseEnter={() => setIsMusicHovered(true)}
                                onMouseLeave={() => setIsMusicHovered(false)}
                            >
                                Music
                            </Button>
                            {isMusicEnabled && (
                                <Tooltip label="Music Volume" position="top" withArrow>
                                    <Group gap={2} wrap="nowrap" align="center" style={{ cursor: 'pointer' }}>
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume1 size={12} /></ActionIcon>
                                        <Slider value={musicVolume} onChange={onMusicVolumeChange} min={0} max={1} step={0.01} size={2} thumbSize={10} style={{ width: 70 }} color={iconProps.color} aria-label="Music volume" styles={{ thumb: { transition: 'transform 0.1s ease', ':hover': { transform: 'scale(1.2)' } }, track: { transition: 'all 0.1s ease' } }} />
                                        <ActionIcon size="xs" variant="transparent" color={iconProps.color} style={{ pointerEvents: 'none', opacity: 0.7 }}><LuVolume2 size={14} /></ActionIcon>
                                    </Group>
                                </Tooltip>
                            )}
                        </Group>
                    </Box>
                    {/* Playlist/Minimize Buttons - seamless right edge */}
                    <Box style={{ display: 'flex', flexDirection: 'column', width: 56, borderTopRightRadius: theme.radius.md, borderBottomRightRadius: theme.radius.md, overflow: 'hidden', border: `1px solid ${colors.border}`, borderLeft: 'none', background: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white }}>
                        <Tooltip label="Playlist" position="left" withArrow>
                            <Button
                                onClick={onPlaylistToggle}
                                aria-label="Show playlist"
                                variant="white"
                                color={iconProps.color}
                                size="xs"
                                styles={{
                                    root: {
                                        borderTopRightRadius: theme.radius.md,
                                        borderBottomRightRadius: 0,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        border: 'none',
                                        borderLeft: `1px solid ${colors.border}`,
                                        background: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                                        boxShadow: 'none',
                                        height: '50%',
                                        minHeight: 0,
                                        flex: 1,
                                        margin: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        minWidth: 0
                                    }
                                }}
                            >
                                <LuListMusic size={20} />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Minimize" position="left" withArrow>
                            <Button
                                onClick={onMinimizeToggle}
                                aria-label="Minimize player"
                                variant="white"
                                color={iconProps.color}
                                size="xs"
                                styles={{
                                    root: {
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: theme.radius.md,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        border: 'none',
                                        borderLeft: `1px solid ${colors.border}`,
                                        borderTop: `1px solid ${colors.border}`,
                                        background: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                                        boxShadow: 'none',
                                        height: '50%',
                                        minHeight: 0,
                                        flex: 1,
                                        margin: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        minWidth: 0
                                    }
                                }}
                            >
                                <LuChevronDown size={20} />
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    );
}; 