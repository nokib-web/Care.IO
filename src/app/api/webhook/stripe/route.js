import { NextResponse } from "next/server";
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
    const body = await req.text();
    const sig = (await headers()).get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed.", err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = session.metadata.bookingId;

        if (bookingId) {
            try {
                const db = await dbconnect();
                const bookingsCollection = db.collection("bookings");

                await bookingsCollection.updateOne(
                    { _id: new ObjectId(bookingId) },
                    { $set: { paymentStatus: "Paid", status: "Confirmed" } } // Auto-confirm if paid? Let's assume yes or keep Pending. Plan said Paid.
                );
                console.log(`Booking ${bookingId} marked as paid.`);
            } catch (error) {
                console.error("Error updating booking payment status:", error);
                return NextResponse.json({ error: "Database update failed" }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
