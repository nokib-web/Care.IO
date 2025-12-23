import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ service }) => {
  if (!service) return null;

  const { title, image, description, price, slug } = service;

  return (
    <div className="card bg-base-100 shadow-xl border border-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <figure className="px-4 pt-4 overflow-hidden">
        <div className="relative w-full h-48 overflow-hidden rounded-xl">
          <Image
            src={image || "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2070&auto=format&fit=crop"}
            alt={title || "Service"}
            fill
            unoptimized={true}
            className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary font-bold">{title || "Untitled Service"}</h2>
        <p className="text-gray-600 line-clamp-2 text-sm">{description || "No description available."}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xl font-bold text-secondary">
            {price?.currency === "USD" ? "$" : ""}{price?.amount || 0}/{price?.rateType || "service"}
          </span>
          <Link href={`/all-services/${service._id}`}>
            <button className="btn btn-primary btn-sm px-6">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;