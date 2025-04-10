import { NextRequest, NextResponse } from 'next/server';
import { getResumeData } from '../../../src/components/PerfectFitAnalyzer/utils/resume-data';
import { 
  createSystemPrompt, 
  createUserPrompt, 
  formatAsSummary, 
  formatAsCoverLetter, 
  formatAsRecruiterPitch 
} from '../../../src/components/PerfectFitAnalyzer/utils/prompt-templates';
import { extractCompanyName, getCompanyInfo } from '../../../src/components/PerfectFitAnalyzer/utils/company-research';

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
      
      try {
        // Extract text from PDF using vision approach
        jobDescription = await extractTextUsingVision(fileBuffer);
        console.log('Successfully extracted text from PDF using vision');
      } catch (err) {
        console.error('Error extracting PDF text with vision:', err);
        return NextResponse.json(
          { error: 'Failed to extract text from PDF. Please try plain text input.' },
          { status: 400 }
        );
      }
    } else {
      // Handle JSON request
      console.log('Handling JSON request');
      const data = await request.json();
      
      if (!data.jobDescription) {
        return NextResponse.json(
          { error: 'Job description is required' },
          { status: 400 }
        );
      }
      
      jobDescription = data.jobDescription;
      companyName = data.companyName || '';
    }
    
    // Extract company name if not provided
    if (!companyName) {
      companyName = extractCompanyName(jobDescription);
      console.log(`Extracted company name: ${companyName || 'None found'}`);
    }
    
    // Get company info if company name is available
    let companyInfo = '';
    if (companyName) {
      try {
        companyInfo = await getCompanyInfo(companyName);
        console.log(`Retrieved company info for ${companyName}`);
      } catch (err) {
        console.warn('Error getting company info, continuing without it:', err);
      }
    }
    
    // Ensure OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }
    
    // Get resume data
    console.log('Fetching resume data...');
    const resumeData = await getResumeData();
    
    // Add company info to resume data if available
    if (companyInfo) {
      resumeData.companyContext = companyInfo;
    }
    
    // Call OpenAI API
    console.log('Calling OpenAI API...');
    const result = await fetchFromOpenAI(apiKey, resumeData, jobDescription, companyName);
    
    // Return the analysis result
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
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
  try {
    console.log('Creating prompts for OpenAI...');
    
    // Create system prompt with resume data
    const systemPrompt = createSystemPrompt(resumeData);
    
    // Create user prompt with job description
    const userPrompt = createUserPrompt(jobDescription, companyName);
    
    console.log('Sending request to OpenAI...');
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
        response_format: { type: 'json_object' }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error('Failed to analyze job description');
    }
    
    const result = await response.json();
    console.log('OpenAI response received');
    
    // Parse the response content
    const content = JSON.parse(result.choices[0].message.content);
    
    // Format the outputs using our template functions
    return {
      summary: formatAsSummary(content.summary),
      coverLetter: formatAsCoverLetter(content.coverLetter, companyName),
      recruiterPitch: formatAsRecruiterPitch(content.recruiterPitch)
    };
  } catch (error) {
    console.error('Error in OpenAI request:', error);
    throw error;
  }
} 