import type { Meta, StoryObj } from '@storybook/react';
import SystemOverview from './SystemOverview';

const meta: Meta<typeof SystemOverview> = {
  title: 'Pages/01-WhitePaper/04-TechnicalImplementation/01-SystemOverview',
  component: SystemOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 900,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SystemOverview>;

export const Default: Story = {
  args: {
    diagram: `graph TD
      %% Main System Node
      BG[Brain Garden System]
      
      %% Core Subsystems
      subgraph CoreSystems[Core Systems]
        KS[Knowledge System<br/>Document & Index]
        PS[Prompt System<br/>Action Templates]
        AS[Agent System<br/>AI Coordination]
        IS[Integration System<br/>External Tools]
        DS[Documentation System<br/>Structured Artifacts]
      end
      
      %% Main System to Core Systems
      BG --> KS
      BG --> PS
      BG --> AS
      BG --> IS
      BG --> DS
      
      %% Knowledge System Components
      subgraph KnowledgeSystem[Knowledge Management]
        KR[Knowledge Repository<br/>Store & version knowledge]
        KI[Knowledge Indexer<br/>Organize & search]
        KQ[Query Engine<br/>Retrieve & analyze]
        SJ[Skill-Jacks<br/>Specialized expertise]
      end
      
      %% Prompt System Components
      subgraph PromptSystem[Prompt Architecture]
        PT[Prompt Templates<br/>Reusable patterns]
        PO[Prompt Orchestration<br/>Sequence management]
        PC[Prompt Context<br/>Environment setup]
      end
      
      %% Agent System Components
      subgraph AgentSystem[Agent Orchestration]
        AM[Agent Manager<br/>Lifecycle & state]
        AC[Agent Coordinator<br/>Task distribution]
        AT[Agent Templates<br/>Role definitions]
      end
      
      %% Integration System Components
      subgraph IntegrationSystem[External Integration]
        GI[Git Integration<br/>Version control]
        CI[CI/CD Integration<br/>Deployment]
        IDE[IDE Integration<br/>Development]
      end
      
      %% Documentation System Components
      subgraph DocSystem[Documentation Structure]
        DF[Directory Framework<br/>.brain organization]
        DT[Document Templates<br/>Standardized formats]
        DH[Document Hierarchy<br/>MECE organization]
      end
      
      %% CLI Tools
      subgraph CLITools[CLI Tools]
        CLI[brain-garden CLI]
        INIT[init - Create Structure]
        GEN[generate - Create Files]
        SYNC[sync - Update from GitHub]
      end
      
      %% Force Multipliers
      subgraph ForceMultipliers[Force Multipliers]
        FM1[Documentation<br/>as accelerator]
        FM2[Testing<br/>rapid feedback loops]
        FM3[Git Integration<br/>knowledge amplifier]
      end
      
      %% Connect subsystems to their components
      KS --> KR & KI & KQ & SJ
      PS --> PT & PO & PC
      AS --> AM & AC & AT
      IS --> GI & CI & IDE
      DS --> DF & DT & DH
      
      %% Connect CLI to relevant systems
      CLI --> INIT & GEN & SYNC
      INIT --> DS
      GEN --> PS
      SYNC --> IS
      
      %% Connect Force Multipliers
      FM1 --> DS
      FM2 --> AS
      FM3 --> IS
      
      %% Style definitions
      classDef default fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px,color:#333,font-size:14px
      classDef mainSystem fill:#4a6bff,stroke:#2952ff,stroke-width:3px,color:#fff,font-size:18px,font-weight:bold
      classDef coreSystem fill:#9c6ade,stroke:#8a5acc,stroke-width:2px,color:#fff,font-size:16px,font-weight:bold
      classDef component fill:#47b881,stroke:#339966,stroke-width:2px,color:#fff,font-size:14px
      classDef tool fill:#ec4c47,stroke:#d9363e,stroke-width:2px,color:#fff,font-size:14px
      classDef multiplier fill:#f7b955,stroke:#f5a623,stroke-width:2px,color:#333,font-size:14px
      classDef subgraph fill:#f8f9fa,stroke:#dee2e6,stroke-width:2px,color:#333,font-size:12px
      
      %% Apply styles
      class BG mainSystem
      class KS,PS,AS,IS,DS coreSystem
      class KR,KI,KQ,SJ,PT,PO,PC,AM,AC,AT,GI,CI,IDE,DF,DT,DH component
      class CLI,INIT,GEN,SYNC tool
      class FM1,FM2,FM3 multiplier
      class CoreSystems,KnowledgeSystem,PromptSystem,AgentSystem,IntegrationSystem,DocSystem,CLITools,ForceMultipliers subgraph
      
      %% Legend
      subgraph Legend[System Legend]
        L1[Main System]
        L2[Core Subsystem]
        L3[Component]
        L4[CLI Tool]
        L5[Force Multiplier]
      end
      
      class L1 mainSystem
      class L2 coreSystem
      class L3 component
      class L4 tool
      class L5 multiplier`,
    introduction: "The Brain Garden System architecture integrates multiple subsystems designed to enhance AI development workflows. This comprehensive view illustrates how knowledge management, prompting, documentation, and agent coordination work together to create a cohesive ecosystem that amplifies development capabilities."
  },
  parameters: {
    chromatic: { delay: 500 },
  },
};