import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();

  const { mutate, isPending: loggingOut } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      toast.success("logged out successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });

  return { logout: mutate, loggingOut };
}

export default useLogout;
