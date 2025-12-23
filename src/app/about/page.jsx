export const metadata = {
    title: "About Us | Care.IO",
    description: "Learn more about Care.IO and our mission to provide reliable caregiving services.",
};

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">About Care.IO</h1>
                    <p className="text-xl text-gray-600">
                        Providing professional and reliable caregiving services since 1992.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-secondary">Our Mission</h2>
                            <p>
                                To ensure every individual receives the care, respect, and dignity they deserve
                                through our network of verified and compassionate caregivers.
                            </p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-secondary">Our Vision</h2>
                            <p>
                                To be the leading platform for caregiving services, setting the standard for
                                quality, safety, and accessibility in the care industry.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-base-200 p-8 rounded-xl mt-12">
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            Founded in 1992, Care.IO began with a simple idea: finding reliable care shouldn't be a struggle.
                            What started as a small local service has grown into a trusted platform connecting thousands of
                            families with professional caregivers.
                        </p>
                        <p>
                            We understand that inviting a caregiver into your home is a big decision. That's why we've
                            built a rigorous verification process and a platform that prioritizes transparency and trust.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats shadow w-full mt-12 text-center">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">Years of Service</div>
                        <div className="stat-value">30+</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">Happy Families</div>
                        <div className="stat-value">50k+</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div className="stat-title">Caregivers</div>
                        <div className="stat-value">1,200+</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
