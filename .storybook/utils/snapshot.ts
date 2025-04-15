import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../src/test-utils/test-wrapper';

/**
 * Creates snapshot tests for all stories of a component.
 * 
 * @param stories - The default export from a story file (the Meta object)
 * @param options - Configuration options for snapshots
 * @returns Test suite with snapshot tests for each story
 */
export function snapshotSuite(
  stories: Record<string, unknown>, 
  options: {
    suiteName?: string;
    skip?: string[];
    only?: string[];
  } = {}
) {
  const { suiteName = 'Snapshots', skip = [], only } = options;
  
  // Get all story exports (excluding default export)
  const storyExports = Object.entries(stories).filter(([key]) => key !== 'default');
  
  // Filter stories based on options
  const storiesToTest = only
    ? storyExports.filter(([storyName]) => only.includes(storyName))
    : storyExports.filter(([storyName]) => !skip.includes(storyName));

  describe(suiteName, () => {
    storiesToTest.forEach(([storyName, Story]) => {
      it(`${storyName} snapshot`, () => {
        // Get the component and props from the Story
        const { component: Component } = stories.default as { component: React.ComponentType<unknown> };
        const props = (Story as Record<string, unknown>).args || {};
        
        // Create the wrapped element
        const wrappedElement = renderWithProviders(React.createElement(Component, props));
        
        // Render the component with story props
        const { container } = render(wrappedElement);
        
        // Create snapshot
        expect(container).toMatchSnapshot();
      });
    });
  });
} 