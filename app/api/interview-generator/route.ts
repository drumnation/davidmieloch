import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { getEnrichedRoleContext } from './lib/getEnrichedRoleContext.ts';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { inputs } = await request.json();

        // Load the master prompt
        const masterPromptPath = path.join(process.cwd(), 'src/components/InterviewGenerator/prompts/master-prompt.mdc');
        const masterPrompt = fs.readFileSync(masterPromptPath, 'utf8');

        // Get enriched role context
        const enrichedRoleContext = await getEnrichedRoleContext(inputs.roleTitle);

        // Format the inputs for the prompt
        const promptContent = formatPromptWithInputs(masterPrompt, inputs, enrichedRoleContext);

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are an expert technical interviewer who creates AI-native interview challenges."
                },
                {
                    role: "user",
                    content: promptContent
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        // Extract the generated markdown from the response
        const markdown = completion.choices[0].message.content ||
            generateFallbackMarkdown(inputs);

        // Store the result for future reference
        storeGeneratedInterview(inputs.roleTitle, markdown);

        return NextResponse.json({ markdown }, { status: 200 });
    } catch (error) {
        console.error('Error generating interview:', error);
        return NextResponse.json(
            { error: 'Failed to generate interview' },
            { status: 500 }
        );
    }
}

function formatPromptWithInputs(masterPrompt: string, inputs: any, enrichedRoleContext: string): string {
    // Create a formatted string from the inputs that can be used in the prompt
    const {
        roleTitle,
        domainFocus,
        projectContext,
        aiMaturityLevel,
        assessmentFormat,
        timeLimit,
        canUseAiTools,
        teamFluencyLevel
    } = inputs;

    let roleContextSection = '';
    if (enrichedRoleContext && enrichedRoleContext.trim() !== '') {
        roleContextSection = `
## Role Context Details:
${enrichedRoleContext}
`;
    }

    return `${masterPrompt}
${roleContextSection}
GENERATE AN AI-NATIVE INTERVIEW CHALLENGE WITH THE FOLLOWING PARAMETERS:

Role Title: ${roleTitle}
Domain Focus: ${domainFocus}
Project Context: ${projectContext}
AI Maturity Level: ${aiMaturityLevel}
Assessment Format: ${assessmentFormat}
Time Limit: ${timeLimit}
AI Tools Allowed: ${canUseAiTools ? 'Yes' : 'No'}
Team AI Fluency Level: ${teamFluencyLevel}

Please create a complete interview challenge following the template and principles described above.`;
}

function storeGeneratedInterview(roleTitle: string, markdown: string) {
    try {
        // Create a slug from the role title
        const slug = roleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${slug}-${timestamp}.md`;

        // Ensure directory exists
        const dirPath = path.join(process.cwd(), '.interviews/roles');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write file
        fs.writeFileSync(path.join(dirPath, fileName), markdown);
    } catch (error) {
        console.error('Failed to store interview:', error);
        // Non-critical operation, so we just log the error
    }
}

function generateFallbackMarkdown(inputs: any): string {
    // Fallback in case the OpenAI call fails
    const {
        roleTitle,
        domainFocus,
        projectContext,
        aiMaturityLevel,
        assessmentFormat,
        timeLimit,
        canUseAiTools,
        teamFluencyLevel
    } = inputs;

    return `# AI-Native Interview Challenge
# ${roleTitle}

## Overview

This challenge is designed to assess candidates for the ${roleTitle} role, focusing on ${domainFocus}.

### Context
${projectContext}

### Challenge Parameters
- **AI Maturity Level:** ${aiMaturityLevel}
- **Format:** ${assessmentFormat}
- **Time Limit:** ${timeLimit}
- **AI Tools Allowed:** ${canUseAiTools ? 'Yes' : 'No'}
- **Team AI Fluency:** ${teamFluencyLevel}

## Challenge Description
[API call failed - please regenerate the challenge]

## Evaluation Rubric
[API call failed - please regenerate the challenge]

## Interviewer Notes
[API call failed - please regenerate the challenge]
`;
}

export async function GET() {
    return NextResponse.json(
        { message: 'Please use POST method with required inputs' },
        { status: 405 }
    );
} 