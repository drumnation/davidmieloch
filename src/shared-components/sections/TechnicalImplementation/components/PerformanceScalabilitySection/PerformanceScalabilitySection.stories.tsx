import type { Meta, StoryObj } from '@storybook/react';
import { PerformanceScalabilitySection } from './PerformanceScalabilitySection';
import { defaultContent } from '../../TechnicalImplementation.constants';

const meta = {
  title: 'Sections/04-TechnicalImplementation/06-PerformanceScalabilitySection',
  component: PerformanceScalabilitySection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PerformanceScalabilitySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    performanceScalability: defaultContent.performanceScalability,
    performanceScalabilityDiagram: defaultContent.performanceScalabilityDiagram
  },
}; 