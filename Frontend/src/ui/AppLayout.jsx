import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="flex w-full h-screen">
      <SideNav />
      <main className="flex flex-col w-[80%] h-full">
        <Header />
        <section className="flex-1 py-8 px-10 overflow-auto bg-grey-100">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AppLayout;
