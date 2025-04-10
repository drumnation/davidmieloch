/**
 * Company Research Utilities
 * 
 * This file contains utilities for extracting company information from job descriptions
 * and fetching additional company data.
 */
import { createCompanyResearchPrompt } from './prompt-templates';

/**
 * Extracts company name from job description text
 * @param jobDescription The job description text
 * @returns Extracted company name or empty string if not found
 */
export function extractCompanyName(jobDescription: string): string {
  // Common patterns where company names appear in job descriptions
  const companyPatterns = [
    // Look for "Company: Company Name" pattern
    /Company\s*:\s*([^.,\n]+)/i,
    // Look for "at Company Name" or "with Company Name"
    /(?:at|with)\s+([A-Z][a-zA-Z0-9\s&.,]+?)(?:\sis\s|\swe\s|,|\.|$)/,
    // Look for "Company Name is looking for" pattern
    /([A-Z][a-zA-Z0-9\s&.,]+?)(?:\sis\slooking\sfor|\sis\shiring|\sseeks)/,
    // Look for "About Company Name" pattern
    /About\s+([A-Z][a-zA-Z0-9\s&.,]+?)(?:\s|\:|$)/,
    // Look for "Join Company Name" pattern
    /Join\s+([A-Z][a-zA-Z0-9\s&.,]+?)(?:\s|\!|$)/,
    // Look for "Welcome to Company Name" pattern
    /Welcome\sto\s+([A-Z][a-zA-Z0-9\s&.,]+?)(?:\s|\!|$)/
  ];
  
  for (const pattern of companyPatterns) {
    const match = jobDescription.match(pattern);
    if (match && match[1]) {
      const company = match[1].trim();
      
      // Basic validation - check if it's too short or generic
      if (
        company.length > 2 && 
        !['the company', 'our company', 'a company'].includes(company.toLowerCase())
      ) {
        // Clean up common suffixes and extra words
        return company
          .replace(/(Inc\.|LLC|Ltd\.|\bInc\b|\bLLC\b|\bLtd\b|Corporation)$/i, '')
          .replace(/\bthe\b|\bour\b|\bteam\b/i, '')
          .trim();
      }
    }
  }
  
  return '';
}

/**
 * Cache for company research to avoid redundant API calls
 */
const companyCache: Map<string, { data: string, timestamp: number }> = new Map();

/**
 * Cache expiration time (24 hours)
 */
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Fetches company information using the OpenAI API
 * @param companyName Company name to research
 * @returns Promise resolving to company information
 */
export async function getCompanyInfo(companyName: string): Promise<string> {
  // Early return if company name is empty
  if (!companyName || companyName.length < 3) {
    return '';
  }
  
  // Check cache first
  const cached = companyCache.get(companyName);
  const now = Date.now();
  
  if (cached && (now - cached.timestamp) < CACHE_EXPIRATION) {
    console.log(`Using cached data for ${companyName}`);
    return cached.data;
  }
  
  try {
    console.log(`Researching company: ${companyName}`);
    
    // Get API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('Missing OpenAI API key for company research');
      return '';
    }
    
    // Create prompt for company research
    const prompt = createCompanyResearchPrompt(companyName);
    
    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 350
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error researching company:', errorData);
      return '';
    }
    
    const result = await response.json();
    const companyInfo = result.choices[0].message.content.trim();
    
    // Cache the result
    companyCache.set(companyName, {
      data: companyInfo,
      timestamp: now
    });
    
    console.log(`Successfully researched ${companyName}`);
    return companyInfo;
  } catch (error) {
    console.error('Error in company research:', error);
    return '';
  }
} 