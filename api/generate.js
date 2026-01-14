/**
 * Vercel Serverless Function for generating emails using Google Gemini API
 * POST /api/generate
 */

// Fallback content when Gemini API is unavailable
const FALLBACK_CONTENT = `===COLD===
Hi there,

I came across your profile and was impressed by your work. I'd love to connect and explore potential opportunities to collaborate.

Looking forward to hearing from you!

Best regards

===FOLLOWUP===
Hi again,

Just following up on my previous email. I wanted to reiterate my interest in connecting with you.

Would you be available for a brief call this week?

Best regards

===SUBJECTS===
Quick Introduction - Potential Collaboration
Following Up on My Previous Message
Let's Connect - Exciting Opportunity
Brief Introduction`;

/**
 * Build the prompt for Gemini API
 */
function buildPrompt(contextText, recipient, tone) {
    return `You are a professional email writer. Generate email content based on the following details.

RECIPIENT: ${recipient || 'the recipient'}
CONTEXT: ${contextText || 'Professional outreach'}
TONE: ${tone || 'Professional'}

Generate the following sections with EXACT delimiters:

===COLD===
Write a cold outreach email (3-5 lines). Be concise, professional, and personalized based on the context.

===FOLLOWUP===
Write a follow-up email (3-4 lines). Reference the previous outreach and express continued interest.

===SUBJECTS===
Generate 4 subject line options, one per line. Make them engaging and relevant to the context.

IMPORTANT:
- Keep emails short and impactful
- Use the specified tone throughout
- Include the recipient's name if provided
- Each section MUST start with the exact delimiter (===COLD===, ===FOLLOWUP===, ===SUBJECTS===)`;
}

/**
 * Call Gemini API
 */
async function callGeminiAPI(prompt, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [{ text: prompt }]
                }
            ]
        }),
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract text from Gemini response
    if (data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]) {
        return data.candidates[0].content.parts[0].text;
    }

    throw new Error('Invalid Gemini response structure');
}

/**
 * Main handler
 */
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(200).json({
            text: FALLBACK_CONTENT,
            error: 'Method not allowed, returning demo content'
        });
    }

    try {
        const { contextText, recipient, tone, modes } = req.body || {};

        // Get API key from environment
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn('GEMINI_API_KEY not configured, returning fallback content');
            return res.status(200).json({
                text: FALLBACK_CONTENT,
                warning: 'API key not configured, showing demo content'
            });
        }

        // Build prompt
        const prompt = buildPrompt(contextText, recipient, tone);

        // Call Gemini API
        const generatedText = await callGeminiAPI(prompt, apiKey);

        // Return successful response
        return res.status(200).json({ text: generatedText });

    } catch (error) {
        console.error('Error generating content:', error.message);

        // Always return 200 with fallback content
        return res.status(200).json({
            text: FALLBACK_CONTENT,
            warning: 'AI service temporarily unavailable, showing demo content'
        });
    }
}
