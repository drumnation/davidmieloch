import styled from 'styled-components';
import { motion } from 'framer-motion';
import Typography from '../shared-components/atoms/Typography';
import PageTemplate from '../shared-components/templates/PageTemplate';
import ContactForm from '../shared-components/organisms/ContactForm';

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  padding: 24px;
`;

const InfoItem = styled.div`
  margin-bottom: 24px;
`;

const InfoLabel = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const SocialLink = styled.a`
  color: #0070f3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  return (
    <PageTemplate
      title="Contact Me"
      description="Get in touch for collaborations, questions, or just to say hello"
    >
      <ContactContainer>
        <ContactInfo
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
        >
          <Typography variant="h3" style={{ marginBottom: '24px' }}>
            Let&apos;s Connect
          </Typography>
          
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            <Typography variant="body1">david.mieloch@example.com</Typography>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Location</InfoLabel>
            <Typography variant="body1">San Francisco, CA</Typography>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Availability</InfoLabel>
            <Typography variant="body1">
              I&apos;m currently available for freelance work and consulting.
              Feel free to reach out with your project details.
            </Typography>
          </InfoItem>
          
          <Typography variant="h4" style={{ marginTop: '32px', marginBottom: '16px' }}>
            Follow Me
          </Typography>
          
          <SocialLinks>
            <SocialLink href="https://github.com/" target="_blank" rel="noopener noreferrer">
              GitHub
            </SocialLink>
            <SocialLink href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </SocialLink>
            <SocialLink href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              Twitter
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInRight}
        >
          <Typography variant="h3" style={{ marginBottom: '24px' }}>
            Send Me a Message
          </Typography>
          <ContactForm />
        </motion.div>
      </ContactContainer>
    </PageTemplate>
  );
} 