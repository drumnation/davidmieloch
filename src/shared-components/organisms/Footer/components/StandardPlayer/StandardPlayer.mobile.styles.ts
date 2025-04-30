import { MantineTheme } from '@mantine/core';
import { CSSProperties } from 'react';

export const getPlayerContainerStyle = (): CSSProperties => ({
    height: 'auto',
    minHeight: '110px',
    width: '100%',
    padding: '8px 12px',
});

export const getArtworkBoxStyle = (artworkSize: number): CSSProperties => ({
    height: 'auto',
    width: `${artworkSize + 10}px`,
    flexShrink: 0,
});

export const getToggleButtonBoxStyle = (): CSSProperties => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 0',
});

export const getMetaTextStyle = (color: string): CSSProperties => ({
    color,
});

export const getProgressBarBoxStyle = (): CSSProperties => ({
    width: '100%',
    padding: '0 8px',
});

export const getProgressBarContainerStyle = (): CSSProperties => ({
    flexGrow: 1,
    cursor: 'pointer',
    padding: '8px 0',
    margin: '-8px 0',
});

export const getTimeTextStyle = (align: 'right' | 'left'): CSSProperties => ({
    whiteSpace: 'nowrap',
    width: 35,
    textAlign: align,
});

export const getEmptyBarStyle = (colors: any): CSSProperties => ({
    width: '100%',
    height: '4px',
    backgroundColor: colors.progressBackground,
    borderRadius: '2px',
    marginTop: '4px',
});

export const getButtonStyles = (colorScheme: 'light' | 'dark', theme: MantineTheme): CSSProperties => {
    const isDark = colorScheme === 'dark';
    return {
        border: `1px solid ${isDark ? theme.white : theme.black}`,
        backgroundColor: isDark ? theme.black : theme.white,
        color: isDark ? theme.white : theme.black,
        borderRadius: '24px',
    };
};

export const getBottomRowStyle = (): CSSProperties => ({
    width: '100%',
    marginTop: '8px',
}); 