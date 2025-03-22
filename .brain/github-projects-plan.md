# GitHub Projects Development Plan

## HIGHEST PRIORITY: Critical Fixes

### Routing System
- [ ] Fix the routing system to avoid port conflicts and "address already in use" errors
  - [x] Updated dev script to use port 4000 instead of 3001
  - [x] Updated storybook to use port 7000 instead of 6006
  - [x] Added killports script to package.json
- [ ] Ensure consistent redirects from the root path to `/enterprise-ai-development-framework`
- [ ] Fix broken navigation links
- [ ] Verify all routes render properly without errors

### Animation Library Migration

The goal is to use only CSS transitions (for simple animations) and React Spring (for more complex ones). 

Completed:
- [x] Bio - migrated to CSS transitions and React Spring
  - [x] Fixed Bio.animations.ts to use React Spring instead of Framer Motion
  - [x] Sub-components were already using React Spring
- [x] BestPractices - migrated to CSS transitions
  - [x] DetailedContent subcomponent - migrated to CSS transitions
  - [x] Conclusion subcomponent - migrated to CSS transitions
  - [x] Categories subcomponent - was already using CSS transitions
  - [x] CategoryCard subcomponent - was already using CSS transitions
- [x] TeamCard - migrated to React Spring
- [x] QuoteGrid - migrated to React Spring
- [x] ProjectShowcase - migrated to React Spring
- [x] FeatureHighlight - migrated to React Spring
- [x] SkillsShowcase - migrated to React Spring
- [x] Carousel - migrated to React Spring
- [x] TimelineSection - migrated to React Spring
- [x] StatsComparison - migrated to CSS transitions
- [x] ComparisonTable - migrated to CSS transitions
- [x] AiSkepticToExpert - migrated to CSS transitions
- [x] RealWorldImpact - removed Framer Motion animations completely

Still Using Framer Motion:
- [ ] ProcessFlow - complex animation, planned for React Spring
- [ ] ContactForm - simple animation, planned for CSS transitions
- [ ] NavigationMenu - simple animation, planned for CSS transitions
- [ ] BrainGardenOverview - complex animation, planned for React Spring

Progress:
- Created utility functions to convert Framer Motion animations to React Spring and CSS transitions
- Developed a migration strategy for complex components like RealWorldImpact
- Established patterns for implementing intersection observers for CSS-based animations
- Standardized approach for transitioning from inline styles to class-based animations
- Completed migration of multiple components from Framer Motion to both CSS transitions and React Spring
- Downgraded framer-motion from 12.5.0 to 10.18.0 to resolve compatibility issues with React 19
- Completely removed Framer Motion from RealWorldImpact component
- Fixed Bio.animations.ts to use React Spring instead of Framer Motion references

### TypeScript Error Resolution
- [ ] Fix TypeScript errors throughout the codebase
  - [ ] Address type mismatches in components like WhitePaper
  - [ ] Fix component prop type errors
  - [ ] Resolve missing property errors

## Phase 1: Core Components and Layout

### Atomic Components
- [x] Button Component
  - [x] Base component implementation
  - [x] Styling with styled-components
  - [x] Types and props interface
  - [x] Storybook stories
  - [x] Barrel export

- [ ] Card Component
  - [ ] Base component implementation
  - [ ] Styling with styled-components
  - [ ] Types and props interface
  - [ ] Storybook stories
  - [ ] Barrel export

- [ ] Typography Component
  - [ ] Base component implementation
  - [ ] Styling with styled-components
  - [ ] Types and props interface
  - [ ] Storybook stories
  - [ ] Barrel export

### Data Structure & Integration
- [ ] Create data model for repositories
  - [ ] Define Repository interface and types
  - [ ] Implement mock data for development
  - [ ] Create data fetching utility for GitHub API

- [ ] Implement repository filtering
  - [ ] Filter by language
  - [ ] Filter by stars
  - [ ] Filter by date updated
  - [ ] Search by name/description

### Layout Components
- [ ] Header Component
  - [ ] Responsive design
  - [ ] Navigation links
  - [ ] Theme toggle

- [ ] Footer Component
  - [ ] Social links
  - [ ] Copyright info
  - [ ] Additional navigation

## Phase 2: Feature Components

### Repository Display
- [ ] RepoCard Component
  - [ ] Repository info display
  - [ ] Star/fork/issue counts
  - [ ] Language indicator
  - [ ] Updated date

- [ ] RepoGrid Component
  - [ ] Grid layout for repositories
  - [ ] Pagination or infinite scroll
  - [ ] Empty state
  - [ ] Loading state

### User Profile
- [ ] ProfileHeader Component
  - [ ] Avatar
  - [ ] Bio
  - [ ] Statistics

- [ ] ActivityTimeline Component
  - [ ] Recent activity visualization
  - [ ] Contribution graph

## Phase 3: Pages and Integration

### Pages
- [ ] Home Page
  - [ ] Hero section
  - [ ] Featured repositories
  - [ ] User profile summary

- [ ] Repository Details Page
  - [ ] Extended repository info
  - [ ] README display
  - [ ] Contributors list
  - [ ] Commit history

### Integration
- [ ] GitHub API Integration
  - [ ] Authentication
  - [ ] Rate limiting handling
  - [ ] Error handling

- [ ] State Management
  - [ ] Setup state management (Redux or Context)
  - [ ] Repository data caching
  - [ ] User preferences persistence

## Phase 4: Performance & Polish

### Performance
- [ ] Lazy loading for components
- [ ] Image optimization
- [ ] Bundle size optimization

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Focus management

### User Experience
- [ ] Loading skeletons
- [ ] Animations and transitions
- [ ] Error states and recovery

## Phase 5: Testing & Deployment

### Testing
- [ ] Unit tests for components
- [ ] Integration tests for pages
- [ ] End-to-end tests for critical flows

### Deployment
- [ ] CI/CD pipeline setup
- [ ] Environment configuration
- [ ] Analytics integration

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

### Completed Tasks

1. ✅ Set up Next.js project with TypeScript
2. ✅ Configure styled-components with SSR support
3. ✅ Create basic page layout and header components
4. ✅ Implement routing with Next.js App Router
5. ✅ Add Storybook for component development
6. ✅ Set up project organization structure
7. ✅ Create first version of Repo Card component
8. ✅ Add basic grid layout for repository display
9. ✅ Set up Header navigation with active state highlighting
10. ✅ Fixed animation issues in the WhitePaper component using styled-components instead of react-spring

### Current Task

- Implement Repo Details page with tabbed interface

### Upcoming Tasks

1. Create GitHub API integration for fetching repository data
2. Implement search functionality for repositories
3. Add filtering options for repository list
4. Create user profile page showing contribution statistics
5. Add dark mode toggle and styling
6. Implement responsive design improvements
7. Add pagination for repository listings
8. Create dashboard view with repository statistics
9. Add authentication with GitHub OAuth
10. Implement project preview for repositories with README parsing
11. Add repository starring/bookmarking functionality
12. Create notification system for repository updates
13. Implement repository comparison feature
14. Add CI/CD integration status display
15. Create contribution graph visualization
16. Implement repository dependency visualization
17. Add collaborative features for team repositories
18. Create export functionality for repository data
19. Implement analytics dashboard for repository insights
20. Add integration with project management tools

### Next Steps

1. Complete the Repo Details page implementation
2. Begin API integration work
3. Enhance styling and responsiveness

### Technical Debt

1. Improve error handling in components
2. Refactor animation utilities to use styled-components for better consistency
3. Fix webpack configuration issues to improve build times
4. Review and optimize bundle sizes