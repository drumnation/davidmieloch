import type { Meta, StoryObj } from '@storybook/react';
import FileDropzone from './Dropzone';
import { useState } from 'react';

/**
 * The FileDropzone component allows users to upload job description files
 * by dragging and dropping or selecting files from their device.
 * 
 * This component follows mobile-first design principles with responsive
 * adaptations for larger screens.
 */
const meta = {
  title: 'PerfectFitAnalyzer/FileDropzone',
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
    onFileDrop: { action: 'file dropped' },
    onError: { action: 'error occurred' },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    accept: {
      control: 'object',
      description: 'Array of accepted MIME types',
    },
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
type Story = StoryObj<typeof meta>;

/**
 * Default state of the FileDropzone component - responsive design
 * that works on both mobile and desktop views
 */
export const Default: Story = {
  args: {
    loading: false,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
    onFileDrop: (files) => {
      console.log('Files dropped:', files);
    },
    onError: (errorMessage) => {
      console.error('Error:', errorMessage);
    },
  },
};

/**
 * Loading state - shows when a file is being processed
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

/**
 * Mobile view of the dropzone (320px width)
 */
export const MobileView: Story = {
  args: {
    ...Default.args,
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
    ...Default.args,
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
    ...Default.args,
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
export const WithInteraction: Story = {
  render: (args) => {
    const [fileName, setFileName] = useState<string | null>(null);
    
    const handleFileDrop = (files: File[]) => {
      if (files.length > 0) {
        setFileName(files[0].name);
      }
      args.onFileDrop?.(files);
    };
    
    return (
      <div>
        <p style={{ marginBottom: '1rem' }}>
          {fileName ? `Selected file: ${fileName}` : 'No file selected yet'}
        </p>
        <FileDropzone {...args} onFileDrop={handleFileDrop} />
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

/**
 * Custom accept types - only allows PDF files
 */
export const PDFOnly: Story = {
  args: {
    ...Default.args,
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
    ...Default.args,
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