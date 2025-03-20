export interface ChatMessage {
  agent: string;
  message: string;
}

export interface ExamplePrompt {
  title: string;
  description: string;
  chat: ChatMessage[];
}

export interface AgentSystemSectionProps {
  className?: string;
  agentSystem: {
    title: string;
    description: string;
    realWorldExample: string[];
    benefits: string[];
    examplePrompt?: ExamplePrompt;
  };
  agentSystemDiagram: string;
} 