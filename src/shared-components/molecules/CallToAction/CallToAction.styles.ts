import { MantineTheme } from '@mantine/core';

export const getStyles = (theme: MantineTheme) => ({
    container: {
        backgroundColor: `linear-gradient(135deg, var(--mantine-color-${theme.primaryColor}-6), var(--mantine-color-cyan-6))`,
        borderRadius: 'var(--mantine-radius-md)',
        padding: 'var(--mantine-spacing-xl) var(--mantine-spacing-xl)',
        textAlign: 'center',
        boxShadow: 'var(--mantine-shadow-md)',
    },
    title: {
        color: 'var(--mantine-color-white)',
        fontSize: '1.75rem',
        fontWeight: 700,
        marginBottom: 'var(--mantine-spacing-md)',

        '@media (min-width: 992px)': {
            fontSize: '2rem',
        },
    },
    description: {
        color: 'var(--mantine-color-white)',
        opacity: 0.9,
        maxWidth: 600,
        margin: '0 auto',
        marginBottom: 'var(--mantine-spacing-xl)',
    },
    button: {
        padding: 'var(--mantine-spacing-md) var(--mantine-spacing-xl)',
        backgroundColor: 'var(--mantine-color-white)',
        color: `var(--mantine-color-${theme.primaryColor}-7)`,
        fontWeight: 600,
        transition: 'all 0.2s ease',
        border: 'none',

        '&:hover': {
            backgroundColor: 'var(--mantine-color-gray-0)',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
        },

        '&:active': {
            transform: 'translateY(0)',
        },
    },
}); 