'use client';

import React, { useState, useCallback } from 'react';
import {
  /* MantineProvider, */
  /* Container, */
  Group,
  Burger,
  /* Drawer, */
  Stack,
  UnstyledButton,
  ActionIcon,
  Text,
  /* useMantineColorScheme, */
  /* useComputedColorScheme, */
  /* useMantineTheme, */
  Image,
  Divider,
  Tooltip
} from '@mantine/core';
import {
  /* useDisclosure, */
  /* useHeadroom, */
  /* useHover */
} from '@mantine/hooks';
import { useHeaderState } from './Header.hook';
import { StyledHeader, StyledContainer, StyledLogoButton, StyledNav, StyledMobileDrawer, ExperienceButton } from './Header.styles';
import { RenderNavItems } from './Header.utils';
import { ClientOnly } from '@utils/ClientOnly';
import { navLinks, socialLinks } from './Header.logic';
import { NavLink, SocialLink } from './Header.types';
import { TbBriefcase } from 'react-icons/tb';
import { toRem } from '@shared-components/organisms/Header/Header.utils';

export function Header() {
  const {
    opened,
    toggle,
    close,
    theme,
    isDark,
    handleNavigation: navigate,
    isNavigating,
    setLogoHovered,
    logoHovered,
    pathname,
    hoveredLink,
    handleLinkHover,
    handleLinkLeave,
    isActive
  } = useHeaderState();

  // Local state for button hover, unrelated to global loading
  const [expBtnHovered, setExpBtnHovered] = useState(false);

  // The global loader is handled by FullScreenLoader via LoadingContext
  // No need to render LoadingPortal here anymore

  // Inline isActive for mobile nav
  const isActiveMobile = (href: string) => {
    if (!pathname) return false;
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) {
      if (pathname === href) return true;
      if (pathname.startsWith(`${href}/`)) return true;
      return false;
    }
    return false;
  };

  // Wrapper for RenderNavItems' expected signature
  const handleNavItemsNavigation = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, href: string, label?: string) => {
      event.preventDefault();
      navigate(href);
    },
    [navigate]
  );

  const handleExperienceClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate('/experience');
  }, [navigate]);

  // handleLogoClick - Use general React.MouseEvent type
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  }, [navigate]);

  // const headerStyle = getHeaderStyle(pinned, isDark, theme); // Comment out unused variable

  return (
    <StyledHeader isDark={isDark} theme={theme}>
      <StyledContainer>
        {/* Left side: Logo and Social Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledLogoButton
            logoHovered={logoHovered}
            isDark={isDark}
            theme={theme}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={handleLogoClick}
          >
            <Image
              src="/dave-mieloch-headshot.jpg"
              alt="David Mieloch Logo"
              width={28}
              height={28}
              style={{ borderRadius: '4px' }}
            />
            <Text
              fw={600}
              size="md"
              style={{
                color: isDark ? 'white' : theme.colors.dark[9],
                marginLeft: toRem(8),
                whiteSpace: 'nowrap'
              }}
            >
              David Mieloch
            </Text>
          </StyledLogoButton>
          {/* Hide social icons on mobile using visibleFrom */}
          <Group visibleFrom="sm">
            {/* <RenderSocialIcons theme={theme} isDark={isDark} /> */}
          </Group>
        </div>

        {/* Right side: Navigation, Experience Button, Burger */}
        <StyledNav
          opened={opened}
          toggle={toggle}
          isDark={isDark}
          theme={theme}
          handleNavigation={navigate}
        >
          <Group gap={5} visibleFrom="sm" style={{
            overflow: 'hidden',
            maxWidth: 'calc(100vw - 400px)',
            display: 'flex',
            flexWrap: 'nowrap'
          }}>
            <div style={{ display: 'flex', overflow: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              <RenderNavItems
                navLinks={navLinks}
                theme={theme}
                isDark={isDark}
                handleNavigation={navigate}
                isNavigating={isNavigating}
                isActive={isActive}
                hoveredLink={hoveredLink}
                handleLinkHover={handleLinkHover}
                handleLinkLeave={handleLinkLeave}
                activePath={pathname || '/'}
              />
            </div>
          </Group>

          {/* Experience Button (Desktop) */}
          <ClientOnly>
            <div
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setExpBtnHovered(true)}
              onMouseLeave={() => setExpBtnHovered(false)}
              onClick={handleExperienceClick}
            >
              <ExperienceButton
                variant="filled"
                visibleFrom="sm"
                style={{
                  transform: expBtnHovered ? 'translateY(-3px)' : 'translateY(-1px)',
                  boxShadow: expBtnHovered
                    ? '0 4px 8px rgba(0,0,0,0.15), 0 0 12px 3px rgba(99, 102, 241, 0.6)'
                    : '0 2px 4px rgba(0,0,0,0.1), 0 0 8px 2px rgba(99, 102, 241, 0.4)',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    transition: 'all 200ms ease',
                  }}
                >
                  Experience
                </Text>
              </ExperienceButton>
            </div>
          </ClientOnly>

          {/* Mobile Burger Menu Icon */}
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            color={isDark ? "white" : theme.colors.dark[9]}
            style={{
              zIndex: 1001 // Ensure burger is above overlay
            }}
          />
        </StyledNav>

        {/* Mobile Navigation Drawer */}
        <StyledMobileDrawer
          opened={opened}
          onClose={close}
          isDark={isDark}
          theme={theme}
          handleNavigation={navigate}
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
                  color: isDark ? 'white' : theme.colors.dark[9]
                }}
              >
                David Mieloch
              </Text>
            </Group>
          }
          position="right"
          size="sm"
          overlayProps={{ opacity: 0.5, blur: 4 }}
        >
          {/* Add Navigation Title */}
          <Text
            fw={700}
            size="lg"
            ta="center"
            style={{
              marginBottom: toRem(8),
              color: isDark ? theme.colors.gray[0] : theme.colors.dark[8]
            }}
          >
            Navigation
          </Text>

          {/* Add matching gradient divider below Navigation title */}
          <div
            style={{
              height: toRem(2),
              background: isDark
                ? `linear-gradient(90deg, transparent, ${theme.colors.dark[4]}, transparent)`
                : `linear-gradient(90deg, transparent, ${theme.colors.gray[3]}, transparent)`,
              margin: `0 0 ${toRem(16)} 0`,
            }}
          />

          {/* Navigation section with subtle background */}
          <div style={{
            background: isDark ? theme.colors.dark[8] : theme.colors.gray[1],
            borderRadius: theme.radius.md,
            padding: `${toRem(8)} ${toRem(4)}`,
            marginBottom: toRem(16)
          }}>
            <Stack gap={toRem(6)} style={{ display: 'flex', flexDirection: 'column' }}>
              {navLinks.map((link: NavLink) => (
                <div
                  key={link.label}
                  style={{
                    textDecoration: 'none',
                    borderBottom: `1px solid ${isDark ? theme.colors.dark[7] : theme.colors.gray[2]}`,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.href);
                  }}
                >
                  <UnstyledButton
                    style={{
                      width: '100%',
                      padding: `${toRem(16)} ${toRem(12)} ${toRem(16)} ${toRem(16)}`, // Reduced right padding
                      borderRadius: theme.radius.sm,
                      color: isDark ? 'white' : theme.colors.dark[9],
                      backgroundColor: 'transparent',
                      transition: 'all 200ms ease',
                      borderLeft: `3px solid ${isActiveMobile(link.href) ? theme.colors[theme.primaryColor][6] : 'transparent'}`,
                      position: 'relative',
                      marginBottom: toRem(2),
                      '&:hover': {
                        backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[1],
                        borderLeftColor: theme.colors[theme.primaryColor][6],
                        transform: 'translateX(2px)',
                      },
                      ...(isActiveMobile(link.href) ? {
                        backgroundColor: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
                      } : {})
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', maxWidth: 'calc(100% - 30px)' }}>
                        {link.icon && (
                          <span style={{ marginRight: String(toRem(theme.spacing.sm)), display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {React.createElement(link.icon as any, { size: 22, stroke: 1.5 })}
                          </span>
                        )}
                        {!link.icon && (
                          <span style={{ marginRight: String(toRem(20)), width: String(toRem(20)), display: 'inline-block', flexShrink: 0 }} />
                        )}
                        <Text
                          style={{
                            color: 'inherit',
                            transition: 'all 200ms ease',
                            fontWeight: 600,
                            fontSize: toRem(16),
                            lineHeight: 1.3,
                            wordBreak: 'break-word',
                            whiteSpace: 'normal'
                          }}
                        >
                          {link.label}
                        </Text>
                      </div>
                      {/* Add subtle arrow indicator */}
                      <span style={{
                        opacity: 0.5,
                        transition: 'transform 200ms ease, opacity 200ms ease',
                        transform: isActiveMobile(link.href) ? 'translateX(0)' : 'translateX(-4px)',
                        ...(isActiveMobile(link.href) ? { opacity: 0.8 } : {}),
                        flexShrink: 0,
                        marginLeft: toRem(4)
                      }}>
                        →
                      </span>
                    </div>
                  </UnstyledButton>
                </div>
              ))}
              {/* Manually added Experience link for mobile */}
              <div
                key="Experience"
                style={{
                  textDecoration: 'none',
                  borderBottom: `1px solid ${isDark ? theme.colors.dark[7] : theme.colors.gray[2]}`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/experience');
                }}
              >
                <UnstyledButton
                  style={{
                    width: '100%',
                    padding: `${toRem(16)} ${toRem(12)} ${toRem(16)} ${toRem(16)}`, // Reduced right padding
                    borderRadius: theme.radius.sm,
                    color: isDark ? 'white' : theme.colors.dark[9],
                    backgroundColor: 'transparent',
                    transition: 'all 200ms ease',
                    borderLeft: `3px solid ${isActiveMobile('/experience') ? theme.colors[theme.primaryColor][6] : 'transparent'}`,
                    position: 'relative',
                    marginBottom: toRem(2),
                    '&:hover': {
                      backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[1],
                      borderLeftColor: theme.colors[theme.primaryColor][6],
                      transform: 'translateX(2px)',
                    },
                    ...(isActiveMobile('/experience') ? {
                      backgroundColor: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
                    } : {})
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', maxWidth: 'calc(100% - 30px)' }}>
                      {/* Optionally add IconBriefcase here if desired */}
                      <span style={{
                        marginRight: String(toRem(theme.spacing.sm)),
                        display: 'flex',
                        alignItems: 'center',
                        flexShrink: 0
                      }}>{React.createElement(TbBriefcase as any, { size: 22 })}</span>
                      <Text
                        style={{
                          color: 'inherit',
                          transition: 'all 200ms ease',
                          fontWeight: 600,
                          fontSize: toRem(16),
                          lineHeight: 1.3,
                          wordBreak: 'break-word',
                          whiteSpace: 'normal'
                        }}
                      >
                        Experience
                      </Text>
                    </div>
                    {/* Add subtle arrow indicator */}
                    <span style={{
                      opacity: 0.5,
                      transition: 'transform 200ms ease, opacity 200ms ease',
                      transform: isActiveMobile('/experience') ? 'translateX(0)' : 'translateX(-4px)',
                      ...(isActiveMobile('/experience') ? { opacity: 0.8 } : {}),
                      flexShrink: 0,
                      marginLeft: toRem(4)
                    }}>
                      →
                    </span>
                  </div>
                </UnstyledButton>
              </div>
            </Stack>
          </div>

          {/* Add spacer to push social links to the bottom */}
          <div style={{ flexGrow: 1 }} />

          {/* Replace double divider with a single, thicker gradient divider */}
          <div
            style={{
              height: toRem(2),
              background: isDark
                ? `linear-gradient(90deg, transparent, ${theme.colors.dark[4]}, transparent)`
                : `linear-gradient(90deg, transparent, ${theme.colors.gray[3]}, transparent)`,
              margin: `${toRem(12)} 0`,
            }}
          />

          {/* Social Links Section with Title */}
          <Text
            fw={600}
            size="sm"
            ta="center"
            style={{
              marginBottom: toRem(8),
              color: isDark ? theme.colors.gray[3] : theme.colors.gray[6]
            }}
          >
            Connect
          </Text>

          <Group justify="center" gap={toRem(16)} py={toRem(8)}>
            {socialLinks.map((link: SocialLink) => (
              <Tooltip key={link.name} label={link.name} position="top" withArrow>
                <ActionIcon
                  component="a"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  color={theme.primaryColor}
                  size="xl"
                  radius="xl"
                  style={{
                    transition: 'all 150ms ease',
                    boxShadow: isDark
                      ? '0 2px 4px rgba(0,0,0,0.3)'
                      : '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: isDark
                        ? '0 4px 8px rgba(0,0,0,0.4), 0 0 12px rgba(99, 102, 241, 0.2)'
                        : '0 4px 8px rgba(0,0,0,0.2), 0 0 12px rgba(99, 102, 241, 0.1)',
                    }
                  }}
                >
                  {React.createElement(link.icon as any, { size: 22, stroke: 1.5 })}
                </ActionIcon>
              </Tooltip>
            ))}
          </Group>

          {/* Add a small logo at the bottom for branding */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: toRem(16),
            opacity: 0.5
          }}>
            <Text
              fw={700}
              size="xs"
              style={{
                color: isDark ? theme.colors.gray[5] : theme.colors.gray[6],
                textAlign: 'center',
                fontFamily: 'monospace'
              }}
            >
              © David Mieloch
            </Text>
          </div>
        </StyledMobileDrawer>
      </StyledContainer>
    </StyledHeader>
  );
}

export default Header; 