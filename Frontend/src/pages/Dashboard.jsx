import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <div className="px-3 py-5 w-full">
      <div className="flex justify-between">
        <h1 className="font-semibold text-grey-500">Dashboards</h1>
        <p className="font-medium text-base text-white px-2 py-1 rounded-md bg-customIndigo-700">Last 7 Days</p>
      </div>

      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
