const steps = [
    {
        number: '01',
        title: 'Enter your context',
        description: 'Tell us about the role, company, and recipient. The more context, the better the output.',
        illustration: '/illustration-typing.png',
        illustrationAlt: 'Person typing on computer',
    },
    {
        number: '02',
        title: 'Choose your tone',
        description: 'Pick between professional, casual, or friendly. Match the company culture.',
        illustration: '/illustration-megaphone.png',
        illustrationAlt: 'Hand holding megaphone',
    },
    {
        number: '03',
        title: 'Generate instantly',
        description: 'Get a cold email, follow-up, and subject lines — ready to copy and send.',
        illustration: '/illustration-highfive.png',
        illustrationAlt: 'Two hands high-fiving',
    },
];

export default function HowItWorks() {
    return (
        <section className="section" id="how-it-works">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="heading-lg mb-4">How it works</h2>
                    <p className="text-body max-w-2xl mx-auto">
                        Three simple steps to craft the perfect outreach email
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-24 left-1/2 w-full h-px bg-[var(--color-border)]"></div>
                            )}

                            <div className="relative bg-white rounded-2xl p-8 border border-[var(--color-border)] text-center">
                                {/* Step number badge */}
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)] text-white text-sm font-semibold">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Illustration */}
                                <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                                    <img
                                        src={step.illustration}
                                        alt={step.illustrationAlt}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>

                                <h3 className="heading-md text-lg mb-2">{step.title}</h3>
                                <p className="text-small">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
