"use client";

import { createStripeCheckoutSession } from "@/actions/server/paymentActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PaymentButton({ bookingId, amount }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePayment = async () => {
        setLoading(true);
        try {
            const result = await createStripeCheckoutSession(bookingId);
            if (result.url) {
                window.location.href = result.url; // Use window.location for external redirect
            } else if (result.error) {
                alert(`Payment Error: ${result.error}`);
            }
        } catch (error) {
            console.error("Payment button error:", error);
            alert("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="btn btn-sm btn-primary"
        >
            {loading ? "Processing..." : "Pay Now 💳"}
        </button>
    );
}
