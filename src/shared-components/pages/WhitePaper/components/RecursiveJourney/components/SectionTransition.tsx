import React from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mantine/hooks';

interface SectionTransitionProps {
    fromSection: string;
    toSection: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({ fromSection, toSection }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    // Only showing a transition between the Brain section and Skill Jacks section
    const showTransition = fromSection === "Protecting the Brain" && toSection === "Self-Rescue with Skill Jacks";

    if (!showTransition) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Box
                my={isMobile ? "md" : "xl"}
                py={isMobile ? "sm" : "md"}
                px={isMobile ? "md" : 0}
                mx="auto"
                style={{
                    borderTop: `1px solid ${theme.colors.gray[3]}`,
                    borderBottom: `1px solid ${theme.colors.gray[3]}`,
                    maxWidth: '800px',
                    margin: isMobile ? '0 auto 1rem' : '2rem auto',
                    textAlign: 'center'
                }}
            >
                <Text
                    fw={500}
                    fz={isMobile ? "md" : "lg"}
                    style={{
                        color: theme.colors.dark[6],
                        lineHeight: 1.6
                    }}
                >
                    {isMobile ? (
                        <>
                            So yes — protecting the .brain/ folder is survival.
                            <br />
                            But what happens when an agent doesn't need protection... it just needs more knowledge?
                            <br />
                            That's where Skill Jacks come in.
                        </>
                    ) : (
                        <>
                            So yes — protecting the .brain/ folder is survival.
                            <br />
                            But what happens when an agent doesn't need protection... it just needs more knowledge?
                            <br />
                            That's where Skill Jacks come in.
                        </>
                    )}
                </Text>
            </Box>
        </motion.div>
    );
};

export default SectionTransition; 