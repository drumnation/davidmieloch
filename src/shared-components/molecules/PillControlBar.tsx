"use client";

import { useMantineTheme, Flex, Group, ActionIcon, Slider, Box, Tooltip, Switch } from '@mantine/core';
import { LuMusic, LuListMusic, LuChevronDown } from 'react-icons/lu';
import { MdRecordVoiceOver, MdMusicNote, MdVoiceOverOff, MdMusicOff } from 'react-icons/md';

interface PillControlBarProps {
    voiceVolume?: number;
    musicVolume?: number;
    onVoiceVolumeChange?: (v: number) => void;
    onMusicVolumeChange?: (v: number) => void;
    onPlaylistClick: () => void;
    onMinimizeClick: () => void;
    isNarrationEnabled: boolean;
    isMusicEnabled: boolean;
    isNarrationPlaying?: boolean;
    isMusicPlaying?: boolean;
    onToggleNarration: () => void;
    onToggleMusic: () => void;
    controlMode?: 'music' | 'narration';
    onControlModeToggle?: () => void;
    showControlModeToggle?: boolean;
    colorScheme?: 'light' | 'dark';
    sliderWidth?: number;
    gap?: number;
}

export const PillControlBar = ({
    voiceVolume,
    musicVolume,
    onVoiceVolumeChange,
    onMusicVolumeChange,
    onPlaylistClick,
    onMinimizeClick,
    isNarrationEnabled,
    isMusicEnabled,
    isNarrationPlaying = false,
    isMusicPlaying = false,
    onToggleNarration,
    onToggleMusic,
    controlMode = 'music',
    onControlModeToggle,
    showControlModeToggle = false,
    colorScheme = 'light',
    sliderWidth = 80,
    gap = 6,
}: PillControlBarProps) => {
    const theme = useMantineTheme();

    const isDark = colorScheme === 'dark';
    const containerBg = isDark ? theme.colors.dark[6] : theme.colors.gray[0];
    const dividerColor = isDark ? theme.colors.dark[4] : theme.colors.gray[3];

    const itemBaseStyle = {
        display: 'flex',
        alignItems: 'center',
        gap,
        padding: '6px 8px',
        boxSizing: 'border-box',
    } as const;

    return (
        <Flex
            align="center"
            style={{
                background: containerBg,
                borderRadius: 9999,
                paddingInline: 6,
                boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                transition: 'box-shadow 150ms ease',
                boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px ${dividerColor}`;
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 0 rgba(0,0,0,0)';
            }}
        >
            {/* Narration */}
            <Group
                style={{
                    ...itemBaseStyle,
                    borderRight: `1px solid ${dividerColor}`,
                    borderRadius: '9999px 0 0 9999px',
                    flexDirection: 'row',
                }}
            >
                <ActionIcon
                    onClick={onToggleNarration}
                    aria-label="Toggle Narration"
                    variant={isNarrationEnabled && isNarrationPlaying ? "filled" : "transparent"}
                    color={isNarrationEnabled && isNarrationPlaying ? "indigo" : undefined}
                    radius={isNarrationEnabled && isNarrationPlaying ? "xl" : undefined}
                    style={{
                        color: isNarrationEnabled ? (isDark ? theme.white : theme.black) : theme.colors.gray[6],
                    }}
                    size="sm"
                >
                    {isNarrationEnabled ? (isNarrationPlaying ? <MdRecordVoiceOver size={16} /> : <MdVoiceOverOff size={16} />) : <MdVoiceOverOff size={16} />}
                </ActionIcon>
                {voiceVolume !== undefined && onVoiceVolumeChange && (
                    <Slider
                        value={voiceVolume}
                        onChange={onVoiceVolumeChange}
                        min={0}
                        max={1}
                        step={0.01}
                        size="xs"
                        style={{ width: sliderWidth }}
                    />
                )}
            </Group>

            {/* Control Mode Toggle Button (New) -> Switch */}
            {showControlModeToggle && onControlModeToggle && (
                <Box
                    style={{
                        ...itemBaseStyle,
                        padding: '6px 8px', // Revert padding slightly for switch
                        borderRight: `1px solid ${dividerColor}`,
                    }}
                >
                    <Switch
                        checked={controlMode === 'narration'} // Checked state represents narration mode
                        onChange={onControlModeToggle}
                        size="sm"
                        color={controlMode === 'narration' ? theme.colors.indigo[6] : theme.colors.blue[6]} // Active track color
                        onLabel={<MdRecordVoiceOver size={14} color={theme.white} />} // Icon for narration (on)
                        offLabel={<MdMusicNote size={14} color={theme.white} />} // Icon for music (off)
                        aria-label="Toggle playback mode between music and narration"
                        styles={{
                            track: {
                                backgroundColor: controlMode === 'music' ? theme.colors.blue[6] : undefined, // Set inactive track to blue
                                borderColor: controlMode === 'music' ? theme.colors.blue[6] : undefined, // Match border
                            },
                        }}
                    />
                    {/* <Tooltip label={controlMode === 'music' ? "Switch to Voice Control" : "Switch to Music Control"} position="top" withArrow>
                        <ActionIcon ... />
                    </Tooltip> */}
                </Box>
            )}

            {/* Music */}
            <Group
                style={{
                    ...itemBaseStyle,
                    borderRight: `1px solid ${dividerColor}`,
                    flexDirection: 'row',
                }}
            >
                <ActionIcon
                    onClick={onToggleMusic}
                    aria-label="Toggle Music"
                    variant={isMusicEnabled && isMusicPlaying ? "filled" : "transparent"}
                    color={isMusicEnabled && isMusicPlaying ? "blue" : undefined}
                    radius={isMusicEnabled && isMusicPlaying ? "xl" : undefined}
                    style={{
                        color: isMusicEnabled ? (isDark ? theme.white : theme.black) : theme.colors.gray[6],
                    }}
                    size="sm"
                >
                    {isMusicEnabled ? (isMusicPlaying ? <LuMusic size={16} /> : <MdMusicOff size={16} />) : <MdMusicOff size={16} />}
                </ActionIcon>
            </Group>

            {/* Playlist */}
            <Box
                style={{
                    ...itemBaseStyle,
                    borderRight: `1px solid ${dividerColor}`,
                }}
            >
                <ActionIcon variant="transparent" onClick={onPlaylistClick} aria-label="Playlist" style={{ color: isDark ? theme.white : theme.black }}>
                    <LuListMusic size={18} />
                </ActionIcon>
            </Box>

            {/* Minimize */}
            <Box
                style={{
                    ...itemBaseStyle,
                    borderRadius: '0 9999px 9999px 0',
                }}
            >
                <ActionIcon variant="transparent" onClick={onMinimizeClick} aria-label="Minimize" style={{ color: isDark ? theme.white : theme.black }}>
                    <LuChevronDown size={18} />
                </ActionIcon>
            </Box>
        </Flex>
    );
};
