import { CustomNode, CustomEdge } from './SoftwareEngineeringMeceDiagram.types';

// Initial nodes configuration for software engineering MECE diagram
export const initialNodes: CustomNode[] = [
  // Main Software Engineering node
  {
    id: 'SE',
    type: 'mainComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Software Engineering', icon: '🔧' },
  },
  
  // Major categories - Mutually Exclusive components
  {
    id: 'UI',
    type: 'category',
    position: { x: 0, y: 0 },
    data: { label: 'UI Layer', icon: '🖼️' },
  },
  {
    id: 'BL',
    type: 'category',
    position: { x: 0, y: 0 },
    data: { label: 'Business Logic', icon: '⚙️' },
  },
  {
    id: 'DA',
    type: 'category',
    position: { x: 0, y: 0 },
    data: { label: 'Data Access', icon: '💾' },
  },
  {
    id: 'IN',
    type: 'category',
    position: { x: 0, y: 0 },
    data: { label: 'Infrastructure', icon: '🏗️' },
  },
  
  // UI Layer Components
  {
    id: 'UI1',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Components' },
  },
  {
    id: 'UI2',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Styling' },
  },
  {
    id: 'UI3',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'User Experience' },
  },
  
  // Business Logic Components
  {
    id: 'BL1',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Services' },
  },
  {
    id: 'BL2',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Domain Models' },
  },
  {
    id: 'BL3',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'State Management' },
  },
  
  // Data Access Components
  {
    id: 'DA1',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Repositories' },
  },
  {
    id: 'DA2',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'API Clients' },
  },
  {
    id: 'DA3',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Data Mapping' },
  },
  
  // Infrastructure Components
  {
    id: 'IN1',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Deployment' },
  },
  {
    id: 'IN2',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Monitoring' },
  },
  {
    id: 'IN3',
    type: 'item',
    position: { x: 0, y: 0 },
    data: { label: 'Configuration' },
  },
];

// Initial edges configuration
export const initialEdges: CustomEdge[] = [
  // Connect Software Engineering to categories
  { id: 'e-se-ui', source: 'SE', target: 'UI', style: { stroke: '#4c51bf', strokeWidth: 2 } },
  { id: 'e-se-bl', source: 'SE', target: 'BL', style: { stroke: '#4c51bf', strokeWidth: 2 } },
  { id: 'e-se-da', source: 'SE', target: 'DA', style: { stroke: '#4c51bf', strokeWidth: 2 } },
  { id: 'e-se-in', source: 'SE', target: 'IN', style: { stroke: '#4c51bf', strokeWidth: 2 } },
  
  // Connect UI category to items
  { id: 'e-ui-ui1', source: 'UI', target: 'UI1', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-ui-ui2', source: 'UI', target: 'UI2', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-ui-ui3', source: 'UI', target: 'UI3', style: { stroke: '#4299e1', strokeWidth: 2 } },
  
  // Connect Business Logic category to items
  { id: 'e-bl-bl1', source: 'BL', target: 'BL1', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-bl-bl2', source: 'BL', target: 'BL2', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-bl-bl3', source: 'BL', target: 'BL3', style: { stroke: '#4299e1', strokeWidth: 2 } },
  
  // Connect Data Access category to items
  { id: 'e-da-da1', source: 'DA', target: 'DA1', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-da-da2', source: 'DA', target: 'DA2', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-da-da3', source: 'DA', target: 'DA3', style: { stroke: '#4299e1', strokeWidth: 2 } },
  
  // Connect Infrastructure category to items
  { id: 'e-in-in1', source: 'IN', target: 'IN1', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-in-in2', source: 'IN', target: 'IN2', style: { stroke: '#4299e1', strokeWidth: 2 } },
  { id: 'e-in-in3', source: 'IN', target: 'IN3', style: { stroke: '#4299e1', strokeWidth: 2 } },
]; 