import { useState } from 'react';

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
                 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white 
                 border border-white/10 transition-all duration-200"
            title={`Copy ${label}`}
        >
            {copied ? (
                <>
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

function EmailSection({ title, content, icon, accentColor }) {
    if (!content) return null;

    return (
        <div className="glass rounded-xl p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${accentColor} flex items-center justify-center`}>
                        {icon}
                    </div>
                    <h3 className="font-semibold text-white">{title}</h3>
                </div>
                <CopyButton text={content} label={title} />
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed text-sm">
                    {content}
                </p>
            </div>
        </div>
    );
}

function SubjectsSection({ subjects }) {
    if (!subjects || subjects.length === 0) return null;

    return (
        <div className="glass rounded-xl p-5 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-white">Subject Lines</h3>
                </div>
                <CopyButton text={subjects.join('\n')} label="Subject Lines" />
            </div>
            <div className="space-y-2">
                {subjects.map((subject, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/5
                       hover:bg-white/10 transition-colors cursor-pointer group"
                        onClick={() => navigator.clipboard.writeText(subject)}
                    >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 
                           text-amber-400 text-xs font-semibold flex items-center justify-center">
                            {index + 1}
                        </span>
                        <span className="text-slate-300 text-sm flex-1">{subject}</span>
                        <svg className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
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
                <div key={i} className="glass rounded-xl p-5">
                    <div className="flex items-center gap-2.5 mb-4">
                        <div className="skeleton w-8 h-8 rounded-lg" />
                        <div className="skeleton h-5 w-32" />
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 space-y-2">
                        <div className="skeleton h-4 w-full" />
                        <div className="skeleton h-4 w-5/6" />
                        <div className="skeleton h-4 w-4/6" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="glass rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 
                      flex items-center justify-center">
                <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No emails generated yet</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
                Fill in the details on the left and click "Generate Emails" to create professional cold emails,
                follow-ups, and subject lines.
            </p>
        </div>
    );
}

export default function OutputPanel({ content, isLoading, error, warning }) {
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="glass rounded-xl p-6 border-l-4 border-red-500 animate-fade-in">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-400 mb-1">Error</h3>
                        <p className="text-slate-400 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!content || (!content.cold && !content.followup && content.subjects?.length === 0)) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-5">
            {warning && (
                <div className="glass rounded-xl px-4 py-3 border-l-4 border-amber-500 animate-fade-in">
                    <div className="flex items-center gap-2 text-amber-400 text-sm">
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
                accentColor="bg-gradient-to-br from-blue-500 to-cyan-600"
                icon={
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                }
            />

            <EmailSection
                title="Follow-up"
                content={content.followup}
                accentColor="bg-gradient-to-br from-emerald-500 to-teal-600"
                icon={
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                }
            />

            <SubjectsSection subjects={content.subjects} />
        </div>
    );
}
