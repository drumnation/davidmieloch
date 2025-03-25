"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  DetailedContentContainer,
  DetailedContentTitle,
  DetailedContentText,
  DetailedContentList,
  TitleWrapper,
  SectionIcon,
  SectionTitle,
  SectionSubtitle,
  TextContent,
  ListContent,
  ListItem,
  CodeBlock,
  IconWrapper,
  TitleWithIconWrapper
} from './DetailedContent.styles';
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
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <DetailedContentContainer
      ref={contentRef}
      className={`${className} ${isVisible ? 'visible' : ''}`}
    >
      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/react-native.svg" alt="React Native Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Modern React and React Native Best Practices</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          Modern software development requires a structured approach that balances flexibility with maintainability. 
          The practices outlined here represent a comprehensive strategy for building scalable applications.
        </DetailedContentText>
      </section>
      
      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/enterprise.svg" alt="Enterprise Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Accelerating Enterprise Development</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          My journey in optimizing software development for enterprise-scale React, Node.js, and TypeScript projects 
          has been one of continuous learning and refinement. I&apos;ve navigated the challenges faced by growing teams, 
          moving from cumbersome, outdated practices to the streamlined, highly productive workflows enabled by modern 
          tooling and architectural patterns. The key to this transformation lies in a strategic combination of component 
          design, code sharing, a robust testing strategy, and a deep understanding of the JavaScript/TypeScript ecosystem.
        </DetailedContentText>
      </section>
      
      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/react.svg" alt="React Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Component Architecture</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          My approach to component organization starts with a fundamental question: <em>Will this component be reused across 
          multiple applications or contexts?</em> For components intended for widespread reuse – UI elements like buttons, 
          form fields, or data display components – I employ Atomic Design principles. This creates a robust library of 
          foundational building blocks, promoting consistency and reducing duplication.
        </DetailedContentText>
        
        <DetailedContentText>
          However, not all components are created equal. Application-specific components, tightly coupled to a particular 
          feature or workflow, often <em>don&apos;t</em> benefit from the strict constraints of Atomic Design. For these, a more 
          traditional hierarchical structure, organized around the application&apos;s feature set, is more appropriate.
        </DetailedContentText>
        
        <DetailedContentText>
          The decision-making process is crucial. I&apos;ve developed a set of guidelines, refined over five years of practical 
          application, to determine the optimal structure for each component. This hybrid approach – Atomic Design for 
          shareable elements, hierarchical design for application-specific logic – provides the flexibility and 
          maintainability needed for large-scale React applications.
        </DetailedContentText>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/typescript.svg" alt="TypeScript Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>TypeScript Best Practices</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          TypeScript is not just about adding types; it's about leveraging the type system
          to create safer, more maintainable code. Here's how I approach TypeScript:
        </DetailedContentText>
        
        <DetailedContentList>
          <ul>
            <li><strong>Be Explicit with Types</strong>: Avoid using 'any' as much as possible
              and be explicit with types to leverage TypeScript's power.</li>
            <li><strong>Use Interfaces for Object Shapes</strong>: Interfaces are better for
              defining the shape of objects because they can be extended and merged.</li>
            <li><strong>Discriminated Unions</strong>: Use discriminated unions for complex
              state management and handling different types of data.</li>
            <li><strong>Type Guard Functions</strong>: Create type guard functions to safely
              narrow types at runtime.</li>
          </ul>
        </DetailedContentList>
        
        <DetailedContentText>
          Prettier is integrated with ESLint to handle code formatting, eliminating any subjective debates about code style. 
          The key to scaling this across a monorepo is to create shared configuration packages. These packages define the 
          ESLint, Prettier, and TypeScript rules that are used consistently across all projects within the monorepo, 
          eliminating duplicated configuration and ensuring a unified development experience.
        </DetailedContentText>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/jest.svg" alt="Jest Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Testing Strategy</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          Automated testing is crucial for maintaining code quality and stability, especially in the context of rapid 
          iteration and generative AI. My testing strategy encompasses several layers:
        </DetailedContentText>
        
        <DetailedContentList>
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
        </DetailedContentList>
        
        <DetailedContentText>
          I generally avoid fully mounted component tests, as they often require extensive mocking and can be brittle and 
          uninformative. The key is to develop a &quot;nose&quot; for choosing the right type of test for each situation, maximizing 
          the value of the testing effort while minimizing unnecessary complexity.
        </DetailedContentText>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/storybook.svg" alt="Storybook Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Component Documentation with Storybook</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          Documenting components is essential for reusability and collaboration. Storybook
          provides a great way to document and showcase components:
        </DetailedContentText>
        
        <DetailedContentList>
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
        </DetailedContentList>
        
        <DetailedContentText>
          Developing components in Storybook often leads to more testable and well-designed components, as it forces you 
          to think about their API and behavior in isolation.
        </DetailedContentText>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/turborepo.svg" alt="Turborepo Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Escaping the 'Shared Library' Bottleneck</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          In larger organizations, shared libraries can become a bottleneck for development.
          Here's how I approach this problem:
        </DetailedContentText>
        
        <DetailedContentList>
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
        </DetailedContentList>
        
        <CodeBlock>
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
        </CodeBlock>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/eslint.svg" alt="ESLint Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Code Quality and Consistency</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          Maintaining code quality and consistency is essential for long-term maintainability.
          Here are the tools and practices I use:
        </DetailedContentText>
        
        <DetailedContentList>
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
        </DetailedContentList>
        
        <DetailedContentText>
          Prettier is integrated with ESLint to handle code formatting, eliminating any subjective debates about code style. 
          The key to scaling this across a monorepo is to create shared configuration packages. These packages define the 
          ESLint, Prettier, and TypeScript rules that are used consistently across all projects within the monorepo, 
          eliminating duplicated configuration and ensuring a unified development experience.
        </DetailedContentText>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/vite.svg" alt="Vite Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Development Environment Setup</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          A well-configured development environment can significantly improve developer
          productivity. Here's how I set up my development environment:
        </DetailedContentText>
        
        <DetailedContentList>
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
        </DetailedContentList>
        
        <CodeBlock>
        {`// VSCode settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`}
        </CodeBlock>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/vitest.svg" alt="Vitest Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Performance Optimization</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          Performance is a key aspect of user experience. Here are the techniques I use to
          optimize frontend performance:
        </DetailedContentText>
        
        <DetailedContentList>
          <ul>
            <li><strong>Code Splitting</strong>: Use dynamic imports and React.lazy to split
              your code and load only what's needed.</li>
            <li><strong>Image Optimization</strong>: Use Next.js Image component or other image
              optimization techniques to reduce image size and improve loading performance.</li>
            <li><strong>Memoization</strong>: Use React.memo, useMemo, and useCallback to prevent
              unnecessary re-renders.</li>
            <li><strong>Performance Monitoring</strong>: Set up performance monitoring tools
              like Lighthouse CI to track performance metrics over time.</li>
          </ul>
        </DetailedContentList>
        
        <CodeBlock>
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
        </CodeBlock>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <Image src="/icons/npm.svg" alt="NPM Icon" width={32} height={32} />
          </SectionIcon>
          <DetailedContentTitle>Dependency Management</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          Managing dependencies is a critical aspect of maintaining a healthy codebase.
          Here are my strategies for effective dependency management:
        </DetailedContentText>
        
        <DetailedContentList>
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
        </DetailedContentList>
        
        <CodeBlock>
        {`// Using npm-check-updates to find outdated packages
$ npx npm-check-updates

# Analyzing bundle size with webpack-bundle-analyzer
$ npx webpack-bundle-analyzer ./stats.json`}
        </CodeBlock>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                src="/icons/ai-synergy.svg" 
                alt="AI Synergy Icon" 
                width={32} 
                height={32} 
                priority={true}
              />
            </div>
          </SectionIcon>
          <DetailedContentTitle>The Synergy of AI and Modern Development Practices</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          The integration of AI tools into the development workflow represents a significant paradigm shift in how we 
          approach software engineering. When properly leveraged, these tools can dramatically increase developer productivity 
          while maintaining code quality and consistency.
        </DetailedContentText>
        
        <DetailedContentList>
          <ul>
            <li><strong>AI-Assisted Development</strong>: Use AI tools like GitHub Copilot or Claude for code 
              generation and problem solving while maintaining critical oversight.</li>
            <li><strong>Automated Code Reviews</strong>: Leverage AI-powered code analysis tools to catch bugs, 
              security vulnerabilities, and style inconsistencies before they reach human reviewers.</li>
            <li><strong>Knowledge Augmentation</strong>: Use AI to quickly explore and understand unfamiliar 
              APIs, frameworks, or codebases, reducing the learning curve for new technologies.</li>
            <li><strong>Balanced Approach</strong>: Maintain a balance between AI assistance and human expertise, 
              using AI as a tool to enhance rather than replace developer judgment.</li>
          </ul>
        </DetailedContentList>
        
        <DetailedContentText>
          The key to successful AI integration lies in understanding its strengths and limitations. AI excels at pattern recognition, 
          code generation based on examples, and identifying potential issues across large codebases. However, it still requires 
          human oversight for architectural decisions, security-critical implementations, and ensuring business logic correctness.
        </DetailedContentText>
      </section>

      <section>
        <TitleWrapper>
          <SectionIcon>
            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                src="/icons/future.svg" 
                alt="Future Icon" 
                width={32} 
                height={32} 
                priority={true}
              />
            </div>
          </SectionIcon>
          <DetailedContentTitle>Conclusion: Building for the Future</DetailedContentTitle>
        </TitleWrapper>
        <DetailedContentText>
          The development approaches and best practices outlined in this guide represent a culmination of 
          years of experience in building complex, scalable applications across various domains. However, 
          the field of software development is constantly evolving, and adaptation is key to long-term success.
        </DetailedContentText>
        
        <DetailedContentList>
          <ul>
            <li><strong>Continuous Learning</strong>: Stay curious and committed to ongoing education in emerging 
              technologies, methodologies, and best practices.</li>
            <li><strong>Pragmatic Adoption</strong>: Evaluate new tools and approaches based on their actual value 
              to your projects, not just their popularity or novelty.</li>
            <li><strong>Sustainable Practices</strong>: Focus on building systems that can be maintained and evolved 
              over time, balancing innovation with stability.</li>
            <li><strong>Community Engagement</strong>: Contribute to and learn from the broader development community 
              through open source, knowledge sharing, and collaboration.</li>
          </ul>
        </DetailedContentList>
        
        <DetailedContentText>
          By combining technical excellence with a thoughtful, human-centered approach to development, we can create 
          software that not only meets the needs of today but can adapt to the challenges of tomorrow. The future of 
          development lies not just in mastering specific technologies, but in cultivating the mindset and practices 
          that enable continuous improvement and adaptation.
        </DetailedContentText>
      </section>
      
      {/* Let's Work Together section - moved to the very bottom */}
      <section>
        <TitleWrapper>
          <SectionIcon>
            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                src="/icons/collaboration.svg" 
                alt="Collaboration Icon" 
                width={32} 
                height={32} 
                priority={true}
              />
            </div>
          </SectionIcon>
          <DetailedContentTitle>Let's Work Together</DetailedContentTitle>
        </TitleWrapper>
        
        <DetailedContentText>
          Establishing effective best practices within your organization is a collaborative journey that requires
          both expertise and practical experience. Whether you're just starting to modernize your development
          processes or looking to refine your existing practices, working with experienced partners can
          accelerate your progress and help avoid common pitfalls.
        </DetailedContentText>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          padding: '24px',
          marginTop: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            marginTop: '0',
            marginBottom: '16px',
            color: '#343a40'
          }}>How We Can Help Your Organization</h3>
          
          <DetailedContentList>
            <ul>
              <li><strong>Custom Best Practices Framework</strong>: Develop tailored best practices that align with your organization's specific needs, culture, and technical ecosystem.</li>
              <li><strong>Team Training & Workshops</strong>: Equip your development teams with the knowledge and skills needed to implement modern practices effectively.</li>
              <li><strong>Implementation Support</strong>: Get hands-on assistance with setting up monorepos, CI/CD pipelines, testing strategies, and other key infrastructure.</li>
              <li><strong>Ongoing Consultation</strong>: Access expert guidance as you refine and evolve your practices to meet new challenges.</li>
            </ul>
          </DetailedContentList>
          
          <div style={{
            textAlign: 'center',
            marginTop: '24px'
          }}>
            <a href="/contact" style={{
              display: 'inline-block',
              backgroundColor: '#805AD5',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '4px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease-in-out'
            }}>
              Schedule a Consultation
            </a>
          </div>
        </div>
        
        <DetailedContentText>
          Every organization's journey is unique, but the destination of efficient, high-quality software
          development is universal. Let's collaborate to establish a foundation of best practices that will
          empower your teams and drive your business forward in today's competitive landscape.
        </DetailedContentText>
      </section>
    </DetailedContentContainer>
  );
};

export default DetailedContent; 