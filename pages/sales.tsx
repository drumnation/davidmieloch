import { motion } from 'framer-motion';
import { Box, Container, Group, List, Stack } from '@mantine/core';
import { useRef } from 'react';
import Typography from '../shared-components/atoms/Typography';
import Button from '../shared-components/atoms/Button';
import PageTemplate from '../shared-components/templates/PageTemplate';
import ContentSection from '../shared-components/molecules/ContentSection';
import FeaturePoint from '../shared-components/molecules/FeaturePoint';
import Testimonial from '../shared-components/molecules/Testimonial';
import FAQItem from '../shared-components/molecules/FAQItem';
import { useTheme } from '../src/providers/ThemeProvider';
import { 
  IconCode, IconBrain, IconGitPullRequest, IconTestPipe, IconComponents, 
  IconCheck, IconArrowRight, IconStar, IconUsers, IconClock, IconCoin, 
  IconMoodSad
} from '@tabler/icons-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export default function Sales() {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const containerRef = useRef(null);

  const accentColor = isDark ? 'rgba(76, 77, 255, 0.9)' : 'rgba(76, 77, 255, 0.7)';
  
  const highlightStyle = {
    background: isDark ? 'rgba(76, 77, 255, 0.15)' : 'rgba(76, 77, 255, 0.05)',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '3rem',
    borderLeft: isDark ? '4px solid rgba(76, 77, 255, 0.6)' : '4px solid rgba(76, 77, 255, 0.4)',
  };

  const sectionHeadingStyle = {
    borderBottom: `2px solid ${accentColor}`,
    paddingBottom: '0.5rem',
    marginBottom: '2rem',
    display: 'inline-block'
  };

  const checkIconStyle = {
    color: accentColor,
    marginRight: '0.5rem',
    width: rem(20),
    height: rem(20)
  };

  const testimonialStyle = {
    background: isDark ? 'rgba(76, 77, 255, 0.08)' : 'rgba(76, 77, 255, 0.03)',
    padding: '2rem',
    borderRadius: '12px',
    position: 'relative' as const,
    marginBottom: '2rem'
  };

  return (
    <PageTemplate
      title="AI Integration Expert"
      description="Transform your development workflow with proven AI integration strategies"
    >
      <Container size="md" ref={containerRef}>
        {/* Hero Section */}
        <ContentSection variant="gradient" align="center" spacing="xl">
          <Typography 
            variant="h1" 
            style={{ 
              fontSize: '3.5rem', 
              marginBottom: '1.5rem',
              maxWidth: '800px',
              margin: '0 auto 1.5rem'
            }}
          >
            From AI Skeptic to AI Integration Expert
          </Typography>

          <Typography 
            variant="body1" 
            size="xl"
            style={{ 
              maxWidth: '700px', 
              margin: '0 auto 2rem',
              lineHeight: 1.7,
              color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)'
            }}
          >
            Let me guess: your team just got access to AI coding tools, and the reactions range from 
            skeptical eye-rolls to outright hostility. I've been there—both as the skeptic and later 
            as the solution architect.
          </Typography>

          <Group justify="center" gap="md">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                label="Schedule a Consultation" 
                primary 
                size="lg"
                rightSection={<IconArrowRight size={18} />}
                onClick={() => window.location.href = '/contact'}
              />
            </motion.div>
          </Group>
        </ContentSection>

        {/* The Reality Section */}
        <ContentSection title="The Reality of AI Tools in Development Teams">
          <Box style={{ marginBottom: '2rem' }}>
            <Typography variant="body1" style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
              A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers 
              shared their frustrations about mandatory AI tool adoption.
            </Typography>

            <Box style={{ 
              background: isDark ? 'rgba(76, 77, 255, 0.08)' : 'rgba(76, 77, 255, 0.03)',
              padding: '2rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <Typography variant="h4" style={{ marginBottom: '1rem' }}>
                🔥 Trending on r/ExperiencedDevs
              </Typography>
              <Typography variant="body2" color="dimmed">
                "AI coding mandates at work?"
              </Typography>
              <Typography variant="caption" color="dimmed">
                💬 286 comments &nbsp;&nbsp; ⬆️ 283 upvotes
              </Typography>
            </Box>

            <Stack spacing="lg">
              <Testimonial
                quote="One of our OKRs is basically 'Use AI more' and one of the ways they're measuring that is Copilot suggestion acceptance %. Absolute insanity."
                author="Engineering Lead"
              />
              <Testimonial
                quote="Management bought Cursor pro for everyone and said that they expect to see a return on that investment."
                author="Senior Developer"
              />
              <Testimonial
                quote="We're also seeing an increase in failures in Prod, so we need you to really ramp up Copilot and AI code reviews to find the source of these new issues."
                author="Project Manager"
                subtitle="(without realizing the irony)"
              />
            </Stack>
          </Box>
        </ContentSection>

        {/* The Autopilot Analogy Section */}
        <ContentSection title="The Autopilot Analogy: Reframing How We Think About AI Tools">
          <Typography variant="body1" style={{ marginBottom: '2rem', lineHeight: 1.7 }}>
            One developer made a brilliant comparison that perfectly captures the current state of AI coding tools:
          </Typography>

          <Box style={{ 
            background: isDark ? 'rgba(76, 77, 255, 0.08)' : 'rgba(76, 77, 255, 0.03)',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            borderLeft: `4px solid ${accentColor}`
          }}>
            <Typography variant="body1" style={{ lineHeight: 1.7 }}>
              "There's a 'Hollywood view' of autopilot where it's a magical tool that the pilot just 
              flicks on after takeoff, then they sit back and let it fly them to their destination. 
              This view bleeds into other domains such as self-driving cars and AI programming tools.
              <br/><br/>
              But it fundamentally misunderstands autopilot as a tool. The reality is that aircraft 
              autopilot systems are specialist tools which require training to use effectively, where 
              the primary goal is to reduce cognitive load and allow the pilot to focus on higher 
              level concerns."
            </Typography>
          </Box>
        </ContentSection>

        {/* The Solution Section */}
        <ContentSection title="A Systematic Approach to AI Integration">
          <Typography variant="body1" style={{ marginBottom: '2rem', lineHeight: 1.7 }}>
            Through years of working with React and Node.js teams, I've developed a sophisticated 
            system called "AI Brain Garden" that transforms how teams interact with AI tools. This 
            isn't just another set of guidelines—it's a living, evolving ecosystem that grows with 
            your project.
          </Typography>

          <FeaturePoint
            icon={IconBrain}
            title="Project-Specific 'Brains'"
            description="Each Brain is carefully cultivated to understand:"
            bulletPoints={[
              "Project architecture and patterns",
              "Coding standards and best practices",
              "Testing requirements and methodologies",
              "Business domain knowledge",
              "Team workflows and preferences"
            ]}
          />

          <FeaturePoint
            icon={IconCode}
            title="Dynamic Context Management"
            description="Our cursorrules system ensures AI agents always have:"
            bulletPoints={[
              "Automatically loaded relevant project files",
              "Maintained consistent coding standards",
              "Enforced architectural patterns",
              "Project-specific context for decisions"
            ]}
          />

          <FeaturePoint
            icon={IconComponents}
            title="Intelligent Directory Structure"
            description="Maintain an always-up-to-date understanding of your project through:"
            bulletPoints={[
              "Real-time directory monitoring",
              "AI-powered folder analysis",
              "Automated documentation updates",
              "Smart dependency tracking"
            ]}
          />
        </ContentSection>

        {/* Case Studies Section */}
        <ContentSection title="Real Results from Real Teams">
          <Box style={{ marginBottom: '3rem' }}>
            <Typography variant="h3" style={{ marginBottom: '2rem' }}>
              Enterprise React Native Team Transformation
            </Typography>

            <Box style={{ marginBottom: '2rem' }}>
              <Typography variant="h4" style={{ marginBottom: '1rem' }}>Before:</Typography>
              <List>
                <List.Item>2-3 hours daily reviewing AI-generated React components</List.Item>
                <List.Item>30% of AI suggestions needed major TypeScript fixes</List.Item>
                <List.Item>Significant team resistance to AI adoption</List.Item>
              </List>
            </Box>

            <Box>
              <Typography variant="h4" style={{ marginBottom: '1rem' }}>After:</Typography>
              <List>
                <List.Item>80% reduction in component review time</List.Item>
                <List.Item>95% of AI suggestions type-check on first try</List.Item>
                <List.Item>100% team buy-in within 3 months</List.Item>
              </List>
            </Box>
          </Box>

          <Testimonial
            quote="Their systematic approach completely transformed how our React team works with AI. We're shipping features faster than ever, and our TypeScript coverage has actually improved."
            author="Engineering Manager"
            company="Enterprise Client"
          />
        </ContentSection>

        {/* How We Can Work Together Section */}
        <ContentSection title="How We Can Work Together">
          <Stack spacing="xl">
            <FeaturePoint
              icon={IconBrain}
              title="Technical Leadership & Strategy"
              description="Strategic guidance for successful AI integration:"
              bulletPoints={[
                "AI integration roadmap development",
                "Architecture and system design",
                "Team workflow optimization",
                "Risk management planning"
              ]}
            />

            <FeaturePoint
              icon={IconCode}
              title="Implementation Support"
              description="Hands-on assistance with:"
              bulletPoints={[
                "Setting up the Brain Garden system",
                "Customizing the framework for your needs",
                "Establishing quality control processes",
                "Creating team-specific guidelines"
              ]}
            />

            <FeaturePoint
              icon={IconUsers}
              title="Team Development"
              description="Comprehensive team enablement through:"
              bulletPoints={[
                "Developer mentoring and training",
                "Best practices workshops",
                "Code review process improvement",
                "Knowledge transfer sessions"
              ]}
            />
          </Stack>
        </ContentSection>

        {/* FAQ Section */}
        <ContentSection title="Frequently Asked Questions">
          <FAQItem
            question="How long does a typical engagement last?"
            answer="The duration varies based on team size and project complexity. Initial transformations typically take 3-6 months, with ongoing advisory relationships available afterward."
          />
          <FAQItem
            question="Can you work with remote teams?"
            answer="Absolutely. I have extensive experience working with distributed teams and can provide both remote and on-site support as needed."
          />
          <FAQItem
            question="How do you handle knowledge transfer?"
            answer="Knowledge transfer is built into the entire process through documentation, pair programming, workshops, and structured training sessions."
          />
          <FAQItem
            question="What's your availability?"
            answer="I maintain limited concurrent engagements to ensure high-quality support for each client. Let's discuss your timeline and requirements."
          />
          <FAQItem
            question="Do you offer team training?"
            answer="Yes, training is a core component of my approach. I provide both structured workshops and hands-on mentoring tailored to your team's needs."
          />
        </ContentSection>

        {/* Final CTA */}
        <ContentSection spacing="md">
          <motion.div
            whileInView={{ y: [30, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ 
              textAlign: 'center',
              padding: '3rem',
              background: isDark ? 'rgba(76, 77, 255, 0.15)' : 'rgba(76, 77, 255, 0.05)',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}
          >
            <Typography variant="h2" style={{ marginBottom: '1.5rem' }}>
              Ready to Transform Your Team?
            </Typography>
            
            <Typography variant="body1" style={{ maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Let's discuss how I can help your team successfully integrate AI into your development workflow. 
              Whether you're just starting with AI tools or looking to optimize your existing processes, 
              I'm here to help.
            </Typography>
            
            <Group justify="center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  label="Schedule a Consultation" 
                  primary 
                  size="lg"
                  rightSection={<IconArrowRight size={18} />}
                  onClick={() => window.location.href = '/contact'}
                />
              </motion.div>
            </Group>
          </motion.div>
        </ContentSection>
      </Container>
    </PageTemplate>
  );
} 