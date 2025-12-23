import { getServiceById } from "@/actions/server/services";
import { getSession } from "@/actions/server/auth";
import BookingForm from "./BookingForm";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
    const service = await getServiceById(params.id);
    return {
        title: service ? `Book ${service.serviceName}` : "Booking",
    };
}

const BookingPage = async ({ params }) => {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    const { id } = await params;
    const service = await getServiceById(id);

    if (!service) {
        return <div className="text-center text-error mt-10">Service not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <BookingForm service={service} user={session} />
        </div>
    );
};

export default BookingPage;
