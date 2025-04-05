"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { AnimationDebugger, AnimationErrorBoundary } from '../utils/animations/debug-tools';
import { disableReactFlowAnimations } from '../utils/animations/disable-react-flow-animations';
import { motion } from 'framer-motion';

// Import the components we want to test
import { ImpactGrid } from '../shared-components/organisms/ImpactGrid/ImpactGrid';
import { ChallengeBreakdown } from '../shared-components/organisms/ChallengeBreakdown/ChallengeBreakdown';
import { DebtAnalysis } from '../shared-components/organisms/DebtAnalysis/DebtAnalysis';
import { ProblemSolution } from '../shared-components/organisms/ProblemSolution/ProblemSolution';
import { DebugSection } from '../shared-components/molecules/DebugSection/DebugSection';
import { ReactFlowProvider } from '@xyflow/react';
import { ReactFlowDiagram } from '../shared-components/molecules/ReactFlowDiagram/ReactFlowDiagram';

// Sample data for components
const impactGridData = {
  impacts: [
    {
      category: 'Category 1',
      metrics: ['Metric 1.1', 'Metric 1.2', 'Metric 1.3']
    },
    {
      category: 'Category 2',
      metrics: ['Metric 2.1', 'Metric 2.2', 'Metric 2.3']
    }
  ],
  style: 'default' as const,
  position: 'full-width' as const
};

const challengeBreakdownData = {
  title: 'Challenge Breakdown',
  description: 'Test description for Challenge Breakdown',
  challenges: [
    { 
      title: 'Challenge 1', 
      description: 'Description 1',
      impact: 'Impact description 1' 
    },
    { 
      title: 'Challenge 2', 
      description: 'Description 2',
      impact: 'Impact description 2' 
    },
    { 
      title: 'Challenge 3', 
      description: 'Description 3',
      impact: 'Impact description 3' 
    },
  ],
  style: 'gradient-card' as const,
  position: 'full-width' as const
};

const debtAnalysisData = {
  title: 'Debt Analysis',
  categories: [
    { 
      title: 'Debt Category 1', 
      current_state: 'Current state 1',
      impact: 'Impact 1' 
    },
    { 
      title: 'Debt Category 2', 
      current_state: 'Current state 2',
      impact: 'Impact 2' 
    },
    { 
      title: 'Debt Category 3', 
      current_state: 'Current state 3',
      impact: 'Impact 3' 
    },
  ],
  style: 'default' as const,
  position: 'full-width' as const
};

const problemSolutionData = {
  problem: 'Sample problem description',
  consequence: 'Sample consequence description',
  metrics: [
    'Metric 1',
    'Metric 2',
    'Metric 3'
  ],
  style: 'default' as const,
  position: 'full-width' as const
};

// Sample data for ReactFlow
const reactFlowSampleData = {
  definition: {
    nodes: [
      {
        id: '1',
        type: 'default',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 }
      },
      {
        id: '2',
        type: 'default',
        data: { label: 'Node 2' },
        position: { x: 250, y: 100 }
      }
    ],
    edges: [
      {
        id: 'e1-2',
        source: '1',
        target: '2'
      }
    ]
  },
  showZoomControls: true,
  showBackground: true,
  width: '100%',
  height: '400px'
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DebugHeader = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.h3`
  font-size: 1rem;
  margin: 0;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${props => props.active ? '#4CAF50' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#e0e0e0'};
  }
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const DebugInfo = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 2rem;
  max-height: 200px;
  overflow: auto;
  font-family: monospace;
  white-space: pre-wrap;
`;

const InfoLabel = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const DebugReactSpringPage: React.FC = () => {
  // State to control which components are displayed
  const [activeComponents, setActiveComponents] = useState({
    impactGrid: false,
    challengeBreakdown: false,
    debtAnalysis: false,
    problemSolution: false,
    reactFlowDiagram: false,
  });

  // State for animation library selection
  const [animationLibrary, setAnimationLibrary] = useState<'react-spring' | 'framer-motion' | 'none'>('none');
  
  // State for debug information
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // State for monitoring memory usage
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);

  // Initialize with only one component active to isolate issues
  useEffect(() => {
    // Apply animation disabling when the page loads
    if (typeof window !== 'undefined') {
      if (animationLibrary === 'none') {
        disableReactFlowAnimations();
        setDebugInfo(prev => prev + '\n[Debug] Animations disabled');
      }
      
      // Log console debugging instructions
      console.log('%c React Spring Debugging Page', 'font-size: 16px; color: blue; font-weight: bold;');
      console.log('Instructions:');
      console.log('1. Enable components one by one to identify which causes the error');
      console.log('2. Look for [AnimationDebugger] and [ReactSpringDebugger] messages in the console');
      console.log('3. When an error occurs, check which component was last enabled');
      
      // Monitor memory usage
      const memoryInterval = setInterval(() => {
        if ('performance' in window && 'memory' in (performance as any)) {
          const memoryInfo = (performance as any).memory;
          setMemoryUsage(Math.round(memoryInfo.usedJSHeapSize / (1024 * 1024)));
        }
      }, 1000);
      
      // Clean up
      return () => {
        clearInterval(memoryInterval);
      };
    }
  }, [animationLibrary]);

  // Use a more specific type for component names
  type ComponentName = 'impactGrid' | 'challengeBreakdown' | 'debtAnalysis' | 'problemSolution' | 'reactFlowDiagram';

  const toggleComponent = (componentName: ComponentName) => {
    setActiveComponents(prev => {
      const newState = {
        ...prev,
        [componentName]: !prev[componentName],
      };
      
      // Log state change
      setDebugInfo(prevInfo => {
        const timestamp = new Date().toISOString();
        return `${prevInfo}\n[${timestamp}] ${componentName} ${newState[componentName] ? 'enabled' : 'disabled'}`;
      });
      
      return newState;
    });
  };
  
  // Toggle animation library
  const setAnimationMode = (mode: 'react-spring' | 'framer-motion' | 'none') => {
    setAnimationLibrary(mode);
    
    // Log state change
    setDebugInfo(prevInfo => {
      const timestamp = new Date().toISOString();
      return `${prevInfo}\n[${timestamp}] Animation library changed to ${mode}`;
    });
    
    // Force reload to apply changes
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <>
      <Head>
        <title>React Spring Debugging</title>
      </Head>
      
      <Container>
        <DebugHeader>
          <Title>React Spring Debugging Page</Title>
          <Subtitle>
            Use this page to isolate and debug animation issues by enabling components one by one
          </Subtitle>
        </DebugHeader>
        
        <DebugInfo>
          <InfoLabel>Debug Log:</InfoLabel>
          {debugInfo || 'No debug information yet.'}
          {memoryUsage && (
            <div style={{ marginTop: '1rem' }}>
              <InfoLabel>Memory Usage:</InfoLabel>
              {memoryUsage} MB
            </div>
          )}
        </DebugInfo>
        
        <Controls>
          <ControlGroup>
            <ControlLabel>Animation Library</ControlLabel>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ToggleButton 
                active={animationLibrary === 'react-spring'} 
                onClick={() => setAnimationMode('react-spring')}
              >
                React Spring
              </ToggleButton>
              <ToggleButton 
                active={animationLibrary === 'framer-motion'} 
                onClick={() => setAnimationMode('framer-motion')}
              >
                Framer Motion
              </ToggleButton>
              <ToggleButton 
                active={animationLibrary === 'none'} 
                onClick={() => setAnimationMode('none')}
              >
                No Animation
              </ToggleButton>
            </div>
          </ControlGroup>
          
          <ControlGroup>
            <ControlLabel>Components</ControlLabel>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <ToggleButton 
                active={activeComponents.impactGrid} 
                onClick={() => toggleComponent('impactGrid')}
              >
                Impact Grid
              </ToggleButton>
              <ToggleButton 
                active={activeComponents.challengeBreakdown} 
                onClick={() => toggleComponent('challengeBreakdown')}
              >
                Challenge Breakdown
              </ToggleButton>
              <ToggleButton 
                active={activeComponents.debtAnalysis} 
                onClick={() => toggleComponent('debtAnalysis')}
              >
                Debt Analysis
              </ToggleButton>
              <ToggleButton 
                active={activeComponents.problemSolution} 
                onClick={() => toggleComponent('problemSolution')}
              >
                Problem Solution
              </ToggleButton>
              <ToggleButton 
                active={activeComponents.reactFlowDiagram} 
                onClick={() => toggleComponent('reactFlowDiagram')}
              >
                ReactFlow Diagram
              </ToggleButton>
            </div>
          </ControlGroup>
        </Controls>
        
        <ComponentGrid>
          {activeComponents.impactGrid && (
            <DebugSection title="Impact Grid">
              <AnimationErrorBoundary componentName="ImpactGrid">
                {animationLibrary === 'framer-motion' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ImpactGrid {...impactGridData} />
                  </motion.div>
                ) : (
                  <ImpactGrid {...impactGridData} />
                )}
              </AnimationErrorBoundary>
            </DebugSection>
          )}
          
          {activeComponents.challengeBreakdown && (
            <DebugSection title="Challenge Breakdown">
              <AnimationErrorBoundary componentName="ChallengeBreakdown">
                {animationLibrary === 'framer-motion' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ChallengeBreakdown {...challengeBreakdownData} />
                  </motion.div>
                ) : (
                  <ChallengeBreakdown {...challengeBreakdownData} />
                )}
              </AnimationErrorBoundary>
            </DebugSection>
          )}
          
          {activeComponents.debtAnalysis && (
            <DebugSection title="Debt Analysis">
              <AnimationErrorBoundary componentName="DebtAnalysis">
                {animationLibrary === 'framer-motion' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <DebtAnalysis {...debtAnalysisData} />
                  </motion.div>
                ) : (
                  <DebtAnalysis {...debtAnalysisData} />
                )}
              </AnimationErrorBoundary>
            </DebugSection>
          )}
          
          {activeComponents.problemSolution && (
            <DebugSection title="Problem Solution">
              <AnimationErrorBoundary componentName="ProblemSolution">
                {animationLibrary === 'framer-motion' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ProblemSolution {...problemSolutionData} />
                  </motion.div>
                ) : (
                  <ProblemSolution {...problemSolutionData} />
                )}
              </AnimationErrorBoundary>
            </DebugSection>
          )}
          
          {activeComponents.reactFlowDiagram && (
            <DebugSection title="ReactFlow Diagram">
              <AnimationErrorBoundary componentName="ReactFlowDiagram">
                <div style={{ height: '400px' }}>
                  <ReactFlowProvider>
                    {animationLibrary === 'framer-motion' ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ height: '100%' }}
                      >
                        <ReactFlowDiagram
                          definition={reactFlowSampleData.definition}
                          showZoomControls={reactFlowSampleData.showZoomControls}
                          showBackground={reactFlowSampleData.showBackground}
                          width={reactFlowSampleData.width}
                          height={reactFlowSampleData.height}
                        />
                      </motion.div>
                    ) : (
                      <ReactFlowDiagram
                        definition={reactFlowSampleData.definition}
                        showZoomControls={reactFlowSampleData.showZoomControls}
                        showBackground={reactFlowSampleData.showBackground}
                        width={reactFlowSampleData.width}
                        height={reactFlowSampleData.height}
                      />
                    )}
                  </ReactFlowProvider>
                </div>
              </AnimationErrorBoundary>
            </DebugSection>
          )}
        </ComponentGrid>
      </Container>
    </>
  );
};

export default DebugReactSpringPage; 