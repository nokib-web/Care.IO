import { getServiceById } from "@/actions/server/services";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

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

    if (!service) {
        notFound();
    }

    const serviceTitle = service.serviceName || service.title || "Service Detail";

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="card lg:card-side bg-base-100 shadow-xl max-w-5xl mx-auto overflow-hidden">
                <figure className="lg:w-1/2 relative min-h-[400px]">
                    <Image
                        src={service.image || "https://i.ibb.co/4pDNDk1/placeholder.jpg"}
                        alt={serviceTitle}
                        fill
                        className="object-cover"
                    />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h1 className="card-title text-4xl mb-4 text-primary">{serviceTitle}</h1>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {service.description}
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                            <span className="font-semibold text-lg">Price</span>
                            <span className="text-xl font-bold text-secondary">${service.price.amount}</span>
                        </div>
                        {/* Can add more details here if available in the future, e.g. duration, rating etc */}
                    </div>

                    <div className="card-actions justify-end mt-auto">
                        <Link href={`/booking/${service._id}`} className="btn btn-primary btn-lg w-full">
                            Book This Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;
