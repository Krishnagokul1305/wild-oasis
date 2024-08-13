import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSettings as updateSettingsService } from "../../services/apiSettings";

function useEditSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isLoading: isEditing } = useMutation({
    mutationFn: (data) => {
      console.log(data);
      updateSettingsService(data);
    },
    onSuccess: () => {
      toast.success("settings Updated successfully");
      queryClient.invalidateQueries("settings");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSettings, isEditing };
}

export default useEditSettings;
