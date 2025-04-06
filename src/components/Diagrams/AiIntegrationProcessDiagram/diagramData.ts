import { Node, Edge } from '@xyflow/react';
import { NodePosition, BaseDiagramNodeData } from '../DiagramEditor/DiagramEditor.types';

// Create the initial nodes with correct data typing
export const initialNodes: Node<BaseDiagramNodeData>[] = [
  // Left column
  { id: 'start', type: 'start', position: { x: 43.7, y: 62.3 }, data: { label: 'Start', icon: '🏁', type: 'process' } },
  { id: 'assess', type: 'process', position: { x: 43.7, y: 162.3 }, data: { label: 'Assess Current Workflow', icon: '🔍', type: 'process' } },
  { id: 'identify', type: 'process', position: { x: 43.7, y: 262.3 }, data: { label: 'Identify AI Opportunities', icon: '💡', type: 'process' } },
  
  // Middle column
  { id: 'defineRoles', type: 'process', position: { x: 343.7, y: 262.3 }, data: { label: 'Define Human/AI Roles', icon: '👥', type: 'process' } },
  { id: 'integrateKnowledge', type: 'process', position: { x: 343.7, y: 362.3 }, data: { label: 'Integrate Knowledge Base', icon: '🧠', type: 'process' } },
  { id: 'promptEngineering', type: 'process', position: { x: 343.7, y: 462.3 }, data: { label: 'Implement Prompt Engineering', icon: '⌨️', type: 'process' } },
  { id: 'validateFrameworks', type: 'process', position: { x: 343.7, y: 562.3 }, data: { label: 'Validate AI Frameworks', icon: '✓', type: 'process' } },
  { id: 'optimizeWorkflow', type: 'process', position: { x: 343.7, y: 662.3 }, data: { label: 'Optimize AI/Human Workflow', icon: '⚙️', type: 'process' } },
  
  // Right column
  { id: 'trainTeams', type: 'process', position: { x: 643.7, y: 462.3 }, data: { label: 'Train Teams', icon: '🧑‍🏫', type: 'process' } },
  { id: 'defineMetrics', type: 'process', position: { x: 643.7, y: 562.3 }, data: { label: 'Define Success Metrics', icon: '📊', type: 'process' } },
  { id: 'measureResults', type: 'process', position: { x: 643.7, y: 662.3 }, data: { label: 'Measure Results', icon: '📏', type: 'process' } },
  { id: 'successful', type: 'decision', position: { x: 643.7, y: 762.3 }, data: { label: 'Successful?', type: 'decision' } },
  { id: 'scaleIntegration', type: 'process', position: { x: 843.7, y: 862.3 }, data: { label: 'Scale AI Integration', icon: '📈', type: 'process' } },
  { id: 'refineApproach', type: 'process', position: { x: 443.7, y: 862.3 }, data: { label: 'Refine Approach', icon: '🔄', type: 'process' } },
  { id: 'continuousImprovement', type: 'process', position: { x: 843.7, y: 962.3 }, data: { label: 'Continuous Improvement', icon: '♾️', type: 'process' } },
  { id: 'end', type: 'end', position: { x: 843.7, y: 1062.3 }, data: { label: 'End', icon: '🏁', type: 'end' } },
];

// Create the initial edges
export const initialEdges: Edge[] = [
  // Left to middle connections
  { id: 'e1-2', source: 'start', target: 'assess', type: 'smoothstep' },
  { id: 'e2-3', source: 'assess', target: 'identify', type: 'smoothstep' },
  { id: 'e3-4', source: 'identify', target: 'defineRoles', type: 'smoothstep' },
  
  // Middle vertical flow
  { id: 'e4-5', source: 'defineRoles', target: 'integrateKnowledge', type: 'smoothstep' },
  { id: 'e5-6', source: 'integrateKnowledge', target: 'promptEngineering', type: 'smoothstep' },
  { id: 'e6-7', source: 'promptEngineering', target: 'validateFrameworks', type: 'smoothstep' },
  { id: 'e7-8', source: 'validateFrameworks', target: 'optimizeWorkflow', type: 'smoothstep' },
  
  // Middle to right connections
  { id: 'e8-9', source: 'optimizeWorkflow', target: 'trainTeams', type: 'smoothstep' },
  
  // Right vertical flow
  { id: 'e9-10', source: 'trainTeams', target: 'defineMetrics', type: 'smoothstep' },
  { id: 'e10-11', source: 'defineMetrics', target: 'measureResults', type: 'smoothstep' },
  { id: 'e11-12', source: 'measureResults', target: 'successful', type: 'smoothstep' },
  
  // Decision paths
  { 
    id: 'e12-13', 
    source: 'successful', 
    target: 'scaleIntegration', 
    label: 'Yes', 
    type: 'smoothstep',
    style: { stroke: '#4a6bff', strokeWidth: 3 }, 
    labelStyle: { fontSize: '16px', fontWeight: 'bold', fill: '#4a6bff' },
    labelBgStyle: { fill: 'white', fillOpacity: 0.8, borderRadius: 5 },
    labelShowBg: true,
    labelBgPadding: [8, 4],
  },
  { 
    id: 'e12-14', 
    source: 'successful', 
    target: 'refineApproach', 
    label: 'No', 
    type: 'smoothstep',
    style: { stroke: '#ff4a4a', strokeWidth: 4 },
    labelStyle: { fontSize: '16px', fontWeight: 'bold', fill: '#ff4a4a' },
    labelBgStyle: { fill: 'white', fillOpacity: 0.9, borderRadius: 5 },
    labelShowBg: true,
    labelBgPadding: [8, 4],
  },
  
  // Feedback and completion paths
  { 
    id: 'e14-4', 
    source: 'refineApproach', 
    target: 'defineRoles', 
    type: 'smoothstep', 
    style: { stroke: '#ff4a4a', strokeWidth: 3 } 
  },
  { 
    id: 'e13-15', 
    source: 'scaleIntegration', 
    target: 'continuousImprovement', 
    type: 'smoothstep', 
    style: { stroke: '#4a6bff', strokeWidth: 3 } 
  },
  { 
    id: 'e15-11', 
    source: 'continuousImprovement', 
    target: 'measureResults', 
    type: 'smoothstep', 
    style: { stroke: '#4a6bff', strokeWidth: 3 }, 
    animated: true 
  },
  { 
    id: 'e15-16', 
    source: 'continuousImprovement', 
    target: 'end', 
    type: 'smoothstep', 
    style: { stroke: '#4a6bff', strokeWidth: 3 } 
  },
];

// Add the fixed node positions
export const customNodePositions: NodePosition[] = [
  {
    "id": "start",
    "position": {
      "x": -301.12355680111966,
      "y": 834.3934230187162
    }
  },
  {
    "id": "assess",
    "position": {
      "x": -233.16013768273223,
      "y": 664.3472539867361
    }
  },
  {
    "id": "identify",
    "position": {
      "x": -103.47748221131127,
      "y": 447.4150355919406
    }
  },
  {
    "id": "defineRoles",
    "position": {
      "x": 71.53254018287868,
      "y": 570.9263795143307
    }
  },
  {
    "id": "integrateKnowledge",
    "position": {
      "x": 80.08656663280024,
      "y": 704.0605966429603
    }
  },
  {
    "id": "promptEngineering",
    "position": {
      "x": -0.2596998984007257,
      "y": 841.9653733468799
    }
  },
  {
    "id": "validateFrameworks",
    "position": {
      "x": 94.14716327576042,
      "y": 979.8701500507996
    }
  },
  {
    "id": "optimizeWorkflow",
    "position": {
      "x": 15.809553407839473,
      "y": 1135.8528367242395
    }
  },
  {
    "id": "trainTeams",
    "position": {
      "x": 144.36357985776104,
      "y": 1285.8095534078393
    }
  },
  {
    "id": "defineMetrics",
    "position": {
      "x": 64.01731332656004,
      "y": 1415.679703458639
    }
  },
  {
    "id": "measureResults",
    "position": {
      "x": 932.8719687771988,
      "y": 942.9528545254311
    }
  },
  {
    "id": "successful",
    "position": {
      "x": 956.2026480187702,
      "y": 1076.9189222603045
    }
  },
  {
    "id": "scaleIntegration",
    "position": {
      "x": 1048.0887772526266,
      "y": 1241.1860606498872
    }
  },
  {
    "id": "refineApproach",
    "position": {
      "x": 434.5367131233615,
      "y": 1251.8966250619003
    }
  },
  {
    "id": "continuousImprovement",
    "position": {
      "x": 640.7405408220062,
      "y": 1361.2708068469833
    }
  },
  {
    "id": "end",
    "position": {
      "x": 1036.7373016292427,
      "y": 1545.7020839662814
    }
  }
]; 