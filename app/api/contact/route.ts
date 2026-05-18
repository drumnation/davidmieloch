import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Updated Zod schema - REMOVED jobFile as it will be handled separately
const ContactFormSchema = z.object({
    // Core fields
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    company: z.string().optional(),
    topic: z.string().min(1, { message: 'Topic is required.' }),
    message: z.string().min(1, { message: 'Message cannot be empty.' }),
    _gotcha: z.string().optional(), // Honeypot field

    // Optional conditional fields (matching frontend structure)
    jobRole: z.string().optional(),
    jobCompensation: z.string().optional(),
    jobWhyMe: z.string().optional(),
    // jobFile is removed from schema, handled directly from FormData
    freelanceOverview: z.string().optional(),
    freelanceTimeline: z.string().optional(),
    freelanceBudget: z.string().optional(),
    pressEventName: z.string().optional(),
    pressTopic: z.string().optional(),
    pressTiming: z.string().optional(),
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '465', 10), // Default to 465 if not set
    secure: parseInt(process.env.SMTP_PORT || '465', 10) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Helper function to build email body parts
const buildEmailSection = (label: string, value: string | undefined | null): string => {
    return value ? `${label}: ${value}\n` : '';
};

const buildHtmlEmailSection = (label: string, value: string | undefined | null): string => {
    if (!value) return '';
    // Basic sanitization/escaping might be needed for HTML context depending on source
    const displayValue = value.replace(/\n/g, '<br>');
    return `<p><strong>${label}:</strong> ${displayValue}</p>`;
};

const getContactReceiverEmail = (): string | undefined => {
    return process.env.CONTACT_FORM_RECEIVER_EMAIL?.split(/\s+#/)[0]?.trim();
};

export async function POST(request: Request) {
    // Check required environment variables
    const contactReceiverEmail = getContactReceiverEmail();
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !contactReceiverEmail) {
        console.error('Missing required SMTP environment variables');
        return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    try {
        // Read the request body as FormData instead of JSON
        const formData = await request.formData();

        // Extract text fields from FormData
        const body: Record<string, any> = {};
        for (const [key, value] of formData.entries()) {
            // Skip the file field for Zod validation
            if (key !== 'jobFile') {
                body[key] = value;
            }
        }

        // Extract the file (if any)
        const jobFile = formData.get('jobFile') as File | null;

        // Validate honeypot first
        if (body._gotcha) {
            console.log('Honeypot field filled, likely a bot.');
            // Return a generic success to not alert the bot, but don't send email
            return NextResponse.json({ success: true });
        }

        // Validate the TEXT form data using the updated schema
        const validationResult = ContactFormSchema.safeParse(body);

        if (!validationResult.success) {
            console.error('Validation Errors:', validationResult.error.flatten());
            return NextResponse.json(
                { error: 'Invalid form data', details: validationResult.error.flatten().fieldErrors },
                { status: 400 },
            );
        }

        // Destructure all potential fields from the validated data
        const {
            name,
            email,
            message,
            topic,
            company,
            jobRole,
            jobCompensation,
            jobWhyMe,
            freelanceOverview,
            freelanceTimeline,
            freelanceBudget,
            pressEventName,
            pressTopic,
            pressTiming
        } = validationResult.data;

        // Construct email content dynamically based on provided fields
        let plainText = `Core Information:
`;
        plainText += buildEmailSection('Name', name);
        plainText += buildEmailSection('Email', email);
        plainText += buildEmailSection('Company', company);
        plainText += buildEmailSection('Topic', topic);
        plainText += buildEmailSection('Message', message);

        let htmlText = `<h2>Core Information:</h2>`;
        htmlText += buildHtmlEmailSection('Name', name);
        htmlText += buildHtmlEmailSection('Email', `<a href="mailto:${email}">${email}</a>`); // Link email
        htmlText += buildHtmlEmailSection('Company', company);
        htmlText += buildHtmlEmailSection('Topic', topic);
        htmlText += buildHtmlEmailSection('Message', message);

        // Add conditional sections to the email
        if (topic === 'Job Opportunity') {
            const section =
                buildEmailSection('Role/Title', jobRole) +
                buildEmailSection('Compensation', jobCompensation) +
                buildEmailSection('Why Me?', jobWhyMe);
            if (section) {
                plainText += `
Job Opportunity Details:
${section}`;
                htmlText += `<hr><h2>Job Opportunity Details:</h2>` +
                    buildHtmlEmailSection('Role/Title', jobRole) +
                    buildHtmlEmailSection('Compensation', jobCompensation) +
                    buildHtmlEmailSection('Why Me?', jobWhyMe);
            }
            // Add note about attachment if file exists
            if (jobFile) {
                plainText += buildEmailSection('Resume/JD', 'See attachment');
                htmlText += buildHtmlEmailSection('Resume/JD', 'See attachment');
            }
        } else if (topic === 'Freelance / Consulting') {
            const section =
                buildEmailSection('Project Overview', freelanceOverview) +
                buildEmailSection('Timeline', freelanceTimeline) +
                buildEmailSection('Budget', freelanceBudget);
            if (section) {
                plainText += `
Freelance / Consulting Details:
${section}`;
                htmlText += `<hr><h2>Freelance / Consulting Details:</h2>` +
                    buildHtmlEmailSection('Project Overview', freelanceOverview) +
                    buildHtmlEmailSection('Timeline', freelanceTimeline) +
                    buildHtmlEmailSection('Budget', freelanceBudget);
            }
        } else if (topic === 'Press / Speaking') {
            const section =
                buildEmailSection('Event/Publication', pressEventName) +
                buildEmailSection('Topic/Angle', pressTopic) +
                buildEmailSection('Timing/Deadline', pressTiming);
            if (section) {
                plainText += `
Press / Speaking Details:
${section}`;
                htmlText += `<hr><h2>Press / Speaking Details:</h2>` +
                    buildHtmlEmailSection('Event/Publication', pressEventName) +
                    buildHtmlEmailSection('Topic/Angle', pressTopic) +
                    buildHtmlEmailSection('Timing/Deadline', pressTiming);
            }
        }


        // Prepare mail options
        const mailOptions: nodemailer.SendMailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // Send FROM the configured user, but show sender's name
            replyTo: email, // Set Reply-To to the actual sender's email
            to: contactReceiverEmail, // The email address handled by Forward Email
            subject: `[New Contact] from ${name} about ${topic}`,
            text: plainText.trim(), // Trim whitespace
            html: htmlText, // Use dynamically generated HTML
            attachments: [], // Initialize attachments array
        };

        // Add attachment if file exists
        if (jobFile) {
            // Read file content into a buffer
            const fileBuffer = Buffer.from(await jobFile.arrayBuffer());
            mailOptions.attachments?.push({
                filename: jobFile.name,
                content: fileBuffer,
                contentType: jobFile.type, // Use the content type provided by the browser
            });
        }


        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Nodemailer Success: Message sent: %s', info.messageId);
            return NextResponse.json({ success: true });
        } catch (mailError) {
            console.error('Nodemailer Error sending mail:', mailError);
            return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
        }

    } catch (error) {
        console.error('API Route Error:', error);
        // Handle potential FormData parsing errors or other unexpected issues
        // Note: Specific error handling might need adjustment for FormData vs JSON
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
} 
