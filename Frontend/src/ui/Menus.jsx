import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import useClickDetect from "../hooks/useClickDetect";

const MenuContext = createContext();
function Menus({ children }) {
  let [openId, setOpenId] = useState("");
  const openMenu = setOpenId;
  function closeMenu() {
    setOpenId("");
  }
  return (
    <MenuContext.Provider value={{ openId, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

function Menu({ children }) {
  return (
    <div className="relative flex items-center justify-end">{children}</div>
  );
}

function ToggleBtn({ id }) {
  const { openMenu, closeMenu, openId } = useContext(MenuContext);
  function handleClick() {
    openId != id ? openMenu(id) : closeMenu();
  }
  return (
    <button
      className="bg-none border-none p-2 rounded-md transform translate-x-3 transition-all duration-200 hover:bg-gray-100 text-gray-700"
      onClick={handleClick}
    >
      <HiEllipsisVertical />
    </button>
  );
}

function MenuList({ id, children }) {
  const { openId, closeMenu } = useContext(MenuContext);

  let ref = useClickDetect(closeMenu);

  if (id !== openId) return null;

  return (
    <ul
      className="absolute right-0 bottom-12 mt-2 bg-gray-50 shadow-md rounded-md py-2 px-3"
      ref={ref}
    >
      {children}
    </ul>
  );
}

function MenuButton({ children, onClick }) {
  const { closeMenu } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    closeMenu();
  }
  return <li onClick={handleClick}>{children}</li>;
}

Menus.Menu = Menu;
Menus.MenuButton = MenuButton;
Menus.ToggleBtn = ToggleBtn;
Menus.MenuList = MenuList;

export default Menus;
