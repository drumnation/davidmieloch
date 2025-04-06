'use client';

import React, { useState, useCallback } from 'react';
import {
  Box,
  Text,
  useMantineTheme,
  Paper,
  Stack,
  Group,
  rem
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Dropzone, DropzoneProps, FileWithPath, FileRejection } from '@mantine/dropzone';
import { IconFileUpload, IconDownload, IconInfoCircle } from '@tabler/icons-react';

export interface FileDropzoneProps {
  onFileDrop: (files: File[]) => void;
  onError?: (errorMessage: string) => void;
  loading?: boolean;
  maxSize?: number; // in bytes
  accept?: string[];
  className?: string;
}

/**
 * FileDropzone component for uploading job description files
 * Mobile-first design with responsive adaptations for desktop using Mantine's responsive features
 */
export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileDrop,
  onError,
  loading = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  className,
}) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const isMobile = width < parseInt(theme.breakpoints.sm);
  const isLargeMobile = width >= 414 && width < parseInt(theme.breakpoints.sm);
  const [droppedFileName, setDroppedFileName] = useState<string | null>(null);

  const handleDrop = useCallback(
    (files: FileWithPath[]) => {
      if (files.length === 0) {
        return;
      }

      const file = files[0];
      
      if (file.size > maxSize) {
        onError?.(`File size exceeds the ${Math.round(maxSize / (1024 * 1024))}MB limit.`);
        return;
      }

      setDroppedFileName(file.name);
      onFileDrop(files);
    },
    [maxSize, onError, onFileDrop]
  );

  const handleReject = useCallback(
    (fileRejections: FileRejection[]) => {
      const errorMessages = fileRejections
        .map((rejection) => rejection.errors.map((error) => error.message).join(', '))
        .join(', ');
      
      onError?.(errorMessages);
    },
    [onError]
  );

  // Icon animation styles
  const iconStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? rem(36) : rem(40),
    height: isMobile ? rem(36) : rem(40),
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.98)',
    }
  };

  return (
    <Paper className={className} p={0} radius="md" w="100%">
      <Dropzone
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={maxSize}
        accept={accept}
        loading={loading}
        multiple={false}
        p={isMobile ? (isLargeMobile ? "sm" : "xs") : "md"}
        radius="md"
        h={isMobile ? (isLargeMobile ? 160 : 140) : 180}
        styles={(theme) => ({
          root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: `2px dashed ${theme.colors.blue[6]}`,
            backgroundColor: 'rgba(240, 248, 255, 0.3)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(240, 248, 255, 0.5)',
              borderColor: theme.colors.blue[5]
            }
          }
        })}
      >
        <Stack align="center" gap={isMobile ? (isLargeMobile ? "sm" : "xs") : "sm"} style={{ textAlign: 'center' }}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: isMobile ? rem(36) : rem(40),
              height: isMobile ? rem(36) : rem(40),
              transition: 'transform 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
            }}
            onTouchStart={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.98)';
            }}
            onTouchEnd={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
            }}
          >
            {droppedFileName ? (
              <IconDownload
                style={{ width: '100%', height: '100%' }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            ) : (
              <IconFileUpload
                style={{ width: '100%', height: '100%' }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            )}
          </Box>

          {droppedFileName ? (
            <Text size={isMobile ? "md" : "lg"} fw={500}>
              {droppedFileName} ready for analysis
            </Text>
          ) : (
            <>
              <Text size={isMobile ? "md" : "lg"} fw={500}>
                Upload Job Description
              </Text>
              <Group gap="xs" align="center" justify="center">
                <Text size="sm" c="dimmed">
                  Drag a file here or tap to select
                </Text>
                <Box component="span" style={{ cursor: 'help' }} title={`Supported formats: PDF, DOCX, TXT. Max size: ${Math.round(maxSize / (1024 * 1024))}MB`}>
                  <IconInfoCircle size={16} color={theme.colors.gray[6]} />
                </Box>
              </Group>
            </>
          )}
          
          {loading && (
            <Text size="sm" c="dimmed" mt={isMobile ? 4 : 8}>
              Processing your file...
            </Text>
          )}
        </Stack>
      </Dropzone>
    </Paper>
  );
};

export default FileDropzone; 