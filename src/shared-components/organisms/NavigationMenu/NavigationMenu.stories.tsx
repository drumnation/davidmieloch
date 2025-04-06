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