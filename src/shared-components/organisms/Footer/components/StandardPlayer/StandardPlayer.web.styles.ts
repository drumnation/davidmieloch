import { MantineTheme } from '@mantine/core';
import { CSSProperties } from 'react';

// Example: openPlayerStyle, and any other style objects from StandardPlayer.web.tsx
// Export as named constants or functions that accept theme/colors if needed.

export const getOpenPlayerStyle = (theme: MantineTheme, colors: any): CSSProperties => ({
    height: '100%',
    width: '100%',
    padding: '10px 16px',
    ...colors,
});

export const getArtworkBoxStyle = (): CSSProperties => ({
    height: 'calc(100% - 4px)',
    aspectRatio: '1 / 1',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const flexGrowRow: CSSProperties = { flexGrow: 1, minWidth: 0 };
export const flexGrowCol: CSSProperties = { flexGrow: 1, overflow: 'hidden', minWidth: 0 };
export const metadataCol: CSSProperties = { width: '100%', maxWidth: 400 };
export const buttonToggle: CSSProperties = { minWidth: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' };
export const groupFullWidth: CSSProperties = { width: '100%' };
export const progressBarBox: CSSProperties = { width: '100%' };
export const progressBarInner: CSSProperties = { flexGrow: 1, cursor: 'pointer', padding: '8px 0', margin: '-8px 0' };
export const timeTextLeft: CSSProperties = { whiteSpace: 'nowrap', width: 40, textAlign: 'right' };
export const timeTextRight: CSSProperties = { whiteSpace: 'nowrap', width: 40, textAlign: 'left' };
export const emptyBar = (colors: any): CSSProperties => ({ width: '100%', height: '4px', backgroundColor: colors.progressBackground, borderRadius: 2, marginTop: 4 });

export const cardRow = (theme: MantineTheme): CSSProperties => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 'auto',
    boxShadow: theme.shadows.md as string,
    borderRadius: theme.radius.md as string,
});

export const cardCol = (theme: MantineTheme, colorScheme: string, colors: any): CSSProperties => ({
    background: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    borderTopLeftRadius: theme.radius.md as string,
    borderBottomLeftRadius: theme.radius.md as string,
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
    flex: 1,
});

export const groupMarginRight: CSSProperties = { marginRight: 8 };

export const sliderStyle: CSSProperties = { width: 70 };

export const playlistBtn = (theme: MantineTheme, colorScheme: string, colors: any): CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    width: 56,
    borderTopRightRadius: theme.radius.md as string,
    borderBottomRightRadius: theme.radius.md as string,
    overflow: 'hidden',
    border: `1px solid ${colors.border}`,
    borderLeft: 'none',
    background: colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
});

export const playlistBtnRoot = (theme: MantineTheme, colorScheme: string, colors: any): CSSProperties => ({
    borderTopRightRadius: theme.radius.md as string,
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
    minWidth: 0,
});

export const minimizeBtnRoot = (theme: MantineTheme, colorScheme: string, colors: any): CSSProperties => ({
    borderTopRightRadius: 0,
    borderBottomRightRadius: theme.radius.md as string,
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
    minWidth: 0,
});

export const flexShrink0: CSSProperties = { flexShrink: 0 };

// Add other extracted style objects here, e.g. artworkBoxStyle, cardStyle, buttonStyle, etc. 

// Add new styles for the toggle switch
export const controlToggleGroup = (theme: MantineTheme, colorScheme: 'light' | 'dark'): React.CSSProperties => ({
    cursor: 'pointer',
    padding: `calc(${theme.spacing.xs} / 2)`,
    borderRadius: theme.radius.xl,
    backgroundColor: colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    transition: 'background-color 0.2s ease',
});

export const controlToggleIcon = (theme: MantineTheme, colorScheme: 'light' | 'dark', isActive: boolean): React.CSSProperties => ({
    border: `1px solid ${isActive ? 'transparent' : (colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4])}`,
    boxShadow: isActive ? theme.shadows.xs : 'none',
    transition: 'all 0.2s ease',
}); 