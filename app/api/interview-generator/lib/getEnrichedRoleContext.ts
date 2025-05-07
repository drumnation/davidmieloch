import OpenAI from 'openai';
import staticRoleMap from './staticRoleEnrichments';

// Helper function to check if a role title is too vague to be useful without enrichment
const isVague = (title: string) => {
    const vagueTerms = ['developer', 'engineer', 'tech lead', 'programmer', 'hacker', 'architect'];
    const words = title.toLowerCase().split(/\s+/);
    return words.length < 3 || vagueTerms.some(term => words.includes(term));
};

export async function getEnrichedRoleContext(role: string): Promise<string> {
    try {
        // Handle undefined or empty roles
        if (!role || typeof role !== 'string') {
            console.warn('Invalid role provided to getEnrichedRoleContext:', role);
            return '';
        }

        const normalized = role.toLowerCase().trim();

        // Check static map first (fastest)
        if (staticRoleMap[normalized]) {
            return staticRoleMap[normalized];
        }

        // If role is detailed enough, skip enrichment
        if (!isVague(normalized)) {
            return '';
        }

        // Initialize OpenAI client
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const prompt = `
You are an expert technical hiring manager.

Describe 3–5 high-context responsibilities or challenges specific to the role of "${role}" in a modern tech company. 
Focus on what this role is accountable for, common tradeoffs they face, and types of systems or decisions they lead. 
Format your response as a clean Markdown list.
`;

        // Make API call with timeout handling
        const response = await Promise.race([
            openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.5
            }),
            new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error('OpenAI enrichment timed out')), 5000)
            )
        ]) as OpenAI.Chat.Completions.ChatCompletion;

        const content = response.choices[0]?.message.content?.trim() || '';
        return content;
    } catch (error) {
        // Handle errors gracefully without failing the whole request
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error("Error in getEnrichedRoleContext:", errorMsg);

        // Return empty string on error to allow the process to continue
        return '';
    }
} 