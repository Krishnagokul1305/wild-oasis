import { QueryClient, useMutation } from "@tanstack/react-query";
import {
  updateUserPassword,
  updateUser as updateUserApi,
} from "../../services/apiUsers";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = new QueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (data) => {
      if (data?.newPassword) {
        return updateUserPassword(data);
      }
      return updateUserApi(data);
    },
    onSuccess: (data) => {
      toast.success("user updated successfully");
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.data));
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}

export default useUpdateUser;
