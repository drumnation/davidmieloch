# Feature Task Plan

## Feature: Floating Video Player

## Task: Create a floating video player component that follows users while scrolling

## Status: ⭕ Planning

## Last Updated: 2024-05-01

## Related Documentation:
- Feature Index: ../../../../docs/features/floating-video-player/floating-video-player.index.md
- Technical Details Doc: ../../../../docs/features/floating-video-player/technical-details.md

## 1. Overview

Create a responsive floating video player component that transitions a YouTube video to a smaller player in the bottom-right corner when a user scrolls past the original media section to the testimonials section. The floating player should maintain the same video playback state while allowing the user to continue reading testimonials.

## 2. Codebase Analysis

### 2.1. Key Files & Modules

* `src/shared-components/sections/Bio/Bio.tsx`: Main Bio component that contains the FeaturedMedia and Testimonials sections
* `src/shared-components/sections/Bio/Bio.constants.ts`: Contains the MEDIA_ITEMS array with YouTube video data
* `src/shared-components/sections/Bio/Bio.styles.ts`: Contains the styled components for the Bio section
* `src/shared-components/sections/Bio/sub-components/FeaturedMedia/FeaturedMedia.tsx`: Component that renders the YouTube videos
* `src/shared-components/sections/Bio/sub-components/Testimonials/Testimonials.tsx`: Testimonials section that appears below the media section
* `src/utils/animations/migration-helpers.ts`: Contains animation utilities that might be useful

### 2.2. Dependencies

* `framer-motion`: Current animation library used in the project
* `styled-components`: CSS-in-JS library used for styling components
* `react`: Core React library with hooks like useState, useEffect, useRef

### 2.3. Potential Concerns

* Ensuring that the floating player maintains the same video that is currently playing
* Handling the transition smoothly without interrupting video playback
* Ensuring the floating player doesn't interfere with other UI elements
* [ ] Mark as addressed

## 3. Architectural Considerations

### 3.1. Selected Paradigm

* React Context + Hooks - A Context can maintain the state of which video is playing across components, while hooks can manage intersection observation and animation states.
* [ ] Confirmed with the user

### 3.2. Selected Design Patterns

* Observer Pattern (via Intersection Observer API) - To detect when the user scrolls past the original video player.
* [ ] Confirmed with the user
* Provider Pattern - To share state about the currently playing video across components.
* [ ] Confirmed with the user

### 3.3. Architectural Considerations & Rationale

The floating video player feature requires tracking which video is currently playing and the scroll position relative to the video and testimonials sections. We'll use the Intersection Observer API to efficiently detect when the original video player leaves the viewport, triggering the floating player to appear.

Using a React Context makes sense here since we need to share state (current playing video) between separate components (original media player and floating player). This maintains a single source of truth about which video is playing.

We'll create:
1. A `VideoPlayerContext` to track which video is currently playing
2. A custom hook `useFloatingVideo` that manages the floating player state, position, and animations
3. A `FloatingVideoPlayer` component that renders the minimized player when appropriate

This architecture separates concerns, promotes reusability, and maintains a clean component structure without unnecessary prop drilling.

* [ ] Confirmed with the user

## 4. Project Task List Foresight

### 4.1. Downstream Impacts

* The floating video player could be reused for other video content elsewhere in the website
* This feature could be extended to support other media types in the future
* [ ] Reviewed and confirmed no negative impacts

### 4.2. Future-Proofing Considerations

* Design the video context and hooks to be generic enough for future reuse
* Allow for customization of the floating player size, position, and behavior
* Include options to close/dismiss the floating player
* [ ] Discussed with the user and incorporated feedback

## 5. Testing Strategy

### 5.1. Available Testing Options

* `[x] Unit Tests`
    * Location: `src/__tests__/unit`
    * Command to run all tests: `npm test` or `npm run test:unit`
    * Command to run a single test: `npm test -- -t "test name"`
    * Relevant Knowledge: `Read .brain/knowledge/unit-testing-guide` (if applicable)
* `[x] Integration Tests`
    * Location: `src/__tests__/integration`
    * Command to run all tests: `npm run test:integration`
    * Command to run a single test: `npm run test:integration -- -t "test name"`
    * Relevant Knowledge: `Read .brain/knowledge/integration-testing-guide` (if applicable)
* `[ ] End-to-End (E2E) Tests`
    * Location: Not applicable for this feature
    * Command to run all tests: N/A
    * Command to run a single test: N/A
    * Relevant Knowledge: N/A
* `[x] Visual Regression Tests (Storybook)`
    * Location: `src/shared-components/organisms/FloatingVideoPlayer/FloatingVideoPlayer.stories.tsx`
    * Command to run tests: `npm run storybook`
    * Relevant Knowledge: `.brain/knowledge/storybook-visual-testing-guide`
* `[x] Storybook Interaction Tests`
    * Location: `src/shared-components/organisms/FloatingVideoPlayer/FloatingVideoPlayer.stories.tsx`
    * Command to run tests: `npm run storybook:test`
    * Relevant Knowledge: `.brain/knowledge/storybook-interaction-testing-guide`

### 5.2. Selected Testing Approach

We will focus on unit tests, Storybook visual tests, and Storybook interaction tests for this feature. Unit tests will validate the core logic of the context and hooks, while Storybook tests will confirm the visual appearance and interactions of the component. This approach provides good coverage without overcomplicating the testing process.

* [ ] Confirmed testing approach aligns with project standards.

## 6. MECE Task Breakdown & TDD Plan

### 6.1. Subtask 1: Create VideoPlayerContext

* `[ ]` Task completed.
* `[ ]` Test cases:
  * Test that the context can store and update the currently playing video
  * Test that the context provides the correct initial state
  * Test that the context properly updates when a new video is selected
* `[ ]` Test cases reviewed and approved.
* Relevant Knowledge: `React Context API`
* Testing Type: Unit

### 6.2. Subtask 2: Implement useFloatingVideo custom hook

* `[ ]` Task completed.
* `[ ]` Test cases:
  * Test hook returns correct state based on intersection observer
  * Test hook properly calculates position for the floating player
  * Test transition states are correctly updated based on scroll position
* `[ ]` Test cases reviewed and approved.
* Relevant Knowledge: `Intersection Observer API, React Hooks`
* Testing Type: Unit

### 6.3. Subtask 3: Create FloatingVideoPlayer component

* `[ ]` Task completed.
* `[ ]` Test cases:
  * Test component renders correctly when a video is playing
  * Test component doesn't render when no video is playing
  * Test appearance/disappearance animations work correctly
  * Test the floating player maintains the same video that was playing in the original player
* `[ ]` Test cases reviewed and approved.
* Relevant Knowledge: `Framer Motion, Styled Components`
* Testing Type: Storybook Visual/Interaction

### 6.4. Subtask 4: Integrate FloatingVideoPlayer with FeaturedMedia and Bio components

* `[ ]` Task completed.
* `[ ]` Test cases:
  * Test integration between FeaturedMedia and FloatingVideoPlayer components
  * Test that playing a video in FeaturedMedia and scrolling down triggers the floating player
  * Test that the floating player updates when a different video is selected
* `[ ]` Test cases reviewed and approved.
* Testing Type: Integration

### 6.5. Subtask 5: Add controls and UX improvements to FloatingVideoPlayer

* `[ ]` Task completed.
* `[ ]` Test cases:
  * Test close button properly dismisses the floating player
  * Test maximize button returns user to the original video location
  * Test that player remains visible while scrolling through testimonials
  * Test that player is properly responsive on different screen sizes
* `[ ]` Test cases reviewed and approved.
* Testing Type: Storybook Interaction 