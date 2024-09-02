import SalesChart from "./SalesChart";
import Stats from "./Stats";
import DurationChart from "./DurationChart";
import useRecentBookingStats from "./useRecentBookingStats";
import useRecentStays from "./useRecentStaysStats";

function DashboardLayout() {
  const { recentBookingStats, isLoading1 } = useRecentBookingStats();

  const { recentStays, isLoading2 } = useRecentStays();

  const confirmedStays = recentStays;
  const numDays = 7;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_auto_auto] gap-8 w-full mt-5">
      <div className="col-span-4 grid grid-cols-4 gap-6 w-full">
        <Stats confirmedStays={confirmedStays} numDays={numDays} />
      </div>
      {/* <TodayActivity />*/}
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookingStats} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
