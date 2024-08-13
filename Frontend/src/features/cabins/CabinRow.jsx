import { CABIN_IMG } from "../../../config/config";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import Modal from "../../ui/Modal";

function CabinRow({ cabin }) {
  const { _id: id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const { deleteCabin, isDeleting } = useDeleteCabin();
  let [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <tr className="border-b border-grey-100 text-base px-3">
        <td className="p-4">
          <img
            src={`${CABIN_IMG}/${image}`}
            className="block w-16 aspect-[3/2] object-cover object-center transform scale-[1.1] -translate-x-1.5"
            alt="image description"
          />
        </td>
        <td className="p-4">{name}</td>
        <td className="p-4">{`fits up to ${maxCapacity} guests`}</td>
        <td className="p-4 font-bold">{formatCurrency(regularPrice)}</td>
        <td className="p-4 text-green-600 font-bold">
          {formatCurrency(discount)}
        </td>
        <td className="p-4 flex gap-2">
          <button
            className="border-2 px-3 py-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            Edit
          </button>
          <button
            className="border-2 px-3 py-2 rounded-md"
            onClick={() => deleteCabin(id)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan="6" className="p-4">
            <Modal onClose={() => setIsOpen(false)}>
              <CreateCabinForm
                cabinToEdit={cabin}
                onClose={() => setIsOpen(false)}
              />
            </Modal>
          </td>
        </tr>
      )}
    </>
  );
}

export default CabinRow;
