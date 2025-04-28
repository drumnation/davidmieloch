"use client";

import React from 'react';
import { Container, Text, Stack, Box, Card, List } from '@mantine/core';
import { BRAIN_GARDEN_SURVIVAL } from './BrainGardenSurvival.constants';
import { SectionTitle } from '@shared-components/atoms/SectionTitle';
import { ParagraphText } from '@shared-components/atoms/ParagraphText';
import { CallToAction } from '@shared-components/molecules/CallToAction';
import { Hero } from '@shared-components/organisms/Hero';
import { SeparatorLine } from './BrainGardenSurvival.styles';
import { BrainGardenSurvivalProps } from './BrainGardenSurvival.types';
import { useBrainGardenSurvival } from './BrainGardenSurvival.hook';

export const BrainGardenSurvival: React.FC<BrainGardenSurvivalProps> = (props) => {
    const { isLoading } = useBrainGardenSurvival(props);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <div id="the-breakthrough" style={{ scrollMarginTop: '100px' }}>
            <Container size="xl">
                {/* Why Continuous Evolution Matters Section */}
                <Box mb={60} id="why-continuous-evolution-matters" style={{ scrollMarginTop: '100px' }}>
                    <SectionTitle>Why Continuous Evolution Matters</SectionTitle>
                    <Stack gap={30}>
                        <Box>
                            <Text
                                fw={700}
                                size="xl"
                                style={{
                                    fontSize: '1.25rem',
                                    marginTop: '0.2rem',
                                    marginBottom: '0.2rem'
                                }}
                            >
                                The AI revolution isn't slowing down —
                            </Text>
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
                        </Box>
                        <Card
                            p="md"
                            radius="sm"
                            withBorder
                            style={{
                                backgroundColor: 'rgba(66, 133, 244, 0.08)',
                                borderColor: 'var(--mantine-color-blue-3)',
                            }}
                        >
                            <Text fw={600} mb={5}>🌟 Humans Amplified by AI</Text>
                            <Text size="sm">
                                Every week brings new breakthroughs: bigger models, smarter agents, sharper workflows.<br />
                                And it's not just the technology that's evolving — <strong>humans amplified by AI</strong> are creating better tools and systems at an overwhelming pace.
                            </Text>
                        </Card>

                        <SeparatorLine />

                        <Box style={{ maxWidth: '95%' }}>
                            <ParagraphText>
                                In this environment, the winners won't be the ones who simply use AI.<br />
                                They'll be the ones who can <strong>rapidly absorb</strong>, <strong>adapt</strong>, and <strong>apply</strong> the best new capabilities as they emerge — before the landscape shifts again.
                            </ParagraphText>
                        </Box>

                        <SeparatorLine />

                        <div style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.03)',
                            borderLeft: '3px solid var(--mantine-color-gray-5)',
                            borderRadius: '4px',
                            fontStyle: 'italic',
                            margin: '1rem 0',
                            padding: '1rem'
                        }}>
                            <Text>I experienced this firsthand.</Text>
                        </div>

                        <ParagraphText>
                            I experiment constantly — way more than most.<br />
                            But without a way to rapidly spread what I learned, the upgrades stayed trapped inside individual projects.<br />
                            One project would feel sharp and fast; another would lag behind, stuck in old patterns.
                        </ParagraphText>

                        <ParagraphText>
                            When I started mentoring others, it became even more obvious:<br />
                            <strong>If I could capture new breakthroughs and make them immediately accessible, the whole team leveled up faster.</strong>
                        </ParagraphText>

                        <Text mt={-5} mb={8} fw={500} style={{ fontSize: '1.05rem' }}>
                            That's why I created Brain Garden:
                        </Text>

                        <Box mt={-15}>
                            <Card
                                p="20px"
                                radius="sm"
                                withBorder
                                style={{
                                    backgroundColor: 'rgba(100, 180, 100, 0.05)',
                                    borderColor: 'var(--mantine-color-green-3)',
                                    maxWidth: '550px',
                                    marginBottom: '16px'
                                }}
                            >
                                <Text fw={600} mb={8}>🌱 Brain Garden Is a Place</Text>
                                <Text size="sm" style={{ fontStyle: 'italic', lineHeight: 1.5 }}>
                                    Not a polished product. Not a magic tool. A living, evolving library.
                                </Text>
                            </Card>

                            <SeparatorLine />

                            <Text
                                fw={700}
                                size="xl"
                                style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '20px'
                                }}
                            >
                                🌿 Brain Garden is a place to grow breakthroughs.
                            </Text>

                            <Box style={{ marginBottom: '24px' }}>
                                <List
                                    type="ordered"
                                    spacing="xs"
                                    style={{
                                        fontSize: '1.1rem',
                                        lineHeight: 1.8,
                                        color: 'var(--mantine-color-gray-8)'
                                    }}
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
                                style={{
                                    fontSize: '1rem',
                                    lineHeight: 1.7,
                                    color: 'var(--mantine-color-gray-8)',
                                    marginBottom: '20px'
                                }}
                            >
                                At its core, Brain Garden is a living system:<br />
                                a growing library of rules, prompts, and workflows — simple tools that help me transplant new upgrades into every project I touch.
                            </Text>

                            <Text
                                style={{
                                    fontSize: '1rem',
                                    lineHeight: 1.7,
                                    color: 'var(--mantine-color-gray-8)'
                                }}
                            >
                                It's not static — and it's not supposed to be.<br />
                                It's the living scaffold that lets me <strong>move faster</strong>, <strong>work smarter</strong>, and <strong>amplify every project and team</strong> with the best ideas I find today — and the ones I'll discover tomorrow.
                            </Text>
                        </Box>

                        <SeparatorLine />

                        <Box
                            p="md"
                            style={{
                                backgroundColor: 'rgba(66, 133, 244, 0.05)',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}
                        >
                            <Text size="lg" fw={600}>
                                When you hire me, you're not getting a static framework.<br />
                                You're getting a <span style={{ color: 'var(--mantine-color-blue-7)' }}>living system of advantages</span>, continuously updated, battle-tested, and ready to deploy.
                            </Text>
                        </Box>
                    </Stack>
                </Box>

                {/* New Section: Hiring Me Means Inheriting the Future */}
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

                    <Stack mt={40} gap={30}>
                        <Box>
                            <Text size="xl" style={{
                                fontSize: 24,
                                lineHeight: 1.6,
                                color: 'var(--mantine-color-gray-7)',
                                fontWeight: 400,
                                marginBottom: 24
                            }}>
                                Brain Garden isn't a product you buy. It's the living system I've built — and continue evolving — to survive and thrive in the AI revolution.
                            </Text>

                            <Text size="xl" style={{
                                fontSize: 24,
                                lineHeight: 1.6,
                                color: 'var(--mantine-color-gray-7)',
                                fontWeight: 400
                            }}>
                                When you hire me, you're not betting on a static tool. You're investing in a living strategic force — ready to upgrade your developers, workflows, and capabilities faster than change itself.
                            </Text>
                        </Box>
                    </Stack>

                    <Box mt={60}>
                        <CallToAction
                            title="Ready to Equip Your Team for the Future?"
                            buttonText="Let's Talk"
                            buttonLink={BRAIN_GARDEN_SURVIVAL.ctaLink}
                        />
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default BrainGardenSurvival; 