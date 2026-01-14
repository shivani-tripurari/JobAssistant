const features = [
    {
        icon: (
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        iconBg: 'icon-blue',
        title: 'AI-Powered Writing',
        description: 'Leverage advanced AI to craft compelling emails that capture attention and get responses.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        iconBg: 'icon-green',
        title: 'Structured Emails',
        description: 'Get perfectly formatted cold emails, follow-ups, and subject lines — all in one place.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
        ),
        iconBg: 'icon-purple',
        title: 'Tone Customization',
        description: 'Choose between professional, casual, or friendly tones to match your personal style.',
    },
    {
        icon: (
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        iconBg: 'icon-yellow',
        title: 'Follow-up Ready',
        description: 'Never miss an opportunity with AI-generated follow-ups and multiple subject line options.',
    },
];

export default function Features() {
    return (
        <section className="section bg-white" id="features">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="heading-lg mb-4">Everything you need to succeed</h2>
                    <p className="text-body max-w-2xl mx-auto">
                        Job hunting is hard enough. Let AI handle your outreach
                        while you focus on what matters — preparing for interviews.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`icon-container ${feature.iconBg} mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="heading-md text-lg mb-2">{feature.title}</h3>
                            <p className="text-small">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
