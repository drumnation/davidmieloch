import React from 'react';
import { FeatureGrid } from '../../../../organisms/FeatureGrid/FeatureGrid';
import { ForceMultipliersSectionProps } from './ForceMultipliersSection.types';
import { Icon } from '../../../../atoms/Icon/Icon';
import { MermaidDiagram } from '../../../../molecules/MermaidDiagram';
import {
  GradientText,
  ImpactMetric,
  BeforeAfter,
  PowerfulTitle,
  MetricsContainer
} from '../../BrainGardenOverview.styles';
import { 
  ForceMultiplierContainer as StyledForceMultiplierContainer,
  BodyText,
  StoryBox,
  ActTitle,
  DiagramContainer,
  Comment,
  GitFeatureReconstruction,
  GitCommand,
  CommandHighlight,
  GitOutput,
  InsightBox,
  InsightTitle,
  GitPRSplitter,
  PRBranch,
  BranchIcon,
  DependencyArrow,
  DocsFeatReconstruction,
  TerminalBlock,
  Command,
  R,
  ChatContainer,
  ChatMessage,
  Avatar,
  MessageContent,
  SpeakerName,
  MessageBubble
} from './ForceMultipliersSection.styles';

export const ForceMultipliersSection: React.FC<ForceMultipliersSectionProps> = ({
  className,
  forceMultipliersProps
}) => {
  const impactMetrics = [
    { number: '10x', label: 'Faster Development' },
    { number: '80%', label: 'Less Manual Work' },
    { number: '95%', label: 'Error Reduction' }
  ];

  return (
    <StyledForceMultiplierContainer className={className} id="force-multipliers-section">
      <div>
        <PowerfulTitle>
          <Icon name="bolt" source="tabler" size={32} />
          <GradientText>Force Multipliers</GradientText>
        </PowerfulTitle>

        {/* Act 1: The Developer&apos;s Dilemma */}
        <ActTitle>Act 1: The Developer&apos;s Dilemma</ActTitle>
        <StoryBox>
          <BodyText variant="body">
            Picture a developer, staring at their screen as the deadline looms. They&apos;ve just finished a complex feature, and now face a familiar dilemma: write comprehensive tests or move on to the next task. They know - they absolutely know - that skipping tests will come back to haunt them. When a new feature intersects with this one in a few months, something will break, and they&apos;ll spend hours tracking down what went wrong.
          </BodyText>
          
          <BodyText variant="body">
            But the boss never sees the tests, only the feature. These invisible guardians of code quality, while critically important, are rarely valued by anyone but the developers themselves. And because of this eternal conflict, developers remain perpetually inexperienced at writing tests. It&apos;s a vicious cycle - being slow at writing tests means there&apos;s never enough time to write them properly, which means you never get faster at writing them.
          </BodyText>

          <BodyText variant="body">
            The same story plays out with commit messages. Every team has standards - these messages are crucial for code reviews and help teammates understand changes quickly. But as the day winds down, after hours of tracing bugs or wrestling with a particularly thorny feature, the developer&apos;s mental energy is spent. That carefully crafted commit message becomes a tired &quot;fixed bug&quot; - there&apos;s simply nothing left in the tank for proper documentation.
          </BodyText>

          <BodyText variant="body">
            And documentation? Who has time to break down everything that was built, update the changelog, revise the central README, or create that special markdown file explaining exactly how the new feature works? Even if you did invest that time, how long until those docs become outdated and useless?
          </BodyText>

          <BodyText variant="body">
            This was life before generative AI and autonomous agents. A constant battle between doing things right and doing things fast - with &quot;fast&quot; winning far too often.
          </BodyText>
        </StoryBox>

        {/* Act 2: The AI Revolution */}
        <ActTitle>Act 2: The AI Revolution</ActTitle>
        <StoryBox>
          <BodyText variant="body">
            When AI first entered the development workflow, it seemed like a helpful assistant - someone to pair program with, to catch errors, to suggest improvements. But something more profound was happening: AI was transforming those time-consuming best practices into something effortless.
          </BodyText>

          <MetricsContainer>
            {impactMetrics.map((metric, index) => (
              <ImpactMetric key={index}>
                <span className="number">{metric.number}</span>
                <span className="label">{metric.label}</span>
              </ImpactMetric>
            ))}
          </MetricsContainer>

          <BodyText variant="body">
            Suddenly, writing tests wasn&apos;t a chore - AI could analyze your code and generate comprehensive test suites in seconds. Those detailed commit messages? AI could examine your changes and craft perfect descriptions that future teammates would thank you for. Documentation stayed current because AI could update it automatically with each significant change.
          </BodyText>

          <BodyText variant="body">
            The economics had completely inverted. It now took more effort NOT to follow best practices. Why write &quot;fixed bug&quot; when AI could instantly generate a detailed commit message explaining exactly what was fixed and how? Why skip tests when AI could write them faster than you could decide to skip them?
          </BodyText>
        </StoryBox>

        {/* Act 3: The Force Multiplier Effect */}
        <ActTitle>Act 3: The Force Multiplier Effect</ActTitle>
        <StoryBox>
          <BodyText variant="body">
            But here&apos;s where it gets truly revolutionary. These best practices - the tests, the commit messages, the documentation - they&apos;re not just nice to have anymore. They&apos;ve become force multipliers that enable AI agents to perform tasks that would have seemed like science fiction just a few years ago.
          </BodyText>

          <strong style={{ display: 'block', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.2rem', color: '#6772e5' }}>Autonomous Testing Magic</strong>
          <BodyText variant="body">
            Imagine making a change and having several tests fail. Instead of diving into debugging, you grab a coffee. Why? Because the AI agent can work autonomously while you take a break:
          </BodyText>
          <DiagramContainer>
            <MermaidDiagram
              definition={`
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
      'primaryColor': '#6772e5',
      'primaryTextColor': '#FFFFFF',
      'primaryBorderColor': '#6772e5',
      'lineColor': '#000000',
      'secondaryColor': '#6772e5',
      'tertiaryColor': '#6772e5',
      'noteBkgColor': '#FFE17E',
      'noteTextColor': '#1F2937',
      'noteBorderColor': '#FFD700',
      'textColor': '#1F2937',
      'fontSize': '16px',
      'fontFamily': 'Inter, sans-serif',
      'mainBkg': '#6772e5',
      'errorTextColor': '#FF0000',
      'errorBkgColor': '#FFEBEE',
      'nodeBorder': '#000000',
      'clusterBorder': '#000000',
      'edgeLabelBackground': '#FFFFFF',
      'activationBorderColor': '#000000',
      'activationBkgColor': '#F4F4F4',
      'sequenceNumberColor': '#000000',
      'actorBorder': '#000000',
      'actorBkg': '#6772e5',
      'labelBoxBorderColor': '#000000',
      'loopTextColor': '#000000'
    }
  }
}%%
sequenceDiagram
    participant Dev as Developer
    participant AI as AI Agent
    participant Tests as Test Suite
    
    Dev->>AI: Encounters failing test
    Note over Dev: Goes for coffee ☕
    
    rect rgb(103, 114, 229)
      Note right of AI: Attempt 1
      AI->>Tests: npm test auth.spec.ts
      Tests-->>AI: ❌ Token validation failed
      AI->>AI: Analyzes error & updates code
    end

    rect rgb(103, 114, 229)
      Note right of AI: Attempt 2
      AI->>Tests: npm test auth.spec.ts
      Tests-->>AI: ❌ Refresh token expired
      AI->>AI: Implements retry mechanism
    end

    rect rgb(103, 114, 229)
      Note right of AI: Attempt 3
      AI->>Tests: npm test auth.spec.ts
      Tests-->>AI: ❌ Edge case uncovered
      AI->>AI: Deep code examination
    end

    rect rgb(103, 114, 229)
      Note right of AI: Attempt 4
      AI->>Tests: npm test auth.spec.ts
      Tests-->>AI: ✅ All tests passing
    end
    
    AI-->>Dev: Fixed all failing tests
    Note over Dev: Returns to perfect code
`}
            />
          </DiagramContainer>
          
          <BodyText variant="body">
            Now think about this: that AI agent didn&apos;t just solve those failing tests through trial and error. It relied on existing tests to understand the expected behavior. It used commit messages to understand the history of the problematic code - why particular decisions were made. It drew from documentation to grasp the intended architecture.
          </BodyText>
            
          <GitFeatureReconstruction>
            <Comment>// Step 1: Extract the history of a removed feature</Comment>
            <GitCommand><CommandHighlight>git log -p --all -S &apos;userPreferences&apos;</CommandHighlight> &gt; feature_history.txt</GitCommand>
            <GitOutput>{`Finding commits that modified &apos;userPreferences&apos;... Extracted 7 commits from the past 5 months.`}</GitOutput>
            
            <Comment>// Step 2: AI analyzes the feature&apos;s evolution</Comment>
            <GitOutput>{`✓ Initial implementation: March 15
✓ Added new settings: April 2
✓ Refactored to use new API: April 28
✓ Fixed accessibility issues: May 10
✓ Removed during codebase cleanup: June 3`}</GitOutput>
          </GitFeatureReconstruction>
          
          <InsightBox>
            <InsightTitle>Why This Matters</InsightTitle>
            <p>With this detailed evolution history automatically extracted and analyzed, the AI can now reconstruct the feature exactly as it was before removal, complete with all subsequent improvements and refactoring. Without well-structured commit messages and coherent commit history, this would be virtually impossible.</p>
          </InsightBox>
          
          <BodyText variant="body">
            Or consider a massive feature that needs to be broken down into multiple PRs. Good luck doing that manually with a huge PR that touches hundreds of files. But with good documentation and commit messages? AI can analyze dependency chains, identify logical groupings, and auto-create perfectly structured, sequenced PRs:
          </BodyText>
          
          <GitPRSplitter>
            <Comment>// Step 1: Extract changes for analysis</Comment>
            <GitCommand><CommandHighlight>git log --patch</CommandHighlight> &gt; changes.patch</GitCommand>
            <GitOutput>{`Extracting commit history with changes...`}</GitOutput>
            
            <Comment>// Step 2: AI analyzes the changes to determine logical groupings</Comment>
            <GitCommand><CommandHighlight>analyze_changes</CommandHighlight> changes.patch</GitCommand>
            <GitOutput>{`Analyzing 230+ files changed in PR #1458...
✓ Identified 3 main components in the changes:
  - Authentication system refactoring (34 files)
  - Database schema migrations (87 files)
  - UI component library updates (109 files)

✓ Dependencies detected:
  - Database changes depend on authentication
  - UI changes depend on both database and authentication`}</GitOutput>
            
            <Comment>// Step 3: AI creates separate branches with logical commits</Comment>
            <GitCommand><CommandHighlight>git checkout -b</CommandHighlight> part1-authentication</GitCommand>
            <GitOutput>{`Created branch 'part1-authentication'`}</GitOutput>
            
            <PRBranch><BranchIcon>⎇</BranchIcon> part1-authentication: <span style={{color: "#F472B6"}}>Authentication core refactoring</span></PRBranch>
            <DependencyArrow>Required for database and UI changes</DependencyArrow>
            
            <GitCommand><CommandHighlight>git checkout -b</CommandHighlight> part2-database</GitCommand>
            <GitOutput>{`Created branch 'part2-database'`}</GitOutput>
            
            <PRBranch><BranchIcon>⎇</BranchIcon> part2-database: <span style={{color: "#F472B6"}}>Schema migrations and ORM updates</span></PRBranch>
            <DependencyArrow>Required for UI changes</DependencyArrow>
            
            <GitCommand><CommandHighlight>git checkout -b</CommandHighlight> part3-ui</GitCommand>
            <GitOutput>{`Created branch 'part3-ui'`}</GitOutput>
            
            <PRBranch><BranchIcon>⎇</BranchIcon> part3-ui: <span style={{color: "#F472B6"}}>Component library and page updates</span></PRBranch>
            
            <Comment>// Step 4: AI creates structured PRs with dependency information</Comment>
            <GitCommand><CommandHighlight>create_pull_requests</CommandHighlight> --sequence</GitCommand>
            <GitOutput>{`Creating sequential pull requests...
✓ Created PR #1459: Authentication System Refactoring
✓ Created PR #1460: Database Schema Migrations (depends on #1459)
✓ Created PR #1461: UI Component Updates (depends on #1460)

All PRs include automated documentation of changes, test results, and dependency notes.`}</GitOutput>
          </GitPRSplitter>
          
          <InsightBox>
            <InsightTitle>Why This Matters</InsightTitle>
            <p>Breaking down massive PRs is a time-consuming, error-prone process. With AI leveraging good commit history and clear code organization, this becomes an automated task that produces perfectly structured, reviewable changes. Thorough test coverage allows the AI to validate each PR individually, ensuring they can be merged sequentially without breaking functionality.</p>
          </InsightBox>

          <BodyText variant="body">
            What about documentation automation? Here the AI leverages your existing documentation standards and codebase patterns to automatically detect when new features are implemented but not documented. It can then create comprehensive docs that adhere to your team&apos;s conventions, complete with examples:
          </BodyText>

          <DocsFeatReconstruction>
            <Comment>// Step 1: Detect new feature implementation in codebase</Comment>
            <GitCommand><CommandHighlight>git log --since="2 weeks ago" --name-only --grep="QuickShare"</CommandHighlight></GitCommand>
            <GitOutput>{`Detected new feature: "Quick Share" implementation in:
/src/features/sharing/QuickShare.tsx
/src/features/sharing/hooks/useQuickShare.ts
/src/features/sharing/api/quickShareApi.ts`}</GitOutput>
            
            <Comment>// Step 2: Check documentation status</Comment>
            <GitCommand><CommandHighlight>check_docs_status</CommandHighlight> "Quick Share"</GitCommand>
            <GitOutput>{`Documentation check results:
✓ API documentation: Present (85% coverage)
✗ Usage examples: Missing
✗ Integration guide: Missing
✗ Feature documentation: Missing`}</GitOutput>
            
            <Comment>// Step 3: AI follows documentation checklist</Comment>
            <GitCommand><CommandHighlight>generate_docs</CommandHighlight> --feature "Quick Share" --complete</GitCommand>
            <GitOutput>{`Generating missing documentation...
Analyzing code to extract usage patterns...
Creating examples based on implementation...
Ensuring consistency with existing documentation...

✓ Created documentation files:
✓ docs/features/sharing/quick-share.md
✓ docs/api/sharing/quick-share-api.md
✓ docs/examples/sharing/quick-share-examples.md
✓ docs/integration/quick-share-integration.md`}</GitOutput>
            
            <Comment>// Step 4: AI creates documentation PR</Comment>
            <GitCommand><CommandHighlight>git checkout -b</CommandHighlight> docs/quick-share-feature</GitCommand>
            <GitOutput>{`Created branch 'docs/quick-share-feature'`}</GitOutput>
            
            <GitCommand><CommandHighlight>git add</CommandHighlight> docs/</GitCommand>
            <GitCommand><CommandHighlight>git commit -m</CommandHighlight> "Add comprehensive documentation for Quick Share feature"</GitCommand>
            <GitOutput>{`[docs/quick-share-feature a8e29a5] Add comprehensive documentation for Quick Share feature
4 files changed, 425 insertions(+)`}</GitOutput>
            
            <GitCommand><CommandHighlight>git push origin</CommandHighlight> docs/quick-share-feature</GitCommand>
            <GitOutput>{`Branch 'docs/quick-share-feature' set up to track remote branch 'docs/quick-share-feature' from 'origin'.
To github.com:company/repo.git
  0000000..a8e29a5  docs/quick-share-feature -> docs/quick-share-feature`}</GitOutput>
            
            <GitCommand><CommandHighlight>create_pull_request</CommandHighlight> --branch docs/quick-share-feature</GitCommand>
            <GitOutput>{`Created PR #2134: "Documentation: Complete Quick Share feature docs"
Added Reviewers: @tech-writers, @feature-owners
Added Labels: documentation, automated`}</GitOutput>
          </DocsFeatReconstruction>

          <InsightBox>
            <InsightTitle>Why This Matters</InsightTitle>
            <p>Documentation is crucial but often neglected. This AI automation ensures documentation always stays in sync with code by detecting gaps and filling them. The system can track documentation coverage just like test coverage, enforcing documentation quality standards.</p>
            <p style={{ marginTop: '0.5rem' }}>This systematic approach ensures documentation never becomes outdated or forgotten. Just as code tests provide guardrails for implementation, this documentation system creates guardrails for knowledge management across the entire codebase.</p>
          </InsightBox>
        </StoryBox>

        {/* The New Reality */}
        <StoryBox>
          <BodyText variant="body">
            This is the new reality of developing software with AI and agent technology, aided by the Brain Garden system which ensures all the force multipliers are in place so your team squeezes every ounce of exponential productivity out of the process. Those best practices that developers always wanted to follow but couldn't find time for? They're now effortless to maintain. And those same practices have become the foundation that enables AI to perform increasingly powerful automated tasks.
          </BodyText>
          <BodyText variant="body">
            The vicious cycle has become a virtuous one: Better documentation and tests make AI more capable, which in turn makes it easier to maintain high standards, which makes AI even more powerful. It's a complete transformation of how we develop software.
          </BodyText>
        </StoryBox>

        {/* Feature Grid showing the transformation */}
        <FeatureGrid 
          features={forceMultipliersProps.features}
          layout="row"
          renderFeatureContent={(feature) => (
            <>
              <BeforeAfter>
                <div className="before">
                  <h4>Before</h4>
                  <p>{feature.beforeState}</p>
                </div>
                <div className="after">
                  <h4>After</h4>
                  <p>{feature.afterState}</p>
                </div>
              </BeforeAfter>
            </>
          )}
        />
        
        {/* The Dark Side: AI Without Structure */}
        <ActTitle>The Dark Side: AI Without Structure</ActTitle>
        <StoryBox>
          <BodyText variant="body">
            While the Brain Garden System creates a virtuous cycle of productivity and quality, many development teams experience the opposite: a chaotic first encounter with AI tools that leads to frustration, disappointment, and sometimes outright rejection of the technology.
          </BodyText>
          
          <BodyText variant="body">
            Meet Sarah, an experienced senior developer who's skeptical but open-minded about AI. Her CTO just purchased licenses for an AI coding assistant for the entire team, with enthusiastic promises of "10x productivity" and expectations of immediate ROI.
          </BodyText>
          
          <strong style={{ display: 'block', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.2rem', color: '#E34935' }}>Day 1: Chaos in the Codebase</strong>
          
          <TerminalBlock>
            <Command>git pull</Command>
            <R>{`Updating 3a5bc21..9f842d0

error: Your local changes to the following files would be overwritten by merge:
    src/components/auth/AuthProvider.tsx
    src/utils/api-client.ts
    src/pages/dashboard.tsx

Please commit your changes or stash them before you merge.
Aborting`}</R>
            
            <Command>git status</Command>
            <R>{`Modified:   src/components/auth/AuthProvider.tsx
Modified:   src/utils/api-client.ts
Modified:   src/pages/dashboard.tsx
Untracked:  src/components/AuthProvider.tsx
Untracked:  src/api-client.ts
Untracked:  src/utils/authentication/AuthProvider.tsx
Untracked:  src/pages/api/auth/utils.ts
Deleted:    src/tests/auth.test.tsx`}</R>
          </TerminalBlock>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah</SpeakerName>
                <MessageBubble>
                  What the... I didn't make these changes. And why are there duplicate files all over the place?
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#0B6E31">JD</Avatar>
              <MessageContent>
                <SpeakerName>Junior Dev</SpeakerName>
                <MessageBubble>
                  Oh, I was using the AI to refactor our authentication. It suggested moving files around to 'improve the project structure'.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah</SpeakerName>
                <MessageBubble>
                  But we already have a project structure! Why is there an AuthProvider in three different locations now? And where did our test file go?
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#0B6E31">JD</Avatar>
              <MessageContent>
                <SpeakerName>Junior Dev</SpeakerName>
                <MessageBubble>
                  The AI said the test was redundant because it was testing implementation details... I think it deleted it.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <strong style={{ display: 'block', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.2rem', color: '#E34935' }}>Day 3: The Bug Whack-a-Mole</strong>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah</SpeakerName>
                <MessageBubble>
                  The payment processing is broken in production. All transactions are failing.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#0B6E31">MD</Avatar>
              <MessageContent>
                <SpeakerName>Mid-level Dev</SpeakerName>
                <MessageBubble>
                  That's strange. I just used the AI to enhance the order verification function yesterday, but all the tests passed.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <TerminalBlock>
            <Command>git bisect start</Command>
            <Command>git bisect bad</Command>
            <Command>git bisect good HEAD~20</Command>
            <R>{`Bisecting: 10 revisions left to test after this (roughly 3 steps)
[8d7e25a] AI-enhanced order validation with improved error handling`}</R>
            
            <Command>npm test</Command>
            <R>{`PASS src/tests/orders/validation.test.ts
PASS src/tests/orders/payment.test.ts
PASS src/tests/orders/shipping.test.ts`}</R>
            
            <Command>npm run integration-test</Command>
            <R>{`FAIL PaymentProcessor -> Processing with existing customer -> "Cannot read property 'id' of undefined"`}</R>
          </TerminalBlock>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah</SpeakerName>
                <MessageBubble>
                  The unit tests all pass, but the integration tests are failing. The AI must have made changes that work in isolation but break in the full system context.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#0B6E31">MD</Avatar>
              <MessageContent>
                <SpeakerName>Mid-level Dev</SpeakerName>
                <MessageBubble>
                  But it generated all this defensive code to handle edge cases. I thought it was making things more robust!
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah</SpeakerName>
                <MessageBubble>
                  It looks like it's expecting a different data structure than what our API actually returns in production. Did you check if the AI was using the right version of our API spec?
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#0B6E31">MD</Avatar>
              <MessageContent>
                <SpeakerName>Mid-level Dev</SpeakerName>
                <MessageBubble>
                  I... I don't know. I just asked it to enhance the validation...
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <strong style={{ display: 'block', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.2rem', color: '#E34935' }}>Day 7: The Management Meeting</strong>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">CTO</Avatar>
              <MessageContent>
                <SpeakerName>CTO</SpeakerName>
                <MessageBubble>
                  We need to see better ROI on these AI tools. I'm implementing a new OKR for the quarter: AI suggestion acceptance rate should be above 80%.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah</SpeakerName>
                <MessageBubble>
                  But that's going to incentivize the team to accept suggestions regardless of quality. We've already had several production issues from inappropriate AI changes.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">CTO</Avatar>
              <MessageContent>
                <SpeakerName>CTO</SpeakerName>
                <MessageBubble>
                  The vendor says their tool increases productivity by 45%. We need to make sure we're leveraging that potential. Other teams are reporting great results.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah</SpeakerName>
                <MessageBubble>
                  We need guardrails and proper processes first. The AI doesn't understand our project structure, our testing philosophy, or our documentation standards.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">CTO</Avatar>
              <MessageContent>
                <SpeakerName>CTO</SpeakerName>
                <MessageBubble>
                  That sounds like resistance to me. These tools are the future - we need to adapt.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <BodyText variant="body" mb="2rem">
            Two weeks later, Sarah has become openly hostile to AI tools. In code reviews, she rejects any AI-generated code on principle. Junior team members are committing broken code because they're blindly accepting AI suggestions to meet the new OKR. The codebase is filled with inconsistently structured components, duplicate logic, and incorrectly refactored modules.
          </BodyText>
          
          <BodyText variant="body">
            The team is caught in a vicious cycle: poor AI implementation → bugs and architectural issues → distrust in AI → resistance to learning proper AI implementation → continued poor usage. This pattern is playing out in companies everywhere as teams rush to adopt AI without the proper framework.
          </BodyText>
          
          <strong style={{ display: 'block', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.2rem', color: '#E34935' }}>The Weekend Coder PM: When AI Empowers the Wrong People</strong>
          
          <BodyText variant="body">
            A month into the AI rollout, Mark, the project manager who previously had never written a line of code, proudly announces he's built a complete CRUD application over the weekend using AI tools.
          </BodyText>

          <TerminalBlock>
            <Command>cd ~/personal-projects/weekend-crud-app</Command>
            <Command>npm run build</Command>
            <R>{`Creating an optimized production build...
Compiled successfully.
✨ Done in 5.67s`}</R>
          </TerminalBlock>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">M</Avatar>
              <MessageContent>
                <SpeakerName>Mark (PM)</SpeakerName>
                <MessageBubble>
                  See? It works perfectly! I didn't even have to understand the code. I just described what I wanted, and the AI built it for me.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">S</Avatar>
              <MessageContent>
                <SpeakerName>Sarah (Senior Dev)</SpeakerName>
                <MessageBubble>
                  That's great for a personal project, but production applications need—
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">M</Avatar>
              <MessageContent>
                <SpeakerName>Mark (PM)</SpeakerName>
                <MessageBubble>
                  This changes everything. I've always suspected developers were overcomplicating things to justify longer timelines.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <strong style={{ display: 'block', marginBottom: '0.5rem', marginTop: '1.5rem', fontSize: '1rem', color: '#E34935' }}>The Following Week: Sprint Planning</strong>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">M</Avatar>
              <MessageContent>
                <SpeakerName>Mark (PM)</SpeakerName>
                <MessageBubble>
                  I've already estimated all the stories for this sprint. Each feature is 2-3 story points maximum.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">D</Avatar>
              <MessageContent>
                <SpeakerName>Senior Developer</SpeakerName>
                <MessageBubble>
                  The authentication system rework is at least 8 points. We need to account for all the edge cases, security considerations, and—
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">M</Avatar>
              <MessageContent>
                <SpeakerName>Mark (PM)</SpeakerName>
                <MessageBubble>
                  I literally built an OAuth system this weekend in under an hour. 3 points, tops. The AI handles all those edge cases automatically.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">D</Avatar>
              <MessageContent>
                <SpeakerName>Senior Developer</SpeakerName>
                <MessageBubble>
                  Your weekend app doesn't have to handle thousands of concurrent users, comply with GDPR, or pass security audits.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">M</Avatar>
              <MessageContent>
                <SpeakerName>Mark (PM)</SpeakerName>
                <MessageBubble>
                  You're just being resistant to change. This is classic gatekeeping from developers who feel threatened by AI.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <strong style={{ display: 'block', marginBottom: '0.5rem', marginTop: '1.5rem', fontSize: '1rem', color: '#E34935' }}>Two Weeks Later: The Production Incident</strong>
          
          <TerminalBlock>
            <Command>grep "ERROR" /var/log/production.log | tail -n 20</Command>
            <R>{`ERROR [2023-08-15 03:42:18] [auth-service]: SQL injection attempt detected
ERROR [2023-08-15 03:45:22] [auth-service]: Brute force login attempt detected
ERROR [2023-08-15 03:52:47] [data-service]: Customer data leak detected - improper access control
ERROR [2023-08-15 04:01:13] [monitoring]: System-wide outage initiated`}</R>
          </TerminalBlock>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#E34935">ST</Avatar>
              <MessageContent>
                <SpeakerName>Security Team</SpeakerName>
                <MessageBubble>
                  We have a major breach. Customer data has been compromised. The new authentication service had multiple vulnerabilities.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#0B6E31">JD</Avatar>
              <MessageContent>
                <SpeakerName>Junior Dev</SpeakerName>
                <MessageBubble>
                  But I used the exact prompt Mark suggested, and the AI said the code was secure...
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#E34935">D</Avatar>
              <MessageContent>
                <SpeakerName>Senior Developer</SpeakerName>
                <MessageBubble>
                  Did you implement the security testing suite we normally use?
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#0B6E31">JD</Avatar>
              <MessageContent>
                <SpeakerName>Junior Dev</SpeakerName>
                <MessageBubble>
                  Mark said it was overengineering and would slow us down too much.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <strong style={{ display: 'block', marginBottom: '0.5rem', marginTop: '1.5rem', fontSize: '1rem', color: '#E34935' }}>The Aftermath: Developer Exodus</strong>
          
          <BodyText variant="body">
            In the following weeks, three senior developers resign. Exit interviews reveal a common theme: "AI tools were weaponized against us." Developers describe a toxic environment where:
          </BodyText>
          
          <ul style={{ marginLeft: '2rem', color: '#E34935', marginTop: '1rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              Deadlines were set by non-technical managers who equated their weekend hobby projects with enterprise software
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Technical concerns were dismissed as "resistance to innovation"
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Complex technical considerations were labeled as "overengineering"
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Years of experience were devalued compared to AI-produced quick wins
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              Developer autonomy was stripped away as PMs began dictating implementations
            </li>
          </ul>
          
          <BodyText variant="body">
            The company's Glassdoor rating plummets. One anonymous review reads: "The AI tools that were supposed to make our jobs easier became weapons used against us. PMs with no coding experience now dictate how long features should take based on their weekend 'vibe coding' sessions. When the AI tools are down, we still have the same impossible deadlines but without the tools to meet them."
          </BodyText>
          
          <ChatContainer>
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">M</Avatar>
              <MessageContent>
                <SpeakerName>Mark (PM)</SpeakerName>
                <MessageBubble>
                  We need to hire junior developers who are more comfortable with AI. These senior developers were just too set in their ways.
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
            
            <ChatMessage>
              <Avatar bgColor="#4A9EFF">CTO</Avatar>
              <MessageContent>
                <SpeakerName>CTO</SpeakerName>
                <MessageBubble>
                  But now our entire authentication system needs to be rewritten from scratch by security experts. The data breach is going to cost us millions...
                </MessageBubble>
              </MessageContent>
            </ChatMessage>
          </ChatContainer>
          
          <BodyText variant="body" mb="2rem">
            Two months later, the company has an engineering team composed mostly of junior developers supervised by project managers. Technical debt has accumulated to crippling levels. The AI tools generate code quickly, but without the guidance of experienced developers, that code is becoming increasingly unmaintainable. When servers are overloaded and AI tools are unavailable, development grinds to a halt as few developers can work effectively without AI assistance. The AI revolution that promised to enhance developer capabilities has instead created a dysfunctional dependency.
          </BodyText>
          
          <strong style={{ display: 'block', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.2rem', color: '#6772e5' }}>The Brain Garden Difference</strong>
          
          <BodyText variant="body">
            This scenario highlights the core problem: AI tools without structure create chaos. The Brain Garden System addresses exactly these issues:
          </BodyText>
          
          <ul style={{ marginLeft: '2rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.8rem' }}>
              <strong>Project Structure Knowledge:</strong> The system maintains comprehensive documentation of your project structure, ensuring AI can't create duplicate files or break architectural patterns.
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <strong>Testing as a Guard Rail:</strong> Automated tests become an objective measure of quality, preventing AI from shipping broken code even when it "looks right."
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <strong>Documentation Standards:</strong> Clear standards for what should be documented and how, ensuring AI-generated docs stay consistent with your team's approach.
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <strong>Commit Message Framework:</strong> Structured commit messages that prevent AI from making undocumented or poorly explained changes.
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <strong>Metrics That Matter:</strong> Replacing arbitrary "AI usage" metrics with meaningful measures like test coverage, documentation completeness, and bug reduction.
            </li>
          </ul>
          
          <BodyText variant="body">
            AI tools aren't magic—they're powerful amplifiers of your existing development practices. With poor practices, they amplify chaos. With the Brain Garden System, they amplify excellence, creating the virtuous cycle we've explored throughout this section.
          </BodyText>
        </StoryBox>

        {/* The Future Is Here */}
        <StoryBox>
          <BodyText variant="body">
            We&apos;re not talking about some far-off future. This is happening now. The teams that embrace these practices aren&apos;t just writing better code - they&apos;re creating environments where AI can operate as a true team member, handling increasingly complex tasks with growing autonomy.
          </BodyText>

          <BodyText variant="body">
            And here&apos;s the kicker: the better your development practices, the more powerful your AI tools become. It&apos;s a force multiplier effect that&apos;s transforming how we think about software development.
          </BodyText>
        </StoryBox>
      </div>
    </StyledForceMultiplierContainer>
  );
};