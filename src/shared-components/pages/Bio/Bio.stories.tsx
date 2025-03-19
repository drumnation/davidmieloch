import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from '../../atoms/Typography';

// Create a Bio page component placeholder
const Bio = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Typography variant="h1" className="mb-5">
        Bio
      </Typography>
      
      <Typography variant="h2" className="mb-4">
        About David Mieloch
      </Typography>
      
      <Typography variant="body" className="mb-3">
        This page will contain biographical information and professional background.
      </Typography>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '30px' 
      }}>
        <Typography variant="h3" className="mb-3">
          Coming Soon
        </Typography>
        
        <Typography variant="body">
          The Bio section is under development and will include professional experience, 
          skills, projects, and contact information.
        </Typography>
      </div>
    </div>
  );
};

const meta = {
  title: 'Pages/03-Bio',
  component: Bio,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Bio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 