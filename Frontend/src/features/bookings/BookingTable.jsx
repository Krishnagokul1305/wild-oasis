import { useQuery } from "@tanstack/react-query";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { getBookings } from "../../services/apiBookings";
import BookingRow from "./BookingRow";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";

function BookingTable() {
  const [searchparams] = useSearchParams();
  let currentPage = searchparams.get("page") || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["bookings", currentPage],
    queryFn: () => getBookings(currentPage),
  });

  const bookings = data?.data || [];

  const results = data?.results || 0;

  let filtered = [];

  let filteredObj = searchparams.get("bookings") || "all";

  filtered = bookings.filter((booking) => {
    if (filteredObj == "all") return true;
    if (filteredObj == "Unconfirmed") return booking.status == "unConfirmed";
    if (filteredObj == "checked-in") return booking.status == "checked-in";
    if (filteredObj == "checked-out") return booking.status == "checked-out";
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="border border-grey-200 text-sm bg-grey-0 rounded-lg overflow-hidden mt-5">
      <Menus>
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
              <BookingRow key={booking._id} booking={booking} />
            )}
          />
        </Table>
        <Pagination count={results} />
      </Menus>
    </div>
  );
}

export default BookingTable;
