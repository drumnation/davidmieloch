import type { Meta, StoryObj } from '@storybook/react';
import { AiSkepticToExpert } from './AiSkepticToExpert';
import { Icon } from '../../atoms/Icon';

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
      background: "image",
      backgroundImage: "/main-heading-background.png",
      backgroundOverlay: true,
      overlayOpacity: 0.6,
      textColor: "light",
      animation: "fade-up",
    },
    quotesProps: {
      quotes: [
        {
          text: "One of our OKRs is basically 'Use AI more' and one of the ways they're measuring that is Copilot suggestion acceptance %. Absolute insanity.",
          author: "Engineering Lead",
          icon: <Icon name="chart-bar" size={24} />
        },
        {
          text: "Management bought Cursor pro for everyone and said that they expect to see a return on that investment.",
          author: "Senior Developer",
          icon: <Icon name="coin" size={24} />
        },
        {
          text: "We're also seeing an increase in failures in Prod, so we need you to really ramp up Copilot and AI code reviews to find the source of these new issues.",
          author: "Project Manager",
          note: "(without realizing the irony)",
          icon: <Icon name="alert-triangle" size={24} />
        }
      ],
      layout: "3-column",
      animation: "stagger-fade"
    },
    problemSolutionCardsProps: {
      cards: [
        {
          problem: "Misaligned metrics incentivize bad code",
          solution: "I've developed metrics that measure quality outcomes, not AI usage",
          impact: "Improved code quality while still leveraging AI benefits",
          icon: "chart-bar",
          variant: "gradient"
        },
        {
          problem: "AI generates plausible but incorrect code",
          solution: "My systematic validation approach catches AI errors before they reach production",
          impact: "Reduced production failures by 65% in AI-assisted teams",
          icon: "shield-check",
          variant: "accent"
        },
        {
          problem: "Developers spend more time fixing AI code than writing it",
          solution: "I've created prompt engineering techniques that produce reliable, maintainable code",
          impact: "30% faster development with fewer rework cycles",
          icon: "code",
          variant: "gradient"
        }
      ]
    }
  }
};

export const WithGradientBackground: Story = {
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
          text: "One of our OKRs is basically 'Use AI more' and one of the ways they're measuring that is Copilot suggestion acceptance %. Absolute insanity.",
          author: "Engineering Lead",
          icon: <Icon name="chart-bar" size={24} />
        },
        {
          text: "Management bought Cursor pro for everyone and said that they expect to see a return on that investment.",
          author: "Senior Developer",
          icon: <Icon name="coin" size={24} />
        },
        {
          text: "We're also seeing an increase in failures in Prod, so we need you to really ramp up Copilot and AI code reviews to find the source of these new issues.",
          author: "Project Manager",
          note: "(without realizing the irony)",
          icon: <Icon name="alert-triangle" size={24} />
        }
      ],
      layout: "3-column",
      animation: "stagger-fade"
    },
    problemSolutionCardsProps: {
      cards: [
        {
          problem: "Misaligned metrics incentivize bad code",
          solution: "I've developed metrics that measure quality outcomes, not AI usage",
          impact: "Improved code quality while still leveraging AI benefits",
          icon: "chart-bar",
          variant: "gradient"
        },
        {
          problem: "AI generates plausible but incorrect code",
          solution: "My systematic validation approach catches AI errors before they reach production",
          impact: "Reduced production failures by 65% in AI-assisted teams",
          icon: "shield-check",
          variant: "accent"
        },
        {
          problem: "Developers spend more time fixing AI code than writing it",
          solution: "I've created prompt engineering techniques that produce reliable, maintainable code",
          impact: "30% faster development with fewer rework cycles",
          icon: "code",
          variant: "gradient"
        }
      ]
    }
  }
};

export const WithImageBackground: Story = {
  args: {
    heroProps: {
      title: "From AI Skeptic to AI Expert",
      subtitle: "A personal journey of transformation and discovery in the world of artificial intelligence",
      background: "image",
      backgroundImage: "/main-heading-background.png",
      backgroundOverlay: true,
      overlayOpacity: 0.6,
      textColor: "light",
      animation: "fade-up",
    },
    quotesProps: {
      quotes: [
        {
          text: "One of our OKRs is basically 'Use AI more' and one of the ways they're measuring that is Copilot suggestion acceptance %. Absolute insanity.",
          author: "Engineering Lead",
          icon: <Icon name="chart-bar" size={24} />
        },
        {
          text: "Management bought Cursor pro for everyone and said that they expect to see a return on that investment.",
          author: "Senior Developer",
          icon: <Icon name="coin" size={24} />
        },
        {
          text: "We're also seeing an increase in failures in Prod, so we need you to really ramp up Copilot and AI code reviews to find the source of these new issues.",
          author: "Project Manager",
          note: "(without realizing the irony)",
          icon: <Icon name="alert-triangle" size={24} />
        }
      ],
      layout: "3-column",
      animation: "stagger-fade"
    },
    problemSolutionCardsProps: {
      cards: [
        {
          problem: "Misaligned metrics incentivize bad code",
          solution: "I've developed metrics that measure quality outcomes, not AI usage",
          impact: "Improved code quality while still leveraging AI benefits",
          icon: "chart-bar",
          variant: "gradient"
        },
        {
          problem: "AI generates plausible but incorrect code",
          solution: "My systematic validation approach catches AI errors before they reach production",
          impact: "Reduced production failures by 65% in AI-assisted teams",
          icon: "shield-check",
          variant: "accent"
        },
        {
          problem: "Developers spend more time fixing AI code than writing it",
          solution: "I've created prompt engineering techniques that produce reliable, maintainable code",
          impact: "30% faster development with fewer rework cycles",
          icon: "code",
          variant: "gradient"
        }
      ]
    }
  }
}; 