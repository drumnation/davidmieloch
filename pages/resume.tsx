import { motion } from 'framer-motion';
import { Box, Divider, Group, Paper, Badge, Center } from '@mantine/core';
import Typography from '../shared-components/atoms/Typography';
import Button from '../shared-components/atoms/Button';
import PageTemplate from '../shared-components/templates/PageTemplate';
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
          <Typography variant="h3">Work Experience</Typography>
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
            <Typography variant="h4">Senior Full Stack Developer</Typography>
            <Typography variant="body1" fw={600}>AI Solutions Inc.</Typography>
          </Group>
          <Typography variant="body2" c="dimmed" mb="md">2021 - Present</Typography>
          <Typography variant="body1">
            Lead development of AI-powered web applications, focusing on integrating 
            large language models into business workflows. Managed a team of 5 developers 
            and implemented CI/CD pipelines that reduced deployment time by 40%.
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
            <Typography variant="h4">Frontend Developer</Typography>
            <Typography variant="body1" fw={600}>Tech Innovations LLC</Typography>
          </Group>
          <Typography variant="body2" c="dimmed" mb="md">2018 - 2021</Typography>
          <Typography variant="body1">
            Developed responsive web applications using React and Next.js. Implemented 
            state management with Redux and created reusable component libraries that 
            improved development efficiency by 30%.
          </Typography>
        </Paper>
      </Box>
      
      <Box mb={40}>
        <Box mb="md">
          <Typography variant="h3">Education</Typography>
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
            <Typography variant="h4">Master of Computer Science</Typography>
            <Typography variant="body1" fw={600}>University of Technology</Typography>
          </Group>
          <Typography variant="body2" c="dimmed" mb="md">2016 - 2018</Typography>
          <Typography variant="body1">
            Specialized in Artificial Intelligence and Machine Learning. 
            Thesis: &quot;Implementing Neural Networks for Natural Language Processing&quot;
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
            <Typography variant="h4">Bachelor of Science in Computer Science</Typography>
            <Typography variant="body1" fw={600}>State University</Typography>
          </Group>
          <Typography variant="body2" c="dimmed" mb="md">2012 - 2016</Typography>
          <Typography variant="body1">
            Graduated with honors. Focused on software engineering and web development.
          </Typography>
        </Paper>
      </Box>
      
      <Box mb={40}>
        <Box mb="md">
          <Typography variant="h3">Skills</Typography>
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
          label="Download Resume PDF"
          primary
          size="md"
          onClick={() => console.log('Download resume')}
        />
      </Center>
    </PageTemplate>
  );
} 