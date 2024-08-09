import Logo from "./Logo";

function SideNav() {
  return (
    <aside className="basis-[20%]  bg-grey-0">
      <header>
        <Logo />
        nav
      </header>
      <nav>
        <ul>
          <li>Home</li>
          <li>Bookings</li>
          <li>Cabins</li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;
