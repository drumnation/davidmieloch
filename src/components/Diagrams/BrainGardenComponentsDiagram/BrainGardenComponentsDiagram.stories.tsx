import React, { useCallback, useState, useRef, useEffect } from 'react';
import { BrainGardenComponentsDiagram } from './BrainGardenComponentsDiagram';
import type { Meta, StoryObj } from '@storybook/react';
import { NodePosition } from '../DiagramEditor/DiagramEditor.types';

/**
 * Storybook configuration for the BrainGardenComponentsDiagram component
 * 
 * The Default story shows the diagram in its actual page context.
 */
const meta = {
  title: 'Diagrams/BrainGardenComponentsDiagram',
  component: BrainGardenComponentsDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A diagram showing the core components of the Brain Garden system: Skill Jack System, Prompt System, Structured Documentation, Rules System, Project Management, and Watchers System.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BrainGardenComponentsDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default display showing the Brain Garden Components Diagram in its actual page context.
 * This matches how the diagram appears in the Brain Garden Overview section.
 */
export const Default: Story = {
  args: {
    width: '898px',
    height: '798px',
    showZoomControls: false,
    backgroundColor: 'transparent',
  },
  parameters: {
    pageStructure: 'garden',
    docs: {
      description: {
        story: 'Default view of the Brain Garden Components Diagram showing the six core systems: Skill Jack System, Prompt System, Structured Documentation, Rules System, Project Management, and Watchers System.'
      }
    }
  },
};

/**
 * Brain Garden Components Diagram with light blue background, no page context
 */
export const WithLightBlueBackground: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    backgroundColor: 'rgba(74, 158, 255, 0.05)',
  },
  parameters: {
    pageStructure: 'none',
  },
};

/**
 * Brain Garden Components Diagram with dark theme, no page context
 */
export const DarkTheme: Story = {
  args: {
    width: '100%',
    height: '600px',
    showZoomControls: true,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    pageStructure: 'none',
  },
};

/**
 * Interactive diagram editor for manually positioning nodes
 */
const EnhancedNodeEditor = () => {
  const [savedPositions, setSavedPositions] = useState<NodePosition[]>([]);
  const [nodesDraggable, setNodesDraggable] = useState(true);
  const [nodePositionsJson, setNodePositionsJson] = useState<string>('');
  const [userDraggedNodes, setUserDraggedNodes] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusType, setStatusType] = useState<'info' | 'success' | 'error'>('info');
  const [edgeCreationMode, setEdgeCreationMode] = useState<boolean>(false);
  const [sourceNodeForEdge, setSourceNodeForEdge] = useState<string | null>(null);
  const [customEdges, setCustomEdges] = useState<Array<{id: string, source: string, target: string}>>([]);
  const [multiSelectionMode, setMultiSelectionMode] = useState<boolean>(false);
  const [selectionOnDrag, setSelectionOnDrag] = useState<boolean>(false);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const jsonInputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  // Function to get the current node positions from the diagram
  const captureNodePositions = useCallback(() => {
    const diagramEl = document.querySelector('.react-flow__nodes');
    if (!diagramEl) {
      setStatusMessage('Could not find diagram nodes');
      setStatusType('error');
      return;
    }
    
    const nodeElements = diagramEl.querySelectorAll('.react-flow__node');
    if (!nodeElements.length) {
      setStatusMessage('No nodes found in diagram');
      setStatusType('error');
      return;
    }
    
    const positions: NodePosition[] = [];
    
    nodeElements.forEach(node => {
      const id = node.getAttribute('data-id');
      if (!id) return;
      
      // Get translation values from transform style
      const style = window.getComputedStyle(node);
      const transform = style.transform || style.webkitTransform;
      
      // Extract position from transform matrix
      const matrix = transform.match(/matrix\(.*,\s*(\d+\.?\d*),\s*(\d+\.?\d*)\)/);
      if (matrix && matrix.length >= 3) {
        positions.push({
          id,
          position: {
            x: parseFloat(matrix[1]),
            y: parseFloat(matrix[2])
          }
        });
      }
    });
    
    setSavedPositions(positions);
    const positionsJson = JSON.stringify({
      nodes: positions,
      edges: customEdges
    }, null, 2);
    setNodePositionsJson(positionsJson);
    
    // Copy to clipboard
    navigator.clipboard.writeText(positionsJson)
      .then(() => {
        setStatusMessage('Layout data copied to clipboard!');
        setStatusType('success');
      })
      .catch(() => {
        setStatusMessage('Failed to copy to clipboard');
        setStatusType('error');
      });
    
    setUserDraggedNodes(true);
  }, [customEdges]);
  
  const handleImportPositions = useCallback(() => {
    try {
      if (!jsonInputRef.current?.value) {
        setStatusMessage('Please enter JSON data to import');
        setStatusType('error');
        return;
      }
      
      const data = JSON.parse(jsonInputRef.current.value);
      
      // Support both array format (old) and object format with nodes/edges (new)
      const positions = Array.isArray(data) ? data : data.nodes;
      const edges = Array.isArray(data) ? [] : (data.edges || []);
      
      if (!Array.isArray(positions)) {
        setStatusMessage('Invalid format: Expected an array of nodes');
        setStatusType('error');
        return;
      }
      
      // Basic validation
      for (const pos of positions) {
        if (!pos.id || !pos.position || typeof pos.position.x !== 'number' || typeof pos.position.y !== 'number') {
          setStatusMessage('Invalid node position format');
          setStatusType('error');
          return;
        }
      }
      
      setSavedPositions(positions);
      setCustomEdges(edges);
      setStatusMessage('Layout imported successfully!');
      setStatusType('success');
      setUserDraggedNodes(true);
    } catch (error) {
      setStatusMessage('Failed to parse JSON: ' + (error instanceof Error ? error.message : String(error)));
      setStatusType('error');
    }
  }, []);

  // Handle node click for edge creation
  const handleNodeClick = useCallback((nodeId: string) => {
    if (edgeCreationMode) {
      if (sourceNodeForEdge === null) {
        // First node selected (source)
        setSourceNodeForEdge(nodeId);
        setStatusMessage(`Selected source node: ${nodeId}. Now select a target node.`);
        setStatusType('info');
      } else {
        // Second node selected (target)
        if (sourceNodeForEdge === nodeId) {
          setStatusMessage('Cannot connect a node to itself');
          setStatusType('error');
        } else {
          // Create new edge
          const newEdge = {
            id: `custom-${sourceNodeForEdge}-${nodeId}`,
            source: sourceNodeForEdge,
            target: nodeId
          };
          
          setCustomEdges(prev => [...prev, newEdge]);
          setStatusMessage(`Created edge from ${sourceNodeForEdge} to ${nodeId}`);
          setStatusType('success');
        }
        
        // Reset for next edge creation
        setSourceNodeForEdge(null);
      }
    } else if (multiSelectionMode) {
      // If in multi-selection mode, track selected nodes
      setSelectedNodes(prev => {
        if (prev.includes(nodeId)) {
          return prev.filter(id => id !== nodeId); // Deselect
        } else {
          return [...prev, nodeId]; // Select
        }
      });
    }
  }, [edgeCreationMode, sourceNodeForEdge, multiSelectionMode]);

  const toggleEdgeCreationMode = useCallback(() => {
    if (multiSelectionMode) {
      setStatusMessage('Please disable multi-selection mode first');
      setStatusType('error');
      return;
    }
    
    setEdgeCreationMode(!edgeCreationMode);
    setSourceNodeForEdge(null);
    setStatusMessage(edgeCreationMode ? 'Edge creation mode disabled' : 'Edge creation mode enabled. Click on a source node, then a target node.');
    setStatusType('info');
  }, [edgeCreationMode, multiSelectionMode]);

  const toggleMultiSelectionMode = useCallback(() => {
    if (edgeCreationMode) {
      setStatusMessage('Please disable edge creation mode first');
      setStatusType('error');
      return;
    }
    
    setMultiSelectionMode(!multiSelectionMode);
    setSelectedNodes([]);
    setStatusMessage(multiSelectionMode ? 'Multi-selection mode disabled' : 'Multi-selection mode enabled. Hold Shift and select nodes to group them.');
    setStatusType('info');
  }, [multiSelectionMode, edgeCreationMode]);

  const toggleSelectionOnDrag = useCallback(() => {
    setSelectionOnDrag(!selectionOnDrag);
    setStatusMessage(selectionOnDrag ? 'Drag selection disabled' : 'Drag selection enabled. Drag to select multiple nodes.');
    setStatusType('info');
  }, [selectionOnDrag]);

  const clearCustomEdges = useCallback(() => {
    setCustomEdges([]);
    setStatusMessage('All custom edges cleared');
    setStatusType('info');
  }, []);
  
  // New alignment functions
  const alignNodes = useCallback((alignmentType: 'left' | 'center-h' | 'right' | 'top' | 'center-v' | 'bottom' | 'distribute-h' | 'distribute-v') => {
    if (selectedNodes.length < 2) {
      setStatusMessage('Please select at least 2 nodes to align');
      setStatusType('error');
      return;
    }

    // Get the current positions of all nodes
    const currentPositions = [...savedPositions];
    
    // Filter the positions to only include the selected nodes
    const selectedPositions = currentPositions.filter(pos => selectedNodes.includes(pos.id));
    
    if (selectedPositions.length < 2) {
      setStatusMessage('Could not find positions for selected nodes');
      setStatusType('error');
      return;
    }

    // Perform alignment based on type
    let updatedPositions;
    
    switch (alignmentType) {
      case 'left': {
        // Align to the leftmost node
        const leftmostX = Math.min(...selectedPositions.map(pos => pos.position.x));
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            return {
              ...pos,
              position: {
                ...pos.position,
                x: leftmostX
              }
            };
          }
          return pos;
        });
        break;
      }
      
      case 'center-h': {
        // Find average x position
        const avgX = selectedPositions.reduce((sum, pos) => sum + pos.position.x, 0) / selectedPositions.length;
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            return {
              ...pos,
              position: {
                ...pos.position,
                x: avgX
              }
            };
          }
          return pos;
        });
        break;
      }
      
      case 'right': {
        // Align to the rightmost node
        const rightmostX = Math.max(...selectedPositions.map(pos => pos.position.x));
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            return {
              ...pos,
              position: {
                ...pos.position,
                x: rightmostX
              }
            };
          }
          return pos;
        });
        break;
      }
      
      case 'top': {
        // Align to the topmost node
        const topmostY = Math.min(...selectedPositions.map(pos => pos.position.y));
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            return {
              ...pos,
              position: {
                ...pos.position,
                y: topmostY
              }
            };
          }
          return pos;
        });
        break;
      }
      
      case 'center-v': {
        // Find average y position
        const avgY = selectedPositions.reduce((sum, pos) => sum + pos.position.y, 0) / selectedPositions.length;
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            return {
              ...pos,
              position: {
                ...pos.position,
                y: avgY
              }
            };
          }
          return pos;
        });
        break;
      }
      
      case 'bottom': {
        // Align to the bottommost node
        const bottommostY = Math.max(...selectedPositions.map(pos => pos.position.y));
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            return {
              ...pos,
              position: {
                ...pos.position,
                y: bottommostY
              }
            };
          }
          return pos;
        });
        break;
      }
      
      case 'distribute-h': {
        // Distribute horizontally with equal spacing
        const sortedByX = [...selectedPositions].sort((a, b) => a.position.x - b.position.x);
        const leftmostX = sortedByX[0].position.x;
        const rightmostX = sortedByX[sortedByX.length - 1].position.x;
        const totalWidth = rightmostX - leftmostX;
        const spacing = totalWidth / (selectedPositions.length - 1);
        
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            const index = sortedByX.findIndex(sorted => sorted.id === pos.id);
            return {
              ...pos,
              position: {
                ...pos.position,
                x: leftmostX + (index * spacing)
              }
            };
          }
          return pos;
        });
        break;
      }
      
      case 'distribute-v': {
        // Distribute vertically with equal spacing
        const sortedByY = [...selectedPositions].sort((a, b) => a.position.y - b.position.y);
        const topmostY = sortedByY[0].position.y;
        const bottommostY = sortedByY[sortedByY.length - 1].position.y;
        const totalHeight = bottommostY - topmostY;
        const spacing = totalHeight / (selectedPositions.length - 1);
        
        updatedPositions = currentPositions.map(pos => {
          if (selectedNodes.includes(pos.id)) {
            const index = sortedByY.findIndex(sorted => sorted.id === pos.id);
            return {
              ...pos,
              position: {
                ...pos.position,
                y: topmostY + (index * spacing)
              }
            };
          }
          return pos;
        });
        break;
      }
      
      default:
        updatedPositions = currentPositions;
    }
    
    // Update state
    setSavedPositions(updatedPositions);
    setUserDraggedNodes(true);
    
    // Show success message
    setStatusMessage(`Nodes aligned ${alignmentType.replace('-', ' ')}`);
    setStatusType('success');
    
  }, [selectedNodes, savedPositions]);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>Brain Garden Components Diagram Editor</h3>
        <p>Drag the nodes to adjust their positions, then click "Capture Layout" to save the layout. You can also select multiple nodes to move them together.</p>
      </div>
      
      {statusMessage && (
        <div style={{ 
          padding: '12px',
          backgroundColor: statusType === 'success' ? '#d1fae5' : statusType === 'error' ? '#fee2e2' : '#e0f2fe',
          color: statusType === 'success' ? '#065f46' : statusType === 'error' ? '#7f1d1d' : '#0c4a6e',
          borderRadius: '4px',
          marginBottom: '12px'
        }}>
          {statusMessage}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button
          onClick={captureNodePositions}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1a365d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '16px' }}>📷</span>
          Capture Layout
        </button>
        
        <button
          onClick={() => setNodesDraggable(!nodesDraggable)}
          style={{
            padding: '8px 16px',
            backgroundColor: nodesDraggable ? '#4CAF50' : '#F44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '16px' }}>{nodesDraggable ? '✓' : '✗'}</span>
          {nodesDraggable ? 'Dragging Enabled' : 'Dragging Disabled'}
        </button>

        <button
          onClick={toggleEdgeCreationMode}
          style={{
            padding: '8px 16px',
            backgroundColor: edgeCreationMode ? '#4CAF50' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '16px' }}>🔗</span>
          {edgeCreationMode ? 'Edge Creation On' : 'Create Link Strand'}
        </button>

        <button
          onClick={toggleMultiSelectionMode}
          style={{
            padding: '8px 16px',
            backgroundColor: multiSelectionMode ? '#4CAF50' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '16px' }}>🔍</span>
          {multiSelectionMode ? 'Multi-Select On' : 'Enable Multi-Select'}
        </button>

        {multiSelectionMode && (
          <button
            onClick={toggleSelectionOnDrag}
            style={{
              padding: '8px 16px',
              backgroundColor: selectionOnDrag ? '#4CAF50' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '16px' }}>🖱️</span>
            {selectionOnDrag ? 'Drag Select On' : 'Enable Drag Select'}
          </button>
        )}

        {customEdges.length > 0 && (
          <button
            onClick={clearCustomEdges}
            style={{
              padding: '8px 16px',
              backgroundColor: '#F44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear Custom Links
          </button>
        )}
      </div>

      {/* New alignment control section - Only show when in multi-selection mode and nodes are selected */}
      {multiSelectionMode && selectedNodes.length >= 2 && (
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#e0f2fe', 
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Alignment Tools</h4>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Horizontal:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => alignNodes('left')}
                  title="Align Left"
                  style={{
                    padding: '8px',
                    backgroundColor: '#4a6bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                  }}
                >
                  ⬅️
                </button>
                <button
                  onClick={() => alignNodes('center-h')}
                  title="Align Center Horizontally"
                  style={{
                    padding: '8px',
                    backgroundColor: '#4a6bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                  }}
                >
                  ⬌
                </button>
                <button
                  onClick={() => alignNodes('right')}
                  title="Align Right"
                  style={{
                    padding: '8px',
                    backgroundColor: '#4a6bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                  }}
                >
                  ➡️
                </button>
                <button
                  onClick={() => alignNodes('distribute-h')}
                  title="Distribute Horizontally"
                  style={{
                    padding: '8px',
                    backgroundColor: '#9c27b0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    fontSize: '14px'
                  }}
                >
                  ⇹
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Vertical:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => alignNodes('top')}
                  title="Align Top"
                  style={{
                    padding: '8px',
                    backgroundColor: '#47b881',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                  }}
                >
                  ⬆️
                </button>
                <button
                  onClick={() => alignNodes('center-v')}
                  title="Align Center Vertically"
                  style={{
                    padding: '8px',
                    backgroundColor: '#47b881',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                  }}
                >
                  ⬍
                </button>
                <button
                  onClick={() => alignNodes('bottom')}
                  title="Align Bottom"
                  style={{
                    padding: '8px',
                    backgroundColor: '#47b881',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px'
                  }}
                >
                  ⬇️
                </button>
                <button
                  onClick={() => alignNodes('distribute-v')}
                  title="Distribute Vertically"
                  style={{
                    padding: '8px',
                    backgroundColor: '#9c27b0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    fontSize: '14px'
                  }}
                >
                  ⇳
                </button>
              </div>
            </div>
          </div>
          
          <p style={{ margin: '0', fontSize: '14px', color: '#0c4a6e' }}>
            Select multiple nodes and use these tools to quickly align or distribute them.
          </p>
        </div>
      )}

      {edgeCreationMode && (
        <div style={{ 
          padding: '12px',
          backgroundColor: '#e0f2fe',
          color: '#0c4a6e',
          borderRadius: '4px',
          marginBottom: '12px'
        }}>
          <strong>Link Strand Creation Mode</strong>
          <p>
            {sourceNodeForEdge 
              ? `Source node selected: ${sourceNodeForEdge}. Now click on a target node.` 
              : 'Click on a source node, then click on a target node to create a connection, or drag from one connection point to another.'}
          </p>
          <p style={{ marginTop: '8px', fontSize: '13px' }}>
            You can now drag directly from the top or bottom handle of any node to create connections. Top handles appear on System and Component nodes, bottom handles on Main and System nodes.
          </p>
        </div>
      )}

      {multiSelectionMode && selectedNodes.length > 0 && (
        <div style={{ 
          padding: '12px',
          backgroundColor: '#e0f2fe',
          color: '#0c4a6e',
          borderRadius: '4px',
          marginBottom: '12px'
        }}>
          <strong>Selected Nodes</strong>
          <p>You have selected {selectedNodes.length} nodes: {selectedNodes.join(', ')}</p>
        </div>
      )}
      
      {userDraggedNodes && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          marginBottom: '20px',
          backgroundColor: '#f3f4f6',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Layout Data</h4>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>This JSON represents the current layout including node positions and custom edges. Copy it to save your layout.</p>
          <pre 
            style={{
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '4px',
              maxHeight: '200px',
              overflow: 'auto',
              fontSize: '12px',
              border: '1px solid #e5e7eb'
            }}
          >
            {nodePositionsJson}
          </pre>
        </div>
      )}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '8px', 
        marginBottom: '20px',
        backgroundColor: '#f3f4f6',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>Import Layout</h4>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Paste a previously saved layout JSON here and click Import to apply it.</p>
        <textarea 
          ref={jsonInputRef}
          placeholder='Paste layout JSON here... Format: {"nodes": [...], "edges": [...]} or just a nodes array'
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #e5e7eb',
            minHeight: '100px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}
        />
        <button
          onClick={handleImportPositions}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            alignSelf: 'flex-start',
            marginTop: '8px'
          }}
        >
          Import Layout
        </button>
      </div>
      
      {/* Diagram container */}
      <div style={{ 
        width: '100%', 
        height: '700px', 
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <BrainGardenComponentsDiagram
          width="100%"
          height="100%"
          nodesDraggable={nodesDraggable}
          showZoomControls={true}
          debug={true}
          backgroundColor="#ffffff"
          initialNodePositions={savedPositions}
          customEdges={customEdges}
          onNodeClick={handleNodeClick}
          multiSelectionMode={multiSelectionMode}
          selectionOnDrag={selectionOnDrag}
          selectionKeys={['shift']}
          isEdgeCreationMode={edgeCreationMode}
        />
      </div>
    </div>
  );
};

// Export the interactive editor story
export const DiagramEditor = {
  render: () => <EnhancedNodeEditor />,
  name: 'Diagram Editor',
  parameters: {
    docs: {
      description: {
        story: 'Use this editor to manually position the nodes in the diagram. Drag nodes to position them, then capture the node positions to get the JSON representation of the layout. This allows you to find the optimal positioning for the Skill Jack System, Prompt System, Structured Documentation, Rules System, Project Management, and Watchers System components. You can also create custom link strands between nodes and select multiple nodes to move them together. The alignment tools help you quickly line up selected nodes horizontally or vertically. Each node now has connection handles at the top and/or bottom, making it easy to create links by dragging from one handle to another.',
      },
    },
  },
} satisfies Story;
