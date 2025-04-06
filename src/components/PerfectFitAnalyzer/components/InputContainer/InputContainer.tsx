'use client';

import React, { useState, useCallback } from 'react';
import { Tabs, Box, Card, Paper } from '@mantine/core';
import { IconClipboardText, IconFileUpload } from '@tabler/icons-react';
import styled from 'styled-components';
import FileDropzone from '../Dropzone/Dropzone';
import JobDescriptionTextInput from '../TextInput/TextInput';
import { parseDocument, parseTextString } from '../../utils/document-parser';

// Define component props
export interface InputContainerProps {
  onJobDescriptionSubmit: (text: string, source: 'file' | 'text') => void;
  loading?: boolean;
  className?: string;
}

// Styled components
const StyledContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-top: 1rem;
  padding: 1.5rem;
`;

/**
 * InputContainer component providing a tabbed interface between file upload and text input
 */
export const InputContainer: React.FC<InputContainerProps> = ({
  onJobDescriptionSubmit,
  loading = false,
  className,
}) => {
  const [activeTab, setActiveTab] = useState<string | null>('text');
  const [error, setError] = useState<string | null>(null);

  // Handle file upload
  const handleFileDrop = useCallback(async (files: File[]) => {
    setError(null);
    
    if (files.length === 0) {
      return;
    }
    
    try {
      const result = await parseDocument(files[0]);
      
      if (result.error) {
        setError(`Error processing file: ${result.error}`);
        return;
      }
      
      onJobDescriptionSubmit(result.text, 'file');
    } catch (err) {
      setError('An unexpected error occurred while processing the file.');
      console.error('File processing error:', err);
    }
  }, [onJobDescriptionSubmit]);

  // Handle text input submission
  const handleTextSubmit = useCallback((text: string) => {
    setError(null);
    
    try {
      const result = parseTextString(text);
      
      if (result.error) {
        setError(`Error processing text: ${result.error}`);
        return;
      }
      
      onJobDescriptionSubmit(result.text, 'text');
    } catch (err) {
      setError('An unexpected error occurred while processing the text.');
      console.error('Text processing error:', err);
    }
  }, [onJobDescriptionSubmit]);

  // Handle file upload errors
  const handleFileError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  return (
    <StyledContainer className={className}>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
        radius="md"
      >
        <Tabs.List grow>
          <Tabs.Tab value="text" leftSection={<IconClipboardText size={16} />}>
            Paste Job Description
          </Tabs.Tab>
          <Tabs.Tab value="file" leftSection={<IconFileUpload size={16} />}>
            Upload File
          </Tabs.Tab>
        </Tabs.List>

        <StyledCard>
          <Tabs.Panel value="text">
            <JobDescriptionTextInput
              onTextSubmit={handleTextSubmit}
              loading={loading}
              placeholder="Paste your job description here..."
              minLength={100}
              maxLength={20000}
            />
          </Tabs.Panel>

          <Tabs.Panel value="file">
            <FileDropzone
              onFileDrop={handleFileDrop}
              onError={handleFileError}
              loading={loading}
              maxSize={10 * 1024 * 1024} // 10MB
            />
          </Tabs.Panel>
        </StyledCard>

        {error && (
          <Paper p="xs" mt="sm" withBorder color="red">
            {error}
          </Paper>
        )}
      </Tabs>
    </StyledContainer>
  );
};

export default InputContainer; 