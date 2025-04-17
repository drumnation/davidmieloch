'use client';

import { 
  AppShell,
  Group,
  Drawer,
  Stack,
  Text,
  UnstyledButton,
  Box,
  rem,
  Container,
  ActionIcon,
  Tooltip,
  Button,
  Burger,
  MantineTheme,
  ButtonProps
} from '@mantine/core';
import Image from 'next/image';
import { 
  StyledHeaderProps, 
  StyledLogoButtonProps,
  StyledNavProps, 
  StyledMobileDrawerProps 
} from './Header.types';
import { navLinks } from './Header.logic';
import { ClientOnly } from '../../../utils/ClientOnly';
import React from 'react';
import styled from '@emotion/styled';

// Create components that take props and return React elements
export const StyledHeader: React.FC<StyledHeaderProps> = ({ isDark, theme, children }) => {
  return (
    <div 
      style={{ 
        backdropFilter: 'none',
        backgroundColor: isDark ? 'var(--background-dark)' : 'var(--background-light)',
        borderBottom: isDark ? `1px solid ${theme.colors.dark[4]}` : `1px solid ${theme.colors.gray[2]}`,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        transition: 'background-color 200ms ease, border-color 200ms ease',
        color: isDark ? theme.white : theme.colors.dark[9],
      }}
    >
      {children}
    </div>
  );
};

export const StyledContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container 
      size="lg" 
      h="100%" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}
    >
      {children}
    </Container>
  );
};

export const StyledLogoButton = styled(UnstyledButton, {
  shouldForwardProp: (prop) => !['logoHovered', 'isDark', 'theme'].includes(prop.toString())
})<StyledLogoButtonProps>`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  gap: ${rem(4)};
  transform: ${({ logoHovered }) => logoHovered ? 'scale(1.03)' : 'scale(1)'};
  transition: transform 200ms ease;
`;

export const StyledNav = styled(Group, {
  shouldForwardProp: (prop) => !['navItems', 'opened', 'toggle', 'isDark', 'theme', 'handleNavigation'].includes(prop.toString())
})<StyledNavProps>`
  gap: 5px;
  flex: 0 0 auto;
  overflow: hidden;
  flex-wrap: nowrap;
`;

export const StyledMobileDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => !['isDark', 'theme', 'handleNavigation'].includes(prop.toString())
})<StyledMobileDrawerProps>`
  .mantine-Drawer-header {
    background-color: ${props => props.isDark ? props.theme.colors.dark[7] : props.theme.white};
    color: ${props => props.isDark ? props.theme.white : props.theme.colors.dark[9]};
  }
  
  .mantine-Drawer-content {
    background-color: ${props => props.isDark ? props.theme.colors.dark[7] : props.theme.white};
    color: ${props => props.isDark ? props.theme.white : props.theme.colors.dark[9]};
  }
`;

export const ExperienceButton = styled(Button)`
  white-space: nowrap;
  flex: 0 0 auto;
  font-weight: 600;
  transition: all 200ms ease;
  background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
  color: white;
  border: none;
  padding: ${rem(8)} ${rem(12)};
  height: auto;
  position: relative;
  
  &:hover {
    background: linear-gradient(135deg, #4F46E5 0%, #4338CA 100%);
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`; 