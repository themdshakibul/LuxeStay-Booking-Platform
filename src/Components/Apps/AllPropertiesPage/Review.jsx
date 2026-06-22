import { Avatar, Button, TextArea } from "@heroui/react";
import React, { useState } from "react";
import { MdStar } from "react-icons/md";

const Review = () => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Reviews & Ratings</h2>
          <p className="text-slate-500 mt-1">
            Share your experience with this property
          </p>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-5">
          <Avatar
            alt="User Avatar"
            src="https://i.pravatar.cc/150?u=user"
            size="lg"
          />

          <div>
            <h4 className="font-semibold">Leave a Review</h4>

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

        <TextArea
          placeholder="Tell future tenants what you liked about this property..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          minRows={5}
          variant="bordered"
          className="mb-5 w-full"
        />

        <Button
          size="lg"
          radius="full"
          className="bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold px-10"
        >
          Submit Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="mt-10 space-y-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="p-6 rounded-3xl  hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <Avatar src={`https://i.pravatar.cc/150?u=${item}`} size="md" />

                <div>
                  <h4 className="font-bold">Rahim Ahmed</h4>

                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <MdStar key={i} size={16} />
                    ))}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    Excellent property with modern facilities, secure
                    environment and great location. Highly recommended for
                    families.
                  </p>
                </div>
              </div>

              <span className="text-sm text-slate-400">2 days ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
