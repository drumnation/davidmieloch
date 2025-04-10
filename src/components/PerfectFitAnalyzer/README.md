# Perfect Fit Analyzer

## Overview

The Perfect Fit Analyzer is an AI-powered tool that allows visitors to upload or paste a job description and receive a generated analysis showing why David Mieloch is the perfect candidate for the role.

## Features

- **Multiple Input Methods**: Upload PDF job descriptions or paste plain text
- **Company Information Extraction**: Automatically extracts company names from job descriptions
- **AI-Powered Analysis**: Uses OpenAI's GPT-4o to generate personalized, persuasive content
- **Multiple Output Formats**: 
  - Concise summary of key skill matches
  - Professional cover letter formatted with proper headers
  - Recruiter pitch emphasizing unique qualifications

## Technical Implementation

### Components

- `PerfectFitAnalyzer.tsx`: Main component that integrates all functionality
- `Dropzone/`: File upload component for PDF job descriptions
- `TextInput/`: Text input for pasting job descriptions
- `ResultModal/`: Modal for displaying analysis results with tabs

### Utilities

- `document-parser.ts`: Handles PDF parsing and text extraction
- `resume-data.ts`: Fetches and formats David's resume data
- `prompt-templates.ts`: Contains structured prompts for OpenAI
- `company-research.ts`: Extracts company names and fetches additional information

### API

- `app/api/perfect-fit-analyzer/route.ts`: Next.js API route that handles:
  - PDF text extraction
  - Resume data integration
  - OpenAI prompt generation and API calls
  - Rate limiting and error handling

## Usage

1. **Configure API Key**:
   - Add your OpenAI API key to `.env.local`: `OPENAI_API_KEY=your_api_key`

2. **Using the Component**:
   - The component can be placed on any page with minimal configuration

3. **API Endpoint**:
   - POST to `/api/perfect-fit-analyzer`
   - JSON format: `{ "jobDescription": "...", "companyName": "..." }` 
   - Or multipart form with `file` and optional `companyName` fields

## Future Enhancements

- Support for more document formats (DOCX, HTML)
- Enhanced company research capabilities
- Additional output formats
- User feedback collection and prompt improvement
- Caching frequently requested job types 