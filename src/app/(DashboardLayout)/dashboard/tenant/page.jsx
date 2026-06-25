import TenantStatsCards from "@/Components/Apps/Dashboard/TenantStatsCard/TenantStatsCards";
import { getUseerSession } from "@/lib/api/cors/session";
import { getTenentOverview, getUserReviews } from "@/lib/api/Tenent/data";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const TenantOverviewPage = async () => {
  const session = await getUseerSession();
  const email = session?.email;

  const { data } = await authClient.token();
  const token = data?.token;

  // Fetch both data
  const bookingsData = await getTenentOverview(email, token);
  const reviewsData = await getUserReviews(email);

  return (
    <div className="container m-auto space-y-6 min-h-screen">
      <div className="bg-slate-900 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">
          Welcome Back {session?.name} 👋
        </h1>
        <p className="text-slate-300">
          Manage your bookings, favorite properties, and profile from your
          dashboard.
        </p>
      </div>

      <TenantStatsCards bookingsData={bookingsData} />

      {/* Recent Reviews - from new API */}
      <div className="p-6 rounded-xl border border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>

        {reviewsData && reviewsData.length > 0 ? (
          <ul className="space-y-5">
            {reviewsData.map((review) => (
              <li
                key={review?._id}
                className="border-l-4 border-slate-700 pl-5 py-3 bg-slate-950/50 rounded-r-xl"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {review?.userImage && (
                      <Image
                        width={36}
                        height={36}
                        src={review?.userImage}
                        alt={review?.userName}
                        className="w-9 h-9 rounded-full object-cover border border-slate-700"
                      />
                    )}
                    <div>
                      <p className="font-medium text-slate-200">
                        {review.userName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-xl">
                    {"★".repeat(review.rating)}
                  </div>
                </div>

                <p className="text-slate-300 mt-3 leading-relaxed">
                  {review.reviewText}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400 py-12 text-center italic">
            You haven&apos;t written any reviews yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default TenantOverviewPage;
