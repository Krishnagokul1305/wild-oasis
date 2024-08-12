import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CABIN_IMG } from "../../../config/config";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

function CabinRow({ cabin }) {
  const { _id: id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err),
  });

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
            onClick={() => setShowForm(!showForm)}
          >
            Edit
          </button>
          <button
            className="border-2 px-3 py-2 rounded-md"
            onClick={() => mutate(id)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </td>
      </tr>
      {showForm && (
        <tr>
          <td colSpan="6" className="p-4">
            <CreateCabinForm cabinToEdit={cabin} />
          </td>
        </tr>
      )}
    </>
  );
}

export default CabinRow;
