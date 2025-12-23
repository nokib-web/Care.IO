import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className="hero min-h-[80vh]  p-10">
            <div className="hero-content flex-col lg:flex-row-reverse ">

                {/* Image Side */}
                <div className="lg:w-1/2 flex gap-2">

                    {/* Large Image (Left) */}
                    <div className="flex-1">
                        <Image
                            src="https://i.ibb.co/kVK4BWM0/Baby-Sitting.jpg"
                            className="w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-white"
                            alt="Professional Caregiving"
                            width={600}
                            height={400}
                        />
                    </div>

                    {/* Right Side Small Images */}
                    <div className="flex flex-col gap-4 w-1/2">
                        <Image
                            src="https://i.ibb.co/hFw5B98L/care-sick.jpg"
                            className="w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-white"
                            alt="Professional Caregiving"
                            width={300}
                            height={200}
                        />

                        <Image
                            src="https://i.ibb.co/WNWh1pmB/old-man-care.jpg"
                            className="w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-white"
                            alt="Professional Caregiving"
                            width={300}
                            height={200}
                        />
                    </div>
                </div>


                {/* Text Side */}
                <div className="lg:w-1/2 text-left">

                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-neutral">
                        Reliable Hands, <br />
                        <span className="text-primary">Peaceful Minds.</span>
                    </h1>
                    <p className="py-2 text-lg text-gray-600 max-w-lg">
                        Find and hire professional caretakers for your loved ones.
                        Whether it is expert elderly care or nurturing babysitting,
                        we make caregiving easy, secure, and accessible for everyone.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="btn btn-primary btn-lg px-8">Find a Caretaker</button>
                        <button className="btn btn-outline btn-lg px-8">How it Works</button>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Banner;