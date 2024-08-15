import { CABIN_IMG } from "../../../config/config";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function CabinRow({ cabin }) {
  const { _id: id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const { deleteCabin, isDeleting } = useDeleteCabin();
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
          {discount?formatCurrency(discount):<span className="ms-5">-</span>}
        </td>
        <td className="p-4 flex gap-2">
          {/* modal to edit cabin */}
          <Modal>
            <Modal.Open>
              <button className="border-2 px-3 py-2 rounded-md">Edit</button>
            </Modal.Open>
            <Modal.Window>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          {/* modal to delete cabin */}
          <Modal>
            <Modal.Open>
              <button className="border-2 px-3 py-2 rounded-md">Delete</button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete
                resourceName={`Cabin ${name}`}
                onConfirm={() => deleteCabin(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </td>
      </tr>
    </>
  );
}

export default CabinRow;
