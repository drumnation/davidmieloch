# Migration from Mermaid.js to React Flow

## Overview

This document outlines the plan to migrate from the current Mermaid.js diagram implementation to React Flow, addressing the performance and rendering issues with the current implementation while ensuring a consistent design and user experience.

## Diagram Types to Migrate

Based on the codebase analysis, we need to support the following types of diagrams:

1. Flowcharts (`flowchart TD`, `flowchart LR`) 
2. Sequence Diagrams (`sequenceDiagram`)
3. Graph Diagrams (`graph TD`)
4. Potentially others used in the application

## Diagrams to Convert

We have identified 8 diagrams to be converted from Mermaid.js to React Flow. See the [migration tracking documentation](../src/shared-components/diagrams/migration-tracking/00-MermaidToReactFlowMigration.md) for details on each diagram.

## Task List

### Phase 1: Setup and Research (1-2 days) - COMPLETED

- [x] Install React Flow and dependencies
  ```bash
  pnpm add @xyflow/react
  ```
- [x] Create a new folder structure for the React Flow component
  ```
  src/shared-components/molecules/ReactFlowDiagram/
  ├── index.ts
  ├── ReactFlowDiagram.tsx
  ├── ReactFlowDiagram.styles.ts
  ├── ReactFlowDiagram.types.ts
  ├── ReactFlowDiagram.hook.ts
  ├── ReactFlowDiagram.stories.tsx
  └── utils/
      ├── index.ts
      ├── mermaidToReactFlow.ts
      └── nodeTypes/
  ```
- [x] Research and document React Flow's node and edge customization capabilities
- [x] Study the current theme and styling requirements for diagrams

### Phase 2: Proof of Concept (2-3 days) - COMPLETED

- [x] Create a basic ReactFlowDiagram component with the same props interface as MermaidDiagram
- [x] Implement a parser utility to convert Mermaid syntax to React Flow nodes and edges
  - [x] Support for flowchart syntax parsing
  - [x] Support for sequence diagram syntax parsing
  - [x] Support for graph syntax parsing
- [x] Create custom node types that match the visual style of current diagrams
- [x] Implement theming support to match the current 'default', 'dark', 'forest', and 'neutral' themes
- [x] Add zoom controls similar to the current implementation
- [x] Implement accessibility features

### Phase 3: Diagram Conversion - First Pass (Current Phase)

The goal of this phase is to convert all diagrams to React Flow with basic functionality, focusing on:
1. Creating the diagram components with proper node/edge structure
2. Ensuring they render in Storybook
3. Implementing basic layout and connections

- [x] ~~Finalize the ReactFlowDiagram component~~ (Sufficient for initial conversion)
- [x] Create comprehensive Storybook stories for all diagram types
- [x] Configure Storybook for diagram testing
- [x] Create tracking files for each diagram that needs to be migrated
- [ ] CURRENT TASK: Implement the basic conversion of all remaining diagrams
  - [x] Knowledge System Diagram
    - [x] Create component structure
    - [x] Define nodes and connections
    - [x] Create simple Storybook story
  - [x] Performance Scalability Diagram
    - [x] Create component structure
    - [x] Define nodes and connections
    - [x] Create simple Storybook story
  - [x] Agent System Diagram
    - [x] Create component structure
    - [x] Define nodes and connections
    - [x] Create simple Storybook story
  - [x] System Overview Diagram
    - [x] Create component structure
    - [x] Define nodes and connections
    - [x] Create simple Storybook story
  - [x] Integration System Diagram
    - [x] Create component structure
    - [x] Define nodes and connections
    - [x] Create simple Storybook story
  - [x] AI Integration Process Diagram *(Working in Storybook, minor spacing/sizing issues to fix)*
  - [x] Brain Garden Components Diagram *(Working in Storybook, minor spacing/sizing issues to fix)*
  - [x] Garden Metaphor Diagram *(Working in Storybook, minor spacing/sizing issues to fix)*
    - [x] Create component structure
    - [x] Define nodes and connections
    - [x] Create simple Storybook story

### Phase 4: Diagram Refinement - Second Pass

Once all diagrams are converted and working in Storybook, we'll make a second pass to:
1. Fix spacing, sizing, and layout issues
2. Apply consistent styling across all diagrams
3. Ensure proper theme compatibility
4. Address any performance issues

- [ ] Refine the existing diagrams:
  - [ ] AI Integration Flow Diagram
    - [ ] Fix container width issues
    - [ ] Adjust spacing between nodes
    - [ ] Ensure optimal flow layout
  - [ ] Brain Garden Components Diagram
    - [ ] Refine node positioning
    - [ ] Fix layout and spacing issues
    - [ ] Improve visual hierarchy
  - [ ] Complete remaining diagram refinement
- [ ] Apply consistent styling across all diagrams
- [ ] Ensure responsive behavior on all screen sizes
- [ ] Optimize performance for complex diagrams
- [ ] Verify accessibility features

### Phase 5: Testing and Migration

- [x] Configure Storybook for diagram testing
- [ ] Write tests for the ReactFlowDiagram component
- [ ] Create a migration strategy document for component users
- [x] Update one diagram implementation as a test case
- [ ] Address any issues or edge cases
- [ ] Gradually replace all MermaidDiagram instances with ReactFlowDiagram

### Phase 6: Documentation and Finalization

- [ ] Document the new component usage
- [ ] Update any relevant documentation
- [ ] Write migration guide for other developers
- [ ] Clean up any deprecated code

## Current Progress

As of now, we have successfully migrated 2 out of 8 diagrams to React Flow:

1. **AI Integration Process Diagram (AiIntegrationFlowDiagram)**: 
   - Renders correctly in Storybook
   - Minor styling adjustments needed for container width
   - Need to resolve box layout and spacing issues

2. **Brain Garden Components Diagram (BrainGardenComponentsDiagram)**: 
   - Renders correctly in Storybook after fixing position issues
   - Some node positioning refinements needed
   - Layout adjustments required for optimal display

The remaining 6 diagrams are still pending migration. We've established a solid foundation with the ReactFlowDiagram base component that makes adding the remaining diagrams more straightforward.

## Next Steps - Two-Pass Approach

1. **First Pass - Basic Conversion**: Focus on converting all diagrams to React Flow with basic functionality
   - Use the same component structure as the existing ReactFlowDiagram implementations
   - Define nodes and edges directly in code rather than parsing Mermaid syntax
   - Create simple stories for Storybook testing
   - Ensure each diagram renders with the correct structure

2. **Second Pass - Refinement**: Once all diagrams are converted, focus on:
   - Fixing layout and spacing issues
   - Improving styling and visual appearance
   - Ensuring responsive behavior
   - Optimizing performance
   - Adding any missing features

This approach allows us to quickly get all diagrams working in React Flow before spending time on fine-tuning the details.

## Design Considerations

1. **Color Scheme**: Ensure all 8 diagram types follow a consistent color scheme while preserving their unique characteristics.

2. **Theme Support**: React Flow should support the same themes as Mermaid ('default', 'dark', 'forest', and 'neutral') with matching colors.

3. **Customization**: Allow for the same level of customization that Mermaid currently provides.

4. **Performance**: React Flow should provide better performance, especially for complex diagrams.

5. **Accessibility**: Maintain or improve the current accessibility features.

## Component Structure

We follow a specific pattern for our diagram components:

1. **Base Components**: Reusable, generic diagram components like `ReactFlowDiagram` live in `src/shared-components/molecules/`
   - These provide the foundation that all specific diagrams use
   - Includes shared utilities like node types and styling

2. **Specific Diagrams**: Implementations of specific diagrams like `AiIntegrationProcessDiagram` live in `src/components/diagrams/`
   - These use the base components from molecules
   - Each has its own directory with its specific implementation
   - No shared utilities should be duplicated here

This structure ensures clean separation of concerns and prevents code duplication.

## Resources

- [React Flow Documentation](https://reactflow.dev/docs/introduction/)
- [React Flow Examples](https://reactflow.dev/examples/)
- [Current MermaidDiagram Implementation](src/shared-components/molecules/MermaidDiagram/MermaidDiagram.tsx)
- [Migration Tracking](../src/shared-components/diagrams/migration-tracking/00-MermaidToReactFlowMigration.md)
