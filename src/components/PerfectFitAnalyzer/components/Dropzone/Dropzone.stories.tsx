import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';
import FileDropzone, { FileDropzoneProps } from './Dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import { useArgs } from '@storybook/preview-api';

/**
 * The FileDropzone component allows users to upload job description files
 * by dragging and dropping or selecting files from their device.
 * 
 * This component follows mobile-first design principles with responsive
 * adaptations for larger screens.
 */
const meta: Meta<typeof FileDropzone> = {
  title: 'Components/PerfectFitAnalyzer/Dropzone',
  component: FileDropzone,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dropzone component for uploading job description files (PDF, DOCX, TXT). Built with a mobile-first approach that scales appropriately for desktop.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
      viewports: {
        mobile1: {
          name: 'Small mobile',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        mobile2: {
          name: 'Large mobile',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onFileDrop: { action: 'filesDropped' },
    onError: { action: 'errorOccurred' },
    loading: { control: 'boolean' },
    maxSize: { control: 'number' },
    accept: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileDropzone>;

export default meta;
type Story = StoryObj<typeof FileDropzone>;

/**
 * Base Args with typed callbacks
 */
const baseArgs: Partial<FileDropzoneProps> = {
  onFileDrop: (files: File[]) => {
    console.log('Files dropped:', files);
  },
  onError: (errorMessage: string) => {
    console.error('Dropzone error:', errorMessage);
  },
  maxSize: 5 * 1024 * 1024, // 5MB in bytes
  accept: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  loading: false,
};

/**
 * Default state of the FileDropzone component - responsive design
 * that works on both mobile and desktop views
 */
export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

/**
 * Loading state - shows when a file is being processed
 */
export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
};

/**
 * Mobile view of the dropzone (320px width)
 */
export const MobileView: Story = {
  args: {
    ...baseArgs,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet view of the dropzone (768px width)
 */
export const TabletView: Story = {
  args: {
    ...baseArgs,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Desktop view of the dropzone (1024px width)
 */
export const DesktopView: Story = {
  args: {
    ...baseArgs,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

/**
 * Interactive example showing file selected state
 */
export const Interactive: Story = {
  args: {
    ...baseArgs,
  },
  render: (args: ComponentProps<typeof FileDropzone>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentArgs, updateArgs] = useArgs<FileDropzoneProps>();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [internalFileName, setInternalFileName] = useState<string | null>(null);

    const handleFileDrop = (files: File[]) => {
      args.onFileDrop?.(files);
      if (files.length > 0) {
        setInternalFileName(files[0].name);
      }
      updateArgs({ loading: true });
      setTimeout(() => {
        updateArgs({ loading: false });
      }, 2000);
    };

    return (
      <div>
        <p style={{ marginBottom: '1rem' }}>
          {currentArgs.loading ? 'Uploading...' : internalFileName ? `Selected file: ${internalFileName}` : 'No file selected yet'}
        </p>
        <FileDropzone {...args} loading={currentArgs.loading} onFileDrop={handleFileDrop} />
      </div>
    );
  },
};

/**
 * Custom accept types - only allows PDF files
 */
export const PDFOnly: Story = {
  args: {
    ...baseArgs,
    accept: ['application/pdf'],
  },
  parameters: {
    docs: {
      description: {
        story: 'A version of the dropzone that only accepts PDF files.',
      },
    },
  },
};

/**
 * Larger size limit for bigger files
 */
export const LargeSizeLimit: Story = {
  args: {
    ...baseArgs,
    maxSize: 20 * 1024 * 1024, // 20MB
  },
  parameters: {
    docs: {
      description: {
        story: 'Increased file size limit to 20MB for larger documents.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    loading: false,
  },
};

export const MaxFileSize: Story = {
  args: {
    ...baseArgs,
    maxSize: 1 * 1024 * 1024, // 1MB
  },
};

export const FileTypeValidation: Story = {
  args: {
    ...baseArgs,
    accept: ['image/jpeg', 'image/png'], // Example: Images only
  },
}; 