import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg mt-5 ms-auto block"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add cabin
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(!isOpen)}>
          <CreateCabinForm onClose={() => setIsOpen(!isOpen)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
