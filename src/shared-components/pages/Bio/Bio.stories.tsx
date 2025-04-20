import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { BioPage } from './Bio';
import { BioPageProps } from './Bio.types';
import { SubNavController } from '@shared-components/navigation/PageSubNav';
import { SubNavItem } from '@shared-components/navigation/PageSubNav/PageSubNav.types';
import {
  IconUser, IconMicrophone2, IconMessageCircle,
  IconCode, IconPlayerPlay, IconVolume,
  IconMusic, IconBusinessplan, IconTools,
  IconBrandReact, IconServer, IconDatabase, IconCloud,
  IconTestPipe, IconGauge, IconSettings,
  IconSchool, IconBrush, IconBuildingBridge, IconRoute, IconTargetArrow, IconEye
} from '@tabler/icons-react';
import { MEDIA_ITEMS, SKILL_CATEGORIES } from './Bio.constants';
import { TESTIMONIALS_DATA } from './components/Testimonials/testimonials.data';

const generateMediaNavItems = (): SubNavItem[] => {
  return MEDIA_ITEMS.map(item => ({
    id: `media-${item.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: item.title,
    level: 1,
    icon: item.type === 'youtube' ? <IconPlayerPlay size={16} /> : <IconVolume size={16} />
  }));
};

const generateTestimonialNavItems = (): SubNavItem[] => {
  const categoryIcons: Record<string, React.ReactNode> = {
    'Music': <IconMusic size={16} />,
    'Sales/Marketing': <IconBusinessplan size={16} />,
    'Software': <IconCode size={16} />
  };
  return TESTIMONIALS_DATA.map(category => ({
    id: `testimonials-${category.category.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`,
    title: category.category,
    level: 1,
    icon: categoryIcons[category.category] || <IconMessageCircle size={16} />
  }));
};

const generateExpertiseNavItems = (): SubNavItem[] => {
  const categoryIcons: Record<string, React.ReactNode> = {
    'Frontend Development': <IconBrandReact size={16} />,
    'Backend & Infrastructure': <IconServer size={16} />,
    'Databases & Storage': <IconDatabase size={16} />,
    'Cloud & DevOps': <IconCloud size={16} />,
    'Testing & Quality Assurance': <IconTestPipe size={16} />,
    'Monitoring & Performance': <IconGauge size={16} />,
    'Tools & Methodologies': <IconSettings size={16} />
  };
  return SKILL_CATEGORIES.map(category => ({
    id: `expertise-${category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`,
    title: category.name,
    level: 1,
    icon: categoryIcons[category.name] || <IconTools size={16} />
  }));
};

const biographyNavItems: SubNavItem[] = [
  { id: 'bio-intro', title: 'Introduction', level: 0, icon: <IconUser size={18} /> },
  { id: 'bio-early-life', title: 'Early Life & Music', level: 1, icon: <IconSchool size={16} /> },
  { id: 'bio-composition', title: 'Composition & Creative', level: 1, icon: <IconBrush size={16} /> },
  { id: 'bio-bridge-to-tech', title: 'Bridge to Technology', level: 1, icon: <IconBuildingBridge size={16} /> },
  { id: 'bio-return-to-eng', title: 'Return to Engineering', level: 1, icon: <IconRoute size={16} /> },
  { id: 'bio-achievements', title: 'Achievements & Approach', level: 1, icon: <IconTargetArrow size={16} /> },
  { id: 'bio-perspective', title: 'Unique Perspective', level: 1, icon: <IconEye size={16} /> },
  { id: 'featured-media', title: 'Featured Media', level: 0, icon: <IconMicrophone2 size={18} /> },
  ...generateMediaNavItems(),
  { id: 'testimonials', title: 'Testimonials', level: 0, icon: <IconMessageCircle size={18} /> },
  ...generateTestimonialNavItems(),
  { id: 'technical-expertise', title: 'Technical Expertise', level: 0, icon: <IconCode size={18} /> },
  ...generateExpertiseNavItems(),
];

const meta: Meta<typeof BioPage> = {
  title: 'Pages/03-Bio',
  component: BioPage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'responsive',
    },
  },
} satisfies Meta<typeof BioPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default story shows the complete Bio page with all sections.
 * This is exactly how it will appear in the actual application.
 */
export const Default: Story = {
  args: {
    id: 'bio',
  },
};

/**
 * Desktop view of the Bio page.
 */
export const Desktop: Story = {
  args: {
    id: 'bio',
  },
  name: 'Desktop (Default)',
};

/**
 * Mobile view of the Bio page.
 */
export const Mobile: Story = {
  args: {
    id: 'bio',
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
 * Tablet view of the Bio page.
 */
export const Tablet: Story = {
  args: {
    id: 'bio',
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: { disable: true },
  },
  name: 'Tablet (iPad)',
}; 