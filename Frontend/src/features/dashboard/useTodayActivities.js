import { useQuery } from "@tanstack/react-query";
import { getTodayActivities } from "../../services/apiBookings";

function useTodayActivities() {
  const { data: todayActivities, isLoading: isLoading3 } = useQuery({
    queryKey: ["todayActivities"],
    queryFn:getTodayActivities,
  });

  return { todayActivities, isLoading3 };
}

export default useTodayActivities;
