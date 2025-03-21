import type { Meta, StoryObj } from '@storybook/react';
import { PrivateWorkSection } from './PrivateWorkSection';

const mockWorks = [
  {
    title: 'Senior Frontend Developer',
    company: 'Enterprise SaaS Company',
    description: 'Led the development of a large-scale enterprise application dashboard used by Fortune 500 companies.',
    technologies: ['React', 'TypeScript', 'GraphQL', 'AWS', 'Material-UI'],
    achievements: [
      'Improved application performance by 40% through code optimization and lazy loading',
      'Implemented real-time data synchronization across multiple user sessions',
      'Led a team of 5 developers and mentored 3 junior developers',
    ],
    period: '2021 - Present',
  },
  {
    title: 'Full Stack Developer',
    company: 'FinTech Startup',
    description: 'Developed a secure financial transaction platform handling millions in daily transactions.',
    technologies: ['Node.js', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
    achievements: [
      'Built a scalable microservices architecture handling 100k+ daily transactions',
      'Implemented bank-grade security protocols and achieved SOC 2 compliance',
      'Reduced deployment time by 70% through CI/CD pipeline optimization',
    ],
    period: '2019 - 2021',
  },
];

const meta = {
  title: 'Organisms/PrivateWorkSection',
  component: PrivateWorkSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PrivateWorkSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    works: mockWorks,
  },
};

export const CustomTitles: Story = {
  args: {
    works: mockWorks,
    title: 'Professional Experience',
    subtitle: 'A showcase of my work in private sector companies',
  },
};

export const SingleWork: Story = {
  args: {
    works: [mockWorks[0]],
  },
}; 