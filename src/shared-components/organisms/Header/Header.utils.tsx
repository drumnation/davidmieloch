'use client';

import React, { useState, useMemo } from 'react';
import { rem, Box, Text, UnstyledButton, ActionIcon, Tooltip, MantineTheme, Group, ThemeIcon } from '@mantine/core';
import { socialLinks, navLinks } from './Header.logic';
import {
  RenderNavItemsProps,
  RenderSocialIconsProps,
  MobileNavLinkProps,
  IconComponent,
  NavLink,
  SocialLink
} from './Header.types';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function toRem(val: string | number) {
  if (typeof val === 'number') return rem(val).toString();
  if (typeof val === 'string' && !isNaN(Number(val))) return rem(Number(val)).toString();
  return val;
}

export const RenderNavItems: React.FC<RenderNavItemsProps> = ({
  navLinks,
  activePath,
  handleNavigation,
  isActive,
  hoveredLink,
  handleLinkHover,
  handleLinkLeave,
  isDark,
  theme,
}) => {
  const [clickedLink, /* setClickedLink */] = useState<string | null>(null);
  const pathname = usePathname();

  const linkElements = navLinks.map((link: NavLink) => {
    const isCurrentlyActive = isActive(link.href);
    const isHovered = hoveredLink === link.label;

    // Define text color based on dark mode
    const textColor = isDark ? '#ffffff' : theme.colors.dark[9];

    return (
      <div
        key={link.label}
        style={{ textDecoration: 'none', position: 'relative' }}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => handleNavigation(link.href)}
      >
        <UnstyledButton
          style={{
            position: 'relative',
            color: textColor,
            fontWeight: isCurrentlyActive || isHovered ? 600 : 500,
            padding: `${String(toRem(8))} ${String(toRem(12))}`,
            borderRadius: theme.radius.sm,
            whiteSpace: 'nowrap',
            transition: 'all 200ms ease',
            backgroundColor: clickedLink === link.label
              ? (isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)')
              : isHovered
                ? (isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)')
                : 'transparent',
            transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
            boxShadow: isHovered ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
            borderBottom: isHovered ? '2px solid #6366F1' : '2px solid transparent',
            cursor: clickedLink ? 'wait' : 'pointer',
            opacity: clickedLink ? 0.7 : 1,
            pointerEvents: clickedLink ? 'none' : 'auto',
          }}
          onMouseEnter={() => handleLinkHover(link.label)}
          onMouseLeave={() => handleLinkLeave()}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {((link.icon as any) && (
              <span style={{
                marginRight: `${toRem(theme.spacing.sm)}`,
                display: 'flex',
                alignItems: 'center',
                color: textColor // Ensure icon color matches text
              }}>
                {React.createElement(link.icon as any, {
                  size: 18,
                  stroke: 1.5,
                  color: textColor // Explicitly set icon color
                })}
              </span>
            ))}
            <Text
              size="sm"
              style={{
                color: textColor, // Ensure text color is explicitly set
                transition: 'all 200ms ease',
                fontWeight: 'inherit',
              }}
            >
              {link.label}
            </Text>
          </div>
          {isCurrentlyActive && (
            <Box
              style={{
                position: 'absolute',
                bottom: 0,
                left: String(toRem(8)),
                right: String(toRem(8)),
                height: String(toRem(2)),
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                borderRadius: theme.radius.sm,
              }}
            />
          )}
        </UnstyledButton>
      </div>
    );
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: rem(8) }}>
      {linkElements}
    </div>
  );
};

export const RenderSocialIcons: React.FC<RenderSocialIconsProps> = ({
  socialLinks,
  socialHovered,
  setSocialHovered,
  isDark,
  theme,
}) => {
  return (
    <div style={{ marginLeft: '1rem' }}>
      {socialLinks.map((link) => (
        <Tooltip key={link.name} label={link.name} zIndex={2000}>
          <ActionIcon
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            color={isDark ? 'gray.3' : theme.primaryColor}
            size="md"
            style={{
              transform: socialHovered === link.name ? 'scale(1.1)' : 'scale(1)',
              backgroundColor: socialHovered === link.name ? (isDark ? theme.colors.dark[5] : theme.colors.blue[0]) : 'transparent',
              transition: 'transform 200ms ease, background-color 200ms ease',
            }}
            onMouseEnter={() => setSocialHovered(link.name)}
            onMouseLeave={() => setSocialHovered(null)}
          >
            {React.createElement(link.icon as any, { size: 18, stroke: 1.5, style: { color: isDark ? theme.colors.gray[3] : theme.colors.blue[6], marginRight: String(toRem(theme.spacing.sm)) } })}
          </ActionIcon>
        </Tooltip>
      ))}
    </div>
  );
};

export const getHeaderStyle = (/* pinned: boolean, isDark: boolean, theme: MantineTheme */): React.CSSProperties => ({
  position: 'fixed',
  top: 0,
  // ... existing code ...
});

export const MobileNavLink: React.FC<MobileNavLinkProps & { isDark: boolean; theme: MantineTheme }> = ({
  icon: Icon,
  label,
  href,
  onClick,
  isDark,
  theme,
  isActive,
}) => {
  const hoverColor = useMemo(() => (isDark ? theme.colors.dark[6] : theme.colors.gray[1]), [isDark, theme]);
  const borderLeftColor = useMemo(() => (isActive ? theme.colors[theme.primaryColor][6] : 'transparent'), [isActive, theme]);

  return (
    <UnstyledButton
      component={Link}
      href={href}
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: isDark ? theme.colors.dark[0] : theme.black,
        borderLeft: `3px solid ${borderLeftColor}`,
      }}
    >
      <Group>
        <ThemeIcon color={theme.primaryColor} variant="light">
          <Icon size="1.1rem" />
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}; 