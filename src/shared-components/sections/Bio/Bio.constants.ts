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

// Closing paragraphs that appear after the icon grid
export const CLOSING_PARAGRAPHS: ReactNode = React.createElement(
  React.Fragment,
);

// Main bio content with detailed story
export const BIO_CONTENT: ReactNode = React.createElement(
  React.Fragment,
  null,
  React.createElement(
    'p',
    null,
    "David Mieloch isn't your typical software architect. He's a full-stack developer and team lead with a secret weapon: a lifelong immersion in the world of music. From a childhood surrounded by professional musicians to his own award-winning compositions, David's journey has been one of intricate structures and creative expression – a journey that led him naturally to the world of software architecture."
  ),
  React.createElement(
    'h3',
    null,
    "Early Life and Musical Foundations"
  ),
  React.createElement(
    'p',
    null,
    "At West Chester University, David earned a degree in Music Theory and Composition (2003-2008), honing his ability to deconstruct complex systems, recognize patterns, and create elegant solutions. He mastered classical percussion and jazz drumset, developing discipline, precision, and improvisational skills – all equally valuable in a coding environment. His secondary instruments included piano, guitar, tabla, and, significantly, computer. This early exploration of music technology foreshadowed his future, blending artistic creativity with technical prowess."
  ),
  React.createElement(
    'h3',
    null,
    "Composition and Creative Ventures"
  ),
  React.createElement(
    'p',
    null,
    "David's musical talents extended far beyond academic exercises. He won multiple awards for his orchestral works, demonstrating a knack for crafting intricate, layered systems – a skill directly transferable to designing robust and scalable software architectures. He studied composition with Rick Hall, a connection fostered by Philadelphia tabla legend Lenny Seidman, deepening his understanding of musical structure and form. His creative output was remarkably diverse: he wrote original music for musical theatre, created several works for choreographed modern dance productions, and earned professional readings and recordings of several chamber music and string orchestra pieces. He also founded and managed \"The Absurdist Revolution,\" a music organization at West Chester University, designing and presenting large-scale, theatrical productions."
  ),
  React.createElement(
    'p',
    null,
    "David recognizes a profound similarity between programming music and programming code. Both involve a precise sequence of instructions that must be followed correctly to achieve the desired outcome. He approaches both with an iterative process: writing, testing, refining, and repeating until the result is perfected. Just as a musical score for live musicians can become incredibly complex, requiring clear and accurate articulation of musical intentions for each instrument in a way that performers can readily understand, software code must be written not only to be executed by a computer but also to be read, understood, and modified by human developers. This dual requirement – functionality for the machine and clarity for humans – is central to David's approach to both music and software architecture. This clean code must be able to be read by other developers, just as a complex score must be able to be played by an orchestra."
  ),
  React.createElement(
    'h3',
    null,
    "A Bridge to Technology: Sales and Marketing"
  ),
  React.createElement(
    'p',
    null,
    "While his father pursued Electrical Engineering at Drexel, solidifying the family's connection to both artistic and technical excellence, David found his own technical calling, initially exploring tech sales and marketing. This experience provided invaluable insights into client needs, communication, and the broader business landscape – skills crucial for a software architect who must understand and address business requirements."
  ),
  React.createElement(
    'h3',
    null,
    "Return to Engineering and Software Expertise"
  ),
  React.createElement(
    'p',
    null,
    "David then made a decisive return to his technical roots, completing intensive programs at Flatiron School and channeling his passion for structure and problem-solving into mastering technologies like React.js, React Native, Node.js, and a wide range of other tools (as evidenced by his extensive skillset, from GraphQL to cloud platforms). He's not just a coder; he's a builder, a leader, and a mentor, spearheading technology adoption strategies and fostering a culture of technical excellence."
  ),
  React.createElement(
    'h3',
    null,
    "Professional Achievements and Architectural Approach"
  ),
  React.createElement(
    'p',
    null,
    "David's experience isn't limited to theory. He's led the development of complex web and mobile applications at Scala, Inc. He architected a Photoshop-like design tool for digital signage using the Scala Cloud Platform. He contributed to open-source projects and even built tools to enhance developer workflows (AI Context Generator, Code Companion). He also was the tech lead for the award-winning React Native app, Master A Million™, a companion app for a toy sold in GameStop stores worldwide. He brings the same meticulous attention to detail, iterative refinement, and collaborative spirit to software architecture that he honed through years of musical practice and performance. He understands that a well-designed system, like a well-composed symphony, is a harmonious blend of independent parts working together to achieve a powerful and unified whole."
  ),
  React.createElement(
    'h3',
    null,
    "A Unique Perspective"
  ),
  React.createElement(
    'p',
    null,
    "David's background isn't just a collection of skills; it's a unique perspective. He sees the parallels between orchestrating a musical performance and architecting a complex software system. He understands the importance of both the big picture and the smallest detail, the creative spark and the rigorous execution. If you're looking for a software architect who can bring both artistry and technical mastery to your project, let's connect."
  )
);


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