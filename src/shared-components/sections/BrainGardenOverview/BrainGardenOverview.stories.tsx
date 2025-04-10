import type { Meta, StoryObj } from '@storybook/react';
import { BrainGardenOverview } from './BrainGardenOverview';
import { defaultContent } from './BrainGardenOverview.constants';

const meta = {
  title: 'Pages/01-WhitePaper/03-BrainGardenOverview',
  component: BrainGardenOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A section component that explains the Brain Garden System, including core components, force multipliers, system architecture, and navigation.'
      }
    }
  },
} satisfies Meta<typeof BrainGardenOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the BrainGardenOverview section with its embedded content.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    heroProps: defaultContent.hero,
    introProps: defaultContent.intro,
    coreComponentsProps: defaultContent.coreComponents,
    forceMultipliersProps: defaultContent.forceMultipliers,
    systemArchitectureProps: defaultContent.systemArchitecture,
    navigationProps: defaultContent.navigation,
    keyBenefitsProps: defaultContent.keyBenefits,
    ctaProps: defaultContent.cta,
  },
};

/**
 * Desktop view of the BrainGardenOverview section.
 * Shows the full-width layout optimized for desktop screens.
 */
export const Desktop: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'BrainGardenOverview section as viewed on desktop devices. Shows the optimal layout with features arranged in multi-column grids and full-width diagrams.'
      },
    },
  },
};

/**
 * Mobile view of the BrainGardenOverview section.
 * Shows the responsive layout optimized for mobile screens.
 */
export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'BrainGardenOverview section as viewed on mobile devices. All components adapt to a single-column layout with appropriate spacing and font sizing for smaller screens.'
      },
    },
  },
};

/**
 * Tablet view of the BrainGardenOverview section.
 * Shows the responsive layout optimized for tablet screens.
 */
export const Tablet: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'BrainGardenOverview section as viewed on tablet devices. Components adapt to an intermediate layout between mobile and desktop with optimized spacing and organization.'
      },
    },
  },
};