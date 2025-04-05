const dagreGuide = {
    topic: "Best Practices for Layouts with Dagre",
    description: "A comprehensive guide to optimizing directed graph layouts using the Dagre JavaScript library, focusing on configuration options, performance optimization, and common implementation patterns to create clear, efficient graph visualizations.",
    relevance: "Directed graph visualization is essential in software development for displaying relationships, workflows, dependencies, and hierarchies. Dagre provides an efficient way to automatically layout these graphs, but requires careful configuration to achieve optimal results. Understanding these best practices helps developers create more readable and performant graph visualizations.",
    notes: [
        "* Note: This information is based on best practices as of April 2025. The latest version of Dagre is 1.0.4 (released November 2023).",
        "* Note: The Dagre project is maintained under the DagreJS organization on GitHub, not the original CPettitt repository."
    ],
    corePrinciples: [
        {
            name: "Configuration-Driven Layout",
            description: "Dagre relies heavily on configuration parameters to determine the final layout. Understanding these parameters and their effects is crucial for achieving optimal results. The primary method for configuration is passing an options object to `setGraph()`. Key configuration options include direction (rankdir), spacing parameters (nodeSep, edgeSep, rankSep), node alignment (align), and ranking algorithm (ranker). These parameters should be adjusted based on the specific characteristics of your graph and the visualization goals."
        },
        {
            name: "Layout Algorithm Selection",
            description: "Dagre offers multiple ranking algorithms that determine how nodes are assigned to ranks (layers): 'network-simplex' (default), 'tight-tree', and 'longest-path'. Each algorithm has different characteristics in terms of performance and layout quality. 'Network-simplex' generally provides a good balance between performance and quality and works well for most graphs. 'Tight-tree' can produce more compact layouts for tree-like structures. 'Longest-path' is simpler but may produce less optimal layouts. The choice should be based on your graph's structure and performance requirements."
        },
        {
            name: "Node and Edge Customization",
            description: "Properly specifying node dimensions and edge properties significantly impacts layout quality. Nodes require width and height attributes for accurate positioning. Edge properties like `minLen` (minimum rank distance between connected nodes) and `edgeWeight` (priority for straightening) can be used to fine-tune relationships. Custom edge routing is limited in Dagre, but basic control is possible through edge weights. For complex node shapes, consider using a bounding box approach where layout is calculated based on rectangular bounds."
        },
        {
            name: "Post-Processing Strategies",
            description: "Dagre's automated layouts often need post-processing adjustments. This includes handling anchor point differences (Dagre positions nodes at their center, while many rendering libraries use top-left corners), enforcing additional constraints not supported by Dagre (like node alignment), and making manual adjustments for special cases. Using transformation functions during the layout interpretation phase allows for these adjustments without modifying the core algorithm."
        },
        {
            name: "Performance Optimization",
            description: "For large graphs, performance optimization becomes critical. Dagre prioritizes speed over finding the most optimal layout, but large graphs can still cause performance issues. Strategies include minimizing unnecessary layout recalculations, using appropriate algorithm settings (like choosing 'network-simplex' ranker for better performance), caching layout results when appropriate, and considering partial layouts for large graphs where only a portion changes. Additionally, setting reasonable node separation values can prevent excessive computations."
        }
    ],
    applicationProcess: {
        description: "The process of implementing an effective Dagre layout involves several key steps, from initial graph preparation to rendering the final visualization. Each step requires careful consideration to ensure optimal results.",
        steps: [
            {
                stepName: "Graph Preparation",
                stepDescription: "Before running the Dagre layout algorithm, the graph structure must be properly prepared. This involves creating nodes and edges with the appropriate attributes and establishing the graph's configuration. Proper preparation significantly impacts the quality of the final layout.",
                agentActions: [
                    "Action 1: Create a new graph instance using the Graphlib library bundled with Dagre (`new dagre.graphlib.Graph()`).",
                    "Action 2: Set default edge labels using `.setDefaultEdgeLabel(() => ({}))` to ensure proper edge handling.",
                    "Action 3: Configure graph-wide settings with `.setGraph({})` including direction, spacing, and algorithm selection.",
                    "Action 4: Add nodes to the graph with `.setNode(nodeId, { width, height, ... })`, ensuring dimensions are specified.",
                    "Action 5: Add edges to the graph with `.setEdge(sourceId, targetId, { weight, minLen, ... })` including any custom edge properties."
                ]
            },
            {
                stepName: "Configuration Selection",
                stepDescription: "Selecting the appropriate configuration parameters is crucial for optimizing the layout. This step involves understanding the characteristics of your graph and choosing parameters that will produce the most effective visualization.",
                agentActions: [
                    "Action 1: Determine the primary flow direction using `rankdir` ('TB', 'LR', 'BT', 'RL') based on the logical flow of your graph.",
                    "Action 2: Set node spacing parameters (`nodeSep`, `edgeSep`, `rankSep`) based on the graph density and available display space.",
                    "Action 3: Select the appropriate ranking algorithm (`ranker`) based on graph characteristics and performance requirements.",
                    "Action 4: Configure alignment options (`align`) if specific node alignment within ranks is desired.",
                    "Action 5: Set `acyclicer` to 'greedy' if the graph may contain cycles that need to be resolved automatically."
                ]
            },
            {
                stepName: "Layout Calculation",
                stepDescription: "Running the Dagre layout algorithm efficiently is essential, especially for large graphs or interactive applications. This step involves executing the layout algorithm and handling any specific constraints or requirements.",
                agentActions: [
                    "Action 1: Run the layout algorithm with `dagre.layout(graph)` after all nodes, edges, and configuration are set.",
                    "Action 2: For large graphs, consider wrapping the layout calculation in a Web Worker to prevent UI blocking.",
                    "Action 3: Implement caching strategies for layouts that don't change frequently to avoid redundant calculations.",
                    "Action 4: Add timing measurements around layout calculation to identify performance bottlenecks.",
                    "Action 5: Handle any errors or exceptions that might occur during layout calculation."
                ]
            },
            {
                stepName: "Post-Layout Adjustments",
                stepDescription: "After Dagre calculates the layout, post-processing is often necessary to adapt the results to specific requirements or to compensate for Dagre's limitations. This step involves transforming the calculated positions and applying additional constraints.",
                agentActions: [
                    "Action 1: Extract node positions from the graph using `graph.node(nodeId)` to access calculated coordinates.",
                    "Action 2: Adjust coordinate systems if necessary (Dagre positions nodes at their center, many rendering systems use top-left corner).",
                    "Action 3: Apply any custom alignment constraints not handled natively by Dagre.",
                    "Action 4: Implement collision detection and resolution if nodes may overlap despite spacing settings.",
                    "Action 5: Adjust edge paths if the default paths generated by Dagre are not optimal for your visualization."
                ]
            },
            {
                stepName: "Rendering and Animation",
                stepDescription: "The final step is rendering the layout and implementing any transitions or animations. This step involves mapping the calculated layout to visual elements and ensuring smooth user experience during layout changes.",
                agentActions: [
                    "Action 1: Map the calculated node positions to your rendering framework (Canvas, SVG, HTML, etc.).",
                    "Action 2: Generate edge paths based on the source and target node positions.",
                    "Action 3: Implement smooth transitions when layouts change using animation frameworks or CSS transitions.",
                    "Action 4: Calculate the overall graph dimensions to implement view fitting or scrolling if needed.",
                    "Action 5: Add user interaction handlers for nodes and edges, ensuring they work with the layout."
                ]
            }
        ]
    },
    examples: {
        description: "These examples demonstrate practical implementations of Dagre layouts in various scenarios, showcasing how to configure and optimize the layout for different types of graphs and requirements.",
        useCases: [
            {
                name: "Basic Directed Graph Layout",
                scenario: "A common scenario where you need to visualize a workflow or process with clear directional flow, such as a simple pipeline or basic organization chart. This example uses standard configuration with minimal customization.",
                example: "```typescript\nimport * as dagre from 'dagre';\n\n// Create a new graph\nconst g = new dagre.graphlib.Graph();\n\n// Set default to assign to edges\ng.setDefaultEdgeLabel(() => ({}));\n\n// Set graph direction and spacing\ng.setGraph({\n  rankdir: 'TB',  // Top to bottom flow\n  nodeSep: 50,    // Pixels between nodes horizontally\n  rankSep: 100,   // Pixels between ranks (layers) vertically\n  ranker: 'network-simplex'  // Use the default ranking algorithm\n});\n\n// Add nodes with their dimensions\ng.setNode('A', { label: 'Node A', width: 100, height: 60 });\ng.setNode('B', { label: 'Node B', width: 100, height: 60 });\ng.setNode('C', { label: 'Node C', width: 100, height: 60 });\ng.setNode('D', { label: 'Node D', width: 100, height: 60 });\n\n// Add edges\ng.setEdge('A', 'B');\ng.setEdge('A', 'C');\ng.setEdge('B', 'D');\ng.setEdge('C', 'D');\n\n// Run the layout algorithm\ndagre.layout(g);\n\n// Extract the positions\nconst nodes = g.nodes().map(nodeId => {\n  const nodeData = g.node(nodeId);\n  // Convert from center coordinates to top-left for rendering\n  return {\n    id: nodeId,\n    label: nodeData.label,\n    x: nodeData.x - nodeData.width / 2,\n    y: nodeData.y - nodeData.height / 2,\n    width: nodeData.width,\n    height: nodeData.height\n  };\n});\n\n// Get the edge paths\nconst edges = g.edges().map(e => {\n  return {\n    source: e.v,\n    target: e.w,\n    points: g.edge(e).points\n  };\n});\n```"
            },
            {
                name: "Complex Hierarchical Layout with Subgraphs",
                scenario: "A more complex graph with hierarchical structure, such as an organizational chart with departments and teams, or a software architecture diagram with modules and components. This example demonstrates how to handle compound structures with Dagre.",
                example: "```typescript\nimport * as dagre from 'dagre';\n\n// Create a new graph\nconst g = new dagre.graphlib.Graph({ compound: true });\ng.setDefaultEdgeLabel(() => ({}));\n\n// Configure the graph\ng.setGraph({\n  rankdir: 'LR',       // Left to right flow\n  align: 'UL',         // Upper left alignment\n  ranker: 'tight-tree',// Better for hierarchical structures\n  nodeSep: 80,\n  rankSep: 150,\n  edgeSep: 30\n});\n\n// Add group nodes (departments)\ng.setNode('dept1', { label: 'Department 1', width: 300, height: 200, isGroup: true });\ng.setNode('dept2', { label: 'Department 2', width: 300, height: 200, isGroup: true });\n\n// Add individual nodes (employees) within departments\ng.setNode('emp1', { label: 'Employee 1', width: 100, height: 50 });\ng.setNode('emp2', { label: 'Employee 2', width: 100, height: 50 });\ng.setNode('emp3', { label: 'Employee 3', width: 100, height: 50 });\ng.setNode('emp4', { label: 'Employee 4', width: 100, height: 50 });\n\n// Set parent relationships\ng.setParent('emp1', 'dept1');\ng.setParent('emp2', 'dept1');\ng.setParent('emp3', 'dept2');\ng.setParent('emp4', 'dept2');\n\n// Add edges with custom weights to influence layout\ng.setEdge('emp1', 'emp2', { weight: 2 });\ng.setEdge('emp1', 'emp3', { weight: 1 });\ng.setEdge('emp2', 'emp4', { weight: 3, minLen: 2 });\n\n// Run the layout\ndagre.layout(g);\n\n// Custom post-processing for groups and their children\ng.nodes().forEach(nodeId => {\n  const node = g.node(nodeId);\n  if (node.isGroup) {\n    // Adjust group size based on children positions\n    const children = g.children(nodeId) || [];\n    if (children.length > 0) {\n      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;\n      children.forEach(childId => {\n        const child = g.node(childId);\n        minX = Math.min(minX, child.x - child.width/2);\n        minY = Math.min(minY, child.y - child.height/2);\n        maxX = Math.max(maxX, child.x + child.width/2);\n        maxY = Math.max(maxY, child.y + child.height/2);\n      });\n      \n      // Add padding to group boundaries\n      const padding = 20;\n      node.x = (minX + maxX) / 2;\n      node.y = (minY + maxY) / 2;\n      node.width = (maxX - minX) + padding * 2;\n      node.height = (maxY - minY) + padding * 2;\n    }\n  }\n});\n```"
            },
            {
                name: "Interactive Graph with Custom Node Positioning",
                scenario: "An interactive graph editor where users can manually position some nodes while others remain auto-arranged. This is useful for network diagrams or custom workflows where certain elements need specific positioning for clarity.",
                example: "```typescript\nimport * as dagre from 'dagre';\n\n// Track user-positioned nodes and auto-positioned nodes separately\nconst userPositionedNodes = new Map();\nconst autoPositionedNodes = new Set();\n\n// Function to update the layout while respecting user-positioned nodes\nfunction updateLayout(nodes, edges) {\n  const g = new dagre.graphlib.Graph();\n  g.setDefaultEdgeLabel(() => ({}));\n  \n  g.setGraph({\n    rankdir: 'TB',\n    nodeSep: 60,\n    rankSep: 120,\n    ranker: 'network-simplex',\n    marginx: 20,\n    marginy: 20\n  });\n  \n  // Add all nodes to the graph\n  nodes.forEach(node => {\n    g.setNode(node.id, {\n      label: node.label,\n      width: node.width,\n      height: node.height,\n      // If this is a user-positioned node, we'll preserve its position later\n      userPositioned: userPositionedNodes.has(node.id)\n    });\n  });\n  \n  // Add all edges\n  edges.forEach(edge => {\n    g.setEdge(edge.source, edge.target, {\n      weight: edge.weight || 1,\n      minLen: edge.minLen || 1\n    });\n  });\n  \n  // Run the layout calculation\n  dagre.layout(g);\n  \n  // Process the results, preserving user-positioned nodes\n  const resultNodes = nodes.map(node => {\n    const nodeData = g.node(node.id);\n    \n    if (userPositionedNodes.has(node.id)) {\n      // Use the user-defined position\n      const userPos = userPositionedNodes.get(node.id);\n      return {\n        ...node,\n        x: userPos.x,\n        y: userPos.y,\n        // Store calculated position for reference\n        calculatedX: nodeData.x - nodeData.width / 2,\n        calculatedY: nodeData.y - nodeData.height / 2\n      };\n    } else {\n      // Use the position calculated by dagre\n      autoPositionedNodes.add(node.id);\n      return {\n        ...node,\n        x: nodeData.x - nodeData.width / 2,\n        y: nodeData.y - nodeData.height / 2\n      };\n    }\n  });\n  \n  // Process edges, potentially with custom routing for user-positioned nodes\n  const resultEdges = edges.map(edge => {\n    const edgeData = g.edge(edge);\n    let points = edgeData.points;\n    \n    // If source or target is user-positioned, we might need custom routing\n    if (userPositionedNodes.has(edge.source) || userPositionedNodes.has(edge.target)) {\n      // Simple direct line for this example\n      // In practice, you might use a custom edge routing algorithm\n      const sourceNode = resultNodes.find(n => n.id === edge.source);\n      const targetNode = resultNodes.find(n => n.id === edge.target);\n      \n      points = [\n        { x: sourceNode.x + sourceNode.width/2, y: sourceNode.y + sourceNode.height/2 },\n        { x: targetNode.x + targetNode.width/2, y: targetNode.y + targetNode.height/2 }\n      ];\n    }\n    \n    return { ...edge, points };\n  });\n  \n  return { nodes: resultNodes, edges: resultEdges };\n}\n\n// Event handler for when a user manually positions a node\nfunction onNodeDragEnd(nodeId, x, y) {\n  userPositionedNodes.set(nodeId, { x, y });\n  autoPositionedNodes.delete(nodeId);\n  \n  // Update the layout while respecting user positioned nodes\n  const { nodes, edges } = updateLayout(currentNodes, currentEdges);\n  \n  // Update the visualization\n  renderGraph(nodes, edges);\n}\n\n// Button to reset all manually positioned nodes\nfunction resetAllPositions() {\n  userPositionedNodes.clear();\n  const { nodes, edges } = updateLayout(currentNodes, currentEdges);\n  renderGraph(nodes, edges);\n}\n```"
            }
        ]
    },
    codeExamples: [
        {
            description: "Custom alignment of nodes post-layout calculation. This example demonstrates how to process the Dagre layout results to enforce vertical alignment of specific nodes, which is not directly supported by Dagre's built-in options.",
            example: {
                language: "typescript",
                code: "```typescript\n// Function to align specific nodes vertically after Dagre layout\nfunction alignNodesVertically(graph, nodeIds) {\n  if (!nodeIds || nodeIds.length < 2) return;\n  \n  // Calculate the average X position\n  let totalX = 0;\n  nodeIds.forEach(nodeId => {\n    const node = graph.node(nodeId);\n    totalX += node.x;\n  });\n  const avgX = totalX / nodeIds.length;\n  \n  // Set all nodes to the same X position\n  nodeIds.forEach(nodeId => {\n    const node = graph.node(nodeId);\n    node.x = avgX;\n    \n    // We need to update edge points connecting to this node\n    graph.nodeEdges(nodeId).forEach(edge => {\n      const edgeObj = graph.edge(edge);\n      if (edgeObj.points && edgeObj.points.length > 0) {\n        if (edge.v === nodeId) {\n          // This node is the source, update the first point\n          edgeObj.points[0].x = avgX;\n        }\n        if (edge.w === nodeId) {\n          // This node is the target, update the last point\n          edgeObj.points[edgeObj.points.length - 1].x = avgX;\n        }\n      }\n    });\n  });\n  \n  return graph;\n}\n\n// Usage example\nconst g = createAndSetupGraph();\ndagre.layout(g);\n\n// Align specific nodes vertically\nalignNodesVertically(g, ['nodeA', 'nodeB', 'nodeC']);\n\n// Now render the adjusted graph\n```"
            }
        },
        {
            description: "Performance optimization for large graphs by implementing incremental layout. This technique only recalculates layouts for portions of the graph that have changed, which can significantly improve performance for interactive applications.",
            example: {
                language: "typescript",
                code: "```typescript\n// Function to perform incremental layout on a large graph\nfunction incrementalLayout(fullGraph, changedNodeIds, changedEdgeIds) {\n  // Create a subgraph containing only the changed nodes and their neighbors\n  const subgraph = new dagre.graphlib.Graph();\n  subgraph.setDefaultEdgeLabel(() => ({}));\n  subgraph.setGraph(fullGraph.graph());\n  \n  // Helper to add a node and its immediate neighbors to the subgraph\n  function addNodeWithNeighbors(nodeId) {\n    if (subgraph.hasNode(nodeId)) return;\n    \n    const node = fullGraph.node(nodeId);\n    subgraph.setNode(nodeId, { ...node });\n    \n    // Add all edges connected to this node\n    fullGraph.nodeEdges(nodeId).forEach(edge => {\n      const sourceId = edge.v;\n      const targetId = edge.w;\n      const edgeObj = fullGraph.edge(edge);\n      \n      // Add the connected node\n      if (sourceId !== nodeId && !subgraph.hasNode(sourceId)) {\n        subgraph.setNode(sourceId, { ...fullGraph.node(sourceId) });\n      }\n      if (targetId !== nodeId && !subgraph.hasNode(targetId)) {\n        subgraph.setNode(targetId, { ...fullGraph.node(targetId) });\n      }\n      \n      // Add the edge\n      if (!subgraph.hasEdge(edge)) {\n        subgraph.setEdge(sourceId, targetId, { ...edgeObj });\n      }\n    });\n  }\n  \n  // Add all changed nodes and their neighbors\n  changedNodeIds.forEach(nodeId => {\n    addNodeWithNeighbors(nodeId);\n  });\n  \n  // Add all changed edges and their connected nodes\n  changedEdgeIds.forEach(edgeId => {\n    const edge = fullGraph.edge(edgeId);\n    if (!subgraph.hasNode(edge.v)) {\n      subgraph.setNode(edge.v, { ...fullGraph.node(edge.v) });\n    }\n    if (!subgraph.hasNode(edge.w)) {\n      subgraph.setNode(edge.w, { ...fullGraph.node(edge.w) });\n    }\n    subgraph.setEdge(edge.v, edge.w, { ...edge });\n  });\n  \n  // Calculate layout for the subgraph\n  dagre.layout(subgraph);\n  \n  // Copy the new positions back to the full graph\n  subgraph.nodes().forEach(nodeId => {\n    const newPosition = subgraph.node(nodeId);\n    const fullNode = fullGraph.node(nodeId);\n    fullNode.x = newPosition.x;\n    fullNode.y = newPosition.y;\n  });\n  \n  // Update edge points\n  subgraph.edges().forEach(edge => {\n    const newEdge = subgraph.edge(edge);\n    const fullEdge = fullGraph.edge(edge);\n    fullEdge.points = [...newEdge.points];\n  });\n  \n  return fullGraph;\n}\n\n// Usage\nlet graph = createInitialGraph();\ndagre.layout(graph); // Initial full layout\n\n// Later, when changes occur\nfunction handleGraphChanges(addedNodes, modifiedNodes, addedEdges, removedEdges) {\n  // Update the graph structure\n  addedNodes.forEach(node => {\n    graph.setNode(node.id, { ...node });\n  });\n  \n  modifiedNodes.forEach(node => {\n    const graphNode = graph.node(node.id);\n    Object.assign(graphNode, node);\n  });\n  \n  addedEdges.forEach(edge => {\n    graph.setEdge(edge.source, edge.target, { ...edge });\n  });\n  \n  removedEdges.forEach(edge => {\n    graph.removeEdge(edge.source, edge.target);\n  });\n  \n  // Perform incremental layout\n  const changedNodeIds = [...addedNodes.map(n => n.id), ...modifiedNodes.map(n => n.id)];\n  const changedEdgeIds = [...addedEdges.map(e => ({ v: e.source, w: e.target })), \n                          ...removedEdges.map(e => ({ v: e.source, w: e.target }))];\n  \n  graph = incrementalLayout(graph, changedNodeIds, changedEdgeIds);\n  \n  // Render updated graph\n  renderGraph(graph);\n}\n```"
            }
        },
        {
            description: "Integration of Dagre with React and animation for smooth layout transitions. This example shows how to create a responsive graph component that smoothly animates between different layouts when the graph structure changes.",
            example: {
                language: "typescript",
                code: "```typescript\n// React component for an animated Dagre graph\nimport React, { useState, useEffect, useRef } from 'react';\nimport * as dagre from 'dagre';\nimport { motion } from 'framer-motion';\n\ninterface Node {\n  id: string;\n  label: string;\n  width: number;\n  height: number;\n  x?: number;\n  y?: number;\n}\n\ninterface Edge {\n  source: string;\n  target: string;\n  label?: string;\n}\n\ninterface GraphProps {\n  nodes: Node[];\n  edges: Edge[];\n  direction?: 'TB' | 'LR' | 'BT' | 'RL';\n  nodeSep?: number;\n  rankSep?: number;\n  onNodeClick?: (nodeId: string) => void;\n}\n\nconst DagreGraph: React.FC<GraphProps> = ({\n  nodes,\n  edges,\n  direction = 'TB',\n  nodeSep = 50,\n  rankSep = 100,\n  onNodeClick\n}) => {\n  const [layoutedNodes, setLayoutedNodes] = useState<Node[]>([]);\n  const [layoutedEdges, setLayoutedEdges] = useState<any[]>([]);\n  const prevNodesRef = useRef<Node[]>([]);\n  const prevEdgesRef = useRef<Edge[]>([]);\n  \n  useEffect(() => {\n    // Only recalculate layout if nodes or edges have changed\n    const nodesChanged = JSON.stringify(nodes) !== JSON.stringify(prevNodesRef.current);\n    const edgesChanged = JSON.stringify(edges) !== JSON.stringify(prevEdgesRef.current);\n    \n    if (nodesChanged || edgesChanged) {\n      calculateLayout();\n      prevNodesRef.current = [...nodes];\n      prevEdgesRef.current = [...edges];\n    }\n  }, [nodes, edges, direction, nodeSep, rankSep]);\n  \n  const calculateLayout = () => {\n    const g = new dagre.graphlib.Graph();\n    g.setDefaultEdgeLabel(() => ({}));\n    g.setGraph({\n      rankdir: direction,\n      nodeSep,\n      rankSep,\n      ranker: 'network-simplex'\n    });\n    \n    // Add nodes to the graph\n    nodes.forEach(node => {\n      g.setNode(node.id, {\n        label: node.label,\n        width: node.width,\n        height: node.height\n      });\n    });\n    \n    // Add edges to the graph\n    edges.forEach(edge => {\n      g.setEdge(edge.source, edge.target, { label: edge.label || '' });\n    });\n    \n    // Calculate the layout\n    dagre.layout(g);\n    \n    // Get the positioned nodes\n    const positionedNodes = nodes.map(node => {\n      const nodeWithPosition = g.node(node.id);\n      return {\n        ...node,\n        // Convert from center positions to top-left for SVG rendering\n        x: nodeWithPosition.x - nodeWithPosition.width / 2,\n        y: nodeWithPosition.y - nodeWithPosition.height / 2\n      };\n    });\n    \n    // Get the edge paths\n    const edgePaths = edges.map(edge => {\n      const edgeData = g.edge(edge.source, edge.target);\n      return {\n        ...edge,\n        points: edgeData.points\n      };\n    });\n    \n    setLayoutedNodes(positionedNodes);\n    setLayoutedEdges(edgePaths);\n  };\n  \n  // Calculate SVG viewBox based on graph dimensions\n  const svgWidth = 1000;\n  const svgHeight = 800;\n  \n  return (\n    <svg width=\"100%\" height=\"100%\" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>\n      <g>\n        {/* Render edges */}\n        {layoutedEdges.map(edge => {\n          const points = edge.points || [];\n          if (points.length === 0) return null;\n          \n          const pathPoints = points.map((p, i) => \n            i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`\n          ).join(' ');\n          \n          return (\n            <path\n              key={`${edge.source}-${edge.target}`}\n              d={pathPoints}\n              stroke=\"#999\"\n              strokeWidth=\"1.5\"\n              fill=\"none\"\n              markerEnd=\"url(#arrowhead)\"\n            />\n          );\n        })}\n        \n        {/* Render nodes with animation */}\n        {layoutedNodes.map(node => (\n          <motion.g\n            key={node.id}\n            initial={{ opacity: 0 }}\n            animate={{ \n              x: node.x,\n              y: node.y,\n              opacity: 1 \n            }}\n            transition={{ \n              type: 'spring',\n              stiffness: 100,\n              damping: 20,\n              mass: 1\n            }}\n            onClick={() => onNodeClick && onNodeClick(node.id)}\n            style={{ cursor: 'pointer' }}\n          >\n            <rect\n              width={node.width}\n              height={node.height}\n              rx={5}\n              ry={5}\n              fill=\"#fff\"\n              stroke=\"#333\"\n              strokeWidth=\"1.5\"\n            />\n            <text\n              x={node.width / 2}\n              y={node.height / 2}\n              textAnchor=\"middle\"\n              dominantBaseline=\"middle\"\n              fontSize=\"14\"\n            >\n              {node.label}\n            </text>\n          </motion.g>\n        ))}\n      </g>\n      \n      {/* Arrow marker definition */}\n      <defs>\n        <marker\n          id=\"arrowhead\"\n          viewBox=\"0 0 10 10\"\n          refX=\"9\"\n          refY=\"5\"\n          markerWidth=\"6\"\n          markerHeight=\"6\"\n          orient=\"auto\"\n        >\n          <path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#999\" />\n        </marker>\n      </defs>\n    </svg>\n  );\n};\n\nexport default DagreGraph;\n```"
            }
        }
    ],
    commonPitfalls: [
        {
            name: "Incorrect Node Dimensions",
            description: "One of the most common issues when using Dagre is failing to specify accurate node dimensions. Dagre requires width and height properties for each node to calculate proper spacing and prevent overlaps. Without these dimensions, Dagre may use default values (often 0), leading to node overlaps and poor layout quality.",
            solution: "Always specify width and height properties for each node when adding them to the graph. If node dimensions are dynamic or unknown in advance, estimate reasonable values or measure rendered nodes before layout calculation.",
            preventativeMeasures: [
                "Measure 1: Create a standard function that ensures all node objects have width and height properties before adding them to the graph.",
                "Measure 2: For dynamic content, consider pre-rendering nodes off-screen to measure their actual dimensions.",
                "Measure 3: Add validation that checks all nodes have valid dimensions before running the layout algorithm."
            ]
        },
        {
            name: "Anchor Point Misalignment",
            description: "Dagre positions nodes at their center point, but many rendering systems (like SVG) use the top-left corner as the reference point. This coordinate system mismatch causes nodes to appear in incorrect positions, typically offset by half their width and height.",
            solution: "Transform node positions after layout calculation by subtracting half the node's width and height from the x and y coordinates provided by Dagre.",
            preventativeMeasures: [
                "Measure 1: Create a standard transformation function that converts center-point coordinates to top-left coordinates.",
                "Measure 2: Document the coordinate transformation requirement in your codebase to ensure consistency.",
                "Measure 3: Create wrapper functions around Dagre that automatically handle the coordinate transformation."
            ]
        },
        {
            name: "Performance Issues with Large Graphs",
            description: "Dagre performance degrades with large graphs (typically those with hundreds of nodes or more). This can cause UI freezing, especially in interactive applications where layouts need to be recalculated frequently.",
            solution: "Implement performance optimizations such as incremental layouts for partial updates, web workers for background processing, caching of layout results, and limiting the visible portion of very large graphs.",
            preventativeMeasures: [
                "Measure 1: Monitor the size of your graphs and implement pagination or filtering for very large datasets.",
                "Measure 2: Use web workers to run Dagre layout calculations off the main thread.",
                "Measure 3: Implement layout caching to avoid recalculating layouts for unchanged graphs.",
                "Measure 4: Consider alternative layout algorithms for extremely large graphs."
            ]
        },
        {
            name: "Lack of Node Alignment",
            description: "Dagre does not provide built-in functionality to align specific nodes horizontally or vertically. This limitation becomes apparent when trying to create symmetric layouts or when certain nodes should be aligned for visual clarity.",
            solution: "Implement post-processing after Dagre layout calculation to adjust node positions. This typically involves calculating the average position for nodes that should be aligned and then updating their coordinates.",
            preventativeMeasures: [
                "Measure 1: Create utility functions for horizontal and vertical alignment that can be applied after layout calculation.",
                "Measure 2: Consider grouping nodes that need alignment into subgraphs with custom handling.",
                "Measure 3: For complex alignment requirements, consider alternative layout libraries like WebCola that support constraints."
            ]
        },
        {
            name: "Edge Routing Challenges",
            description: "Dagre's edge routing is simplistic and can produce suboptimal paths, especially in dense graphs or when nodes have been manually positioned. This can result in edge crossings, overlapping edges, or unnecessarily complex paths.",
            solution: "For complex edge routing needs, implement custom edge routing algorithms as a post-processing step after Dagre layout. Alternatively, use libraries specifically designed for edge routing in combination with Dagre's node positioning.",
            preventativeMeasures: [
                "Measure 1: Carefully configure edge weights and minimum lengths to influence Dagre's edge routing.",
                "Measure 2: Consider using spline interpolation to smooth edge paths instead of straight lines.",
                "Measure 3: For critical applications, implement custom orthogonal edge routing algorithms as post-processing.",
                "Measure 4: Evaluate specialized edge bundling libraries for very dense graphs."
            ]
        },
        {
            name: "Handling Cycles in Directed Graphs",
            description: "Dagre is designed for directed acyclic graphs (DAGs), and while it has an 'acyclicer' option to handle cycles, the results may not be visually optimal. Cycles can lead to unexpected layouts or even errors if not properly handled.",
            solution: "Set the 'acyclicer' option to 'greedy' when configuring the graph, which enables Dagre to automatically handle cycles. For better control, consider pre-processing the graph to identify and handle cycles before layout calculation.",
            preventativeMeasures: [
                "Measure 1: Always set the 'acyclicer' option when working with graphs that might contain cycles.",
                "Measure 2: Implement cycle detection and visualization to make cycles more apparent to users.",
                "Measure 3: Consider alternative layout algorithms for graphs where cycles are a primary feature rather than an exception."
            ]
        }
    ],
    improvementGuidelines: [
        {
            guideline: "Implement Layout Caching Mechanisms",
            detail: "Caching layout results can significantly improve performance, especially for static or infrequently changing graphs. Implement a caching system that stores layout results keyed by a hash of the graph structure. Only recalculate layouts when the graph structure changes. Track metrics like layout calculation time and cache hit rates to measure the effectiveness of your caching strategy. Consider time-based cache invalidation for long-running applications."
        },
        {
            guideline: "Add User Controls for Key Layout Parameters",
            detail: "Enhance user experience by providing controls for adjusting key layout parameters like rankdir, nodeSep, rankSep, and ranker. This allows users to customize the layout to their specific needs. Implement a layout preview mechanism that shows how parameter changes affect the layout before applying them permanently. Store user preferences to maintain consistency across sessions. Provide preset configurations for common use cases (e.g., 'compact', 'spread out', 'hierarchical')."
        },
    ]
}



