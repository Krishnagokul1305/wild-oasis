import { useQuery } from "@tanstack/react-query";
import { getRecentStay } from "../../services/apiBookings";

function useRecentStays() {
  const { data: recentStays, isLoading: isLoading2 } = useQuery({
    queryKey: ["recentStays"],
    queryFn: getRecentStay,
  });

  return { recentStays, isLoading2 };
}

export default useRecentStays;
