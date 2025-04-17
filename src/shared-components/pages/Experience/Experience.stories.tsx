import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Experience } from './Experience';
import { ExperienceProps } from './Experience.types';
import { SideProject } from './components/SideProjectsSection/SideProjectsSection.types';

const meta = {
  title: 'pages/05-Experience',
  component: Experience,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Desktop view of the Experience page.
 */
export const Desktop: Story = {
  args: {
    id: 'experience',
    className: '',
  },
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the Experience page.
 */
export const Mobile: Story = {
  args: {
    id: 'experience',
    className: '',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
    docs: { disable: true },
  },
  name: 'Mobile (iPhone X)',
};

/**
 * Tablet view of the Experience page.
 */
export const Tablet: Story = {
  args: {
    id: 'experience',
    className: '',
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
};

export const sampleSideProjects: SideProject[] = [
  {
    title: 'Complex Layout Demo',
    description: 'This project demonstrates using the new complex layout feature with media groups',
    technologies: ['React', 'TypeScript', 'Styled Components'],
    url: 'https://example.com',
    startDate: 'January 2023',
    endDate: 'March 2023',
    category: 'Developer Tools',
    media: [
      {
        type: 'group',
        layout: 'default',
        url: '#',
        items: [
          {
            type: 'image',
            url: 'https://via.placeholder.com/800x400?text=Main+Image',
            title: 'Main Feature Image',
            description: 'This image takes up 50% of the width',
            width: '48%'
          },
          {
            type: 'group',
            layout: 'stack',
            width: '48%',
            url: '#',
            items: [
              {
                type: 'image',
                url: 'https://via.placeholder.com/400x200?text=Top+Image',
                title: 'Secondary Image 1',
                description: 'This image is stacked on top'
              },
              {
                type: 'image',
                url: 'https://via.placeholder.com/400x200?text=Bottom+Image',
                title: 'Secondary Image 2',
                description: 'This image is stacked at the bottom'
              }
            ]
          }
        ]
      }
    ],
    halfWidth: false
  },
]; 