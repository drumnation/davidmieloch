"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  DetailedContentContainer,
  DetailedContentTitle,
  DetailedContentText,
  DetailedContentList
} from './DetailedContent.styles';
import { DetailedContentProps } from './DetailedContent.types';

export const DetailedContent: React.FC<DetailedContentProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);
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
      <DetailedContentTitle>Modern Development Best Practices</DetailedContentTitle>
      <DetailedContentText>
        Modern software development requires a structured approach that balances flexibility with maintainability. 
        The practices outlined here represent a comprehensive strategy for building scalable applications.
      </DetailedContentText>
      
      <DetailedContentTitle>Accelerating Enterprise Development</DetailedContentTitle>
      <DetailedContentText>
        My journey in optimizing software development for enterprise-scale React, Node.js, and TypeScript projects 
        has been one of continuous learning and refinement. I&apos;ve navigated the challenges faced by growing teams, 
        moving from cumbersome, outdated practices to the streamlined, highly productive workflows enabled by modern 
        tooling and architectural patterns. The key to this transformation lies in a strategic combination of component 
        design, code sharing, a robust testing strategy, and a deep understanding of the JavaScript/TypeScript ecosystem.
      </DetailedContentText>
      
      <DetailedContentTitle>Component Architecture</DetailedContentTitle>
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
      
      <DetailedContentTitle>Escaping the &quot;Shared Library&quot; Bottleneck</DetailedContentTitle>
      <DetailedContentText>
        Sharing code between multiple React applications initially presented a significant hurdle. The standard practice 
        involved creating a separate repository for the shared library, compiling it (typically with a bundler like 
        Webpack or Rollup), and publishing it to a package registry (npm). This <em>did</em> enable code reuse, but the 
        developer experience was, to put it mildly, <em>painful</em>.
      </DetailedContentText>
      
      <DetailedContentText>
        Testing changes to shared components became a major impediment. We&apos;d write elaborate watch scripts that attempted 
        to synchronize compiled code between the library and consuming applications. Developers would often resort to 
        manually copying and pasting compiled output directly into <code>node_modules</code> – a fragile and error-prone 
        workaround. The constant need to increment package versions for even the smallest changes across multiple 
        applications led to significant technical debt. Teams would inevitably fall behind on updates, leading to 
        inconsistent versions and potential conflicts. We were forced to choose between true modularity and the 
        crippling overhead of managing the shared library.
      </DetailedContentText>
      
      <DetailedContentTitle>The Monorepo Solution</DetailedContentTitle>
      <DetailedContentText>
        The advent of tools like Nx, Turborepo, and pnpm (with its powerful workspace feature), coupled with the 
        adoption of the monorepo pattern, fundamentally changed the game. These tools were <em>specifically designed</em> 
        to address the shortcomings of the traditional multi-repository approach.
      </DetailedContentText>
      
      <DetailedContentText>
        My current workflow leverages these tools to create a seamless development experience. Shared React components, 
        Node.js utilities, and TypeScript types all reside <em>within</em> the same repository as the consuming applications. 
        Crucially, there&apos;s no compilation step required for sharing. Changes to the shared TypeScript code are 
        <em>immediately</em> reflected in any application within the monorepo that depends on it. This instant feedback 
        loop is transformative.
      </DetailedContentText>
      
      <DetailedContentText>
        This efficiency unlocked a new level of modularity. What started with shared UI components expanded to include 
        shared TypeScript interfaces and types, reusable Node.js backend services, common data fetching logic, shared 
        state management (e.g., using Redux or Zustand), and even entire feature-specific libraries (like an admin panel). 
        Breaking down the codebase into these smaller, well-defined modules significantly improved code clarity, reduced 
        the risk of unintended side effects, and made the entire system easier to reason about.
      </DetailedContentText>
      
      <DetailedContentTitle>Streamlining the Stack</DetailedContentTitle>
      <DetailedContentText>
        Modernization isn&apos;t just about architectural patterns; it&apos;s also about choosing the right tools for the job. 
        The JavaScript ecosystem is constantly evolving, and embracing newer tools can dramatically reduce complexity 
        and improve developer productivity.
      </DetailedContentText>
      
      <DetailedContentText>
        One prime example is the shift from Webpack to Vite. While Webpack was once the industry standard for bundling, 
        its configuration could become incredibly complex. Vite, with its focus on speed and simplicity, offers a 
        significantly better developer experience, often requiring minimal or no configuration for common project setups. 
        This reduction in boilerplate is a huge win for developer productivity.
      </DetailedContentText>
      
      <DetailedContentTitle>Automated Code Quality</DetailedContentTitle>
      <DetailedContentText>
        Automated linting and formatting are essential for maintaining code quality and consistency, especially in large 
        teams. I&apos;ve cultivated a comprehensive set of ESLint plugins over the years, going beyond basic syntax checks to 
        enforce best practices, optimize code style, and even catch potential accessibility issues. This includes rules for:
      </DetailedContentText>
      
      <DetailedContentList>
        <ul>
          <li><strong>Alphabetical Ordering:</strong> Automatically sorts object keys and CSS-in-JS style properties for consistency and readability.</li>
          <li><strong>Import Management:</strong> Optimizes and cleans up import statements, removing unused imports and enforcing a consistent import order.</li>
          <li><strong>Accessibility:</strong> Identifies potential accessibility violations in JSX, helping to ensure inclusive design.</li>
        </ul>
      </DetailedContentList>
      
      <DetailedContentText>
        Prettier is integrated with ESLint to handle code formatting, eliminating any subjective debates about code style. 
        The key to scaling this across a monorepo is to create shared configuration packages. These packages define the 
        ESLint, Prettier, and TypeScript rules that are used consistently across all projects within the monorepo, 
        eliminating duplicated configuration and ensuring a unified development experience.
      </DetailedContentText>
      
      <DetailedContentTitle>Comprehensive Automated Testing</DetailedContentTitle>
      <DetailedContentText>
        Automated testing is crucial for maintaining code quality and stability, especially in the context of rapid 
        iteration and generative AI. My testing strategy encompasses several layers:
      </DetailedContentText>
      
      <DetailedContentList>
        <ul>
          <li><strong>Unit Tests:</strong> Best suited for pure functions and low-level business logic that can be tested in isolation. I favor Vitest over Jest for its speed, native TypeScript support, and simpler configuration.</li>
          <li><strong>Integration Tests:</strong> Focus on verifying the interactions between different parts of the application (e.g., components and services). Mocking should be used judiciously; excessive mocking often indicates that a unit test might be a better fit.</li>
          <li><strong>End-to-End (E2E) Tests:</strong> Simulate real user interactions with the application, testing the entire flow from the UI to the backend and database. I prefer Playwright for E2E testing due to its robust features, cross-browser support, and excellent developer experience. Even a small number of well-crafted E2E tests can provide significant confidence in the overall stability of the application.</li>
          <li><strong>Visual Regression Tests:</strong> Using Storybook&apos;s snapshot testing capabilities, these tests detect unintended visual changes in UI components. This is particularly important for shared components in a monorepo, where a visual regression can impact multiple applications.</li>
        </ul>
      </DetailedContentList>
      
      <DetailedContentText>
        I generally avoid fully mounted component tests, as they often require extensive mocking and can be brittle and 
        uninformative. The key is to develop a &quot;nose&quot; for choosing the right type of test for each situation, maximizing 
        the value of the testing effort while minimizing unnecessary complexity.
      </DetailedContentText>
      
      <DetailedContentTitle>Storybook: Development, Documentation, and Testing</DetailedContentTitle>
      <DetailedContentText>
        Storybook plays a crucial role in my development workflow. It serves as:
      </DetailedContentText>
      
      <DetailedContentList>
        <ul>
          <li><strong>A Component Development Environment:</strong> Allows for building and testing UI components in isolation, accelerating development and promoting modularity.</li>
          <li><strong>Living Documentation:</strong> Provides a visual catalog of all available components, making it easy for developers (and AI) to discover and understand how to use them.</li>
          <li><strong>A Testing Platform:</strong> Supports interaction testing and visual regression testing, ensuring that components behave and appear as expected.</li>
        </ul>
      </DetailedContentList>
      
      <DetailedContentText>
        Developing components in Storybook often leads to more testable and well-designed components, as it forces you 
        to think about their API and behavior in isolation.
      </DetailedContentText>
      
      <DetailedContentTitle>Continuous Integration and Continuous Delivery (CI/CD)</DetailedContentTitle>
      <DetailedContentText>
        To ensure code quality and automate the deployment process, I integrate all these tools into a CI/CD pipeline 
        using GitHub Actions. This includes:
      </DetailedContentText>
      
      <DetailedContentList>
        <ul>
          <li><strong>Pre-commit Hooks (using Husky):</strong> Run linting, formatting, and a subset of tests (e.g., unit tests) <em>before</em> allowing a commit. This prevents common errors from ever entering the codebase.</li>
          <li><strong>Automated Builds and Tests on Pull Requests:</strong> When a pull request is created or updated, GitHub Actions automatically builds the application, runs the full test suite (including E2E tests), and reports the results directly in the pull request. This provides rapid feedback and prevents merging code that breaks existing functionality.</li>
          <li><strong>Mandatory Code Reviews and Passing Tests:</strong> GitHub is configured to require code reviews and passing tests before a pull request can be merged, ensuring code quality and preventing accidental regressions.</li>
        </ul>
      </DetailedContentList>
      
      <DetailedContentTitle>Incremental Adoption</DetailedContentTitle>
      <DetailedContentText>
        It&apos;s important to emphasize that implementing all of these practices is a gradual process. It&apos;s not necessary 
        (or even desirable) to try to achieve perfection overnight. A pragmatic approach involves:
      </DetailedContentText>
      
      <DetailedContentList>
        <ul>
          <li><strong>Prioritizing:</strong> Start with the areas that offer the most immediate value. For example, setting up basic linting and formatting, or writing a few key E2E tests for critical workflows.</li>
          <li><strong>Incremental Improvement:</strong> Gradually expand the test suite, refine linting rules, and adopt more advanced tooling as the project matures.</li>
          <li><strong>&quot;Any&quot; as an Escape Hatch (Temporarily):</strong> When migrating a JavaScript project to TypeScript, using <code>any</code> as a temporary placeholder allows you to get the benefits of TypeScript without having to fix all type errors immediately. Gradually replace <code>any</code> with specific types over time.</li>
          <li><strong>Focusing on &quot;Long Chain&quot; E2E Tests Initially:</strong> While shorter, more isolated E2E tests are ideal, writing a few longer tests that cover a broad range of functionality can provide significant initial coverage.</li>
        </ul>
      </DetailedContentList>
      
      <DetailedContentText>
        The goal is to continuously improve the development workflow, balancing the need for defensive measures 
        (testing, linting) with the desire to deliver new features.
      </DetailedContentText>
      
      <DetailedContentTitle>Learning from the Past: A Case Study in Outdated Practices</DetailedContentTitle>
      <DetailedContentText>
        A brief but impactful experience on a project struggling to meet deadlines provided a stark contrast to the 
        modern workflows I had developed. The lead developer, despite being highly intelligent, was relying on processes 
        and tooling that were 15-20 years out of date. This served as a powerful lesson in the importance of continuous 
        learning and adaptation in the rapidly evolving world of software development.
      </DetailedContentText>
      
      <DetailedContentText>
        Their project was unnecessarily split into <em>twelve</em> separate Git repositories, each representing a different 
        &quot;library.&quot; Every feature development required ensuring all twelve repositories were synchronized – a constant 
        source of friction and potential errors. Instead of leveraging TypeScript&apos;s built-in type safety, the codebase 
        was littered with hundreds of manually written JavaScript type guards, a brittle and incomplete attempt to 
        achieve the same goal.
      </DetailedContentText>
      
      <DetailedContentText>
        The frontend, built on an old version of Angular (which, while a powerful framework, highlighted the importance 
        of staying current), suffered from massive code duplication. There was no concept of reusable components or a 
        shared design system. Every feature reimplemented similar logic, services, and UI elements, leading to an 
        incredibly bloated and difficult-to-maintain codebase. The creation of a simple modal dialog required duplicating 
        ten separate files – a clear indicator of systemic inefficiencies.
      </DetailedContentText>
      
      <DetailedContentText>
        This experience reinforced the value of the architectural principles I had adopted: TypeScript&apos;s strong typing, 
        modular design, a hybrid approach to component architecture (Atomic where appropriate), the monorepo strategy, 
        and a comprehensive testing and CI/CD pipeline. It demonstrated, in a very concrete way, how crucial these 
        elements are for building maintainable, scalable, and high-quality software.
      </DetailedContentText>
    </DetailedContentContainer>
  );
}; 