import DefaultNode from './DefaultNode';
import PillNode from './PillNode';
import { NodeTypes } from '@xyflow/react';

export { DefaultNode, PillNode };

export const nodeTypes: NodeTypes = {
  default: DefaultNode,
  pill: PillNode,
} as NodeTypes; 