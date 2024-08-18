import { MdOutlineClear } from "react-icons/md";
import useClickDetect from "../hooks/useClickDetect";
import { cloneElement, createContext, useContext, useState } from "react";

const ModalContext = createContext();

function Modal({ children }) {
  let [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open, close, openName } = useContext(ModalContext);
  function handleClick() {
    openName == opens ? close() : open(opens);
  }
  return cloneElement(children, { onClick:handleClick });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useClickDetect(() => close());
  if (name != openName) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-slate-700 bg-opacity-50 backdrop-blur-sm z-50 transition-all duration-500" />
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 transition-all duration-500 z-50"
      >
        <button className="block ms-auto mb-1" onClick={() => close()}>
          <MdOutlineClear />
        </button>
        {cloneElement(children, { onClose: () => close() })}
      </div>
    </>
  );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
