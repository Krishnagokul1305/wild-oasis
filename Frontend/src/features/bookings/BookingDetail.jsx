import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import useBooking from "./useBooking";
import useCheckOut from "../check-in-out/useCheckOut";

function BookingDetail() {
  const { id } = useParams();

  const { booking, bookingLoading } = useBooking();

  const navigate = useNavigate();

  const status = booking.status;

  const moveBack = useMoveBack();

  const statusToTagColor = {
    unConfirmed: "bg-blue-100 text-blue-800",
    "checked-in": "bg-green-100 text-green-800",
    "checked-out": "bg-gray-100 text-gray-800",
  };

  const { checkOutFn } = useCheckOut(null, id);

  if (bookingLoading) return <Spinner />;

  return (
    <>
      <div className="flex justify-between items-center text-lg">
        <div className="flex gap-6 items-center">
          <h1 className="text-2xl font-semibold text-grey-400">Booking #X</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusToTagColor[status]}`}
          >
            {status.replace("-", " ")}
          </span>
        </div>
        <button
          onClick={moveBack}
          className="text-grey-400 customBlue-600 hover:underline focus:outline-none"
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="mt-4 flex justify-end gap-4 text-lg">
        {status == "unConfirmed" && (
          <button
            onClick={() => navigate(`/bookings/check-in/${id}`)}
            className="bg-customBlue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-3"
          >
            Check-in
          </button>
        )}
        {status == "checked-in" && (
          <button
            className=" bg-customBlue-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-3"
            onClick={() => checkOutFn(id)}
          >
            checkOut
          </button>
        )}
      </div>
    </>
  );
}

export default BookingDetail;
