"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="w-full py-12 md:py-20 lg:min-h-[70vh] p-4 lg:p-10 bg-base-100 flex items-center">
            <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center gap-10">

                {/* --- Image Side --- */}
                {/* Changed: Added w-full and responsive height h-[350px] md:h-[500px] */}
                <div className="w-full lg:w-1/2 flex gap-3 md:gap-4 h-[350px] md:h-[500px] lg:h-[550px]">

                    {/* Large Image (Left) */}
                    <motion.div
                        className="flex-[2] relative w-full h-full"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1628172828599-56338e9e1bb8?q=80&w=1200&auto=format&fit=crop"
                            className="object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-4 border-white"
                            alt="Professional Caregiving"
                            fill
                            priority
                            sizes="(max-width: 768px) 60vw, 40vw"
                        />
                    </motion.div>

                    {/* Right Side Small Images Column */}
                    <div className="flex flex-col gap-3 md:gap-4 flex-1 h-full">
                        <motion.div
                            className="flex-1 relative w-full"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1584515933487-9bfa05dcc445?q=80&w=600&auto=format&fit=crop"
                                className="object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-4 border-white"
                                alt="Sick Care"
                                fill
                                sizes="(max-width: 768px) 30vw, 20vw"
                            />
                        </motion.div>

                        <motion.div
                            className="flex-1 relative w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=600&auto=format&fit=crop"
                                className="object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-4 border-white"
                                alt="Elderly Care"
                                fill
                                sizes="(max-width: 768px) 30vw, 20vw"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* --- Text Side --- */}
                <div className="w-full lg:w-1/2 text-center lg:text-left px-2">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight text-neutral">
                            Reliable Hands, <br className="hidden md:block" />
                            <span className="text-primary">Peaceful Minds.</span>
                        </h1>
                        <p className="py-4 md:py-6 text-base md:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                            Find and hire professional caretakers for your loved ones.
                            Secure and accessible caregiving for everyone.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-4">
                            <button className="btn btn-primary btn-md md:btn-lg px-8 shadow-lg">
                                Find a Caretaker
                            </button>
                            <button className="btn btn-outline btn-md md:btn-lg px-8">
                                How it Works
                            </button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Banner;