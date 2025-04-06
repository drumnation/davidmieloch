import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  detectDocumentType,
  DocumentType,
  parseTextString,
  cleanText,
  parseDocument,
  parsePdf,
  parseDocx,
  parseText
} from './document-parser';

// Mock external dependencies
vi.mock('pdfjs-dist', () => {
  return {
    getDocument: vi.fn().mockImplementation(() => ({
      promise: Promise.resolve({
        numPages: 3,
        getPage: vi.fn().mockImplementation(() => ({
          getTextContent: vi.fn().mockResolvedValue({
            items: [
              { str: 'Hello' },
              { str: 'world' },
              { str: 'from' },
              { str: 'PDF' }
            ]
          })
        })),
        getMetadata: vi.fn().mockResolvedValue({
          info: {
            Title: 'Test PDF',
            Author: 'Test Author'
          }
        })
      })
    })),
    GlobalWorkerOptions: {
      workerSrc: ''
    },
    version: '3.4.120'
  };
});

vi.mock('mammoth', () => {
  return {
    default: {
      extractRawText: vi.fn().mockResolvedValue({
        value: 'Hello world from DOCX',
        messages: []
      })
    }
  };
});

// Mock File class for testing
class MockFile extends File {
  constructor(parts: BlobPart[], filename: string, options?: FilePropertyBag) {
    super(parts, filename, options);
    Object.defineProperty(this, 'name', {
      value: filename,
      writable: false
    });
  }
}

// Test helper to create mock files of different types
function createMockFile(content: string, filename: string, type: string): File {
  return new MockFile([content], filename, { type });
}

describe('Document Parser Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('detectDocumentType', () => {
    it('should detect PDF files by extension', () => {
      const file = createMockFile('content', 'test.pdf', 'application/octet-stream');
      expect(detectDocumentType(file)).toBe(DocumentType.PDF);
    });

    it('should detect PDF files by mime type', () => {
      const file = createMockFile('content', 'test.bin', 'application/pdf');
      expect(detectDocumentType(file)).toBe(DocumentType.PDF);
    });

    it('should detect DOCX files by extension', () => {
      const file = createMockFile('content', 'test.docx', 'application/octet-stream');
      expect(detectDocumentType(file)).toBe(DocumentType.DOCX);
    });

    it('should detect DOC files by extension', () => {
      const file = createMockFile('content', 'test.doc', 'application/octet-stream');
      expect(detectDocumentType(file)).toBe(DocumentType.DOCX);
    });

    it('should detect DOCX files by mime type', () => {
      const file = createMockFile('content', 'test.bin', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      expect(detectDocumentType(file)).toBe(DocumentType.DOCX);
    });

    it('should detect text files by extension', () => {
      const file = createMockFile('content', 'test.txt', 'application/octet-stream');
      expect(detectDocumentType(file)).toBe(DocumentType.TEXT);
    });

    it('should detect text files by mime type', () => {
      const file = createMockFile('content', 'test.bin', 'text/plain');
      expect(detectDocumentType(file)).toBe(DocumentType.TEXT);
    });

    it('should return UNKNOWN for unrecognized files', () => {
      const file = createMockFile('content', 'test.xyz', 'application/octet-stream');
      expect(detectDocumentType(file)).toBe(DocumentType.UNKNOWN);
    });
  });

  describe('cleanText', () => {
    it('should normalize whitespace', () => {
      const input = 'Hello    world   test';
      expect(cleanText(input)).toBe('Hello world test');
    });

    it('should remove excessive newlines', () => {
      const input = 'Hello\n\n\n\nworld\n\n\n\ntest';
      expect(cleanText(input)).toBe('Hello\n\nworld\n\ntest');
    });

    it('should trim leading and trailing whitespace', () => {
      const input = '  \n  Hello world  \n  ';
      expect(cleanText(input)).toBe('Hello world');
    });

    it('should handle empty input', () => {
      expect(cleanText('')).toBe('');
      expect(cleanText(undefined as unknown as string)).toBe('');
    });
  });

  describe('parseTextString', () => {
    it('should clean and return text content', () => {
      const result = parseTextString('Hello    world\n\n\n\ntest');
      expect(result.text).toBe('Hello world\n\ntest');
      expect(result.type).toBe(DocumentType.TEXT);
      expect(result.error).toBeUndefined();
    });

    it('should handle empty input', () => {
      const result = parseTextString('');
      expect(result.text).toBe('');
      expect(result.type).toBe(DocumentType.TEXT);
      expect(result.error).toBe('No text provided');
    });
  });

  describe('parsePdf', () => {
    it('should correctly parse PDF content', async () => {
      // Mock arrayBuffer implementation
      const arrayBufferMock = vi.fn().mockResolvedValue(new ArrayBuffer(0));
      
      const file = createMockFile('content', 'test.pdf', 'application/pdf');
      file.arrayBuffer = arrayBufferMock;
      
      const result = await parsePdf(file);
      
      expect(arrayBufferMock).toHaveBeenCalled();
      expect(result.text).toContain('Hello world from PDF');
      expect(result.type).toBe(DocumentType.PDF);
      expect(result.error).toBeUndefined();
    });

    it('should include metadata when requested', async () => {
      // Mock arrayBuffer implementation
      const arrayBufferMock = vi.fn().mockResolvedValue(new ArrayBuffer(0));
      
      const file = createMockFile('content', 'test.pdf', 'application/pdf');
      file.arrayBuffer = arrayBufferMock;
      
      const result = await parsePdf(file, { metadata: true });
      
      expect(arrayBufferMock).toHaveBeenCalled();
      expect(result.metadata).toEqual({
        Title: 'Test PDF',
        Author: 'Test Author'
      });
    });

    it('should handle errors gracefully', async () => {
      // Mock arrayBuffer to throw an error
      const arrayBufferMock = vi.fn().mockRejectedValue(new Error('Test error'));
      
      const file = createMockFile('content', 'test.pdf', 'application/pdf');
      file.arrayBuffer = arrayBufferMock;
      
      const result = await parsePdf(file);
      
      expect(arrayBufferMock).toHaveBeenCalled();
      expect(result.text).toBe('');
      expect(result.type).toBe(DocumentType.PDF);
      expect(result.error).toBe('Test error');
    });
  });

  describe('parseDocx', () => {
    it('should correctly parse DOCX content', async () => {
      // Mock arrayBuffer implementation
      const arrayBufferMock = vi.fn().mockResolvedValue(new ArrayBuffer(0));
      
      const file = createMockFile('content', 'test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      file.arrayBuffer = arrayBufferMock;
      
      const result = await parseDocx(file);
      
      expect(arrayBufferMock).toHaveBeenCalled();
      expect(result.text).toBe('Hello world from DOCX');
      expect(result.type).toBe(DocumentType.DOCX);
      expect(result.error).toBeUndefined();
    });

    it('should handle errors gracefully', async () => {
      // Mock arrayBuffer to throw an error
      const arrayBufferMock = vi.fn().mockRejectedValue(new Error('Test error'));
      
      const file = createMockFile('content', 'test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      file.arrayBuffer = arrayBufferMock;
      
      const result = await parseDocx(file);
      
      expect(arrayBufferMock).toHaveBeenCalled();
      expect(result.text).toBe('');
      expect(result.type).toBe(DocumentType.DOCX);
      expect(result.error).toBe('Test error');
    });
  });

  describe('parseText', () => {
    it('should correctly parse text content', async () => {
      // Mock text implementation
      const textMock = vi.fn().mockResolvedValue('Hello world from text file');
      
      const file = createMockFile('content', 'test.txt', 'text/plain');
      file.text = textMock;
      
      const result = await parseText(file);
      
      expect(textMock).toHaveBeenCalled();
      expect(result.text).toBe('Hello world from text file');
      expect(result.type).toBe(DocumentType.TEXT);
      expect(result.error).toBeUndefined();
    });

    it('should handle errors gracefully', async () => {
      // Mock text to throw an error
      const textMock = vi.fn().mockRejectedValue(new Error('Test error'));
      
      const file = createMockFile('content', 'test.txt', 'text/plain');
      file.text = textMock;
      
      const result = await parseText(file);
      
      expect(textMock).toHaveBeenCalled();
      expect(result.text).toBe('');
      expect(result.type).toBe(DocumentType.TEXT);
      expect(result.error).toBe('Test error');
    });
  });

  describe('parseDocument', () => {
    it('should route to parsePdf for PDF files', async () => {
      // Mock the individual parser methods
      const parsePdfSpy = vi.spyOn({ parsePdf }, 'parsePdf').mockResolvedValue({
        text: 'PDF content',
        type: DocumentType.PDF
      });
      
      const file = createMockFile('content', 'test.pdf', 'application/pdf');
      const result = await parseDocument(file);
      
      expect(parsePdfSpy).toHaveBeenCalled();
      expect(result.text).toBe('PDF content');
      expect(result.type).toBe(DocumentType.PDF);
    });

    it('should route to parseDocx for DOCX files', async () => {
      // Mock the individual parser methods
      const parseDocxSpy = vi.spyOn({ parseDocx }, 'parseDocx').mockResolvedValue({
        text: 'DOCX content',
        type: DocumentType.DOCX
      });
      
      const file = createMockFile('content', 'test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      const result = await parseDocument(file);
      
      expect(parseDocxSpy).toHaveBeenCalled();
      expect(result.text).toBe('DOCX content');
      expect(result.type).toBe(DocumentType.DOCX);
    });

    it('should route to parseText for text files', async () => {
      // Mock the individual parser methods
      const parseTextSpy = vi.spyOn({ parseText }, 'parseText').mockResolvedValue({
        text: 'Text content',
        type: DocumentType.TEXT
      });
      
      const file = createMockFile('content', 'test.txt', 'text/plain');
      const result = await parseDocument(file);
      
      expect(parseTextSpy).toHaveBeenCalled();
      expect(result.text).toBe('Text content');
      expect(result.type).toBe(DocumentType.TEXT);
    });

    it('should attempt to parse unknown files as text', async () => {
      // Mock the individual parser methods
      const parseTextSpy = vi.spyOn({ parseText }, 'parseText').mockResolvedValue({
        text: 'Unknown file as text',
        type: DocumentType.TEXT
      });
      
      const file = createMockFile('content', 'test.xyz', 'application/octet-stream');
      const result = await parseDocument(file);
      
      expect(parseTextSpy).toHaveBeenCalled();
      expect(result.text).toBe('Unknown file as text');
      expect(result.type).toBe(DocumentType.TEXT);
    });

    it('should return an error for completely unparseable files', async () => {
      // Mock parseText to throw an error for unknown file types
      const parseTextSpy = vi.spyOn({ parseText }, 'parseText').mockRejectedValue(new Error('Cannot parse'));
      
      const file = createMockFile('content', 'test.xyz', 'application/octet-stream');
      const result = await parseDocument(file);
      
      expect(parseTextSpy).toHaveBeenCalled();
      expect(result.text).toBe('');
      expect(result.type).toBe(DocumentType.UNKNOWN);
      expect(result.error).toBe('Unsupported file format');
    });
  });
}); 