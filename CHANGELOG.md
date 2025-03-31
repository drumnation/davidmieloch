# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### [0.21.2] - 2025-03-31

#### Added
- Created update-changelog.sh script for simplified changelog management- Created standardized changelog structure with Keep a Changelog format
### [0.21.1] - 2025-03-31

#### Added
- Created update-changelog.sh script for simplified changelog management- Added modular Cursor rules system with `.brain/rules/` directory
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
- Consolidated multiple changelog files (@changelog.md, changelog.md) into single CHANGELOG.md- Refactored monolithic `.cursorrules` into a minimal file 
- Improved rule organization with proper typing (Always Apply, Auto Attach, Agent Requested)
- Enhanced file metadata with descriptions and appropriate glob patterns

#### Improved
- Improved context efficiency by applying rules only when needed
- Added proper version control for cursor rules by storing in `.brain/rules/`
- Enhanced maintainability by splitting rules into logical units
