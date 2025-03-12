import { motion } from 'framer-motion';
import { Box, Container, Group, List, Stack, Grid, rem, Button, Text, Title } from '@mantine/core';
import { useRef, useState, useEffect } from 'react';
import { Typography } from '../src/shared-components/atoms/Typography';
import PageTemplate from '../src/shared-components/templates/PageTemplate';
import SideNavigation from '../src/shared-components/organisms/SideNavigation';
import { SideNavigationItem } from '../src/shared-components/organisms/SideNavigation/SideNavigation.types';
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

// Navigation items for the side navigation
const navigationItems: SideNavigationItem[] = [
  {
    id: 'hero-section',
    title: 'From AI Skeptic to Expert',
    icon: <IconBrain size={18} />,
  },
  {
    id: 'reality-section',
    title: 'The Reality',
    icon: <IconMoodSad size={18} />,
  },
  {
    id: 'autopilot-section',
    title: 'Autopilot Analogy',
    icon: <IconCode size={18} />,
  },
  {
    id: 'solution-section',
    title: 'Systematic Approach',
    icon: <IconComponents size={18} />,
  },
  {
    id: 'case-studies-section',
    title: 'Case Studies',
    icon: <IconUsers size={18} />,
  },
];

export default function Sales() {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero-section');

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

  const heroSectionStyle = {
    background: isDark 
      ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(0, 188, 212, 0.1))' 
      : 'linear-gradient(135deg, rgba(33, 150, 243, 0.05), rgba(0, 188, 212, 0.05))',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center' as const,
    marginBottom: '2rem'
  };

  return (
    <PageTemplate
      title="AI Integration Expert"
      description="Transform your development workflow with proven AI integration strategies"
    >
      <Grid gutter={40}>
        {/* Side Navigation */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Box hiddenFrom="md" mb="xl">
            <Typography variant="h3">
              Table of Contents
            </Typography>
          </Box>
          <SideNavigation 
            items={navigationItems} 
            activeId={activeSection}
            style={isDark ? 'dark' : 'light'}
            onItemClick={(id) => setActiveSection(id)}
          />
        </Grid.Col>

        {/* Main Content */}
        <Grid.Col span={{ base: 12, md: 9 }}>
          <Container size="md" ref={containerRef}>
            {/* Hero Section */}
            <Box id="hero-section" mb="xl" py="xl" style={heroSectionStyle}>
              <Typography variant="h1">
                From AI Skeptic to AI Integration Expert
              </Typography>

              <Typography variant="body">
                <span style={{ 
                  maxWidth: '700px', 
                  margin: '0 auto 2rem',
                  lineHeight: 1.7,
                  color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                  display: 'block'
                }}>
                  Let me guess: your team just got access to AI coding tools, and the reactions range from 
                  skeptical eye-rolls to outright hostility. I've been there—both as the skeptic and later 
                  as the solution architect.
                </span>
              </Typography>

              <Group justify="center" gap="md">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="filled"
                    color="blue"
                    size="lg"
                    rightSection={<IconArrowRight size={18} />}
                    onClick={() => window.location.href = '/contact'}
                  >
                    Schedule a Consultation
                  </Button>
                </motion.div>
              </Group>
            </Box>

            {/* The Reality Section */}
            <Box id="reality-section" mb="xl">
              <Title order={2} mb="md">The Reality of AI Tools in Development Teams</Title>
              <Box style={{ marginBottom: '2rem' }}>
                <Text style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  A recent thread on r/ExperiencedDevs caught my eye, where hundreds of senior developers 
                  shared their frustrations about mandatory AI tool adoption.
                </Text>

                <Box style={{ 
                  background: isDark ? 'rgba(76, 77, 255, 0.08)' : 'rgba(76, 77, 255, 0.03)',
                  padding: '2rem',
                  borderRadius: '12px',
                  marginBottom: '2rem'
                }}>
                  <Title order={4} style={{ marginBottom: '1rem' }}>
                    🔥 Trending on r/ExperiencedDevs
                  </Title>
                  <Text size="sm" c="dimmed">
                    "AI coding mandates at work?"
                  </Text>
                  <Text size="xs" c="dimmed">
                    💬 286 comments &nbsp;&nbsp; ⬆️ 283 upvotes
                  </Text>
                </Box>

                <Stack gap="lg">
                  <Box style={testimonialStyle}>
                    <Text style={{ fontStyle: 'italic' }}>
                      "One of our OKRs is basically 'Use AI more' and one of the ways they're measuring that is Copilot suggestion acceptance %. Absolute insanity."
                    </Text>
                    <Text size="sm" fw="bold" mt="md">Engineering Lead</Text>
                  </Box>
                  <Box style={testimonialStyle}>
                    <Text style={{ fontStyle: 'italic' }}>
                      "Management bought Cursor pro for everyone and said that they expect to see a return on that investment."
                    </Text>
                    <Text size="sm" fw="bold" mt="md">Senior Developer</Text>
                  </Box>
                  <Box style={testimonialStyle}>
                    <Text style={{ fontStyle: 'italic' }}>
                      "We're also seeing an increase in failures in Prod, so we need you to really ramp up Copilot and AI code reviews to find the source of these new issues."
                    </Text>
                    <Text size="sm" fw="bold" mt="md">Project Manager <span style={{ fontWeight: 'normal' }}>(without realizing the irony)</span></Text>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {/* The Autopilot Analogy Section */}
            <Box id="autopilot-section" mb="xl">
              <Title order={2} mb="md">The Autopilot Analogy: Reframing How We Think About AI Tools</Title>
              <Text style={{ marginBottom: '2rem', lineHeight: 1.7 }}>
                One developer made a brilliant comparison that perfectly captures the current state of AI coding tools:
              </Text>

              <Box style={{ 
                background: isDark ? 'rgba(76, 77, 255, 0.08)' : 'rgba(76, 77, 255, 0.03)',
                padding: '2rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                borderLeft: `4px solid ${accentColor}`
              }}>
                <Text style={{ lineHeight: 1.7 }}>
                  "There's a 'Hollywood view' of autopilot where it's a magical tool that the pilot just 
                  flicks on after takeoff, then they sit back and let it fly them to their destination. 
                  This view bleeds into other domains such as self-driving cars and AI programming tools.
                  <br/><br/>
                  But it fundamentally misunderstands autopilot as a tool. The reality is that aircraft 
                  autopilot systems are specialist tools which require training to use effectively, where 
                  the primary goal is to reduce cognitive load and allow the pilot to focus on higher 
                  level concerns."
                </Text>
              </Box>
            </Box>

            {/* The Solution Section */}
            <Box id="solution-section" mb="xl">
              <Title order={2} mb="md">A Systematic Approach to AI Integration</Title>
              <Text style={{ marginBottom: '2rem', lineHeight: 1.7 }}>
                Through years of working with React and Node.js teams, I've developed a sophisticated 
                system called "AI Brain Garden" that transforms how teams interact with AI tools. This 
                isn't just another set of guidelines—it's a living, evolving ecosystem that grows with 
                your project.
              </Text>

              {/* Feature points would go here */}
            </Box>

            {/* Case Studies Section */}
            <Box id="case-studies-section" mb="xl">
              <Title order={2} mb="md">Real Results from Real Teams</Title>
              {/* Case studies content would go here */}
            </Box>

            {/* Final CTA */}
            <Box mb="xl">
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
                <Typography variant="h2">
                  Ready to Transform Your Team?
                </Typography>
                
                <Typography variant="body">
                  <span style={{ maxWidth: '700px', margin: '0 auto 2rem', lineHeight: 1.7, display: 'block' }}>
                    Let's discuss how I can help your team successfully integrate AI into your development workflow. 
                    Whether you're just starting with AI tools or looking to optimize your existing processes, 
                    I'm here to help.
                  </span>
                </Typography>
                
                <Group justify="center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="filled"
                      color="blue"
                      size="lg"
                      rightSection={<IconArrowRight size={18} />}
                      onClick={() => window.location.href = '/contact'}
                    >
                      Schedule a Consultation
                    </Button>
                  </motion.div>
                </Group>
              </motion.div>
            </Box>
          </Container>
        </Grid.Col>
      </Grid>
    </PageTemplate>
  );
} 