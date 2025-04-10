import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar } from './FilterBar';
import { Filter } from './FilterBar.types';

const mockFilters: { languages: Filter[]; topics: Filter[]; types: Filter[]; } = {
  languages: [
    { type: 'language', value: 'typescript', label: 'TypeScript', count: 12 },
    { type: 'language', value: 'javascript', label: 'JavaScript', count: 8 },
    { type: 'language', value: 'python', label: 'Python', count: 5 },
  ] as Filter[],
  topics: [
    { type: 'topic', value: 'react', label: 'React', count: 15 },
    { type: 'topic', value: 'nextjs', label: 'Next.js', count: 7 },
    { type: 'topic', value: 'api', label: 'API', count: 4 },
  ] as Filter[],
  types: [
    { type: 'type', value: 'library', label: 'Library', count: 6 },
    { type: 'type', value: 'app', label: 'Application', count: 8 },
    { type: 'type', value: 'tool', label: 'Tool', count: 3 },
  ] as Filter[],
};

const meta = {
  title: 'Pages/04-Code-Examples/Components/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Filter bar component used in the Code Examples page to filter repositories by language, topic, and type.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filters: mockFilters,
    selectedFilters: {
      languages: [],
      topics: [],
      types: [],
    },
    onFilterChange: (type, value) => console.log(`Filter changed: ${type} - ${value}`),
    onClearFilters: () => console.log('Filters cleared'),
  },
};

export const WithSelectedFilters: Story = {
  args: {
    filters: mockFilters,
    selectedFilters: {
      languages: ['typescript'],
      topics: ['react', 'nextjs'],
      types: ['library'],
    },
    onFilterChange: (type, value) => console.log(`Filter changed: ${type} - ${value}`),
    onClearFilters: () => console.log('Filters cleared'),
  },
};

export const NoTypes: Story = {
  args: {
    filters: {
      ...mockFilters,
      types: [],
    },
    selectedFilters: {
      languages: [],
      topics: [],
      types: [],
    },
    onFilterChange: (type, value) => console.log(`Filter changed: ${type} - ${value}`),
    onClearFilters: () => console.log('Filters cleared'),
  },
}; 