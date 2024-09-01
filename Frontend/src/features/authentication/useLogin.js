import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
    const navigate=useNavigate()
    const queryClient=useQueryClient()

  const { mutate, isPending: logging } = useMutation({
    mutationFn: (data) => loginApi(data),
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      queryClient.setQueryData(["user"],data?.user)
      toast.success("logged in successfully");
      navigate("/dashboard")
    },
    onError: (err) => {
      console.log(err);
      toast.error("Incorrect email or password");
    },
  });

  return { loginFn: mutate, logging };
}

export default useLogin;
