"use client";

import { cancelBooking } from "@/actions/server/bookings";
import { useState } from "react";

const CancelBookingButton = ({ bookingId }) => {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;

        setLoading(true);
        const result = await cancelBooking(bookingId);
        setLoading(false);

        if (!result.success) {
            alert(result.message);
        }
    };

    return (
        <button
            onClick={handleCancel}
            disabled={loading}
            className="btn btn-error btn-xs"
        >
            {loading ? "Cancelling..." : "Cancel"}
        </button>
    );
};

export default CancelBookingButton;
