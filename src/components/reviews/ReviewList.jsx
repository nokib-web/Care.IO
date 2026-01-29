import React from "react";

export default function ReviewList({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 bg-base-100 rounded-lg border border-dashed">
                No reviews yet. Be the first to review!
            </div>
        );
    }

    return (
        <div className="space-y-4 mt-8">
            <h3 className="text-2xl font-bold">Client Reviews ({reviews.length})</h3>
            {reviews.map((review) => (
                <div key={review._id} className="card bg-base-100 shadow-sm border border-base-200">
                    <div className="card-body py-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                    <span>{review.userName?.charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold">{review.userName}</h4>
                                <div className="text-xs text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="rating rating-sm rating-read-only mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <input
                                    key={star}
                                    type="radio"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={star <= review.rating}
                                    readOnly
                                />
                            ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
