import { format, isToday } from "date-fns";
import Modal from "../../ui/Modal";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
// import EditBookingForm from "./EditBookingForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import { HiEye } from "react-icons/hi";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
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
  currentPage,
}) {
  const statusToTagName = {
    unConfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  const { checkOutFn } = useCheckOut(currentPage, bookingId);

  const { deleteFn } = useDeleteBooking();

  return (
    <tr className="border-b border-grey-100 text-base px-3">
      <td className="p-4 font-semibold text-grey-600">{cabinName}</td>

      <td className="p-4">
        <div className="flex flex-col gap-0.2">
          <span className="font-medium">{guestName}</span>
          <span className="text-grey-500 text-sm">{email}</span>
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
        <Menus.Menu>
          <Menus.ToggleBtn id={bookingId} />
          <Modal>
            <Menus.MenuList id={bookingId}>
              <Menus.MenuButton>
                <button
                  className=" px-3 py-2 rounded-md flex items-center gap-2"
                  onClick={() => navigate(`/bookings/${bookingId}`)}
                >
                  <HiEye />
                  view
                </button>
              </Menus.MenuButton>
              {status == "unConfirmed" && (
                <Menus.MenuButton
                  onClick={() => navigate(`/bookings/check-in/${bookingId}`)}
                >
                  <button className=" px-3 py-2 rounded-md flex items-center gap-2">
                    <HiArrowDownOnSquare />
                    checkIn
                  </button>
                </Menus.MenuButton>
              )}
              {status == "checked-in" && (
                <Menus.MenuButton onClick={() => checkOutFn(bookingId)}>
                  <button className=" px-3 py-2 rounded-md flex items-center gap-2">
                    <HiArrowUpOnSquare />
                    checkOut
                  </button>
                </Menus.MenuButton>
              )}
              <Menus.MenuButton>
                <button
                  className=" px-3 py-2 rounded-md flex items-center gap-2"
                  onClick={() => deleteFn(bookingId)}
                >
                  <HiTrash />
                  Delete
                </button>
              </Menus.MenuButton>
            </Menus.MenuList>
            <Modal.Window></Modal.Window>
            <Modal.Window>
              <ConfirmDelete resourceName={`Booking ${bookingId}`} />
            </Modal.Window>
          </Modal>
        </Menus.Menu>
      </td>
    </tr>
  );
}

export default BookingRow;
