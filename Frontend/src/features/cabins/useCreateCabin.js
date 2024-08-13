import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinService } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createCabinService(data),
    onSuccess: () => {
      toast.success("cabin created successfully");
      queryClient.invalidateQueries("cabin");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin ,isCreating };
}

export default useCreateCabin