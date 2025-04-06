'use client';

import React, { useState, useCallback } from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Stack,
  LoadingOverlay,
  Group,
  Box,
  Transition,
  Badge,
  Paper,
  Divider,
  Button,
  MantineTheme
} from '@mantine/core';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  IconUpload, 
  IconClipboardText, 
  IconAnalyze, 
  IconFile,
  IconFileText,
  IconFileTypeDocx,
  IconPencil, 
  IconDeviceMobile, 
  IconChartBar, 
  IconBolt, 
  IconTarget, 
  IconLock,
  IconClock
} from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { useHover } from '@mantine/hooks';
import ResultModal from './components/ResultModal/ResultModal';
import { parseDocument, parseTextString, DocumentType } from './utils/document-parser';

// API response type
interface AnalyzerApiResponse {
  summary: string;
  coverLetter: string;
  recruiterPitch: string;
  error?: string;
}

// Component props
export interface PerfectFitAnalyzerProps {
  className?: string;
}

// Animations
const pulseAnimation = keyframes`
  0% { transform: scale(1) rotate(5deg); }
  50% { transform: scale(1.05) rotate(5deg); }
  100% { transform: scale(1) rotate(5deg); }
`;

const flyAnimation = keyframes`
  0% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-10px) rotate(45deg); }
  100% { transform: translateY(0) rotate(45deg); }
`;

const shimmerAnimation = keyframes`
  0% { left: -60%; }
  100% { left: 120%; }
`;

// Styled components
const AnalyzerContainer = styled(Container)`
  max-width: 800px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 30px rgba(0, 0, 150, 0.08);
  padding: 40px;
  position: relative;
  overflow: hidden;
  margin: 2rem auto;
  
  &::before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, var(--mantine-color-primary-4), var(--mantine-color-primary-7));
    border-radius: 50%;
    opacity: 0.2;
    z-index: 0;
  }
`;

const HeaderContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: 35px;
  position: relative;
  padding-top: 20px;
`;

const TitleWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
  
  &::before, &::after {
    content: "✨";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
  }
  
  &::before {
    left: -40px;
    
    @media (max-width: 768px) {
      left: -25px;
    }
    
    @media (max-width: 480px) {
      left: -20px;
    }
  }
  
  &::after {
    right: -40px;
    
    @media (max-width: 768px) {
      right: -25px;
    }
    
    @media (max-width: 480px) {
      right: -20px;
    }
  }
`;

const StyledBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 30px;
  background: linear-gradient(135deg, #ff3366, #ff5500);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  transform: rotate(5deg);
  box-shadow: 0 3px 10px rgba(255, 51, 102, 0.3);
  animation: ${pulseAnimation} 2s infinite;
  z-index: 10;
`;

const SuccessRateBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #e1f5e3;
  color: #00aa33;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
`;

const RocketEmoji = styled.div`
  position: absolute;
  top: 45px;
  right: 65px;
  font-size: 24px;
  transform: rotate(45deg);
  animation: ${flyAnimation} 3s infinite;
  z-index: 10;
`;

const StyledDropzone = styled(Dropzone)`
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--mantine-color-primary-4);
  border-radius: 14px;
  background: #f0f7ff;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  padding: 35px 25px;
  width: 100%;
  text-align: center;
  
  &:hover, &:focus {
    border-color: var(--mantine-color-primary-7);
    background: #e6f2ff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 83, 217, 0.1);
  }
`;

const UploadIcon = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-size: 40px;
  color: var(--mantine-color-primary-6);
  margin: 0 auto 20px;
`;

const FileTypesGroup = styled(Group)`
  margin-top: 20px;
  justify-content: center;
  gap: 10px;
`;

const FileTypeIndicator = styled.div`
  background-color: #e6f0ff;
  color: var(--mantine-color-primary-7);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ColoredIcon = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const OrDividerStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  width: 80%;
  
  &::before, &::after {
    content: "";
    flex-grow: 1;
    height: 1px;
    background-color: #ddd;
  }
  
  span {
    padding: 0 15px;
    color: #999;
    font-size: 14px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 0;
  max-width: 100%;
  min-height: 0;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  transition: all 0.3s ease;
  
  &.expanded {
    position: relative;
    height: 200px;
    min-height: 200px;
    opacity: 1;
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid var(--mantine-color-gray-3);
    border-radius: var(--mantine-radius-sm);
    background: white;
    z-index: 10;
  }
`;

const AnalyzeButtonStyled = styled.button`
  background: linear-gradient(135deg, #4c7fff, #0043ce);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin: 25px auto 15px;
  display: block;
  width: 80%;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 67, 206, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 67, 206, 0.4);
    background: linear-gradient(135deg, #3d6bff, #0039b5);
  }
  
  &:disabled {
    background: linear-gradient(135deg, #a0a0a0, #7a7a7a);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -60%;
    width: 20%;
    height: 200%;
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(30deg);
    transition: all 0.6s ease;
  }
  
  &:hover:not(:disabled)::after {
    animation: ${shimmerAnimation} 0.6s forwards;
  }
`;

const ExportOptionsGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 15px;
`;

const ExportOptionStyled = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 12px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background-color: #e9ecef;
    border-color: #ccc;
    transform: translateY(-1px);
  }
`;

const BenefitsGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  width: 100%;
`;

const BenefitItem = styled.div`
  text-align: center;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const BenefitIconWrapper = styled.div<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.div`
  font-style: italic;
  color: #777;
  font-size: 13px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 12px 20px;
  margin: 35px auto 10px;
  max-width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  line-height: 1.4;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 24px;
    color: #ddd;
  }
  
  &::after {
    content: '"';
    position: absolute;
    bottom: 0;
    right: 10px;
    font-size: 24px;
    color: #ddd;
  }
`;

const TestimonialAttribution = styled.div`
  font-style: normal;
  font-weight: 700;
  color: #555;
  margin-top: 8px;
  font-size: 12px;
`;

// Animation variants
const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

const iconVariants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      rotate: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2
      }
    }
  }
};

/**
 * PerfectFitAnalyzer component
 * 
 * An AI-powered interactive tool that allows visitors to upload or paste a job description
 * and receive a GPT-generated analysis showing why David is the perfect candidate for the role.
 */
export const PerfectFitAnalyzer: React.FC<PerfectFitAnalyzerProps> = ({
  className,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AnalyzerApiResponse | null>(null);
  const [companyName, setCompanyName] = useState<string>('');
  const [jobText, setJobText] = useState<string>('');
  const [isTextMode, setIsTextMode] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isPdfUploaded, setIsPdfUploaded] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { hovered, ref } = useHover();

  // Extract company name from job description
  const extractCompanyName = useCallback((text: string): string => {
    // Basic extraction - look for common patterns
    const companyPatterns = [
      /at\s+([A-Z][A-Za-z0-9\s&]+?)(?:\s+is|\s+are|\s+we|\s*,)/i,
      /([A-Z][A-Za-z0-9\s&]+?)\s+is\s+(?:looking|seeking|hiring|searching)/i,
      /join\s+(?:the\s+)?([A-Z][A-Za-z0-9\s&]+?)(?:\s+team|\s+as|\s*,)/i,
      /about\s+([A-Z][A-Za-z0-9\s&]+?)(?:\s*:|\s*-|\s+we|\s+is|\s+are)/i
    ];
    
    for (const pattern of companyPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        // Clean up and return the company name
        return match[1].trim()
          .replace(/\binc\.?\b|\bllc\.?\b|\bcorp\.?\b|\binc\b|\bllc\b|\bcorp\b/i, '')
          .trim();
      }
    }
    
    return '';
  }, []);

  // Toggle between file drop and text entry
  const toggleTextMode = useCallback(() => {
    setIsTextMode(prev => !prev);
    setFileName(null);
    setPdfFile(null); // Clear PDF file when switching modes
    if (isTextMode) {
      setIsPdfUploaded(false); // Reset PDF flag when switching to file upload mode
    }
    // Add a slight delay to focus on the textarea after mode change
    if (!isTextMode) {
      setTimeout(() => {
        const textArea = document.querySelector('.expanded') as HTMLTextAreaElement;
        if (textArea) textArea.focus();
      }, 100);
    }
  }, [isTextMode]);

  // Handle text change
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobText(e.target.value);
    setIsPdfUploaded(false); // Reset PDF flag when text is edited manually
    setPdfFile(null); // Clear PDF file when text is edited manually
  }, []);

  // Handle file drop
  const handleFileDrop = useCallback(async (files: File[]) => {
    setError(null);
    console.log('File drop detected, files count:', files.length);
    
    if (files.length === 0) {
      return;
    }
    
    // Set loading state and clear previous job text
    setLoading(true);
    setFileName(files[0].name);
    
    try {
      const file = files[0];
      console.log('Processing file:', file.name, 'type:', file.type, 'size:', file.size);
      
      // Check if file is a PDF
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      setIsPdfUploaded(isPdf);
      console.log('Is PDF file:', isPdf);
      
      if (isPdf) {
        // For PDFs, store the file for direct API upload instead of extracting text
        setPdfFile(file);
        console.log('PDF file saved for direct API upload');
        setJobText("PDF document ready for submission");
        setError(null);
        
        // Switch to text mode to show the text area if needed
        if (!isTextMode) {
          setIsTextMode(true);
        }
      } else {
        // For non-PDF files, process normally using document-parser
        setPdfFile(null); // Clear any previous PDF file
        
        // Process the document with expanded options
        const result = await parseDocument(file, {
          maxPages: 50,
          metadata: true
        });
        
        console.log('Document parsing result:', { 
          type: result.type, 
          textLength: result.text.length,
          error: result.error,
          firstChars: result.text.substring(0, 100),
          metadata: result.metadata,
          isPdf: result.type === DocumentType.PDF
        });
        
        if (result.error) {
          console.error('Document parsing error:', result.error);
          setError(`Error processing file: ${result.error}`);
          return;
        }
        
        // Switch to text mode to show the text area if needed
        if (!isTextMode) {
          setIsTextMode(true);
        }
        
        if (result.text.length < 100) {
          // Only show error for non-PDF files
          console.warn('Document has insufficient text:', result.text.length, 'characters');
          setError('The document does not contain enough text (minimum 100 characters needed). Please try a different file or add more text manually.');
          setJobText(result.text);
        } else {
          // Clear any previous errors and set the text
          console.log('Document has sufficient text:', result.text.length, 'characters');
          setError(null);
          
          // Update jobText with the parsed content
          setJobText(result.text);
        }
      }
    } catch (err) {
      console.error('File processing error:', err);
      setError('An unexpected error occurred while processing the file. Please try again or paste text manually.');
      setIsPdfUploaded(false); // Reset PDF flag on error
      setPdfFile(null); // Clear PDF file on error
    } finally {
      setLoading(false);
    }
  }, [isTextMode]);

  // Handle job description submission
  const handleJobDescriptionSubmit = useCallback(async () => {
    // Log the current state for debugging
    console.log('Submit requested, jobText length:', jobText.length, 'Loading:', loading, 'PDF file:', !!pdfFile);
    
    if (loading) {
      console.log('Submission rejected - Loading in progress');
      return;
    }
    
    // If neither text nor PDF file is available, reject
    if (!jobText && !pdfFile) {
      console.log('Submission rejected - No text or PDF file');
      setError('Please provide a job description or upload a PDF file.');
      return;
    }
    
    // If we have text but no PDF, validate text length
    if (!pdfFile && jobText.length < 100) {
      console.log('Submission rejected - Text too short');
      setError('Please provide a job description of at least 100 characters.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Try to extract company name
      const company = extractCompanyName(jobText);
      setCompanyName(company);
      
      let response;
      
      if (pdfFile) {
        // Handle PDF upload - use FormData to send the file
        console.log('Submitting PDF file directly to API:', pdfFile.name);
        
        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('companyName', company);
        
        // Call the API with form data
        response = await fetch('/api/perfect-fit-analyzer', {
          method: 'POST',
          body: formData,
        });
      } else {
        // Handle text submission (original method)
        console.log('Submitting text to API, length:', jobText.length);
        
        // Call the API with JSON
        response = await fetch('/api/perfect-fit-analyzer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobDescription: jobText,
            companyName: company
          }),
        });
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze job description');
      }
      
      // Set results and show modal
      setResults(data);
      setShowResults(true);
    } catch (err) {
      console.error('Error submitting job description:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [extractCompanyName, jobText, loading, pdfFile]);

  // Handle closing the results modal
  const handleCloseResults = useCallback(() => {
    setShowResults(false);
  }, []);

  // Modified canAnalyze to allow PDFs to always pass
  const canAnalyze = React.useMemo(() => {
    // If a PDF was uploaded, always allow analysis
    if (isPdfUploaded && !loading) {
      console.log('Analysis enabled due to PDF upload');
      return true;
    }
    
    // Otherwise, use the original text length check
    const isValid = jobText && jobText.length >= 100 && !loading;
    console.log('canAnalyze evaluation:', { 
      isPdfUploaded,
      hasText: !!jobText, 
      textLength: jobText?.length || 0, 
      notLoading: !loading, 
      result: isValid || isPdfUploaded
    });
    return isValid;
  }, [jobText, loading, isPdfUploaded]);

  return (
    <AnalyzerContainer className={className} pos="relative">
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      
      <StyledBadge>AI-POWERED</StyledBadge>
      <SuccessRateBadge>98.5% Success Rate</SuccessRateBadge>
      <RocketEmoji>🚀</RocketEmoji>
      
      <HeaderContainer
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <TitleWrapper>
          <Title order={2} mb="md" c="primary" style={{ fontSize: '32px' }}>Perfect Fit Analyzer</Title>
        </TitleWrapper>
        
        <Text size="lg" maw={800} mx="auto">
          Upload a job description and get a <Text component="span" fw={700} c="primary">personalized analysis</Text> showing exactly why I'm the <Text component="span" fw={700} c="primary">perfect candidate</Text> for the role.
        </Text>
      </HeaderContainer>
      
      <Stack gap="md" align="center" style={{ width: '100%' }}>
        <StyledDropzone
          onDrop={handleFileDrop}
          maxSize={10 * 1024 * 1024} // 10MB
          accept={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']}
          disabled={loading}
          ref={ref}
          onClick={() => {
            // Focus the textarea when clicking the dropzone in text mode
            if (isTextMode) {
              const textArea = document.querySelector('.expanded') as HTMLTextAreaElement;
              if (textArea) textArea.focus();
            }
          }}
        >
          <UploadIcon
            variants={iconVariants}
            animate={hovered ? "hover" : "idle"}
          >
            {isTextMode ? (
              <IconClipboardText size={48} stroke={1.5} />
            ) : (
              <IconUpload size={48} stroke={1.5} />
            )}
          </UploadIcon>
          
          <Text fw={700} size="xl" mb="xs" ta="center" c="primary" style={{ fontSize: '22px' }}>
            {fileName ? `${fileName}` : isTextMode ? 'Paste Job Description' : 'Drop Job Description Here'}
          </Text>
          
          <Text size="sm" c="dimmed" ta="center" maw={400} mb={10}>
            {isTextMode 
              ? 'Type or paste the job description text below'
              : fileName 
                ? 'File ready for analysis. You can also paste text instead.' 
                : 'Drag & drop your file here or click to select files'}
          </Text>
          
          {!isTextMode && !fileName && (
            <FileTypesGroup>
              <FileTypeIndicator>
                <ColoredIcon bgColor="#FF5733">
                  <IconFile size={14} />
                </ColoredIcon>
                PDF
              </FileTypeIndicator>
              <FileTypeIndicator>
                <ColoredIcon bgColor="#4285F4">
                  <IconFileTypeDocx size={14} />
                </ColoredIcon>
                DOCX
              </FileTypeIndicator>
              <FileTypeIndicator>
                <ColoredIcon bgColor="#34A853">
                  <IconFileText size={14} />
                </ColoredIcon>
                TXT
              </FileTypeIndicator>
            </FileTypesGroup>
          )}
          
          <TextArea 
            className={isTextMode ? 'expanded' : ''} 
            placeholder="Paste your job description here (minimum 100 characters)..."
            onChange={handleTextChange}
            value={jobText}
            disabled={loading}
          />
        </StyledDropzone>
        
        <OrDividerStyled>
          <span>OR</span>
        </OrDividerStyled>
        
        <Box>
          <Text
            component="span"
            c="primary"
            size="sm"
            style={{ cursor: 'pointer', textDecoration: 'underline', display: 'flex', alignItems: 'center' }}
            onClick={toggleTextMode}
          >
            <ColoredIcon bgColor="#9C27B0">
              <IconClipboardText size={14} />
            </ColoredIcon>
            <Text fw={500}>{isTextMode ? 'Switch to file upload' : 'Paste text instead'}</Text>
          </Text>
        </Box>
        
        {/* Always show the analyze button, but disable it if we don't have enough text */}
        <AnalyzeButtonStyled 
          onClick={handleJobDescriptionSubmit}
          disabled={!canAnalyze}
          style={{ 
            opacity: canAnalyze ? 1 : 0.7,
            cursor: canAnalyze ? 'pointer' : 'not-allowed' 
          }}
        >
          {canAnalyze ? 'ANALYZE NOW' : `Enter at least 100 characters... (${jobText?.length || 0}/100)`}
        </AnalyzeButtonStyled>
        
        <ExportOptionsGroup>
          <ExportOptionStyled>
            <ColoredIcon bgColor="#E91E63">
              <IconPencil size={14} />
            </ColoredIcon>
            Cover Letter
          </ExportOptionStyled>
          <ExportOptionStyled>
            <ColoredIcon bgColor="#673AB7">
              <IconDeviceMobile size={14} />
            </ColoredIcon>
            Recruiter Pitch
          </ExportOptionStyled>
          <ExportOptionStyled>
            <ColoredIcon bgColor="#2196F3">
              <IconChartBar size={14} />
            </ColoredIcon>
            Skills Summary
          </ExportOptionStyled>
        </ExportOptionsGroup>
        
        {error && (
          <Text c="red" ta="center" mt={15}>
            Error: {error}
          </Text>
        )}
        
        <BenefitsGroup>
          <BenefitItem>
            <BenefitIconWrapper bgColor="#FF5722">
              <IconBolt size={20} />
            </BenefitIconWrapper>
            <Text size="xs" c="dimmed">Ultra-fast analysis</Text>
          </BenefitItem>
          <BenefitItem>
            <BenefitIconWrapper bgColor="#009688">
              <IconTarget size={20} />
            </BenefitIconWrapper>
            <Text size="xs" c="dimmed">Precision matching</Text>
          </BenefitItem>
          <BenefitItem>
            <BenefitIconWrapper bgColor="#3F51B5">
              <IconLock size={20} />
            </BenefitIconWrapper>
            <Text size="xs" c="dimmed">100% Secure</Text>
          </BenefitItem>
        </BenefitsGroup>
        
        <TestimonialText>
          "After interviewing candidates for seven years, I ran this job description through the analyzer and it confirmed Dave was the perfect choice. What an objective and completely unbiased tool!"
          <TestimonialAttribution>
            - CTO of Fortune 10 Tech Company
          </TestimonialAttribution>
        </TestimonialText>
      </Stack>
      
      <ResultModal
        isOpen={showResults}
        onClose={handleCloseResults}
        result={results}
        loading={loading}
        companyName={companyName}
      />
    </AnalyzerContainer>
  );
};

export default PerfectFitAnalyzer; 