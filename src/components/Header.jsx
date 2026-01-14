import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="font-semibold text-[var(--color-text-primary)]">Job Assistant</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {isHome && (
                            <>
                                <a
                                    href="#features"
                                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                >
                                    Features
                                </a>
                                <a
                                    href="#how-it-works"
                                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                                >
                                    How it Works
                                </a>
                            </>
                        )}
                    </nav>

                    {/* CTA */}
                    <Link
                        to="/generate"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === '/generate'
                                ? 'bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)]'
                                : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                            }`}
                    >
                        {location.pathname === '/generate' ? 'Generator' : 'Get Started'}
                    </Link>
                </div>
            </div>
        </header>
    );
}
