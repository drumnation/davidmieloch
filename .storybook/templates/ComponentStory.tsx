import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Helper to show responsive behavior
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{ 
    width: '100%',
    minHeight: '200px',
    padding: '20px',
    border: '1px dashed #ccc',
    borderRadius: '8px',
    position: 'relative',
  }}>
    <div style={{
      position: 'absolute',
      top: '4px',
      right: '4px',
      padding: '2px 6px',
      fontSize: '12px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
    }}>
      {/* Show current viewport width */}
      Width: {typeof window !== 'undefined' ? window.innerWidth : 0}px
    </div>
    {children}
  </div>
);

// Template for creating component stories
export const createComponentStory = <T extends React.ComponentType<any>>(
  Component: T,
  options: {
    title: string;
    argTypes?: Record<string, any>;
    args?: Record<string, any>;
    includeResponsiveContainer?: boolean;
  }
) => {
  const meta = {
    title: options.title,
    component: Component,
    parameters: {
      docs: {
        description: {
          component: 'Component description goes here.',
        },
      },
    },
    argTypes: options.argTypes,
    decorators: options.includeResponsiveContainer 
      ? [(Story) => <ResponsiveContainer><Story /></ResponsiveContainer>]
      : undefined,
  } satisfies Meta<typeof Component>;

  return {
    meta,
    createStory: (storyArgs: Record<string, any>): StoryObj<typeof meta> => ({
      args: {
        ...options.args,
        ...storyArgs,
      },
    }),
  };
}; 