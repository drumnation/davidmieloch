# Storybook Snapshot Testing

This guide explains how to use snapshot testing with Storybook to ensure UI components remain consistent over time.

## What are Snapshot Tests?

Snapshot tests capture the rendered state of a component and save it as a reference. Future test runs compare the current state against this reference to detect unintended changes.

Benefits:
- Quick visual regression detection
- Ensures consistent component rendering
- Documents the expected appearance of components
- Low maintenance compared to manual testing

## How to Create Snapshot Tests

### 1. Create a Test File

For any component with Storybook stories, create a test file with the following naming convention:
- If your component is `ComponentName.tsx`
- Your stories file is `ComponentName.stories.tsx`
- Create a test file named `ComponentName.test.tsx`

### 2. Import Dependencies and Use the Snapshot Utility

```tsx
import { describe, it } from 'vitest';
import * as stories from './ComponentName.stories';
import { snapshotSuite } from '../../../.storybook/utils/snapshot';

// Create snapshots for all stories
snapshotSuite(stories, {
  suiteName: 'ComponentName Snapshots',
  // Optional: Skip specific stories
  // skip: ['StoryToSkip'],
  // Optional: Only test specific stories
  // only: ['StoryToTest'],
});
```

### 3. Run the Tests

Run the snapshot tests with:

```bash
pnpm test:snapshots
```

This will:
1. Find all test files matching the pattern `**/*.test.{ts,tsx}`
2. Generate snapshots for each story
3. Save the snapshots in a `__snapshots__` directory next to your test file

### 4. Updating Snapshots

When you intentionally change a component, update the snapshots with:

```bash
pnpm test:snapshots:update
```

## Configuration Options

The `snapshotSuite` utility accepts the following options:

| Option | Type | Description |
|--------|------|-------------|
| `suiteName` | string | Name for the test suite (default: 'Snapshots') |
| `skip` | string[] | Array of story names to skip |
| `only` | string[] | Array of story names to exclusively test |

## Best Practices

1. **Commit Snapshots**: Always commit snapshots to version control.
2. **Meaningful Updates**: Only update snapshots when the changes are intentional.
3. **Review Changes**: Carefully review snapshot changes during code reviews.
4. **Component Isolation**: Ensure stories don't have external dependencies that could make snapshots flaky.
5. **Test Coverage**: Create snapshots for all critical component states.

## Troubleshooting

### Snapshots Failing Unexpectedly

- Check for non-deterministic elements like dates or random values
- Ensure all story props are static
- Use component mocking for dynamic elements

### Snapshots Too Large/Noisy

- Focus on specific DOM elements using test IDs
- Use the `skip` option for complex or frequently changing stories

## Example

For a Button component, a typical test setup would be:

```tsx
// Button.test.tsx
import { describe, it } from 'vitest';
import * as stories from './Button.stories';
import { snapshotSuite } from '../../../.storybook/utils/snapshot';

snapshotSuite(stories, {
  suiteName: 'Button Component Snapshots',
});
```

This will create a snapshot test for each story in your Button stories file. 