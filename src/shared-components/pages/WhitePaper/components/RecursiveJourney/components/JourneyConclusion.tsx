import React from 'react';
import { Box, Text, Title, Button, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { MarkdownRenderer } from '@shared-components/molecules/MarkdownRenderer';

interface JourneyConclusionProps {
    content: string[];
    cta: string;
    navId: string;
}

export const JourneyConclusion: React.FC<JourneyConclusionProps> = ({ content, cta, navId }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <motion.div
            id={navId}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            style={{
                scrollMarginTop: isMobile ? '60px' : '100px',
                marginBottom: isMobile ? '3rem' : '4rem',
                position: 'relative',
                padding: isMobile ? '0 1rem' : 0
            }}
        >
            {/* Connecting line for desktop */}
            {!isMobile && (
                <Box
                    style={{
                        position: 'absolute',
                        left: '1.5rem',
                        top: '-4rem',
                        width: '2px',
                        height: '4rem',
                        background: `linear-gradient(to bottom, ${theme.colors.gray[3]}, ${theme.colors[theme.primaryColor][5]})`,
                        zIndex: 0
                    }}
                />
            )}

            <Box
                p="xl"
                style={{
                    background: theme.white,
                    border: `1px solid ${theme.colors.gray[3]}`,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: theme.radius.md,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Title
                    order={3}
                    mb="lg"
                    style={{
                        color: theme.colors[theme.primaryColor][7],
                        textAlign: 'center'
                    }}
                >
                    Why It Works
                </Title>

                <Box style={{ color: theme.colors.dark[7] }}>
                    {content.map((paragraph, idx) => (
                        <Box
                            key={`conclusion-${idx}`}
                            mb="md"
                        >
                            <MarkdownRenderer content={paragraph} disablePadding />
                        </Box>
                    ))}
                </Box>

                {/* CTA Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Box
                        mt="xl"
                        p="md"
                        style={{
                            background: theme.colors.gray[0],
                            borderRadius: theme.radius.md,
                            border: `1px solid ${theme.colors.gray[3]}`,
                            textAlign: 'center'
                        }}
                    >
                        <Text size="lg" fw={600} mb="md" c="dark.7">
                            {cta}
                        </Text>
                        <Button
                            color={theme.primaryColor}
                            rightSection={<IconArrowRight size={16} />}
                            component="a"
                            href="https://www.linkedin.com/in/davidmieloch/"
                            size="md"
                        >
                            Contact Me
                        </Button>
                    </Box>
                </motion.div>
            </Box>
        </motion.div>
    );
};

export default JourneyConclusion; 