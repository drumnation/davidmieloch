'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  AppShell,
  Burger,
  Group,
  Drawer,
  Stack,
  Text,
  UnstyledButton,
  Box,
  rem,
  useMantineTheme,
  Container,
  ActionIcon,
  Tooltip,
  Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTheme } from '../../../src/providers/ThemeProvider';
import { IconFileDownload, IconBrandGithub, IconBrandLinkedin, IconBrandMedium } from '@tabler/icons-react';
import { ClientOnly } from '../../../src/utils';

// Simple sun and moon icons for theme toggle
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: 'Enterprise AI DevFramework', href: '/enterprise-ai-development-framework' },
  { label: 'Best Practices Integration', href: '/best-practices-integration' },
  { label: 'Bio', href: '/bio' },
  // { label: 'Blog', href: '/blog' },
  // { label: 'Contact', href: '/contact' },
];

// Social links data
const socialLinks = [
  { name: 'GitHub', icon: IconBrandGithub, url: 'https://github.com/davidmieloch' },
  { name: 'LinkedIn', icon: IconBrandLinkedin, url: 'https://linkedin.com/in/davidmieloch' },
  { name: 'Medium', icon: IconBrandMedium, url: 'https://medium.com/@davidmieloch' }
];

// Theme toggle button component that uses ClientOnly to prevent hydration errors
const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <Tooltip label={isDark ? 'Light mode' : 'Dark mode'}>
      <ActionIcon 
        variant="subtle" 
        onClick={toggleColorScheme} 
        aria-label="Toggle color scheme"
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </ActionIcon>
    </Tooltip>
  );
};

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  // Use a simple approach that works in both routers
  const isActive = (href: string) => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === href;
    }
    return false;
  };

  const handleResumeDownload = () => {
    // This will need to be updated with the actual resume PDF path
    window.open('/resume.pdf', '_blank');
  };

  const navItems = navLinks.map((link) => (
    <Link
      key={link.label}
      href={link.href}
      onClick={close}
      style={{ textDecoration: 'none' }}
    >
      <UnstyledButton
        style={{
          position: 'relative',
          color: isActive(link.href) ? theme.colors.blue[6] : theme.colors.gray[isDark ? 3 : 7],
          fontWeight: 500,
          padding: `${rem(8)} ${rem(12)}`,
          borderRadius: theme.radius.sm,
        }}
      >
        <Text>{link.label}</Text>
        {isActive(link.href) && (
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              left: rem(8),
              right: rem(8),
              height: rem(2),
              background: theme.other.accentGradient,
              borderRadius: theme.radius.sm,
            }}
          />
        )}
      </UnstyledButton>
    </Link>
  ));

  return (
    <AppShell.Header p="md" style={{ 
      backdropFilter: 'blur(10px)',
      backgroundColor: isDark ? 'rgba(26, 27, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      borderBottom: `1px solid ${isDark ? 'rgba(0, 188, 212, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    }}>
      <Container size="lg">
        <Group justify="space-between" h="100%">
          <Group>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <UnstyledButton style={{ textDecoration: 'none' }}>
                <Group gap="xs" align="center">
                  <Image 
                    src="/web-app-manifest-192x192.png" 
                    alt="David Mieloch Logo" 
                    width={32} 
                    height={32} 
                    style={{ borderRadius: '50%' }}
                  />
                  <Text 
                    fw={700} 
                    size="lg" 
                    style={{
                      color: isDark ? '#ffffff' : '#141517'
                    }}
                  >
                    David Mieloch
                  </Text>
                </Group>
              </UnstyledButton>
            </Link>
            
            {/* Social Links */}
            <Group gap="xs" ml="md">
              {socialLinks.map((link) => (
                <Tooltip key={link.name} label={link.name}>
                  <ActionIcon
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    color="blue"
                    size="md"
                  >
                    <link.icon size={18} />
                  </ActionIcon>
                </Tooltip>
              ))}
            </Group>
          </Group>

          <Group gap={5}>
            {/* Desktop navigation */}
            <Group gap={5} visibleFrom="sm">
              {navItems}
            </Group>
            
            {/* Resume download button */}
            <ClientOnly>
              <Button
                variant="subtle"
                leftSection={<IconFileDownload size={16} />}
                onClick={handleResumeDownload}
                visibleFrom="sm"
              >
                Resume
              </Button>
            </ClientOnly>
            
            {/* Theme toggle */}
            <ClientOnly>
              <ThemeToggle />
            </ClientOnly>

            {/* Mobile navigation */}
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          </Group>
          
          <Drawer
            opened={opened}
            onClose={close}
            title={
              <Group gap="xs" align="center">
                <Image 
                  src="/logo.png" 
                  alt="David Mieloch Logo" 
                  width={24} 
                  height={24} 
                  style={{ borderRadius: '4px' }}
                />
                <Text 
                  fw={700} 
                  size="md" 
                  style={{
                    color: isDark ? '#ffffff' : '#141517'
                  }}
                >
                  David Mieloch
                </Text>
              </Group>
            }
            position="right"
            size="xs"
            overlayProps={{ opacity: 0.5, blur: 4 }}
          >
            <Stack gap="xs">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  style={{ textDecoration: 'none' }}
                >
                  <UnstyledButton
                    style={{
                      width: '100%',
                      padding: rem(12),
                      borderRadius: theme.radius.sm,
                      color: isActive(link.href) ? theme.colors.blue[6] : theme.colors.gray[isDark ? 3 : 7],
                      backgroundColor: isActive(link.href) ? (isDark ? 'rgba(0, 188, 212, 0.15)' : theme.colors.blue[0]) : 'transparent',
                      fontWeight: 500,
                    }}
                  >
                    <Text>{link.label}</Text>
                  </UnstyledButton>
                </Link>
              ))}
            </Stack>
          </Drawer>
        </Group>
      </Container>
    </AppShell.Header>
  );
}

export default Header; 