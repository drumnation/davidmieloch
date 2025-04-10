import type { Meta, StoryObj } from '@storybook/react';
import { CodeExamples } from './CodeExamples';
import { mockRepositories } from './mockData';

const meta = {
  title: 'Pages/04-Code-Examples/Components/Repository List',
  component: CodeExamples,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A component that displays a list of code repositories. This is a sub-component of the main Code Examples page.'
      }
    }
  },
} satisfies Meta<typeof CodeExamples>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the CodeExamples page with mock repositories.
 */
export const Default: Story = {
  args: {
    repositories: mockRepositories,
  },
};

/**
 * Desktop view of the CodeExamples page.
 */
export const Desktop: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'CodeExamples page as viewed on desktop devices. Shows the complete layout with multi-column repository grid and optimal spacing.',
      },
    },
  },
};

/**
 * Mobile view of the CodeExamples page.
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'CodeExamples page as viewed on mobile devices. The repository grid adapts to a single column layout with adjusted spacing and typography for optimal mobile viewing.',
      },
    },
  },
};

/**
 * Tablet view of the CodeExamples page.
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'CodeExamples page as viewed on tablet devices. Shows the responsive behavior between mobile and desktop layouts with an appropriate repository grid arrangement for tablet screens.',
      },
    },
  },
}; 