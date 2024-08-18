import { useQuery } from "@tanstack/react-query";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

function CheckinBooking() {
  const { id } = useParams();

  let { data, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
  });

  let booking = data || {};

  const status = booking.status;

  const moveBack = useMoveBack();

  const { id: bookingId } = booking;

  function handleCheckin() {}

  if (isLoading) return <Spinner />;

  return (
    <div className=" text-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Check in booking #{bookingId}
        </h1>
        <button
          className="text-blue-600 hover:text-blue-800 "
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </div>

      <div className="bg-gray-50  rounded-md p-6 flex flex-col gap-3">
        <BookingDataBox booking={booking} />
        <div className=" space-y-3">
          <Checkbox>i paid the amount for the booking</Checkbox>
          <Checkbox>i paid the amount for the booking</Checkbox>
        </div>
      </div>

      <div className="flex space-x-4 justify-end me-5">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={handleCheckin}
        >
          Check in booking #
        </button>
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          onClick={moveBack}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CheckinBooking;
