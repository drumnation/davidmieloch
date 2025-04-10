import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../../../atoms/Typography';

// Create a component to compare AI reality vs Hollywood
const RealityVsHollywoodSection = () => {
  const realityItems = [
    {
      title: "Tools, Not Replacement",
      description: "AI provides decision support, data analysis, and process automation while humans maintain creative direction and final judgment.",
    },
    {
      title: "Complementary Skills",
      description: "AI excels at pattern recognition and data processing, while humans provide intuition, empathy, and ethical reasoning.",
    },
    {
      title: "Constant Evolution",
      description: "AI systems improve incrementally through ongoing training, feedback loops, and human oversight.",
    },
  ];

  const hollywoodItems = [
    {
      title: "Sentient Beings",
      description: "AI portrayed as self-aware entities with consciousness, emotions, and independent motivations.",
    },
    {
      title: "Human Replacement",
      description: "AI depicted as making humans obsolete through superior capabilities across all domains.",
    },
    {
      title: "Sudden Emergence",
      description: "AI gaining consciousness or capabilities 'overnight' through some breakthrough or accident.",
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h3" weight="bold" className="mb-4">
        AI in Reality vs. Hollywood
      </Typography>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
        <div>
          <Typography variant="heading4" weight="semibold" className="mb-4">
            AI in Reality
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {realityItems.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="heading5" weight="semibold" className="mb-2">
                  {item.title}
                </Typography>
                <Typography variant="body">{item.description}</Typography>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Typography variant="heading4" weight="semibold" className="mb-4">
            AI in Hollywood
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {hollywoodItems.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="heading5" weight="semibold" className="mb-2">
                  {item.title}
                </Typography>
                <Typography variant="body">{item.description}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Pages/01-WhitePaper/02-AiAutopilotAnalogy/02-RealityVsHollywoodSection',
  component: RealityVsHollywoodSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RealityVsHollywoodSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

/**
 * Desktop view of the Reality vs Hollywood section.
 * Shows the full two-column layout with optimal spacing.
 */
export const Desktop: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Desktop view showing the Reality vs Hollywood comparison with a two-column layout optimized for larger screens.'
      }
    }
  }
};

/**
 * Mobile view of the Reality vs Hollywood section.
 * On mobile, the grid changes to a single column layout.
 */
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'On mobile devices, the comparison grid changes to a single column layout with AI Reality section displayed first, followed by the Hollywood section.'
      }
    }
  }
};

/**
 * Tablet view of the Reality vs Hollywood section.
 * Maintains the two-column layout but with adjusted spacing.
 */
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'On tablet devices, the two-column layout is maintained but with adjusted spacing and padding to fit the screen size.'
      }
    }
  }
}; 