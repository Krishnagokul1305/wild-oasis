import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ stats,confirmedStays }) {
 
  const numBookings = stats?.reduce((acc, cur) => acc + cur.numBookings, 0)||0;
  const sales = stats?.reduce((acc, cur) => acc + cur.totalSales, 0)||0;
  const extraSales = stats?.reduce((acc, cur) => acc + cur.extrasSales, 0)||0;
  const checkins = confirmedStays?.length||0;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="blue"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="ExtraSales"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={formatCurrency(extraSales)}
      />
    </>
  );
}

export default Stats;
