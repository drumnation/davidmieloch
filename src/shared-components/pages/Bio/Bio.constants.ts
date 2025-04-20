import React, { ReactNode } from 'react';
import { MediaItem } from './Bio.types';

export const BIO_TITLE = "David Mieloch: Orchestrating Code, Composing Solutions";

// Intro paragraph that appears at the top of the bio
export const INTRO_PARAGRAPH = "With over a decade of experience in software development and technical leadership, I've had the privilege of working across a diverse range of projects and domains, from high-performance financial systems to cutting-edge machine learning applications.";

// Skills for the icon grid section
export interface SkillIcon {
  name: string;
  iconName: string;
}

export const SKILL_ICONS: SkillIcon[] = [
  { name: "Software Architecture", iconName: "IconCode" },
  { name: "System Design", iconName: "IconBuildingBridge" },
  { name: "Algorithm Development", iconName: "IconMusicCode" },
  { name: "Technical Mentorship", iconName: "IconSchool" },
  { name: "Problem Solving", iconName: "IconPuzzle" },
  { name: "Performance Optimization", iconName: "IconRocket" },
  { name: "Machine Learning", iconName: "IconBrain" },
  { name: "Data Visualization", iconName: "IconChartArcs" },
  { name: "Technical Leadership", iconName: "IconAward" },
  { name: "Innovation", iconName: "IconBulb" }
];

// Simplified structure for Bio Intro section headings and IDs
export interface BioIntroSectionInfo {
  id: string;
  heading?: string; // Optional heading
}

export const BIO_INTRO_SECTION_INFO: BioIntroSectionInfo[] = [
  { id: "bio-intro-opening" },
  { id: "bio-early-life", heading: "Early Life and Musical Foundations" },
  { id: "bio-composition", heading: "Composition and Creative Ventures" },
  { id: "bio-bridge-to-tech", heading: "A Bridge to Technology: Sales and Marketing" },
  { id: "bio-return-to-eng", heading: "Return to Engineering and Software Expertise" },
  { id: "bio-achievements", heading: "Professional Achievements and Architectural Approach" },
  { id: "bio-perspective", heading: "A Unique Perspective" }
];

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Core Technologies",
    skills: ["TypeScript", "JavaScript", "HTML", "CSS3"]
  },
  {
    name: "Frontend Development",
    skills: ["React.js", "Next.js", "Angular.js"]
  },
  {
    name: "Mobile Development",
    skills: ["React Native", "Expo", "Android", "iOS"]
  },
  {
    name: "UI & Styling",
    skills: ["Ant Design", "Material UI", "Mantine", "Styled Components", "CSS Modules", "Sass"]
  },
  {
    name: "Backend & APIs",
    skills: ["Node.js", "Express", "Firebase", "GraphQL", "RESTful APIs"]
  },
  {
    name: "State Management",
    skills: ["Redux Toolkit", "React Context", "React Hooks"]
  },
  {
    name: "Architecture",
    skills: ["Atomic Design", "Clean Code"]
  },
  {
    name: "Databases",
    skills: ["MongoDB Atlas", "PostgreSQL", "Redis"]
  },
  {
    name: "Development Tools",
    skills: ["Webpack", "Vite", "Parcel", "Babel", "ESLint", "Prettier", "Husky"]
  },
  {
    name: "Testing",
    skills: ["Jest", "Playwright", "Puppeteer", "Storybook", "Detox"]
  },
  {
    name: "DevOps & Deployment",
    skills: ["GitHub Actions", "Docker", "AWS", "Vercel", "Supabase"]
  },
  {
    name: "Extension Development",
    skills: ["Chrome Extensions", "VS Code Extensions"]
  },
  {
    name: "Monorepo Management",
    skills: ["NX", "Turbo Repo", "PNPM + Yarn Workspaces"]
  },
  {
    name: "AI Integration",
    skills: ["OpenAI API", "Claude API", "Vector Databases"]
  }
];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/PFdR2orY3g4',
    title: 'Live Performance with Oneironaught',
    description: 'Progressive metal instrumental performance featuring David on drums with Brooklyn-based band Oneironaught.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/KQsg_Iz3Ap8',
    title: 'Volcanas (Allegro)',
    description: 'Award-winning orchestral composition showcasing David\'s classical music training and orchestration skills.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/_-F-JsjnOL4',
    title: 'Sonata No.1 (Adagio)',
    description: 'A contemplative movement from David\'s first sonata, demonstrating his approach to form and emotional expression in classical composition.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/SL0jAk_a7mY',
    title: 'Sonata No.1 (Mysterioso)',
    description: 'The mysterious and evocative movement from David\'s first sonata, showcasing his ability to create compelling musical narratives.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/Az7-sY2zhxU',
    title: 'Merry Melony Episode 1',
    description: 'Original score composition for animation, demonstrating David\'s work in video game and film music.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/phfBe8sSBBM',
    title: 'The Animator and the Seat',
    description: 'Original score for animated short film, highlighting David\'s compositional versatility and storytelling through music.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/KSgeRQJn_Tw',
    title: 'Scarlet Harvest',
    description: 'Original composition for contemporary dance, demonstrating David\'s collaborative work across artistic disciplines.'
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/embed/nQZPHdVNiaQ',
    title: 'Absurdist Revolution - Mark 1',
    description: 'Theatrical music production at West Chester University, showcasing David\'s creative direction and organization skills.'
  }
];

// Define the sections for the Bio page
export const SECTIONS = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: null,
  },
  {
    id: 'featured-media',
    title: 'Featured Media',
    icon: null,
  },
  {
    id: 'technical-expertise',
    title: 'Technical Expertise',
    icon: null,
  }
]; 