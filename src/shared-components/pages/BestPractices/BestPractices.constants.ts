import { PracticeCategory } from './BestPractices.types';

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  {
    title: 'Component Architecture',
    description: 'Blending Atomic and Hierarchical Design for optimal component organization',
    items: [
      {
        title: 'Atomic Design for Reusable Components',
        description: 'UI elements like buttons, form fields, or data display components employ Atomic Design principles for consistency and reduced duplication',
        icon: 'atom',
      },
      {
        title: 'Hierarchical Structure for App-Specific Components',
        description: 'Application-specific components use a traditional hierarchical structure, organized around the application&apos;s feature set',
        icon: 'hierarchy',
      },
      {
        title: 'Hybrid Approach',
        description: 'A hybrid approach provides the flexibility and maintainability needed for large-scale React applications',
        icon: 'components',
      },
    ],
  },
  {
    title: 'Monorepo Architecture',
    description: 'Embracing modern tooling for seamless code sharing and development',
    items: [
      {
        title: 'Nx & Turborepo',
        description: 'Leveraging tools like Nx and Turborepo to create a seamless development experience with instant feedback loops',
        icon: 'nx',
      },
      {
        title: 'pnpm Workspaces',
        description: 'Using pnpm workspace features to manage dependencies efficiently across multiple packages',
        icon: 'pnpm',
      },
      {
        title: 'Shared TypeScript Code',
        description: 'Changes to shared TypeScript code are immediately reflected in any application within the monorepo',
        icon: 'typescript',
      },
    ],
  },
  {
    title: 'Modern Tooling',
    description: 'Streamlining the development stack with cutting-edge tools',
    items: [
      {
        title: 'Vite over Webpack',
        description: 'Embracing Vite for its speed and simplicity, requiring minimal configuration for common project setups',
        icon: 'vite',
      },
      {
        title: 'ESLint & Prettier',
        description: 'Comprehensive set of ESLint plugins and Prettier integration for code quality and consistency',
        icon: 'eslint',
      },
      {
        title: 'Shared Configurations',
        description: 'Creating shared configuration packages for ESLint, Prettier, and TypeScript rules across all projects',
        icon: 'config',
      },
      {
        title: 'Expo for Mobile Development',
        description: 'Now officially recommended by the React Native team, Expo significantly saves development time for mobile applications',
        icon: 'expo',
      },
    ],
  },
  {
    title: 'Comprehensive Testing',
    description: 'A multi-layered approach to ensure code quality and stability',
    items: [
      {
        title: 'Vitest for Unit Testing',
        description: 'Favoring Vitest over Jest for its speed, native TypeScript support, and simpler configuration',
        icon: 'vitest',
      },
      {
        title: 'Playwright for E2E Testing',
        description: 'Using Playwright for end-to-end testing due to its robust features and cross-browser support',
        icon: 'playwright',
      },
      {
        title: 'Storybook for Visual Testing',
        description: 'Leveraging Storybook for component development, documentation, and visual regression testing',
        icon: 'storybook',
      },
    ],
  },
  {
    title: 'CI/CD Pipeline',
    description: 'Automating quality checks and deployment processes',
    items: [
      {
        title: 'GitHub Actions',
        description: 'Integrating all tools into a CI/CD pipeline using GitHub Actions for automated builds and tests',
        icon: 'github',
      },
      {
        title: 'Pre-commit Hooks',
        description: 'Using Husky to run linting, formatting, and tests before allowing a commit',
        icon: 'husky',
      },
      {
        title: 'Mandatory Code Reviews',
        description: 'Requiring code reviews and passing tests before a pull request can be merged',
        icon: 'review',
      },
    ],
  },
  {
    title: 'Incremental Adoption',
    description: 'A pragmatic approach to implementing best practices',
    items: [
      {
        title: 'Prioritize High-Value Areas',
        description: 'Start with areas that offer the most immediate value, like basic linting and formatting',
        icon: 'priority',
      },
      {
        title: 'Gradual TypeScript Migration',
        description: 'Using "any" as a temporary placeholder when migrating JavaScript to TypeScript',
        icon: 'migration',
      },
      {
        title: 'Focus on Critical Workflows',
        description: 'Writing a few key E2E tests for critical workflows before expanding test coverage',
        icon: 'workflow',
      },
    ],
  },
]; 