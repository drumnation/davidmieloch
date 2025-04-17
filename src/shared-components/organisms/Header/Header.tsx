'use client';

import { useHeaderState } from './Header.hook';
import { StyledHeader, StyledContainer, StyledLogoButton, StyledNav, StyledMobileDrawer, ExperienceButton } from './Header.styles';
import { renderNavItems, renderSocialIcons } from './Header.utils';
import { LoadingPortal } from '../../../components';
import React, { useState } from 'react';
import { Button, Text, Group, Image, Stack, UnstyledButton, Burger } from '@mantine/core';
import { rem } from '@mantine/core';
import { ClientOnly } from '../../../utils/ClientOnly';
import { navLinks } from './Header.logic';
import { NavLink } from './Header.types';

export function Header() {
  const {
    opened,
    toggle,
    close,
    isDark,
    theme,
    isLoading,
    loadingPath,
    logoHovered,
    setLogoHovered,
    handleNavigation,
  } = useHeaderState();
  
  const [expBtnHovered, setExpBtnHovered] = useState(false);

  const navItems = renderNavItems({ 
    theme, 
    isDark, 
    handleNavigation 
  });

  const socialIcons = renderSocialIcons({
    theme,
    isDark
  });

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
      <StyledHeader isDark={isDark} theme={theme}>
        <StyledContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledLogoButton
              logoHovered={logoHovered}
              isDark={isDark}
              theme={theme}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                handleNavigation('/');
              }}
            >
              <Image 
                src="/web-app-manifest-192x192.png" 
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
                  marginLeft: rem(8)
                }}
              >
                David Mieloch
              </Text>
            </StyledLogoButton>
            {socialIcons}
          </div>

          <StyledNav
            navItems={navItems}
            opened={opened}
            toggle={toggle}
            isDark={isDark}
            theme={theme}
            handleNavigation={handleNavigation}
          >
            <Group gap={5} visibleFrom="sm" style={{ 
              overflow: 'hidden', 
              maxWidth: 'calc(100vw - 400px)',
              color: isDark ? 'white' : theme.colors.dark[9],
              display: 'flex',
              flexWrap: 'nowrap'
            }}>
              <div style={{ display: 'flex', overflow: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {navItems}
              </div>
            </Group>
            
            <ClientOnly>
              <div 
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/experience');
                }}
              >
                <Button
                  variant="filled"
                  visibleFrom="sm"
                  onMouseEnter={() => setExpBtnHovered(true)}
                  onMouseLeave={() => setExpBtnHovered(false)}
                  style={{ 
                    whiteSpace: 'nowrap', 
                    flex: '0 0 auto',
                    fontWeight: 600,
                    transition: 'all 200ms ease',
                    background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                    color: 'white',
                    transform: expBtnHovered ? 'translateY(-3px)' : 'translateY(-1px)',
                    boxShadow: expBtnHovered ? '0 4px 8px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
                    border: 'none',
                    padding: `${rem(8)} ${rem(12)}`,
                    height: 'auto',
                    position: 'relative',
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
                </Button>
              </div>
            </ClientOnly>
            
            <Burger 
              opened={opened} 
              onClick={toggle} 
              hiddenFrom="sm" 
              color={isDark ? "white" : theme.colors.dark[9]}
            />
          </StyledNav>
          
          <StyledMobileDrawer
            opened={opened}
            onClose={close}
            isDark={isDark}
            theme={theme}
            handleNavigation={handleNavigation}
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
            size="xs"
            overlayProps={{ opacity: 0.5, blur: 4 }}
          >
            <Stack gap="xs">
              {navLinks.map((link: NavLink) => (
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
                      color: isDark ? 'white' : theme.colors.dark[9],
                      backgroundColor: 'transparent',
                      fontWeight: 500,
                      transition: 'all 200ms ease',
                      borderLeft: '3px solid transparent',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
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
          </StyledMobileDrawer>
        </StyledContainer>
      </StyledHeader>
    </>
  );
}

export default Header; 