# Multi-Commit Plan - Perfect Fit Analyzer Feature & Codebase Cleanup

This plan organizes the current changes into 4 logical commits.

## Commit Tasks

- [ ] Commit 1: Add new Cursor rules and configuration files
  ```commit-subject
  chore: add new cursor rules for frontend development
  ```
  ```commit-body
  Add multiple cursor rules for atomic component design, mobile-first design with Mantine UI, and Storybook first approach. These rules provide standardized guidance for frontend development.
  ```
  ```commit-footer
  
  ```
  
  Files:
  - .cursor/rules/atomic-component-refactor.rules.mdc
  - .cursor/rules/mantine-ui.rules.mdc
  - .cursor/rules/mobile-first-design.rules.mdc
  - .cursor/rules/storybook-first-approach.mdc
  - .cursor/rules/wrap-third-party-ui.rules.mdc
  - .cursorrules
  - .vscode/settings.json

- [ ] Commit 2: Add Perfect Fit Analyzer feature
  ```commit-subject
  feat: add Perfect Fit Analyzer component and API route
  ```
  ```commit-body
  Implement the Perfect Fit Analyzer feature which allows users to analyze their resume against job descriptions. Includes:
  - New Resume/CV analyzer component with drag & drop functionality
  - API route for processing resumes
  - Utility functions for document parsing
  - Storybook stories for all components
  ```
  ```commit-footer
  
  ```
  
  Files:
  - .brain/1-agent-smith/b-features/08-perfect-fit-analyzer/08-perfect-fit-analyzer.md
  - .brain/prompts/frontend/wrap-third-party-component.prompt.md
  - .brain/prompts/utilities/refactor-to-mobile-first-design.prompt.md
  - app/api/perfect-fit-analyzer/route.ts
  - app/page.tsx
  - docs/features/features.index.md
  - docs/features/perfect-fit-analyzer/perfect-fit-analyzer.index.md
  - docs/features/perfect-fit-analyzer/technical-details.md
  - package.json
  - src/components/PerfectFitAnalyzer/PerfectFitAnalyzer.stories.tsx
  - src/components/PerfectFitAnalyzer/PerfectFitAnalyzer.tsx
  - src/components/PerfectFitAnalyzer/components/Dropzone/Dropzone.stories.tsx
  - src/components/PerfectFitAnalyzer/components/Dropzone/Dropzone.tsx
  - src/components/PerfectFitAnalyzer/components/InputContainer/InputContainer.stories.tsx
  - src/components/PerfectFitAnalyzer/components/InputContainer/InputContainer.tsx
  - src/components/PerfectFitAnalyzer/components/ResultModal/ResultModal.stories.tsx
  - src/components/PerfectFitAnalyzer/components/ResultModal/ResultModal.tsx
  - src/components/PerfectFitAnalyzer/components/TextInput/TextInput.stories.tsx
  - src/components/PerfectFitAnalyzer/components/TextInput/TextInput.tsx
  - src/components/PerfectFitAnalyzer/index.ts
  - src/components/PerfectFitAnalyzer/utils/document-parser.test.ts
  - src/components/PerfectFitAnalyzer/utils/document-parser.ts
  - src/components/PerfectFitAnalyzer/utils/index.ts
  - src/components/PerfectFitAnalyzer/utils/resume-data.ts
  - src/types/html2pdf.d.ts

- [ ] Commit 3: Remove deprecated Experience page components
  ```commit-subject
  refactor: remove deprecated Experience page components
  ```
  ```commit-body
  Remove the old Experience page components that have been moved to a new location.
  Temporarily store files in to-be-deleted directory for reference.
  ```
  ```commit-footer
  
  ```
  
  Files:
  - src/app/experience/ExperiencePage.stories.tsx
  - src/app/experience/ExperiencePage.tsx
  - src/app/experience/components/Accordion/Accordion.styles.ts
  - src/app/experience/components/Accordion/Accordion.tsx
  - src/app/experience/components/Accordion/Accordion.types.ts
  - src/app/experience/components/Accordion/index.ts
  - src/app/experience/components/EducationItem/EducationItem.styles.ts
  - src/app/experience/components/EducationItem/EducationItem.tsx
  - src/app/experience/components/EducationItem/EducationItem.types.ts
  - src/app/experience/components/EducationItem/index.ts
  - src/app/experience/components/ExperienceItem/ExperienceItem.styles.ts
  - src/app/experience/components/ExperienceItem/ExperienceItem.tsx
  - src/app/experience/components/ExperienceItem/ExperienceItem.types.ts
  - src/app/experience/components/ExperienceItem/index.ts
  - src/app/experience/components/ExperienceList/ExperienceList.styles.ts
  - src/app/experience/components/ExperienceList/ExperienceList.tsx
  - src/app/experience/components/ExperienceList/ExperienceList.types.ts
  - src/app/experience/components/ExperienceList/index.ts
  - src/app/experience/components/SkillsList/SkillsList.styles.ts
  - src/app/experience/components/SkillsList/SkillsList.tsx
  - src/app/experience/components/SkillsList/SkillsList.types.ts
  - src/app/experience/components/SkillsList/index.ts
  - src/app/experience/page.tsx
  - to-be-deleted/app/experience/ExperiencePage.stories.tsx
  - to-be-deleted/app/experience/ExperiencePage.tsx
  - to-be-deleted/app/experience/components/Accordion/Accordion.styles.ts
  - to-be-deleted/app/experience/components/Accordion/Accordion.tsx
  - to-be-deleted/app/experience/components/Accordion/Accordion.types.ts
  - to-be-deleted/app/experience/components/Accordion/index.ts
  - to-be-deleted/app/experience/components/EducationItem/EducationItem.styles.ts
  - to-be-deleted/app/experience/components/EducationItem/EducationItem.tsx
  - to-be-deleted/app/experience/components/EducationItem/EducationItem.types.ts
  - to-be-deleted/app/experience/components/EducationItem/index.ts
  - to-be-deleted/app/experience/components/ExperienceItem/ExperienceItem.styles.ts
  - to-be-deleted/app/experience/components/ExperienceItem/ExperienceItem.tsx
  - to-be-deleted/app/experience/components/ExperienceItem/ExperienceItem.types.ts
  - to-be-deleted/app/experience/components/ExperienceItem/index.ts
  - to-be-deleted/app/experience/components/ExperienceList/ExperienceList.styles.ts
  - to-be-deleted/app/experience/components/ExperienceList/ExperienceList.tsx
  - to-be-deleted/app/experience/components/ExperienceList/ExperienceList.types.ts
  - to-be-deleted/app/experience/components/ExperienceList/index.ts
  - to-be-deleted/app/experience/components/SkillsList/SkillsList.styles.ts
  - to-be-deleted/app/experience/components/SkillsList/SkillsList.tsx
  - to-be-deleted/app/experience/components/SkillsList/SkillsList.types.ts
  - to-be-deleted/app/experience/components/SkillsList/index.ts
  - to-be-deleted/app/experience/page.tsx

- [ ] Commit 4: Update Storybook config and misc UI tweaks
  ```commit-subject
  chore: update Storybook config and misc UI tweaks
  ```
  ```commit-body
  Update Storybook configuration and make misc UI improvements:
  - Update Storybook main and preview files
  - Update home page styling
  - Update footer component styles
  - Update CHANGELOG
  ```
  ```commit-footer
  
  ```
  
  Files:
  - .storybook/main.ts
  - .storybook/preview.tsx
  - CHANGELOG.md
  - app/home.css
  - src/shared-components/organisms/Footer/Footer.styles.ts 