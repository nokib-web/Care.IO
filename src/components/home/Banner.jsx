"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className="hero min-h-[80vh] p-10 bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse gap-10">

                {/* --- Image Side --- */}
                <div className="lg:w-1/2 flex gap-4 h-[500px]">
                    {/* Large Image (Left) */}
                    <motion.div
                        className="flex-1 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Image
                            src="https://i.ibb.co/kVK4BWM0/Baby-Sitting.jpg"
                            className="w-full h-full object-cover rounded-3xl shadow-2xl border-[6px] border-white"
                            alt="Professional Caregiving - Baby Sitting"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                        />
                    </motion.div>

                    {/* Right Side Small Images Column */}
                    <div className="flex flex-col gap-4 w-1/2">
                        <motion.div
                            className="flex-1 relative"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <Image
                                src="https://i.ibb.co/hFw5B98L/care-sick.jpg"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl border-[6px] border-white"
                                alt="Sick Care"
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        </motion.div>

                        <motion.div
                            className="flex-1 relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        >
                            <Image
                                src="https://i.ibb.co/WNWh1pmB/old-man-care.jpg"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl border-[6px] border-white"
                                alt="Elderly Care"
                                fill
                                sizes="(max-width: 768px) 100vw, 25vw"
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