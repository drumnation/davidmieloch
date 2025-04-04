'use client';

import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Panel,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  useStore,
  NodeChange,
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  BackgroundVariant,
  NodePositionChange,
  ReactFlowState,
  NodeRemoveChange,
  EdgeRemoveChange,
  ReactFlow as ReactFlowComponent
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Import types
import { DiagramEditorProps, NodePosition } from './DiagramEditor.types';

// Import styled components
import {
  DiagramContainer,
  DiagramTitle,
  DiagramDescription,
  DiagramWrapper,
  FlowContainer,
  ControlButton,
  PrimaryButton,
  ZoomLabel,
  ZoomSlider,
  ControlsContainer,
  HelpText,
  ButtonGroup,
  ZoomButton,
  DiagramBody,
  DiagramHeader,
} from './DiagramEditor.styles';

/**
 * Main component for the diagram editor
 */
const DiagramEditor: React.FC<DiagramEditorProps> = ({
  nodes,
  edges,
  nodeTypes,
  width = '898px',
  height = '798px',
  backgroundColor = '#f9f9f9',
  headerBackgroundColor = '#1e293b',
  title,
  description,
  initialZoom = 0.65,
  initialPosition = { x: 0, y: 0 },
  maxZoom = 5,
  minZoom = 0.1,
  showEditControls = false,
  isStorybook = false,
  onPositionsChange,
  className = '',
  accessibilityDescription,
}) => {
  // State for managing nodes and edges
  const [localNodes, setLocalNodes] = useState(nodes);
  const [localEdges, setLocalEdges] = useState(edges);
  const [zoomLevel, setZoomLevel] = useState<number>(initialZoom);
  const [sliderValue, setSliderValue] = useState<number>(initialZoom * 100);
  
  // Reference for ReactFlow instance
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const initialized = useRef(false);
  
  // Get current viewport from store
  const transform = useStore((state: ReactFlowState) => state.transform);
  
  // Initialize viewport on component mount
  useEffect(() => {
    if (!initialized.current && reactFlowInstance) {
      reactFlowInstance.setViewport({ 
        x: initialPosition.x, 
        y: initialPosition.y, 
        zoom: initialZoom 
      });
      initialized.current = true;
    }
  }, [reactFlowInstance, initialPosition, initialZoom]);
  
  // Update zoom level when viewport changes
  useEffect(() => {
    if (transform[2] !== zoomLevel) {
      setZoomLevel(transform[2]);
      setSliderValue(transform[2] * 100);
    }
  }, [transform, zoomLevel]);
  
  // Handlers for node and edge changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      // Update node positions if they have changed
      const positionChanges = changes.filter(
        (change): change is NodePositionChange => change.type === 'position'
      );
      
      if (positionChanges.length > 0 && onPositionsChange) {
        const newPositions = positionChanges.map((change) => ({
          id: change.id,
          position: change.position,
        })) as NodePosition[];
        
        onPositionsChange(newPositions);
      }
      
      setLocalNodes((nds) =>
        nds.map((node) => {
          const change = changes.find((c) => 
            c.type === 'position' && 'id' in c && c.id === node.id
          ) as NodePositionChange | undefined;
          
          if (change && change.position) {
            return {
              ...node,
              position: change.position,
            };
          }
          return node;
        })
      );
    },
    [onPositionsChange]
  );
  
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setLocalEdges((eds) =>
        eds.map((edge) => {
          const change = changes.find((c) => 
            'id' in c && c.id === edge.id
          );
          
          if (change) {
            return {
              ...edge,
              ...change,
            };
          }
          return edge;
        })
      );
    },
    []
  );
  
  const onConnect = useCallback(
    (connection: Connection) => {
      setLocalEdges((eds) => [
        ...eds,
        {
          id: `${connection.source}-${connection.target}`,
          source: connection.source || '',
          target: connection.target || '',
          sourceHandle: connection.sourceHandle,
          targetHandle: connection.targetHandle,
        } as Edge,
      ]);
    },
    []
  );
  
  // Handlers for controlling zoom
  const handleZoomIn = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomIn();
    }
  }, [reactFlowInstance]);
  
  const handleZoomOut = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.zoomOut();
    }
  }, [reactFlowInstance]);
  
  const handleFitView = useCallback(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 });
    }
  }, [reactFlowInstance]);
  
  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      setSliderValue(value);
      
      if (reactFlowInstance) {
        const newZoom = value / 100;
        reactFlowInstance.setViewport({ 
          x: transform[0], 
          y: transform[1], 
          zoom: newZoom 
        });
      }
    },
    [reactFlowInstance, transform]
  );
  
  // Capture positions when moved
  const onMove = useCallback(() => {
    if (reactFlowInstance) {
      setZoomLevel(reactFlowInstance.getViewport().zoom);
      setSliderValue(reactFlowInstance.getViewport().zoom * 100);
    }
  }, [reactFlowInstance]);
  
  return (
    <DiagramContainer className={className} style={{ width, height, backgroundColor }} role="region" aria-label={accessibilityDescription || 'Interactive diagram'}>
      <DiagramHeader style={{ backgroundColor: headerBackgroundColor }}>
        {title && <DiagramTitle>{title}</DiagramTitle>}
        {description && <DiagramDescription>{description}</DiagramDescription>}
      </DiagramHeader>
      <DiagramBody>
        <ReactFlowProvider>
          <DiagramWrapper ref={reactFlowWrapper}>
            <ReactFlowComponent
              nodes={localNodes}
              edges={localEdges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onMove={onMove}
              fitView
              fitViewOptions={{ padding: 0.1 }}
              defaultViewport={{ x: initialPosition.x, y: initialPosition.y, zoom: initialZoom }}
              minZoom={minZoom}
              maxZoom={maxZoom}
              nodesDraggable={!isStorybook}
              nodesConnectable={!isStorybook}
              elementsSelectable={!isStorybook}
              proOptions={{ hideAttribution: true }}
              style={{ background: 'transparent' }}
            >
              {!isStorybook && <Background variant={BackgroundVariant.Dots} gap={12} size={1} />}
              
              {!isStorybook && showEditControls && (
                <Panel position="top-right">
                  <ButtonGroup>
                    <ZoomButton onClick={handleFitView}>Fit View</ZoomButton>
                  </ButtonGroup>
                </Panel>
              )}
              
              {!isStorybook && (
                <Panel position="bottom-right">
                  <ButtonGroup>
                    <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
                    <ZoomSlider
                      type="range"
                      min={minZoom * 100}
                      max={maxZoom * 100}
                      value={sliderValue}
                      onChange={handleSliderChange}
                    />
                    <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
                  </ButtonGroup>
                </Panel>
              )}
              
              {!isStorybook && <Controls showZoom={false} showInteractive={false} />}
            </ReactFlowComponent>
          </DiagramWrapper>
        </ReactFlowProvider>
      </DiagramBody>
    </DiagramContainer>
  );
};

export default DiagramEditor; 