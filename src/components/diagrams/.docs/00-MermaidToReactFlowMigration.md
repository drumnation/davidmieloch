# Mermaid to React Flow Migration Tracking

This document tracks the migration of all Mermaid diagrams to React Flow diagrams, as outlined in the [Migration Plan](/.brain/features/01-migration-to-react-flow.md).

## Identified Diagrams

The following diagrams have been identified for migration from Mermaid to React Flow:

1. [Knowledge System Diagram](./01-KnowledgeSystemDiagram.md) - From `src/shared-components/sections/TechnicalImplementation/components/KnowledgeSystemSection/KnowledgeSystemSection.tsx`
2. [Performance Scalability Diagram](./02-PerformanceScalabilityDiagram.md) - From `src/shared-components/sections/TechnicalImplementation/components/PerformanceScalabilitySection/PerformanceScalabilitySection.tsx`
3. [Agent System Diagram](./03-AgentSystemDiagram.md) - From `src/shared-components/sections/TechnicalImplementation/components/AgentSystemSection/AgentSystemSection.tsx`
4. [System Overview Diagram](./04-SystemOverviewDiagram.md) - From `src/shared-components/sections/TechnicalImplementation/SystemOverview/SystemOverview.tsx`
5. [Integration System Diagram](./05-IntegrationSystemDiagram.md) - From `src/shared-components/sections/TechnicalImplementation/components/IntegrationSystemSection/IntegrationSystemSection.tsx`
6. [AI Integration Process Diagram](./06-AiAutopilotAnalogy.md) - From `src/shared-components/sections/AiAutopilotAnalogy/AiAutopilotAnalogy.tsx`
7. [Brain Garden Components Diagram](./07-CoreComponentsDiagram.md) - From `src/shared-components/sections/BrainGardenOverview/components/CoreComponentsSection/CoreComponentsSection.tsx`
8. [Garden Metaphor Diagram](./08-GardenMetaphorDiagram.md) - From `src/shared-components/sections/BrainGardenOverview/components/GardenMetaphorSection/GardenMetaphorSection.tsx`

## Implementation Progress

| # | Diagram Name | Status | Implementation | Notes |
|---|-------------|--------|----------------|-------|
| 1 | Knowledge System Diagram | In Progress | src/shared-components/diagrams/KnowledgeSystemDiagram | Basic diagram implemented, needs integration with section |
| 2 | Performance Scalability Diagram | In Progress | src/shared-components/diagrams/PerformanceScalabilityDiagram | Basic diagram implemented, needs integration with section |
| 3 | Agent System Diagram | In Progress | src/shared-components/diagrams/AgentSystemDiagram | Basic diagram implemented, needs integration with section |
| 4 | System Overview Diagram | In Progress | src/shared-components/diagrams/SystemOverviewDiagram | Basic diagram implemented, needs integration with section |
| 5 | Integration System Diagram | In Progress | src/shared-components/diagrams/IntegrationSystemDiagram | Basic diagram implemented, needs integration with section |
| 6 | AI Integration Process Diagram | Completed | src/shared-components/diagrams/AiIntegrationFlowDiagram | Refined with improved spacing and responsive layout |
| 7 | Brain Garden Components Diagram | Completed | src/shared-components/diagrams/BrainGardenComponentsDiagram | Refined with improved visual hierarchy and color coding |
| 8 | Garden Metaphor Diagram | Completed | src/shared-components/diagrams/GardenMetaphorDiagram | Implementation completed, needs integration with section |

## Reference Implementation

The [AiIntegrationFlowDiagram](../../AiIntegrationFlowDiagram/AiIntegrationFlowDiagram.tsx) component serves as a reference implementation for how to build React Flow diagrams with consistent styling. All new diagram components should follow this pattern for consistency.

## Mermaid Dependency Removal

Once all diagrams have been migrated, we should:

1. Remove the Mermaid dependency from package.json
2. Delete the `src/shared-components/molecules/MermaidDiagram` component
3. Ensure all imports are updated to use the new React Flow diagram components

## Migration Strategy

1. ✅ Start with one diagram as a proof of concept
2. ✅ Create a shared utility for converting Mermaid syntax to React Flow definitions
3. ✅ Implement the remaining diagrams with consistent styling
4. ✅ Begin refinement of diagrams to improve layout and styling (in progress)
5. Test all diagrams in all supported themes
6. Update all components to use the new diagram components
7. Remove the Mermaid dependency 

## Component Structure

We follow a specific pattern for our diagram components:

1. **Base Components**: Reusable, generic diagram components (ReactFlowDiagram) live in `src/shared-components/molecules/`
   - The ReactFlowDiagram component provides the foundation that all specific diagrams use
   - Includes shared utilities like node types and styling in the molecules directory

2. **Specific Diagrams**: Implementations of specific diagrams live in `src/shared-components/diagrams/` or `src/components/diagrams/`
   - Each specific diagram (like KnowledgeSystemDiagram or AiIntegrationProcessDiagram) has its own directory
   - These use the base ReactFlowDiagram component from molecules
   - No utilities should be duplicated between molecules and diagrams

This structure ensures clean separation of concerns and prevents code duplication. 

## Recent Progress

- **2023-06-15**: Implemented KnowledgeSystemDiagram with ReactFlow
  - Created component, types, and stories
  - Used horizontal (LR) layout with properly styled nodes
  - Added theming support for all four themes
  - Still needs to be integrated with the KnowledgeSystemSection component
- **2023-06-16**: Implemented PerformanceScalabilityDiagram with ReactFlow
  - Created component, types, and stories
  - Used top-down (TD) layout with properly styled nodes
  - Added theming support for all four themes
  - Still needs to be integrated with the PerformanceScalabilitySection component
- **2023-06-17**: Implemented AgentSystemDiagram with ReactFlow
  - Created component, types, and stories
  - Used top-down (TD) layout with properly styled nodes
  - Added theming support for all four themes
  - Implemented multi-path flow with branches and merges
  - Still needs to be integrated with the AgentSystemSection component
- **2023-06-18**: Completed Garden Metaphor Diagram implementation
  - Created component, types, and stories
  - Used horizontal (LR) layout with properly styled nodes
  - Added theming support
  - Used capsule nodes for main phases
- **2023-06-19**: Refined AI Integration Flow and Brain Garden Components diagrams
  - Improved spacing and alignment in AI Integration Flow diagram
  - Added container width limits for better responsive behavior
  - Enhanced visual hierarchy in Brain Garden Components diagram with color coding
  - Optimized layout of both diagrams for better readability 