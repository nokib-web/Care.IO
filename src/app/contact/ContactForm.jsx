"use client";

import { useState } from "react";

const ContactForm = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setStatus("sending");
        setTimeout(() => {
            setStatus("sent");
            e.target.reset();
        }, 1500);
    };

    return (
        <div className="card bg-base-100/80 backdrop-blur-md shadow-2xl border border-base-content/5">
            <div className="card-body p-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                    Send us a Message
                </h2>
                <p className="text-gray-500 mb-6">We'd love to hear from you. Fill out the form below.</p>

                {status === "sent" ? (
                    <div className="alert alert-success shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Message sent successfully! We'll be in touch shortly.</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content/80">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. John Doe"
                                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content/80">Email Address</span>
                            </label>
                            <input
                                type="email"
                                placeholder="e.g. john@example.com"
                                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content/80">Subject</span>
                            </label>
                            <input
                                type="text"
                                placeholder="How can we help?"
                                className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-base-content/80">Message</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-32 bg-base-200/50 focus:bg-base-100 focus:border-primary transition-all duration-300"
                                placeholder="Tell us more about your needs..."
                                required
                            ></textarea>
                        </div>

                        <div className="form-control mt-8">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactForm;
