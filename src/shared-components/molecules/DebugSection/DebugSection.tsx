import React from 'react';
import styled from 'styled-components';

interface DebugSectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionContainer = styled.section`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
`;

const SectionContent = styled.div`
  position: relative;
`;

export const DebugSection: React.FC<DebugSectionProps> = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  );
}; 