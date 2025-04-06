/**
 * Document Parser Utilities
 * 
 * This file contains utilities for parsing different document formats:
 * - PDF documents using pdfjs-dist
 * - DOCX documents using mammoth
 * - Plain text processing
 */

import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set PDF.js worker source - Using direct CDN path for reliability
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Log worker configuration for debugging
console.log('PDF.js worker configured:', {
  version: pdfjsLib.version,
  workerSrc: pdfjsLib.GlobalWorkerOptions.workerSrc
});

/**
 * Supported document types
 */
export enum DocumentType {
  PDF = 'pdf',
  DOCX = 'docx',
  TEXT = 'text',
  UNKNOWN = 'unknown'
}

/**
 * Document parsing result
 */
export interface ParseResult {
  text: string;
  type: DocumentType;
  error?: string;
  metadata?: Record<string, any>;
}

/**
 * Options for parsing documents
 */
export interface ParseOptions {
  maxPages?: number;
  startPage?: number;
  metadata?: boolean;
}

/**
 * Default parse options
 */
const DEFAULT_OPTIONS: ParseOptions = {
  maxPages: 30,
  startPage: 1,
  metadata: false
};

/**
 * Detects the document type from file object
 * @param file File to detect type from
 * @returns DocumentType enum value
 */
export function detectDocumentType(file: File): DocumentType {
  const filename = file.name.toLowerCase();
  
  if (filename.endsWith('.pdf')) {
    return DocumentType.PDF;
  } else if (filename.endsWith('.docx') || filename.endsWith('.doc')) {
    return DocumentType.DOCX;
  } else if (filename.endsWith('.txt') || filename.endsWith('.md') || filename.endsWith('.rtf')) {
    return DocumentType.TEXT;
  }
  
  // Fallback to checking mime type
  if (file.type === 'application/pdf') {
    return DocumentType.PDF;
  } else if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
    file.type === 'application/msword'
  ) {
    return DocumentType.DOCX;
  } else if (
    file.type === 'text/plain' || 
    file.type === 'text/markdown' || 
    file.type === 'text/rtf'
  ) {
    return DocumentType.TEXT;
  }
  
  return DocumentType.UNKNOWN;
}

/**
 * Parses a PDF document and extracts its text content
 * @param file PDF file to parse
 * @param options Parsing options
 * @returns Promise resolving to ParseResult
 */
export async function parsePdf(file: File, options: ParseOptions = DEFAULT_OPTIONS): Promise<ParseResult> {
  try {
    console.log('Starting PDF parsing for file:', file.name, 'size:', file.size);
    const arrayBuffer = await file.arrayBuffer();
    const typedArray = new Uint8Array(arrayBuffer);
    console.log('PDF loaded as typed array, length:', typedArray.length);
    
    // Ensure worker is set
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      console.log('Worker source was not set, setting it now:', pdfjsLib.GlobalWorkerOptions.workerSrc);
    }
    
    // Load the PDF document with better error handling
    console.log('Creating PDF loading task with worker:', pdfjsLib.GlobalWorkerOptions.workerSrc);
    const loadingTaskOptions = { 
      verbosity: 1,  // Enable more verbose logging
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/',
      cMapPacked: true,
    };
    
    const loadingTask = pdfjsLib.getDocument({ 
      data: typedArray, 
      ...loadingTaskOptions 
    });
    
    console.log('Waiting for PDF loading promise to resolve...');
    const pdf = await loadingTask.promise;
    console.log('PDF document loaded successfully, pages:', pdf.numPages);
    
    // Determine number of pages to process
    const maxPages = options.maxPages || pdf.numPages;
    const startPage = options.startPage || 1;
    const endPage = Math.min(startPage + maxPages - 1, pdf.numPages);
    console.log(`Processing PDF pages from ${startPage} to ${endPage} (max: ${maxPages})`);
    
    let fullText = '';
    let metadata = {};
    
    // Extract metadata if requested
    if (options.metadata) {
      try {
        const metadataObj = await pdf.getMetadata();
        metadata = metadataObj.info || {};
        console.log('PDF metadata extracted:', metadata);
      } catch (metaErr) {
        console.warn('Could not extract PDF metadata:', metaErr);
        metadata = { error: 'Could not extract metadata' };
      }
    }
    
    // Process each page with improved text extraction
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      try {
        console.log(`Processing page ${pageNum}/${endPage}`);
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Improved text item extraction with position awareness
        // Sort text items by vertical position, then horizontal
        const sortedItems = [...textContent.items]
          .filter(item => 'str' in item && (item as any).str.trim().length > 0)
          .sort((a, b) => {
            const aY = 'transform' in a ? (a as any).transform[5] : 0;
            const bY = 'transform' in b ? (b as any).transform[5] : 0;
            const yDiff = bY - aY; // Note: PDF coordinates start from bottom left
            
            if (Math.abs(yDiff) > 5) { // If items are in different lines
              return yDiff;
            } else {
              // Same line, sort by x coordinate
              const aX = 'transform' in a ? (a as any).transform[4] : 0;
              const bX = 'transform' in b ? (b as any).transform[4] : 0;
              return aX - bX;
            }
          });
        
        // Group items by line and process
        let lastY = -1;
        let currentLine = '';
        
        for (const item of sortedItems) {
          if ('str' in item && 'transform' in item) {
            const itemText = (item as any).str;
            const y = (item as any).transform[5];
            
            // If we're on a new line
            if (lastY !== -1 && Math.abs(y - lastY) > 5) {
              fullText += currentLine + '\n';
              currentLine = '';
            }
            
            currentLine += itemText + ' ';
            lastY = y;
          }
        }
        
        // Add the last line
        if (currentLine) {
          fullText += currentLine + '\n\n';
        }
        
        // Fallback method if we didn't get enough text
        if (fullText.length < 50 && pageNum === endPage) {
          console.log('Using fallback text extraction method');
          fullText = textContent.items
            .filter(item => 'str' in item)
            .map(item => 'str' in item ? (item as any).str : '')
            .join(' ');
        }
      } catch (pageErr) {
        console.error(`Error processing page ${pageNum}:`, pageErr);
        fullText += `[Error processing page ${pageNum}]\n\n`;
      }
    }
    
    const cleanedText = cleanText(fullText);
    console.log('PDF parsing complete, extracted text length:', cleanedText.length);
    
    // If we still didn't get enough text, try a more aggressive fallback
    if (cleanedText.length < 100) {
      console.warn('Insufficient text extracted, attempting to extract raw content');
      
      try {
        // Try a simpler approach to get at least some content
        let rawText = '';
        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map(item => 'str' in item ? (item as any).str : '')
            .join(' ');
          rawText += pageText + ' ';
        }
        
        if (rawText.length > cleanedText.length) {
          console.log('Raw extraction produced more text:', rawText.length);
          return {
            text: cleanText(rawText),
            type: DocumentType.PDF,
            metadata: options.metadata ? { ...metadata, extractionMethod: 'raw' } : undefined
          };
        }
      } catch (rawErr) {
        console.error('Raw extraction also failed:', rawErr);
      }
    }
    
    return {
      text: cleanedText,
      type: DocumentType.PDF,
      metadata: options.metadata ? { ...metadata, extractionMethod: 'standard' } : undefined
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return {
      text: '',
      type: DocumentType.PDF,
      error: error instanceof Error ? error.message : 'Unknown error parsing PDF'
    };
  }
}

/**
 * Parses a DOCX document and extracts its text content
 * @param file DOCX file to parse
 * @param options Parsing options
 * @returns Promise resolving to ParseResult
 */
export async function parseDocx(file: File, options: ParseOptions = DEFAULT_OPTIONS): Promise<ParseResult> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Convert DOCX to HTML
    const result = await mammoth.extractRawText({
      arrayBuffer: arrayBuffer
    });
    
    return {
      text: cleanText(result.value),
      type: DocumentType.DOCX,
      // Include any warnings
      metadata: options.metadata ? { warnings: result.messages } : undefined
    };
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    return {
      text: '',
      type: DocumentType.DOCX,
      error: error instanceof Error ? error.message : 'Unknown error parsing DOCX'
    };
  }
}

/**
 * Parses a text document
 * @param file Text file to parse
 * @returns Promise resolving to ParseResult
 */
export async function parseText(file: File): Promise<ParseResult> {
  try {
    const text = await file.text();
    
    return {
      text: cleanText(text),
      type: DocumentType.TEXT
    };
  } catch (error) {
    console.error('Error parsing text file:', error);
    return {
      text: '',
      type: DocumentType.TEXT,
      error: error instanceof Error ? error.message : 'Unknown error parsing text file'
    };
  }
}

/**
 * Unified document parsing function that handles different document types
 * @param file File to parse
 * @param options Parsing options
 * @returns Promise resolving to ParseResult
 */
export async function parseDocument(file: File, options: ParseOptions = DEFAULT_OPTIONS): Promise<ParseResult> {
  const documentType = detectDocumentType(file);
  
  switch (documentType) {
    case DocumentType.PDF:
      return parsePdf(file, options);
    case DocumentType.DOCX:
      return parseDocx(file, options);
    case DocumentType.TEXT:
      return parseText(file);
    default:
      // For unknown types, attempt to parse as text
      try {
        return await parseText(file);
      } catch (error) {
        return {
          text: '',
          type: DocumentType.UNKNOWN,
          error: 'Unsupported file format'
        };
      }
  }
}

/**
 * Cleans and normalizes extracted text
 * @param text Text to clean
 * @returns Cleaned text
 */
export function cleanText(text: string): string {
  if (!text) return '';
  
  return text
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    // Remove excessive newlines (keeping max 2)
    .replace(/\n{3,}/g, '\n\n')
    // Trim leading/trailing whitespace
    .trim();
}

/**
 * Extracts text content from a string (e.g., pasted job description)
 * @param text Text string to clean
 * @returns ParseResult with cleaned text
 */
export function parseTextString(text: string): ParseResult {
  if (!text) {
    return {
      text: '',
      type: DocumentType.TEXT,
      error: 'No text provided'
    };
  }
  
  return {
    text: cleanText(text),
    type: DocumentType.TEXT
  };
}