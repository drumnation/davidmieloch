import React, { useState } from 'react';
import { Box, Text, Button, Collapse, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconAlertTriangle } from '@tabler/icons-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const BrainRuleAccordion: React.FC = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    // The rule content markdown
    const ruleContent = `**RULE: BrainGarden CLI - \`.brain/\` Folder Integrity Reminder**

WE ARE USING BRAIN GARDEN TO BUILD THE BRAIN GARDEN SYSTEM.

The root \`.brain/\` folder is CRITICAL for Brain Garden, storing project state, history, and metadata.

**Precautions:**

- **NO Direct Manipulation:** CLI code MUST avoid direct file system changes within \`.brain/\`, except via intentional CLI commands.
- **Confirmation for Destructive Actions:** Any command modifying \`.brain/\` MUST require explicit user confirmation.
- **Atomic Operations Only:** Prevent partial updates.
- **Avoid Manual Edits:** Humans — yes, you — leave it alone.
- **Use CLI API:** All interactions must go through the CLI layer.
- **Backup Required:** Always back up \`.brain/\` before changes.

**Why:** If the agent loses its brain while building the brain for other brains, it forgets how to brain. And then everyone is brainless.`;

    return (
        <Box mt="md" mb="xl">
            <Button
                variant="light"
                color="red"
                onClick={() => setOpened(o => !o)}
                leftSection={<IconAlertTriangle size={18} />}
                rightSection={opened ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                fullWidth
                style={{
                    marginBottom: 10,
                    fontWeight: 600,
                    fontSize: '1rem',
                    height: 'auto',
                    padding: '12px 16px',
                    lineHeight: 1.4
                }}
            >
                ⚠️ BrainGarden CLI - .brain/ Folder Integrity Rule
            </Button>

            <Collapse in={opened}>
                <Box
                    bg={theme.colors.dark[8]}
                    p="lg"
                    style={{
                        borderRadius: theme.radius.md,
                        border: `1px solid ${theme.colors.red[8]}`,
                        overflow: 'hidden'
                    }}
                >
                    <SyntaxHighlighter
                        language="markdown"
                        style={vscDarkPlus}
                        customStyle={{
                            margin: 0,
                            padding: '1.25rem',
                            borderRadius: theme.radius.sm,
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                            background: theme.colors.dark[8],
                            border: 'none',
                            fontFamily: '"Roboto Mono", monospace'
                        }}
                    >
                        {ruleContent}
                    </SyntaxHighlighter>
                </Box>
            </Collapse>
        </Box>
    );
};

export default BrainRuleAccordion; 