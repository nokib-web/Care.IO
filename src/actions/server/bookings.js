"use server";

import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const createBooking = async (formData) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return { success: false, message: "Unauthorized. Please login." };
    }

    const serviceId = formData.get("serviceId");
    const serviceName = formData.get("serviceName");
    const priceAmount = parseFloat(formData.get("priceAmount"));
    const duration = parseInt(formData.get("duration"));
    const division = formData.get("division");
    const district = formData.get("district");
    const city = formData.get("city");
    const area = formData.get("area");
    const address = formData.get("address");
    const date = formData.get("date");

    if (!duration || !address || !date) {
        return { success: false, message: "Please fill all required fields." };
    }

    const totalCost = priceAmount * duration;

    const newBooking = {
        userId: new ObjectId(session.user.id),
        userName: session.user.name,
        userEmail: session.user.email,
        serviceId: ObjectId.isValid(serviceId) ? new ObjectId(serviceId) : serviceId,
        serviceName,
        pricePerUnit: priceAmount,
        duration,
        totalCost,
        location: {
            division,
            district,
            city,
            area,
            address,
        },
        bookingDate: new Date(date),
        status: "Pending",
        createdAt: new Date(),
    };

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");
        const result = await bookingsCollection.insertOne(newBooking);

        // Send Invoice Email
        // We use the insertedId or just rely on the newBooking object (which doesn't have _id yet until insertion result)
        // Best to use newBooking and add the id if needed, or just pass newBooking as is (it has everything else)
        // newBooking._id = result.insertedId; // Add ID to object for email

        // Optimistic email sending (don't block response) or await it? 
        // Awaiting it ensures user knows if it failed, but might be slow. 
        // For this task, let's await it to be safe or catch errors so it doesn't fail the booking.

        try {
            // Import dynamically or at top? Top is better.
            const { sendInvoiceEmail } = await import("@/lib/email");
            await sendInvoiceEmail({ ...newBooking, _id: result.insertedId });
        } catch (emailError) {
            console.error("Failed to send email invoice:", emailError);
            // We don't fail the booking if email fails, just log it.
        }

        revalidatePath("/my-bookings");
        return { success: true, message: "Booking confirmed! Invoice sent to your email." };
    } catch (error) {
        console.error("Booking Error:", error);
        return { success: false, message: "Failed to book service." };
    }
};

export const getUserBookings = async () => {
    const session = await getServerSession(authOptions);
    if (!session) return [];

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");

        const rawBookings = await bookingsCollection
            .find({ userId: new ObjectId(session.user.id) })
            .sort({ createdAt: -1 })
            .toArray();

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

export const cancelBooking = async (bookingId) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");

        const result = await bookingsCollection.updateOne(
            { _id: new ObjectId(bookingId), userId: new ObjectId(session.user.id) },
            { $set: { status: "Cancelled" } }
        );

        if (result.modifiedCount === 0) {
            return { success: false, message: "Booking not found or already cancelled." };
        }

        revalidatePath("/my-bookings");
        return { success: true, message: "Booking cancelled successfully." };
    } catch (error) {
        console.error("Cancel Booking Error:", error);
        return { success: false, message: "Failed to cancel booking." };
    }
};
