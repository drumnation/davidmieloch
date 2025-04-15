// @vitest-environment jsdom

import React from 'react';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import type { Meta, StoryFn } from '@storybook/react';
import { composeStories } from '@storybook/react';
import { TestWrapper } from './test-utils/test-wrapper';

type StoryFile = {
  default: Meta;
  [name: string]: StoryFn | Meta;
};

// Helper to compose stories
const compose = (entry: StoryFile) => {
  try {
    return composeStories(entry);
  } catch (e) {
    console.error(`Error composing stories for module:`, e);
    throw e;
  }
};

// Import all story files
// @ts-expect-error - import.meta.glob is a Vite-specific feature
const storyModules = import.meta.glob<StoryFile>('./shared-components/**/*.stories.{ts,tsx}', {
  eager: true,
});

// Configuration options
const options = {
  suite: 'Storybook Snapshots',
  disableRegex: /DoNotTest$/,
  maxStories: 5, // Limit per component for faster testing
};

// Process and test all stories
describe(options.suite, () => {
  Object.entries(storyModules).forEach(([filePath, storyModule]) => {
    // Extract component name from file path
    const componentName = path.basename(filePath).replace(/\.(stories|story)\.[^/.]+$/, '');
    
    // Get metadata from the story file
    // @ts-expect-error - We know this is a StoryFile but TypeScript can't infer it
    const meta = storyModule.default;
    const title = meta.title || componentName;
    
    // Skip if component is marked to be excluded
    if (options.disableRegex.test(title) || meta.parameters?.storyshots?.disable) {
      return;
    }
    
    describe(title, () => {
      try {
        // Compose all stories using Storybook's composeStories
        // This applies context, decorators, and args
        // @ts-expect-error - We know this is a StoryFile but TypeScript can't infer it
        const composedStories = compose(storyModule);
        
        // Get all composed stories (excluding default export)
        const stories = Object.entries(composedStories)
          // Filter out stories that should be skipped
          .filter(([storyName]) => !composedStories[storyName].parameters?.storyshots?.disable)
          .slice(0, options.maxStories); // Limit number of stories
        
        // Skip if no valid stories
        if (stories.length === 0) {
          it.skip(`${title} (No valid stories)`, () => {});
          return;
        }
        
        // Test each story
        stories.forEach(([storyName, Story]) => {
          // Skip if story is marked to be skipped
          // Check if this story should be skipped
          const testFn = Story.parameters?.storyshots?.skip ? it.skip : it;
          
          testFn(`${storyName}`, async () => {
            // Render the story inside the TestWrapper for consistent context
            const { container } = render(
              <TestWrapper>
                <Story />
              </TestWrapper>
            );
            
            // Create snapshot
            expect(container).toMatchSnapshot();
          });
        });
      } catch (error) {
        console.error(`Error processing stories for ${title}:`, error);
        it(`${title} failed to process`, () => {
          throw error;
        });
      }
    });
  });
}); 