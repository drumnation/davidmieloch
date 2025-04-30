"use client";

import { useMantineTheme, Flex, Group, ActionIcon, Slider, Box, Tooltip, Switch } from '@mantine/core';
import { LuMusic, LuListMusic, LuChevronDown } from 'react-icons/lu';
import { MdRecordVoiceOver, MdMusicNote, MdVoiceOverOff, MdMusicOff } from 'react-icons/md';
import { FunctionComponent } from 'react';
import { TbRoute } from 'react-icons/tb';

interface PillControlBarProps {
    voiceVolume?: number;
    musicVolume?: number;
    onVoiceVolumeChange?: (v: number) => void;
    onMusicVolumeChange?: (v: number) => void;
    onPlaylistClick: () => void;
    onMinimizeClick: () => void;
    onTourClick?: () => void;
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

export const PillControlBar: FunctionComponent<PillControlBarProps> = ({
    voiceVolume,
    musicVolume,
    onVoiceVolumeChange,
    onMusicVolumeChange,
    onPlaylistClick,
    onMinimizeClick,
    onTourClick,
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
            id="mobile-pill-control-bar"
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
                id="mobile-narration-toggle"
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
                        padding: '6px 8px',
                        borderRight: `1px solid ${dividerColor}`,
                    }}
                >
                    <Switch
                        id="mobile-control-mode-switch"
                        checked={controlMode === 'narration'}
                        onChange={onControlModeToggle}
                        size="sm"
                        color={controlMode === 'narration' ? theme.colors.indigo[6] : theme.colors.blue[6]}
                        onLabel={<MdRecordVoiceOver size={14} color={theme.white} />}
                        offLabel={<MdMusicNote size={14} color={theme.white} />}
                        aria-label="Toggle playback mode between music and narration"
                        styles={{
                            track: {
                                backgroundColor: controlMode === 'music' ? theme.colors.blue[6] : undefined,
                                borderColor: controlMode === 'music' ? theme.colors.blue[6] : undefined,
                            },
                        }}
                    />
                </Box>
            )}

            {/* Music */}
            <Group
                id="mobile-music-toggle"
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
                {musicVolume !== undefined && onMusicVolumeChange && (
                    <Slider
                        value={musicVolume}
                        onChange={onMusicVolumeChange}
                        min={0}
                        max={1}
                        step={0.01}
                        size="xs"
                        style={{ width: sliderWidth }}
                    />
                )}
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

            {/* Tour Button (New) */}
            {onTourClick && (
                <Box
                    style={{
                        ...itemBaseStyle,
                        borderRight: `1px solid ${dividerColor}`,
                    }}
                >
                    <Tooltip label="Player Tour" position="top" withArrow>
                        <ActionIcon variant="transparent" onClick={onTourClick} aria-label="Start Tour" style={{ color: isDark ? theme.white : theme.black }}>
                            <TbRoute size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Box>
            )}

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
