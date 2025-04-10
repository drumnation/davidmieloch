import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NavigationMenu } from './NavigationMenu';
import styled from 'styled-components';

const StoryContainer = styled.div<{ $isDark?: boolean }>`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ $isDark }) => ($isDark ? 'var(--bg-dark)' : 'var(--bg-light)')};
`;

const meta: Meta<typeof NavigationMenu> = {
  title: 'Organisms/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A sticky navigation menu component that supports nested sections, smooth scrolling, and responsive design with mobile optimization.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const defaultItems = [
  {
    id: 'overview',
    title: 'Overview',
    icon: '📋',
  },
  {
    id: 'features',
    title: 'Features',
    icon: '✨',
    subsections: [
      {
        id: 'feature-1',
        title: 'AI Integration',
      },
      {
        id: 'feature-2',
        title: 'Team Collaboration',
      },
      {
        id: 'feature-3',
        title: 'Performance Metrics',
      },
    ],
  },
  {
    id: 'benefits',
    title: 'Benefits',
    icon: '🎯',
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    icon: '📚',
    subsections: [
      {
        id: 'case-1',
        title: 'Enterprise Success',
      },
      {
        id: 'case-2',
        title: 'Startup Growth',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing',
    icon: '💰',
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    activeId: 'overview',
    style: 'light',
    position: 'left',
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
};

/**
 * Mobile view of the default navigation menu
 */
export const DefaultMobile: Story = {
  args: {
    ...Default.args,
  },
  decorators: Default.decorators,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Default navigation menu as viewed on mobile devices. The navigation adapts to smaller screens with optimized touch targets and collapsed sections.',
      },
    },
  },
};

/**
 * Tablet view of the default navigation menu
 */
export const DefaultTablet: Story = {
  args: {
    ...Default.args,
  },
  decorators: Default.decorators,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Default navigation menu as viewed on tablet devices, showing the responsive behavior between mobile and desktop.',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    items: defaultItems,
    activeId: 'features',
    style: 'dark',
    position: 'left',
  },
  decorators: [
    (Story) => (
      <StoryContainer $isDark>
        <Story />
      </StoryContainer>
    ),
  ],
};

/**
 * Mobile view of the dark mode navigation menu
 */
export const DarkModeMobile: Story = {
  args: {
    ...DarkMode.args,
  },
  decorators: DarkMode.decorators,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Dark mode navigation menu as viewed on mobile devices.',
      },
    },
  },
};

export const RightPosition: Story = {
  args: {
    items: defaultItems,
    activeId: 'benefits',
    style: 'light',
    position: 'right',
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
};

/**
 * Mobile view of right-positioned navigation menu
 */
export const RightPositionMobile: Story = {
  args: {
    ...RightPosition.args,
  },
  decorators: RightPosition.decorators,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Right-positioned navigation menu as viewed on mobile devices.',
      },
    },
  },
};

// Create sections for demonstrating smooth scroll
const DemoContent = styled.div`
  padding: 2rem;
  margin: 2rem;
  background: ${({ theme }) => theme.colors.background.paper || '#fff'};
  border-radius: 12px;
  min-height: 400px;
`;

export const WithSmoothScroll = () => {
  const [activeId, setActiveId] = React.useState('overview');

  return (
    <StoryContainer>
      <div style={{ display: 'flex' }}>
        <NavigationMenu
          items={defaultItems}
          activeId={activeId}
          style="light"
          position="left"
          onItemClick={setActiveId}
        />
        <div style={{ flex: 1 }}>
          {defaultItems.map((item) => (
            <React.Fragment key={item.id}>
              <DemoContent id={item.id}>
                <h2>{item.title}</h2>
                <p>Content for {item.title} section</p>
              </DemoContent>
              {item.subsections?.map((subsection) => (
                <DemoContent key={subsection.id} id={subsection.id}>
                  <h3>{subsection.title}</h3>
                  <p>Content for {subsection.title} subsection</p>
                </DemoContent>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </StoryContainer>
  );
};

/**
 * Mobile view of WithSmoothScroll example
 */
export const WithSmoothScrollMobile: Story = {
  render: WithSmoothScroll,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Navigation menu with smooth scroll functionality as viewed on mobile devices.',
      },
    },
  },
}; 