import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import useCheckIn from "./useCheckin";
import useSettings from "../settings/useSettings";
import useBooking from "../bookings/useBooking";

function CheckinBooking() {
  const { booking, bookingLoading } = useBooking();

  const { data: settings, settingLoading } = useSettings();

  let { checkInFn, isChecking } = useCheckIn();

  let isLoading = settingLoading || bookingLoading || isChecking;

  let [confirmPayment, setConfirmPayment] = useState(
    booking?.isPaid ? true : false
  );
  let [addBreakFast, setAddBreakFast] = useState(
    booking?.hasBreakFast ? true : false
  );

  const moveBack = useMoveBack();

  function handleCheckin() {
    const newData = {
      isPaid: confirmPayment,
      hasBreakFast: addBreakFast,
      extraPrice: settings.breakFastPrice,
      totalPrice: booking.totalPrice + settings.breakFastPrice,
    };
    checkInFn({ id: booking?._id, bookingData: newData });
  }

  if (isLoading) return <Spinner />;

  return (
    <div className=" text-xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Check in booking #</h1>
        <button
          className="text-blue-600 hover:text-blue-800 "
          onClick={moveBack}
        >
          &larr; Back
        </button>
      </div>

      <div className="bg-grey-50  rounded-md px-5 flex flex-col gap-3">
        <BookingDataBox booking={booking} />
        {booking.status == "unConfirmed" && (
          <div className=" space-y-3">
            {!booking.hasBreakFast && (
              <Checkbox
                id="breakFast"
                checked={addBreakFast}
                disabled={addBreakFast}
                onChange={() => {
                  setAddBreakFast((hasBreakFast) => !hasBreakFast);
                  setConfirmPayment(false);
                }}
              >
                Want to add breakfast for{" "}
                {formatCurrency(settings.breakFastPrice)}?
              </Checkbox>
            )}

            <Checkbox
              id="confirm"
              checked={confirmPayment}
              disabled={confirmPayment}
              onChange={() => setConfirmPayment((paidStatus) => !paidStatus)}
            >
              I confirm that {booking.user.fullName} has paid the total amount
              of{" "}
              {!addBreakFast
                ? formatCurrency(booking.totalPrice)
                : `${formatCurrency(
                    booking.totalPrice + settings.breakFastPrice
                  )} (${formatCurrency(booking.totalPrice)} + ${formatCurrency(
                    settings.breakFastPrice
                  )})`}
            </Checkbox>
          </div>
        )}
      </div>

      <div className="flex space-x-4 justify-end me-5 mt-5">
        {booking.status == "unConfirmed" && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleCheckin}
            disabled={!confirmPayment}
          >
            Check in booking #
          </button>
        )}
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
