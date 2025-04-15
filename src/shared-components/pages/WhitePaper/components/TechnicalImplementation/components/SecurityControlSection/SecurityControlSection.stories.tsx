import type { Meta, StoryObj } from '@storybook/react';
import { SecurityControlSection } from './SecurityControlSection';
import { defaultContent } from '../../TechnicalImplementation.constants';

const meta = {
  title: 'Pages/01-WhitePaper/04-TechnicalImplementation/05-SecurityControlSection',
  component: SecurityControlSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SecurityControlSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    securityControl: defaultContent.securityControl
  },
}; 