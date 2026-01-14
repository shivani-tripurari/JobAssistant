import { useState } from 'react';
import { TONE_OPTIONS, DEFAULTS } from '../utils/constants';

export default function InputPanel({ onGenerate, isLoading }) {
    const [recipient, setRecipient] = useState(DEFAULTS.recipient);
    const [contextText, setContextText] = useState(DEFAULTS.contextText);
    const [tone, setTone] = useState(DEFAULTS.tone);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) return;

        onGenerate({
            recipient,
            contextText,
            tone,
            modes: DEFAULTS.modes,
        });
    };

    const isFormValid = contextText.trim().length > 0;

    return (
        <div className="glass rounded-2xl p-6 md:p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Email Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Recipient Input */}
                <div>
                    <label
                        htmlFor="recipient"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        Recipient Name
                    </label>
                    <input
                        type="text"
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="e.g., John Smith, Hiring Manager"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                       text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                    />
                </div>

                {/* Context Textarea */}
                <div>
                    <label
                        htmlFor="context"
                        className="block text-sm font-medium text-slate-300 mb-2"
                    >
                        Context <span className="text-violet-400">*</span>
                    </label>
                    <textarea
                        id="context"
                        value={contextText}
                        onChange={(e) => setContextText(e.target.value)}
                        placeholder="Describe the situation, company, role, or why you're reaching out..."
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl 
                       text-white placeholder-slate-500 focus:outline-none focus:ring-2 
                       focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
                    />
                </div>

                {/* Tone Selection */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                        Tone
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {TONE_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setTone(option.id)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${tone === option.id
                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                <span className="mr-1.5">{option.icon}</span>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Generate Button */}
                <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300
            ${isFormValid && !isLoading
                            ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5'
                            : 'bg-slate-700 cursor-not-allowed opacity-50'
                        }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Generate Emails
                        </span>
                    )}
                </button>
            </form>
        </div>
    );
}
