# Feature Task Plan

## Feature: Experience and Side Projects Visual Alignment

## Task: Standardize UI formatting and fix media display issues

## Status: ⭕ Planning

## Last Updated: 2024-08-03

## 1. Overview

This task involves aligning the visual appearance of the experiences section with the side projects section, standardizing the markdown formatting for descriptions, and fixing several UI issues with media items, particularly with sizing, button visibility, and logo display.

## 2. Codebase Analysis

### 2.1. Key Files & Modules

* `src/shared-components/sections/Experience/components/SideProjectsSection/SideProjectsSection.tsx`: Side projects display component
* `src/shared-components/sections/Experience/components/ExperienceSection/ExperienceSection.tsx`: Experience display component
* `src/shared-components/sections/Experience/components/SideProjectsSection/SideProjectsSection.constants.ts`: Side projects data
* `src/shared-components/sections/Experience/components/ExperienceSection/ExperienceSection.constants.ts`: Experience data
* `src/shared-components/sections/Experience/components/SideProjectsSection/SideProjectsSection.types.ts`: Media item type definitions

### 2.2. Dependencies

* `MarkdownRenderer`: Component used to render markdown in the side projects section
* `styled-components`: Used for styling components

### 2.3. Potential Concerns

* Ensuring consistent styling without breaking existing layouts
* Making sure media item adjustments don't cause unexpected layout shifts
* [ ] Mark as addressed

## 3. Architectural Considerations

### 3.1. Selected Paradigm

* Component-Based Architecture - Working with existing React components
* [ ] Confirmed with the user

### 3.2. Selected Design Patterns

* Atomic Design Pattern - Consistent styling and behavior across components
* [ ] Confirmed with the user
* Decorator Pattern - For enhancing media items with additional styling options
* [ ] Confirmed with the user

### 3.3. Architectural Considerations & Rationale

* We'll maintain the existing component structure while enhancing the media item rendering logic to ensure consistency. The current architecture separates concerns well, with media item rendering logic and data in distinct files. Our changes will be isolated to the rendering and styling aspects without altering the overall architecture.
* [ ] Confirmed with the user

## 4. Project Task List Foresight

### 4.1. Downstream Impacts

* Improving the visual consistency will make future feature additions more streamlined
* Standardizing markdown usage will make content updates more maintainable
* [ ] Reviewed and confirmed no negative impacts

### 4.2. Future-Proofing Considerations

* Add documentation for markdown formatting standards
* Ensure all media item types follow the same display patterns
* [ ] Discussed with the user and incorporated feedback

## 5. Testing Strategy

### 5.1. Available Testing Options

* `[ ] Visual Regression Tests (Storybook)`
    * Location: `[Storybook for Experience components]`
    * Command to run tests: `pnpm run storybook`

### 5.2. Selected Testing Approach

* Visual testing through Storybook and manual testing in the browser will be sufficient for this task since we're primarily making visual changes.
* [ ] Confirmed testing approach aligns with project standards.

## 6. MECE Task Breakdown & TDD Plan

### 6.1. Subtask 1: Update MediaItem Component Styling

* `[ ]` Task completed.
* `[ ]` Add consistent padding options to media items
* `[ ]` Ensure buttons have enough vertical space
* `[ ]` Standardize logo display with border and radius
* Relevant Knowledge: `Read about styled-components best practices`
* Testing Type: Visual/Storybook Interaction

### 6.2. Subtask 2: Standardize Description Formatting

* `[ ]` Task completed.
* `[ ]` Convert Experience bulletPoints to markdown format
* `[ ]` Update Experience components to use MarkdownRenderer
* `[ ]` Ensure consistent text sizing between sections
* Testing Type: Visual/Storybook Interaction

### 6.3. Subtask 3: Fix Coparenting Copilot and Prompt Forge Issues

* `[ ]` Task completed.
* `[ ]` Add more room below the button in Coparenting Copilot
* `[ ]` Adjust image sizing in Coparenting Copilot
* `[ ]` Fix cut-off link at bottom in Prompt Forge
* Testing Type: Visual/Storybook Interaction

### 6.4. Subtask 4: Fix Hypnosis and Music Project Management Issues

* `[ ]` Task completed.
* `[ ]` Fix cut-off button at bottom in Hypnosis
* `[ ]` Add padding to bottom of Music Project Management link
* `[ ]` Show app/company logo in Music Project Management link title
* Testing Type: Visual/Storybook Interaction

### 6.5. Subtask 5: Fix Storytime and Music Together Video Issues

* `[ ]` Task completed.
* `[ ]` Update all Storytime media items to use showLogo with border and radius
* `[ ]` Fix We Learn Music Together video width from 75% to 100%
* Testing Type: Visual/Storybook Interaction

### 6.6. Subtask 6: Test and Verify All Changes

* `[ ]` Task completed.
* `[ ]` Test in Storybook
* `[ ]` Test in main application
* `[ ]` Verify all fixes address the issues in the punch list
* Testing Type: Visual/Storybook Interaction
