/**
 * AI Prompt Templates for Perfect Fit Analyzer
 * 
 * This file contains structured prompt templates for the OpenAI API
 * to generate tailored analyses based on job descriptions.
 */

/**
 * Creates the system prompt with David's resume context
 * @param resumeData Resume data to include in prompt
 * @returns Formatted system prompt
 */
export function createSystemPrompt(resumeData: any): string {
  const { profile, skills, experience, education, companyContext } = resumeData;
  
  // Format experiences
  const formattedExperience = experience
    .map((exp: any) => {
      const highlights = exp.highlights 
        ? `\nKey achievements:\n${exp.highlights.map((h: string) => `- ${h}`).join('\n')}`
        : '';
      
      return `
Company: ${exp.company}
Title: ${exp.title}
Period: ${exp.period}
${exp.description}${highlights}
      `.trim();
    })
    .join('\n\n');
  
  // Format education
  const formattedEducation = education
    .map((edu: any) => {
      return `
School: ${edu.school}
Degree: ${edu.degree}
Field: ${edu.fieldOfStudy}
Period: ${edu.period}
${edu.description || ''}
      `.trim();
    })
    .join('\n\n');
  
  // Format skills by category
  const skillsByCategory = Object.entries(skills.categories)
    .map(([category, skillList]) => {
      return `${category}: ${(skillList as string[]).join(', ')}`;
    })
    .join('\n');
  
  // Add company context if available
  const companyContextSection = companyContext 
    ? `\nCOMPANY CONTEXT:\n${companyContext}\n`
    : '';
  
  // Create the full system prompt
  return `
You are an AI assistant for David Mieloch, a senior full stack engineer and team lead. Your purpose is to analyze job descriptions and create personalized, persuasive content showing why David is the perfect fit.

ABOUT DAVID MIELOCH:
${profile.name} - ${profile.title}
Location: ${profile.contact?.location || 'King of Prussia, Pennsylvania, United States'}

Summary:
${profile.summary}

SKILLS:
${skillsByCategory}

Top skills: ${skills.topSkills.join(', ')}

EXPERIENCE:
${formattedExperience}

EDUCATION:
${formattedEducation}${companyContextSection}

YOUR TASK:
Analyze the job description provided by the user and generate THREE different outputs:
1. A concise summary (200-300 words) highlighting the key matches between David's skills/experience and the job requirements
2. A persuasive cover letter (400-500 words) that presents David as an ideal candidate
3. A "why David is perfect" recruiter pitch (300-400 words) that emphasizes his unique qualifications

YOUR TONE:
- Confident but not arrogant
- Professional with a hint of personality
- Backed by specific examples from David's experience
- Focused on value David can bring to the role

IMPORTANT GUIDELINES:
- Emphasize SPECIFIC relevance between David's experience and the job requirements
- Highlight technical AND leadership skills that match the role
- Reference actual projects, technologies, and achievements from David's background
- Use a touch of humor where appropriate, especially in the recruiter pitch
- Be slightly biased in David's favor, but remain credible and realistic
- Focus on his strongest matches to the job description
- For the cover letter, format it professionally with proper greeting and signature

FORMAT:
Return a JSON object with these keys: "summary", "coverLetter", and "recruiterPitch"
`.trim();
}

/**
 * Creates the user prompt with job description
 * @param jobDescription The job description to analyze
 * @param companyName Optional company name for personalization
 * @returns Formatted user prompt
 */
export function createUserPrompt(jobDescription: string, companyName?: string): string {
  const companyContext = companyName 
    ? `This job is at ${companyName}. Please personalize the responses to this company.` 
    : '';
  
  return `
Please analyze this job description and create the three outputs (summary, cover letter, and recruiter pitch) as specified:

${jobDescription}

${companyContext}

Remember to format your response as a JSON object with the keys "summary", "coverLetter", and "recruiterPitch".
`.trim();
}

/**
 * Formats the API response as a summary
 * @param content The content to format
 * @returns Formatted summary
 */
export function formatAsSummary(content: string): string {
  return content.trim();
}

/**
 * Formats the API response as a cover letter
 * @param content The content to format
 * @param companyName Optional company name to include
 * @returns Formatted cover letter
 */
export function formatAsCoverLetter(content: string, companyName?: string): string {
  // If the cover letter doesn't already include a date, add it
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const companyHeader = companyName ? `${companyName}\n` : '';
  
  // Check if the content already has a date and greeting
  if (!content.includes('Dear') && !content.includes('To Whom It May Concern')) {
    return `
${today}

${companyHeader}

${content}

Sincerely,
David Mieloch
`.trim();
  }
  
  return content.trim();
}

/**
 * Formats the API response as a recruiter pitch
 * @param content The content to format
 * @returns Formatted recruiter pitch
 */
export function formatAsRecruiterPitch(content: string): string {
  return `
📋 RECRUITER PITCH: WHY DAVID IS THE PERFECT FIT

${content.trim()}

Want to discuss further? Contact David at dmieloch@example.com
`.trim();
}

/**
 * Creates a prompt for company research
 * @param companyName Company name to research
 * @returns Prompt for company research
 */
export function createCompanyResearchPrompt(companyName: string): string {
  return `
Please provide a brief overview of ${companyName} that would be relevant for a job application. Focus on:
1. Company's main products or services
2. Recent news or achievements
3. Company values or culture
4. Any challenges or opportunities they might be facing

Keep the response concise (150-200 words) and factual.
`.trim();
} 