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

### Phase 3: Diagram Conversion - First Pass - COMPLETED

The goal of this phase was to convert all diagrams to React Flow with basic functionality, focusing on:
1. Creating the diagram components with proper node/edge structure
2. Ensuring they render in Storybook
3. Implementing basic layout and connections

- [x] ~~Finalize the ReactFlowDiagram component~~ (Sufficient for initial conversion)
- [x] Create comprehensive Storybook stories for all diagram types
- [x] Configure Storybook for diagram testing
- [x] Create tracking files for each diagram that needs to be migrated
- [x] Implement the basic conversion of all remaining diagrams
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

### Phase 4: Next.js Integration and Enhancement - CURRENT PHASE

After discovering critical issues with React Flow diagrams rendering in Next.js but not in the Storybook environment, we needed to:
1. Diagnose the root cause of the rendering issues
2. Implement a robust client-side rendering solution
3. Update diagram components to use the new architecture
4. Apply the solution across all diagram components

- [x] Diagnose Next.js and React Flow integration issues
  - [x] Identify server-side rendering compatibility problems
  - [x] Research client-side rendering solutions
  - [x] Test different implementation approaches
- [x] Create enhanced React Flow architecture
  - [x] Develop `ReactFlowClientWrapper` with 'use client' directive
  - [x] Create `DiagramRenderer` component for proper initialization
  - [x] Build `EnhancedReactFlowDiagram` component with improved API
  - [x] Centralize node type registration
- [x] Update diagram components to use enhanced architecture
  - [x] AI Integration Flow Diagram (first test case)
  - [x] Brain Garden Components Diagram
  - [x] Agent System Diagram
  - [x] Integration System Diagram
  - [x] Knowledge System Diagram
  - [x] System Overview Diagram
  - [ ] Performance Scalability Diagram
  - [ ] Garden Metaphor Diagram
- [x] Verify solution works in both Storybook and Next.js
  - [x] Confirm proper rendering of diagrams
  - [x] Ensure interactive features work correctly
  - [x] Check responsive behavior

### Phase 5: Diagram Refinement - Second Pass

Once all diagrams are converted and working in Storybook and Next.js, we'll make a second pass to:
1. Fix spacing, sizing, and layout issues
2. Apply consistent styling across all diagrams
3. Ensure proper theme compatibility
4. Address any performance issues

- [ ] Refine the existing diagrams:
  - [x] AI Integration Flow Diagram
    - [x] Fix container width issues
    - [x] Adjust spacing between nodes
    - [x] Ensure optimal flow layout
  - [x] Brain Garden Components Diagram
    - [x] Refine node positioning
    - [x] Fix layout and spacing issues
    - [x] Improve visual hierarchy
  - [ ] Complete remaining diagram refinement
- [ ] Apply consistent styling across all diagrams
- [ ] Ensure responsive behavior on all screen sizes
- [ ] Optimize performance for complex diagrams
- [ ] Verify accessibility features

### Phase 6: Testing and Documentation

- [x] Configure Storybook for diagram testing
- [ ] Write tests for the enhanced React Flow components
- [ ] Create a migration strategy document for component users
- [x] Update diagram implementations to use enhanced architecture
- [ ] Address any issues or edge cases
- [x] Replace Mermaid.js instances with React Flow diagrams

## Current Progress

As of now, we have successfully implemented the three-layer architecture for React Flow diagrams and migrated 6 out of 8 diagrams:

1. **AI Integration Process Diagram (AiIntegrationFlowDiagram)** 
2. **Brain Garden Components Diagram (BrainGardenComponentsDiagram)**
3. **Agent System Diagram (AgentSystemDiagram)**
4. **Integration System Diagram (IntegrationSystemDiagram)**
5. **Knowledge System Diagram (KnowledgeSystemDiagram)**
6. **System Overview Diagram (SystemOverviewDiagram)**

The diagrams are now rendering correctly in both Storybook and Next.js, resolving the critical rendering issue that was blocking progress.

The remaining 2 diagrams still need to be updated to use the enhanced architecture:
1. **Performance Scalability Diagram (PerformanceScalabilityDiagram)**
2. **Garden Metaphor Diagram (GardenMetaphorDiagram)**

## Next.js Integration Challenges and Solution

A critical issue we encountered was that React Flow diagrams rendered correctly in Storybook but failed to render in the Next.js application. After extensive investigation, we implemented a robust solution:

### Root Causes Identified

1. **Server-Side Rendering (SSR) Incompatibility**: React Flow relies on browser APIs and DOM access, making it incompatible with Next.js server-side rendering.
2. **Component Hydration Timing**: Next.js hydration sequence conflicted with React Flow's initialization requirements.
3. **Context Provider Hierarchy**: React Flow requires its provider component to wrap all diagram components, which was being disrupted during SSR.
4. **Client/Server Boundary Issues**: Without proper 'use client' directives, React Flow attempted to initialize during server rendering.

### Implemented Solution: Enhanced Three-Layer Architecture

We've successfully implemented a three-layer architecture that resolves these issues:

#### 1. Client-Side Boundary Layer
- Added `'use client'` directive to all diagram components
- Created `ReactFlowClientWrapper` component that ensures proper client-side initialization
- Wrapped all React Flow rendering in the client-side boundary

#### 2. Enhanced Component Layer
- Developed `EnhancedReactFlowDiagram` component that:
  - Handles proper initialization sequence
  - Manages lifecycle and error states
  - Provides a consistent API for all diagrams
  - Includes debug capabilities for troubleshooting

#### 3. Implementation Layer
- Updated individual diagram components to use the enhanced architecture
- Simplified diagram implementations by leveraging the enhanced component
- Standardized props interface across all diagrams
- Added debug mode to assist with troubleshooting

This architecture successfully addresses all identified issues by:
- Ensuring React Flow only initializes on the client side
- Maintaining proper context provider hierarchy
- Managing component lifecycle appropriately
- Providing consistent error handling and debugging capabilities

## Next Steps

1. **Complete Migration**: Update the remaining two diagrams to use the enhanced architecture
2. **Visual Refinement**: Fine-tune layout, spacing, and styling across all diagrams
3. **Testing**: Implement comprehensive tests for the new components
4. **Documentation**: Complete documentation on using the enhanced architecture
5. **Performance Optimization**: Identify and address any performance issues

The implementation of the enhanced React Flow architecture has successfully unblocked progress on this feature, allowing us to move forward with completing the migration and refinement phases.

## Resources

- [React Flow Documentation](https://reactflow.dev/docs/introduction/)
- [React Flow Examples](https://reactflow.dev/examples/)
- [Current MermaidDiagram Implementation](src/shared-components/molecules/MermaidDiagram/MermaidDiagram.tsx)
- [Migration Tracking](../src/shared-components/diagrams/migration-tracking/00-MermaidToReactFlowMigration.md)
