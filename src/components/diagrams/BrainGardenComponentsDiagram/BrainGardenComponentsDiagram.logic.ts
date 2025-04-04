import { CustomNode, CustomEdge } from './BrainGardenComponentsDiagram.types';

// Initial nodes configuration
export const initialNodes: CustomNode[] = [
  {
    id: 'BG',
    type: 'mainComponent',
    position: { x: 0, y: 0 },
    data: { label: '.brain Directory', icon: '🧠' },
  },
  {
    id: 'KS',
    type: 'system',
    position: { x: 0, y: 0 },
    data: { label: 'Knowledge System', icon: '📚' },
  },
  {
    id: 'PS',
    type: 'system',
    position: { x: 0, y: 0 },
    data: { label: 'Prompt System', icon: '💬' },
  },
  {
    id: 'SD',
    type: 'system',
    position: { x: 0, y: 0 },
    data: { label: 'Structured Documentation', icon: '📋' },
  },
  {
    id: 'K1',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Project Info' },
  },
  {
    id: 'K2',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Architecture' },
  },
  {
    id: 'K3',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Skill-Jacks' },
  },
  {
    id: 'P1',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Workflow Prompts' },
  },
  {
    id: 'P2',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Debugging Prompts' },
  },
  {
    id: 'P3',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Context Handoff' },
  },
  {
    id: 'D1',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Requirements' },
  },
  {
    id: 'D2',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Components' },
  },
  {
    id: 'D3',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Implementation Guides' },
  },
];

// Initial edges configuration
export const initialEdges: CustomEdge[] = [
  { id: 'e1-2', source: 'BG', target: 'KS', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e1-3', source: 'BG', target: 'PS', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e1-4', source: 'BG', target: 'SD', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e2-5', source: 'KS', target: 'K1', style: { stroke: '#4a6bff', strokeWidth: 2 } },
  { id: 'e2-6', source: 'KS', target: 'K2', style: { stroke: '#4a6bff', strokeWidth: 2 } },
  { id: 'e2-7', source: 'KS', target: 'K3', style: { stroke: '#4a6bff', strokeWidth: 2 } },
  { id: 'e3-8', source: 'PS', target: 'P1', style: { stroke: '#47b881', strokeWidth: 2 } },
  { id: 'e3-9', source: 'PS', target: 'P2', style: { stroke: '#47b881', strokeWidth: 2 } },
  { id: 'e3-10', source: 'PS', target: 'P3', style: { stroke: '#47b881', strokeWidth: 2 } },
  { id: 'e4-11', source: 'SD', target: 'D1', style: { stroke: '#ec815e', strokeWidth: 2 } },
  { id: 'e4-12', source: 'SD', target: 'D2', style: { stroke: '#ec815e', strokeWidth: 2 } },
  { id: 'e4-13', source: 'SD', target: 'D3', style: { stroke: '#ec815e', strokeWidth: 2 } },
]; 