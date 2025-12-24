"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const email = e.target.email.value;
        const password = e.target.password.value;

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl,
        });

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push(callbackUrl);
            router.refresh();
        }
    };

    const handleGoogleLogin = () => {
        signIn("google", { callbackUrl });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

                    {error && (
                        <div className="alert alert-error text-sm py-2 mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email@example.com" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="********" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <button onClick={handleGoogleLogin} className="btn btn-outline btn-block gap-2">
                        <FaGoogle />
                        Sign in with Google
                    </button>

                    <label className="label justify-center mt-2">
                        <span className="label-text-alt">
                            Don't have an account? <Link href="/register" className="link link-hover text-primary">Register</Link>
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
