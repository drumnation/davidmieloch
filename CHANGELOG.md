# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Created comprehensive Storybook story for AiIntegrationProcessDiagram with multiple height/theme variants [#DevEx]
- Added `scripts/storybook-diagram-dev.sh` for streamlined diagram development with auto-reload [#DevEx]

### Fixed
- Fixed Client-Side Rendering issues with diagrams by implementing client wrapper components for GardenMetaphorDiagram, PerformanceScalabilityDiagram, and AiIntegrationProcessDiagram [#BugFix]
- Updated all diagram references in sections to use client-side wrapped versions [#BugFix]
- Improved Storybook compatibility by updating stories to use client-wrapped components [#DevEx]
- Fixed image path errors in Experience page by adding leading slashes to relative image paths [#BugFix]
- Fixed React props warning in LanguageDot component by properly handling the showName prop [#BugFix]
- Improved validation for node positions in ReactFlowDiagram to prevent "Cannot read properties of undefined" errors [#BugFix]
- Fixed node box sizing issues in AiIntegrationProcessDiagram where text was larger than containing boxes [#BugFix]
- Removed accidental `/ai-integration-flow-diagram` route that was not part of the intended site structure [#Cleanup]
- Fixed node box sizing issues in AiIntegrationFlowDiagram where text was larger than containing boxes [#BugFix]
- Fixed rendering issues with AiIntegrationFlowDiagram by completely refactoring the component [#BugFix]
- Added error handling in AiAutopilotAnalogy component to prevent crashes when rendering diagrams [#BugFix]
- Added Medium domains to Next.js image configuration to allow external images from Medium blogs [#BugFix]
- Fixed all relative image paths in SideProjectsSection, including logoPath and thumbnail properties for project items (game-sage-logo.png, prompt-forge-logo.png, etc.) [#BugFix]
- Added upload.wikimedia.org to next.config.js image domains to allow Wikipedia image loading [#BugFix]
- Added VSCode Gallery domain (drumnation.gallerycdn.vsassets.io) to next.config.js for extension images [#BugFix]

### Improved
- Further enhanced AiIntegrationProcessDiagram readability by increasing node sizes, adding bold text, and thicker connection lines [#UX]
- Significantly increased diagram height from 800px to 1400px in AiAutopilotAnalogy section for better visibility of the entire flow [#Accessibility]
- Improved AiIntegrationProcessDiagram with fitView, defaultZoom, and padding options for better layout [#UX]
- Enhanced AiIntegrationProcessDiagram readability by increasing node sizes and adding proper padding and font sizing [#UX]
- Increased diagram height from 600px to 800px in AiAutopilotAnalogy section for better visibility [#Accessibility]
- Enhanced AiIntegrationFlowDiagram readability by increasing diagram height to 1600px and enlarging node sizes with better spacing [#UX]
- Improved text legibility in diagram nodes by increasing font size and adding padding [#Accessibility]
- Simplified AiIntegrationFlowDiagram implementation to use styled components instead of ReactFlow for better reliability [#Refactor]
- Enhanced TeamCustomizationSection with proper styling, padding, and card components for better visual presentation [#UX]
- Significantly enhanced TeamCustomizationSection UI with gradient cards, icons, visual dividers, and proper background styling [#UX]
- Enhanced diagram presentation with better titles, borders and contextual descriptions [#UX]
- Fixed legibility issues in content sections by implementing proper card-based layout and spacing [#Accessibility]
- Added visual hierarchy with section headers, consistent typography, and better content structure [#Design]
- Changed CoreComponentsSection background to white for proper visual alternation between sections [#Design]

### [0.21.10] - 2025-03-31

#### Removed
- Deleted redundant script files from the `scripts/` directory after confirming they work correctly in `.brain/scripts/` [#Cleanup]

### [0.21.9] - 2025-03-31

#### Changed
- Reorganized Braingarden scripts by moving them from `scripts/` to `.brain/scripts/` directory [#Structure]
- Updated all references to scripts in rules and documentation to use the new paths [#Refactor]
- Created clear separation between Braingarden system scripts and project-specific scripts [#Architecture]

### [0.21.8] - 2025-03-31

#### Enhanced
- Expanded `.brain/docs/cursor-rules-system.md` to include detailed changelog management system documentation [#Documentation]
- Added Braingarden CLI integration plan for both rule and changelog management [#Planning]
- Incorporated changelog scripts as a core component of the rule system architecture [#Integration]

### [0.21.7] - 2025-03-31

#### Added
- Created `.brain/docs/cursor-rules-system.md` with comprehensive documentation of the entire rules system [#Documentation]
- Added detailed plans for Braingarden CLI integration for rule management [#Planning]

#### Changed
- Removed redundant `.brain/code-standards.md` file since it has been converted to a Cursor rule [#Cleanup]

### [0.21.6] - 2025-03-31

#### Changed
- Converted `.brain/code-standards.md` to a Cursor rule (`.brain/rules/code-standards.mdc`) [#Refactor]
- Updated project initialization workflow to reference the new code-standards rule instead of the standalone file [#Process]

### [0.21.5] - 2025-03-31

#### Fixed
- Removed duplicate update-rule-symlinks.sh from .brain/rules/ directory [#Cleanup]
### [0.21.4] - 2025-03-31

#### Changed
- Moved update-rule-symlinks.sh from .brain/rules/ to scripts/ directory for better organization [#Refactor]
### [0.21.3] - 2025-03-31

#### Added
- Created changelog-summary.sh for generating component-specific history reports [#DevEx]- Created changelog-search.sh for finding specific entries in the changelog [#DevEx]- Added changelog integration to the Cursor rules workflow [#DevEx]
### [0.21.2] - 2025-03-31

#### Added
- Created changelog-summary.sh for generating component-specific history reports [#DevEx]- Created changelog-search.sh for finding specific entries in the changelog [#DevEx]- Created update-changelog.sh script for simplified changelog management- Created standardized changelog structure with Keep a Changelog format
### [0.21.1] - 2025-03-31

#### Added
- Created changelog-summary.sh for generating component-specific history reports [#DevEx]- Created changelog-search.sh for finding specific entries in the changelog [#DevEx]- Created update-changelog.sh script for simplified changelog management- Added modular Cursor rules system with `.brain/rules/` directory
- Created separate rule files for different aspects of the project:
  - `project-initialization.mdc`: Core workflow and initialization steps
  - `component-standards.mdc`: React component structure standards
  - `typescript-standards.mdc`: TypeScript formatting and best practices
  - `project-goals-requirements.mdc`: Project goals and requirements
  - `browser-automation-guide.mdc`: Guide for using browser-use tool
  - `mcp-inception-guide.mdc`: Guide for using MCP-Inception server
  - `claude-code-guide.mdc`: Guide for using Claude Code commands
  - `project-structure-overview.mdc`: Directory structure conventions
- Added symlink management system between `.brain/rules/` and `.cursor/rules/`
- Created script to update and manage rule symlinks (`update-rule-symlinks.sh`)
- Added date/time standards with formatted timestamps (YYYY-MM-DD HH:MM:SS AM/PM)
- Created cursor rules workaround documentation

#### Changed
- Updated project initialization workflow to include reading the changelog [#Process]- Consolidated multiple changelog files (@changelog.md, changelog.md) into single CHANGELOG.md- Refactored monolithic `.cursorrules` into a minimal file 
- Improved rule organization with proper typing (Always Apply, Auto Attach, Agent Requested)
- Enhanced file metadata with descriptions and appropriate glob patterns

#### Improved
- Updated cursor-rules-workaround.mdc to reference the script in its new location [#Documentation]- Enhanced changelog entries with tags for better categorization and searchability [#Organization]- Improved context efficiency by applying rules only when needed
- Added proper version control for cursor rules by storing in `.brain/rules/`

### Changed
- Refactored BrainGardenOverview component to improve code organization and maintainability:
  - Added custom `useSectionVisibility` hook to abstract IntersectionObserver logic
  - Created reusable `AnimatedSection` component to reduce duplication
  - Removed debugging console logs
  - Simplified icon processing logic
  - Improved overall component structure