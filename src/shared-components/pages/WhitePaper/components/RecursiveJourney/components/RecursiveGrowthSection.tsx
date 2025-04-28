import React from 'react';
import { Box, Text, Title, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconPlant, IconGitBranch, IconRecycle } from '@tabler/icons-react';

const RecursiveGrowthSection: React.FC = () => {
    const theme = useMantineTheme();

    return (
        <Box mt={40} mb={40}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Box
                    style={{
                        position: 'relative',
                        padding: '2rem',
                        borderRadius: theme.radius.md,
                        background: `linear-gradient(135deg, ${theme.colors.dark[7]} 0%, ${theme.colors.dark[8]} 100%)`,
                        border: `1px solid ${theme.colors.dark[5]}`,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <Box
                        style={{
                            position: 'absolute',
                            top: '-15px',
                            left: '20px',
                            background: theme.colors[theme.primaryColor][6],
                            padding: '4px 12px',
                            borderRadius: theme.radius.sm,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <IconRecycle size={18} />
                        <Text fw={600} size="sm">META INSIGHT</Text>
                    </Box>

                    <Title order={3} mb="md" style={{ color: theme.colors[theme.primaryColor][4] }}>
                        🌱 Brain Garden Wasn't Just Built — It Was Grown
                    </Title>

                    <Text size="md" mb="md" style={{ color: theme.colors.gray[0] }}>
                        At first, Brain Garden was a simple seed — a collection of manually crafted prompts, patterns, and scaffolding. But unlike traditional software that's merely constructed, Brain Garden began an extraordinary journey of <span style={{ fontWeight: 600, color: theme.colors[theme.primaryColor][4] }}>recursive self-improvement</span>. From the very beginning, it became a tool that helped me build itself.
                    </Text>

                    <Text size="md" mb="md" style={{ color: theme.colors.gray[0] }}>
                        I wasn't just coding Brain Garden — I was using Brain Garden to grow it.
                        Its early agents and rules helped me design better prompt templates, faster workflows, and smarter development tools. Each iteration strengthened the system, creating a recursive feedback loop where Brain Garden's own structures powered its next generation of improvements.
                    </Text>

                    <Text size="md" mb="md" style={{ color: theme.colors.gray[0] }}>
                        Think of it like planting a sapling that immediately starts crafting better gardening tools.
                        This wasn't full autonomy — I remained the gardener — but the tools I wielded were evolving alongside me. Brain Garden became an active collaborator in its own creation, accelerating its growth far beyond traditional hand-coded development.
                    </Text>

                    <Text size="md" mb="md" style={{ color: theme.colors.gray[0] }}>
                        This <span style={{ fontWeight: 600, color: theme.colors[theme.primaryColor][4] }}>recursive growth cycle</span> — like Inception for engineers — turned Brain Garden from a simple framework into a living system that gets smarter over time.
                    </Text>

                    <Text size="md" style={{ color: theme.colors.gray[0] }}>
                        But just as the garden grew, so did the challenges.
                        Agents occasionally hit knowledge walls, requiring targeted expertise injections to break through.
                        That's where Skill Jacks emerged — a powerful technique for dynamically boosting agent capabilities without permanently rewriting their design.
                    </Text>

                    <Box
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '1.5rem',
                            justifyContent: 'center'
                        }}
                    >
                        <IconPlant
                            size={28}
                            color={theme.colors.green[5]}
                            style={{ opacity: 0.8 }}
                        />
                        <IconGitBranch
                            size={28}
                            color={theme.colors.blue[5]}
                            style={{ opacity: 0.8 }}
                        />
                        <IconRecycle
                            size={28}
                            color={theme.colors.violet[5]}
                            style={{ opacity: 0.8 }}
                        />
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};

export default RecursiveGrowthSection; 