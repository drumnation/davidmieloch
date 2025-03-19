import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../atoms/Typography';

// Create a BestPractices page component placeholder
const BestPractices = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Typography variant="h1" className="mb-5">
        Best Practices
      </Typography>
      
      <Typography variant="h2" className="mb-4">
        AI Integration Best Practices
      </Typography>
      
      <Typography variant="body" className="mb-3">
        This page will contain best practices and guidelines for AI integration in development workflows.
      </Typography>
      
      <div style={{ 
        background: '#f0f9ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '30px' 
      }}>
        <Typography variant="h3" className="mb-3">
          Coming Soon
        </Typography>
        
        <Typography variant="body">
          The Best Practices section is under development and will include detailed guidelines, 
          practical examples, and recommended approaches for integrating AI tools into your development workflow.
        </Typography>
      </div>
    </div>
  );
};

const meta = {
  title: 'Pages/02-BestPractices',
  component: BestPractices,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BestPractices>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 