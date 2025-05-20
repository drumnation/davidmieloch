import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ContactFormValues } from './ContactForm.types';
import { createFormData } from './ContactForm.logic';

export function useContactFormHandler(form: any) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (values: ContactFormValues) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const formData = createFormData(values);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (!response.ok || result.error) {
                throw new Error(result.error || 'An error occurred.');
            }
            setSuccess(true);
            notifications.show({
                title: 'Message Sent!',
                message: 'Thanks — your message is now propagating through the system 🌱',
                color: 'teal',
                icon: <IconCheck size={ 18} />,
                autoClose: 6000,
      });
        form.reset();
    } catch (err: any) {
        setError(err.message || 'Failed to send message. Please try again.');
        notifications.show({
            title: 'Submission Error',
            message: err.message || 'Failed to send message. Please check your connection and try again.',
            color: 'red',
            icon: <IconX size={ 18} />,
      });
} finally {
    setLoading(false);
}
  };

return { loading, error, success, setError, setSuccess, handleSubmit };
} 