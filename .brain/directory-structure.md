# Directory Structure

## Project Metrics

**Files**: 624
**Total Lines**: 183,251

## File Types

- TypeScript (.ts/.tsx): 470 files, 30,826 lines

## Project Tree

```
├── app/                          # Next.js app directory
│   ├── _not-found/               # 404 page
│   ├── best-practices-integration/ # Best practices page
│   ├── bio/                      # Biography page
│   ├── code-examples/            # GitHub projects portfolio
│   ├── enterprise-ai-development-framework/ # Framework page
│   ├── error.tsx                 # Error handling
│   ├── global-error.tsx          # Global error handling
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   ├── logos/                    # Logo files
│   └── resume.pdf                # Downloadable resume
├── src/
│   ├── components/               # Shared components
│   ├── contexts/                 # React contexts
│   ├── providers/                # Provider components
│   ├── shared-components/        # Component library
│   │   ├── atoms/                # Atomic components
│   │   ├── molecules/            # Molecular components 
│   │   ├── organisms/            # Organism components
│   │   ├── pages/                # Page components
│   │   ├── sections/             # Section components
│   │   └── templates/            # Template components
│   ├── store/                    # State management
│   ├── styles/                   # Global styles
│   │   └── theme/                # Theme configuration
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
├── .brain/                       # Project documentation
│   ├── ai-team-content/          # Content for sections
│   ├── backup/                   # Backup files
│   ├── best-practices/           # Best practices documentation
│   ├── context-handoffs/         # Context handoff docs
│   ├── original/                 # Original documentation
│   └── prompts/                  # AI prompts
├── .storybook/                   # Storybook configuration
│   ├── decorators.tsx            # Storybook decorators
│   ├── main.ts                   # Main configuration
│   ├── preview.tsx               # Preview configuration
│   ├── registry.tsx              # Component registry
│   ├── templates/                # Story templates
│   └── utils/                    # Storybook utilities
├── .vscode/                      # VS Code configuration
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Package dependencies
├── tsconfig.json                 # TypeScript configuration
└── vitest.config.ts              # Vitest configuration
```

The project is a Next.js application with a structured component library following atomic design principles. It uses styled-components for styling and Storybook for component development and documentation. The application showcases AI transformation expertise with various sections including a whitepaper, bio, and code examples.

## Functions
