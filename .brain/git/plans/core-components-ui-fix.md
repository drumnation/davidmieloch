# Multi-Commit Plan: Core Components UI Fixes

## Overview
Fix UI issues in the Core Components section including background color, card sizing, and text alignment.

## Commits

- [ ] Commit 1: 
<!-- fix(ui): update Core Components section background and layout -->

```commit-subject
fix(ui): update Core Components section background and layout
```

```commit-body
- Changed background from white to light gray
- Removed "Scroll horizontally to see more" text that was unnecessary
- Split Brain Garden Architecture section into a separate white section
- Updated console log message to match actual component layout
```

```commit-footer
```

Files:
- src/shared-components/sections/BrainGardenOverview/components/CoreComponentsSection/CoreComponentsSection.tsx

- [ ] Commit 2: 
<!-- fix(ui): improve FeatureGrid card sizing and alignment -->

```commit-subject
fix(ui): improve FeatureGrid card sizing and alignment
```

```commit-body
- Updated card grid to use minmax(0, 1fr) for equal column widths
- Set consistent height for card titles
- Added proper vertical alignment for descriptions
- Fixed the Structured Documentation card width to match others
```

```commit-footer
```

Files:
- src/shared-components/organisms/FeatureGrid/FeatureGrid.styles.ts
- src/shared-components/organisms/FeatureGrid/FeatureGrid.tsx 