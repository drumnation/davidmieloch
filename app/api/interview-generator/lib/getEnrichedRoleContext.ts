import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import staticRoleMap from './staticRoleEnrichments';

// Ensure the cache directory exists
const cacheDir = path.resolve(process.cwd(), 'app/api/interview-generator/cache'); // Corrected path
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

const cachePath = path.resolve(cacheDir, 'roleEnrichmentCache.json');
let cache: Record<string, string> = {};

try {
    if (fs.existsSync(cachePath)) {
        cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    }
} catch (error) {
    console.error("Error reading role enrichment cache:", error);
    cache = {};
}

// Helper function to check if a role title is too vague to be useful without enrichment
const isVague = (title: string) => {
    const vagueTerms = ['developer', 'engineer', 'tech lead', 'programmer', 'hacker', 'architect'];
    const words = title.toLowerCase().split(/\s+/);
    return words.length < 3 || vagueTerms.some(term => words.includes(term));
};

export async function getEnrichedRoleContext(role: string): Promise<string> {
    const normalized = role.toLowerCase().trim();

    if (staticRoleMap[normalized]) return staticRoleMap[normalized];
    if (cache[normalized]) return cache[normalized];
    if (!isVague(normalized)) return ''; // Role is detailed enough — skip enrichment

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are an expert technical hiring manager.

Describe 3–5 high-context responsibilities or challenges specific to the role of "${role}" in a modern tech company. 
Focus on what this role is accountable for, common tradeoffs they face, and types of systems or decisions they lead. 
Format your response as a clean Markdown list.
`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5
        });

        const content = response.choices[0]?.message.content?.trim() || '';
        if (content) {
            cache[normalized] = content;
            try {
                fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
            } catch (writeError) {
                console.error("Error writing role enrichment cache:", writeError);
            }
        }
        return content;
    } catch (apiError) {
        console.error("Error fetching enriched role context from OpenAI:", apiError);
        return '';
    }
} 