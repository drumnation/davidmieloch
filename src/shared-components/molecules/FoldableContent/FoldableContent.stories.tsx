import type { Meta, StoryObj } from '@storybook/react';
import { FoldableContent } from './FoldableContent';

const meta: Meta<typeof FoldableContent> = {
  title: 'Molecules/FoldableContent',
  component: FoldableContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The FoldableContent component provides a way to collapse long content with a "Show more/Show less" toggle.
        It's responsive across all device sizes and supports custom height settings.
        
        ## Mobile-First Design
        - On mobile devices, the component adapts to smaller screens by maintaining the same collapse functionality
        - The gradient fade and toggle button are optimized for touch interactions
        - Height transitions are performance-optimized for mobile devices`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    buttonPosition: {
      control: 'select',
      options: ['right', 'center'],
      description: 'Position of the toggle button',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height in pixels before content is collapsed',
    },
    customMaxHeight: {
      control: 'text',
      description: 'Custom max height with units (e.g., "10rem", "50vh")',
    },
    showMoreText: {
      control: 'text',
      description: 'Text for the expand button',
    },
    showLessText: {
      control: 'text',
      description: 'Text for the collapse button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const LongContent = () => (
  <div style={{ width: '400px', maxWidth: '100%' }}>
    <h3>Lorem ipsum dolor sit amet</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. 
      Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.
    </p>
    <p>
      Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. 
      Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.
    </p>
    <p>
      Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. 
      Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    maxHeight: 150,
    buttonPosition: 'right',
    showMoreText: 'Show more',
    showLessText: 'Show less',
    children: <LongContent />
  },
};

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
        story: 'On mobile devices, the component maintains its functionality while adapting to the smaller screen width.'
      },
    },
  },
};

export const CenteredButton: Story = {
  args: {
    maxHeight: 150,
    buttonPosition: 'center',
    showMoreText: 'Read more',
    showLessText: 'Read less',
    children: <LongContent />
  },
};

export const CenteredButtonMobile: Story = {
  args: {
    ...CenteredButton.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'With the button centered, the mobile experience provides a more prominent call to action.'
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    customMaxHeight: '10rem',
    buttonPosition: 'right',
    children: <LongContent />
  },
};

export const CustomHeightMobile: Story = {
  args: {
    ...CustomHeight.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Custom height settings work responsively on mobile devices to provide consistent experiences.'
      },
    },
  },
}; 