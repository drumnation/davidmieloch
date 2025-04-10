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
    data: { label: 'Skill Jack System', icon: '📚' },
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
    id: 'RS',
    type: 'system',
    position: { x: 0, y: 0 },
    data: { label: 'Rules System', icon: '📏' },
  },
  {
    id: 'PM',
    type: 'system',
    position: { x: 0, y: 0 },
    data: { label: 'Project Management', icon: '📊' },
  },
  {
    id: 'WS',
    type: 'system',
    position: { x: 0, y: 0 },
    data: { label: 'Watchers System', icon: '👁️' },
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
  {
    id: 'R1',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Code Standards' },
  },
  {
    id: 'R2',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Git Workflows' },
  },
  {
    id: 'R3',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Testing Standards' },
  },
  {
    id: 'PM1',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Project Plan Tasks' },
  },
  {
    id: 'PM2',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Feature Plan Tasks' },
  },
  {
    id: 'PM3',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Error Plan Tasks' },
  },
  {
    id: 'PM4',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Commit Split Tasks' },
  },
  {
    id: 'PM5',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'GitHub Integration' },
  },
  {
    id: 'WS1',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Directory Structure' },
  },
  {
    id: 'WS2',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Tasklist to GitHub Sync' },
  },
  {
    id: 'WS3',
    type: 'subComponent',
    position: { x: 0, y: 0 },
    data: { label: 'Rules to Cursor Sync' },
  },
];

// Initial edges configuration
export const initialEdges: CustomEdge[] = [
  { id: 'e1-2', source: 'BG', target: 'KS', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e1-3', source: 'BG', target: 'PS', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e1-4', source: 'BG', target: 'SD', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e1-5', source: 'BG', target: 'RS', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e1-6', source: 'BG', target: 'PM', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e1-7', source: 'BG', target: 'WS', style: { stroke: '#6772e5', strokeWidth: 2 } },
  { id: 'e2-5', source: 'KS', target: 'K1', style: { stroke: '#4a6bff', strokeWidth: 2 } },
  { id: 'e2-6', source: 'KS', target: 'K2', style: { stroke: '#4a6bff', strokeWidth: 2 } },
  { id: 'e2-7', source: 'KS', target: 'K3', style: { stroke: '#4a6bff', strokeWidth: 2 } },
  { id: 'e3-8', source: 'PS', target: 'P1', style: { stroke: '#47b881', strokeWidth: 2 } },
  { id: 'e3-9', source: 'PS', target: 'P2', style: { stroke: '#47b881', strokeWidth: 2 } },
  { id: 'e3-10', source: 'PS', target: 'P3', style: { stroke: '#47b881', strokeWidth: 2 } },
  { id: 'e4-11', source: 'SD', target: 'D1', style: { stroke: '#ec815e', strokeWidth: 2 } },
  { id: 'e4-12', source: 'SD', target: 'D2', style: { stroke: '#ec815e', strokeWidth: 2 } },
  { id: 'e4-13', source: 'SD', target: 'D3', style: { stroke: '#ec815e', strokeWidth: 2 } },
  { id: 'e5-14', source: 'RS', target: 'R1', style: { stroke: '#9c27b0', strokeWidth: 2 } },
  { id: 'e5-15', source: 'RS', target: 'R2', style: { stroke: '#9c27b0', strokeWidth: 2 } },
  { id: 'e5-16', source: 'RS', target: 'R3', style: { stroke: '#9c27b0', strokeWidth: 2 } },
  { id: 'e6-17', source: 'PM', target: 'PM1', style: { stroke: '#ff9800', strokeWidth: 2 } },
  { id: 'e6-18', source: 'PM', target: 'PM2', style: { stroke: '#ff9800', strokeWidth: 2 } },
  { id: 'e6-19', source: 'PM', target: 'PM3', style: { stroke: '#ff9800', strokeWidth: 2 } },
  { id: 'e6-20', source: 'PM', target: 'PM4', style: { stroke: '#ff9800', strokeWidth: 2 } },
  { id: 'e6-21', source: 'PM', target: 'PM5', style: { stroke: '#ff9800', strokeWidth: 2 } },
  { id: 'e7-22', source: 'WS', target: 'WS1', style: { stroke: '#00bcd4', strokeWidth: 2 } },
  { id: 'e7-23', source: 'WS', target: 'WS2', style: { stroke: '#00bcd4', strokeWidth: 2 } },
  { id: 'e7-24', source: 'WS', target: 'WS3', style: { stroke: '#00bcd4', strokeWidth: 2 } },
  // Add connections between Watchers and other systems
  { id: 'e25', source: 'WS', target: 'PM', style: { stroke: '#00bcd4', strokeWidth: 1, strokeDasharray: '5 5' } },
  { id: 'e26', source: 'WS', target: 'RS', style: { stroke: '#00bcd4', strokeWidth: 1, strokeDasharray: '5 5' } },
]; 