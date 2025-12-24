import React from "react";
import Image from "next/image";

const Testimonials = () => {
    const stats = [
        { title: "Happy Families", value: "500+", icon: "👨‍👩‍👧‍👦" },
        { title: "Verified Caretakers", value: "120+", icon: "🛡️" },
        { title: "Hours of Care", value: "10k+", icon: "⏰" },
        { title: "User Rating", value: "4.9/5", icon: "⭐" },
    ];

    const reviews = [
        {
            id: 1,
            name: "Emily Johnson",
            role: "Mother of 2",
            comment: "Care.IO has been a lifesaver! I found a wonderful babysitter for my twins within hours. Highly recommended.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Son of elderly patient",
            comment: "The caregiver provided for my father was incredibly professional and kind. It gave us such peace of mind.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        },
        {
            id: 3,
            name: "Sarah Williams",
            role: "Working Professional",
            comment: "Excellent service. The platform is easy to use and the vetting process for caregivers is thorough.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
        }
    ];

    return (
        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4">

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat bg-white shadow-lg rounded-xl text-center p-6">
                            <div className="text-4xl mb-2">{stat.icon}</div>
                            <div className="stat-value text-primary">{stat.value}</div>
                            <div className="stat-title font-medium text-gray-600">{stat.title}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Section */}
                <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-neutral">
                    What Our Users Say
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="card bg-base-100 shadow-xl p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="avatar">
                                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <Image src={review.image} alt={review.name} width={64} height={64} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{review.name}</h4>
                                    <p className="text-sm text-gray-500">{review.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{review.comment}"</p>
                            <div className="mt-4 flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
