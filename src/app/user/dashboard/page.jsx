import { getUserBookings } from "@/actions/server/bookings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const UserDashboard = async () => {
    const session = await getServerSession(authOptions);
    const bookings = await getUserBookings();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
                <div>
                    <h1 className="text-3xl font-bold text-neutral">
                        Welcome back, <span className="text-primary">{session?.user?.name || "User"}</span>!
                    </h1>
                    <p className="text-gray-500 mt-1">Manage your care services and profile here.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Link href="/all-services" className="btn btn-primary">
                        Book New Service
                    </Link>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content: Recent Bookings (taking up 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4 flex justify-between">
                                <span>Active Bookings</span>
                                <Link href="/my-bookings" className="text-sm font-normal text-primary hover:underline">
                                    View All
                                </Link>
                            </h2>

                            {bookings.length === 0 ? (
                                <div className="text-center py-8 bg-base-100 rounded-lg border border-dashed border-gray-300">
                                    <p className="text-gray-500 mb-2">No active bookings found.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr className="bg-base-200">
                                                <th>Service</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.slice(0, 5).map((booking) => (
                                                <tr key={booking._id}>
                                                    <td className="font-bold">{booking.serviceName}</td>
                                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                                    <td>
                                                        <div className={`badge ${booking.status === 'Pending' ? 'badge-warning' :
                                                            booking.status === 'Confirmed' ? 'badge-success' : 'badge-ghost'
                                                            } badge-sm`}>
                                                            {booking.status}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Link href={`/my-bookings`} className="btn btn-xs btn-ghost">
                                                            Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Profile & Quick Stats */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Profile Card */}
                    <div className="card bg-white shadow-xl border border-base-200">
                        <div className="card-body items-center text-center">
                            <div className="avatar placeholder mb-4">
                                <div className="bg-neutral text-neutral-content rounded-full w-24">
                                    <span className="text-3xl">{session?.user?.name?.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                            <h2 className="card-title">{session.user.name}</h2>
                            <p className="text-gray-500">{session.user.email}</p>
                            <div className="card-actions mt-4 w-full">
                                <button className="btn btn-outline btn-sm w-full">Edit Profile</button>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="stats stats-vertical w-full shadow-xl bg-primary text-primary-content">
                        <div className="stat">
                            <div className="stat-title text-primary-content/80">Total Bookings</div>
                            <div className="stat-value">{bookings.length}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title text-primary-content/80">Pending</div>
                            <div className="stat-value text-2xl">
                                {bookings.filter(b => b.status === "Pending").length}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;
