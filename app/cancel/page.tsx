import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export default function CancelPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <Alert variant="warning" className="mb-6">
                <h2 className="text-xl font-bold mb-2">Payment cancelled</h2>
                <p>You cancelled the payment. No charges were made.</p>
            </Alert>

            <div className="text-center">
                <p className="mb-6 text-gray-700">
                    Ready to try again? We're here to help you get unstuck.
                </p>
                <Link href="/book">
                    <Button size="lg">Back to booking</Button>
                </Link>
            </div>
        </div>
    );
}
