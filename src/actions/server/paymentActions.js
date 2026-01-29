"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createStripeCheckoutSession(bookingId) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return { error: "Unauthorized" };
    }

    try {
        const db = await dbconnect();
        const bookingsCollection = db.collection("bookings");

        const booking = await bookingsCollection.findOne({
            _id: new ObjectId(bookingId),
            userId: new ObjectId(session.user.id),
        });

        if (!booking) {
            return { error: "Booking not found" };
        }

        if (booking.paymentStatus === "Paid") {
            return { error: "Booking is already paid" };
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: booking.serviceName || "Care Service",
                            metadata: {
                                serviceId: booking.serviceId ? booking.serviceId.toString() : "unknown",
                            },
                        },
                        unit_amount: Math.round(booking.totalCost * 100), // Stripe expects cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/payment/cancel`,
            metadata: {
                bookingId: booking._id.toString(),
                userId: session.user.id,
            },
        });

        // Update booking with session ID (optional, but good for tracking)
        await bookingsCollection.updateOne(
            { _id: booking._id },
            { $set: { stripeSessionId: checkoutSession.id } }
        );

        return { url: checkoutSession.url };
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return { error: error.message };
    }
}
