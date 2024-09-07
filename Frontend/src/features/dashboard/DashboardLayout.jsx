import SalesChart from "./SalesChart";
import Stats from "./Stats";
import DurationChart from "./DurationChart";
import useRecentBookingStats from "./useRecentBookingStats";
import useRecentStays from "./useRecentStaysStats";
import TodayActivity from "./TodayActivity";
import useTodayActivities from "./useTodayActivities";
import Spinner from "../../ui/Spinner";

function DashboardLayout() {
  const { recentBookingStats, isLoading1 } = useRecentBookingStats();

  const { recentStays, isLoading2 } = useRecentStays();

  const { todayActivities, isLoading3 } = useTodayActivities();

  const confirmedStays = recentStays;
  const numDays = 7;
  if (isLoading1 || isLoading2 || isLoading3) return  <Spinner/>;
  return (
    <div className="grid grid-cols-4 grid-rows-[auto_auto_auto] gap-8 w-full mt-5">
      <div className="col-span-4 grid grid-cols-4 gap-6 w-full">
        <Stats
          confirmedStays={confirmedStays}
          stats={recentBookingStats}
          numDays={numDays}
        />
      </div>
      <TodayActivity activities={todayActivities} />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart
        bookings={recentBookingStats}
        numDays={numDays}
        confirmedStays={confirmedStays}
      />
    </div>
  );
}

export default DashboardLayout;
