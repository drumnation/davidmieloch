'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  Node,
  Edge,
  ReactFlowProvider,
  NodeTypes,
  EdgeTypes,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
import { AnimationDebugger, AnimationErrorBoundary } from '../../../utils/animations/debug-tools';
import { 
  disableReactFlowAnimations, 
  getNoAnimationOptions, 
  diagnoseReactFlowIssues,
} from '../../../utils/animations/disable-react-flow-animations';

import {
  ReactFlowDiagramProps,
  ReactFlowDefinition,
} from './ReactFlowDiagram.types';
import {
  StyledReactFlow,
  ReactFlowGlobalStyles,
} from './ReactFlowDiagram.styles';
import { nodeTypes, themeMapperUtils } from './utils';

// Initialize the diagnostics only in development mode
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // This is called once at module load time
  disableReactFlowAnimations();
}

// Default node type to ensure type safety
const defaultNodeTypes: NodeTypes = {
  default: (props) => (
    <div style={{ 
      padding: '10px',
      borderRadius: '3px',
      width: '150px',
      fontSize: '12px',
      color: '#222',
      textAlign: 'center',
      border: '1px solid #1a192b'
    }}>
      {props.data?.label || 'Default Node'}
    </div>
  ),
};

// Default edge types to ensure type safety
const defaultEdgeTypes: EdgeTypes = {};

export const ReactFlowDiagramContent: React.FC<ReactFlowDiagramProps> = ({
  definition,
  className = '',
  theme = 'default',
  showZoomControls = false,
  showBackground = false,
  customOptions = {},
}) => {
  const componentName = "ReactFlowDiagramContent";
  
  const { nodes, edges } = useMemo(() => {
    if (typeof definition === 'object' && definition !== null) {
      try {
        const validNodes = ((definition as ReactFlowDefinition).nodes || []).map(
          (node) => {
            if (
              !node.position ||
              typeof node.position.x !== 'number' ||
              typeof node.position.y !== 'number'
            ) {
              console.warn(
                `Node ${node.id} has invalid position, using fallback`,
                node.position,
              );
              return {
                ...node,
                position: { x: 0, y: 0 },
                data: node.data || { label: `Node ${node.id}` },
              };
            }
            return node;
          },
        );
        return {
          nodes: validNodes as Node[],
          edges: ((definition as ReactFlowDefinition).edges as Edge[]) || [],
        };
      } catch (error) {
        console.error('Error parsing ReactFlow definition:', error);
        return { nodes: [], edges: [] };
      }
    }
    return {
      nodes: [
        {
          id: '1',
          type: 'default',
          position: { x: 100, y: 100 },
          data: { label: 'Default Node' },
        },
      ],
      edges: [],
    };
  }, [definition]);

  const themeConfig = useMemo(() => themeMapperUtils.getThemeConfig(theme), [
    theme,
  ]);
  const combinedClassName = `${className} ${showBackground ? 'react-flow--with-background' : ''}`.trim();

  // Static key based on theme to prevent re-renders
  const reactFlowKey = useMemo(() => {
    return `flow-static-${theme}-${new Date().getTime()}`; // Add timestamp to force remounting
  }, [theme]);

  // Get animation-safe options
  const noAnimationOptions = useMemo(() => getNoAnimationOptions(), []);

  // Ensure nodeTypes is properly defined with type safety
  const safeNodeTypes = useMemo(() => {
    if (nodeTypes && Object.keys(nodeTypes).length > 0) {
      return nodeTypes as NodeTypes;
    }
    
    if (customOptions.nodeTypes && Object.keys(customOptions.nodeTypes).length > 0) {
      return customOptions.nodeTypes as NodeTypes;
    }
    
    return defaultNodeTypes;
  }, [customOptions.nodeTypes]);

  // Ensure edgeTypes is properly defined with type safety
  const safeEdgeTypes = useMemo(() => {
    if (customOptions.edgeTypes && Object.keys(customOptions.edgeTypes).length > 0) {
      return customOptions.edgeTypes as EdgeTypes;
    }
    
    return defaultEdgeTypes;
  }, [customOptions.edgeTypes]);

  // Prepare final options, ensuring animations are disabled
  const finalOptions = useMemo(() => {
    return {
      ...noAnimationOptions,
      // Only include essential custom options that won't interfere with animation disabling
      ...(safeEdgeTypes ? { edgeTypes: safeEdgeTypes } : {})
    };
  }, [noAnimationOptions, safeEdgeTypes]);

  // Run diagnostics in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const diagnostics = diagnoseReactFlowIssues();
      return () => {
        diagnostics.cleanup();
      };
    }
  }, []);

  // Animation variants for fade-in
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <AnimationErrorBoundary componentName={componentName}>
      <ReactFlowProvider>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          style={{ width: '100%', height: '100%' }}
        >
          <StyledReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={safeNodeTypes}
            edgeTypes={safeEdgeTypes} 
            fitView
            className={combinedClassName}
            key={reactFlowKey}
            {...finalOptions}
          >
            {showBackground && <Background />}
            {showZoomControls && <Controls />}
          </StyledReactFlow>
        </motion.div>
      </ReactFlowProvider>
    </AnimationErrorBoundary>
  );
}; 