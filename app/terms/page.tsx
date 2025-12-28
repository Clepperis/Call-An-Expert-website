export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

            <div className="prose prose-sm max-w-none space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">Service description</h2>
                    <p className="text-gray-700">
                        Last 20 provides a platform connecting users ("Clients") with technical experts ("Experts") for
                        15-minute video consultation sessions. The service is intended to help Clients resolve specific
                        technical blockers in their projects.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Payments</h2>
                    <p className="text-gray-700 mb-2">
                        Session fees are charged upfront via Stripe. By submitting a booking request and completing
                        payment, you agree to pay the stated session fee ($49 or as displayed).
                    </p>
                    <p className="text-gray-700">
                        Agency plans are annual one-time payments providing team access to the platform. Agency plan
                        fees are non-refundable except as required by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Refunds</h2>
                    <p className="text-gray-700">
                        Session refunds may be issued at our discretion in cases where we cannot match you with an
                        expert or where the session does not take place due to platform issues. We do not guarantee
                        specific outcomes or solutions to technical problems.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">User responsibilities</h2>
                    <p className="text-gray-700 mb-2">
                        Clients must:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Not upload API keys, passwords, or other sensitive credentials</li>
                        <li>Provide accurate information in booking requests</li>
                        <li>Treat experts with respect during sessions</li>
                        <li>Use the platform for legitimate technical assistance only</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Intellectual property & confidentiality</h2>
                    <p className="text-gray-700">
                        Code and context you share during sessions remains your property. Experts agree not to
                        redistribute or reuse client code. However, Last 20 is not liable for any inadvertent
                        disclosure or security issues arising from your uploads or screen sharing.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Data retention</h2>
                    <p className="text-gray-700">
                        Uploaded files are stored for up to 14 days and then deleted. Request data and session
                        history may be retained for accounting and support purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Limitation of liability</h2>
                    <p className="text-gray-700">
                        Last 20 provides a matching service. We do not guarantee that experts will solve your
                        problem or that advice given is error-free. Use of expert advice is at your own risk.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Changes to terms</h2>
                    <p className="text-gray-700">
                        We may update these terms from time to time. Continued use of the platform constitutes
                        acceptance of updated terms.
                    </p>
                </section>

                <p className="text-sm text-gray-600 mt-8">
                    Last updated: December 2024
                </p>
            </div>
        </div>
    );
}
