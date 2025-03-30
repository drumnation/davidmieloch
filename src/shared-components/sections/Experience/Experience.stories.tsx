import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Experience } from './Experience';
import { ExperienceProps } from './Experience.types';
import { SideProject } from './components/SideProjectsSection/SideProjectsSection.types';

const meta = {
  title: 'Sections/Experience',
  component: Experience,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'experience',
    className: '',
  },
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