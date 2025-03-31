# Cursor Rules System Documentation
# Last Updated: 2025-03-31 11:10:05 AM

## Overview

The Cursor Rules System is a structured approach to managing AI assistant behavior through version-controlled, modular rule files. This document explains the architecture, file structure, rule types, and management scripts that power this system. The goal is to enable quick setup of project-specific rules via a Braingarden CLI feature.

## Architecture

### Core Concepts

1. **Rule Modularity**: Rules are split into logical, focused units rather than monolithic files
2. **Version Control**: All rules are stored in the codebase and version-controlled
3. **Symlink Workaround**: Rules exist in `.brain/rules/` but are symlinked to `.cursor/rules/`
4. **Automatic Application**: Rules can be applied based on file patterns (globs)
5. **Rule Packages**: Related rules can be grouped into "packages" for quick application
6. **Rule Templates**: Standard rule sets that can be quickly applied to new projects
7. **Integrated Changelog**: Structured changelog management is a core component of the system
8. **Organized Scripts**: System scripts are kept separate from project-specific scripts

## File Structure

```
.brain/
├── rules/              # Source of truth for all rules
│   ├── project-initialization.mdc
│   ├── component-standards.mdc
│   ├── typescript-standards.mdc
│   └── ...
├── scripts/            # Braingarden system scripts
│   ├── update-rule-symlinks.sh
│   ├── update-changelog.sh
│   ├── changelog-summary.sh
│   └── changelog-search.sh
├── docs/               # Documentation about the project
│   ├── cursor-rules-system.md
│   └── ...
└── backup/             # Backup location for changelog

.cursor/
└── rules/              # Symlinks to .brain/rules files
    ├── project-initialization.mdc -> ../../.brain/rules/project-initialization.mdc
    └── ...

scripts/                # Project-specific scripts
├── generate-pdf-thumbnails.js
└── process-linkedin-data.js
```

## Rule File Format

All rule files use the `.mdc` extension and follow this structure:

```
---
description: [Brief summary of what the rule does]
globs: [Pattern matching for auto-application]
alwaysApply: [true/false]
---
# Rule Title
# Last Updated: YYYY-MM-DD HH:MM:SS AM/PM

[Rule content...]
```

### Rule Metadata Options

| Option | Description | Values | Example |
|--------|-------------|--------|---------|
| description | Brief summary shown in rule list | String | "Core project initialization steps" |
| globs | File patterns for auto-application | String/Array/Empty | `["*.ts", "*.tsx"]` |
| alwaysApply | Apply to all conversations | Boolean | true/false |
| title | Rule title in UI (optional) | String | "Project Initialization" |

## Rule Types & Packages

### Standard Rule Packages

1. **Project Setup Package**
   - `project-initialization.mdc`: Core workflow steps
   - `project-structure-overview.mdc`: Directory structure
   - `project-goals-requirements.mdc`: High-level requirements
   - `cursor-rules-workaround.mdc`: Rules management

2. **Development Standards Package**
   - `code-standards.mdc`: General coding standards
   - `typescript-standards.mdc`: TypeScript rules
   - `component-standards.mdc`: React component rules
   - `date-time-standards.mdc`: Date/time formatting

3. **Developer Experience Package**
   - `browser-automation-guide.mdc`: Browser automation
   - `claude-code-guide.mdc`: Claude Code CLI
   - `mcp-inception-guide.mdc`: MCP servers
   - `playwright-rules.mdc`: UI testing

### Individual Rule Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **Workflow** | Project setup and process | `project-initialization.mdc` |
| **Standards** | Coding standards | `typescript-standards.mdc` |
| **Tooling** | Tool usage | `browser-automation-guide.mdc` |
| **Structure** | Project organization | `project-structure-overview.mdc` |
| **Documentation** | Documentation standards | `changelog-standards.mdc` |

## Rule Application Strategy

### Global vs. Context-Specific Rules

- **Global Rules**: Apply to all conversations (`alwaysApply: true`)
  - Example: `project-initialization.mdc`
  
- **Context-Specific Rules**: Apply based on file type (`globs: ["*.tsx"]`)
  - Example: `component-standards.mdc`
  
- **Reference Rules**: Applied only when requested
  - Example: `browser-automation-guide.mdc`

### Automatic vs. Manual Application

- **Auto-Applied Rules**: Based on glob patterns
- **Manually Applied Rules**: Explicitly requested by the agent

## Management Scripts

### Script Organization

The Cursor Rules System uses a separate directory for system scripts to maintain a clear separation between Braingarden functionality and project-specific code:

- **System Scripts Location**: `.brain/scripts/`
- **Project Scripts Location**: `scripts/`

This separation ensures that Braingarden-related tooling doesn't interfere with project-specific scripts and makes it easier to update system scripts across projects.

### Rule Management Scripts

#### update-rule-symlinks.sh

This script automatically syncs the `.brain/rules/` directory with `.cursor/rules/`:

1. Creates the `.cursor/rules` directory if needed
2. Finds all `.mdc` files in `.brain/rules`
3. Creates appropriate symlinks in `.cursor/rules`
4. Verifies symlinks were created correctly

```bash
#!/bin/bash
# Create .cursor/rules directory if it doesn't exist
mkdir -p .cursor/rules

# For each .mdc file in .brain/rules
for rule in .brain/rules/*.mdc; do
  basename=$(basename "$rule")
  # Remove existing symlink if it exists
  rm -f ".cursor/rules/$basename"
  # Create symlink
  ln -s "../../.brain/rules/$basename" ".cursor/rules/$basename"
done

echo "Rules symlinks updated successfully!"
```

### Changelog Management Scripts

The changelog management scripts are a critical part of the Cursor Rules System, providing structured version tracking and project history. These scripts work together to create a comprehensive changelog workflow.

#### update-changelog.sh

This script manages the creation and updating of changelog entries with proper formatting and versioning:

**Key Features:**
- Creates new version sections with today's date
- Organizes entries into categories (Added, Changed, Fixed, etc.)
- Supports semantic versioning
- Creates backups before modifications
- Ensures consistent formatting

**Usage Example:**
```bash
./.brain/scripts/update-changelog.sh -v 0.21.8 -t added -m "Added comprehensive changelog management system [#DevOps]"
```

#### changelog-summary.sh

Generates focused reports on changes related to specific components or features:

**Key Features:**
- Filters entries by component name or tag
- Shows recent changes across versions
- Provides concise summaries for specific components
- Supports different output formats (markdown, text)
- Configurable version depth

**Usage Examples:**
```bash
# Component history
./.brain/scripts/changelog-summary.sh Button

# Recent changes summary
./.brain/scripts/changelog-summary.sh --recent

# Changes with specific tag
./.brain/scripts/changelog-summary.sh --tags "#UI"
```

#### changelog-search.sh

Searches the changelog for specific terms with context:

**Key Features:**
- Full-text search with context lines
- Colorized output for better readability
- Shows version headers for context
- Configurable result limits
- Preserves changelog formatting in results

**Usage Example:**
```bash
./.brain/scripts/changelog-search.sh "authentication" --context 5
```

### Rule and Script Packages

The CLI should install both rule files and their associated scripts as a complete system:

1. **Core Package**
   - Rules: `project-initialization.mdc`, `cursor-rules-workaround.mdc`
   - Scripts: `update-rule-symlinks.sh` → `.brain/scripts/`

2. **Changelog Package**
   - Rules: `changelog-standards.mdc` (to be created)
   - Scripts: 
     - `update-changelog.sh` → `.brain/scripts/` 
     - `changelog-summary.sh` → `.brain/scripts/`
     - `changelog-search.sh` → `.brain/scripts/`
   - Files: Initialize `CHANGELOG.md` with proper structure

3. **Development Standards Package**
   - Rules: `code-standards.mdc`, `typescript-standards.mdc`, `component-standards.mdc`
   - Scripts: None

4. **Developer Experience Package**
   - Rules: `browser-automation-guide.mdc`, `claude-code-guide.mdc`, `mcp-inception-guide.mdc`
   - Scripts: None

### Implementation Requirements

1. **Package Definitions**: JSON structure defining rule packages and scripts
   ```json
   {
     "core": {
       "name": "Core System",
       "description": "Core rule management system",
       "rules": ["project-initialization", "cursor-rules-workaround"],
       "scripts": [
         {"source": "update-rule-symlinks.sh", "target": ".brain/scripts/update-rule-symlinks.sh"}
       ]
     },
     "changelog": {
       "name": "Changelog System",
       "description": "Complete changelog management system",
       "rules": ["changelog-standards"],
       "scripts": [
         {"source": "update-changelog.sh", "target": ".brain/scripts/update-changelog.sh"},
         {"source": "changelog-summary.sh", "target": ".brain/scripts/changelog-summary.sh"},
         {"source": "changelog-search.sh", "target": ".brain/scripts/changelog-search.sh"}
       ],
       "files": [{"template": "changelog.md", "target": "CHANGELOG.md"}]
     }
   }
   ```

2. **Template Definitions**: Pre-defined combinations of packages
   ```json
   {
     "react-typescript": {
       "name": "React+TypeScript",
       "description": "Standard setup for React+TypeScript projects",
       "packages": ["core", "changelog", "development-standards"],
       "rules": ["playwright-rules"]
     }
   }
   ```

3. **Script Registry**: Central registry of script information
   ```json
   {
     "update-changelog.sh": {
       "name": "Update Changelog",
       "description": "Add new entries to CHANGELOG.md",
       "category": "Changelog",
       "dependencies": ["CHANGELOG.md"],
       "permissions": ["file_write"]
     }
   }
   ```

### Implementation Workflow

1. User runs `braingarden sync rules --template react-typescript`
2. CLI:
   - Creates `.brain/rules/` structure
   - Creates `.brain/scripts/` directory
   - Copies selected rule files
   - Copies associated scripts to `.brain/scripts/` directory
   - Creates initial `CHANGELOG.md` if missing
   - Runs symlink script
   - Sets up required file structure

### Benefits of Integrating Changelog System

1. **Complete History**: Full project history is maintained from day one
2. **Consistent Formatting**: All entries follow the same structure
3. **Project Insight**: Easy access to component histories and feature evolution
4. **AI Context**: Provides rich context for AI assistants to understand project history
5. **Team Communication**: Clear documentation of changes for team members
6. **Version Management**: Proper semantic versioning from the start

## Future Extensions

1. **Rule Validation**: Automatic validation of rule format
2. **Rule Updates**: CLI command to update rules to latest versions
3. **Rule Stats**: Usage analytics for rule effectiveness
4. **Rule Editor**: Web interface for editing rules
5. **Rule Sharing**: Community sharing of effective rules
6. **Rule Versioning**: Explicit versioning of rule packages
7. **Changelog Visualization**: Visual representation of project history
8. **Changelog Integration**: Connect changelog entries with commits
9. **Release Notes**: Automatic generation of release notes from changelog

## Conclusion

The Cursor Rules System provides a structured approach to managing AI assistant behavior that is modular, version-controlled, and project-specific. Combined with the integrated changelog management system, it creates a comprehensive environment for project setup, development standards, and history tracking. With Braingarden CLI integration, this complete system can be quickly deployed across projects, ensuring consistency and quality while reducing setup time.
