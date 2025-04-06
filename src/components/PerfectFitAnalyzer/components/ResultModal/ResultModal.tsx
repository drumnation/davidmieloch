'use client';

import React, { useState, useCallback } from 'react';
import { 
  Modal, 
  Tabs, 
  Button, 
  Text, 
  useMantineTheme, 
  Paper, 
  Box,
  Stack,
  Divider,
  Group,
  ActionIcon,
  Progress,
  Badge
} from '@mantine/core';
import { useViewportSize, useClipboard, useHover } from '@mantine/hooks';
import { 
  IconCheck, 
  IconMail, 
  IconFileText, 
  IconDownload, 
  IconInfoCircle,
  IconCopy,
  IconShare,
  IconStar,
  IconArrowRight,
  IconBulb,
  IconTrophy,
  IconThumbUp,
  IconTarget,
  IconCheckbox,
  IconDeviceAnalytics,
  IconX
} from '@tabler/icons-react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import html2pdf from 'html2pdf.js';
import { MarkdownRenderer } from '../../../../shared-components/molecules/MarkdownRenderer';

// Define component props
export interface AnalysisResult {
  summary: string;
  coverLetter: string;
  recruiterPitch: string;
}

export interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult | null;
  loading?: boolean;
  companyName?: string;
  className?: string;
}

// Styled components for text display and layout
const ModalHeader = styled.div`
  background-color: var(--mantine-color-blue-6);
  height: 64px; /* Adjusted height */
  padding: 0 1.75rem;
  border-bottom: 1px solid var(--mantine-color-blue-7);
  margin: 0;
  margin-bottom: 1rem;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
  top: -1.5rem;
  left: -1.5rem;
  width: calc(100% + 3rem);
`;

const HeaderText = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  letter-spacing: 0.01em;
  padding: 0;
`;

const TabsContainer = styled.div`
  margin-bottom: 1rem;
`;

const ContentWrapper = styled.div`
  padding: 1.5rem;
  margin-top: 0.75rem;
  white-space: pre-line;
  line-height: 1.6;
  border: 1px solid var(--mantine-color-gray-3);
  border-radius: var(--mantine-radius-md);
  background-color: var(--mantine-color-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ResultContent = styled(motion.div)`
  max-height: 49vh;
  overflow-y: auto;
  padding-right: 16px;
  padding-left: 4px;
`;

const MatchScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.75rem 0;
  padding: 0.75rem;
  background-color: var(--mantine-color-blue-0);
  border-radius: 8px;
`;

const DisclaimerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background-color: var(--mantine-color-gray-0);
  border-radius: 6px;
  font-size: 0.8rem;
`;

const ActionButtonHover = styled(motion.div)`
  transition: all 0.2s ease;
`;

// Animation variants
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const buttonHoverVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

/**
 * ResultModal component for displaying analysis results in a tabbed interface
 * Mobile-first design with responsive adaptations for desktop
 */
export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  result,
  loading = false,
  companyName,
  className,
}) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const isMobile = width < parseInt(theme.breakpoints.sm);
  const [activeTab, setActiveTab] = useState<string | null>('summary');
  const [pdfExporting, setPdfExporting] = useState(false);
  const clipboard = useClipboard();
  
  // Mock match score for demonstration
  const matchScore = 92;

  // Get the current tab content
  const getCurrentContent = useCallback(() => {
    if (!result) return '';
    
    switch (activeTab) {
      case 'summary':
        return result.summary;
      case 'coverLetter':
        return result.coverLetter;
      case 'recruiterPitch':
        return result.recruiterPitch;
      default:
        return result.summary;
    }
  }, [activeTab, result]);

  // Get the current tab title
  const getCurrentTitle = useCallback(() => {
    switch (activeTab) {
      case 'summary':
        return 'Perfect Fit Analysis';
      case 'coverLetter':
        return `Cover Letter${companyName ? ` for ${companyName}` : ''}`;
      case 'recruiterPitch':
        return 'Recruiter Pitch';
      default:
        return 'Analysis';
    }
  }, [activeTab, companyName]);

  // Copy current content to clipboard
  const handleCopyToClipboard = useCallback(() => {
    clipboard.copy(getCurrentContent());
  }, [clipboard, getCurrentContent]);

  // Handle PDF export
  const handleExportPDF = useCallback(async () => {
    if (!result) return;
    
    try {
      setPdfExporting(true);
      
      // Create content for PDF
      const contentElement = document.createElement('div');
      contentElement.style.padding = '20px';
      contentElement.style.fontFamily = 'Arial, sans-serif';
      contentElement.style.lineHeight = '1.6';
      
      // Add title
      const titleElement = document.createElement('h1');
      titleElement.textContent = getCurrentTitle();
      titleElement.style.marginBottom = '20px';
      titleElement.style.color = '#1c7ed6';
      contentElement.appendChild(titleElement);
      
      // Add main content
      const contentTextElement = document.createElement('div');
      contentTextElement.style.whiteSpace = 'pre-line';
      contentTextElement.textContent = getCurrentContent();
      contentElement.appendChild(contentTextElement);
      
      // Add footer
      const footerElement = document.createElement('div');
      footerElement.style.marginTop = '30px';
      footerElement.style.fontSize = '12px';
      footerElement.style.color = '#868e96';
      footerElement.textContent = "Generated by David Mieloch's Perfect Fit Analyzer";
      contentElement.appendChild(footerElement);
      
      // PDF options
      const options = {
        margin: [15, 15] as [number, number],
        filename: `${activeTab === 'coverLetter' ? 'cover-letter' : 
                   activeTab === 'recruiterPitch' ? 'recruiter-pitch' : 
                   'job-fit-analysis'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { 
          unit: 'mm' as 'mm' | 'cm' | 'in' | 'pt' | 'px', 
          format: 'a4' as string, 
          orientation: 'portrait' as 'portrait' | 'landscape'
        }
      };
      
      // Generate and download PDF
      await html2pdf().from(contentElement).set(options).save();
      
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setPdfExporting(false);
    }
  }, [activeTab, companyName, getCurrentContent, getCurrentTitle, result]);

  // Create hover state for buttons
  const { hovered: exportHovered, ref: exportRef } = useHover();
  const { hovered: copyHovered, ref: copyRef } = useHover();
  const { hovered: shareHovered, ref: shareRef } = useHover();

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={onClose}
        title={<></>} // Empty title, we'll use our custom header
        size={isMobile ? "100%" : "xl"}
        fullScreen={isMobile}
        radius="lg"
        padding={0} // Reset padding
        withCloseButton={false} // Disable default close button
        styles={{
          body: {
            padding: 0, // Reset padding
          },
          inner: {
            padding: theme.spacing.sm,
          },
          content: {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            borderRadius: '12px',
            overflow: 'hidden', // Prevent content from overflowing rounded corners
          },
          header: {
            // Hide the default header completely
            display: 'none',
            padding: 0,
            margin: 0,
            height: 0
          }
        }}
        className={className}
      >
        <ModalHeader>
          <HeaderText>Analysis Results</HeaderText>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '40px',
              width: '40px'
            }}
          >
            <ActionIcon 
              onClick={onClose} 
              variant="transparent" 
              c="white" 
              aria-label="Close modal"
              size={40}
              radius="xl"
              styles={{
                root: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }
              }}
            >
              <IconX size={22} />
            </ActionIcon>
          </Box>
        </ModalHeader>
        
        <Box p="md" pt={0}> {/* Adjust padding to account for header margin */}
          {loading ? (
            <Box py="xl">
              <Text ta="center" mb="md">Generating your analysis...</Text>
              <Progress value={65} size="md" striped animated my="md" />
              <Text size="sm" c="dimmed" ta="center">
                Analyzing your perfect fit for this role
              </Text>
            </Box>
          ) : result ? (
            <>
              <TabsContainer>
                <Tabs
                  value={activeTab}
                  onChange={setActiveTab}
                  variant="outline"
                  radius="md"
                  styles={{
                    tabLabel: {
                      fontWeight: 600,
                    },
                    tab: {
                      transition: 'all 0.2s ease',
                      '&[data-active]': {
                        borderBottom: `3px solid ${theme.colors.blue[6]}`,
                      },
                      '&:hover': {
                        backgroundColor: theme.colors.gray[0],
                      }
                    }
                  }}
                >
                  <Tabs.List grow>
                    <Tabs.Tab 
                      value="summary" 
                      leftSection={<IconDeviceAnalytics size={18} />}
                    >
                      Summary
                    </Tabs.Tab>
                    <Tabs.Tab 
                      value="coverLetter" 
                      leftSection={<IconMail size={18} />}
                    >
                      Cover Letter
                    </Tabs.Tab>
                    <Tabs.Tab 
                      value="recruiterPitch" 
                      leftSection={<IconFileText size={18} />}
                    >
                      Recruiter Pitch
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs>
              </TabsContainer>

              {activeTab === 'summary' && (
                <MatchScore>
                  <Badge
                    size="xl" 
                    color="blue" 
                    variant="light"
                    radius="sm"
                    styles={{
                      root: {
                        padding: '0.5rem 1rem',
                      }
                    }}
                  >
                    <Group gap={8}>
                      <IconTarget size={20} />
                      <Text fw={700} size="md">{matchScore}% Match with Job Requirements</Text>
                    </Group>
                  </Badge>
                  <Text size="sm" mt={8} c="dimmed">Based on skills and experience alignment</Text>
                </MatchScore>
              )}

              <ContentWrapper>
                <AnimatePresence mode="wait">
                  <ResultContent
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key={activeTab} // This forces re-animation when tab changes
                  >
                    <MarkdownRenderer content={getCurrentContent()} compact={true} />
                  </ResultContent>
                </AnimatePresence>
              </ContentWrapper>

              <Group justify="apart" mt="sm" mb="md">
                <Group>
                  <ActionButtonHover 
                    ref={copyRef}
                    variants={buttonHoverVariants}
                    initial="initial"
                    animate={copyHovered ? "hover" : "initial"}
                  >
                    <Button
                      leftSection={<IconCopy size={16} />}
                      variant="light"
                      onClick={handleCopyToClipboard}
                      color={clipboard.copied ? "green" : "blue"}
                    >
                      {clipboard.copied ? "Copied!" : "Copy to Clipboard"}
                    </Button>
                  </ActionButtonHover>

                  <ActionButtonHover 
                    ref={shareRef}
                    variants={buttonHoverVariants}
                    initial="initial"
                    animate={shareHovered ? "hover" : "initial"}
                  >
                    <Button
                      leftSection={<IconShare size={16} />}
                      variant="subtle"
                    >
                      Share
                    </Button>
                  </ActionButtonHover>
                </Group>

                <ActionButtonHover 
                  ref={exportRef}
                  variants={buttonHoverVariants}
                  initial="initial"
                  animate={exportHovered ? "hover" : "initial"}
                >
                  <Button
                    leftSection={<IconDownload size={16} />}
                    onClick={handleExportPDF}
                    loading={pdfExporting}
                  >
                    Export as PDF
                  </Button>
                </ActionButtonHover>
              </Group>

              <DisclaimerWrapper>
                <Box style={{ flexShrink: 0, marginTop: '2px' }}>
                  <IconInfoCircle size={16} color={theme.colors.blue[6]} />
                </Box>
                <Text c="dimmed" size="xs" lh={1.3}>
                  This AI-powered analysis was created by David Mieloch to showcase his qualifications for your job opening. 
                  While designed to highlight his relevant skills and experience, all information is factual and verifiable.
                </Text>
              </DisclaimerWrapper>
            </>
          ) : (
            <Text ta="center" my="xl">
              No analysis results available.
            </Text>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ResultModal; 