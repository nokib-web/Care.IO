import Link from "next/link";

export const metadata = {
    title: "Page Not Found | Care.IO",
};

export default function NotFound() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
                    <p className="py-6 text-gray-600">
                        Oops! The page you are looking for does not exist or has been moved.
                        Let's get you back on track.
                    </p>
                    <Link href="/" className="btn btn-primary px-8">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
