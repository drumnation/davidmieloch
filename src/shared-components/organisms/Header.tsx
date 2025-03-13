import { useRouter } from 'next/router';
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
import { IconFileDownload } from '@tabler/icons-react';
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
  { label: 'Home', href: '/' },
  // { label: 'Resume', href: '/resume' },
  // { label: 'Blog', href: '/blog' },
  // { label: 'Contact', href: '/contact' },
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
  const router = useRouter();
  const theme = useMantineTheme();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';

  const isActive = (href: string) => router.pathname === href;

  const handleResumeDownload = () => {
    // This will need to be updated with the actual resume PDF path
    window.open('/resume.pdf', '_blank');
  };

  const navItems = navLinks.map((link) => (
    <Link 
      key={link.label} 
      href={link.href} 
      passHref
      style={{ textDecoration: 'none' }}
    >
      <UnstyledButton
        onClick={close}
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
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Group gap="xs" align="center">
              <Image 
                src="/logo.png" 
                alt="David Mieloch Logo" 
                width={32} 
                height={32} 
                style={{ borderRadius: '4px' }}
              />
              <Text 
                fw={700} 
                size="lg" 
                style={{
                  background: theme.other.accentGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                David Mieloch
              </Text>
            </Group>
          </Link>

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
                Resume PDF
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
                    background: theme.other.accentGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
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
                  passHref
                  style={{ textDecoration: 'none' }}
                >
                  <UnstyledButton
                    onClick={close}
                    style={{
                      width: '100%',
                      padding: rem(12),
                      borderRadius: theme.radius.sm,
                      color: isActive(link.href) ? theme.colors.blue[6] : theme.colors.gray[isDark ? 3 : 7],
                      backgroundColor: isActive(link.href) ? (isDark ? 'rgba(0, 188, 212, 0.15)' : theme.colors.blue[0]) : 'transparent',
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </UnstyledButton>
                </Link>
              ))}
              
              {/* Resume download button in mobile menu */}
              <ClientOnly>
                <UnstyledButton
                  onClick={() => {
                    handleResumeDownload();
                    close();
                  }}
                  style={{
                    width: '100%',
                    padding: rem(12),
                    borderRadius: theme.radius.sm,
                    color: theme.colors.blue[6],
                    backgroundColor: 'transparent',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IconFileDownload size={16} style={{ marginRight: rem(8) }} />
                  Resume PDF
                </UnstyledButton>
              </ClientOnly>
              
              <Group justify="space-between" px="md" py="sm">
                <Text size="sm">Theme</Text>
                <ClientOnly>
                  <ThemeToggle />
                </ClientOnly>
              </Group>
            </Stack>
          </Drawer>
        </Group>
      </Container>
    </AppShell.Header>
  );
}

export default Header; 