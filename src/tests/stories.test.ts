import { describe, it, expect } from 'vitest';
import type { Meta, StoryFn } from '@storybook/react';

// Define a type for the story modules
type StoryModule = {
  default: Meta;
  [key: string]: StoryFn | Meta;
};

// This test verifies that all story files can be imported properly
// It uses Vite's import.meta.glob feature to find all story files

describe('Story files check', () => {
  it('should ensure story files can be imported', async () => {
    // Use Vite's import.meta.glob to get all story files 
    // @ts-expect-error - import.meta.glob is a Vite-specific feature
    const storyModules = import.meta.glob('/src/**/*.stories.{ts,tsx}', { eager: true });
    
    // Log the number of story files found
    const storyFilesCount = Object.keys(storyModules).length;
    console.log(`Found ${storyFilesCount} story files to validate`);
    
    // Make sure we found some story files - we know there should be about 88
    expect(storyFilesCount).toBeGreaterThan(50);
    
    // Check each story file
    let validStoryCount = 0;
    let totalIndividualStories = 0;
    
    for (const [path, rawModule] of Object.entries(storyModules)) {
      try {
        // Cast the module to our expected type
        const storyModule = rawModule as StoryModule;
        
        // Check if it has a default export (the meta object)
        expect(storyModule.default).toBeDefined();
        expect(storyModule.default.title).toBeDefined();
        expect(storyModule.default.component).toBeDefined();
        
        // Check if at least one story is exported
        const storyExports = Object.entries(storyModule).filter(([key]) => key !== 'default');
        expect(storyExports.length).toBeGreaterThan(0);
        
        // Extract the story name from the path
        const storyName = path.split('/').pop()?.replace(/\.stories\.(ts|tsx)$/, '') || 'Unknown';
        
        // Add to the total count of individual stories
        totalIndividualStories += storyExports.length;
        
        // Log success
        console.log(`✅ Successfully validated ${storyName} stories (${storyExports.length} stories found)`);
        validStoryCount++;
      } catch (error) {
        // Log detailed error but continue testing other stories
        console.error(`❌ Failed to validate story file ${path}:`, error);
        throw error;
      }
    }
    
    console.log(`✅ Total validated story files: ${validStoryCount}/${storyFilesCount}`);
    console.log(`✅ Total individual stories across all files: ${totalIndividualStories}`);
    
    // We expect a significant number of individual stories
    expect(totalIndividualStories).toBeGreaterThan(150);
  });
}); 