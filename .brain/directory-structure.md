# Directory Structure

## Project Metrics

**Files**: 1,376
**Total Lines**: 1,545,862

## File Types

- TypeScript (.ts/.tsx): 999 files (607 .ts + 392 .tsx)

## Project Tree

```
├── app/                          # Next.js app directory
│   ├── (common)/                 # Common components and layouts
│   ├── _not-found/               # 404 page
│   ├── api/                      # API routes
│   │   ├── contact/              # Contact form API
│   │   └── perfect-fit-analyzer/ # Perfect Fit Analyzer API
│   ├── bio/                      # Biography page
│   ├── code-examples/            # GitHub projects portfolio
│   │   └── utils/                # Utility functions for code examples
│   ├── contact/                  # Contact page
│   ├── enterprise-ai-development-framework/ # Framework page
│   │   └── components/           # Framework-specific components
│   ├── experience/               # Experience page
│   ├── fullstack-react-best-practices-integration/ # Best practices page
│   ├── thank-you-job/            # Thank you page
│   ├── error.tsx                 # Error handling
│   ├── global-error.tsx          # Global error handling
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── docs/                         # Documentation
│   └── features/                 # Feature documentation
├── public/                       # Static assets
│   ├── audio/                    # Audio files
│   │   ├── music/                # Music files
│   │   ├── music-ducked/         # Ducked music files
│   │   └── voice/                # Voice recordings
│   ├── company-logos/            # Company logos
│   ├── examples/                 # Example files
│   ├── favicons/                 # Favicon files
│   ├── icons/                    # Icon files
│   ├── images/                   # Image assets
│   ├── media/                    # Media files
│   │   ├── blog/                 # Blog media
│   │   ├── gramercy/             # Gramercy project media
│   │   ├── icons/                # Icon files
│   │   ├── misc/                 # Miscellaneous media
│   │   ├── otg/                  # OTG project media
│   │   ├── photo/                # Photo files
│   │   ├── saturn/               # Saturn project media
│   │   └── screenshots/          # Application screenshots
│   ├── profile/                  # Profile images
│   ├── proof-system-strip/       # Proof system images
│   └── school-logos/             # School logos
├── scripts/                      # Utility scripts
├── src/
│   ├── analytics/                # Analytics utilities
│   ├── app/                      # App-specific code
│   │   └── agents/               # AI agents
│   ├── components/               # Shared components
│   │   ├── Cards/                # Card components
│   │   ├── ClientLayout/         # Client layout components
│   │   ├── DiagramEditor/        # Diagram editor
│   │   ├── Diagrams/             # Diagram components
│   │   │   ├── AgentSystemDiagram/
│   │   │   ├── AiIntegrationFlowDiagram/
│   │   │   ├── AiIntegrationProcessDiagram/
│   │   │   ├── BrainGardenComponentsDiagram/
│   │   │   ├── FlowchartDiagram/
│   │   │   ├── GardenMetaphorDiagram/
│   │   │   ├── IntegrationSystemDiagram/
│   │   │   ├── KnowledgeSystemDiagram/
│   │   │   ├── PerformanceScalabilityDiagram/
│   │   │   ├── SoftwareEngineeringMeceDiagram/
│   │   │   ├── SystemOverviewDiagram/
│   │   │   └── _wrappers/
│   │   ├── FeatureExample/       # Feature example components
│   │   ├── Navbar/               # Navigation bar
│   │   ├── PerfectFitAnalyzer/   # Perfect Fit Analyzer components
│   │   └── TourGuide/            # Tour guide components
│   ├── contexts/                 # React contexts
│   ├── data/                     # Data files
│   ├── hooks/                    # Custom React hooks
│   ├── pages/                    # Pages (for legacy page router)
│   ├── providers/                # Provider components
│   ├── shared-components/        # Component library
│   │   ├── atoms/                # Atomic components
│   │   │   ├── AnimatedContainer/
│   │   │   ├── AnimatedPage/
│   │   │   ├── Badge/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Container/
│   │   │   ├── ErrorBoundary/
│   │   │   ├── Highlight/
│   │   │   ├── Icon/
│   │   │   ├── LanguageDot/
│   │   │   ├── LoadingScreen/
│   │   │   ├── PageLoader/
│   │   │   ├── PageTitle/
│   │   │   ├── ParagraphText/
│   │   │   ├── ProjectLogo/
│   │   │   ├── SectionTitle/
│   │   │   ├── Spinner/
│   │   │   ├── SpinnerLoader/
│   │   │   ├── StyledAnimatedDiv/
│   │   │   ├── Tag/
│   │   │   ├── TechIcon/
│   │   │   ├── TechnologyBadge/
│   │   │   └── Typography/
│   │   ├── layouts/              # Layout components
│   │   │   └── PageContainer/
│   │   ├── molecules/            # Molecular components
│   │   │   ├── CallToAction/
│   │   │   ├── ComparisonTable/
│   │   │   ├── DebugSection/
│   │   │   ├── DiagramClientWrapper/
│   │   │   ├── EntityHeader/
│   │   │   ├── ErrorBoundary/
│   │   │   ├── FeatureCard/
│   │   │   ├── FeaturePreview/
│   │   │   ├── FilterItem/
│   │   │   ├── FoldableContent/
│   │   │   ├── FormField/
│   │   │   ├── GenericSection/
│   │   │   ├── Header/
│   │   │   ├── LoadingPortal/
│   │   │   ├── MarkdownRenderer/
│   │   │   ├── MermaidDiagram/
│   │   │   ├── NextLoading/
│   │   │   ├── PrivateWorkCard/
│   │   │   ├── ReactFlowDiagram/
│   │   │   ├── RepoCard/
│   │   │   ├── RepoFilter/
│   │   │   ├── RepoGrid/
│   │   │   ├── RepoSearch/
│   │   │   ├── SEO/
│   │   │   ├── SearchInput/
│   │   │   └── Section/
│   │   ├── navigation/           # Navigation components
│   │   │   └── PageSubNav/
│   │   ├── organisms/            # Organism components
│   │   │   ├── CaseStudy/
│   │   │   ├── ChallengeBreakdown/
│   │   │   ├── ComparisonGrid/
│   │   │   ├── ContactCard/
│   │   │   ├── ContactForm/
│   │   │   ├── ContentCarousel/
│   │   │   ├── DebtAnalysis/
│   │   │   ├── FeatureCardGrid/
│   │   │   ├── FeatureGrid/
│   │   │   ├── FeaturePreview/
│   │   │   ├── FilterBar/
│   │   │   ├── Footer/           # Footer with audio player
│   │   │   │   └── components/
│   │   │   ├── FullScreenLoader/
│   │   │   ├── GitHubProjects/
│   │   │   ├── Header/
│   │   │   ├── Hero/
│   │   │   ├── HeroBackup/
│   │   │   ├── ImpactGrid/
│   │   │   ├── Navbar/
│   │   │   ├── NavigationCard/
│   │   │   ├── NavigationMenu/
│   │   │   ├── PersistentFooter/
│   │   │   ├── PrivateWorkSection/
│   │   │   ├── ProblemCards/
│   │   │   ├── ProblemOverview/
│   │   │   ├── ProblemSolution/
│   │   │   ├── ProblemSolutionCard/
│   │   │   ├── ProcessFlow/
│   │   │   ├── QuoteGrid/
│   │   │   ├── RepoDetails/
│   │   │   ├── RepoGrid/
│   │   │   ├── SolutionCards/
│   │   │   ├── StatsComparison/
│   │   │   ├── SuccessStory/
│   │   │   └── TeamCard/
│   │   ├── pages/                # Page components
│   │   │   ├── BestPractices/
│   │   │   ├── Bio/
│   │   │   ├── CodeExamples/
│   │   │   ├── Experience/
│   │   │   ├── Home/
│   │   │   ├── ThankYouJob/
│   │   │   └── WhitePaper/
│   │   ├── templates/            # Template components
│   │   │   └── PageWrapper/
│   │   └── types/                # Component type definitions
│   ├── store/                    # State management
│   │   └── slices/               # Redux slices
│   ├── stories/                  # Storybook stories
│   ├── styles/                   # Global styles
│   │   └── theme/                # Theme configuration
│   ├── test-utils/               # Test utilities
│   ├── tests/                    # Test files
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
├── __mocks__/                    # Test mocks
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Package dependencies
├── tsconfig.json                 # TypeScript configuration
└── vitest.config.ts              # Vitest configuration
```

The project is a Next.js application with a structured component library following atomic design principles. It uses styled-components for styling and Storybook for component development and documentation. The application showcases AI transformation expertise with various sections including a whitepaper, bio, experience, and code examples.

## Component Library Structure

The shared-components directory follows atomic design principles:

1. **Atoms**: Basic building blocks like Button, Card, Typography, and Badge
2. **Molecules**: Combinations of atoms that form more complex UI elements like ReactFlowDiagram, FeatureCard, and RepoCard
3. **Organisms**: Complex UI components composed of molecules and atoms such as Hero, NavigationMenu, and GitHubProjects
4. **Templates**: Page layouts and wrappers like PageWrapper
5. **Pages**: Complete page implementations like BestPractices, Bio, and Experience
6. **Layouts**: Layout components like PageContainer

Each component follows a consistent structure with separate files for:

- Component implementation (.tsx)
- Types (.types.ts)
- Styles (.styles.ts)
- Stories (.stories.tsx)
- Logic (.logic.ts) when needed
- Tests (.test.tsx) for component testing

## Key Features
- Interactive diagrams using React Flow
- Perfect Fit Analyzer for job matching
- Audio player with ducked music and voice overlays
- GitHub project showcase
- Contact form with API endpoint
- Responsive design for mobile and desktop