import Image from "next/image";
import React from "react";

const About = () => {
    return (
        <section className="py-12 bg-base-200">
            <div className=" mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-neutral">
                            Compassionate Care, <span className="text-primary">Close to Home</span>
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            At Care.IO, our mission is simple: to provide accessible, trusted, and professional care for every family member.
                            We believe that quality of life shouldn't be compromised when life gets busy or health challenges arise.
                        </p>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            From nurturing your little ones to providing dignified support for the elderly and specialized attention for the sick,
                            our network of verified caregivers is dedicated to ensuring peace of mind for you and safety for your loved ones.
                        </p>
                        <button className="btn btn-primary">Learn More About Us</button>
                    </div>

                    {/* Image Content */}
                    <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
                        {/* Added min-h and relative to ensure mobile browsers reserve space */}
                        <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Caregiver holding hands"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority // Helps with loading speed on mobile
                            />
                        </div>

                        {/* Floating Badge - Adjusted for better mobile positioning */}
                        <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-xl shadow-lg z-10">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="bg-primary/10 p-2 md:p-3 rounded-full text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-base md:text-xl text-neutral">100% Verified</p>
                                    <p className="text-xs md:text-sm text-gray-500">Professional Caregivers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
