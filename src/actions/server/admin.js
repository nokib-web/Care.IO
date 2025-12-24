"use server";

import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

/**
 * Fetches all bookings to display as payment history for admins.
 * Returns an array of booking objects with serialized IDs.
 */
export const getPaymentHistory = async () => {
    // Ideally, check for admin role here. 
    // For now, we'll check session existence, but in a real app, strict role checks are needed.
    const session = await getServerSession(authOptions);
    if (!session) return [];

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");

        const rawBookings = await bookingsCollection
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Serialize
        return rawBookings.map(b => ({
            ...JSON.parse(JSON.stringify(b)),
            _id: b._id.toString(),
            userId: b.userId.toString(),
            serviceId: b.serviceId.toString(),
        }));
    } catch (error) {
        console.error("Fetch All Bookings Error:", error);
        return [];
    }
};

/**
 * Calculates aggregate statistics for the admin dashboard.
 */
export const getAdminStats = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return { totalRevenue: 0, totalBookings: 0, totalUsers: 0 };

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");
        const usersCollection = db.collection("users");

        const totalBookings = await bookingsCollection.countDocuments();
        const totalUsers = await usersCollection.countDocuments();

        // Calculate total revenue
        const revenueResult = await bookingsCollection.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalCost" }
                }
            }
        ]).toArray();

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        return {
            totalRevenue,
            totalBookings,
            totalUsers
        };
    } catch (error) {
        console.error("Fetch Stats Error:", error);
        return { totalRevenue: 0, totalBookings: 0, totalUsers: 0 };
    }
};
