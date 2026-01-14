import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TONE_OPTIONS, DEFAULTS, parseGeneratedContent } from '../utils/constants';
import Footer from '../components/Footer';

function CopyButton({ text, label }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg
                 bg-[var(--color-bg)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] 
                 border border-[var(--color-border)] transition-all duration-200"
            title={`Copy ${label}`}
        >
            {copied ? (
                <>
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                </>
            ) : (
                <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                </>
            )}
        </button>
    );
}

function EmailSection({ title, content, icon }) {
    if (!content) return null;

    return (
        <div className="card animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="icon-container icon-blue">
                        {icon}
                    </div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">{title}</h3>
                </div>
                <CopyButton text={content} label={title} />
            </div>
            <div className="bg-[var(--color-bg)] rounded-lg p-4 border border-[var(--color-border)]">
                <p className="text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed text-sm">
                    {content}
                </p>
            </div>
        </div>
    );
}

function SubjectsSection({ subjects }) {
    if (!subjects || subjects.length === 0) return null;

    return (
        <div className="card animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="icon-container icon-yellow">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-[var(--color-text-primary)]">Subject Lines</h3>
                </div>
                <CopyButton text={subjects.join('\n')} label="Subject Lines" />
            </div>
            <div className="space-y-2">
                {subjects.map((subject, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 bg-[var(--color-bg)] rounded-lg px-4 py-3 border border-[var(--color-border)]
                       hover:border-[var(--color-text-muted)] transition-colors cursor-pointer group"
                        onClick={() => navigator.clipboard.writeText(subject)}
                    >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-yellow-tint)] 
                           text-yellow-600 text-xs font-semibold flex items-center justify-center">
                            {index + 1}
                        </span>
                        <span className="text-[var(--color-text-secondary)] text-sm flex-1">{subject}</span>
                        <svg className="w-4 h-4 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="card">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-border)] animate-pulse" />
                        <div className="h-5 w-32 bg-[var(--color-border)] rounded animate-pulse" />
                    </div>
                    <div className="bg-[var(--color-bg)] rounded-lg p-4 space-y-2">
                        <div className="h-4 bg-[var(--color-border)] rounded animate-pulse w-full" />
                        <div className="h-4 bg-[var(--color-border)] rounded animate-pulse w-5/6" />
                        <div className="h-4 bg-[var(--color-border)] rounded animate-pulse w-4/6" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="card text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[var(--color-purple-tint)] flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">No emails generated yet</h3>
            <p className="text-[var(--color-text-muted)] max-w-sm mx-auto text-sm">
                Fill in the details on the left and click "Generate Emails" to create professional cold emails,
                follow-ups, and subject lines.
            </p>
        </div>
    );
}

export default function Generate() {
    const [recipient, setRecipient] = useState(DEFAULTS.recipient);
    const [contextText, setContextText] = useState(DEFAULTS.contextText);
    const [tone, setTone] = useState(DEFAULTS.tone);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(null);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState(null);

    const isFormValid = contextText.trim().length > 0;

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!isFormValid || isLoading) return;

        setIsLoading(true);
        setError(null);
        setWarning(null);
        setContent(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recipient,
                    contextText,
                    tone,
                    modes: DEFAULTS.modes,
                }),
            });

            const rawText = await response.text();
            let data;
            try {
                data = JSON.parse(rawText);
            } catch {
                throw new Error('Invalid response from server. Please try again.');
            }

            if (!data.text) {
                throw new Error('No content received from server.');
            }

            const parsedContent = parseGeneratedContent(data.text);
            setContent(parsedContent);
            if (data.warning) setWarning(data.warning);

        } catch (err) {
            console.error('Generation error:', err);
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid-background min-h-screen">
            <div className="pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Page Header */}
                    <div className="mb-10">
                        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="heading-lg">Email Generator</h1>
                        <p className="text-body mt-2">Create professional cold emails, follow-ups, and subject lines.</p>
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Input Panel */}
                        <div className="card">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="icon-container icon-purple">
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Email Details</h2>
                            </div>

                            <form onSubmit={handleGenerate} className="space-y-5">
                                {/* Recipient */}
                                <div>
                                    <label htmlFor="recipient" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                        Recipient Name
                                    </label>
                                    <input
                                        type="text"
                                        id="recipient"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        placeholder="e.g., John Smith, Hiring Manager"
                                        className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl 
                               text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] 
                               focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all"
                                    />
                                </div>

                                {/* Context */}
                                <div>
                                    <label htmlFor="context" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                                        Context <span className="text-[var(--color-accent)]">*</span>
                                    </label>
                                    <textarea
                                        id="context"
                                        value={contextText}
                                        onChange={(e) => setContextText(e.target.value)}
                                        placeholder="Describe the situation, company, role, or why you're reaching out..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl 
                               text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] 
                               focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:border-[var(--color-accent)] transition-all resize-none"
                                    />
                                </div>

                                {/* Tone */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
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
                                                        ? 'bg-[var(--color-accent)] text-white'
                                                        : 'bg-[var(--color-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]'
                                                    }`}
                                            >
                                                <span className="mr-1.5">{option.icon}</span>
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={!isFormValid || isLoading}
                                    className={`w-full py-4 rounded-xl font-medium transition-all duration-300
                    ${isFormValid && !isLoading
                                            ? 'btn-primary'
                                            : 'bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed'
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

                        {/* Output Panel */}
                        <div>
                            {isLoading ? (
                                <LoadingSkeleton />
                            ) : error ? (
                                <div className="card border-l-4 border-red-500">
                                    <div className="flex items-start gap-3">
                                        <div className="icon-container bg-red-50">
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-red-600 mb-1">Error</h3>
                                            <p className="text-[var(--color-text-muted)] text-sm">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (!content || (!content.cold && !content.followup && content.subjects?.length === 0)) ? (
                                <EmptyState />
                            ) : (
                                <div className="space-y-5">
                                    {warning && (
                                        <div className="card border-l-4 border-yellow-500 py-3">
                                            <div className="flex items-center gap-2 text-yellow-600 text-sm">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {warning}
                                            </div>
                                        </div>
                                    )}

                                    <EmailSection
                                        title="Cold Email"
                                        content={content.cold}
                                        icon={<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>}
                                    />

                                    <EmailSection
                                        title="Follow-up"
                                        content={content.followup}
                                        icon={<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>}
                                    />

                                    <SubjectsSection subjects={content.subjects} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
