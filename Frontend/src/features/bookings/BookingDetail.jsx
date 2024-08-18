import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";

function BookingDetail() {
  const { id } = useParams();

  let { data, isLoading } = useQuery({
    queryKey: ["booking",id],
    queryFn: () => getBooking(id),
  });

  let booking = data || {};

  const navigate = useNavigate();

  const status=booking.status

  const moveBack = useMoveBack();

  const statusToTagColor = {
    unConfirmed: "bg-blue-100 text-blue-800",
    "checked-in": "bg-green-100 text-green-800",
    "checked-out": "bg-gray-100 text-gray-800",
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex justify-between items-center text-lg">
        <div className="flex gap-6 items-center">
          <h1 className="text-2xl font-semibold">Booking #X</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusToTagColor[status]}`}
          >
            {status.replace("-", " ")}
          </span>
        </div>
        <button
          onClick={moveBack}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          &larr; Back
        </button>
      </div>

      <BookingDataBox booking={booking} />

      <div className="mt-4 flex justify-end gap-4 text-lg">
      <button onClick={() => navigate(`/bookings/check-in/${id}`)}>
        Check-in
      </button>
      </div>
    </>
  );
}

export default BookingDetail;
