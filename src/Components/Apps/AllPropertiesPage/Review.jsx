/* eslint-disable react-hooks/immutability */
"use client";

import { Avatar, Button } from "@heroui/react";
import { Textarea } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { MdStar } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { getPropertyReviews } from "@/lib/api/Tenent/data";
import { submitReview } from "@/lib/api/Tenent/action";
import Image from "next/image";

const Review = ({ propertyId }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (propertyId) {
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getPropertyReviews(propertyId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit a review!");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write a review!");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        propertyId,
        email: user.email,
        userName: user.name,
        userImage: user.image,
        rating,
        reviewText,
        createdAt: new Date().toISOString(),
      };

      const data = await submitReview(payload);
      if (data) {
        toast.success("Review submitted!");
        setReviewText("");
        setRating(5);
        fetchReviews();
      }
    } catch (error) {
      console.error("Submit review failed:", error);
      toast.error("Failed to submit review!");
    } finally {
      setSubmitting(false);
    }
  };

  const timeAgo = (dateStr) => {
    // eslint-disable-next-line react-hooks/purity
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Reviews & Ratings</h2>
          <p className="text-slate-500 mt-1">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""} for this
            property
          </p>
        </div>
      </div>

      {/* Review Form */}
      {user ? (
        <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-5">
            <Image
              width={100}
              height={100}
              alt={user.name}
              src={user.image}
              size="lg"
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-violet-600 shrink-0 object-cover object-center"
            />
            <div>
              <h4 className="font-semibold">{user.name}</h4>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MdStar
                    key={star}
                    size={28}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition-all duration-300 hover:scale-125 ${
                      star <= rating ? "text-yellow-400" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Textarea
            placeholder="Tell future tenants what you liked about this property..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            minRows={4}
            variant="bordered"
            className="mb-5 w-full"
          />

          <Button
            size="lg"
            radius="full"
            isLoading={submitting}
            onClick={handleSubmit}
            className="bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold px-10"
          >
            Submit Review
          </Button>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 mb-8 text-center">
          <p className="text-slate-500 font-medium">
            Please login to submit a review.
          </p>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <p className="text-slate-400 text-center py-6">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-slate-400 text-center py-6 italic">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <Image
                    width={100}
                    height={100}
                    alt="user"
                    src={review.userImage}
                    size="lg"
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-violet-600 shrink-0 object-cover object-center"
                  />
                  <div>
                    <h4 className="font-bold">{review.userName}</h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <MdStar
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-slate-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                      {review.reviewText}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-slate-400 shrink-0">
                  {timeAgo(review.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
