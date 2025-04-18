'use client';

import React, { useState } from 'react';
import { 
  Text, 
  UnstyledButton, 
  Box, 
  rem, 
  ActionIcon, 
  Tooltip 
} from '@mantine/core';
import { socialLinks, navLinks } from './Header.logic';
import { RenderNavItemsProps, RenderSocialIconsProps } from './Header.types';
import { usePathname } from 'next/navigation';

export const renderNavItems = ({ theme, isDark, handleNavigation }: RenderNavItemsProps) => {
  // Local state for hover effects
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  // Use Next.js's usePathname hook directly
  const pathname = usePathname();
  
  const handleLinkHover = (label: string) => {
    setHoveredLink(label);
  };

  const handleLinkLeave = () => {
    setHoveredLink(null);
  };

  const isActive = (href: string, pathname: string) => {
    if (!pathname) return false;
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) {
      if (pathname === href) return true;
      if (pathname.startsWith(`${href}/`)) return true;
      return false;
    }
    return false;
  };

  return navLinks.map((link) => (
    <div
      key={link.label}
      style={{ textDecoration: 'none', position: 'relative' }}
      onClick={(e) => {
        e.preventDefault();
        handleNavigation(link.href);
      }}
    >
      <UnstyledButton
        style={{
          position: 'relative',
          color: isActive(link.href, pathname) 
            ? (isDark ? '#ffffff' : theme.colors.dark[9]) 
            : hoveredLink === link.label 
              ? (isDark ? '#ffffff' : theme.colors.dark[9]) 
              : (isDark ? '#ffffff' : theme.colors.dark[9]),
          fontWeight: isActive(link.href, pathname) || hoveredLink === link.label ? 600 : 500,
          padding: `${rem(8)} ${rem(12)}`,
          borderRadius: theme.radius.sm,
          whiteSpace: 'nowrap',
          transition: 'all 200ms ease',
          backgroundColor: hoveredLink === link.label 
            ? (isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)') 
            : 'transparent',
          transform: hoveredLink === link.label ? 'translateY(-1px)' : 'translateY(0)',
          boxShadow: hoveredLink === link.label ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
          borderBottom: hoveredLink === link.label ? '2px solid #6366F1' : '2px solid transparent',
          cursor: 'pointer',
        }}
        onMouseEnter={() => handleLinkHover(link.label)}
        onMouseLeave={handleLinkLeave}
      >
        <Text 
          size="sm" 
          style={{
            color: isDark ? '#ffffff' : 'inherit',
            transition: 'all 200ms ease',
          }}
        >
          {link.label}
        </Text>
        {isActive(link.href, pathname) && (
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              left: rem(8),
              right: rem(8),
              height: rem(2),
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              borderRadius: theme.radius.sm,
            }}
          />
        )}
      </UnstyledButton>
    </div>
  ));
};

export const renderSocialIcons = ({ theme, isDark }: RenderSocialIconsProps) => {
  const [socialHovered, setSocialHovered] = useState<string | null>(null);

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
            <link.icon size={18} style={{ color: isDark ? theme.colors.gray[3] : theme.colors.blue[6] }} />
          </ActionIcon>
        </Tooltip>
      ))}
    </div>
  );
}; 