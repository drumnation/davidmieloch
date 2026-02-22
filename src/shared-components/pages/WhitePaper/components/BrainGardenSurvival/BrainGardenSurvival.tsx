"use client";

import React from 'react';
import { Container, Text, Stack, Box, Card, List, Blockquote, useMantineTheme, Group, MantineTheme, ThemeIcon, Flex, Paper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { TbBrain, TbPlant2 } from 'react-icons/tb';
import { IconTargetArrow, IconBolt } from '@tabler/icons-react';
import { LuRocket } from "react-icons/lu";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { LuRefreshCw } from "react-icons/lu";
import { BRAIN_GARDEN_SURVIVAL } from './BrainGardenSurvival.constants';
import { SectionTitle } from '@shared-components/atoms/SectionTitle';
import { ParagraphText } from '@shared-components/atoms/ParagraphText';
import { CallToAction } from '@shared-components/molecules/CallToAction';
import { Hero } from '@shared-components/organisms/Hero';
import {
    VerticalStackContainer,
    TransitionDivider,
    CenteredTitle,
    CenteredContentWrapper,
    IconWrapper,
    HighlightCallout,
    StyledBoxWithFirstChildMargin
} from './BrainGardenSurvival.styles';
import { BrainGardenSurvivalProps } from './BrainGardenSurvival.types';
import { useBrainGardenSurvival } from './BrainGardenSurvival.hook';
import { motion } from 'framer-motion';

// --- Animation Variants ---
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};
// --- End Animation Variants ---

export const BrainGardenSurvival: React.FC<BrainGardenSurvivalProps> = (props) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const { isLoading } = useBrainGardenSurvival(props);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <div id="the-breakthrough" style={{ scrollMarginTop: '100px' }}>
            <Container size="xl">
                {/* Wrap the main content blocks in the VerticalStackContainer */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    <VerticalStackContainer>

                        {/* Card 1: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" px="lg" py="xl" radius="md" withBorder mt="xl">
                                <Stack align="center" justify="center" gap="xs">
                                    <ThemeIcon radius="xl" variant="light" color="blue" size="lg">
                                        <LuRefreshCw size={20} />
                                    </ThemeIcon>
                                    <CenteredTitle>
                                        <SectionTitle>
                                            {isMobile ?
                                                <>Why<br />Continuous<br />Evolution<br />Matters</> :
                                                <>Why Continuous<br />Evolution Matters</>
                                            }
                                        </SectionTitle>
                                    </CenteredTitle>
                                    <Box
                                        style={{
                                            textAlign: 'center',
                                            // Apply max-width only on mobile
                                            maxWidth: isMobile ? '300px' : 'none',
                                            marginLeft: isMobile ? 'auto' : 0,
                                            marginRight: isMobile ? 'auto' : 0,
                                        }}
                                    >
                                        <Text
                                            fw={700}
                                            size="xl"
                                            style={{
                                                fontSize: '1.25rem',
                                                marginTop: '0.2rem',
                                                marginBottom: '0.2rem',
                                            }}
                                        >
                                            The AI revolution isn't slowing down —
                                        </Text>
                                        {/* Wrap the accelerating text in motion.div for shake animation */}
                                        <motion.div
                                            initial={{ x: 0 }} // Start at normal position
                                            whileInView={{
                                                x: [0, -4, 4, -4, 4, -2, 2, 0], // Keyframes for horizontal shake
                                                transition: { duration: 0.4, ease: "easeInOut" } // Animation timing
                                            }}
                                            viewport={{ once: true, amount: 0.8 }} // Trigger once when 80% visible
                                        >
                                            <Text
                                                fw={700}
                                                size="xl"
                                                style={{
                                                    fontSize: '2.25rem',
                                                    marginBottom: '1.5rem',
                                                }}
                                            >
                                                it's accelerating.
                                            </Text>
                                        </motion.div>
                                    </Box>
                                </Stack>
                            </Card>
                        </motion.div>

                        {/* Card 2: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" px="lg" py="md" radius="md" withBorder>
                                <CenteredContentWrapper>
                                    {/* Responsive Box container for layout */}
                                    <StyledBoxWithFirstChildMargin>
                                        <IconWrapper>
                                            <TbBrain size={24} />
                                        </IconWrapper>
                                        <Stack gap={4}>
                                            <Text fw={700} size="sm">Humans Amplified by AI</Text>
                                            <Text size="sm">
                                                Every week brings new breakthroughs: bigger models, smarter agents, sharper workflows.<br />
                                                And it's not just the technology that's evolving — <strong>humans amplified by AI</strong> are creating better tools and systems at an overwhelming pace.
                                            </Text>
                                        </Stack>
                                    </StyledBoxWithFirstChildMargin>
                                </CenteredContentWrapper>
                            </Card>
                        </motion.div>

                        {/* Card 3: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Group
                                    gap="md"
                                    style={(theme: MantineTheme) => ({
                                        // Mobile First: Column, centered
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        // Desktop Override: Row, center vertically
                                        [`@media (min-width: ${theme.breakpoints.md})`]: {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            textAlign: 'left',
                                            flexWrap: 'nowrap', // Prevent wrapping on desktop
                                        },
                                    })}
                                >
                                    <ThemeIcon size="lg" radius="xl" variant="light" color="blue">
                                        <IconTargetArrow size={24} />
                                    </ThemeIcon>
                                    <Text
                                        size="md"
                                        lh="lg" // Increased line height
                                        style={{ flex: 1 }} // Allow text to take remaining space on desktop
                                    >
                                        In this environment, the winners won't be the ones who simply use AI.<br />
                                        They'll be the ones who can <strong>rapidly absorb</strong>, <strong>adapt</strong>, and <strong>apply</strong> the best new capabilities as they emerge — before the landscape shifts again.
                                    </Text>
                                </Group>
                            </Card>
                        </motion.div>

                        {/* Card 4: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" px="lg" py="md" radius="md" withBorder mt="md">
                                <Blockquote
                                    color="dark"
                                    radius="xs"
                                    icon={null}
                                    style={{
                                        backgroundColor: 'var(--mantine-color-gray-0)',
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                        maxWidth: '100%'
                                    }}
                                >
                                    <Text size="lg">
                                        I experienced this firsthand.
                                    </Text>
                                </Blockquote>
                            </Card>
                        </motion.div>

                        {/* Card 5: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Stack
                                    gap="md"
                                    style={{
                                        maxWidth: '700px', // Apply max-width for readability
                                        margin: '0 auto' // Center the stack within the card
                                    }}
                                >
                                    <Text size="md">
                                        I experiment constantly — way more than most.<br />
                                        But without a way to rapidly spread what I learned, the upgrades stayed trapped inside individual projects.<br />
                                        One project would feel sharp and fast; another would lag behind, stuck in old patterns.
                                    </Text>

                                    <Text size="sm" c="dark.4">
                                        When I started mentoring others, it became even more obvious:
                                    </Text>

                                    <HighlightCallout>
                                        <Flex
                                            gap="sm"
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={{ base: 'center', sm: 'center' }}
                                        >
                                            <ThemeIcon
                                                radius="xl"
                                                variant="light"
                                                color="blue"
                                                size="lg"
                                            >
                                                <IconBolt size={20} />
                                            </ThemeIcon>
                                            <Text
                                                fw={700}
                                                fz={{ base: 'sm', md: 'md' }}
                                                ta={{ base: 'center', sm: 'left' }}
                                            >
                                                If I could capture new breakthroughs and make them immediately accessible, the whole team leveled up faster.
                                            </Text>
                                        </Flex>
                                    </HighlightCallout>
                                </Stack>
                            </Card>
                        </motion.div>

                        {/* Card 6: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Stack
                                    gap="md"
                                    style={{
                                        maxWidth: '700px', // Apply consistent max-width
                                        margin: '0 auto' // Center stack
                                    }}
                                >
                                    <Text fw={500} size="md" ta={{ base: 'center', sm: 'left' }}>
                                        That's why I created{isMobile ? <br /> : ' '}Brain Garden:
                                    </Text>

                                    {/* Green Callout - Refactored Layout */}
                                    <Paper
                                        withBorder
                                        p="lg" // Keep lg padding
                                        radius="sm"
                                        style={{
                                            backgroundColor: theme.colors.green[0], // Light green bg
                                            borderColor: theme.colors.green[3],
                                        }}
                                    >
                                        <Stack align="center" gap="sm"> {/* Vertical stack, centered */}
                                            <ThemeIcon
                                                color="green"
                                                variant="light"
                                                radius="xl"
                                                size={isMobile ? 'lg' : 'xl'} // Smaller on mobile (lg), default xl
                                                mb="sm" // Add bottom margin for spacing
                                            >
                                                <TbPlant2 size={isMobile ? 20 : 28} />
                                            </ThemeIcon>

                                            {/* Centered Text Stack */}
                                            <Stack gap={4} style={{ textAlign: 'center' }}>
                                                <Text fw={600} size="md">
                                                    Brain Garden<wbr /> Is a Place {/* Added word break opportunity */}
                                                </Text>
                                                <Text size="sm" style={{ fontStyle: 'italic', lineHeight: 1.5 }}>
                                                    Not a polished product. Not a magic tool. A living, evolving library.
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                </Stack>
                            </Card>
                        </motion.div>

                        {/* Card 7: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" padding="xl" radius="md" withBorder>
                                <Stack
                                    gap="md"
                                    align="center"
                                    style={{
                                        maxWidth: '800px',
                                        margin: '0 auto'
                                    }}
                                >
                                    <ThemeIcon color="green" variant="light" radius="xl" size="xl">
                                        <TbPlant2 size={28} />
                                    </ThemeIcon>

                                    <Text fw={700} fz="lg" ta="center" lh={1.6}>
                                        Brain Garden is a place to grow breakthroughs.
                                    </Text>

                                    <Box w="100%" maw={600}>
                                        <List
                                            type="ordered"
                                            spacing="xs"
                                            center
                                            styles={(theme: MantineTheme) => ({
                                                itemWrapper: { width: '100%' },
                                                itemLabel: { textAlign: 'left' },
                                                item: {
                                                    marginBottom: isMobile ? theme.spacing.sm : theme.spacing.xs,
                                                }
                                            })}
                                        >
                                            <List.Item>
                                                <strong>A place</strong> to gather <i>discoveries</i>.
                                            </List.Item>
                                            <List.Item>
                                                <strong>A place</strong> where scattered <i>insights</i> take root and flourish.
                                            </List.Item>
                                            <List.Item>
                                                <strong>A place</strong> where raw <i>ideas</i> are cultivated into powerful, usable systems.
                                            </List.Item>
                                        </List>
                                    </Box>

                                    <Text
                                        fz={{ base: 'sm', md: 'md' }}
                                        lh={1.6}
                                        ta="center"
                                        maw={{ base: '90%', sm: 650 }}
                                        mt="sm"
                                    >
                                        At its core, Brain Garden is a living system:<br />
                                        a growing library of rules, prompts, and workflows — simple tools that help me transplant new upgrades into every project I touch.
                                    </Text>
                                </Stack>
                            </Card>
                        </motion.div>

                        {/* Card 8: Animated */}
                        <motion.div variants={fadeInUp}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Stack
                                    gap="lg" // Slightly larger gap
                                    align="center" // Center stack items
                                    style={{
                                        maxWidth: '800px', // Consistent max-width
                                        margin: '0 auto' // Center stack
                                    }}
                                >
                                    {/* Icon */}
                                    <ThemeIcon radius="xl" variant="light" color="blue" size="xl">
                                        <LuRocket size={24} />
                                    </ThemeIcon>

                                    {/* First Paragraph */}
                                    <Text
                                        fz="md"
                                        lh="lg"
                                        ta="center"
                                    >
                                        It's not static — and it's not supposed to be.<br />
                                        It's the living scaffold that lets me <strong>move faster</strong>, <strong>work smarter</strong>, and <strong>amplify every project and team</strong> with the best ideas I find today — and the ones I'll discover tomorrow.
                                    </Text>

                                    {/* Replaced Box with Paper for the final callout */}
                                    <Paper
                                        withBorder
                                        p="lg"
                                        radius="sm"
                                        style={(theme: MantineTheme) => ({
                                            backgroundColor: theme.colors.blue[0],
                                            borderColor: theme.colors.blue[3],
                                            width: '100%', // Take full width of stack initially
                                            marginTop: theme.spacing.sm, // Default margin
                                            // Responsive max-width and margin for mobile
                                            [`@media (max-width: ${theme.breakpoints.sm})`]: {
                                                maxWidth: '90%',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                marginTop: theme.spacing.lg, // More margin on mobile
                                            }
                                        })}
                                    >
                                        <Stack gap="xs" align="center"> {/* Center text block */}
                                            <Text ta="center" fz="md">
                                                When you hire me,
                                            </Text>
                                            <Text ta="center" fw={700} fz="lg"> {/* Larger, bold */}
                                                You're not getting a static framework.
                                            </Text>
                                            <Text ta="center" fz="md">
                                                You're getting a <Text span fw={700} fz="md" fs="italic">living system of advantages,</Text> {/* Bold + Italic */}
                                            </Text>
                                            <Text ta="center" fz="sm" c="dark.4" fs="italic"> {/* Smaller, dimmed, italic */}
                                                continuously updated, battle-tested, and ready to deploy.
                                            </Text>
                                        </Stack>
                                    </Paper>
                                </Stack>
                            </Card>
                        </motion.div>

                        {/* Divider remains inside the stack, after Card 8 */}
                        <TransitionDivider />

                    </VerticalStackContainer> {/* End of the card stack */}
                </motion.div> {/* End staggered animation wrapper */}

                {/* "Hiring Me" section is OUTSIDE the stack again */}
                <Box mb={60} id="when-you-hire-me">
                    <Hero
                        desktopTitle="<span style='text-shadow: 2px 2px 0 rgba(0,0,0,0.5);'>HIRING ME<br>MEANS INHERITING</span><br><span style='display: inline-block; padding-top: 20px; padding: 8px 15px; background-color: rgba(0,0,0,0.2); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); border: 2px solid white; border-radius: 8px; color: var(--mantine-color-blue-7); font-weight: bold; font-size: 120%;'>THE FUTURE</span>"
                        mobileTitle="<span style='text-shadow: 2px 2px 0 rgba(0,0,0,0.5);'>HIRING ME<br>MEANS<br>INHERITING</span><br><span style='display: inline-block; margin-top: 10px; padding: 6px 12px; background-color: rgba(0,0,0,0.2); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); border: 2px solid white; border-radius: 6px; color: var(--mantine-color-blue-7); font-weight: bold; font-size: 120%;'>THE FUTURE</span>"
                        textColor="light"
                        titleColor="white"
                        minHeight="70vh"
                        contentAlignment="center"
                        hideBlurSquareDesktop={true}
                        backgroundImage="/hiring-me-means-inheriting-the-future.png"
                        background="image"
                        backgroundOverlay={true}
                        overlayOpacity={0.4}
                    />

                    {/* Animated Paragraph Section - Wrap Paper in motion.div */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeInUp}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Paper
                            p="xl"
                            radius="md"
                            withBorder
                            style={{
                                backgroundColor: theme.colors.gray[0],
                                marginTop: theme.spacing.xl
                            }}
                        >
                            <Stack
                                gap="lg" // Consistent gap 
                                align="center" // Center content within Paper
                                style={{
                                    maxWidth: '800px', // Constrain width
                                    margin: '0 auto'
                                }}
                            >
                                {/* Section Label */}
                                <Text tt="uppercase" size="xs" c="dark.4" fw={500}>
                                    The Living System
                                </Text>

                                {/* Paragraph 1 */}
                                <Text
                                    size="lg" // Adjusted size 
                                    lh={{ base: 1.5, sm: 1.6 }} // Responsive line height
                                    ta={{ base: 'center', sm: 'left' }} // Responsive text align
                                >
                                    Brain Garden isn't a product you buy. It's the <Text span fw={600}>living system I've built</Text> — and continue evolving — to survive and thrive in the AI revolution.
                                </Text>

                                {/* Paragraph 2 */}
                                <Text
                                    size="lg" // Adjusted size
                                    lh={{ base: 1.5, sm: 1.6 }} // Responsive line height
                                    ta={{ base: 'center', sm: 'left' }} // Responsive text align
                                >
                                    When you hire me, you're not betting on a static tool. You're investing in a <Text span fw={600}>living strategic force</Text> — ready to <Text span fw={600}>upgrade your developers, workflows, and capabilities</Text> faster than change itself.
                                </Text>
                            </Stack>
                        </Paper>
                    </motion.div>

                    {/* Animated CTA Section - Wrap Box in motion.div */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeInUp}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Box mt={60}>
                            <CallToAction
                                title="Ready to Equip Your Team for the Future?"
                                buttonText="Let's Talk"
                                buttonLink="https://www.linkedin.com/in/davidmieloch/"
                                icon={<HiOutlineLightningBolt size={24} />}
                            />
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </div>
    );
};

export default BrainGardenSurvival; 