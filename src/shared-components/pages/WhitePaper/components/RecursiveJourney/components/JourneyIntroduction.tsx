import React from 'react';
import { Box, Text, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from '@mantine/hooks';

interface JourneyIntroductionProps {
    content: string[];
}

export const JourneyIntroduction: React.FC<JourneyIntroductionProps> = ({ content }) => {
    const theme = useMantineTheme();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Use simple styling without the dark card
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{
                marginBottom: '2rem',
                padding: '0 1rem'
            }}
        >
            {content.map((paragraph, idx) => (
                <motion.div key={`intro-${idx}`} variants={itemVariants}>
                    <Text
                        mb="md"
                        style={{
                            lineHeight: 1.7,
                            fontSize: idx === 0 ? '1.2rem' : idx === 1 ? '1.1rem' : '1rem',
                            fontWeight: idx === 1 ? 600 : 400,
                            color: theme.colors.dark[7],
                            textAlign: idx < 2 ? 'center' : 'left'
                        }}
                    >
                        {paragraph}
                    </Text>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default JourneyIntroduction; 