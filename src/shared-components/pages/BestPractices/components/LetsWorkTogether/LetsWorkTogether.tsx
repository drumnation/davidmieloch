"use client";

import React from 'react';
import Image from 'next/image';
import { IconBrandLinkedin, IconCheck } from '@tabler/icons-react';
import {
  Container,
  Box,
  Title,
  Text,
  Group,
  Paper,
  List,
  Button,
  Badge,
  Stack,
  ThemeIcon,
  Divider,
  useMantineTheme,
} from '@mantine/core';

export interface LetsWorkTogetherProps {
  className?: string;
}

export const LetsWorkTogether: React.FC<LetsWorkTogetherProps> = ({ className }) => {
  const theme = useMantineTheme();
  const brandPurple = '#805AD5';
  const brandPurpleLight = '#6b46c1';
  const brandBlue = '#2b6cb0';
  const aiIconColor = '#6b46c1';
  const reactIconColor = '#2b6cb0';

  // Define specialty card colors
  const aiCardBg = '#f0e7ff';
  const aiCardBorder = '#dac9ff';
  const reactCardBg = '#eaf6ff';
  const reactCardBorder = '#bce0fd';

  return (
    <Container size="lg" className={className} pb={120} px={{ base: 'md', sm: 'lg', md: 'xl' }}>
      <Stack gap="xl" align="center">
        <Box component="section" mt={80} pt={60} style={{ position: 'relative', borderTop: `1px solid ${theme.colors.gray[3]}`, width: '100%' }}>
          <Divider
            labelPosition="center"
            label={
              <ThemeIcon radius="xl" size={60} variant="default" style={{ border: `1px solid ${theme.colors.gray[3]}`, boxShadow: theme.shadows.sm }}>
                <Image
                  src="/icons/collaboration.svg"
                  alt="Collaboration Icon"
                  width={32}
                  height={32}
                  priority={true}
                />
              </ThemeIcon>
            }
            mt={-30 - 1}
            mb="xl"
          />

          <Stack align="center" gap="md" mb="xl">
            <Title order={2} ta="center" style={{ color: brandPurple }} fz={{ base: '2rem', sm: '2.5rem' }}>
              Let's Work Together
            </Title>

            <Text size="lg" ta="center" maw={800} mx="auto">
              I help organizations establish modern development practices and transform their teams as a{' '}
              <Text span fw={600} style={{ color: brandPurpleLight, whiteSpace: 'nowrap' }}>Lead</Text>,{' '}
              <Text span fw={600} style={{ color: brandPurpleLight, whiteSpace: 'nowrap' }}>Principal</Text>, or{' '}
              <Text span fw={600} style={{ color: brandPurpleLight, whiteSpace: 'nowrap' }}>Staff</Text>{' '}
              level engineer with deep expertise in{' '}
              <Text span fw={600} style={{ color: brandBlue, whiteSpace: 'nowrap' }}>React/React Native</Text> and{' '}
              <Text span fw={600} style={{ color: brandBlue, whiteSpace: 'nowrap' }}>Enterprise AI</Text> solutions.
            </Text>
          </Stack>

          <Stack align="center" gap="sm" mb="xl">
            <Group justify="center" gap="sm" wrap="wrap">
              <Badge color="violet" variant="light" size="lg" radius="xl">Scalable Architecture</Badge>
              <Badge color="blue" variant="light" size="lg" radius="xl">React Ecosystem</Badge>
              <Badge color="violet" variant="light" size="lg" radius="xl">Advanced Workflows</Badge>
              <Badge color="violet" variant="light" size="lg" radius="xl">Technical Leadership</Badge>
              <Badge color="teal" variant="light" size="lg" radius="xl">AI Integration</Badge>
              <Badge color="violet" variant="light" size="lg" radius="xl">Team Transformation</Badge>
            </Group>
          </Stack>

          <Paper shadow="md" radius="md" p="xl" mt="xl" mb="xl" withBorder style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <Stack align="center" gap="lg">
              <Title order={3} ta="center">
                How I Can Collaborate With You
              </Title>

              <Stack gap="lg" w="100%">
                <Box>
                  <Stack gap="md" align="center">
                    <ThemeIcon color="teal" size={32} radius="xl">
                      <IconCheck size="1.2rem" />
                    </ThemeIcon>
                    <Text fw={600} ta="center" size="lg">Consulting Services</Text>
                  </Stack>
                  <Text ta="center" mt="xs">
                    Bring my expertise to your organization for targeted projects focused on{' '}
                    <Text span style={{ color: brandBlue }}>React</Text>/<Text span style={{ color: brandBlue }}>React Native</Text> best practices, development workflows, or AI integration initiatives.
                  </Text>
                </Box>

                <Box>
                  <Stack gap="md" align="center">
                    <ThemeIcon color="teal" size={32} radius="xl">
                      <IconCheck size="1.2rem" />
                    </ThemeIcon>
                    <Text fw={600} ta="center" size="lg">Team Augmentation</Text>
                  </Stack>
                  <Text ta="center" mt="xs">
                    Join your development team as a senior technical resource to provide leadership and expertise during critical projects or transitions.
                  </Text>
                </Box>

                <Box>
                  <Stack gap="md" align="center">
                    <ThemeIcon color="teal" size={32} radius="xl">
                      <IconCheck size="1.2rem" />
                    </ThemeIcon>
                    <Text fw={600} ta="center" size="lg">Full-Time Opportunities</Text>
                  </Stack>
                  <Text ta="center" mt="xs">
                    Consider me for Lead, Principal, or Staff Engineer roles where I can provide technical leadership and drive transformation initiatives.
                  </Text>
                </Box>

                <Box>
                  <Stack gap="md" align="center">
                    <ThemeIcon color="teal" size={32} radius="xl">
                      <IconCheck size="1.2rem" />
                    </ThemeIcon>
                    <Text fw={600} ta="center" size="lg">Technical Leadership</Text>
                  </Stack>
                  <Text ta="center" mt="xs">
                    Guide your engineering teams through implementing scalable architecture, effective development workflows, and modern technical practices.
                  </Text>
                </Box>
              </Stack>

              <Paper radius="md" p="lg" w="100%" style={{ position: 'relative', backgroundColor: aiCardBg, border: `1px solid ${aiCardBorder}` }}>
                <Stack align="center" gap="sm">
                  <ThemeIcon radius="xl" size={40} variant="filled" color="white" mx="auto" mt={-40}
                    style={{ boxShadow: theme.shadows.sm, padding: theme.spacing.xs }}>
                    <Image src="/icons/ai-chip.svg" alt="AI Icon" width={24} height={24} />
                  </ThemeIcon>
                  <Title order={4} ta="center" style={{ color: aiIconColor }}>
                    Enterprise AI Development Team Transformation
                  </Title>
                  <Text size="sm" c="dimmed" ta="center">
                    I specialize in guiding engineering teams through successful AI integration and transformation. From establishing
                    AI development workflows and architecture to implementing best practices for sustainable AI-driven solutions,
                    I can help your organization navigate this complex technical landscape regardless of the engagement model.
                  </Text>
                </Stack>
              </Paper>

              <Paper radius="md" p="lg" w="100%" style={{ position: 'relative', backgroundColor: reactCardBg, border: `1px solid ${reactCardBorder}` }}>
                <Stack align="center" gap="sm">
                  <ThemeIcon radius="xl" size={40} variant="filled" color="white" mx="auto" mt={-40}
                    style={{ boxShadow: theme.shadows.sm, padding: theme.spacing.xs }}>
                    <Image src="/icons/react-icon.svg" alt="React Icon" width={24} height={24} />
                  </ThemeIcon>
                  <Title order={4} ta="center" style={{ color: reactIconColor }}>
                    React & React Native Expertise
                  </Title>
                  <Text size="sm" c="dimmed" ta="center">
                    With extensive experience in <Text span style={{ color: brandBlue }}>React</Text> and <Text span style={{ color: brandBlue }}>React Native</Text> ecosystems, I bring deep knowledge of component architecture,
                    state management, performance optimization, and cross-platform development. I can help establish enterprise-grade
                    patterns for complex applications, monorepos, and design systems that scale.
                  </Text>
                </Stack>
              </Paper>

              <Button
                component="a"
                href="https://www.linkedin.com/in/davidmieloch/"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                color="violet"
                leftSection={<IconBrandLinkedin size={20} />}
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Get In Touch
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};

export default LetsWorkTogether; 