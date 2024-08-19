import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOut } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckOut(currentPage, bookingId) {
  const queryClient = useQueryClient();

  const { mutate: checkOutFn, isLoading: isCheckingOut } = useMutation({
    mutationFn: (id) => {
      checkOut(id);
    },
    onSuccess: () => {
      toast.success("Booking checked out successfully");
      if (currentPage) {
        queryClient.invalidateQueries(["bookings", currentPage]); // Invalidate the list of bookings
      }

      if (bookingId) {
        queryClient.invalidateQueries(["booking", bookingId]); // Invalidate the single booking
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkOutFn, isCheckingOut };
}

export default useCheckOut;
