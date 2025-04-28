import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BrainGardenSurvival } from './BrainGardenSurvival';
import { BRAIN_GARDEN_SURVIVAL } from './BrainGardenSurvival.constants';

const meta = {
    title: 'Pages/01-WhitePaper/05-BrainGardenSurvival',
    component: BrainGardenSurvival,
    parameters: {
        layout: 'fullscreen',
        viewport: {
            viewports: INITIAL_VIEWPORTS,
            defaultViewport: 'responsive',
        },
        docs: {
            description: {
                component: 'A section component that describes Brain Garden as a survival-driven and constantly evolving AI development system, with subsections on survival principles, experimentation, design, and the system builder.'
            }
        }
    },
} satisfies Meta<typeof BrainGardenSurvival>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete BrainGardenSurvival section.
 */
export const Default: Story = {
    args: {
        heroProps: BRAIN_GARDEN_SURVIVAL.hero,
    },
};

/**
 * This story shows how the component adjusts to a mobile viewport.
 */
export const Mobile: Story = {
    args: {
        heroProps: BRAIN_GARDEN_SURVIVAL.hero,
    },
    parameters: {
        viewport: {
            defaultViewport: 'iphonex',
        },
    },
}; 