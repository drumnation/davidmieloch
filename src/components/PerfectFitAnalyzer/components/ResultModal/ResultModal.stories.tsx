import { Meta, StoryObj } from '@storybook/react';
import ResultModal, { AnalysisResult } from './ResultModal';
import { useState } from 'react';

/**
 * The ResultModal component displays job analysis results in a tabbed interface.
 * It allows users to view their analysis in different formats and export as PDF.
 */
const meta = {
  title: 'PerfectFitAnalyzer/Components/ResultModal',
  component: ResultModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResultModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleResult: AnalysisResult = {
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
};

// Modal Controller component for interactive states in Storybook
const ModalController = (args: typeof ResultModal.arguments) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)} style={{ padding: '8px 16px' }}>
        Open Result Modal
      </button>
      <ResultModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

// Story with sample results
export const WithResults: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    result: sampleResult
  },
  render: (args) => <ModalController {...args} result={sampleResult} />
};

// Story with loading state
export const Loading: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    result: null,
    loading: true
  },
  render: (args) => <ModalController {...args} result={null} loading={true} />
};

// Story with empty state
export const Empty: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    result: null,
    loading: false
  },
  render: (args) => <ModalController {...args} result={null} loading={false} />
};

// Story with company name
export const WithCompanyName: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    result: sampleResult,
    companyName: "Acme Inc."
  },
  render: (args) => <ModalController {...args} result={sampleResult} companyName="Acme Inc." />
};

// Interactive story for all states
export const Interactive: Story = {
  argTypes: {
    isOpen: { control: 'boolean' },
    loading: { control: 'boolean' },
    companyName: { control: 'text' },
    result: { control: 'object' }
  },
  args: {
    isOpen: true,
    onClose: () => {},
    loading: false,
    companyName: 'Acme Inc.',
    result: sampleResult
  }
}; 