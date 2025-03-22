# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
