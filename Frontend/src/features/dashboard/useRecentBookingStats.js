import { useQuery } from "@tanstack/react-query";
import { getBookingStats } from "../../services/apiBookings";

function useRecentBookingStats() {
  const { data: recentBookingStats, isLoading: isLoading1 } = useQuery({
    queryKey: ["recentBookings"],
    queryFn: getBookingStats,
  });
  return { recentBookingStats, isLoading1 };
}

export default useRecentBookingStats;
