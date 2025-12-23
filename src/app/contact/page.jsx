import ContactForm from "./ContactForm";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export const metadata = {
    title: "Contact Us | Care.IO",
    description: "Get in touch with Care.IO for any inquiries or support.",
};

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-base-200 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-b-[50%] scale-x-150 translate-y-[-150px] -z-0"></div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-secondary font-bold tracking-wider uppercase text-sm">Got Questions?</span>
                    <h1 className="text-5xl font-extrabold mt-2 mb-4 text-base-content">
                        Contact <span className="text-primary">Care.IO</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        We're here to help and answer any question you might have. We look forward to hearing from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-8 lg:sticky lg:top-24">
                        <div className="card bg-base-100 shadow-xl border-l-4 border-primary">
                            <div className="card-body">
                                <h2 className="card-title text-3xl mb-6 font-bold">Get in Touch</h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            <FaMapMarkerAlt className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Visit Us</h3>
                                            <p className="text-gray-500 group-hover:text-primary transition-colors">123 Care Avenue, Dhaka, Bangladesh</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                                            <FaPhoneAlt className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Call Us</h3>
                                            <p className="text-gray-500 group-hover:text-secondary transition-colors">+880 123 456 7890</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                            <FaEnvelope className="text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Email Us</h3>
                                            <p className="text-gray-500 group-hover:text-accent transition-colors">support@care.io</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
