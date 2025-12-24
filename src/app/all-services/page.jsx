import { getServices } from "@/actions/server/services";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "All Services | Care.IO",
    description: "Explore our wide range of caregiving services.",
};

const AllServicesPage = async () => {
    const services = await getServices();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-primary">Our Services</h1>
            </div>

            {services.length === 0 ? (
                <div className="text-center text-gray-500">No services available at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            <figure className="relative h-48 w-full">
                                <Image
                                    src={service.image || "https://i.ibb.co/4pDNDk1/placeholder.jpg"}
                                    alt={service.serviceName || "Service Image"}
                                    fill
                                    className="object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">{service.serviceName}</h2>
                                <p className="text-gray-600 line-clamp-3">{service.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-semibold text-secondary">
                                        ${service.price.amount}
                                    </span>
                                    <div className="flex gap-2">
                                        <Link href={`/services/${service._id}`} className="btn btn-outline btn-sm">
                                            View Details
                                        </Link>
                                        <Link href={`/booking/${service._id}`} className="btn btn-primary btn-sm">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllServicesPage;
