import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from './PageTitle';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 100%;
`;

const meta: Meta<typeof PageTitle> = {
  title: 'Atoms/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Page title component with mobile-first design that adapts to different screen sizes. Provides consistent styling for main page headings across the application.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PageContainer>
        <Story />
      </PageContainer>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Page Title Example',
  },
};

/**
 * Mobile view of the default page title
 */
export const DefaultMobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Default page title as viewed on mobile devices. The font size and underline style adapt to smaller screens.',
      },
    },
  },
};

/**
 * Tablet view of the default page title
 */
export const DefaultTablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Default page title as viewed on tablet devices. Shows the responsive behavior between mobile and desktop sizes.',
      },
    },
  },
};

export const LongTitle: Story = {
  args: {
    children: 'This is a very long page title that will wrap to multiple lines on smaller screens',
  },
};

/**
 * Mobile view of a long page title
 */
export const LongTitleMobile: Story = {
  args: {
    ...LongTitle.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Long page title as viewed on mobile devices. Shows how text wrapping occurs on smaller screens while maintaining readability.',
      },
    },
  },
};

export const WithCustomStyles: Story = {
  args: {
    children: 'Custom Styled Title',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        padding: '2rem', 
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)' 
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Story />
          <p>Content that follows the page title would go here.</p>
        </div>
      </div>
    ),
  ],
};

/**
 * Mobile view of custom styled page title
 */
export const WithCustomStylesMobile: Story = {
  args: {
    ...WithCustomStyles.args,
  },
  decorators: WithCustomStyles.decorators,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Custom styled page title as viewed on mobile devices. Shows how the title looks in a custom environment on smaller screens.',
      },
    },
  },
}; 