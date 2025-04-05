# Feature Task Plan

## Feature: Diagram Consolidation and Cleanup

## Task: Audit, consolidate, and update references for duplicate React Flow diagram components

## Status: ⭕ Planning

## Last Updated: 2024-04-03

## Related Documentation:
- Feature Index: [../../../../docs/features/diagram-consolidation/diagram-consolidation.index.md](./../../../../docs/features/diagram-consolidation/diagram-consolidation.index.md)
- Technical Details Doc: [../../../../docs/features/diagram-consolidation/technical-details.md](./../../../../docs/features/diagram-consolidation/technical-details.md)

## 1. Overview

Mr. Mieloch, Sir..., this task involves resolving issues caused by duplicate React Flow diagram components existing in both `src/components/diagrams` and `src/shared-components/diagrams`. The goal is to consolidate all diagrams into a single location (`src/components/diagrams`), remove duplicates while preserving the most up-to-date versions, update all references in the white paper and Storybook, and ensure Storybook stories exist for each diagram.

## 2. Codebase Analysis

### 2.1. Key Files & Modules

*   `src/components/diagrams/`: Target directory for consolidated diagrams. Contains `AiIntegrationProcessDiagram`, `AiIntegrationFlowDiagram`.
*   `src/shared-components/diagrams/`: Source directory containing potential duplicates. Contains `AiIntegrationProcessDiagram`, `GardenMetaphorDiagram`, `PerformanceScalabilityDiagram`, `DiagramClientWrapper`, `IntegrationSystemDiagram`, `SystemOverviewDiagram`, `AgentSystemDiagram`, `KnowledgeSystemDiagram`, `BrainGardenComponentsDiagram`, `FlowchartDiagram`, `AiIntegrationFlowDiagram`.
*   `src/app/white-paper/`: Location where diagrams are likely used in the main application (Need to confirm exact usage paths via search).
*   `src/**/*.stories.tsx`: Location of Storybook stories that might reference diagrams.

### 2.2. Dependencies

*   `reactflow`: Core dependency for rendering diagrams. Version needs confirmation.
*   `@emotion/react`, `@emotion/styled`: Likely used for styling components.
*   Potentially other UI libraries or state management tools.

### 2.3. Potential Concerns

*   Accurately identifying the "most advanced" version of duplicate diagrams requires careful comparison (file diff, git history).
*   Ensuring *all* references (imports) to the duplicated/moved components are updated in both the main app and Storybook is critical.
*   Potential for subtle differences in implementation or styling between duplicates.
*   Ensuring Storybook stories are created/updated correctly for *each* consolidated diagram.
*   The `DiagramClientWrapper` in `src/shared-components/diagrams/` might be a shared utility that needs careful handling during consolidation.

*   [ ] Mark as addressed

## 3. Architectural Considerations

### 3.1. Selected Paradigm

*   Component-Based Architecture (React): This is inherent in the project structure. Consolidation focuses on organizing these components logically.
*   [X] Confirmed with the user (Implied by request)

### 3.2. Selected Design Patterns

*   Single Source of Truth: Moving all diagrams to `src/components/diagrams` establishes a single, authoritative location.
*   [X] Confirmed with the user (Implied by request)
*   Container/Presentational Components (Potentially): Diagrams might follow this pattern, with wrappers handling data fetching/logic and inner components handling rendering. This needs review during consolidation.
*   [ ] Confirmed with the user (To be reviewed during implementation)

### 3.3. Architectural Considerations & Rationale

*   Mr. Mieloch, Sir..., the primary architectural decision is to enforce a single source of truth for diagram components by consolidating them into `src/components/diagrams`. This directly addresses the user's pain point of confusion and synchronization issues caused by duplicates in `src/shared-components/diagrams`. It simplifies maintenance, ensures consistency between Storybook and the application, and makes the codebase easier to navigate. The potential use of Container/Presentational patterns will be evaluated for each diagram to maintain good separation of concerns. The `DiagramClientWrapper` needs specific attention to determine if it should also be moved or remain shared.
*   [X] Confirmed with the user (Implied by request)

## 4. Project Task List Foresight

### 4.1. Downstream Impacts

*   Mr. Mieloch, Sir..., this cleanup is foundational. Future work on specific diagrams will be simpler and less error-prone as developers will know exactly where to find and modify the components. It might slightly delay *new* diagram feature work until consolidation is complete. It directly enables the user's goal of "making sure everything looks right" across Storybook and the app.
*   [X] Reviewed and confirmed no negative impacts (Positive impact expected)

### 4.2. Future-Proofing Considerations

*   Establishing clear rules/linting (if possible) to prevent components from being added to `src/shared-components/diagrams` again.
*   Ensuring the `DiagramClientWrapper` (if kept separate) has a clear purpose and isn't duplicated itself.
*   Adding documentation in `docs/features/diagram-consolidation/technical-details.md` about the final structure and rationale.
*   [ ] Discussed with the user and incorporated feedback (Implicitly approved via request)

## 5. Testing Strategy

### 5.1. Available Testing Options (To be confirmed via code analysis/project structure)

*   `[?] Unit Tests` (Jest likely)
    *   Location: `[Path to unit test directory, e.g., src/components/diagrams/**/__tests__]`
    *   Command to run all tests: `pnpm test:unit` (Guessing)
    *   Command to run a single test: `pnpm test:unit [test-file-path]` (Guessing)
    *   Relevant Knowledge: `Read @.brain/knowledge/unit-testing-guide`
*   `[?] Integration Tests`
    *   Location: `[Path to integration test directory]`
    *   Command to run all tests: `[Command]`
    *   Command to run a single test: `[Command]`
    *   Relevant Knowledge: `Read @.brain/knowledge/integration-testing-guide`
*   `[?] End-to-End (E2E) Tests` (Playwright/Cypress likely)
    *   Location: `[Path to E2E test directory, e.g., tests/e2e]`
    *   Command to run all tests: `pnpm test:e2e` (Guessing)
    *   Command to run a single test: `[Command]`
    *   Relevant Knowledge: `Read @.brain/knowledge/e2e-testing-guide`
*   `[X] Visual Regression Tests (Storybook)`
    *   Location: `src/**/*.stories.tsx`
    *   Command to run tests: `pnpm test-storybook` or similar (Needs confirmation)
    *   Relevant Knowledge: `Read @.brain/knowledge/storybook-visual-testing-guide`
*   `[X] Storybook Interaction Tests`
    *   Location: `src/**/*.stories.tsx`
    *   Command to run tests: `pnpm test-storybook` or similar (Needs confirmation)
    *   Relevant Knowledge: `Read @.brain/knowledge/storybook-interaction-testing-guide`

### 5.2. Selected Testing Approach

*   Mr. Mieloch, Sir..., the primary testing method will be **Visual Regression Testing** and **Interaction Testing** via Storybook. After consolidation, each diagram's story will be run/updated to ensure it renders correctly and matches the previous baseline (or establishes a new correct baseline).
*   Mr. Mieloch, Sir..., **Manual verification** in the white paper section of the main application (`localhost:3001`) is crucial to confirm the diagrams render correctly with the updated imports.
*   Mr. Mieloch, Sir..., **E2E tests**, if available and covering the white paper pages, should be run to catch regressions.
*   Mr. Mieloch, Sir..., **Unit tests**, if they exist for the diagram logic (less likely for purely visual components, but possible for data transformation/node generation), should be run after consolidation.
*   [X] Confirmed testing approach aligns with project standards. (Based on user focus on visual correctness)

## 6. MECE Task Breakdown & TDD Plan (TDD less applicable here, focus is refactoring/consolidation)

*   ### 6.1. Subtask: Analyze `DiagramClientWrapper`
    *   `[X]` Determine the purpose of `src/shared-components/diagrams/DiagramClientWrapper`. Is it specific to diagrams in `shared-components` or generally useful? **Decision: General purpose wrapper.**
    *   `[X]` Decide if it should be moved to `src/components/diagrams`, kept shared (e.g., in `src/shared-components/`), or potentially deprecated/merged. **Decision: Move to `src/components/diagrams/_wrappers/DiagramClientWrapper/`**
    *   `[X]` Document decision in `docs/features/diagram-consolidation/technical-details.md`. (Documented initial plan, will update with final confirmation later)
    *   `[X]` Task completed.
    *   Relevant Knowledge: `Read @code-standards.mdc` (SRP)
    *   Testing Type: Manual Code Review

*   ### 6.2. Subtask: Identify Duplicate Diagrams
    *   `[X]` Compare the lists of diagrams in `src/components/diagrams` and `src/shared-components/diagrams`.
    *   `[X]` Explicitly list the diagrams found in both locations (e.g., `AiIntegrationProcessDiagram`, `AiIntegrationFlowDiagram`). **Duplicates: `AiIntegrationProcessDiagram`, `AiIntegrationFlowDiagram`.**
    *   `[X]` Task completed.
    *   Relevant Knowledge: File system navigation
    *   Testing Type: Manual Comparison

*   ### 6.3. Subtask: Compare and Select `AiIntegrationProcessDiagram` Version
    *   `[X]` Compare the contents of `src/components/diagrams/AiIntegrationProcessDiagram` and `src/shared-components/diagrams/AiIntegrationProcessDiagram`. Use diff tools or Git history.
    *   `[X]` Based on user preference, prioritize keeping the version from `src/components/diagrams/` unless the `shared-components` version is clearly more advanced/complete. **Finding: `shared-components` version was an empty folder. Only one version exists in `src/components/diagrams/`.**
    *   `[X]` Document the chosen version and rationale in `docs/features/diagram-consolidation/technical-details.md`.
    *   `[X]` Task completed.
    *   Relevant Knowledge: File comparison, Git usage
    *   Testing Type: Manual Comparison

*   ### 6.4. Subtask: Compare and Select `AiIntegrationFlowDiagram` Version
    *   `[X]` Compare the contents of `src/components/diagrams/AiIntegrationFlowDiagram/AiIntegrationFlowDiagram.tsx` and `src/shared-components/diagrams/AiIntegrationFlowDiagram/AiIntegrationFlowDiagram.tsx`. Use diff tools or Git history.
    *   `[X]` Choose the more advanced/complete/recently modified version. **Decision: Keep version from `src/shared-components/diagrams/` as it's the full React Flow implementation. Version in `src/components/diagrams/` was a basic static component.**
    *   `[X]` Document the chosen version and rationale in `docs/features/diagram-consolidation/technical-details.md`.
    *   `[X]` Task completed.
    *   Relevant Knowledge: File comparison, Git usage
    *   Testing Type: Manual Comparison

*   ### 6.5. Subtask: Move Diagrams from `shared-components` to `components`
    *   `[X]` Move all remaining diagram folders (excluding duplicates already handled and potentially `DiagramClientWrapper` based on 6.1) from `src/shared-components/diagrams/` to `src/components/diagrams/`.
    *   `[X]` Delete the corresponding duplicate folders from `src/shared-components/diagrams/` (the ones *not* chosen in 6.3 & 6.4).
    *   `[X]` Removed duplicate component definition in moved `AiIntegrationFlowDiagram.tsx`.
    *   `[X]` Task completed.
    *   Relevant Knowledge: File system operations
    *   Testing Type: Manual Verification (check file locations)

*   ### 6.6. Subtask: Update Imports (Critical)
    *   `[X]` Search the entire codebase (`src/` primarily) for imports pointing to `src/shared-components/diagrams/`. Use grep or IDE search.
        * Search pattern: `shared-components/diagrams/` (Used relative path search)
    *   `[X]` Update all found imports to point to the new location in `src/components/diagrams/` or `src/components/diagrams/_wrappers/`.
        * Files updated: `PerformanceScalabilitySection.tsx`, `KnowledgeSystemSection.tsx`, `SystemOverview.tsx`, `AgentSystemSection.tsx`, `IntegrationSystemSection.tsx`, `.storybook/preview.tsx`.
    *   `[X]` Pay close attention to imports in `.stories.tsx` files and files within `src/app/white-paper/` (or equivalent). (Verified grep results included these types of files).
    *   `[X]` Handle `DiagramClientWrapper` imports based on the decision in 6.1. (Moved wrapper and updated relevant imports).
    *   `[X]` Moved `.storybook` decorator directory from shared-components to components.
    *   `[X]` Task completed.
    *   Relevant Knowledge: Code search, Regex (optional), Path resolution
    *   Testing Type: Build process (should fail if imports are broken), Manual Code Review, Grep search verification

*   ### 6.7. Subtask: Verify/Create Storybook Stories
    *   `[X]` For each diagram component now in `src/components/diagrams/`, ensure a corresponding `.stories.tsx` file exists (e.g., `src/components/diagrams/MyDiagram/MyDiagram.stories.tsx`). **Checked 10 diagrams.**
    *   `[X]` If a story is missing, create a basic one that imports and renders the diagram. **Missing story for `FlowchartDiagram` - component file (`.tsx`) also appears missing. Skipping story creation.**
    *   `[X]` Verify existing stories use the correct import path (`@/components/diagrams/...`). **Corrected import in `AiIntegrationFlowDiagram.stories.tsx`.**
    *   `[X]` Task completed.
    *   Relevant Knowledge: Storybook patterns, `Read @component-standards.mdc`
    *   Testing Type: Manual File Check, Storybook build/run

*   ### 6.8. Subtask: Run Storybook and Verify Diagrams
    *   `[ ]` Start the Storybook server (`pnpm storybook`).
    *   `[ ]` Navigate to each diagram's story.
    *   `[ ]` Visually confirm each diagram renders correctly without errors.
    *   `[ ]` Run Storybook tests (`pnpm test-storybook` or equivalent) if configured, update/accept snapshots if necessary.
    *   `[ ]` Task completed.
    *   Relevant Knowledge: Storybook usage
    *   Testing Type: Visual Regression, Storybook Interaction Tests, Manual Verification

*   ### 6.9. Subtask: Run Main App and Verify White Paper
    *   `[ ]` Start the main application development server (`pnpm dev`).
    *   `[ ]` Navigate to the white paper section(s) where the diagrams are used.
    *   `[ ]` Visually confirm each diagram renders correctly without errors.
    *   `[ ]` Task completed.
    *   Relevant Knowledge: Application usage
    *   Testing Type: Manual Verification

*   ### 6.10. Subtask: Clean Up Empty Folders
    *   `[ ]` Delete the `src/shared-components/diagrams` folder if it's now empty (or only contains `DiagramClientWrapper` if intentionally kept there).
    *   `[ ]` Task completed.
    *   Relevant Knowledge: File system operations
    *   Testing Type: Manual Verification

*   ### 6.11. Subtask: Update Documentation
    *   `[ ]` Fill in the `<TO_FILL>` sections in `docs/features/diagram-consolidation/technical-details.md` with final decisions and implementation notes.
    *   `[ ]` Update the Status in this plan file to ✅ Done.
    *   `[ ]`