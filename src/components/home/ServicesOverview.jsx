import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServicesOverview = () => {
    const services = [
        {
            id: 1,
            title: "Baby Care",
            description: "Experienced babysitters to care for your little ones with love and patience.",
            image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "/all-services?category=baby-care"
        },
        {
            id: 2,
            title: "Elderly Care",
            description: "Compassionate companionship and assistance for senior family members.",
            image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "/all-services?category=elderly-care"
        },
        {
            id: 3,
            title: "Sick People Service",
            description: "Professional medical and personal support for those recovering from illness.",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: "/all-services?category=sick-care"
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-neutral">Our Core Services</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We offer specialized care tailored to the unique needs of every family member.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
                            <figure className="relative h-64 w-full">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h3 className="card-title text-2xl mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                <div className="card-actions">
                                    <Link href={service.link} className="btn btn-primary btn-outline px-8">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesOverview;
