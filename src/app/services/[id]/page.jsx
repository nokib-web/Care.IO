import { getServiceById } from "@/actions/server/services";
import { getServiceReviews } from "@/actions/server/reviewActions";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewList from "@/components/reviews/ReviewList";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const service = await getServiceById(id);
    const title = service?.serviceName || service?.title || "Service";
    return {
        title: service ? `${title} - Details` : "Service Details",
        description: service?.description || "Service details page",
    };
}


const ServiceDetailsPage = async ({ params }) => {
    const { id } = await params;
    const service = await getServiceById(id);
    const { reviews, averageRating, totalReviews } = await getServiceReviews(id);

    if (!service) {
        notFound();
    }

    const serviceTitle = service.serviceName || service.title || "Service Detail";

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Left Column: Service Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="card bg-base-100 shadow-xl overflow-hidden">
                        <figure className="relative h-[400px]">
                            <Image
                                src={service.image || "https://i.ibb.co/4pDNDk1/placeholder.jpg"}
                                alt={serviceTitle}
                                fill
                                className="object-cover"
                            />
                        </figure>
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <h1 className="card-title text-4xl mb-4 text-primary">{serviceTitle}</h1>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 bg-base-200 px-3 py-1 rounded-full">
                                        <span className="text-yellow-500 font-bold text-lg">★</span>
                                        <span className="font-bold">{averageRating}</span>
                                        <span className="text-xs text-gray-500">({totalReviews})</span>
                                    </div>
                                    <span className="text-2xl font-bold text-secondary mt-2">${service.price.amount}</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="card-actions">
                                <Link href={`/booking/${service._id}`} className="btn btn-primary btn-lg w-full">
                                    Book This Service
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div id="reviews">
                        <ReviewList reviews={reviews} />
                    </div>
                </div>

                {/* Right Column: Write a Review & Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <ReviewForm serviceId={id} />

                        {/* Additional Info / CTA */}
                        {/* <div className="card bg-base-200 mt-8">
                            <div className="card-body">
                                <h3 className="font-bold text-lg">Need Help?</h3>
                                <p>Contact support for more details about this service.</p>
                                <button className="btn btn-outline btn-sm">Contact Support</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;
