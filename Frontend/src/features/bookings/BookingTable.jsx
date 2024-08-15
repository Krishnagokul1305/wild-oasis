import { useQuery } from "@tanstack/react-query";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { getBookings } from "../../services/apiBookings";
import BookingRow from "./BookingRow";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  let filtered = [];
  const [searchparams] = useSearchParams();
  let filteredObj = searchparams.get("bookings");
  filtered = bookings.filter((booking) => {
    if (filteredObj == "all") return booking;
    if (filteredObj == "Unconfirmed") return booking.status == "unConfirmed";
    if (filteredObj == "checked-in") return booking.status == "checked-in";
    if (filteredObj == "checked-out") return booking.status == "checked-out";
  });

  console.log(filtered);
  if (isLoading) return <Spinner />;

  return (
    <div className="border border-grey-200 text-sm bg-grey-0 rounded-lg overflow-hidden mt-5">
      <Table>
        <Table.TableHead>
          <th className="p-4 text-left">Cabin</th>
          <th className="p-4 text-left">Guest</th>
          <th className="p-4 text-left">Stay Duration</th>
          <th className="p-4 text-left">Status</th>
          <th className="p-4 text-left">Total Price</th>
          <th className="p-4 text-left"></th>
        </Table.TableHead>
        <Table.TableBody
          data={filtered}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </div>
  );
}

export default BookingTable;
