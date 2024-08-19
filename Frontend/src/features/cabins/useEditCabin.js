import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin as updateCabinService } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, formData: data }) => {
      return updateCabinService({ id, data });
    },
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries(["cabin"]); // Invalidate the cabin query
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
