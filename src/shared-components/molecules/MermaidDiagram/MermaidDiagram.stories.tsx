import type { Meta, StoryObj } from '@storybook/react';
import { MermaidDiagram } from './MermaidDiagram';

const meta = {
  title: 'Molecules/MermaidDiagram',
  component: MermaidDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for rendering Mermaid diagrams with various themes and styling options.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MermaidDiagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FlowChart: Story = {
  args: {
    definition: `
      graph TD
        A[Start] --> B{Is it working?}
        B -->|Yes| C[Great!]
        B -->|No| D[Debug]
        D --> B
    `,
    theme: 'default',
    width: '100%',
    height: 'auto',
  },
};

export const SequenceDiagram: Story = {
  args: {
    definition: `
      sequenceDiagram
        participant User
        participant AI
        participant System
        
        User->>AI: Request assistance
        AI->>System: Process request
        System->>AI: Return relevant information
        AI->>User: Provide solution
        User->>AI: Follow-up question
        AI->>User: Clarify solution
    `,
    theme: 'forest',
    width: '100%',
    height: 'auto',
  },
};

export const AIProcessFlow: Story = {
  args: {
    definition: `
      graph LR
        A[User Input] --> B[AI Processing]
        B --> C{Decision Point}
        C -->|Option 1| D[Action 1]
        C -->|Option 2| E[Action 2]
        D --> F[Result 1]
        E --> G[Result 2]
        F --> H[Feedback Loop]
        G --> H
        H --> A
    `,
    theme: 'default',
    width: '100%',
    height: 'auto',
    backgroundColor: '#f8f9fa',
  },
};

export const DarkTheme: Story = {
  args: {
    definition: `
      graph TD
        A[AI Strategy] --> B[Implementation]
        B --> C[Testing]
        C --> D[Deployment]
        D --> E[Monitoring]
        E --> F{Performance Check}
        F -->|Good| G[Continue]
        F -->|Poor| H[Optimize]
        H --> C
    `,
    theme: 'dark',
    width: '100%',
    height: 'auto',
    backgroundColor: '#1A1B1E',
  },
};
