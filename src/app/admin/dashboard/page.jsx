import { getPaymentHistory, getAdminStats } from "@/actions/server/admin";
import { FaMoneyBillWave, FaUsers, FaCalendarCheck } from "react-icons/fa";

export const metadata = {
    title: "Admin Dashboard | Care.IO",
};

const AdminDashboard = async () => {
    const payments = await getPaymentHistory();
    const stats = await getAdminStats();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="stats shadow-xl bg-gradient-to-r from-primary to-primary/80 text-white">
                    <div className="stat">
                        <div className="stat-figure text-white/80">
                            <FaMoneyBillWave className="text-4xl" />
                        </div>
                        <div className="stat-title text-white/90">Total Revenue</div>
                        <div className="stat-value text-4xl">${stats.totalRevenue.toFixed(2)}</div>
                        <div className="stat-desc text-white/70">Lifetime earnings</div>
                    </div>
                </div>

                <div className="stats shadow-xl bg-white text-base-content border border-base-200">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCalendarCheck className="text-4xl" />
                        </div>
                        <div className="stat-title">Total Bookings</div>
                        <div className="stat-value text-secondary">{stats.totalBookings}</div>
                        <div className="stat-desc">All time bookings</div>
                    </div>
                </div>

                <div className="stats shadow-xl bg-white text-base-content border border-base-200">
                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <FaUsers className="text-4xl" />
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value text-accent">{stats.totalUsers}</div>
                        <div className="stat-desc">Registered users</div>
                    </div>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-6">Payment Histories</h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr className="bg-base-200">
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Service</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length > 0 ? (
                                    payments.map((payment, index) => (
                                        <tr key={payment._id} className="hover">
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="font-bold">{payment.userName}</div>
                                                <div className="text-xs opacity-50">{payment.userEmail}</div>
                                            </td>
                                            <td>
                                                <div className="badge badge-ghost badge-sm mr-2">{payment.serviceName}</div>
                                                <span className="text-xs">{payment.duration} hrs</span>
                                            </td>
                                            <td className="font-mono text-primary font-bold">
                                                ${payment.totalCost.toFixed(2)}
                                            </td>
                                            <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <span className={`badge ${payment.status === 'Completed' ? 'badge-success' :
                                                        payment.status === 'Pending' ? 'badge-warning' : 'badge-neutral'
                                                    } gap-2`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-8 text-gray-500">
                                            No payment records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
