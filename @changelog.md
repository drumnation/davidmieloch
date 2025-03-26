# Changelog

## [Unreleased]

### Added
- Created four new SVG icons for the BestPractices page: react-native.svg, enterprise.svg, ai-synergy.svg, and future.svg
- Added icons to existing sections in the DetailedContent component
- Added two new sections to the BestPractices page: "The Synergy of AI and Modern Development Practices" and "Conclusion: Building for the Future"
- Added Expo icon and "Expo for Mobile Development" item to the Modern Tooling section
- Created collaboration.svg icon and added a "Let's Work Together" Call to Action section to the BestPractices page
- Added a dedicated React Native & Expo section to the BestPractices page with consistent styling
- Created a separate ReactNativeFeature component for better code organization and reusability
- Added a decorative page separator between DetailedContent and Categories sections with a code icon
- Added a new 'row' layout option to the FeatureGrid component for horizontal card displays
- Added horizontal scroll indicator with "Scroll horizontally to see more →" message for row layouts
- Added visual enhancements to row layout including animated card entrances and scroll shadows
- Added new AiIntegrationProcessDiagram component that uses React Flow instead of Mermaid.js
- Updated AiAutopilotAnalogy component to use the new React Flow based diagram instead of Mermaid

### Fixed
- Fixed icon display issues for "The Synergy of AI and Modern Development Practices" and "Conclusion: Building for the Future" sections
- Added proper bottom padding to accommodate the music player
- Fixed name conflict in SectionTitle export between Categories and DetailedContent components
- Fixed key property handling in CategoryItems to ensure type safety
- Fixed excessive whitespace in the React Native feature section for a more compact appearance
- Fixed spacing in CategoryCard by setting proper margins between titles, descriptions, and items
- Corrected horizontal alignment of category cards by standardizing height and spacing
- Removed excessive top margin in ReactNativeFeature component for better visual flow with other sections
- Fixed the duplicate ReactNativeFeature component issue in BestPractices.tsx that was causing extra whitespace
- Adjusted page separator styling with reduced top margin, black line color, and improved icon visibility
- Fixed white space issues in BrainGardenOverview sections by converting grid layouts to horizontal row layouts
- Fixed performance issues with complex diagrams by starting migration to React Flow

### Changed
- Enhanced image loading with priority flag for important section icons
- Improved layout of the Call to Action section to ensure it appears at the bottom of the page
- Moved Expo content from Modern Tooling category to a dedicated React Native section
- Updated the React Native section to maintain consistent styling with the rest of the site
- Preserved the 3-column grid layout for category cards
- Repositioned the React Native section to appear below the category grid for better visual flow
- Refactored ReactNativeFeature from inline code to a dedicated component for better maintainability
- Reduced padding and margins in ReactNativeFeature component for a more compact layout
- Updated ReactNativeFeature to use a two-column layout for feature items, optimizing space usage
- Changed ReactNativeFeature icon from Expo to React Native for better representation
- Updated ReactNativeFeature items to highlight more specialized React Native development capabilities
- Added visual separation between page sections with styled separator component for better content organization
- Refined page separator design with black gradient line and subtle border around the icon
- Changed FeatureGrid component in ForceMultipliersSection and CoreComponentsSection to use 'row' layout instead of grid
- Enhanced FeatureGrid styling with shadow effects and improved card animations for row layouts
- Updated FeatureGrid row layout to enable horizontal scrolling with visual indicators
- Started migration from Mermaid.js to React Flow for improved diagram performance and styling consistency
- Migrated diagram components from `src/shared-components/diagrams` to `src/components/diagrams`
- Updated folder structure to follow component organization pattern:
  - Base components (ReactFlowDiagram) in `src/shared-components/molecules`
  - Specific diagram implementations in `src/components/diagrams`
- Updated import paths in components using the diagram components

### Removed 
- Removed Expo item from the Modern Tooling category (now in React Native feature section)
- Removed duplicate ReactNativeFeature component from BestPractices.tsx as it was already included in the Categories component 