import { useState } from 'react';
import { Box, Paper, Alert, Textarea, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Typography from '../atoms/Typography';

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    
    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      email: (value) => (/\S+@\S+\.\S+/.test(value) ? null : 'Please enter a valid email'),
      message: (value) => (value.trim().length > 0 ? null : 'Message is required')
    }
  });
  
  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Log values to console (just to use the parameter)
      console.log('Form values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Box maw={600} w="100%">
      {isSubmitted && (
        <Alert 
          color="green" 
          title="Message sent!" 
          mb="md"
        >
          <Typography variant="body1">
            Thank you for your message! I&apos;ll get back to you soon.
          </Typography>
        </Alert>
      )}
      
      <Paper p="md" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <FormField
              label="Name"
              name="name"
              placeholder="Your name"
              required
              {...form.getInputProps('name')}
            />
            
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              {...form.getInputProps('email')}
            />
            
            <FormField
              label="Subject"
              name="subject"
              placeholder="What is this regarding?"
              {...form.getInputProps('subject')}
            />
            
            <Box>
              <Textarea
                label="Message"
                placeholder="Your message"
                minRows={4}
                required
                {...form.getInputProps('message')}
              />
            </Box>
            
            <Box mt="md">
              <Button
                label={isSubmitting ? 'Sending...' : 'Send Message'}
                primary
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ContactForm; 