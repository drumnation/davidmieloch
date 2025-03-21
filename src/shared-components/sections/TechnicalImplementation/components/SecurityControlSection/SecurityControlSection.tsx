import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { ContentBlock, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { SecurityControlSectionProps } from './SecurityControlSection.types';

const CodeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: ${({ theme }) => theme.shadows.elevation2};
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.background.dark};
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 1rem;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 1rem 0;
`;

export const SecurityControlSection: FC<SecurityControlSectionProps> = ({
  className,
  securityControl
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{securityControl.title}</SectionTitle>
      <Typography variant="body">
        {securityControl.description}
      </Typography>

      <SubsectionTitle>Access Control</SubsectionTitle>
      <ul>
        {securityControl.accessControl.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>Knowledge Protection</SubsectionTitle>
      <ul>
        {securityControl.knowledgeProtection.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>Integration Security</SubsectionTitle>
      <ul>
        {securityControl.integrationSecurity.map((item, index) => (
          <li key={index}>
            <Typography variant="body">{item}</Typography>
          </li>
        ))}
      </ul>

      {securityControl.testingExample && (
        <div>
          <SubsectionTitle>{securityControl.testingExample.title}</SubsectionTitle>
          <Typography variant="body">
            {securityControl.testingExample.description}
          </Typography>
          <CodeContainer>
            <CodeBlock>{securityControl.testingExample.code}</CodeBlock>
          </CodeContainer>
        </div>
      )}
    </ContentBlock>
  );
};

export default SecurityControlSection;
