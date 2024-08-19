import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useBooking() {
  const { id } = useParams();
  let { data: booking = {}, isLoading: bookingLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  return { booking, bookingLoading };
}

export default useBooking;
