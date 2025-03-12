import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { ProblemOverview } from './ProblemOverview';

const theme = {
  colors: {
    background: {
      light: '#ffffff',
      dark: '#1a1a1a',
      paper: '#f5f5f5'
    },
    text: {
      light: '#ffffff',
      primary: '#1a1a1a',
      secondary: '#666666'
    },
    primary: {
      main: '#007AFF',
      light: '#4da2ff',
      dark: '#0053cc'
    },
    secondary: {
      main: '#5856D6',
      light: '#8280e0',
      dark: '#3e3c94'
    }
  },
  space: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem'
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem'
  },
  shadows: {
    card: '0 4px 6px rgba(0, 0, 0, 0.1)',
    elevation1: '0 2px 4px rgba(0, 0, 0, 0.05)',
    elevation2: '0 8px 16px rgba(0, 0, 0, 0.15)'
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out'
  }
};

const meta = {
  title: 'Organisms/ProblemOverview',
  component: ProblemOverview,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['gradient-card', 'accent-card'],
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'full-width'],
    },
    animation: {
      control: 'select',
      options: ['fade-up', 'slide-in', 'none'],
    },
    background: {
      control: 'select',
      options: ['light', 'dark', 'gradient'],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProblemOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CurrentProblems: Story = {
  args: {
    title: 'Current Problems in AI Integration',
    description: 'Teams are facing significant challenges with AI tool adoption, leading to decreased productivity and increased technical debt.',
    metrics: [
      {
        number: '100',
        suffix: '%',
        label: 'increase in suggestion acceptance metrics',
      },
      {
        number: '2',
        prefix: '~',
        suffix: 'x',
        label: 'longer to fix AI-generated code issues',
      },
      {
        number: '3',
        suffix: 'x',
        label: 'higher maintenance costs with poor AI integration',
      },
    ],
    style: 'gradient-card',
    position: 'full-width',
    animation: 'fade-up',
    background: 'gradient',
  },
};

export const CognitiveLoadManagement: Story = {
  args: {
    title: 'Cognitive Load Management',
    description: 'Manual development tasks consume significant mental bandwidth, limiting capacity for strategic thinking and architecture decisions.',
    metrics: [
      {
        number: '40',
        suffix: '%',
        label: 'reduction in routine coding tasks',
      },
      {
        number: '60',
        suffix: '%',
        label: 'more time for architecture',
      },
      {
        number: '25',
        suffix: '%',
        label: 'increase in code quality',
      },
    ],
    style: 'accent-card',
    position: 'right',
    animation: 'slide-in',
    background: 'light',
  },
};

export const EngineeringExcellence: Story = {
  args: {
    title: 'Critical Requirements for Success',
    description: 'Implementing AI tools effectively requires a strong foundation of engineering practices and quality controls.',
    metrics: [
      {
        number: '6',
        label: 'key quality gates required',
      },
      {
        number: '100',
        suffix: '%',
        label: 'type coverage needed',
      },
      {
        number: '95',
        suffix: '%',
        label: 'test coverage target',
      },
    ],
    style: 'gradient-card',
    position: 'left',
    animation: 'fade-up',
    background: 'dark',
  },
}; 