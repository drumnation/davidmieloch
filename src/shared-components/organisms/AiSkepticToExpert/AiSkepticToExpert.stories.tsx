import type { Meta, StoryObj } from '@storybook/react';
import { AiSkepticToExpert } from './AiSkepticToExpert';

const meta = {
  title: 'Sections/AiSkepticToExpert',
  component: AiSkepticToExpert,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AiSkepticToExpert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heroProps: {
      title: "From AI Skeptic to AI Expert",
      subtitle: "A personal journey of transformation and discovery in the world of artificial intelligence",
      background: "gradient",
      pattern: "circuit-board",
      textColor: "light",
      animation: "fade-up",
    },
    quotesProps: {
      quotes: [
        {
          text: "The transformation in our team's productivity was remarkable. What used to take weeks now takes days.",
          author: "Sarah Chen",
          role: "Engineering Lead"
        },
        {
          text: "Brain Garden's approach to AI integration changed my perspective on what's possible.",
          author: "Michael Rodriguez",
          role: "Senior Developer"
        },
        {
          text: "The learning curve was surprisingly gentle. The system adapts to our way of working.",
          author: "Emily Thompson",
          role: "Product Manager"
        }
      ]
    },
    problemSolutionCardsProps: {
      cards: [
        {
          problem: "Complex AI systems require deep technical expertise",
          solution: "Our automated workflow system handles the complexity",
          impact: "90% reduction in required AI expertise",
          icon: "brain",
          variant: "gradient"
        },
        {
          problem: "Integration with existing workflows is challenging",
          solution: "Seamless integration with your current development process",
          impact: "75% faster integration time",
          icon: "git-merge",
          variant: "accent"
        },
        {
          problem: "AI maintenance overhead is high",
          solution: "Self-maintaining AI systems with automated updates",
          impact: "85% reduction in maintenance time",
          icon: "robot",
          variant: "gradient"
        }
      ]
    }
  }
}; 