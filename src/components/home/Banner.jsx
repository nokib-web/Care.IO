"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="w-full min-h-[50vh] p-10 bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                {/* --- Image Side --- */}
                <div className="lg:w-1/2 flex gap-4 h-[400px] lg:h-[550px]">
                    {/* Large Image (Left) */}
                    <motion.div
                        className="flex-[2] relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Image
                            src="https://i.ibb.co.com/kVK4BWM0/Baby-Sitting.jpg"
                            className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white"
                            alt="Professional Caregiving - Baby Sitting"
                            fill
                            sizes="(max-width: 768px) 66vw, 33vw"
                            priority
                        />
                    </motion.div>

                    {/* Right Side Small Images Column */}
                    <div className="flex flex-col gap-4 flex-1">
                        <motion.div
                            className="flex-1 relative"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <Image
                                src="https://i.ibb.co.com/hFw5B98L/care-sick.jpg"
                                className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white"
                                alt="Sick Care"
                                fill
                                sizes="(max-width: 768px) 33vw, 16vw"
                            />
                        </motion.div>

                        <motion.div
                            className="flex-1 relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=600&auto=format&fit=crop"
                                className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white"
                                alt="Elderly Care"
                                fill
                                sizes="(max-width: 768px) 33vw, 16vw"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* --- Text Side --- */}
                <div className="lg:w-1/2 text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-neutral">
                            Reliable Hands, <br />
                            <motion.span
                                className="text-primary inline-block"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                Peaceful Minds.
                            </motion.span>
                        </h1>
                        <p className="py-6 text-lg text-gray-600 max-w-lg leading-relaxed">
                            Find and hire professional caretakers for your loved ones.
                            Whether it is expert <span className="font-semibold text-neutral">elderly care</span> or nurturing <span className="font-semibold text-neutral">babysitting</span>,
                            we make caregiving easy, secure, and accessible for everyone.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                className="btn btn-primary btn-lg px-8 shadow-lg shadow-primary/30"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Find a Caretaker
                            </motion.button>
                            <motion.button
                                className="btn btn-outline btn-lg px-8"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                How it Works
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Banner;