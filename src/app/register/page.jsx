"use client";

import { registerUser } from "@/actions/server/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();

    const handleRegister = async (formData) => {
        const result = await registerUser(formData);
        if (result.success) {
            router.push("/login"); // Redirect to login after successful registration
        } else {
            alert(result.message); // Simple error feedback
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <form action={handleRegister} className="card-body">
                    <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" placeholder="Your Name" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">NID</span>
                        </label>
                        <input name="nid" type="text" placeholder="National ID" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contact No</span>
                        </label>
                        <input name="contact" type="text" placeholder="Mobile Number" className="input input-bordered" required />
                    </div>

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
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>

                    <label className="label justify-center mt-2">
                        <span className="label-text-alt">
                            Already have an account? <Link href="/login" className="link link-hover text-primary">Login</Link>
                        </span>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
