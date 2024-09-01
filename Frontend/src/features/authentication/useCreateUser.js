import { useMutation } from "@tanstack/react-query";
import { createUser as createUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

function useCreateUser(onFinish) {
  const { mutate: createUser, isPending:creating } = useMutation({
    mutationFn: (data) => createUserApi(data),
    onSuccess: () => {
      toast.success("User created successfully");
      onFinish()
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { createUser, creating };
}

export default useCreateUser;
