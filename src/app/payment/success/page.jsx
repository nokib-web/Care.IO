import Link from 'next/link';

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl text-center p-6">
                <div className="text-success text-6xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-success mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Thank you for your payment. Your booking is now confirmed.</p>

                <div className="card-actions justify-center">
                    <Link href="/user/dashboard" className="btn btn-primary">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
