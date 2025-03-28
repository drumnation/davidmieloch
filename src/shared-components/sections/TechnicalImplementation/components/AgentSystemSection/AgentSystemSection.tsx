import { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { MermaidDiagram } from '../../../../../shared-components/molecules/MermaidDiagram';
import { ContentBlock, DiagramContainer, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { AgentSystemSectionProps } from './AgentSystemSection.types';

const ChatContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: ${({ theme }) => theme.shadows.elevation2};
`;

const ChatMessage = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const AgentName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.5rem;
`;

const Message = styled(Typography)`
  white-space: pre-wrap;
`;

export const AgentSystemSection: FC<AgentSystemSectionProps> = ({
  className,
  agentSystem,
  agentSystemDiagram
}) => {
  return (
    <ContentBlock className={className}>
      <SectionTitle>{agentSystem.title}</SectionTitle>
      <Typography variant="body">
        {agentSystem.description}
      </Typography>

      <DiagramContainer>
        <MermaidDiagram definition={agentSystemDiagram} />
      </DiagramContainer>

      {agentSystem.examplePrompt && (
        <div>
          <SubsectionTitle>{agentSystem.examplePrompt.title}</SubsectionTitle>
          <Typography variant="body">
            {agentSystem.examplePrompt.description}
          </Typography>
          <ChatContainer>
            {agentSystem.examplePrompt.chat.map((message, index) => (
              <ChatMessage key={index}>
                <AgentName>{message.agent}</AgentName>
                <Message variant="body">{message.message}</Message>
              </ChatMessage>
            ))}
          </ChatContainer>
        </div>
      )}

      <SubsectionTitle>Real-World Example</SubsectionTitle>
      <Typography variant="body">
        When implementing a new feature, the system:
      </Typography>
      <ul>
        {agentSystem.realWorldExample.map((example, index) => (
          <li key={index}>
            <Typography variant="body">{example}</Typography>
          </li>
        ))}
      </ul>

      <SubsectionTitle>Benefits</SubsectionTitle>
      <ul>
        {agentSystem.benefits.map((benefit, index) => (
          <li key={index}>
            <Typography variant="body">{benefit}</Typography>
          </li>
        ))}
      </ul>
    </ContentBlock>
  );
};

export default AgentSystemSection; 