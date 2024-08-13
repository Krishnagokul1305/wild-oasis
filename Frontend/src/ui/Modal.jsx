import { createPortal } from "react-dom";
import { MdOutlineClear } from "react-icons/md";
import useClickDetect from "../hooks/useClickDetect";

const Modal = ({ children, onClose }) => {
  const ref = useClickDetect(onClose);
  console.log("open",onClose);
  return createPortal(
    <div>
      <div
        className="fixed top-0 left-0 w-full h-screen bg-slate-700 bg-opacity-50 backdrop-blur-sm z-50 transition-all duration-500"
        ref={ref}
      />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 transition-all duration-500 z-50">
        <button className="block ms-auto mb-1" onClick={onClose}>
          <MdOutlineClear />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
