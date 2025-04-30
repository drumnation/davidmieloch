import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Collapse, useMantineTheme } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IconChevronDown, IconChevronUp, IconCode } from '@tabler/icons-react';
import { ExampleViewerProps } from '../RecursiveJourney.types';
import { useMediaQuery } from '@mantine/hooks';

export const ExampleViewer: React.FC<ExampleViewerProps> = ({ fileName, label }) => {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [content, setContent] = useState<string>('Loading example...');
    const [opened, setOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Determine language for syntax highlighting based on file extension
    const getLanguage = (fileName: string): string => {
        if (fileName.endsWith('.md')) return 'markdown';
        if (fileName.endsWith('.ts')) return 'typescript';
        if (fileName.endsWith('.tsx')) return 'tsx';
        if (fileName.endsWith('.js')) return 'javascript';
        if (fileName.endsWith('.jsx')) return 'jsx';
        // Add more extensions as needed
        return 'text'; // Default
    };

    const language = getLanguage(fileName);

    useEffect(() => {
        const fetchExample = async () => {
            setIsLoading(true);
            try {
                // First try from the examples directory in public
                const response = await fetch(`/examples/${fileName}`);

                if (!response.ok) {
                    // If not found in public, try from the component's examples directory
                    const componentResponse = await fetch(`/src/shared-components/pages/WhitePaper/components/RecursiveJourney/examples/${fileName}`);

                    if (!componentResponse.ok) {
                        throw new Error(`Failed to load example: ${componentResponse.statusText}`);
                    }

                    const text = await componentResponse.text();
                    setContent(text);
                } else {
                    // If found in public, use that
                    const text = await response.text();
                    setContent(text);
                }

                setError(null);
            } catch (err) {
                setError(`Error loading example: ${err instanceof Error ? err.message : String(err)}`);
                setContent('Could not load example file.');
            } finally {
                setIsLoading(false);
            }
        };

        if (fileName) {
            fetchExample();
        }
    }, [fileName]);

    // Take a max of 15 lines for preview
    const previewLines = content.split('\n').slice(0, 15).join('\n');
    const hasMoreLines = content.split('\n').length > 15;

    // Format the label for better display on mobile
    const displayLabel = label || `View example: ${fileName}`;
    const formattedLabel = isMobile && displayLabel.includes(':')
        ? displayLabel.replace(':', ':\n')
        : displayLabel;

    return (
        <Box mt="md" mb="xl">
            <Button
                variant="subtle"
                color={theme.primaryColor}
                onClick={() => setOpened(o => !o)}
                leftSection={<IconCode size={18} />}
                rightSection={opened ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                style={{
                    marginBottom: 10,
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    textAlign: 'left',
                    height: 'auto',
                    minHeight: 36,
                    lineHeight: 1.3
                }}
                fullWidth={isMobile}
            >
                {formattedLabel}
            </Button>

            <Collapse in={opened}>
                <Box
                    bg={theme.colors.dark[8]}
                    p="md"
                    style={{
                        borderRadius: theme.radius.md,
                        border: `1px solid ${theme.colors.dark[5]}`,
                        overflow: 'hidden'
                    }}
                >
                    {isLoading ? (
                        <Text color="dimmed" size="sm">Loading example...</Text>
                    ) : error ? (
                        <Text color="red" size="sm">{error}</Text>
                    ) : (
                        <>
                            {language === 'markdown' ? (
                                <Box
                                    style={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.85rem',
                                        lineHeight: 1.6,
                                        overflow: 'auto',
                                        color: theme.colors.gray[3]
                                    }}
                                >
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Box>
                            ) : (
                                <SyntaxHighlighter
                                    language={language}
                                    style={vscDarkPlus}
                                    customStyle={{
                                        margin: 0,
                                        padding: '1rem',
                                        borderRadius: theme.radius.sm,
                                        fontSize: '0.85rem',
                                        lineHeight: 1.6,
                                        overflow: 'auto'
                                    }}
                                >
                                    {content}
                                </SyntaxHighlighter>
                            )}
                        </>
                    )}
                </Box>
            </Collapse>
        </Box>
    );
};

export default ExampleViewer; 