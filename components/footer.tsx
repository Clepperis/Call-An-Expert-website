import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                        © 2025 Last 20. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-sm">
                        <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                            Privacy
                        </Link>
                        <a href="mailto:support@last20.com" className="text-gray-600 hover:text-gray-900">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
