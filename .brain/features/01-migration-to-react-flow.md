# Migration from Mermaid.js to React Flow

## Overview

This document outlines the plan to migrate from the current Mermaid.js diagram implementation to React Flow, addressing the performance and rendering issues with the current implementation while ensuring a consistent design and user experience.

## Diagram Types to Migrate

Based on the codebase analysis, we need to support the following types of diagrams:

1. Flowcharts (`flowchart TD`, `flowchart LR`) 
2. Sequence Diagrams (`sequenceDiagram`)
3. Graph Diagrams (`graph TD`)
4. Potentially others used in the application

## Task List

### Phase 1: Setup and Research (1-2 days)

- [ ] Install React Flow and dependencies
  ```bash
  pnpm add @xyflow/react
  ```
- [ ] Create a new folder structure for the React Flow component
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
- [ ] Research and document React Flow's node and edge customization capabilities
- [ ] Study the current theme and styling requirements for diagrams

### Phase 2: Proof of Concept (2-3 days)

- [ ] Create a basic ReactFlowDiagram component with the same props interface as MermaidDiagram
- [ ] Implement a parser utility to convert Mermaid syntax to React Flow nodes and edges
  - [ ] Support for flowchart syntax parsing
  - [ ] Support for sequence diagram syntax parsing
  - [ ] Support for graph syntax parsing
- [ ] Create custom node types that match the visual style of current diagrams
- [ ] Implement theming support to match the current 'default', 'dark', 'forest', and 'neutral' themes
- [ ] Add zoom controls similar to the current implementation
- [ ] Implement accessibility features

### Phase 3: Implementation (3-4 days)

- [ ] Finalize the ReactFlowDiagram component
- [ ] Create comprehensive Storybook stories for all diagram types
- [ ] Implement a consistent color scheme for all 8 diagram types
- [ ] Add CSS variable support to match current styling
- [ ] Ensure all features of the current MermaidDiagram are supported:
  - [ ] Responsive design
  - [ ] Themes
  - [ ] Zoom controls
  - [ ] Accessibility
  - [ ] Custom styling

### Phase 4: Testing and Migration (2-3 days)

- [ ] Write tests for the ReactFlowDiagram component
- [ ] Create a migration strategy document for component users
- [ ] Update one diagram implementation as a test case
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

## Resources

- [React Flow Documentation](https://reactflow.dev/docs/introduction/)
- [React Flow Examples](https://reactflow.dev/examples/)
- [Current MermaidDiagram Implementation](src/shared-components/molecules/MermaidDiagram/MermaidDiagram.tsx)
