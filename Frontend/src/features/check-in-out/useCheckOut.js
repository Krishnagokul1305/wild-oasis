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
        queryClient.invalidateQueries(["bookings", currentPage]);
      }

      if (bookingId) {
        queryClient.invalidateQueries(["booking", bookingId]);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkOutFn, isCheckingOut };
}

export default useCheckOut;
