import TenantStatsCards from "@/Components/Apps/Dashboard/TenantStatsCard/TenantStatsCards";
import { getUseerSession } from "@/lib/api/cors/session";
import { getTenentOverview } from "@/lib/api/Tenent/data";

const TenantOverviewPage = async () => {
  const session = await getUseerSession();
  const email = session?.email;
  const bookingsData = await getTenentOverview(email);

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

      <div className="p-6 rounded-xl border border-slate-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li>• Booked a 2-bedroom apartment in Dhaka.</li>
          <li>• Added Luxury Family Flat to favorites.</li>
          <li>• Updated profile information.</li>
          <li>• Viewed 5 new rental properties.</li>
        </ul>
      </div>
    </div>
  );
};

export default TenantOverviewPage;
