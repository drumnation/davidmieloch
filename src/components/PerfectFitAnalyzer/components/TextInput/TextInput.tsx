'use client';

import React, { useState, useCallback } from 'react';
import { Textarea, Button, Group, Text } from '@mantine/core';
import { IconClipboard, IconRefresh, IconCheck } from '@tabler/icons-react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Define the component props
export interface JobDescriptionTextInputProps {
  onTextSubmit: (text: string) => void;
  minLength?: number;
  maxLength?: number;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

// Styled components
const TextInputContainer = styled(motion.div)`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

// In Mantine v7, we need to create a wrapper component instead of directly styling Mantine components
const StyledText = styled.div`
  transition: color 0.3s ease;
`;

// Animation variants
const containerVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  success: {
    y: [0, -5, 0],
    transition: {
      duration: 0.5,
    },
  },
};

/**
 * JobDescriptionTextInput component for manual entry or pasting of job descriptions
 */
export const JobDescriptionTextInput: React.FC<JobDescriptionTextInputProps> = ({
  onTextSubmit,
  minLength = 100,
  maxLength = 10000,
  loading = false,
  placeholder = 'Paste your job description here...',
  className,
}) => {
  const [text, setText] = useState('');
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [animateSuccess, setAnimateSuccess] = useState(false);

  // Calculate if the text is valid
  const isValid = text.length >= minLength && text.length <= maxLength;

  // Handle text changes
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setPasteSuccess(false);
  }, []);

  // Handle paste from clipboard
  const handlePasteFromClipboard = useCallback(async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText(clipboardText);
        setPasteSuccess(true);
        setAnimateSuccess(true);
        
        // Reset animation state after animation completes
        setTimeout(() => {
          setAnimateSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  }, []);

  // Handle text submission
  const handleSubmit = useCallback(() => {
    if (isValid && !loading) {
      onTextSubmit(text);
    }
  }, [isValid, loading, onTextSubmit, text]);

  // Handle clearing the input
  const handleClear = useCallback(() => {
    setText('');
    setPasteSuccess(false);
  }, []);

  return (
    <TextInputContainer 
      className={className}
      variants={containerVariants}
      animate={animateSuccess ? 'success' : 'initial'}
    >
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        minRows={8}
        maxRows={12}
        autosize
        disabled={loading}
        styles={(theme) => ({
          root: {
            transition: 'all 0.2s ease',
          },
          input: {
            resize: 'vertical',
            transition: 'all 0.2s ease',
            borderColor: pasteSuccess 
              ? theme.colors.green[6] 
              : isValid 
                ? theme.colors.blue[5] 
                : theme.colors.gray[4],
            '&:focus': {
              borderColor: theme.colors.blue[7],
            },
          },
        })}
      />

      <ActionBar>
        <StyledText>
          <Text 
            size="sm"
            color={isValid ? 'green' : text.length > 0 ? 'red' : 'dimmed'}
          >
            {text.length} / {maxLength} characters
            {!isValid && text.length > 0 && ` (minimum ${minLength})`}
          </Text>
        </StyledText>

        <Group gap={8}>
          <Button
            variant="light"
            color="gray"
            size="sm"
            leftSection={<IconRefresh size={16} />}
            onClick={handleClear}
            disabled={text.length === 0 || loading}
          >
            Clear
          </Button>

          <Button
            variant="light"
            color={pasteSuccess ? 'green' : 'blue'}
            size="sm"
            leftSection={pasteSuccess ? <IconCheck size={16} /> : <IconClipboard size={16} />}
            onClick={handlePasteFromClipboard}
            disabled={loading}
          >
            {pasteSuccess ? 'Pasted!' : 'Paste from Clipboard'}
          </Button>

          <Button
            variant="filled"
            color="blue"
            size="sm"
            onClick={handleSubmit}
            disabled={!isValid || loading}
            loading={loading}
          >
            Analyze
          </Button>
        </Group>
      </ActionBar>
    </TextInputContainer>
  );
};

export default JobDescriptionTextInput; 