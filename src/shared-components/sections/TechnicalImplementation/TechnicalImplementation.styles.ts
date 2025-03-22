import styled from 'styled-components';

// Define consistent spacing variables that can be reused across components
export const SPACING = {
  section: '5rem',
  paragraph: '2rem',
  paragraphBreak: '2.5rem',
  element: '1.5rem',
  container: '2rem',
  
  // Responsive spacing for mobile
  mobile: {
    section: '3rem',
    paragraph: '1.5rem',
    paragraphBreak: '2rem',
    element: '1rem',
    container: '1.25rem'
  }
};

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionContent = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto ${SPACING.section};
  padding: 0 ${SPACING.container};
  
  @media (max-width: 576px) {
    margin-bottom: calc(${SPACING.section} * 0.75);
    padding: 0 ${SPACING.container};
  }
`;

export const DiagramContainer = styled.div`
  margin: 3rem auto;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.paper};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.elevation1};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentBlock = styled.div`
  margin: 3rem 0;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${SPACING.paragraph};
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 576px) {
    font-size: 1.75rem;
  }
`;

export const SubsectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: 576px) {
    font-size: 1.25rem;
  }
`;

export const SystemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SystemCard = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;