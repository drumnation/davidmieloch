# Technical Details: Mobile Viewport Stories

## Overview
Mobile viewport stories showcase how components adapt to different screen sizes, particularly mobile devices. These stories use the Storybook viewport addon to display components at mobile screen sizes to demonstrate responsive behavior.

## Key Design Decisions & Rationale
* **Consistent Viewport Settings**: Using 'mobile' as the standard viewport for mobile stories across all components to maintain consistency.
* **Inheriting Args from Base Story**: Mobile stories inherit args from their desktop counterparts to ensure consistent content between views.
* **Descriptive Documentation**: Each mobile story includes documentation describing the specific responsive behaviors.

## Implementation Notes
* Mobile stories follow a naming convention of `[ComponentName]Mobile` (e.g., `DefaultMobile`, `AccentStyleMobile`).
* Mobile stories use the viewport parameter to set the display size: `defaultViewport: 'mobile'`.
* Components should demonstrate responsive behavior like:
  - Adapting layout for smaller screens
  - Maintaining readability of content
  - Implementing touch-friendly interaction patterns
  - Showing horizontal scrolling where applicable

## Usage / API
To create a mobile story for a component:
```tsx
export const ComponentNameMobile: Story = {
  args: {
    ...ComponentName.args, // Inherit desktop story args
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Description of how the component behaves on mobile devices.',
      },
    },
  },
};
```

## Gotchas / Known Issues
* Ensure consistent viewport naming across stories ('mobile' preferred)
* Some CSS-in-JS libraries may require special handling for media queries
* Complex interactive components may need additional mobile-specific interactions 