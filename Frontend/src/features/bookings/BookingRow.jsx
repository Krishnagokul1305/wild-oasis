import { format, isToday } from "date-fns";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
// import EditBookingForm from "./EditBookingForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Tag from "../../ui/Tag";
// import useDeleteBooking from "./useDeleteBooking";

function BookingRow({
  booking: {
    _id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    user: { fullName: guestName, email },
    cabin: { name: cabinName },
  },
}) {

  const statusToTagName = {
    unConfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <tr className="border-b border-grey-100 text-base px-3">
      <td className="p-4 font-semibold text-gray-600">{cabinName}</td>

      <td className="p-4">
        <div className="flex flex-col gap-0.2">
          <span className="font-medium">{guestName}</span>
          <span className="text-gray-500 text-sm">{email}</span>
        </div>
      </td>

      <td className="p-4">
        <div className="flex flex-col gap-0.2">
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span className="text-gray-500 text-sm">
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </div>
      </td>

      <td className="p-4">
        <Tag type={statusToTagName[status]}>{status}</Tag>
      </td>

      <td className="p-4 font-medium">{formatCurrency(totalPrice)}</td>

      <td className="p-4 flex gap-2">
        {/* Modal to edit booking */}
        <Modal>
          <Modal.Open>
            <button className="border-2 px-3 py-2 rounded-md">Edit</button>
          </Modal.Open>
          <Modal.Window>
            {/* <EditBookingForm bookingToEdit={booking} /> */}
          </Modal.Window>
        </Modal>

        {/* Modal to delete booking */}
        <Modal>
          <Modal.Open>
            <button className="border-2 px-3 py-2 rounded-md">Delete</button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete
              resourceName={`Booking ${bookingId}`}
              // onConfirm={() => deleteBooking(bookingId)}
              // disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </td>
    </tr>
  );
}

export default BookingRow;
