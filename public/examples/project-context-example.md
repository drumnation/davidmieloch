# Project Overview: AI-Brain-Garden

**Last Updated:** 2024-03-19

## 1. Introduction

**Project Name:** AI-Brain-Garden

## 2. Problem Definition

### 2.1. Problem Statement

Software development involves a significant amount of repetitive and context-specific knowledge work. Developers often need to recall project structures, coding standards, specific technology implementations, and previous decisions. Current AI tools, while helpful, lack deep project-specific context and the ability to manage and apply project knowledge in a structured, reusable way. This leads to inefficiencies, inconsistencies, and a steep learning curve for new team members or when revisiting a project after a period of time. There is also the issue of agent management when using AI agents to develop.  The current system does not allow for multiple agents to work together in an organized manner.

### 2.2. Target Audience

This project targets software developers, particularly those working on large or complex projects, as well as teams that want to leverage AI assistance for development tasks while maintaining consistency and control. It is also for developers who want to use multiple AI agents to collaborate on development, but have no system for managing them.

### 2.3. Current Solutions and Pain Points

Current solutions include:

*   **Manual Documentation:**  Time-consuming, often incomplete, and quickly becomes outdated.
*   **General-Purpose AI Assistants (e.g., GitHub Copilot, Cursor):**  Helpful for code completion and simple tasks but lack project-specific context and customization.
*   **Ad-hoc Scripts and Notes:** Developers often create their own scripts and notes, but these are usually not well-organized, versioned, or shared effectively.
*   **Using a single agent:** When using AI agents, it is difficult to manage them, delegate tasks, and maintain development oversight when more than one is involved.

**Pain Points:**

*   Inconsistency in code style and architecture.
*   Difficulty in onboarding new team members.
*   Repetitive tasks that could be automated.
*   Loss of valuable project knowledge.
*   Limited ability to customize AI assistance to specific project needs.
*   No system for managing and coordinating multiple AI agents.

### 2.4. Evidence

*   Numerous developer surveys highlight the challenges of maintaining code quality and consistency, especially in large projects.
*   The growing popularity of AI coding assistants indicates a demand for more intelligent development tools.
*   Anecdotal evidence from our own development experience confirms the need for a system like AI-Brain-Garden.

## 3. Solution Overview

### 3.1. Solution Description

AI-Brain-Garden is a VS Code extension that provides a framework for creating and managing a project-specific "Brain." This "Brain" is a structured knowledge base that includes core templates, customizable rules, and AI agent configurations. The system uses a combination of a command-line interface (CLI), a core logic package, a dedicated prompt management package, and a project management abstraction layer to enable AI agents to assist with development tasks in a context-aware and consistent manner. The extension will facilitate the creation, management, and utilization of these "Brains" through an intuitive user interface. The extension leverages a dynamic cursorules system to determine which prompts to use in different scenarios.

### 3.2. Key Features and Functionalities

*   **Project Initialization:**  Quickly set up a new project with a pre-configured "Brain" structure.
*   **Template Management:** Create, manage, and version reusable templates for code, documentation, and other project artifacts. These are based on atomic design principles.
*   **Rule System:** Define and customize project-specific rules to guide AI interactions and enforce coding standards. Includes a dynamically generated \`cursorrules\` file.
*   **AI Agent Management:** Configure and manage AI agents with specific roles, personalities, and knowledge bases.
*   **Prompt Library:**  Access and utilize a library of pre-built and custom prompts for various development tasks, enhanced with dynamic variable substitution.
*   **GitHub Integration:**  Seamlessly integrate with GitHub Issues and Projects for task management.
*   **Context-Aware Assistance:**  Provide AI assistance that understands the project's structure, rules, and current development context.
*   **Agent-Specific Task Lists & Notes:** Automatically generate and manage task lists and notes for each agent.

### 3.3. Value Proposition

AI-Brain-Garden empowers developers to:

*   **Increase Productivity:** Automate repetitive tasks and streamline development workflows.
*   **Improve Code Quality:** Enforce coding standards and best practices through customizable rules.
*   **Enhance Collaboration:** Facilitate knowledge sharing and teamwork through a centralized knowledge base.
*   **Customize AI Assistance:** Tailor AI interactions to specific project needs and developer preferences.
*   **Manage multiple AI agents:** Coordinate and assign tasks effectively.

### 3.4. Success Metrics

*   Adoption rate of the extension among developers.
*   Reduction in time spent on repetitive tasks.
*   Improvement in code consistency and quality.
*   User satisfaction with the AI assistance.
*   Efficiency gains in task management and project planning.

## 4. Unique Differentiators

### 4.1. Competitive Landscape

Existing solutions like GitHub Copilot and Cursor provide AI code completion and assistance but lack the project-specific customization and knowledge management capabilities of AI-Brain-Garden. Other IDE extensions offer template management or task management features, but none provide a comprehensive framework for building and utilizing a project-specific "Brain" with integrated AI agents.

### 4.2. Key Differentiators

*   **Project-Specific "Brains":** AI-Brain-Garden creates a dedicated knowledge base tailored to each project, unlike generic AI assistants.
*   **Customizable Agents:**  The system allows for the creation and management of AI agents with specific roles, personalities, and knowledge.
*   **Dynamic \`cursorrules\`:** The extension uses a dynamic \`cursorrules\` system to provide context-aware AI assistance.
*   **Integrated Task Management:**  AI-Brain-Garden seamlessly integrates with GitHub Issues and Projects for task management.
*   **Atomic Design for Prompts:**  The prompt library is organized using atomic design principles for better reusability and maintainability.

### 4.3. Competitive Advantages

*   **Highly Customizable:** AI-Brain-Garden can be adapted to a wide range of projects and development workflows.
*   **Improved AI Accuracy:**  The project-specific "Brain" and agent system leads to more accurate and relevant AI assistance.
*   **Enhanced Teamwork:**  The system facilitates collaboration between developers and AI agents.
*   **Future-Proof:** The modular architecture allows for easy integration of new AI models and features.

## 5. Technology Stack

### 5.1. Proposed Technologies

*   **Frontend:** TypeScript, React (for VS Code extension UI)
*   **Backend:** Node.js (for scripts and potentially a backend service later)
*   **AI Integration:**
    *   \`openai\` (Node.js SDK for OpenAI)
    *   \`langchain\` (framework for building LLM applications)
    *   \`zod\` (schema validation)
    *   \`zod-gpt\` (integration between Zod and GPT)
    *   \`multi-llm-ts\` (for interacting with multiple LLMs)
    *   \`TypeChat\` (optional, for stricter type safety with LLM responses)
*   **Project Management:** GitHub API (\`octokit\`)
*   **Templating:** Handlebars (or similar)
*   **Version Control:** Git
*   **Other:**
    *   \`isomorphic-git\` or \`nodegit\` (for Git interaction)
    *   \`markdown-it\` or \`remark\` (for Markdown parsing)

### 5.2. Rationale

*   **TypeScript:** Provides type safety and improves code maintainability.
*   **React:**  Well-suited for building UIs within VS Code extensions and offers a component-based architecture.
*   **Node.js:**  Allows for a unified language across the project and has a vast ecosystem of libraries.
*   **OpenAI SDK, LangChain, Zod, \`multi-llm-ts\`:** These tools provide a robust and flexible way to interact with LLMs, manage prompts, and ensure structured output.
*   **GitHub API:** Enables seamless integration with GitHub for task management.
*   **Handlebars:**  A simple and efficient templating engine for prompt and file generation.
*   **Git:**  Industry-standard version control system.

## 6. User Stories

### 6.1. Developer

*   As a developer, I want to initialize a new project with a pre-configured "Brain" structure, so that I can quickly get started with AI assistance.
*   As a developer, I want to be able to define and customize project-specific rules, so that the AI assistance aligns with my project's coding standards and best practices.
*   As a developer, I want to have access to a library of reusable prompts, so that I don't have to write the same prompts repeatedly.
*   As a developer, I want to be able to create and manage AI agents with specific roles and knowledge, so that I can delegate tasks effectively.
*   As a developer, I want the AI assistance to be context-aware, so that it understands the current state of the project and the task I'm working on.
*   As a developer, I want to be able to manage tasks using GitHub Issues and Projects, so that I can track progress and collaborate with my team.
*   As a developer, I want to be able to easily update the project plan and regenerate agent task lists, so that the AI agents are always working on the most up-to-date information.

### 6.2. Project Manager

*   As a project manager, I want to be able to define the overall project plan and track its progress, so that I can ensure the project is on track.
*   As a project manager, I want to be able to assign tasks to specific AI agents, so that the work is distributed effectively.
*   As a project manager, I want to have a clear overview of the current state of the project, including active tasks, completed tasks, and any blockers.

## 7. Project Directory Structure

[Link to @.brain/directory-structure.md]

## Technical Implementation Details

### Testing Infrastructure
- End-to-end testing using @vscode/test-electron
- Isolated test environment with temporary workspace
- Smoke tests for extension presence
- Configurable test runner with proper path handling
- Package manager: pnpm for consistent dependency management

### Test Framework
- Mocha with TDD interface for test organization
- Support for unit, integration, and end-to-end tests
- Asynchronous testing capabilities
- Proper resource cleanup and management
- Isolated test environment configuration

### Test Coverage
- Extension lifecycle tests
- Command registration and execution
- Webview creation and management
- UI component testing
- Resource cleanup verification

### Testing Best Practices
- Clear test suite organization
- Descriptive test naming conventions
- Proper setup and teardown procedures
- Resource management and cleanup
- Async operation handling
- Test isolation and stability 