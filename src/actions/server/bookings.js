"use server";

import { dbconnect } from "@/lib/dbconnect";
import { getSession } from "./auth";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const createBooking = async (formData) => {
    const session = await getSession();
    if (!session) {
        return { success: false, message: "Unauthorized. Please login." };
    }

    const serviceId = formData.get("serviceId");
    const serviceName = formData.get("serviceName");
    const priceAmount = parseFloat(formData.get("priceAmount"));
    const duration = parseInt(formData.get("duration"));
    const division = formData.get("division");
    const district = formData.get("district");
    const address = formData.get("address");
    const date = formData.get("date"); // User selected date

    if (!duration || !address || !date) {
        return { success: false, message: "Please fill all required fields." };
    }

    const totalCost = priceAmount * duration;

    const newBooking = {
        userId: new ObjectId(session.userId),
        userName: session.name,
        userEmail: session.email,
        serviceId: ObjectId.isValid(serviceId) ? new ObjectId(serviceId) : serviceId,
        serviceName,
        pricePerUnit: priceAmount,
        duration,
        totalCost,
        location: {
            division,
            district,
            address,
        },
        bookingDate: new Date(date),
        status: "Pending",
        createdAt: new Date(),
    };

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");
        await bookingsCollection.insertOne(newBooking);

        revalidatePath("/my-bookings");
        return { success: true, message: "Booking confirmed!" };
    } catch (error) {
        console.error("Booking Error:", error);
        return { success: false, message: "Failed to book service." };
    }
};

export const getUserBookings = async () => {
    const session = await getSession();
    if (!session) return [];

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");

        const rawBookings = await bookingsCollection
            .find({ userId: new ObjectId(session.userId) })
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
        console.error("Fetch Bookings Error:", error);
        return [];
    }
}
