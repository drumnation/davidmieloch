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
  Button,
  MantineTheme,
  Loader,
  Overlay
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTheme } from '../../../src/providers/ThemeProvider';
import { IconFileText, IconBrandGithub, IconBrandLinkedin, IconBrandMedium } from '@tabler/icons-react';
import { ClientOnly } from '../../../src/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoadingPortal } from '../../../src/components';

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
  const router = useRouter();
  
  // State for hover effects
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [socialHovered, setSocialHovered] = useState<string | null>(null);
  const [experienceHovered, setExperienceHovered] = useState(false);
  const [mobileHovered, setMobileHovered] = useState<string | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  // To force a re-render in case state updates aren't reflecting in the UI
  const [forceUpdate, setForceUpdate] = useState(0);
  
  useEffect(() => {
    // Trigger a re-render once after mounting
    setForceUpdate(prev => prev + 1);
  }, []);

  // Reset loading state when pathname changes (navigation completed)
  useEffect(() => {
    if (isLoading && loadingPath === pathname) {
      setIsLoading(false);
      setLoadingPath(null);
    }
  }, [pathname, isLoading, loadingPath]);

  // Handle navigation with loading state
  const handleNavigation = (href: string) => {
    // Skip if we're navigating to the current page
    if (href === pathname) return;
    
    // Set loading state
    setIsLoading(true);
    setLoadingPath(href);
    
    // Close drawer if open
    close();
    
    // Navigate
    router.push(href);
  };

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

  const handleLinkHover = (label: string) => {
    console.log('Hovering over:', label);
    setHoveredLink(label);
  };

  const handleLinkLeave = () => {
    console.log('Leaving link');
    setHoveredLink(null);
  };

  const navItems = navLinks.map((link) => (
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
          color: isActive(link.href) ? theme.colors.blue[6] : 
                 hoveredLink === link.label ? theme.colors.blue[4] : theme.colors.gray[7],
          fontWeight: isActive(link.href) || hoveredLink === link.label ? 600 : 500,
          padding: `${rem(8)} ${rem(12)}`,
          borderRadius: theme.radius.sm,
          whiteSpace: 'nowrap',
          transition: 'all 200ms ease',
          backgroundColor: hoveredLink === link.label ? theme.colors.blue[0] : 'transparent',
          transform: hoveredLink === link.label ? 'translateY(-1px)' : 'translateY(0)',
          boxShadow: hoveredLink === link.label ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
          borderBottom: hoveredLink === link.label ? `2px solid ${theme.colors.blue[4]}` : '2px solid transparent',
          cursor: 'pointer',
        }}
        onMouseEnter={() => handleLinkHover(link.label)}
        onMouseLeave={handleLinkLeave}
      >
        <Text 
          size="sm" 
          style={{
            color: 'inherit',
            transition: 'all 200ms ease',
          }}
        >
          {link.label}
        </Text>
        {isActive(link.href) && (
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              left: rem(8),
              right: rem(8),
              height: rem(2),
              background: typeof theme.colors?.gradient === 'string' 
                ? theme.colors.gradient 
                : 'linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)',
              borderRadius: theme.radius.sm,
            }}
          />
        )}
      </UnstyledButton>
    </div>
  ));

  return (
    <>
      {isLoading && (
        <LoadingPortal 
          show={isLoading} 
          type="circle"
          color="#2196f3"
          size={50}
          text={`Loading ${loadingPath?.split('/').pop()?.replace(/-/g, ' ') || ''}...`}
        />
      )}
      <AppShell.Header 
        p="md" 
        style={{ 
          backdropFilter: 'none',
          backgroundColor: 'transparent',
          borderBottom: 'none',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          height: '60px',
          overflow: 'visible',
        }}
      >
        <Container size="lg" h="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Group wrap="nowrap" style={{ flex: '0 0 auto' }}>
            <div 
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/');
              }}
            >
              <UnstyledButton 
                style={{ 
                  textDecoration: 'none',
                  transform: logoHovered ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 200ms ease',
                }}
                onMouseEnter={() => setLogoHovered(true)}
                onMouseLeave={() => setLogoHovered(false)}
              >
                <Group gap="xs" align="center" wrap="nowrap">
                  <Image 
                    src="/dave-mieloch-headshot.jpg" 
                    alt="David Mieloch Logo" 
                    width={32} 
                    height={32} 
                    style={{ borderRadius: '50%', border: '1px solid #141517' }}
                  />
                  <Text 
                    fw={700} 
                    size="lg" 
                    style={{
                      marginTop: '5px',
                      color: '#141517'
                    }}
                  >
                    David Mieloch
                  </Text>
                </Group>
              </UnstyledButton>
            </div>
            
            {/* Social Links */}
            <Group gap="xs" ml="md" wrap="nowrap">
              {socialLinks.map((link) => (
                <Tooltip key={link.name} label={link.name} zIndex={2000}>
                  <ActionIcon
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="subtle"
                    color="blue"
                    size="md"
                    style={{
                      transform: socialHovered === link.name ? 'scale(1.1)' : 'scale(1)',
                      backgroundColor: socialHovered === link.name ? theme.colors.blue[0] : 'transparent',
                      transition: 'transform 200ms ease, background-color 200ms ease',
                    }}
                    onMouseEnter={() => setSocialHovered(link.name)}
                    onMouseLeave={() => setSocialHovered(null)}
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
            
            {/* Experience link (replacing Resume download button) */}
            <ClientOnly>
              <div 
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/experience');
                }}
              >
                <Button
                  variant="subtle"
                  visibleFrom="sm"
                  style={{ 
                    whiteSpace: 'nowrap', 
                    flex: '0 0 auto',
                    color: isActive('/experience') ? theme.colors.blue[6] : 
                          experienceHovered ? theme.colors.blue[4] : theme.colors.gray[7],
                    fontWeight: isActive('/experience') || experienceHovered ? 600 : 500,
                    transition: 'all 200ms ease',
                    backgroundColor: experienceHovered ? theme.colors.blue[0] : 'transparent',
                    transform: experienceHovered ? 'translateY(-1px)' : 'translateY(0)',
                    boxShadow: experienceHovered ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    borderBottom: experienceHovered ? `2px solid ${theme.colors.blue[4]}` : '2px solid transparent',
                    padding: `${rem(8)} ${rem(12)}`,
                    height: 'auto',
                    position: 'relative',
                  }}
                  onMouseEnter={() => setExperienceHovered(true)}
                  onMouseLeave={() => setExperienceHovered(false)}
                >
                  <Text 
                    style={{
                      color: 'inherit',
                      transition: 'all 200ms ease',
                    }}
                  >
                    Experience
                  </Text>
                </Button>
              </div>
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
                <div
                  key={link.label}
                  style={{ textDecoration: 'none' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                >
                  <UnstyledButton
                    style={{
                      width: '100%',
                      padding: rem(12),
                      borderRadius: theme.radius.sm,
                      color: isActive(link.href) ? theme.colors.blue[6] : 
                            mobileHovered === link.label ? theme.colors.blue[4] : theme.colors.gray[7],
                      backgroundColor: isActive(link.href) ? theme.colors.blue[0] : 
                                      mobileHovered === link.label ? theme.colors.blue[0] : 'transparent',
                      fontWeight: isActive(link.href) || mobileHovered === link.label ? 600 : 500,
                      transition: 'all 200ms ease',
                      borderLeft: mobileHovered === link.label ? `3px solid ${theme.colors.blue[4]}` : '3px solid transparent',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setMobileHovered(link.label)}
                    onMouseLeave={() => setMobileHovered(null)}
                  >
                    <Text 
                      style={{
                        color: 'inherit',
                        transition: 'all 200ms ease',
                      }}
                    >
                      {link.label}
                    </Text>
                  </UnstyledButton>
                </div>
              ))}
            </Stack>
          </Drawer>
        </Container>
      </AppShell.Header>
    </>
  );
}

export default Header; 