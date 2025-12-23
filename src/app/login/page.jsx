"use client";

import { loginUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = async (formData) => {
        const result = await loginUser(formData);
        if (result.success) {
            router.push("/"); // Redirect to home after successful login
            router.refresh(); // Refresh to update session state in navbar
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <form action={handleLogin} className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-4">Login</h1>

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

                    <label className="label justify-center mt-2">
                        <span className="label-text-alt">
                            Don't have an account? <Link href="/register" className="link link-hover text-primary">Register</Link>
                        </span>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
