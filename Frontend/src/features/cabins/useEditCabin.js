import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin as updateCabinService } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, formData:data }) => {
      console.log(id, data);
      updateCabinService({ id, data });
    },
    onSuccess: () => {
      toast.success("cabin update successfully");
      queryClient.invalidateQueries("cabin");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
