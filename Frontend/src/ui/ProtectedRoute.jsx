import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isLoading, navigate, isAuthenticated]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
    
    if (isAuthenticated) {
      return children;
    }
  
    // Optionally, return null or a different component if the user is not authenticated
    return null;
}

export default ProtectedRoute;
