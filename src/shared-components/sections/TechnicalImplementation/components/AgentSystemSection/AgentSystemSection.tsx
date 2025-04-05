import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../../../shared-components/atoms/Typography';
import { AgentSystemDiagram } from '../../../../../components/diagrams/AgentSystemDiagram/AgentSystemDiagram';
import { DiagramClientWrapper } from '../../../../../components/diagrams/_wrappers/DiagramClientWrapper';
import { ContentBlock, DiagramContainer, SectionTitle, SubsectionTitle } from '../../TechnicalImplementation.styles';
import { AgentSystemSectionProps } from './AgentSystemSection.types';

const ChatContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 8px;
`;

const ChatMessage = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const AgentName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.primary.main};
`;

const Message = styled(Typography)`
  margin-left: 1rem;
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
        <AgentSystemDiagram
          title=""
          theme="default"
          width="100%"
          height="400px"
          showZoomControls={false}
          accessibilityDescription="Agent System Diagram illustrating the interactions between the System Observer, Policy Agent, and Action Agent in the automated AI workflow"
        />
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