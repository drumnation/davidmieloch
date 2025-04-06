import { NextRequest, NextResponse } from 'next/server';
import { getResumeData } from '../../../src/components/PerfectFitAnalyzer/utils/resume-data';

/**
 * Rate limiting for API usage
 */
const RATE_LIMIT = {
  // Limit requests per IP address
  MAX_REQUESTS_PER_IP: 10, // Maximum requests per time window
  TIME_WINDOW: 3600 * 1000, // Time window in milliseconds (1 hour)
  
  // Keep track of requests per IP
  requestCounts: new Map<string, { count: number, timestamp: number }>()
};

/**
 * Get client IP from request headers
 * @param request NextRequest object
 * @returns Client IP address or 'unknown'
 */
function getClientIp(request: NextRequest): string {
  // Check for Cloudflare or similar proxy headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Check for real IP header (e.g., from Nginx)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // If we can't determine the IP, return a fallback
  return 'unknown';
}

/**
 * Checks if a request should be rate limited
 * @param ip IP address to check
 * @returns boolean indicating if request should be limited
 */
function shouldRateLimit(ip: string): boolean {
  const now = Date.now();
  const requestData = RATE_LIMIT.requestCounts.get(ip);
  
  // New IP address
  if (!requestData) {
    RATE_LIMIT.requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }
  
  // Reset counter if time window has passed
  if (now - requestData.timestamp > RATE_LIMIT.TIME_WINDOW) {
    RATE_LIMIT.requestCounts.set(ip, { count: 1, timestamp: now });
    return false;
  }
  
  // Check if limit exceeded
  if (requestData.count >= RATE_LIMIT.MAX_REQUESTS_PER_IP) {
    return true;
  }
  
  // Increment counter
  RATE_LIMIT.requestCounts.set(ip, { 
    count: requestData.count + 1, 
    timestamp: requestData.timestamp 
  });
  
  return false;
}

/**
 * Extracts text from a PDF file using OpenAI document processing
 * @param fileBuffer The PDF file as a Buffer
 * @returns Extracted text from the PDF
 */
async function extractTextFromPDF(fileBuffer: Buffer, filename: string): Promise<string> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing OpenAI API key for PDF processing');
    }

    // Create form data with the PDF file
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: 'application/pdf' });
    formData.append('file', blob, filename);
    formData.append('model', 'gpt-4o');
    formData.append('purpose', 'document-extraction');

    // Send request to OpenAI
    console.log('Sending PDF to OpenAI for text extraction...');
    const response = await fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI PDF processing error:', errorData);
      throw new Error('Failed to process PDF file');
    }

    const result = await response.json();
    const fileId = result.id;

    // Use OpenAI to extract text from the file
    const extractionResponse = await fetch(`https://api.openai.com/v1/files/${fileId}/content`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!extractionResponse.ok) {
      const errorData = await extractionResponse.json();
      console.error('OpenAI text extraction error:', errorData);
      throw new Error('Failed to extract text from PDF');
    }

    const extractionResult = await extractionResponse.json();
    console.log('PDF text extracted successfully');

    // Clean up the file after processing
    await fetch(`https://api.openai.com/v1/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return extractionResult.content || '';
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
}

/**
 * Alternative method to extract text using OpenAI's vision capabilities
 * @param fileBuffer The PDF file as a Buffer
 * @returns Extracted text content
 */
async function extractTextUsingVision(fileBuffer: Buffer): Promise<string> {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('Missing OpenAI API key for PDF processing');
    }

    // Convert buffer to base64
    const base64File = fileBuffer.toString('base64');
    
    // Create request to vision API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a document text extractor. Extract all text content from the provided document image in a clean format. Focus on extracting job requirements, responsibilities, and qualifications.'
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Extract all text from this document. This is a job description PDF. Extract the complete text content.' },
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/pdf;base64,${base64File}`
                }
              }
            ]
          }
        ],
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI vision processing error:', errorData);
      throw new Error('Failed to process PDF using vision API');
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error extracting text using vision API:', error);
    throw error;
  }
}

/**
 * API endpoint for Perfect Fit Analyzer
 */
export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const ip = getClientIp(request);
    if (shouldRateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: RATE_LIMIT.TIME_WINDOW / 1000 // seconds
        }, 
        { status: 429 }
      );
    }
    
    // Check content type to determine if it's file upload or JSON
    const contentType = request.headers.get('content-type') || '';
    let jobDescription: string;
    let companyName: string = '';
    
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      console.log('Handling file upload request');
      const formData = await request.formData();
      const pdfFile = formData.get('file') as File | null;
      companyName = (formData.get('companyName') as string) || '';
      
      if (!pdfFile) {
        return NextResponse.json(
          { error: 'No file uploaded' },
          { status: 400 }
        );
      }
      
      // Check if file is PDF
      if (!pdfFile.type.includes('pdf')) {
        return NextResponse.json(
          { error: 'Only PDF files are supported' },
          { status: 400 }
        );
      }
      
      console.log(`Processing PDF file: ${pdfFile.name}, size: ${pdfFile.size} bytes`);
      
      // Convert file to buffer
      const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
      
      // Extract text from PDF
      try {
        jobDescription = await extractTextUsingVision(fileBuffer);
        console.log(`Extracted ${jobDescription.length} characters from PDF`);
        
        if (!jobDescription || jobDescription.length < 50) {
          return NextResponse.json(
            { error: 'Could not extract sufficient text from the PDF file' },
            { status: 400 }
          );
        }
      } catch (extractError) {
        console.error('PDF extraction error:', extractError);
        return NextResponse.json(
          { error: 'Failed to process the PDF file' },
          { status: 500 }
        );
      }
    } else {
      // Handle JSON request
      const data = await request.json();
      jobDescription = data.jobDescription;
      companyName = data.companyName || '';
      
      if (!jobDescription || jobDescription.trim() === '') {
        return NextResponse.json(
          { error: 'Job description is required' }, 
          { status: 400 }
        );
      }
    }
    
    // Get resume data
    const resumeData = await getResumeData();
    
    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('Missing OpenAI API key');
      return NextResponse.json(
        { error: 'Configuration error. Please try again later or contact support.' }, 
        { status: 500 }
      );
    }
    
    // Create OpenAI chat completion
    const response = await fetchFromOpenAI(apiKey, resumeData, jobDescription, companyName);
    
    // Return the response
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in perfect-fit-analyzer API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' }, 
      { status: 500 }
    );
  }
}

/**
 * Fetches analysis from OpenAI API
 */
async function fetchFromOpenAI(
  apiKey: string, 
  resumeData: any, 
  jobDescription: string, 
  companyName?: string
) {
  const systemPrompt = createSystemPrompt(resumeData);
  const userPrompt = createUserPrompt(jobDescription, companyName);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(errorData.error?.message || 'Error calling OpenAI API');
    }
    
    const result = await response.json();
    
    // Process and format the response
    return {
      summary: formatAsSummary(result.choices[0].message.content),
      coverLetter: formatAsCoverLetter(result.choices[0].message.content, companyName),
      recruiterPitch: formatAsRecruiterPitch(result.choices[0].message.content)
    };
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}

/**
 * Creates the system prompt with resume data
 */
function createSystemPrompt(resumeData: any): string {
  return `You are a persuasive, slightly biased career coach assistant helping David Mieloch create a job application.
  
Your task is to analyze a job description, compare it with David's qualifications, and write a compelling analysis showing why he is an exceptional candidate for the role. This is not a neutral comparison - you should advocate for David.

Here is David's resume data:
${JSON.stringify(resumeData, null, 2)}

IMPORTANT GUIDELINES:
1. Be persuasive but truthful - find genuine connections between the job requirements and David's experience
2. Emphasize his strengths and use quantifiable results where possible
3. Address potential gaps by showing transferable skills
4. Use a professional, confident tone with a touch of personality
5. Include subtle humor where appropriate
6. Structure your analysis in a clear, organized way
7. Format your response so it can be easily converted to different formats (summary, cover letter, recruiter pitch)
8. Include statistics and metrics from his past roles when relevant
9. Advocate for David as if you were his personal career agent
10. Avoid excessive formality and corporate speak - be personable but professional`;
}

/**
 * Creates the user prompt with job description
 */
function createUserPrompt(jobDescription: string, companyName?: string): string {
  const companyContext = companyName ? 
    `The role is at ${companyName}. Please include specific details about why David would be a great fit for ${companyName} specifically.` : 
    'Please keep your analysis focused on the role requirements rather than company-specific information.';
    
  return `Please analyze this job description and tell me why David Mieloch is an excellent candidate. ${companyContext}

JOB DESCRIPTION:
${jobDescription}

Please structure your response with:
1. A brief introduction highlighting the key match points
2. A section addressing each major job requirement and how David's experience aligns
3. A section addressing any potential gaps and how David's transferable skills compensate
4. A compelling conclusion
`;
}

/**
 * Formats the AI response as a summary
 */
function formatAsSummary(content: string): string {
  // Return the content mostly as-is for the summary
  // Just ensure it has proper paragraphs
  return content.trim();
}

/**
 * Formats the AI response as a cover letter
 */
function formatAsCoverLetter(content: string, companyName?: string): string {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const companyHeader = companyName ? `\n${companyName}` : '';
  
  return `${date}${companyHeader}

Dear Hiring Manager,

${content.trim()}

I look forward to discussing how my background aligns with your needs in more detail.

Sincerely,
David Mieloch`;
}

/**
 * Formats the AI response as a recruiter pitch
 */
function formatAsRecruiterPitch(content: string): string {
  // Extract key points and reframe for recruiter perspective
  const sections = content.split(/\n\n|\r\n\r\n/);
  const keyPoints = sections.slice(0, Math.min(4, sections.length));
  
  return `CANDIDATE HIGHLIGHT: DAVID MIELOCH

${keyPoints.join('\n\n')}

KEY STRENGTHS:
* Full-stack technical skills with deep AI/ML implementation experience
* Business acumen and strategic thinking
* Leadership experience across multiple teams
* Proven track record of delivering high-impact projects

David is immediately available for interviews and can be reached at david@example.com.`;
} 