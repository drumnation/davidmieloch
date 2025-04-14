# Code Examples Page Components

This directory contains components that are specific to the Code Examples page.

## Component Organization

The components in this directory follow a modular structure:

- **GitHubPortfolioTemplate**: The main template component for displaying GitHub repositories in a portfolio layout.
  - Originally in `src/shared-components/templates/GitHubPortfolioTemplate`
  - Moved here to co-locate with the page it supports

## Component Dependencies

These components still use shared atomic and molecular components from the main shared components directories:

- **SearchInput**: Used for repository search functionality (`src/shared-components/molecules/SearchInput`)
- **FilterBar**: Used for filtering repositories (`src/shared-components/organisms/FilterBar`)
- **RepoGrid**: Used for displaying repository cards in a grid (`src/shared-components/organisms/RepoGrid`)

## Future Improvements

In the future, we may consider:

1. Moving all related components into this directory structure
2. Implementing a mobile-first design approach 
3. Improving filtering and search capabilities 