import { motion } from 'framer-motion';
import { Box, Group } from '@mantine/core';
import Typography from '../shared-components/atoms/Typography';
import Button from '../shared-components/atoms/Button';
import PageTemplate from '../shared-components/templates/PageTemplate';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <PageTemplate
      title="David Mieloch"
      description="Full-stack developer specializing in AI-powered applications"
    >
      <Box
        component="section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '60px 0'
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <Typography variant="h2">
              Building the future with code
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Typography variant="body1" style={{ maxWidth: '600px', margin: '24px auto' }}>
              I&apos;m a passionate developer focused on creating innovative solutions 
              that leverage the latest technologies. With expertise in AI integration, 
              I help businesses transform their ideas into reality.
            </Typography>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Group gap="md" mt="xl" justify="center">
              <Button 
                label="View My Work" 
                primary 
                onClick={() => window.location.href = '/resume'}
              />
              <Button 
                label="Contact Me" 
                onClick={() => window.location.href = '/contact'}
              />
            </Group>
          </motion.div>
        </motion.div>
      </Box>
    </PageTemplate>
  );
} 