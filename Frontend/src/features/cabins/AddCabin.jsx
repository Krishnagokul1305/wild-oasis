import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open>
        <button className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg mt-5">
          Add cabin
        </button>
      </Modal.Open>
      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
