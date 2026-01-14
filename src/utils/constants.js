// Tone options for email generation
export const TONE_OPTIONS = [
    { id: 'professional', label: 'Professional', icon: '💼' },
    { id: 'casual', label: 'Casual', icon: '😊' },
    { id: 'friendly', label: 'Friendly', icon: '🤝' },
];

// Default values
export const DEFAULTS = {
    recipient: '',
    contextText: '',
    tone: 'professional',
    modes: ['cold', 'followup', 'subjects'],
};

// Parse the structured response from the API
export function parseGeneratedContent(text) {
    const sections = {
        cold: '',
        followup: '',
        subjects: [],
    };

    if (!text) return sections;

    // Extract COLD section
    const coldMatch = text.match(/===COLD===\s*([\s\S]*?)(?====FOLLOWUP===|===SUBJECTS===|$)/i);
    if (coldMatch) {
        sections.cold = coldMatch[1].trim();
    }

    // Extract FOLLOWUP section
    const followupMatch = text.match(/===FOLLOWUP===\s*([\s\S]*?)(?====COLD===|===SUBJECTS===|$)/i);
    if (followupMatch) {
        sections.followup = followupMatch[1].trim();
    }

    // Extract SUBJECTS section
    const subjectsMatch = text.match(/===SUBJECTS===\s*([\s\S]*?)(?====COLD===|===FOLLOWUP===|$)/i);
    if (subjectsMatch) {
        const subjectLines = subjectsMatch[1].trim().split('\n').filter(line => line.trim());
        sections.subjects = subjectLines.map(line => line.replace(/^[-•*]\s*/, '').trim());
    }

    return sections;
}
