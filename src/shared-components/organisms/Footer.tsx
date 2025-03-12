import { Box, Container, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

export function Footer() {
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const currentYear = new Date().getFullYear();

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