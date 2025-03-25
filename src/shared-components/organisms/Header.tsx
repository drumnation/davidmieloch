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
import { usePathname } from 'next/navigation';

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  // { label: 'Home', href: '/' },
  { label: 'Enterprise AI DevTeam Transformation', href: '/enterprise-ai-development-framework' },
  { label: 'React Best Practices', href: '/fullstack-react-best-practices-integration' },
  { label: 'Bio', href: '/bio' },
  { label: 'Code Examples', href: '/code-examples' },
];

// Social links data
const socialLinks = [
  { name: 'GitHub', icon: IconBrandGithub, url: 'https://github.com/davidmieloch' },
  { name: 'LinkedIn', icon: IconBrandLinkedin, url: 'https://linkedin.com/in/davidmieloch' },
  { name: 'Medium', icon: IconBrandMedium, url: 'https://medium.com/@davidmieloch' }
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  // Force light mode
  const isDark = false;
  // Use Next.js pathname hook instead of window check
  const pathname = usePathname();

  // Determine if a link is active based on the current pathname
  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) {
      // Check if it's an exact match or followed by a slash to avoid partial matches
      // e.g. /bio should not match /biography
      if (pathname === href) return true;
      if (pathname.startsWith(`${href}/`)) return true;
      return false;
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
          color: isActive(link.href) ? theme.colors.blue[6] : theme.colors.gray[7],
          fontWeight: 500,
          padding: `${rem(8)} ${rem(12)}`,
          borderRadius: theme.radius.sm,
          whiteSpace: 'nowrap',
        }}
      >
        <Text size="sm">{link.label}</Text>
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
    <AppShell.Header 
      p="md" 
      style={{ 
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        height: '60px', // Fixed height
        overflow: 'visible', // Allow dropdowns to be visible
      }}
    >
      <Container size="lg" h="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Group wrap="nowrap" style={{ flex: '0 0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <UnstyledButton style={{ textDecoration: 'none' }}>
              <Group gap="xs" align="center" wrap="nowrap">
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
                    color: '#141517'
                  }}
                >
                  David Mieloch
                </Text>
              </Group>
            </UnstyledButton>
          </Link>
          
          {/* Social Links */}
          <Group gap="xs" ml="md" wrap="nowrap">
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

        <Group gap={5} wrap="nowrap" style={{ flex: '0 0 auto', overflow: 'hidden' }}>
          {/* Desktop navigation */}
          <Group gap={5} visibleFrom="sm" wrap="nowrap" style={{ overflow: 'hidden', maxWidth: 'calc(100vw - 400px)' }}>
            <div style={{ display: 'flex', overflow: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {navItems}
            </div>
          </Group>
          
          {/* Resume download button */}
          <ClientOnly>
            <Button
              variant="subtle"
              leftSection={<IconFileDownload size={16} />}
              onClick={handleResumeDownload}
              visibleFrom="sm"
              style={{ whiteSpace: 'nowrap', flex: '0 0 auto' }}
            >
              Resume
            </Button>
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
                src="/web-app-manifest-192x192.png" 
                alt="David Mieloch Logo" 
                width={24} 
                height={24} 
                style={{ borderRadius: '4px' }}
              />
              <Text 
                fw={700} 
                size="md" 
                style={{
                  color: '#141517'
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
                    color: isActive(link.href) ? theme.colors.blue[6] : theme.colors.gray[7],
                    backgroundColor: isActive(link.href) ? theme.colors.blue[0] : 'transparent',
                    fontWeight: 500,
                  }}
                >
                  <Text>{link.label}</Text>
                </UnstyledButton>
              </Link>
            ))}
          </Stack>
        </Drawer>
      </Container>
    </AppShell.Header>
  );
}

export default Header; 