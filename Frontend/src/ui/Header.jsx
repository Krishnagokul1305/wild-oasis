import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="py-4 px-8 bg-grey-0">
      <ul className="flex items-center gap-4 justify-end text-grey-400">
        <li>
          <UserAvatar />
        </li>
        <li
          onClick={() => navigate("account")}
          className="cursor-pointer px-2 py-2  hover:bg-grey-100 rounded-full"
        >
          <HiOutlineUser className="h-5" />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </header>
  );
}

export default Header;
