import { Link } from 'react-router-dom';

export default function CTA() {
    return (
        <section className="section bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="relative overflow-hidden rounded-3xl bg-[var(--color-text-primary)] px-8 py-16 md:px-16 md:py-20">
                    {/* Subtle grid overlay */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    ></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Content */}
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to land your dream job?
                            </h2>
                            <p className="text-lg text-gray-400 max-w-xl">
                                Stop spending hours crafting emails. Let AI do the heavy lifting
                                while you focus on preparing for interviews.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <Link
                            to="/generate"
                            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-text-primary)] font-medium rounded-xl hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            Start Generating Emails
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
