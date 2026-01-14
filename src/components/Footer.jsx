import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-12 border-t border-[var(--color-border)]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="font-semibold text-[var(--color-text-primary)]">Job Assistant</span>
                    </div>

                    {/* Links */}
                    <nav className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
                        <Link to="/generate" className="hover:text-[var(--color-text-primary)] transition-colors">
                            Generator
                        </Link>
                        <a
                            href="https://github.com/shivani-tripurari/JobAssistant"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://shivani-tripurari.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="mailto:shivanit1229@gmail.com"
                            className="hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-[var(--color-text-muted)]">
                        © 2025 Job Assistant
                    </p>
                </div>
            </div>
        </footer>
    );
}
