"use client";

import { useMantineTheme, Flex, Group, ActionIcon, Slider, Box, Tooltip } from '@mantine/core';
import { LuHeadphones, LuMusic, LuListMusic, LuChevronDown } from 'react-icons/lu';

interface PillControlBarProps {
    voiceVolume: number;
    musicVolume: number;
    onVoiceVolumeChange: (v: number) => void;
    onMusicVolumeChange: (v: number) => void;
    onPlaylistClick: () => void;
    onMinimizeClick: () => void;
    isNarrationEnabled: boolean;
    isMusicEnabled: boolean;
    onToggleNarration: () => void;
    onToggleMusic: () => void;
    colorScheme?: 'light' | 'dark';
    sliderWidth?: number;
    gap?: number;
    isIOS?: boolean;
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
    onToggleNarration,
    onToggleMusic,
    colorScheme = 'light',
    sliderWidth = 80,
    gap = 6,
    isIOS = false,
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
                    variant="transparent"
                    style={{ color: isNarrationEnabled ? (isDark ? theme.white : theme.black) : theme.colors.gray[6] }}
                    size="sm"
                >
                    <LuHeadphones size={16} />
                </ActionIcon>
                {isIOS ? (
                    <Tooltip label="Volume control is not available on iOS. Use your device volume buttons." position="top" withArrow>
                        <Slider
                            value={voiceVolume}
                            onChange={onVoiceVolumeChange}
                            min={0}
                            max={1}
                            step={0.01}
                            size="xs"
                            style={{ width: sliderWidth }}
                            disabled
                        />
                    </Tooltip>
                ) : (
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
                    variant="transparent"
                    style={{ color: isMusicEnabled ? (isDark ? theme.white : theme.black) : theme.colors.gray[6] }}
                    size="sm"
                >
                    <LuMusic size={16} />
                </ActionIcon>
                {isIOS ? (
                    <Tooltip label="Volume control is not available on iOS. Use your device volume buttons." position="top" withArrow>
                        <Slider
                            value={musicVolume}
                            onChange={onMusicVolumeChange}
                            min={0}
                            max={1}
                            step={0.01}
                            size="xs"
                            style={{ width: sliderWidth }}
                            disabled
                        />
                    </Tooltip>
                ) : (
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
