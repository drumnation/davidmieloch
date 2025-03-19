import type { Meta, StoryObj } from '@storybook/react';
import { ProfessionalJourney } from './ProfessionalJourney';

const meta = {
  title: 'Pages/03-Bio/Sections/Professional Journey',
  component: ProfessionalJourney,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ProfessionalJourney>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
}; 