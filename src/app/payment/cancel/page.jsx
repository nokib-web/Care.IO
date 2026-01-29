import Link from 'next/link';

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl text-center p-6">
                <div className="text-error text-6xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-error mb-2">Payment Cancelled</h2>
                <p className="text-gray-600 mb-6">You cancelled the payment process. Your booking remains unpaid.</p>

                <div className="card-actions justify-center">
                    <Link href="/user/dashboard" className="btn btn-outline">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
