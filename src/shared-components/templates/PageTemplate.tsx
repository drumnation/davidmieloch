import { AppShell, Container, Box, Stack } from '@mantine/core';
import { motion } from 'framer-motion';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import { Typography } from '../atoms/Typography';

type PageTemplateProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

// Create a motion component with proper typing
const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export const PageTemplate = ({ title, description, children }: PageTemplateProps) => (
  <AppShell header={{ height: 60 }} footer={{ height: 160 }}>
    <AppShell.Header>
      <Header />
    </AppShell.Header>
    
    <AppShell.Main pt={60} pb={160}>
      <Container size="lg" py="xl">
        <Stack align="center" mb={description ? 40 : 24}>
          <Typography variant="h1">{title}</Typography>
          {description && (
            <Box maw={800} ta="center">
              <Typography variant="body" color="secondary">
                {description}
              </Typography>
            </Box>
          )}
        </Stack>
        
        <MotionDiv
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          style={{ minHeight: '60vh' }}
        >
          {children}
        </MotionDiv>
      </Container>
    </AppShell.Main>
    
    <AppShell.Footer>
      <Footer />
    </AppShell.Footer>
  </AppShell>
);

export default PageTemplate; 