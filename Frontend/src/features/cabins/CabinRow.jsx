import { CABIN_IMG } from "../../../config/config";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

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
          {discount ? (
            formatCurrency(discount)
          ) : (
            <span className="ms-5">-</span>
          )}
        </td>
        <td className="p-4 flex gap-2">
          <Menus.Menu>
            <Menus.ToggleBtn id={id} />
            <Modal>
              {/* modal to edit cabin */}
              <Menus.MenuList id={id}>
                <Modal.Open opens="edit">
                  <Menus.MenuButton>
                    <button className=" px-3 py-2 rounded-md">edit</button>
                  </Menus.MenuButton>
                </Modal.Open>

                {/* modal to delete cabin */}
                <Modal.Open opens="delete">
                  <Menus.MenuButton>
                    <button className="px-3 py-2 rounded-md">Delete</button>
                  </Menus.MenuButton>
                </Modal.Open>
              </Menus.MenuList>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={`Cabin ${name}`}
                  onConfirm={() => deleteCabin(id)}
                  disabled={isDeleting}
                />
              </Modal.Window>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>
            </Modal>
          </Menus.Menu>
        </td>
      </tr>
    </>
  );
}

export default CabinRow;
