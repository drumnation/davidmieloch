# Technical Details: Diagram Consolidation and Cleanup

## Overview
<TO_FILL: Brief description of the feature's purpose and high-level approach. Focus on resolving duplicate diagram components between src/components/diagrams and src/shared-components/diagrams, consolidating into src/components/diagrams, and updating references in Storybook and the white paper.>

## Key Design Decisions & Rationale
<TO_FILL: Document significant choices made during planning/implementation and why.>
* Decision 1: Consolidate all diagrams into `src/components/diagrams`. Rationale: Centralizes components, reduces confusion.
* Decision 2: Prioritize keeping the version from `src/components/diagrams/AiIntegrationProcessDiagram` if duplicates exist, based on user suggestion. Rationale: User believes this might be the more advanced version.
* Decision 3: For other duplicates, compare files and keep the most recently modified/feature-complete version. Rationale: Preserve the most work.
* Decision 4: Update all imports in Storybook stories (`src/**/*.stories.tsx`) and the white paper (`src/app/white-paper/**` or similar) to point to the consolidated location. Rationale: Ensure consistency.
* Decision 5: Create separate Storybook stories for each diagram if they don't exist. Rationale: Isolate component testing and viewing.

## Implementation Notes
<TO_FILL: Add notes about complex logic, tricky parts, non-obvious dependencies, or setup requirements. E.g., challenges in comparing versions, specific import paths needing updates.>

## Usage / API (If Applicable)
<TO_FILL: How to use the consolidated diagram components.>

## Gotchas / Known Issues
<TO_FILL: Any potential pitfalls, edge cases, or unresolved minor issues. E.g., potential styling conflicts after consolidation, ensuring all references were found.> 