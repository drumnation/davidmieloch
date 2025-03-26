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

### Phase 1: Setup and Research (1-2 days)

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

### Phase 2: Proof of Concept (2-3 days)

- [x] Create a basic ReactFlowDiagram component with the same props interface as MermaidDiagram
- [x] Implement a parser utility to convert Mermaid syntax to React Flow nodes and edges
  - [x] Support for flowchart syntax parsing
  - [x] Support for sequence diagram syntax parsing
  - [x] Support for graph syntax parsing
- [x] Create custom node types that match the visual style of current diagrams
- [x] Implement theming support to match the current 'default', 'dark', 'forest', and 'neutral' themes
- [x] Add zoom controls similar to the current implementation
- [x] Implement accessibility features

### Phase 3: Implementation (3-4 days)

- [x] Finalize the ReactFlowDiagram component
- [x] Create comprehensive Storybook stories for all diagram types
- [x] Implement a consistent color scheme for all 8 diagram types
- [x] Add CSS variable support to match current styling
- [x] Reference implementation: [AiIntegrationFlowDiagram](../src/shared-components/diagrams/AiIntegrationFlowDiagram/AiIntegrationFlowDiagram.tsx)
- [x] Create tracking files for each diagram that needs to be migrated
  - [x] [Knowledge System Diagram](../src/shared-components/diagrams/migration-tracking/01-KnowledgeSystemDiagram.md)
  - [x] [Performance Scalability Diagram](../src/shared-components/diagrams/migration-tracking/02-PerformanceScalabilityDiagram.md)
  - [x] [Agent System Diagram](../src/shared-components/diagrams/migration-tracking/03-AgentSystemDiagram.md)
  - [x] [System Overview Diagram](../src/shared-components/diagrams/migration-tracking/04-SystemOverviewDiagram.md)
  - [x] [Integration System Diagram](../src/shared-components/diagrams/migration-tracking/05-IntegrationSystemDiagram.md)
  - [x] [AI Integration Process Diagram](../src/shared-components/diagrams/migration-tracking/06-AiAutopilotAnalogy.md)
  - [x] [Brain Garden Components Diagram](../src/shared-components/diagrams/migration-tracking/07-CoreComponentsDiagram.md)
  - [x] [Garden Metaphor Diagram](../src/shared-components/diagrams/migration-tracking/08-GardenMetaphorDiagram.md)
- [ ] Implement each diagram component
  - [ ] Knowledge System Diagram
  - [ ] Performance Scalability Diagram
  - [ ] Agent System Diagram
  - [ ] System Overview Diagram
  - [ ] Integration System Diagram
  - [x] AI Integration Process Diagram 
  - [ ] Brain Garden Components Diagram
  - [ ] Garden Metaphor Diagram
- [ ] Ensure all features of the current MermaidDiagram are supported:
  - [x] Responsive design
  - [x] Themes
  - [x] Zoom controls
  - [x] Accessibility
  - [x] Custom styling

### Phase 4: Testing and Migration (2-3 days)

- [ ] Write tests for the ReactFlowDiagram component
- [ ] Create a migration strategy document for component users
- [x] Update one diagram implementation as a test case
- [ ] Address any issues or edge cases
- [ ] Gradually replace all MermaidDiagram instances with ReactFlowDiagram

### Phase 5: Documentation and Finalization (1-2 days)

- [ ] Document the new component usage
- [ ] Update any relevant documentation
- [ ] Write migration guide for other developers
- [ ] Clean up any deprecated code

## Design Considerations

1. **Color Scheme**: Ensure all 8 diagram types follow a consistent color scheme while preserving their unique characteristics.

2. **Theme Support**: React Flow should support the same themes as Mermaid ('default', 'dark', 'forest', 'neutral') with matching colors.

3. **Customization**: Allow for the same level of customization that Mermaid currently provides.

4. **Performance**: React Flow should provide better performance, especially for complex diagrams.

5. **Accessibility**: Maintain or improve the current accessibility features.

## Proof of Concept Approach

For the proof of concept, we will:

1. Create a simple React Flow implementation
2. Test it with one of each diagram type
3. Compare performance and visual fidelity with the Mermaid implementation
4. Gather feedback before proceeding with full implementation

## Technical Challenges

1. **Parsing Mermaid Syntax**: Converting Mermaid syntax to React Flow's node/edge model will be complex.

2. **Custom Node Types**: We'll need to create custom node types to match the current visual style.

3. **Styling**: Ensuring consistent styling across different diagram types while supporting themes.

4. **Migration**: Ensuring a smooth migration path for existing diagram implementations.

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
