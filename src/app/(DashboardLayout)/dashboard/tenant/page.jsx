// import TenantStatsCards from "@/Components/Apps/Dashboard/TenantStatsCard/TenantStatsCards";
// import { getUseerSession } from "@/lib/api/cors/session";
// import { getTenentOverview, getUserReviews } from "@/lib/api/Tenent/data";
// import { authClient } from "@/lib/auth-client";
// import Image from "next/image";

// const TenantOverviewPage = async () => {
//   const session = await getUseerSession();
//   const email = session?.email;

//   const { data } = await authClient.token();
//   const token = data?.token;
//   console.log(token);

//   // Fetch both data
//   const bookingsData = await getTenentOverview(email, token);
//   const reviewsData = await getUserReviews(email);

//   return (
//     <div className="container m-auto space-y-6 min-h-screen">
//       <div className="bg-slate-900 text-white p-8 rounded-2xl">
//         <h1 className="text-3xl font-bold mb-2">
//           Welcome Back {session?.name} 👋
//         </h1>
//         <p className="text-slate-300">
//           Manage your bookings, favorite properties, and profile from your
//           dashboard.
//         </p>
//       </div>

//       <TenantStatsCards bookingsData={bookingsData} />

//       {/* Recent Reviews - from new API */}
//       <div className="p-6 rounded-xl border border-slate-800 shadow-sm">
//         <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>

//         {reviewsData && reviewsData.length > 0 ? (
//           <ul className="space-y-5">
//             {reviewsData.map((review) => (
//               <li
//                 key={review?._id}
//                 className="border-l-4 border-slate-700 pl-5 py-3 bg-slate-950/50 rounded-r-xl"
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="flex items-center gap-3">
//                     {review?.userImage && (
//                       <Image
//                         width={36}
//                         height={36}
//                         src={review?.userImage}
//                         alt={review?.userName}
//                         className="w-9 h-9 rounded-full object-cover border border-slate-700"
//                       />
//                     )}
//                     <div>
//                       <p className="font-medium text-slate-200">
//                         {review.userName}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         {new Date(review.createdAt).toLocaleDateString(
//                           "en-US",
//                           {
//                             year: "numeric",
//                             month: "short",
//                             day: "numeric",
//                           },
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-1 text-amber-400 text-xl">
//                     {"★".repeat(review.rating)}
//                   </div>
//                 </div>

//                 <p className="text-slate-300 mt-3 leading-relaxed">
//                   {review.reviewText}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-slate-400 py-12 text-center italic">
//             You haven&apos;t written any reviews yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TenantOverviewPage;

// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import TenantStatsCards from "@/Components/Apps/Dashboard/TenantStatsCard/TenantStatsCards";
// import { authClient } from "@/lib/auth-client";
// import { getTenentOverview, getUserReviews } from "@/lib/api/Tenent/data";

// function StarRating({ rating }) {
//   return (
//     <div className="flex items-center gap-0.5">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <span
//           key={i}
//           className={`text-lg ${i < rating ? "text-amber-400" : "text-slate-700"}`}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// function SkeletonCard() {
//   return (
//     <div className="animate-pulse border-l-4 border-slate-800 pl-5 py-3 bg-slate-950/50 rounded-r-xl space-y-3">
//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-slate-800" />
//           <div className="space-y-1.5">
//             <div className="h-3.5 w-28 bg-slate-800 rounded" />
//             <div className="h-2.5 w-16 bg-slate-800 rounded" />
//           </div>
//         </div>
//         <div className="h-5 w-20 bg-slate-800 rounded" />
//       </div>
//       <div className="h-3 w-full bg-slate-800 rounded" />
//       <div className="h-3 w-4/5 bg-slate-800 rounded" />
//     </div>
//   );
// }

// const TenantOverviewPage = () => {
//   const [session, setSession] = useState(null);
//   const [bookingsData, setBookingsData] = useState(null);
//   const [reviewsData, setReviewsData] = useState([]);

//   const [loadingSession, setLoadingSession] = useState(true);
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingReviews, setLoadingReviews] = useState(true);

//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const result = await authClient.getSession();
//         console.log("Session result:", result); // debug

//         const user = result?.data?.user ?? result?.data?.session?.user ?? null;
//         setSession(user);

//         if (!user) {
//           setLoadingBookings(false);
//           setLoadingReviews(false);
//         }
//       } catch (err) {
//         console.error("Session fetch failed:", err);
//         setError("Could not load your session.");
//         setLoadingBookings(false);
//         setLoadingReviews(false);
//       } finally {
//         setLoadingSession(false);
//       }
//     };
//     fetchSession();
//   }, []);

//   useEffect(() => {
//     if (!session?.email) return;

//     const fetchData = async () => {
//       try {
//         const { data: tokenData } = await authClient.token();
//         const token = tokenData?.token;

//         const [bookings, reviews] = await Promise.all([
//           getTenentOverview(session.email, token),
//           getUserReviews(session.email),
//         ]);

//         setBookingsData(bookings);
//         setReviewsData(reviews ?? []);
//       } catch (err) {
//         console.error("Data fetch failed:", err);
//         setError("Could not load your dashboard data. Please try again.");
//       } finally {
//         setLoadingBookings(false);
//         setLoadingReviews(false);
//       }
//     };

//     fetchData();
//   }, [session?.email]);

//   if (error) {
//     return (
//       <div className="container m-auto min-h-screen flex items-center justify-center">
//         <div className="text-center space-y-3 p-8 border border-red-900/40 bg-red-950/20 rounded-2xl max-w-md">
//           <p className="text-2xl">⚠️</p>
//           <p className="text-red-400 font-medium">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors"
//           >
//             Reload page
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container m-auto space-y-6 min-h-screen">
//       {/* Welcome banner */}
//       <div className="bg-slate-900 text-white p-8 rounded-2xl">
//         {loadingSession ? (
//           <div className="animate-pulse space-y-2">
//             <div className="h-8 w-64 bg-slate-700 rounded" />
//             <div className="h-4 w-96 bg-slate-700 rounded" />
//           </div>
//         ) : (
//           <>
//             <h1 className="text-3xl font-bold mb-2">
//               Welcome Back {session?.name} 👋
//             </h1>
//             <p className="text-slate-300">
//               Manage your bookings, favourite properties, and profile from your
//               dashboard.
//             </p>
//           </>
//         )}
//       </div>

//       {/* Stats cards */}
//       {loadingBookings ? (
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <div
//               key={i}
//               className="animate-pulse h-28 bg-slate-900 rounded-xl"
//             />
//           ))}
//         </div>
//       ) : (
//         <TenantStatsCards bookingsData={bookingsData} />
//       )}

//       {/* Recent reviews */}
//       <div className="p-6 rounded-xl border border-slate-800 shadow-sm">
//         <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>

//         {loadingReviews ? (
//           <ul className="space-y-5">
//             {Array.from({ length: 3 }).map((_, i) => (
//               <li key={i}>
//                 <SkeletonCard />
//               </li>
//             ))}
//           </ul>
//         ) : reviewsData.length > 0 ? (
//           <ul className="space-y-5">
//             {reviewsData.map((review) => (
//               <li
//                 key={review?._id}
//                 className="border-l-4 border-slate-700 pl-5 py-3 bg-slate-950/50 rounded-r-xl"
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="flex items-center gap-3">
//                     {review?.userImage && (
//                       <Image
//                         width={36}
//                         height={36}
//                         src={review.userImage}
//                         alt={review.userName}
//                         className="w-9 h-9 rounded-full object-cover border border-slate-700"
//                       />
//                     )}
//                     <div>
//                       <p className="font-medium text-slate-200">
//                         {review.userName}
//                       </p>
//                       <p className="text-xs text-slate-500">
//                         {new Date(review.createdAt).toLocaleDateString(
//                           "en-US",
//                           { year: "numeric", month: "short", day: "numeric" },
//                         )}
//                       </p>
//                     </div>
//                   </div>

//                   <StarRating rating={review.rating} />
//                 </div>

//                 <p className="text-slate-300 mt-3 leading-relaxed">
//                   {review.reviewText}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-slate-400 py-12 text-center italic">
//             You haven&apos;t written any reviews yet.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TenantOverviewPage;




"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TenantStatsCards from "@/Components/Apps/Dashboard/TenantStatsCard/TenantStatsCards";
import { authClient } from "@/lib/auth-client";
import { getTenentOverview, getUserReviews } from "@/lib/api/Tenent/data";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < rating ? "text-amber-400" : "text-slate-700"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse border-l-4 border-slate-800 pl-5 py-3 bg-slate-950/50 rounded-r-xl space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-800" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-28 bg-slate-800 rounded" />
            <div className="h-2.5 w-16 bg-slate-800 rounded" />
          </div>
        </div>
        <div className="h-5 w-20 bg-slate-800 rounded" />
      </div>
      <div className="h-3 w-full bg-slate-800 rounded" />
      <div className="h-3 w-4/5 bg-slate-800 rounded" />
    </div>
  );
}

const TenantOverviewPage = () => {
  const [session, setSession] = useState(null);
  const [token, setToken] = useState(null);
  const [bookingsData, setBookingsData] = useState(null);
  const [reviewsData, setReviewsData] = useState([]);

  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionAndToken = async () => {
      try {
        // Session fetch
        const sessionResult = await authClient.getSession();

        const user =
          sessionResult?.data?.user ??
          sessionResult?.data?.session?.user ??
          null;

        if (!user) {
          setError("Session not found. Please login again.");
          setLoadingBookings(false);
          setLoadingReviews(false);
          return;
        }

        setSession(user);

        // Token fetch
        const tokenResult = await authClient.token();

        const jwt =
          tokenResult?.data?.token ??
          tokenResult?.data?.jwt ??
          tokenResult?.token ??
          null;

        if (!jwt) {
          setError("Token not found. Please login again.");
          setLoadingBookings(false);
          setLoadingReviews(false);
          return;
        }

        setToken(jwt);
      } catch (err) {
        setError("Authentication failed. Please refresh.");
        setLoadingBookings(false);
        setLoadingReviews(false);
      } finally {
        setLoadingSession(false);
      }
    };

    fetchSessionAndToken();
  }, []);

  useEffect(() => {
    if (!session?.email || !token) return;

    const fetchData = async () => {
      try {
        const [bookings, reviews] = await Promise.all([
          getTenentOverview(session.email, token),
          getUserReviews(session.email),
        ]);

        setBookingsData(bookings);
        setReviewsData(reviews ?? []);
      } catch (err) {
        setError("Could not load dashboard data. Please try again.");
      } finally {
        setLoadingBookings(false);
        setLoadingReviews(false);
      }
    };

    fetchData();
  }, [session?.email, token]);

  if (error) {
    return (
      <div className="container m-auto min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3 p-8 border border-red-900/40 bg-red-950/20 rounded-2xl max-w-md">
          <p className="text-2xl">⚠️</p>
          <p className="text-red-400 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm transition-colors"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container m-auto space-y-6 min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl">
        {loadingSession ? (
          <div className="animate-pulse space-y-2">
            <div className="h-8 w-64 bg-slate-700 rounded" />
            <div className="h-4 w-96 bg-slate-700 rounded" />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">
              Welcome Back {session?.name} 👋
            </h1>
            <p className="text-slate-300">
              Manage your bookings, favourite properties, and profile from your
              dashboard.
            </p>
          </>
        )}
      </div>

      {/* Stats Cards */}
      {loadingBookings ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-28 bg-slate-900 rounded-xl"
            />
          ))}
        </div>
      ) : (
        <TenantStatsCards bookingsData={bookingsData} />
      )}

      {/* Recent Reviews */}
      <div className="p-6 rounded-xl border border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>

        {loadingReviews ? (
          <ul className="space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i}>
                <SkeletonCard />
              </li>
            ))}
          </ul>
        ) : reviewsData.length > 0 ? (
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
                        src={review.userImage}
                        alt={review.userName}
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
                  <StarRating rating={review.rating} />
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
