import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiUsers";

function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    user: data?.user,
    isLoading,
    isAuthenticated: data?.user?.role === "employee",
  };
}

export default useUser;
