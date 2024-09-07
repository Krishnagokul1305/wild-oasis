import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteFn, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => {
      return deleteBooking(id);
    },
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries(["bookings"]); 
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteFn, isDeleting };
}

export default useDeleteBooking;
