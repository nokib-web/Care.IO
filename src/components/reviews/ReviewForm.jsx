"use client";

import { useState } from "react";
import { addReview } from "@/actions/server/reviewActions";
import { useRouter } from "next/navigation";

export default function ReviewForm({ serviceId }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await addReview(serviceId, rating, comment);

        if (result.success) {
            setComment("");
            setRating(5);
            router.refresh(); // Refresh to show new review
            // Optional: Show success toast
        } else {
            alert(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="card bg-base-100 shadow-lg border border-base-200 mt-8">
            <div className="card-body">
                <h3 className="card-title text-lg mb-4">Write a Review</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <div className="rating rating-lg">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <input
                                    key={star}
                                    type="radio"
                                    name="rating"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Comment</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Share your experience..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-control mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full md:w-auto"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
