import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <section className="section pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Content */}
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-grey-tint)] text-sm text-[var(--color-text-secondary)] mb-6">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
                            Your AI-powered job hunt companion
                        </div>

                        <h1 className="heading-xl mb-6">
                            Land your dream job with{' '}
                            <span className="underline decoration-[var(--color-border)] decoration-4 underline-offset-4">AI assistance</span>
                        </h1>

                        <p className="text-body mb-8 max-w-lg">
                            From cold emails to follow-ups, Job Assistant helps you craft
                            professional outreach that gets responses. Your personal AI
                            companion throughout the entire job hunt journey.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/generate" className="btn-primary">
                                Start Writing Emails
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <a href="#how-it-works" className="btn-secondary">
                                See How It Works
                            </a>
                        </div>
                    </div>

                    {/* Right: Illustration */}
                    <div className="animate-fade-in-up hidden md:flex justify-center" style={{ animationDelay: '0.2s' }}>
                        <img
                            src="/illustration-team.png"
                            alt="Two people working together on a laptop"
                            className="max-w-md w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
