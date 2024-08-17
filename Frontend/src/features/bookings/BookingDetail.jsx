import BookingDataBox from "./BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";

function BookingDetail() {
  const booking = {};
  const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagColor = {
    unconfirmed: "bg-blue-100 text-blue-800",
    "checked-in": "bg-green-100 text-green-800",
    "checked-out": "bg-gray-100 text-gray-800",
  };

  return (
    <>
      <div className="flex justify-between items-center">
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

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={moveBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Back
        </button>
      </div>
    </>
  );
}

export default BookingDetail;
