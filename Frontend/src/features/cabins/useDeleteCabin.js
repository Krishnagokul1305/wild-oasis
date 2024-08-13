import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinService } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabinService(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err),
  });

  return { deleteCabin, isDeleting };
}

export default useDeleteCabin;
