# TypeScript Errors Task List

## Diagram-Related Issues

- [x] **DiagramClientWrapper.tsx**: Fix import error for ReactFlowDiagram
  ```
  src/components/diagrams/_wrappers/DiagramClientWrapper/DiagramClientWrapper.tsx:4:38
  Cannot find module '../../../../shared-components/molecules/ReactFlowDiagram' or its corresponding type declarations.
  ```
  > Fixed by updating the import to use the default import: `import ClientDiagramWrapper from '../../../../shared-components/molecules/ReactFlowDiagram/ClientDiagramWrapper';`

- [x] **DiagramEditor.client.tsx**: Fix export from DiagramEditor
  ```
  src/components/diagrams/DiagramEditor/DiagramEditor.client.tsx:5:10
  Module '"./DiagramEditor"' has no exported member 'DiagramEditor'.
  ```
  > Fixed by adding `export default DiagramEditor;` to the DiagramEditor.tsx file

- [x] **SoftwareEngineeringMeceDiagram.flow.tsx**: Fix type issue with onInit and nodeTypes
  ```
  src/components/diagrams/SoftwareEngineeringMeceDiagram/SoftwareEngineeringMeceDiagram.flow.tsx:75:7
  Type '(instance: ReactFlowInstance) => void' is not assignable to type 'OnInit<CustomNode, CustomEdge>'.
  ```
  > Fixed by adding proper type annotation: `const onInit: OnInit = useCallback(...)`

- [x] **SoftwareEngineeringMeceDiagram.nodes.tsx**: Fix constraint issues with CustomNodeData
  ```
  src/components/diagrams/SoftwareEngineeringMeceDiagram/SoftwareEngineeringMeceDiagram.nodes.tsx
  Type 'CustomNodeData' does not satisfy the constraint 'Node<Record<string, unknown>, string>'.
  ```
  > Fixed by updating the CustomNodeProps type to simply use `NodeProps` without the generic parameter

- [x] **ReactFlowDiagram.tsx**: Fix multiple issues
  - [x] Import error for BasicNode
  - [x] Missing export 'getLayoutedElements'
  - [x] Type issues with width/height properties (string vs number)
  - [x] Type issue with StyledReactFlow/edgeTypes
  > Fixed by removing the BasicNode import, creating the getLayoutedElements function, handling string/number conversion for width/height, and properly handling edgeTypes. Also removed 'attributionPosition' property from options to fix type errors.

## Component-Related Issues

- [x] **Navbar.tsx**: Fix type issue with $isActive prop
  ```
  src/components/Navbar/Navbar.tsx:61:40
  Type 'boolean | undefined' is not assignable to type 'boolean'.
  ```
  > Fixed by providing a default value: `$isActive={isActive(item.path) || false}`

- [x] **Footer.tsx**: Fix issue with $isExpanded prop
  ```
  src/shared-components/organisms/Footer/Footer.tsx:214:7
  Property '$isExpanded' does not exist on type.
  ```
  > Fixed by adding proper type definition to the FooterContainer styled component

- [x] **CoreComponentsSection.tsx**: Fix import issues
  ```
  src/shared-components/sections/BrainGardenOverview/components/CoreComponentsSection/CoreComponentsSection.tsx
  Cannot find module '../../../TechnicalImplementation.styles'
  File '/CoreComponentsSection.styles.ts' is not a module.
  ```
  > Fixed by updating the import path to `'../../../../sections/TechnicalImplementation/TechnicalImplementation.styles'` and creating the DiagramContainer component in CoreComponentsSection.styles.ts

- [x] **ExperienceSection.tsx**: Fix undefined setPinnedJob function
  ```
  src/shared-components/sections/Experience/components/ExperienceSection/ExperienceSection.tsx:413:5
  Cannot find name 'setPinnedJob'.
  ```
  > Fixed by adding the missing setPinnedJob state and modifying the renderExperienceItem function to optionally accept setPinnedJob

- [x] **SystemOverview.tsx**: Remove unused @ts-expect-error directive
  ```
  src/shared-components/sections/TechnicalImplementation/SystemOverview/SystemOverview.tsx:155:21
  Unused '@ts-expect-error' directive.
  ```
  > Fixed by removing the unnecessary @ts-expect-error directive

## Error Count by File
- ReactFlowDiagram.tsx: 5 errors
- SoftwareEngineeringMeceDiagram (various files): 6 errors
- CoreComponentsSection.tsx: 2 errors
- Various components with 1 error each

Total: 19 errors in 11 files 

## Additional Fixes
Additional fixes were required after the initial round of changes:
1. Updated ClientDiagramWrapper import to use the default import instead of a named import
2. Added default export to DiagramEditor.tsx
3. Fixed CustomNodeProps in SoftwareEngineeringMeceDiagram.types.ts
4. Removed the attributionPosition property from the getNoAnimationOptions function
5. Fixed the path to TechnicalImplementation.styles in CoreComponentsSection.tsx 