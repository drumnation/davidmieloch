# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### [0.8.0] - 2024-07-06

### Added
- Microsoft Clarity analytics integration for user behavior insights
- Created ClarityProvider component for easy implementation
- Implemented analytics utility with support for:
  - Custom tags and events
  - User identification
  - Cookie consent management
  - Session priority upgrades
- Added environment variable support for Clarity project ID

### [0.7.4] - 2024-07-05

### Changed
- Added thumbnail images for OTG Management PDF files:
  - Generated first-page thumbnails for all PDF documents
  - Enhanced visual presentation of PDF documents in the Experience view
  - Improved user experience by showing preview of PDF content

### [0.7.3] - 2024-07-05

### Changed
- Updated OTG Management media content:
  - Removed SoundCloud embed
  - Added three PDF case studies and documentation
  - Set appropriate widths for PDF display

### [0.7.2] - 2024-07-05

#### Improved
- Redesigned blog post cards with horizontal layout (image on left, content on right)
- Reduced height of blog post cards to be more compact
- Added real Medium article images
- Enhanced visual hierarchy of blog post titles and descriptions
- Fixed responsiveness on mobile with stacked layout
- Standardized styling across all components (Experience and Education)

### [0.7.1] - 2024-07-05

#### Improved
- Enhanced styling for link-type media items with bold titles and prominent call-to-action buttons
- Added hover effects to link cards for better user interaction
- Fixed image loading and placeholder display for blog post links
- Adjusted width to stack blog posts in a single column for better readability
- Created SVG placeholders for blog post thumbnails to ensure consistent display
- Standardized button styling across all link media items

### [0.7.0] - 2024-07-05

#### Added
- Support for link-type media items in Experience and Education components
- Styled link display with thumbnails, titles, and descriptions
- Hover effects for link thumbnails to improve user interaction
- Media type 'link' in MediaItem interfaces for both Experience page and shared components

#### Improved
- Enhanced overall media item display consistency
- Added proper media item width control with $isWide prop

### [0.6.9] - 2024-07-05

#### Improved
- Enhanced media caption styling in Experience and Education components
- Standardized caption font size and formatting across all media types
- Improved PDF display with larger, more visible PDF icon with red background
- Aligned media captions consistently at the bottom of media containers
- Added proper border radius handling for media containers
- Ensured consistent height for media items to improve layout alignment
- Added border separation between media content and captions
- Increased font size and padding for improved readability

### [0.4.0] - 2024-03-22

#### Changed
- Downgraded from React 19 to React 18.2.0 for better stability and compatibility
- Updated framer-motion to version 10.18.0 (compatible with React 18)
- Simplified animation implementation to avoid React 19-specific features

### [0.3.3] - 2024-03-26

#### Fixed
- Fixed enterprise-ai-development-framework page by ensuring proper integration with Framer Motion
- Resolved issue with missing hero sections and content sections
- Added proper logging of hero props for debugging animation issues
- Documented fix in project plan and updated animation library strategy

### [0.3.2] - 2024-03-25

#### Fixed

- Restored missing Hero sections by reinstating Framer Motion animations
- Added framer-motion@10.18.0 as a dependency for compatibility with animations
- Updated Hero component for better animation handling and transitions
- Fixed enhanceHeroProps function to properly set backgroundImage and pattern properties

### [0.3.1] - 2024-03-23

#### Fixed

- Animation issues in WhitePaper component by switching from react-spring to styled-components animations to avoid type conflicts
- Improved component loading to prevent hydration mismatch errors

### [0.3.0] - 2024-03-21

#### Added

- Header navigation with active state highlighting
- New page routing structure
- Better error boundaries around component sections

#### Changed

- Updated project organization to follow atomic design principles
- Improved component folder structure for better maintainability

### [0.2.0] - 2024-03-19

#### Added

- Storybook integration for component development
- Basic grid layout for repository display
- First version of Repo Card component

#### Changed

- Enhanced styling system with theme provider

### [0.1.0] - 2024-03-17

#### Added

- Initial project setup with Next.js and TypeScript
- Configured styled-components with SSR support
- Created basic page layout structure
- Set up initial routing

### Added
- Advanced media layout system with nested groups and stacked layouts in SideProjectsSection
- Support for complex media arrangements with flexible width options
- Fixed half-width property for side project media items
- Improved styling for media titles with better spacing and typography

### Changed
- Updated styling for media items to be more responsive
- Improved media container to use flexbox for better layout control
- Fixed styling for media titles, making them 15px left padding, 2pt larger and bold

### Fixed
- Fixed issue with halfWidth project media items not displaying correctly
- Fixed media containers not respecting width properties in certain contexts
- Removed Saturn Business Systems from side projects to avoid duplication, as it's already included in the main work experience
- Moved Saturn Business Systems media content from side projects to the work experience section
- Fixed Saturn Business Systems videos to display side-by-side and prevent autoplay
- Added generated thumbnails for Saturn Business Systems PDF documents

## [0.3.1] - 2023-11-07

### Added
- Enhanced PDF thumbnails with more realistic document preview design
- Improved visual styling for PDF document thumbnails with document title display and preview mockup
- Better metadata extraction from PDF documents for thumbnail title display

### Fixed
- Saturn Business Systems videos now display side-by-side and don't autoplay
- Added proper video element support for direct MP4 playback with controls
- Removed Saturn Business Systems from side projects to avoid duplication (already in work experience)
- Fixed issues with halfWidth project media items not displaying correctly
- Ensured media containers respect width properties in certain contexts
- Added generated thumbnails for Saturn Business Systems PDF documents

## [0.3.2] - 2023-11-08

### Improved
- Enhanced visibility of sales and marketing positions by making the previous experience accordion expanded by default
- Updated previous experience section title to explicitly mention "Sales & Marketing Experience" for better clarity
- Improved subtitle text to clarify the type of positions in the older experience section

### Fixed
- Enhanced PDF thumbnail generation to display actual first pages of PDF documents
- Removed fixed height constraint from experience accordion to ensure all positions are visible
- Updated PDF thumbnail script to use pdftoppm for reliable PDF page rendering
- Improved consistency of media display in the experience section

## [0.3.4] - 2023-11-08

### Added
- Enhanced StoryTime project with detailed description and media content
- Added comprehensive screenshots and audio samples for StoryTime project
- Expanded We Learn Music Together project with detailed feature description
- Added mockup screenshots for We Learn Music Together mobile application
- Improved project details with proper tech stack and impact descriptions

## [0.3.5] - 2023-11-08

### Fixed
- Added display of titles for embedded media items in the Experience section
- Enhanced embed handling to show titles when provided while keeping them optional
- Improved visual styling of embed titles for better readability and consistency

## [0.3.6] - 2023-11-08

### Fixed
- Added support for displaying descriptions for PDF type media items
- Fixed inconsistency in media item descriptions across different media types
- Ensured consistent styling for all media item descriptions

## [0.3.3] - 2023-11-08
