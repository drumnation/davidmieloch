# GitHub Projects Portfolio Plan

## Overview
This document outlines the development plan for the GitHub projects portfolio page, which will showcase repositories and code examples in an organized, filterable interface. The page will display both public repositories and information about private work in a visually appealing manner.

## Task List

### 1. Project Setup & Infrastructure

- [x] Create new route `/code-examples` for GitHub projects
  - [x] Add page file in pages directory
  - [x] Configure navigation to include new route
  - [x] Set up basic page template with header and footer

- [x] Create initial Storybook setup for GitHub components
  - [x] Set up Storybook category for GitHub projects components
  - [x] Configure shared theme and styling for GitHub components stories
  - [x] Ensure stories and main app use identical providers and setup

### 2. Atomic Components Development

#### Atoms
- [x] Create `Tag` component
  - [x] Component implementation (Tag.tsx)
  - [x] Styling (Tag.styles.ts)
  - [x] Types (Tag.types.ts)
  - [x] Stories (Tag.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `Badge` component for stars, forks, etc.
  - [x] Component implementation (Badge.tsx)
  - [x] Styling (Badge.styles.ts)
  - [x] Types (Badge.types.ts)
  - [x] Stories (Badge.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `LanguageDot` component for language indicators
  - [x] Component implementation (LanguageDot.tsx)
  - [x] Styling (LanguageDot.styles.ts)
  - [x] Types (LanguageDot.types.ts)
  - [x] Stories (LanguageDot.stories.tsx)
  - [x] Barrel export (index.ts)

- [ ] Create `Button` component for repository actions
  - [ ] Component implementation (Button.tsx)
  - [ ] Styling (Button.styles.ts)
  - [ ] Types (Button.types.ts)
  - [ ] Stories (Button.stories.tsx)
  - [ ] Barrel export (index.ts)

#### Molecules
- [x] Create `RepoCard` component for displaying single repository
  - [x] Component implementation (RepoCard.tsx)
  - [x] Styling (RepoCard.styles.ts)
  - [x] Types (RepoCard.types.ts)
  - [x] Logic (RepoCard.logic.ts)
  - [x] Stories (RepoCard.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `FilterItem` component for individual filter options
  - [x] Component implementation (FilterItem.tsx)
  - [x] Styling (FilterItem.styles.ts)
  - [x] Types (FilterItem.types.ts)
  - [x] Stories (FilterItem.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `SearchInput` component for repository search
  - [x] Component implementation (SearchInput.tsx)
  - [x] Styling (SearchInput.styles.ts)
  - [x] Types (SearchInput.types.ts)
  - [x] Hook (SearchInput.hook.ts)
  - [x] Stories (SearchInput.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `PrivateWorkCard` component for showcasing closed-source work
  - [x] Component implementation (PrivateWorkCard.tsx)
  - [x] Styling (PrivateWorkCard.styles.ts)
  - [x] Types (PrivateWorkCard.types.ts)
  - [x] Stories (PrivateWorkCard.stories.tsx)
  - [x] Barrel export (index.ts)

#### Organisms
- [x] Create `RepoGrid` component for repository layout
  - [x] Component implementation (RepoGrid.tsx)
  - [x] Styling (RepoGrid.styles.ts)
  - [x] Types (RepoGrid.types.ts)
  - [x] Logic (RepoGrid.logic.ts)
  - [x] Hook (RepoGrid.hook.ts)
  - [x] Stories (RepoGrid.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `FilterBar` component for repository filtering
  - [x] Component implementation (FilterBar.tsx)
  - [x] Styling (FilterBar.styles.ts)
  - [x] Types (FilterBar.types.ts)
  - [x] Logic (FilterBar.logic.ts)
  - [x] Hook (FilterBar.hook.ts)
  - [x] Stories (FilterBar.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `PrivateWorkSection` component for closed-source projects
  - [x] Component implementation (PrivateWorkSection.tsx)
  - [x] Styling (PrivateWorkSection.styles.ts)
  - [x] Types (PrivateWorkSection.types.ts)
  - [x] Stories (PrivateWorkSection.stories.tsx)
  - [x] Barrel export (index.ts)

- [x] Create `StatsOverview` component for repository statistics
  - [x] Component implementation (StatsOverview.tsx)
  - [x] Styling (StatsOverview.styles.ts)
  - [x] Types (StatsOverview.types.ts)
  - [x] Logic (StatsOverview.logic.ts)
  - [x] Stories (StatsOverview.stories.tsx)
  - [x] Barrel export (index.ts)

#### Templates
- [x] Create `GitHubPortfolioTemplate` for page layout
  - [x] Component implementation (GitHubPortfolioTemplate.tsx)
  - [x] Styling (GitHubPortfolioTemplate.styles.ts)
  - [x] Types (GitHubPortfolioTemplate.types.ts)
  - [x] Stories (GitHubPortfolioTemplate.stories.tsx)
  - [x] Barrel export (index.ts)

### 3. Data Structure & Integration

- [ ] Create data model for repositories
  - [ ] Define Repository interface and types
  - [ ] Create mock data for initial development
  - [ ] Implement data fetching logic for GitHub API

- [ ] Create data model for private work
  - [ ] Define PrivateWork interface and types
  - [ ] Create sample private work content

- [ ] Create data model for filters
  - [ ] Define Filter interface and types
  - [ ] Implement filter generation from repository data

### 4. Feature Implementation

- [ ] Implement repository grid with responsive layout
  - [ ] Display 3-5 initial repositories
  - [ ] Implement responsive grid for different screen sizes
  - [ ] Add loading states and error handling

- [ ] Implement filtering and search functionality
  - [ ] Create filter by language
  - [ ] Create filter by project type
  - [ ] Create text search functionality
  - [ ] Implement filter state management

- [ ] Implement repository detail expansion
  - [ ] Create expandable repository cards
  - [ ] Add additional repository details in expanded view
  - [ ] Add smooth animations for expansion/collapse

- [ ] Implement private work showcase
  - [ ] Create engaging description of private work
  - [ ] Add details about technologies and achievements
  - [ ] Design visual elements to highlight skills

### 5. Testing & Refinement

- [ ] Test components in isolation via Storybook
  - [ ] Test all components across different viewport sizes
  - [ ] Verify component behavior with different data inputs
  - [ ] Test edge cases (empty repos, long descriptions, etc.)

- [ ] Test integrated page
  - [ ] Verify all components work together correctly
  - [ ] Test filtering and search functionality
  - [ ] Test responsive behavior
  - [ ] Test accessibility features

- [ ] Optimize performance
  - [ ] Implement code splitting where appropriate
  - [ ] Optimize image loading and rendering
  - [ ] Add lazy loading for repository data

### 6. Documentation & Deployment

- [ ] Document components and their usage
  - [ ] Create comprehensive Storybook documentation
  - [ ] Add code comments where necessary

- [ ] Deploy and integrate with main site
  - [ ] Verify navigation works correctly
  - [ ] Test page load performance
  - [ ] Add analytics tracking if applicable

## Implementation Approach

1. **Start with MVP (Minimum Viable Portfolio)**
   - Begin with a simple structure and 3-5 representative repositories
   - Implement basic filtering functionality
   - Create a placeholder for private work section

2. **Iterative Enhancement**
   - Add more repositories as needed
   - Enhance UI with more sophisticated visualizations
   - Refine filtering categories based on the full repository set
   - Test with users and refine based on feedback

3. **Testing & Optimization**
   - Test component integration
   - Verify responsive behavior
   - Optimize performance
   - Ensure accessibility compliance


# Links to repos

ts-hot-react-vscode-starter
Took me a while to setup vscode-extension to actually hotreload react so I opened sourced it as a starter.
https://github.com/drumnation/ts-hot-react-vscode-starter

ai-context-generator
Vscode plugin I made to quickly package up a file tree and all the code from a folder for pasting to LLMs.
https://github.com/drumnation/ai-context-generator

prompt-forge
Developer tool I made and use for saving and enhancing prompts.
https://github.com/drumnation/prompt-forge

model-maestro
Quick project to try and determine the correct model to use by the prompt.
https://github.com/drumnation/model-maestro

browser-use-cli (fork)
Added complete CLI access so I could teach cursor to use the browser agent as a tool.
https://github.com/drumnation/browser-use-cli

cursor-directory-structure-ts
Typescript library that tracks folder structure in a file in your repo for AI context. Uses gemini to provide folder and file descriptions to further enhance usefulness.
https://github.com/drumnation/cursor-directory-structure-ts

game-sage
Weekend project that uses electron and chatgpt to read your screen while you play video games and get on the fly feedback about what to do in the game.
https://github.com/drumnation/game-sage

react-native-cross-platform-responsive-dimensions
Back in the day I made this library to help with shifting requirements for various difference mobile screen sizes.
https://github.com/drumnation/react-native-cross-platform-responsive-dimensions

react-native-reactjs-quiz-challenges
Several years old, but at one point I used this as an example of React and React Native development. Patterns are a bit dated now.
https://github.com/drumnation/react-native-reactjs-quiz-challenges

spotify-js-bindings
I started building a library of spotify js bindings to help me with various weekend projects involving the spotify api.
https://github.com/drumnation/spotify-js-bindings

BeatSaber2Ragnarock
Fork and rewrite in TS with tests for a set of scripts that convert Beat Sabre levels to the Viking Metal game Ragnarok.
https://github.com/drumnation/BeatSaber2Ragnarock

react-midi-sequencer
Group project at Flatiron school. We built a midi sequencer in a web browser in order to play piano rolls and write music.
https://github.com/drumnation/react-midi-sequencer

javascript-es6-design-patterns
A collection of es6 design patterns to play around with and reference
https://github.com/drumnation/javascript-es6-design-patterns

ai-code-helper
experimental tool for automatically generating unit tests for functions.
https://github.com/drumnation/ai-code-helper