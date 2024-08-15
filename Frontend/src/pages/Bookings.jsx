import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {

  return (
    <>
      <div className="flex items-center justify-between ">
        <h1 className="font-bold">All Bookings</h1>
        <BookingTableOperations/>
      </div>
      <BookingTable />
    </>
  );
}

export default Bookings;
