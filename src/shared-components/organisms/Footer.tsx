import { Box, Container, Group, Stack, Text, useMantineTheme, Anchor, Flex } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconMail } from '@tabler/icons-react';

export function Footer() {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <IconBrandGithub size={20} />, url: 'https://github.com/dmieloch' },
    { name: 'LinkedIn', icon: <IconBrandLinkedin size={20} />, url: 'https://linkedin.com/in/dmieloch' },
    { name: 'Twitter', icon: <IconBrandTwitter size={20} />, url: 'https://twitter.com/dmieloch' },
  ];

  return (
    <Box
      component="footer"
      p="xl"
      style={{
        backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
        borderTop: `2px solid ${
          isDark ? 'rgba(0, 188, 212, 0.2)' : 'rgba(0, 188, 212, 0.1)'
        }`,
        position: 'relative',
        minHeight: '160px',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: theme.other.accentGradient,
        }}
      />
      <Container size="lg" h="100%">
        <Stack gap="xl" align="center" justify="center" h="100%">
          {/* Social Media Links */}
          <Group gap="lg">
            {socialLinks.map((link) => (
              <Anchor 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: isDark ? theme.colors.blue[4] : theme.colors.blue[6],
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, color 0.2s ease',
                  ':hover': {
                    transform: 'translateY(-2px)',
                    color: theme.colors.blue[5],
                  }
                }}
              >
                <Flex align="center" gap="xs">
                  {link.icon}
                  <Text size="sm">{link.name}</Text>
                </Flex>
              </Anchor>
            ))}
          </Group>
          
          {/* Contact Information */}
          <Group gap="xl">
            <Anchor href="mailto:contact@davidmieloch.com" style={{ color: isDark ? theme.colors.blue[4] : theme.colors.blue[6] }}>
              <Flex align="center" gap="xs">
                <IconMail size={16} />
                <Text size="sm">contact@davidmieloch.com</Text>
              </Flex>
            </Anchor>
          </Group>
          
          {/* Copyright */}
          <Group gap="xl">
            <Text size="sm" c="dimmed">© {currentYear} David Mieloch</Text>
            <Text size="sm" c="dimmed">All rights reserved</Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;