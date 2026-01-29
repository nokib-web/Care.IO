import { getUserBookings } from "@/actions/server/bookings";
import Link from "next/link";
import CancelBookingButton from "@/components/buttons/CancelBookingButton";
import PaymentButton from "@/components/buttons/PaymentButton";

const MyBookingsPage = async () => {
    const bookings = await getUserBookings();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500 mb-4">You have no bookings yet.</p>
                    <Link href="/all-services" className="btn btn-primary">
                        Browse Services
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover">
                                    <td>
                                        <div className="font-bold">{booking.serviceName}</div>
                                    </td>
                                    <td>
                                        {new Date(booking.bookingDate).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div>{booking.location.area}, {booking.location.city}</div>
                                        <div className="text-xs opacity-70">{booking.location.district}, {booking.location.division}</div>
                                        <div className="text-sm opacity-50 mt-1">{booking.location.address}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">${booking.totalCost}</div>
                                        <div className="text-xs opacity-70">
                                            ({booking.duration} hrs @ ${booking.pricePerUnit}/hr)
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`badge ${booking.status === 'Pending' ? 'badge-warning' :
                                            booking.status === 'Confirmed' ? 'badge-success' : 'badge-ghost'
                                            }`}>
                                            {booking.status}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 items-center">
                                            <Link href={`/services/${booking.serviceId}`} className="btn btn-ghost btn-xs">
                                                View Details
                                            </Link>
                                            {(booking.paymentStatus === 'Unpaid' || !booking.paymentStatus) && booking.status !== 'Cancelled' && (
                                                <PaymentButton bookingId={booking._id} />
                                            )}
                                            {booking.paymentStatus === 'Paid' && (
                                                <span className="badge badge-success badge-sm">Paid</span>
                                            )}
                                            {booking.status === 'Pending' && (
                                                <CancelBookingButton bookingId={booking._id} />
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;
