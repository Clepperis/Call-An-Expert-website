export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-sm max-w-none space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">Information we collect</h2>
                    <p className="text-gray-700 mb-2">
                        We collect the following information:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Account information (name, email) via Google or GitHub OAuth</li>
                        <li>Booking request details (problem description, tags, repo URLs, logs)</li>
                        <li>Uploaded files (zip archives)</li>
                        <li>Payment information processed by Stripe (we do not store credit card details)</li>
                        <li>Expert application data (name, email, bio, skills)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">How we use your information</h2>
                    <p className="text-gray-700 mb-2">
                        We use your information to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Match you with appropriate experts</li>
                        <li>Process payments</li>
                        <li>Send confirmation and notification emails</li>
                        <li>Improve the platform</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Data sharing</h2>
                    <p className="text-gray-700">
                        We share your request details with matched experts to facilitate sessions. We use third-party
                        services including Stripe (payments), Resend (email), Google/GitHub (authentication), and hosting
                        providers. We do not sell your personal information.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Data retention</h2>
                    <p className="text-gray-700">
                        Uploaded files are automatically deleted after 14 days. Account data and booking history are
                        retained as long as your account is active and for a reasonable period afterward for
                        accounting purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Your rights</h2>
                    <p className="text-gray-700">
                        You have the right to access, correct, or delete your personal information. Contact us at
                        support@last20.com to exercise these rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Cookies</h2>
                    <p className="text-gray-700">
                        We use essential cookies for authentication and session management via NextAuth.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Security</h2>
                    <p className="text-gray-700">
                        We use industry-standard security practices to protect your data. However, no system is
                        completely secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">Changes to this policy</h2>
                    <p className="text-gray-700">
                        We may update this privacy policy from time to time. We will notify you of significant
                        changes via email.
                    </p>
                </section>

                <p className="text-sm text-gray-600 mt-8">
                    Last updated: December 2024
                </p>
            </div>
        </div>
    );
}
