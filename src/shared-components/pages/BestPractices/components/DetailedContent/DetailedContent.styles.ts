import { MantineTheme, rem, useMantineTheme } from '@mantine/core';
import type { CSSProperties } from 'react'; // Use React's CSSProperties

// Note: createStyles is deprecated. Using object syntax directly.
// This hook will provide the styles object based on the current theme.
export const useStyles = () => {
  const theme = useMantineTheme();

  // Defensive check for theme and colorScheme
  const isDark = theme && theme.colorScheme === 'dark';

  // If theme is somehow unavailable, return empty styles to prevent crash
  if (!theme) {
    console.error('Mantine theme context is missing. Ensure MantineProvider wraps this component.');
    return { classes: {}, cx: (...args: any[]) => args.filter(Boolean).join(' ') };
  }

  const styles: Record<string, CSSProperties & Record<string, any>> = {
    detailedContentContainer: {
      width: '100%',
      margin: `${theme.spacing.xl} 0 ${rem(64)}`,
      paddingBottom: rem(70),
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',

      '&.visible': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },

    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },

    sectionIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: rem(48),
      height: rem(48),
      borderRadius: '50%',
      backgroundColor: isDark ? theme.colors.dark[6] : theme.black,
      padding: theme.spacing.xs,
      flexShrink: 0,

      '& svg, & img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        fill: theme.white,
      },

      [`@media (max-width: ${theme.breakpoints.xs})`]: {
        width: rem(40),
        height: rem(40),
      },
    },

    detailedContentTitle: {
      fontSize: theme.headings.sizes.h2.fontSize,
      fontWeight: theme.headings.sizes.h2.fontWeight,
      color: isDark ? theme.white : theme.black,
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      flex: 1,
      minWidth: 0,
      margin: 0,

      [`@media (max-width: ${theme.breakpoints.md})`]: {
        fontSize: `calc(${theme.headings.sizes.h2.fontSize} * 0.875)`,
      },
      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        fontSize: `calc(${theme.headings.sizes.h2.fontSize} * 0.75)`,
      },
    },

    detailedContentText: {
      fontSize: theme.fontSizes.lg,
      lineHeight: 1.6,
      marginBottom: theme.spacing.lg,
      color: isDark ? theme.colors.dark[1] : theme.colors.gray[7],
    },

    detailedContentList: {
      fontSize: theme.fontSizes.lg,
      lineHeight: 1.6,
      marginBottom: theme.spacing.lg,
      color: isDark ? theme.colors.dark[1] : theme.colors.gray[7],
      paddingLeft: theme.spacing.xl,
      listStylePosition: 'inside',

      '& ul': {
        listStyle: 'disc',
        margin: 0,
        paddingLeft: theme.spacing.md,
      },
      '& li': {
        marginBottom: theme.spacing.sm,
      }
    },

    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: rem(32),
      height: rem(32),
      borderRadius: '50%',
      backgroundColor: isDark ? theme.colors.dark[6] : theme.black,
      padding: rem(6),
      flexShrink: 0,

      '& svg': {
        fill: theme.white,
      },
    },

    titleWithIconWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },

    sectionTitle: {
      fontSize: theme.headings.sizes.h3.fontSize,
      fontWeight: theme.headings.sizes.h3.fontWeight,
      color: isDark ? theme.white : theme.black,
      margin: 0,
      wordBreak: 'break-word',
      overflowWrap: 'break-word',
      flex: 1,
      minWidth: 0,

      [`@media (max-width: ${theme.breakpoints.md})`]: {
        fontSize: `calc(${theme.headings.sizes.h3.fontSize} * 0.85)`,
      },
      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        fontSize: `calc(${theme.headings.sizes.h3.fontSize} * 0.75)`,
      },
    },

    sectionSubtitle: {
      fontSize: theme.fontSizes.xl,
      color: isDark ? theme.colors.dark[1] : theme.colors.gray[7],
      margin: `0 0 ${theme.spacing.md} 0`,
      fontWeight: 500,
    },

    subtitleWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
    },

    textContent: {
      fontSize: theme.fontSizes.lg,
      lineHeight: 1.6,
      marginBottom: theme.spacing.lg,
      color: isDark ? theme.colors.dark[1] : theme.colors.gray[7],
    },

    listContent: {
      marginBottom: theme.spacing.lg,
      paddingLeft: theme.spacing.xl,
      listStylePosition: 'inside',

      '& ul': {
        listStyle: 'disc',
        margin: 0,
        paddingLeft: theme.spacing.md,
      },
      '& li': {
        fontSize: theme.fontSizes.lg,
        lineHeight: 1.6,
        color: isDark ? theme.colors.dark[1] : theme.colors.gray[7],
        marginBottom: theme.spacing.sm,
      }
    },

    codeBlock: {
      backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
      borderRadius: theme.radius.md,
      padding: theme.spacing.lg,
      overflowX: 'auto',
      marginBottom: theme.spacing.lg,
      fontFamily: theme.fontFamilyMonospace,
      fontSize: theme.fontSizes.sm,
      lineHeight: 1.5,
      color: isDark ? theme.white : theme.black,
      whiteSpace: 'pre',
    },
  };

  // Mantine's hooks usually return { classes, cx, theme, etc. }
  // To maintain compatibility with how it's used in DetailedContent.tsx ({ classes, cx } = useStyles()),
  // we wrap the styles object.
  // A proper `cx` function would be needed if conditional classes are complex.
  const cx = (...args: any[]) => args.filter(Boolean).join(' ');

  return { classes: styles, cx };
};