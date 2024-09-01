import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";

function Logout() {
  const { logout, loggingOut } = useLogout();
  return (
    <button onClick={logout} disabled={loggingOut} className="mt-2">
      <HiArrowRightOnRectangle className="h-6 mt-0.5" />
    </button>
  );
}

export default Logout;
