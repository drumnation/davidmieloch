import { Meta, StoryObj } from '@storybook/react';
import PerfectFitAnalyzer from './PerfectFitAnalyzer';
import React from 'react';

/**
 * The Perfect Fit Analyzer is an AI-powered tool that analyzes job descriptions
 * and shows why David is the perfect candidate for the role.
 */
const meta = {
  title: 'PerfectFitAnalyzer/PerfectFitAnalyzer',
  component: PerfectFitAnalyzer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'This component provides the main interface for the Perfect Fit Analyzer feature, allowing users to upload or paste job descriptions for AI-powered analysis.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ 
        height: 'auto', 
        minHeight: '100vh',
        padding: 0,
        margin: 0, 
        background: 'white'
      }}>
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof PerfectFitAnalyzer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Main story showing the default component
export const Default: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    chromatic: {
      viewports: [1200],
      disableSnapshot: false,
    }
  }
};

// Mock API calls for Storybook
if (typeof window !== 'undefined') {
  // Mock the fetch API for Storybook preview
  const originalFetch = window.fetch;
  window.fetch = async (input, init) => {
    // Only mock API calls to our specific endpoint
    if (input === '/api/perfect-fit-analyzer' && init?.method === 'POST') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return mock data
      return {
        ok: true,
        json: async () => ({
          summary: `# Why You're Perfect for This Role

You have extensive experience with React, Next.js, and TypeScript, which are the primary technologies requested in this job description. Your background in developing responsive web applications with modern frontend frameworks directly aligns with what they're looking for. You've worked with RESTful APIs and have experience with state management solutions like Redux, which they specifically mentioned.

## Key Strengths:
- 5+ years of React development experience, matching their requirement
- Proven track record with Next.js applications in production environments
- Strong TypeScript skills with a focus on type safety
- Experience with responsive design and mobile-first approaches
- Familiarity with modern testing frameworks like Jest and React Testing Library

Your past role at XYZ Company involved similar responsibilities, where you successfully reduced load times by 40% through code optimization and implemented CI/CD pipelines, demonstrating both your technical skills and your impact on business metrics.`,

          coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the Senior Frontend Developer position at Acme Inc. After reviewing the job description, I believe my experience and skills make me an excellent candidate for this role.

With over 5 years of experience developing with React, Next.js, and TypeScript, I've built and maintained complex web applications that prioritize performance and user experience. At my previous company, I led the frontend development of their customer portal, which served over 100,000 users daily. I implemented performance optimizations that reduced load times by 40% and improved conversion rates by 15%.

The job description mentions you're looking for someone with strong API integration experience. In my current role, I've designed and implemented RESTful API integrations with multiple third-party services, ensuring robust error handling and optimistic UI updates for a seamless user experience.

I'm particularly excited about your company's focus on accessibility and responsive design, as I've championed these practices in my current team, implementing WCAG 2.1 compliance across our application suite.

I look forward to discussing how my skills and experience align with your needs for this position.

Sincerely,
David Mieloch`,

          recruiterPitch: `David Mieloch would be an exceptional candidate for your Senior Frontend Developer position. With 5+ years of specialized experience in React, Next.js, and TypeScript, he brings exactly the technical expertise your client is seeking.

Key selling points that match the job requirements:
1. Led frontend development for high-traffic applications serving 100,000+ daily users
2. Reduced load times by 40% through advanced React optimization techniques
3. Implemented comprehensive testing strategies with 85%+ code coverage
4. Experience with modern state management (Redux, Context API)
5. Strong focus on responsive design and accessibility (WCAG 2.1)

Additionally, David has experience mentoring junior developers and collaborating across cross-functional teams - soft skills mentioned in your job description. He has a proven track record of meeting deadlines in fast-paced environments and adapting quickly to changing requirements.

David is currently available for interviews and could start within [timeframe]. He's particularly interested in this role because of the company's innovative approach to [relevant aspect] and the opportunity to work with cutting-edge technologies.

I'd be happy to arrange an interview or provide additional information about his background and qualifications.`
        }),
      } as Response;
    }
    
    // For all other requests, use the original fetch
    return originalFetch(input as RequestInfo, init);
  };
} 