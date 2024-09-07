import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIn } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckIn() {
  const queryClient = useQueryClient();

  const { mutate: checkInFn, isLoading: isChecking } = useMutation({
    mutationFn: ({ id, bookingData }) => {
  
      checkIn({ id, bookingData });
    },
    onSuccess: () => {
      toast.success("Booking checked in successfully");
      queryClient.invalidateQueries(["bookings"]);
      queryClient.invalidateQueries(["booking"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkInFn, isChecking };
}

export default useCheckIn;
