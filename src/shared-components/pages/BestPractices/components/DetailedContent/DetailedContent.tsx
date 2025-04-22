"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Box, Title, Text, Code, Group } from '@mantine/core';
import { useStyles } from './DetailedContent.styles';
import { DetailedContentProps } from './DetailedContent.types';
import Image from 'next/image';

// Import icons
import {
  IconBrandReact,
  IconBrandNpm,
  IconBrandGithub,
  IconBrandTypescript
} from '@tabler/icons-react';

export const DetailedContent: React.FC<DetailedContentProps> = ({ className }) => {
  const { classes, cx } = useStyles();
  const [isVisible, setIsVisible] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-100px", threshold: 0.1 }
    );

    const currentRef = contentRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const sectionProps = (id: string) => ({
    id: id,
    style: { scrollMarginTop: '100px' },
    component: 'section',
    mb: "xl"
  });

  return (
    <Box
      ref={contentRef}
      className={cx(classes.detailedContentContainer, className, { [classes.visible]: isVisible })}
    >
      <Box {...sectionProps('bp-intro-modern')}>
        <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/react-native.svg" alt="React Native Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Modern React and React Native Best Practices</Title>
        </Group>
        <Text className={classes.detailedContentText}>
          Modern software development requires a structured approach that balances flexibility with maintainability.
          The practices outlined here represent a comprehensive strategy for building scalable applications.
        </Text>
      </Box>

      <Box {...sectionProps('bp-intro-enterprise')}>
        <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/enterprise.svg" alt="Enterprise Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Accelerating Enterprise Development</Title>
        </Group>
        <Text className={classes.detailedContentText}>
          My journey in optimizing software development for enterprise-scale React, Node.js, and TypeScript projects
          has been one of continuous learning and refinement. I&apos;ve navigated the challenges faced by growing teams,
          moving from cumbersome, outdated practices to the streamlined, highly productive workflows enabled by modern
          tooling and architectural patterns. <br /><br />The key to this transformation lies in a strategic combination of component
          design, code sharing, a robust testing strategy, and a deep understanding of the JavaScript/TypeScript ecosystem.
        </Text>
      </Box>

      <Box {...sectionProps('bp-intro-components')}>
        <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/react.svg" alt="React Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Component Architecture</Title>
        </Group>
        <Text className={classes.detailedContentText}>
          My approach to component organization starts with a fundamental question: <em>Will this component be reused across
            multiple applications or contexts?</em> For components intended for widespread reuse – UI elements like buttons,
          form fields, or data display components – I employ Atomic Design principles. <br /><br />This creates a robust library of
          foundational building blocks, promoting consistency and reducing duplication.
        </Text>
        <Text className={classes.detailedContentText}>
          However, not all components are created equal. Application-specific components, tightly coupled to a particular
          feature or workflow, often <em>don&apos;t</em> benefit from the strict constraints of Atomic Design. <br /><br />For these, a more
          traditional hierarchical structure, organized around the application&apos;s feature set, is more appropriate.
        </Text>
        <Text className={classes.detailedContentText}>
          The decision-making process is crucial. I&apos;ve developed a set of guidelines, refined over five years of practical
          application, to determine the optimal structure for each component. <br /><br />This hybrid approach – Atomic Design for
          shareable elements, hierarchical design for application-specific logic – provides the flexibility and
          maintainability needed for large-scale React applications.
        </Text>
      </Box>

      <Box {...sectionProps('bp-intro-typescript')}>
        <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/typescript.svg" alt="TypeScript Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>TypeScript Best Practices</Title>
        </Group>
        <Text className={classes.detailedContentText}>
          TypeScript is not just about adding types; it&apos;s about leveraging the type system
          to create safer, more maintainable code. Here&apos;s how I approach TypeScript:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>Be Explicit with Types</strong>: Avoid using &apos;any&apos; as much as possible
              and be explicit with types to leverage TypeScript&apos;s power.</li>
            <li><strong>Use Interfaces for Object Shapes</strong>: Interfaces are better for
              defining the shape of objects because they can be extended and merged.</li>
            <li><strong>Discriminated Unions</strong>: Use discriminated unions for complex
              state management and handling different types of data.</li>
            <li><strong>Type Guard Functions</strong>: Create type guard functions to safely
              narrow types at runtime.</li>
          </ul>
        </Box>
        <Text className={classes.detailedContentText}>
          Prettier is integrated with ESLint to handle code formatting, eliminating any subjective debates about code style.
          The key to scaling this across a monorepo is to create shared configuration packages. <br /><br />These packages define the
          ESLint, Prettier, and TypeScript rules that are used consistently across all projects within the monorepo,
          eliminating duplicated configuration and ensuring a unified development experience.
        </Text>
      </Box>

      <Box {...sectionProps('bp-intro-testing')}>
        <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/jest.svg" alt="Jest Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Testing Strategy</Title>
        </Group>
        <Text className={classes.detailedContentText}>
          Automated testing is crucial for maintaining code quality and stability, especially in the context of rapid
          iteration and generative AI. My testing strategy encompasses several layers:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>Unit Tests for Business Logic</strong>: Pure functions and business
              logic should have thorough unit tests.</li>
            <li><strong>Integration Tests for Component Trees</strong>: Test how components
              interact with each other using React Testing Library.</li>
            <li><strong>End-to-End Tests for Critical Flows</strong>: Use Cypress or Playwright
              to test critical user flows end-to-end.</li>
            <li><strong>Test Behavior, Not Implementation</strong>: Write tests that verify
              the behavior of the component, not its implementation details.</li>
          </ul>
        </Box>
        <Text className={classes.detailedContentText}>
          I generally avoid fully mounted component tests, as they often require extensive mocking and can be brittle and
          uninformative. <br /><br />The key is to develop a &quot;nose&quot; for choosing the right type of test for each situation, maximizing
          the value of the testing effort while minimizing unnecessary complexity.
        </Text>
      </Box>

      <Box {...sectionProps('bp-intro-storybook')}>
        <Group align="center" gap="md" wrap="nowrap" className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/storybook.svg" alt="Storybook Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Component Documentation with Storybook</Title>
        </Group>
        <Text className={classes.detailedContentText}>
          Documenting components is essential for reusability and collaboration. Storybook
          provides a great way to document and showcase components:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>Story Per Component Variant</strong>: Create a story for each variant
              of a component to showcase its flexibility.</li>
            <li><strong>Document Props with ArgTypes</strong>: Use ArgTypes to document the
              props that a component accepts.</li>
            <li><strong>Include Design System Guidelines</strong>: Add design system guidelines
              to help developers understand when and how to use each component.</li>
            <li><strong>Add Code Examples</strong>: Include code examples to show how to use
              the component in different contexts.</li>
          </ul>
        </Box>
        <Text className={classes.detailedContentText}>
          Developing components in Storybook often leads to more testable and well-designed components, as it forces you
          to think about their API and behavior in isolation.
        </Text>
      </Box>

      <Box {...sectionProps('bp-intro-bottleneck')}>
        <Box className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/turborepo.svg" alt="Turborepo Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Escaping the 'Shared Library' Bottleneck</Title>
        </Box>
        <Text className={classes.detailedContentText}>
          In larger organizations, shared libraries can become a bottleneck for development.
          Here&apos;s how I approach this problem:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>Monorepo with Clear Boundaries</strong>: Use a monorepo structure with
              clear boundaries between packages.</li>
            <li><strong>Focused Package Scope</strong>: Keep packages focused and small to
              reduce the surface area for changes.</li>
            <li><strong>Versioning Strategy</strong>: Use a versioning strategy that allows for
              independent package releases.</li>
            <li><strong>Automation with Turborepo</strong>: Use Turborepo to automate tasks and
              improve build performance.</li>
          </ul>
        </Box>
        <Code block className={classes.codeBlock}>
          {`// Monorepo structure with Turborepo
monorepo/
├── apps/
│   ├── web/
│   └── docs/
├── packages/
│   ├── ui/
│   ├── utils/
│   └── config/
├── package.json
└── turbo.json`}
        </Code>
      </Box>

      <Box {...sectionProps('bp-intro-quality')}>
        <Box className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/eslint.svg" alt="ESLint Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Code Quality and Consistency</Title>
        </Box>
        <Text className={classes.detailedContentText}>
          Maintaining code quality and consistency is essential for long-term maintainability.
          Here are the tools and practices I use:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>ESLint for Static Analysis</strong>: Use ESLint with a comprehensive
              configuration to catch errors and enforce coding standards.</li>
            <li><strong>Prettier for Formatting</strong>: Use Prettier to automatically format
              code to maintain consistency.</li>
            <li><strong>Husky and lint-staged</strong>: Set up pre-commit hooks with Husky and
              lint-staged to ensure code quality before committing.</li>
            <li><strong>CI/CD Integration</strong>: Integrate code quality checks into your
              CI/CD pipeline to catch issues early.</li>
          </ul>
        </Box>
        <Text className={classes.detailedContentText}>
          Prettier is integrated with ESLint to handle code formatting, eliminating any subjective debates about code style.
          The key to scaling this across a monorepo is to create shared configuration packages. These packages define the
          ESLint, Prettier, and TypeScript rules that are used consistently across all projects within the monorepo,
          eliminating duplicated configuration and ensuring a unified development experience.
        </Text>
      </Box>

      <Box {...sectionProps('bp-intro-dev-env')}>
        <Box className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/vite.svg" alt="Vite Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Development Environment Setup</Title>
        </Box>
        <Text className={classes.detailedContentText}>
          A well-configured development environment can significantly improve developer
          productivity. Here&apos;s how I set up my development environment:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>Fast Build Tools</strong>: Use Vite or Next.js for fast development server
              and builds.</li>
            <li><strong>Consistent Editor Config</strong>: Use .editorconfig and VSCode
              settings to ensure consistent editor behavior.</li>
            <li><strong>Debugging Configuration</strong>: Set up debugging configurations for
              different environments (browser, Node.js, tests).</li>
            <li><strong>Environment Variables</strong>: Use environment variables for
              configuration that changes between environments.</li>
          </ul>
        </Box>
        <Code block className={classes.codeBlock}>
          {`// VSCode settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`}
        </Code>
      </Box>

      <Box {...sectionProps('bp-intro-performance')}>
        <Box className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/vitest.svg" alt="Vitest Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Performance Optimization</Title>
        </Box>
        <Text className={classes.detailedContentText}>
          Performance is a key aspect of user experience. Here are the techniques I use to
          optimize frontend performance:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>Code Splitting</strong>: Use dynamic imports and React.lazy to split
              your code and load only what&apos;s needed.</li>
            <li><strong>Image Optimization</strong>: Use Next.js Image component or other image
              optimization techniques to reduce image size and improve loading performance.</li>
            <li><strong>Memoization</strong>: Use React.memo, useMemo, and useCallback to prevent
              unnecessary re-renders.</li>
            <li><strong>Performance Monitoring</strong>: Set up performance monitoring tools
              like Lighthouse CI to track performance metrics over time.</li>
          </ul>
        </Box>
        <Code block className={classes.codeBlock}>
          {`// Code splitting with React.lazy
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}`}
        </Code>
      </Box>

      <Box {...sectionProps('bp-intro-deps')}>
        <Box className={classes.titleWrapper}>
          <Box className={classes.sectionIcon}>
            <Image src="/icons/npm.svg" alt="NPM Icon" width={32} height={32} />
          </Box>
          <Title order={2} className={classes.detailedContentTitle}>Dependency Management</Title>
        </Box>
        <Text className={classes.detailedContentText}>
          Managing dependencies is a critical aspect of maintaining a healthy codebase.
          Here are my strategies for effective dependency management:
        </Text>
        <Box className={classes.detailedContentList}>
          <ul>
            <li><strong>Regular Dependency Updates</strong>: Regularly update dependencies to
              benefit from bug fixes and new features.</li>
            <li><strong>Dependency Evaluation</strong>: Carefully evaluate new dependencies
              before adding them to your project.</li>
            <li><strong>Lock Files</strong>: Use lock files (package-lock.json, yarn.lock,
              pnpm-lock.yaml) to ensure consistent installations.</li>
            <li><strong>Bundle Analysis</strong>: Regularly analyze your bundle size to identify
              and address large dependencies.</li>
          </ul>
        </Box>
        <Code block className={classes.codeBlock}>
          {`// Using npm-check-updates to find outdated packages
$ npx npm-check-updates

# Analyzing bundle size with webpack-bundle-analyzer
$ npx webpack-bundle-analyzer ./stats.json`}
        </Code>
      </Box>

      <Box {...sectionProps('bp-intro-summary')}>
        <Text className={classes.detailedContentText}>
          By combining technical excellence with a thoughtful, human-centered approach to development, we can create
          software that not only meets the needs of today but can adapt to the challenges of tomorrow. The future of
          development lies not just in mastering specific technologies, but in cultivating the mindset and practices
          that enable continuous improvement and adaptation.
        </Text>
      </Box>
    </Box>
  );
};

export default DetailedContent; 