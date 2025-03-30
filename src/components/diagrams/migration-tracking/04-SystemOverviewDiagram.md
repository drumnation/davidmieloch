# System Overview Diagram Migration

## Source Information
- **Component**: `src/shared-components/sections/TechnicalImplementation/SystemOverview/SystemOverview.tsx`
- **Prop**: `diagram` (with fallback to `defaultDefinition`)
- **Line**: ~116-117
- **Usage**: System Overview diagram showing the Brain Garden system architecture

## Migration Tasks
- [ ] Create new `SystemOverviewDiagram` component in `src/shared-components/diagrams/SystemOverviewDiagram/`
- [ ] Implement ReactFlow nodes and edges based on the original Mermaid diagram
- [ ] Ensure consistent styling with the AiIntegrationFlowDiagram
- [ ] Add appropriate stories for the component
- [ ] Update the `SystemOverview` component to use the new diagram component
- [ ] Test the diagram's appearance in all supported themes
- [ ] Remove Mermaid dependency if no longer used elsewhere

## Additional Notes
- This component includes a default diagram definition in the component code (see lines 82-96)
- Diagram should support responsive sizing (`height="auto"`)
- Needs to maintain zoom controls functionality
- Needs to support accessibility description 