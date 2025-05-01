import React from 'react';
import { Container, Title, Text, Stack, Card, Anchor, Group, Image, Paper, Badge, useMantineTheme, Box, Center } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { GoBriefcase } from "react-icons/go";
import { LiaBlogSolid } from "react-icons/lia";
import { GiArtificialIntelligence } from "react-icons/gi";
import { LuEar } from "react-icons/lu";
import { resourceCards } from './ThankYouJob.logic';
import type { ResourceCardData } from './ThankYouJob.types';

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.15, // Adjust stagger for smoother effect
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Update icon map based on available icons
const iconMap: { [key: string]: React.ElementType } = {
    Portfolio: GoBriefcase,
    'Blog Post': LiaBlogSolid,
    'My AI Dev Philosophy': GiArtificialIntelligence,
};

const ThankYouJob = () => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ marginBottom: '50px' }}
        >
            <Container size="sm" py={{ base: 'lg', sm: 'xl' }}>
                <Stack align="center" gap="lg">
                    <motion.div variants={itemVariants} style={{ marginBottom: '-10px' }}>
                        <Title order={1} ta="center" fz={{ base: '1.8rem', sm: '2.2rem' }}>
                            <span>🚀</span> You're Booked — Here's What to Explore Before We Chat
                        </Title>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Text ta="center" size="lg">
                            I'm looking forward to our conversation. In the meantime, here's a quick tour of my work if you'd like to learn more before we chat.
                        </Text>
                    </motion.div>

                    <motion.div variants={itemVariants} style={{ width: '100%', marginTop: 'var(--mantine-spacing-md)' }}>
                        <Paper
                            shadow="sm"
                            p="sm"
                            radius="md"
                            withBorder
                            style={{
                                backgroundColor: theme.colors.gray[0]
                            }}
                        >
                            <Center>
                                <Group gap="xs" wrap="nowrap">
                                    <LuEar size={20} />
                                    {isMobile ? (
                                        <Stack gap={0} align="flex-start">
                                            <Text size="sm" fw={700}>This page is narrated.</Text>
                                            <Text size="sm">I composed the music too. Try it.</Text>
                                        </Stack>
                                    ) : (
                                        <Text size="sm">
                                            <Text span fw={700} inherit>This page is narrated.</Text> I composed the music too. Try it.
                                        </Text>
                                    )}
                                </Group>
                            </Center>
                        </Paper>
                    </motion.div>

                    <motion.div variants={itemVariants} style={{ width: '100%', marginTop: 'var(--mantine-spacing-lg)' }}>
                        <Title order={3} ta="center">
                            Here's a quick tour
                        </Title>
                    </motion.div>

                    <motion.div variants={containerVariants} style={{ width: '100%', marginTop: 'var(--mantine-spacing-md)' }}>
                        <Stack w="100%" gap="sm">
                            {resourceCards.map((card: ResourceCardData) => {
                                const IconComponent = card.icon;
                                const isFeatured = card.title === 'My AI Dev Philosophy';
                                return (
                                    <motion.div
                                        key={card.title}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, boxShadow: "0px 8px 16px rgba(0,0,0,0.1)" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        style={{ borderLeft: isFeatured ? `3px solid ${theme.colors.blue[5]}` : undefined, paddingLeft: isFeatured ? theme.spacing.sm : undefined }}
                                    >
                                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                                            {card.thumbnail && (
                                                <Card.Section mb="sm">
                                                    <motion.div
                                                        style={{
                                                            position: 'relative',
                                                            width: '100%',
                                                            aspectRatio: '3 / 2',
                                                            overflow: 'hidden',
                                                            borderRadius: `${theme.radius.md} ${theme.radius.md} 0 0`,
                                                            maxHeight: isMobile ? undefined : 320,
                                                            background: `linear-gradient(to bottom right, ${theme.colors.dark[8]}, ${theme.colors.dark[6]})`,
                                                        }}
                                                        whileHover={{ filter: 'brightness(1.1)' }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <Image
                                                            src={card.thumbnail}
                                                            alt={`${card.title} thumbnail`}
                                                            fit="cover"
                                                            style={{
                                                                display: 'block',
                                                                width: '100%',
                                                                height: '100%',
                                                                objectPosition: 'top center',
                                                            }}
                                                        />
                                                    </motion.div>
                                                </Card.Section>
                                            )}
                                            <Stack gap={theme.spacing.xs} pt={theme.spacing.xs} pb={theme.spacing.sm}>
                                                <Group justify="space-between" wrap="nowrap">
                                                    <Group gap="sm" align="center" style={{ flex: 1, minWidth: 0 }}>
                                                        <IconComponent size={20} />
                                                        <Text fw={500} fz={{ base: 'md', sm: 'lg' }}>{card.title}</Text>
                                                    </Group>
                                                    {isFeatured && <Badge size="sm" variant="light" style={{ flexShrink: 0 }}>Featured</Badge>}
                                                </Group>

                                                <Text size="sm" color="dimmed" lineClamp={2}>
                                                    {card.description}
                                                </Text>

                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{ alignSelf: 'flex-start', marginTop: theme.spacing.xs }}
                                                >
                                                    <Anchor href={card.link} target="_blank" size="sm">
                                                        {card.linkLabel} &rarr;
                                                    </Anchor>
                                                </motion.div>
                                            </Stack>
                                        </Card>
                                    </motion.div>
                                );
                            })}
                        </Stack>
                    </motion.div>

                </Stack>
            </Container>

        </motion.div>
    );
};

export default ThankYouJob; 