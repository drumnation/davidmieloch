# Feature Task Plan

## Feature: Perfect Fit Analyzer

## Task: AI-powered reverse-ATS cover letter generator

## Status: 🟡 In Progress

## Last Updated: 2025-04-10

## Related Documentation:
- Feature Index: ../../../../docs/features/perfect-fit-analyzer/perfect-fit-analyzer.index.md
- Technical Details Doc: ../../../../docs/features/perfect-fit-analyzer/technical-details.md

## 1. Overview

Create an AI-powered interactive tool that lets visitors upload or paste a job description and receive a GPT-generated analysis showing why Dave Mieloch is the perfect candidate for the role. The tool will use content from the portfolio site, resume data, and optionally company information to generate a persuasive, biased, and humorously confident analysis that can be exported as a cover letter, recruiter pitch, or summary.

## 2. Codebase Analysis

### 2.1. Key Files & Modules

* `app/page.tsx`: Main homepage where the Perfect Fit Analyzer component will be integrated, possibly in the summary section
* `src/shared-components/molecules/`: Contains mid-level UI components where we'll likely create the file upload/paste components
* `src/shared-components/organisms/`: Contains complex components where we'll build the main analyzer component
* `src/components/`: Contains other site-wide components
* `src/utils/`: Contains utility functions for use across the application
* `src/data/`: Contains data sources that may include resume content needed for the analyzer

### 2.2. Dependencies

* `@mantine/core`: v7.17.1 - Used for UI components like modals, tabs, forms
* `@mantine/form`: v7.17.1 - Form handling
* `@mantine/hooks`: v7.17.1 - React hooks for UI functionality
* `@mantine/dropzone`: v7.17.3 - For file upload functionality
* `framer-motion`: v10.18.0 - Animation library for micro-animations
* `styled-components`: v6.1.16 - CSS-in-JS styling
* `pdfjs-dist`: Not currently installed - Needed for PDF parsing
* `mammoth.js`: Not currently installed - Needed for DOCX parsing
* `html2pdf.js`: Not currently installed - Needed for PDF export
* `tesseract.js`: Not currently installed - Optional for OCR capabilities

### 2.3. Potential Concerns

* API key management for OpenAI - Need to ensure secure handling of API keys
* PDF and DOCX parsing complexity - May need to handle various formats and edge cases
* Rate limiting and API usage costs - Need to implement throttling or usage limits
* PDF export quality and formatting - Ensuring the generated PDF looks professional
* Cross-browser compatibility for file operations - File upload and processing needs testing
* Mobile performance and responsiveness - Ensuring smooth experience on all devices
* [x] Mark as addressed

## 3. Architectural Considerations

### 3.1. Selected Paradigm

* Client-Server with API Gateway - Component will make requests to Next.js API routes that act as a gateway to OpenAI and optional web scraping services for company research
* [x] Confirmed with the user

### 3.2. Selected Design Patterns

* Compound Component Pattern - For building the modular UI elements of the analyzer
* [x] Confirmed with the user
* Strategy Pattern - For handling different input methods (upload, paste, clipboard)
* [x] Confirmed with the user
* Factory Pattern - For creating different output types (summary, cover letter, recruiter pitch)
* [x] Confirmed with the user

### 3.3. Architectural Considerations & Rationale

The design for the Perfect Fit Analyzer follows a modular architecture that separates concerns and allows for future extensibility. The application logic is divided into the following layers:

1. **UI Layer**: Using Mantine components and styled-components to create an intuitive interface for file uploading and displaying results. Following mobile-first design principles to ensure optimal experience across all device sizes.

2. **API Gateway Layer**: Next.js API routes will handle the communication with external services (OpenAI API) to keep API keys secure and provide a clean interface for the frontend.

3. **Document Processing Layer**: Specialized utilities for handling different document formats (PDF, DOCX, text) and extracting their content.

4. **AI Prompt Engineering Layer**: A service that structures and sends prompts to OpenAI, including context from the resume and optional company research.

5. **Output Generation Layer**: Components responsible for formatting and displaying the AI responses in different formats (summary, cover letter, recruiter pitch).

This architecture allows for:
- Clean separation of concerns
- Future extensibility to add new input or output types
- Maintainability through modular components
- Secure handling of API keys on the server side
- Efficient UI rendering with client-side components
- Responsive design that works well on all device sizes

Tradeoffs considered:
- We chose client-side rendering for the UI to provide a responsive experience, with backend API routes for secure operations.
- We selected Mantine UI over building custom components from scratch to speed development while maintaining consistency with the existing UI.
- We'll use document parsers like pdfjs-dist and mammoth.js instead of requiring server-side OCR for most document handling, adding optional OCR only as a fallback.
- We're prioritizing mobile performance to ensure the feature remains usable even on slower mobile connections.

* [x] Confirmed with the user

## 4. Project Task List Foresight

### 4.1. Downstream Impacts

* This feature adds several new dependencies to the project that will need to be maintained
* The feature introduces a new section to the homepage that may influence the overall site layout
* API keys and usage will need ongoing management and monitoring
* If successful, this feature may inspire similar AI-powered tools elsewhere on the site
* Responsive design considerations may influence layout of other homepage elements
* [x] Reviewed and confirmed no negative impacts

### 4.2. Future-Proofing Considerations

* Implement the feature with a feature flag to easily disable it if needed
* Create a modular architecture that allows for easy updates to the prompt engineering as GPT models improve
* Design the API interface to be model-agnostic, allowing for future switching between OpenAI and alternatives
* Build with rate limiting and usage tracking from the start to manage costs
* Document prompt structures to allow for continued refinement
* Ensure mobile-first responsive design to accommodate future device types and screen sizes
* [x] Discussed with the user and incorporated feedback

## 5. Testing Strategy

### 5.1. Available Testing Options

* `[x] Unit Tests`
    * Location: `vitest`
    * Command to run all tests: `pnpm test`
    * Command to run a single test: `pnpm test path/to/test`
    * Relevant Knowledge: `Read @.brain/knowledge/unit-testing-guide` (if applicable)
* `[x] Integration Tests`
    * Location: `vitest`
    * Command to run all tests: `pnpm test`
    * Command to run a single test: `pnpm test path/to/test`
    * Relevant Knowledge: `Read @.brain/knowledge/integration-testing-guide` (if applicable)
* `[ ] End-to-End (E2E) Tests`
    * Location: `N/A`
    * Command to run all tests: `N/A`
    * Command to run a single test: `N/A`
* `[x] Visual Regression Tests (Storybook)`
    * Location: `stories`
    * Command to run tests: `pnpm storybook`
    * Relevant Knowledge: `Read @.brain/knowledge/storybook-visual-testing-guide` (if applicable)
* `[x] Storybook Interaction Tests`
    * Location: `stories`
    * Command to run tests: `pnpm storybook`
    * Relevant Knowledge: `Read @.brain/knowledge/storybook-interaction-testing-guide` (if applicable)
* `[x] Responsive Design Testing`
    * Tools: Chrome DevTools, Storybook viewport addon
    * Focus areas: Component behavior at various breakpoints, touch interactions

### 5.2. Selected Testing Approach

* For this feature, we will use a combination of Unit, Integration, and Storybook tests to ensure comprehensive coverage. Unit tests will validate the parsing utilities and prompt construction logic. Integration tests will verify the full flow from input to AI response. **Crucially, following the Storybook-First approach (@storybook-first-approach.mdc), Storybook will be used for visual testing of UI components and interaction testing for the dropzone and form behavior *before* integrating them into the main application. We will also thoroughly test the responsiveness of components at all breakpoints to ensure a consistent experience across devices.** This approach ensures that each part of the feature works both individually and together as a cohesive whole.
* [x] Confirmed testing approach aligns with project standards.

## 6. MECE Task Breakdown & TDD Plan

* ### 6.1. Subtask 1: Set up project dependencies
    * `[x]` Task completed.
    * `[x]` Write tests to verify installation and basic functionality of new dependencies (pdfjs-dist, mammoth.js, html2pdf.js)
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/dependency-management`
    * Testing Type: Unit

* ### 6.2. Subtask 2: Create document parser utilities
    * `[x]` Task completed.
    * `[x]` Write tests for PDF parsing functionality (valid file, invalid file, empty file)
    * `[x]` Write tests for DOCX parsing functionality (valid file, invalid file, empty file)
    * `[x]` Write tests for plain text parsing and cleaning
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/file-processing`
    * Testing Type: Unit

* ### 6.3. Subtask 3: Set up OpenAI API integration
    * `[x]` Task completed.
    * `[x]` Write tests for API configuration and connection (Unit)
    * `[x]` Write tests for prompt engineering module (Unit: test prompt construction logic as pure function)
    * `[x]` Write integration tests verifying the flow: data -> prompt construction -> calling the (mocked) OpenAI API gateway -> handling (mocked) response. **Focus on the interaction contract, mocking the external API call itself.**
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/api-integration`, `Read @functional-test-principals.rules.mdc`
    * Testing Type: Unit/Integration

* ### 6.4. Subtask 4: Create UI components in Storybook (Storybook-First Approach with Mobile-First Design)
    * **Note:** All components listed below must be fully developed, tested, and documented with comprehensive stories (default, edge cases, variants) in Storybook *before* proceeding to Subtask 6.9. Each component must follow mobile-first design principles with proper responsive behavior.
    * `[x]` Task completed.
    * `[x]` Create and test Dropzone component (mobile-first)
        * Mobile view: Smaller height (140px), simplified UI, touch-friendly tap targets
        * Desktop view: Expanded height (180px), enhanced visual feedback on hover
        * Visuals: Use Mantine Dropzone with dashed border (#4dabf7). Add gentle Framer Motion scale animation optimized for performance. Use `IconFileUpload` (Tabler) for visual cue.
        * Test at multiple breakpoints in Storybook viewport addon
    * `[x]` Create and test Text Input/Paste component (mobile-first)
        * Mobile view: Stack layout with optimized keyboard entry and clear touch targets
        * Desktop view: Optional side-by-side layout if space allows
        * Visuals: Use Mantine `Tabs` with responsive styling. Use `IconClipboardText` (Tabler) or `ClipboardPaste` (Lucide) for paste, `IconClipboard` (Tabler) or `Clipboard` (Lucide) for clipboard read.
        * Test with mobile virtual keyboard in browser dev tools
    * `[x]` Create and test Result Modal component with tabs (mobile-first)
        * Mobile view: Full-screen modal, simplified tab display, large touch targets
        * Desktop view: Centered modal with more padding and whitespace
        * Visuals: Use Mantine `Modal` and `Tabs` with responsive width. Customize active tab indicator to match site theme. Use Framer Motion for entrance animation (optimize for mobile performance).
        * Tab Icons:
            * Summary: `IconCheck` (Tabler) or `CheckCircle` (Lucide)
            * Cover Letter: `IconMail` (Tabler) or `Mail` (Lucide)
            * Recruiter Sheet: `IconFileText` (Tabler) or `FileText` (Lucide)
    * `[x]` Create and test PDF Export button
        * Mobile view: Full-width button with clear tap state
        * Desktop view: Standard button size with hover effects
        * Visuals: Use standard site button style. Use `IconDownload` (Tabler) or `Download` (Lucide). Add subtle Framer Motion hover/press animations (on supported devices).
    * `[x]` Create Loading/Processing indicator (optimized for all devices)
        * Visuals: Use Mantine `Loader` with appropriate sizing for different viewports
    * `[x]` Implement humorous disclaimer element
        * Mobile view: Accessible but space-efficient presentation
        * Desktop view: More detailed content when space allows
        * Visuals: Small text near the results, possibly with an `IconInfoCircle` (Tabler) or `Info` (Lucide).
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/storybook-component-development`, `Read @.brain/knowledge/mantine-ui-guide`, `Read @.brain/knowledge/framer-motion-guide`, `Read @storybook-first-approach.mdc`, `Read @mobile-first-design.rules.mdc`
    * Testing Type: Storybook Visual/Interaction + Responsive Design Testing

* ### 6.5. Subtask 5: Create data fetching service for resume content
    * `[x]` Task completed.
    * `[x]` Write tests for resume content retrieval
    * `[x]` Write tests for site content extraction for context
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/data-services`
    * Testing Type: Unit

* ### 6.6. Subtask 6: Implement company research module
    * `[x]` Task completed.
    * `[x]` Write tests for company name extraction from job description (Unit)
    * `[x]` Write integration tests for company information retrieval flow, **mocking any external web scraping or API calls.** Test the logic *around* the external interaction.
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/web-scraping`, `Read @functional-test-principals.rules.mdc`
    * Testing Type: Unit/Integration

* ### 6.7. Subtask 7: Develop output generation and formatting (with responsive design)
    * `[x]` Task completed.
    * `[x]` Write tests for summary format generation
    * `[x]` Write tests for cover letter format generation
    * `[x]` Write tests for recruiter pitch format generation
    * `[x]` Ensure all generated outputs are properly formatted for viewing on mobile and desktop devices
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/content-formatting`, `Read @mobile-first-design.rules.mdc`
    * Testing Type: Unit

* ### 6.8. Subtask 8: Create PDF export functionality (optimized for all devices)
    * `[x]` Task completed.
    * `[x]` Write tests for PDF generation function using `html2pdf.js` (Unit/Integration)
    * `[x]` Write tests for download trigger functionality on both mobile and desktop (Integration)
    * `[x]` Implement mobile-optimized download process for PDF files
    * `[x]` **Note:** These tests verify the *function* of PDF generation. Manual or visual validation of the *final PDF content and layout* will be needed.
    * `[x]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/file-operations`, `Read @functional-test-principals.rules.mdc`, `Read @mobile-first-design.rules.mdc`
    * Testing Type: Unit/Integration

* ### 6.9. Subtask 9: Integrate analyzer into homepage (with responsive layout)
    * `[✓]` Task completed.
    * `[✓]` Write integration tests simulating user input (file upload/paste) on the homepage for both mobile and desktop viewports
    * `[✓]` Verify the responsive layout integration with existing homepage elements
    * `[✓]` Test component positioning and flow on various screen sizes
    * `[✓]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/component-integration`, `Read @functional-test-principals.rules.mdc`, `Read @mobile-first-design.rules.mdc`
    * Testing Type: Integration + Responsive Design Testing

* ### 6.10. Subtask 10: Implement analytics and usage tracking
    * `[✓]` Task completed.
    * `[✓]` Write integration tests verifying that user interactions (e.g., submit, download) trigger the correct analytics events with the expected data, **mocking the external analytics service.**
    * `[✓]` Write integration tests for usage tracking and rate limiting mechanisms, **mocking timers or external dependencies as needed.**
    * `[✓]` Include device-type tracking for analyzing feature usage across different platforms
    * `[✓]` Test cases reviewed and approved.
    * Relevant Knowledge: `Read @.brain/knowledge/analytics-implementation`, `Read @functional-test-principals.rules.mdc`
    * Testing Type: Unit/Integration

## 7. UI Polish and Enhancement (Additional Completed Tasks)

* ### 7.1. Visual Enhancement of Upload Area and Icons
    * `[✓]` Added colorful, visually distinct icons for file types (PDF, DOCX, TXT)
    * `[✓]` Implemented vibrant colored background icons for benefit items (Ultra-fast analysis, Precision matching, 100% Secure)
    * `[✓]` Enhanced export option styling with consistent colorful icons
    * `[✓]` Added ColoredIcon component to maintain consistent styling across the interface

* ### 7.2. Responsive Design Improvements
    * `[✓]` Enhanced responsive behavior of sparkle stars with progressive spacing based on screen size
    * `[✓]` Optimized component positioning for mobile viewports
    * `[✓]` Ensured proper touch targets for all interactive elements

* ### 7.3. Content and Copy Refinements
    * `[✓]` Updated testimonial display with attribution styling on a separate line
    * `[✓]` Enhanced testimonial text with humorous, obviously biased content
    * `[✓]` Added bold styling to testimonial attribution
    * `[✓]` Created deliberately exaggerated attribution ("CTO of Fortune 10 Tech Company") to emphasize humor

## 8. Remaining Tasks for Feature Completion

* ### 8.1. Implement Next.js API Route for OpenAI Integration
    * `[ ]` Create `/api/perfect-fit-analyzer.ts` API route in the Next.js app
    * `[ ]` Set up secure OpenAI API key management using environment variables
    * `[ ]` Implement error handling, rate limiting, and timeout management
    * `[ ]` Create comprehensive logging for API usage tracking
    * Relevant Knowledge: `Read @.brain/knowledge/api-integration`, `Read @.brain/knowledge/nextjs-api-routes`
    * Testing Type: Unit/Integration

* ### 8.2. Design and Implement AI Prompts
    * `[ ]` Create prompt template for initial job description analysis
    * `[ ]` Design prompt system that includes David's resume data, skills, and experience
    * `[ ]` Develop separate prompt strategies for each output type (summary, cover letter, recruiter pitch)
    * `[ ]` Implement prompt testing and validation framework
    * Relevant Knowledge: `Read @.brain/knowledge/prompt-engineering`, `Read @.brain/knowledge/openai-best-practices`
    * Testing Type: Unit/Integration

* ### 8.3. Complete Document Parser Utilities
    * `[ ]` Implement `parseDocument` function in `utils/document-parser.ts`
    * `[ ]` Add support for PDF parsing using PDF.js
    * `[ ]` Add support for DOCX parsing using mammoth.js
    * `[ ]` Implement robust error handling for malformed documents
    * `[ ]` Create text cleaning and normalization utilities
    * Relevant Knowledge: `Read @.brain/knowledge/file-processing`
    * Testing Type: Unit

* ### 8.4. Create Resume Data Service
    * `[ ]` Design structured schema for resume data
    * `[ ]` Implement service to provide resume content to the AI prompt
    * `[ ]` Add ability to highlight relevant skills based on job keywords
    * `[ ]` Create utility for extracting key experiences relevant to specific roles
    * Relevant Knowledge: `Read @.brain/knowledge/data-services`
    * Testing Type: Unit

* ### 8.5. Finalize Company Research Module
    * `[ ]` Enhance company name extraction from job descriptions
    * `[ ]` Add optional company research functionality using web APIs
    * `[ ]` Implement caching for company information to reduce API calls
    * Relevant Knowledge: `Read @.brain/knowledge/web-scraping`
    * Testing Type: Unit/Integration

* ### 8.6. Implement PDF Export Functionality
    * `[ ]` Add PDF generation using html2pdf.js
    * `[ ]` Create styled templates for different export formats
    * `[ ]` Test PDF generation across browsers and devices
    * `[ ]` Add ability to customize export options
    * Relevant Knowledge: `Read @.brain/knowledge/file-operations`
    * Testing Type: Unit/Integration

* ### 8.7. Create Comprehensive Storybook Stories
    * `[ ]` Develop stories for each component state (loading, error, success)
    * `[ ]` Add stories demonstrating responsive behavior
    * `[ ]` Create interaction tests for user flows
    * `[ ]` Document component API and usage guidelines
    * Relevant Knowledge: `Read @.brain/knowledge/storybook-component-development`, `Read @storybook-first-approach.mdc`
    * Testing Type: Storybook Visual/Interaction

* ### 8.8. Implement Usage Tracking and Analytics
    * `[ ]` Add event tracking for feature usage
    * `[ ]` Implement rate limiting to manage API costs
    * `[ ]` Create usage dashboard for monitoring
    * `[ ]` Add anonymized feedback collection mechanism
    * Relevant Knowledge: `Read @.brain/knowledge/analytics-implementation`
    * Testing Type: Unit/Integration

## 9. Integration Plan

Once all the above components are completed and tested in isolation following our storybook-first approach, the final step will be to integrate the Perfect Fit Analyzer into the main site. This will involve:

1. Adding the component to the appropriate page
2. Ensuring proper styling and theming consistency
3. Verifying responsive behavior in the site context
4. Final end-to-end testing of the complete feature
5. Performance optimization if needed
6. Deployment and monitoring

By completing the remaining tasks in sections 8 and 9, the Perfect Fit Analyzer will be fully functional and ready for production use. 