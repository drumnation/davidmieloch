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
│   │   └── utils/                # Utility functions for code examples
│   ├── components/               # App-specific components
│   │   └── Breakdown/            # Component breakdown
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
│   │   │   ├── Badge/            # Badge component
│   │   │   ├── Button/           # Button component
│   │   │   ├── Card/             # Card component
│   │   │   ├── Icon/             # Icon component
│   │   │   ├── LanguageDot/      # Language indicator
│   │   │   ├── Tag/              # Tag component
│   │   │   └── Typography/       # Typography components
│   │   ├── molecules/            # Molecular components
│   │   │   ├── CodeBlock/        # Code display component
│   │   │   ├── ComparisonTable/  # Comparison table
│   │   │   ├── ContentSection/   # Content section
│   │   │   ├── FeatureCard/      # Feature card
│   │   │   ├── FeaturePreview/   # Feature preview
│   │   │   ├── FilterItem/       # Filter item
│   │   │   ├── FormField/        # Form field
│   │   │   ├── MarkdownRenderer/ # Markdown renderer
│   │   │   ├── MermaidDiagram/   # Mermaid diagram
│   │   │   ├── PrivateWorkCard/  # Private work card
│   │   │   ├── QuotePair/        # Quote pair
│   │   │   ├── RepoCard/         # Repository card
│   │   │   ├── RepoFilter/       # Repository filter
│   │   │   ├── RepoGrid/         # Repository grid
│   │   │   ├── RepoSearch/       # Repository search
│   │   │   └── SearchInput/      # Search input
│   │   ├── organisms/            # Organism components
│   │   │   ├── CaseStudy/        # Case study
│   │   │   ├── ChallengeBreakdown/ # Challenge breakdown
│   │   │   ├── ComparisonGrid/   # Comparison grid
│   │   │   ├── ContactCard/      # Contact card
│   │   │   ├── DebtAnalysis/     # Debt analysis
│   │   │   ├── FeatureCardGrid/  # Feature card grid
│   │   │   ├── FeatureGrid/      # Feature grid
│   │   │   ├── FeaturePreview/   # Feature preview
│   │   │   ├── FilterBar/        # Filter bar
│   │   │   ├── Footer/           # Footer component
│   │   │   ├── GitHubProjects/   # GitHub projects section
│   │   │   ├── Hero/             # Hero section
│   │   │   ├── ImpactGrid/       # Impact grid
│   │   │   ├── NavigationCard/   # Navigation card
│   │   │   ├── NavigationMenu/   # Navigation menu
│   │   │   ├── PersistentFooter/ # Persistent footer
│   │   │   ├── PrivateWorkSection/ # Private work section
│   │   │   ├── ProblemCards/     # Problem cards
│   │   │   ├── ProblemList/      # Problem list
│   │   │   ├── ProblemOverview/  # Problem overview
│   │   │   ├── ProblemSolution/  # Problem solution
│   │   │   ├── ProblemSolutionCard/ # Problem solution card
│   │   │   ├── ProcessFlow/      # Process flow
│   │   │   ├── QuoteGrid/        # Quote grid
│   │   │   ├── RepoDetails/      # Repository details
│   │   │   ├── RepoGrid/         # Repository grid
│   │   │   ├── SideNavigation/   # Side navigation
│   │   │   ├── SolutionCards/    # Solution cards
│   │   │   ├── StatsComparison/  # Stats comparison
│   │   │   ├── StatsOverview/    # Stats overview
│   │   │   ├── SuccessStory/     # Success story
│   │   │   └── TeamCard/         # Team card
│   │   ├── pages/                # Page components
│   │   │   ├── BestPractices/    # Best practices page
│   │   │   ├── Bio/              # Bio page
│   │   │   ├── CodeExamples/     # Code examples page
│   │   │   └── WhitePaper/       # White paper page
│   │   ├── sections/             # Section components
│   │   │   ├── AiAutopilotAnalogy/ # AI autopilot analogy
│   │   │   ├── AiSkepticToExpert/ # AI skeptic to expert
│   │   │   ├── BestPractices/    # Best practices
│   │   │   ├── Bio/              # Bio section
│   │   │   ├── BrainGardenOverview/ # Brain garden overview
│   │   │   ├── RealWorldImpact/  # Real world impact
│   │   │   └── TechnicalImplementation/ # Technical implementation
│   │   └── templates/            # Template components
│   │       └── GitHubPortfolioTemplate/ # GitHub portfolio template
│   ├── store/                    # State management
│   ├── styles/                   # Global styles
│   │   └── theme/                # Theme configuration
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
│       └── animations/           # Animation utilities
├── .brain/                       # Project documentation
│   ├── ai-team-content/          # Content for sections
│   ├── backup/                   # Backup files
│   ├── best-practices/           # Best practices documentation
│   ├── context-handoffs/         # Context handoff docs
│   ├── original/                 # Original documentation
│   └── prompts/                  # AI prompts
│       ├── analysis/             # Analysis prompts
│       ├── debugging/            # Debugging prompts
│       ├── knowledge/            # Knowledge prompts
│       ├── plan-generation/      # Plan generation prompts
│       ├── project/              # Project prompts
│       ├── routine/              # Routine prompts
│       ├── status/               # Status prompts
│       └── stuck-agent/          # Stuck agent prompts
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

## Component Library Structure

The shared-components directory follows atomic design principles:

1. **Atoms**: Basic building blocks like Button, Card, Typography, and Badge
2. **Molecules**: Combinations of atoms that form more complex UI elements like CodeBlock, FeatureCard, and RepoCard
3. **Organisms**: Complex UI components composed of molecules and atoms such as Hero, NavigationMenu, and GitHubProjects
4. **Templates**: Page layouts like GitHubPortfolioTemplate
5. **Pages**: Complete page implementations like BestPractices and WhitePaper
6. **Sections**: Specific content sections like AiSkepticToExpert and BrainGardenOverview

Each component follows a consistent structure with separate files for:
- Component implementation (.tsx)
- Types (.types.ts)
- Styles (.styles.ts)
- Stories (.stories.tsx)
- Logic (.logic.ts) when needed

## Functions
