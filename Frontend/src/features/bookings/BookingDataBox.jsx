import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extraPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    user: { fullName: guestName, email },
    cabin: { name: cabinName },
  } = booking;

  return (
    <section className="bg-grey-0 border border-grey-100 rounded-md overflow-hidden text-lg mt-10 ">
      <header className="bg-customBlue-700 text-customIndigo-100 p-8 flex justify-between items-center text-lg font-medium">
        <div className="flex items-center gap-4 font-semibold text-xl">
          <HiOutlineHomeModern className="h-8 w-8" />
          <p>
            {numNights} nights in Cabin{" "}
            <span className="ml-1 font-semibold text-2xl">{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="p-8 pb-3 pt-10 text-grey-400">
        <div className="flex items-center gap-3 mb-6 text-grey-500">
          <p className="font-medium text-grey-700">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`flex justify-between items-center p-6 rounded-sm mt-6 ${
            isPaid
              ? "bg-green-300 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extraPrice
              )} breakfast)`}
          </DataItem>

          <p className="uppercase text-sm font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      <footer className="p-8 pt-6 text-sm text-right text-grey-500">
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
