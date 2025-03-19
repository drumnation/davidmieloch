import type { Meta, StoryObj } from '@storybook/react';
import { RedditIcon } from '../../AiSkepticToExpert.logic';
import { Typography } from '../../../../atoms/Typography';

// Create a simple component to display the Reddit section
const RedditSection = () => {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      background: 'white',
      display: 'flex',
      transition: 'transform 0.2s ease-in-out',
      cursor: 'pointer'
    }}>
      <div style={{ marginRight: '16px' }}>
        <RedditIcon />
      </div>
      <div>
        <div style={{ color: '#000000' }}>
          <Typography variant="caption" weight="bold" style={{ marginBottom: '4px' }}>
            🔥 Trending on r/ExperiencedDevs
          </Typography>
        </div>
        <div style={{ color: '#0066CC' }}>
          <Typography variant="body" weight="bold" style={{ marginBottom: '4px' }}>
            &ldquo;AI coding mandates at work?&rdquo;
          </Typography>
        </div>
        <Typography variant="caption" style={{ color: '#666666' }}>
          💬 286 comments &nbsp;&nbsp; ⬆️ 283 upvotes
        </Typography>
      </div>
    </div>
  );
};

const meta = {
  title: 'Sections/01-AiSkepticToExpert/01-RedditSection',
  component: RedditSection,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RedditSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 