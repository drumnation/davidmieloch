import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { QuoteGrid } from './QuoteGrid';
import { FaStar, FaHeart, FaLightbulb, FaRocket, FaCode, FaLightbulb as FaBulb } from 'react-icons/fa';
import { theme } from '../../../styles/theme/styled-theme';

const meta = {
  title: 'Organisms/QuoteGrid',
  component: QuoteGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <StyledThemeProvider theme={theme}>
        <Story />
      </StyledThemeProvider>
    ),
  ],
  argTypes: {
    layout: {
      control: 'select',
      options: ['2-column', '3-column'],
    },
    animation: {
      control: 'select',
      options: ['stagger-fade', 'float-in', 'none'],
    },
    style: {
      control: 'select',
      options: ['card', 'minimal'],
    },
    background: {
      control: 'select',
      options: ['light', 'dark', 'gradient'],
    },
  },
} satisfies Meta<typeof QuoteGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleQuotes = [
  {
    author: "Sarah Johnson",
    text: "Working with this team has been transformative. Their attention to detail and innovative solutions exceeded our expectations.",
    icon: <FaStar />,
    note: "CEO, TechVision Inc."
  },
  {
    author: "Michael Chen",
    text: "The level of expertise and dedication shown throughout our project was exceptional. They truly understand how to deliver value.",
    icon: <FaHeart />,
    note: "Lead Developer, InnovateCo"
  },
  {
    author: "Emily Rodriguez",
    text: "A game-changing partnership that helped us scale our operations efficiently while maintaining the highest quality standards.",
    icon: <FaLightbulb />,
    note: "Product Manager, ScaleUp Solutions"
  }
];

const extendedQuotes = [
  ...sampleQuotes,
  {
    author: "David Park",
    text: "The innovative approach to problem-solving and rapid delivery of solutions made them stand out from other teams we've worked with.",
    icon: <FaRocket />,
    note: "CTO, FutureTech Labs"
  },
  {
    author: "Lisa Martinez",
    text: "Their technical expertise combined with excellent communication skills made complex projects feel seamless and straightforward.",
    icon: <FaCode />,
    note: "Engineering Director, CloudScale"
  },
  {
    author: "James Wilson",
    text: "A truly collaborative partnership that brought fresh perspectives and innovative solutions to our challenging problems.",
    icon: <FaBulb />,
    note: "VP of Product, InnovateNow"
  }
];

export const Default: Story = {
  args: {
    quotes: sampleQuotes,
    layout: '3-column',
    animation: 'stagger-fade',
    style: 'card',
    background: 'light'
  }
};

export const TwoColumn: Story = {
  args: {
    quotes: sampleQuotes,
    layout: '2-column',
    animation: 'float-in',
    style: 'card',
    background: 'light'
  }
};

export const DarkMinimal: Story = {
  args: {
    quotes: sampleQuotes,
    layout: '3-column',
    animation: 'stagger-fade',
    style: 'minimal',
    background: 'dark'
  }
};

export const GradientCards: Story = {
  args: {
    quotes: sampleQuotes,
    layout: '3-column',
    animation: 'float-in',
    style: 'card',
    background: 'gradient'
  }
};

export const ExtendedGrid: Story = {
  args: {
    quotes: extendedQuotes,
    layout: '3-column',
    animation: 'stagger-fade',
    style: 'card',
    background: 'light'
  }
};

export const MinimalTwoColumnDark: Story = {
  args: {
    quotes: extendedQuotes,
    layout: '2-column',
    animation: 'float-in',
    style: 'minimal',
    background: 'dark'
  }
};

export const NoAnimation: Story = {
  args: {
    quotes: sampleQuotes,
    layout: '3-column',
    animation: 'none',
    style: 'card',
    background: 'light'
  }
};

export const GradientMinimal: Story = {
  args: {
    quotes: sampleQuotes,
    layout: '3-column',
    animation: 'stagger-fade',
    style: 'minimal',
    background: 'gradient'
  }
}; 