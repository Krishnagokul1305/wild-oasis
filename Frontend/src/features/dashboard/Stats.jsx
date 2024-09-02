import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Number of Bookings
  // const numBookings = bookings?.length||0;

  // 2. Total Sales
  // const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0)||0;

  // 3. Number of Check-ins
  // const checkins = confirmedStays?.length||0;

  // 4. Occupancy Rate
  // const occupation =
  //   confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
  //   (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        // value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        // value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="blue"
        icon={<HiOutlineCalendarDays />}
        // value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        // value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
