import { motion } from 'framer-motion';
import { Box, Divider, Group, Paper, Badge, Center, Button, Text } from '@mantine/core';
import { Typography } from '../src/shared-components/atoms/Typography';
import PageTemplate from '../src/shared-components/templates/PageTemplate';
import { useTheme } from '../src/providers/ThemeProvider';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Resume() {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Express', 'GraphQL', 'REST APIs', 'Redux', 'Styled Components',
    'Framer Motion', 'AI Integration', 'LLM Prompt Engineering',
    'AWS', 'Docker', 'CI/CD', 'Agile Methodologies'
  ];

  return (
    <PageTemplate
      title="Resume"
      description="My professional experience and skills"
    >
      <Box mb={40}>
        <Box mb="md">
          <Typography variant="h3">
            <span>Work Experience</span>
          </Typography>
          <Divider 
            my="sm" 
            style={{ 
              background: isDark ? 
                'linear-gradient(90deg, #4c4dff, #9d41ff)' : 
                'linear-gradient(90deg, #4c4dff, #9d41ff)' 
            }} 
          />
        </Box>
        
        <Paper
          component={motion.div}
          shadow="sm"
          radius="md"
          p="lg"
          withBorder
          mb="lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <Group justify="space-between" wrap="wrap" mb="xs">
            <Typography variant="h3">
              <span>Senior Full Stack Developer</span>
            </Typography>
            <Typography variant="body">
              <span style={{ fontWeight: 600 }}>AI Solutions Inc.</span>
            </Typography>
          </Group>
          <Text c="dimmed" mb="md" size="sm">2021 - Present</Text>
          <Typography variant="body">
            <span>
              Lead development of AI-powered web applications, focusing on integrating 
              large language models into business workflows. Managed a team of 5 developers 
              and implemented CI/CD pipelines that reduced deployment time by 40%.
            </span>
          </Typography>
        </Paper>
        
        <Paper
          component={motion.div}
          shadow="sm"
          radius="md"
          p="lg"
          withBorder
          mb="lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Group justify="space-between" wrap="wrap" mb="xs">
            <Typography variant="h3">
              <span>Frontend Developer</span>
            </Typography>
            <Typography variant="body">
              <span style={{ fontWeight: 600 }}>Tech Innovations LLC</span>
            </Typography>
          </Group>
          <Text c="dimmed" mb="md" size="sm">2018 - 2021</Text>
          <Typography variant="body">
            <span>
              Developed responsive web applications using React and Next.js. Implemented 
              state management with Redux and created reusable component libraries that 
              improved development efficiency by 30%.
            </span>
          </Typography>
        </Paper>
      </Box>
      
      <Box mb={40}>
        <Box mb="md">
          <Typography variant="h3">
            <span>Education</span>
          </Typography>
          <Divider 
            my="sm" 
            style={{ 
              background: isDark ? 
                'linear-gradient(90deg, #4c4dff, #9d41ff)' : 
                'linear-gradient(90deg, #4c4dff, #9d41ff)' 
            }} 
          />
        </Box>
        
        <Paper
          component={motion.div}
          shadow="sm"
          radius="md"
          p="lg"
          withBorder
          mb="lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Group justify="space-between" wrap="wrap" mb="xs">
            <Typography variant="h3">
              <span>Master of Computer Science</span>
            </Typography>
            <Typography variant="body">
              <span style={{ fontWeight: 600 }}>University of Technology</span>
            </Typography>
          </Group>
          <Text c="dimmed" mb="md" size="sm">2016 - 2018</Text>
          <Typography variant="body">
            <span>
              Specialized in Artificial Intelligence and Machine Learning. 
              Thesis: &quot;Implementing Neural Networks for Natural Language Processing&quot;
            </span>
          </Typography>
        </Paper>
        
        <Paper
          component={motion.div}
          shadow="sm"
          radius="md"
          p="lg"
          withBorder
          mb="lg"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Group justify="space-between" wrap="wrap" mb="xs">
            <Typography variant="h3">
              <span>Bachelor of Science in Computer Science</span>
            </Typography>
            <Typography variant="body">
              <span style={{ fontWeight: 600 }}>State University</span>
            </Typography>
          </Group>
          <Text c="dimmed" mb="md" size="sm">2012 - 2016</Text>
          <Typography variant="body">
            <span>
              Graduated with honors. Focused on software engineering and web development.
            </span>
          </Typography>
        </Paper>
      </Box>
      
      <Box mb={40}>
        <Box mb="md">
          <Typography variant="h3">
            <span>Skills</span>
          </Typography>
          <Divider 
            my="sm" 
            style={{ 
              background: isDark ? 
                'linear-gradient(90deg, #4c4dff, #9d41ff)' : 
                'linear-gradient(90deg, #4c4dff, #9d41ff)' 
            }} 
          />
        </Box>
        
        <Group mt="md">
          {skills.map((skill, index) => (
            <Badge
              component={motion.div}
              key={index}
              size="lg"
              radius="sm"
              variant={isDark ? "light" : "filled"}
              color="indigo"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              {skill}
            </Badge>
          ))}
        </Group>
      </Box>
      
      <Center my={40}>
        <Button
          variant="filled"
          color="blue"
          size="md"
          onClick={() => console.log('Download resume')}
        >
          Download Resume PDF
        </Button>
      </Center>
    </PageTemplate>
  );
} 