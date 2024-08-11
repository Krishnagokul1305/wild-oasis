import { HiOutlineHome } from "react-icons/hi";
import Logo from "./Logo";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { MdPermIdentity } from "react-icons/md";
import { NavLink } from "react-router-dom";

function SideNav() {
  return (
    <aside className="basis-[20%]  bg-grey-0 p-5 flex flex-col items-center gap-8 shadow-sm">
      <header className="mt-2">
        <Logo />
      </header>
      <nav className="w-full">
        <ul className="space-y-4 text-lg">
          <li>
            <NavLink
              to="/dashboard"
              className="bg-grey-50 px-12 py-3 cursor-pointer flex items-center gap-2 hover:bg-grey-100"
            >
              <HiOutlineHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="bookings"
              className="bg-grey-50 px-12 py-3 cursor-pointer flex items-center gap-2 hover:bg-grey-100"
            >
              <HiOutlineCalendarDays /> Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cabins"
              className="bg-grey-50 px-12 py-3 cursor-pointer flex items-center gap-2 hover:bg-grey-100"
            >
              <HiOutlineHomeModern /> Cabins
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account"
              className="bg-grey-50 px-12 py-3 cursor-pointer flex items-center gap-2 hover:bg-grey-100"
            >
              <MdPermIdentity /> Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="settings"
              className="bg-grey-50 px-12 py-3 cursor-pointer flex items-center gap-2 hover:bg-grey-100"
            >
              <HiOutlineCog6Tooth /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;
