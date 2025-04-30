'use client';

import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import {
    TextInput,
    Textarea,
    Select,
    Button,
    Card,
    Stack,
    Container,
    Group,
    Notification,
    FileInput,
    Title,
    Input,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { CiMail } from 'react-icons/ci';
import {
    LuUser, LuMail, LuBuilding2, LuCircleHelp, LuMessageSquare, LuFileText,
    LuBriefcase, LuDollarSign, LuTarget, LuClipboardList, LuCalendarClock,
    LuPiggyBank, LuMegaphone, LuPencil, LuAlarmClock
} from 'react-icons/lu';

// Zod schema including all possible fields (most are optional)
const ContactFormSchema = z.object({
    // Core fields
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    company: z.string().optional(),
    topic: z.string().min(1, { message: 'Please select a topic.' }),
    message: z.string().min(1, { message: 'Message cannot be empty.' }),
    _gotcha: z.string().optional(), // Honeypot field

    // Conditional: Job Opportunity
    jobRole: z.string().optional(),
    jobCompensation: z.string().optional(),
    jobWhyMe: z.string().optional(),
    jobFile: z.instanceof(File).optional(), // Keep type for potential future use

    // Conditional: Freelance / Consulting
    freelanceOverview: z.string().optional(),
    freelanceTimeline: z.string().optional(),
    freelanceBudget: z.string().optional(),

    // Conditional: Press / Speaking
    pressEventName: z.string().optional(),
    pressTopic: z.string().optional(),
    pressTiming: z.string().optional(),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

const TOPIC_OPTIONS = [
    { value: 'Job Opportunity', label: 'Job Opportunity' },
    { value: 'Freelance / Consulting', label: 'Freelance / Consulting' },
    { value: 'Press / Speaking', label: 'Press / Speaking' },
    { value: 'Just Saying Hi', label: 'Just Saying Hi' },
];

const TIMELINE_OPTIONS = [
    { value: 'Immediate', label: 'Immediate (within days/weeks)' },
    { value: 'Soon', label: 'Soon (within 1-2 months)' },
    { value: 'Exploratory', label: 'Exploratory (flexible timeline)' },
];

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const form = useForm<ContactFormValues>({
        initialValues: {
            // Core
            name: '',
            email: '',
            company: '',
            topic: '',
            message: '',
            _gotcha: '',
            // Job
            jobRole: '',
            jobCompensation: '',
            jobWhyMe: '',
            jobFile: undefined,
            // Freelance
            freelanceOverview: '',
            freelanceTimeline: '',
            freelanceBudget: '',
            // Press
            pressEventName: '',
            pressTopic: '',
            pressTiming: '',
        },
        validate: zodResolver(ContactFormSchema),
    });

    const handleSubmit = async (values: ContactFormValues) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Create FormData
        const formData = new FormData();

        // Append all fields (text and file) to FormData
        Object.entries(values).forEach(([key, value]) => {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== undefined && value !== null && value !== '') {
                // Append non-empty text fields
                formData.append(key, value as string);
            }
        });

        // Ensure honeypot is appended even if empty
        if (!formData.has('_gotcha')) {
            formData.append('_gotcha', '');
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                // Remove JSON headers, browser sets multipart/form-data automatically
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // Send the FormData object as the body
                body: formData,
            });

            const result = await response.json();

            if (!response.ok || result.error) {
                throw new Error(result.error || 'An error occurred.');
            }

            setSuccess(true);
            notifications.show({
                title: 'Message Sent!',
                // Updated success message
                message: 'Thanks — your message is now propagating through the system 🌱',
                color: 'teal',
                icon: <IconCheck size={18} />,
                autoClose: 6000, // Slightly longer display for the nice message
            });
            form.reset(); // Reset form on success

        } catch (err: any) {
            setError(err.message || 'Failed to send message. Please try again.');
            notifications.show({
                title: 'Submission Error',
                message: err.message || 'Failed to send message. Please check your connection and try again.',
                color: 'red',
                icon: <IconX size={18} />,
            });
        } finally {
            setLoading(false);
        }
    };

    // Get the current topic to conditionally render fields
    const selectedTopic = form.values.topic;

    return (
        <Container size="sm" py="xl" mb={100}>
            <Card shadow="sm" p={{ base: 'lg', md: 'xl' }} radius="md" withBorder>
                {success ? (
                    <Notification
                        icon={<IconCheck size={18} />}
                        color="teal"
                        title="Message Sent!"
                        onClose={() => setSuccess(false)}
                        mb="lg"
                    >
                        ✅ Thanks! I'll review your message personally. I usually reply within a day or two.
                        <br /><br />
                        In the meantime, feel free to check out my <a href="/bio">bio & experience</a> or read some <a href="/blog">blog articles</a>.
                    </Notification>
                ) : null}

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="lg">
                        {/* --- Core Fields --- */}
                        <TextInput style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} {...form.getInputProps('_gotcha')} />

                        <Input.Wrapper
                            withAsterisk
                            label="Your name"
                        >
                            <TextInput
                                leftSection={<LuUser size="1rem" />}
                                placeholder="Your name"
                                {...form.getInputProps('name')}
                            />
                        </Input.Wrapper>

                        <Input.Wrapper
                            withAsterisk
                            label="Email"
                        >
                            <TextInput
                                leftSection={<LuMail size="1rem" />}
                                placeholder="your@email.com"
                                type="email"
                                {...form.getInputProps('email')}
                            />
                        </Input.Wrapper>

                        <Input.Wrapper
                            label="Company / Organization"
                        >
                            <TextInput
                                leftSection={<LuBuilding2 size="1rem" />}
                                placeholder="Your company or organization"
                                {...form.getInputProps('company')}
                            />
                        </Input.Wrapper>

                        <Input.Wrapper
                            withAsterisk
                            label="What's this about?"
                        >
                            <Select
                                leftSection={<LuCircleHelp size="1rem" />}
                                placeholder="Pick one"
                                data={TOPIC_OPTIONS}
                                {...form.getInputProps('topic')}
                                searchable
                            />
                        </Input.Wrapper>

                        <Input.Wrapper
                            withAsterisk
                            label="Message"
                        >
                            <Textarea
                                leftSection={<LuMessageSquare size="1rem" />}
                                placeholder="Your message"
                                autosize
                                minRows={3}
                                {...form.getInputProps('message')}
                                styles={{
                                    section: {
                                        alignSelf: 'flex-start',
                                        paddingTop: 'calc(var(--_input-padding-y, var(--mantine-spacing-xs)) + 1px)',
                                    },
                                }}
                            />
                        </Input.Wrapper>

                        {/* --- Conditional Fields --- */}

                        {/* Job Opportunity Fields */}
                        {selectedTopic === 'Job Opportunity' && (
                            <Stack gap="md" mt="lg" p="lg" style={{ border: '1px dashed var(--mantine-color-gray-3)', borderRadius: 'var(--mantine-radius-md)', background: 'var(--mantine-color-gray-0)' }}>
                                <Title order={4} c="dimmed">Job Opportunity Details</Title>
                                <Input.Wrapper label="Upload Resume / JD (Optional - PDF/DOCX)">
                                    <FileInput
                                        leftSection={<LuFileText size="1rem" />}
                                        placeholder="Select file (Max 5MB)"
                                        accept=".pdf,.docx"
                                        {...form.getInputProps('jobFile')}
                                        clearable
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="What's the role/title?">
                                    <TextInput
                                        leftSection={<LuBriefcase size="1rem" />}
                                        placeholder="e.g., Senior Frontend Engineer"
                                        {...form.getInputProps('jobRole')}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Compensation range or budget? (Optional)">
                                    <TextInput
                                        leftSection={<LuDollarSign size="1rem" />}
                                        placeholder="e.g., $150k-$180k, or project budget"
                                        {...form.getInputProps('jobCompensation')}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Why me? (Optional)">
                                    <Textarea
                                        leftSection={<LuTarget size="1rem" />}
                                        placeholder="Anything specific about my background that fits? Paste relevant details here."
                                        autosize
                                        minRows={2}
                                        {...form.getInputProps('jobWhyMe')}
                                    />
                                </Input.Wrapper>
                            </Stack>
                        )}

                        {/* Freelance / Consulting Fields */}
                        {selectedTopic === 'Freelance / Consulting' && (
                            <Stack gap="md" mt="lg" p="lg" style={{ border: '1px dashed var(--mantine-color-gray-3)', borderRadius: 'var(--mantine-radius-md)', background: 'var(--mantine-color-gray-0)' }}>
                                <Title order={4} c="dimmed">Freelance / Consulting Details</Title>
                                <Input.Wrapper label="Project overview">
                                    <Textarea
                                        leftSection={<LuClipboardList size="1rem" />}
                                        placeholder="Briefly describe the project or problem."
                                        autosize
                                        minRows={3}
                                        {...form.getInputProps('freelanceOverview')}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Timeline / urgency">
                                    <Select
                                        leftSection={<LuCalendarClock size="1rem" />}
                                        placeholder="Select urgency"
                                        data={TIMELINE_OPTIONS}
                                        {...form.getInputProps('freelanceTimeline')}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Budget range (Optional)">
                                    <TextInput
                                        leftSection={<LuPiggyBank size="1rem" />}
                                        placeholder="e.g., $5k-$10k, hourly rate, etc."
                                        {...form.getInputProps('freelanceBudget')}
                                    />
                                </Input.Wrapper>
                            </Stack>
                        )}

                        {/* Press / Speaking Fields */}
                        {selectedTopic === 'Press / Speaking' && (
                            <Stack gap="md" mt="lg" p="lg" style={{ border: '1px dashed var(--mantine-color-gray-3)', borderRadius: 'var(--mantine-radius-md)', background: 'var(--mantine-color-gray-0)' }}>
                                <Title order={4} c="dimmed">Press / Speaking Details</Title>
                                <Input.Wrapper label="Event / publication name">
                                    <TextInput
                                        leftSection={<LuMegaphone size="1rem" />}
                                        placeholder="e.g., Tech Conference 2024, Feature Article"
                                        {...form.getInputProps('pressEventName')}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Topic / angle">
                                    <Textarea
                                        leftSection={<LuPencil size="1rem" />}
                                        placeholder="What topic or angle are you interested in?"
                                        autosize
                                        minRows={2}
                                        {...form.getInputProps('pressTopic')}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Deadline or timing">
                                    <TextInput
                                        leftSection={<LuAlarmClock size="1rem" />}
                                        placeholder="e.g., End of July, Event date"
                                        {...form.getInputProps('pressTiming')}
                                    />
                                </Input.Wrapper>
                            </Stack>
                        )}

                        {/* --- Submit Button --- */}
                        <Group justify="flex-end" mt="xl">
                            <Button
                                type="submit"
                                loading={loading}
                                fullWidth
                                size="md"
                                radius="md"
                                variant="gradient"
                                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                            >
                                <Group gap="xs" justify="center" wrap="nowrap">
                                    Let's Connect
                                    <CiMail size="1.2rem" />
                                </Group>
                            </Button>
                        </Group>

                        {/* Moved Error Notification Here */}
                        {error && !loading ? (
                            <Notification
                                icon={<IconX size={18} />}
                                color="red"
                                title="Submission Error"
                                onClose={() => setError(null)}
                                mt="lg" // Add some margin top
                            >
                                {error}
                            </Notification>
                        ) : null}
                    </Stack>
                </form>
            </Card>
        </Container>
    );
} 