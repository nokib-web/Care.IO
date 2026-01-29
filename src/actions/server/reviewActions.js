"use server";

import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function addReview(serviceId, rating, comment) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return { error: "You must be logged in to leave a review." };
    }

    if (!rating || rating < 1 || rating > 5) {
        return { error: "Please provide a valid rating between 1 and 5." };
    }

    try {
        const db = await dbconnect();
        const reviewsCollection = db.collection("reviews");

        // Optional: Check if user has already reviewed this service
        const sId = ObjectId.isValid(serviceId) ? new ObjectId(serviceId) : serviceId;

        const existingReview = await reviewsCollection.findOne({
            serviceId: sId,
            userId: new ObjectId(session.user.id),
        });

        if (existingReview) {
            return { error: "You have already reviewed this service." };
        }

        const newReview = {
            serviceId: sId,
            userId: new ObjectId(session.user.id),
            userName: session.user.name,
            userImage: session.user.image, // Optional if available
            rating: parseInt(rating),
            comment,
            createdAt: new Date(),
        };

        await reviewsCollection.insertOne(newReview);

        revalidatePath(`/services/${serviceId}`);
        return { success: true };
    } catch (error) {
        console.error("Add Review Error:", error);
        return { error: error.message }; // Return actual error
    }
}

export async function getServiceReviews(serviceId) {
    try {
        const db = await dbconnect();
        const reviewsCollection = db.collection("reviews");

        const sId = ObjectId.isValid(serviceId) ? new ObjectId(serviceId) : serviceId;

        const reviews = await reviewsCollection
            .find({ serviceId: sId })
            .sort({ createdAt: -1 })
            .toArray();

        // Calculate average
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

        return {
            reviews: reviews.map(r => ({ ...r, _id: r._id.toString(), serviceId: r.serviceId.toString(), userId: r.userId.toString() })),
            averageRating,
            totalReviews: reviews.length
        };
    } catch (error) {
        console.error("Get Reviews Error:", error);
        return { reviews: [], averageRating: 0, totalReviews: 0 };
    }
}
