import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";

function Logout() {
  const { logout, loggingOut } = useLogout();
  return (
    <button
      onClick={logout}
      disabled={loggingOut}
      className=" px-2 py-2  hover:bg-grey-100 rounded-full"
    >
      <HiArrowRightOnRectangle className="h-5 mt-0.5" />
    </button>
  );
}

export default Logout;
