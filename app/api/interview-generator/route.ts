import OpenAI from 'openai';
import { getEnrichedRoleContext } from './lib/getEnrichedRoleContext.ts';
import { masterPrompt } from './prompts/masterPrompt';

export const runtime = 'edge';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Add type interface at the top of the file
interface InterviewInputs {
    roleTitle: string;
    domainFocus: string;
    projectContext: string;
    aiMaturityLevel: string;
    assessmentFormat: string;
    timeLimit: string;
    canUseAiTools?: boolean;
    teamFluencyLevel?: string;
}

export async function POST(request: Request) {
    try {
        // Validate request content type
        const contentType = request.headers.get('Content-Type') || '';
        if (!contentType.includes('application/json')) {
            return new Response(
                JSON.stringify({
                    error: 'Invalid Content-Type. Expected application/json'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Parse and validate inputs with error handling
        let inputs: InterviewInputs;
        try {
            const body = await request.json();
            inputs = body.inputs as InterviewInputs;

            if (!inputs) {
                throw new Error('Missing required "inputs" field in request body');
            }

            // Validate required fields
            const requiredFields = [
                'roleTitle', 'domainFocus', 'projectContext',
                'aiMaturityLevel', 'assessmentFormat', 'timeLimit'
            ] as const;

            const missingFields = requiredFields.filter(field => !inputs[field]);
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }
        } catch (parseError) {
            console.error('Error parsing request:', parseError);
            return new Response(
                JSON.stringify({
                    error: 'Invalid request format',
                    details: parseError instanceof Error ? parseError.message : 'Failed to parse JSON body'
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Get enriched role context
        const enrichedRoleContext = await getEnrichedRoleContext(inputs.roleTitle);

        // Format the inputs for the prompt
        const promptContent = formatPromptWithInputs(masterPrompt, inputs, enrichedRoleContext);

        // Call OpenAI API with streaming
        const response = await openai.chat.completions.create({
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
            stream: true,
        });

        // Create a TransformStream to process the OpenAI response
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const content = chunk.choices?.[0]?.delta?.content || '';
                    controller.enqueue(encoder.encode(content));
                }
                controller.close();
            }
        });

        // Return the stream with explicit text/plain content type
        // This helps browsers and clients handle the content appropriately
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        });
    } catch (error) {
        console.error('Error generating interview:', error);

        // Return error as JSON with proper content type
        return new Response(
            JSON.stringify({
                error: 'Failed to generate interview',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }
}

function formatPromptWithInputs(masterPrompt: string, inputs: InterviewInputs, enrichedRoleContext: string): string {
    // Create a formatted string from the inputs that can be used in the prompt
    const {
        roleTitle,
        domainFocus,
        projectContext,
        aiMaturityLevel,
        assessmentFormat,
        timeLimit,
        canUseAiTools = false,
        teamFluencyLevel = 'novice'
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

export async function GET() {
    return new Response(
        JSON.stringify({ message: 'Please use POST method with required inputs' }),
        {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
} 