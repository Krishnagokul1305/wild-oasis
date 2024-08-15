import Filter from "../../ui/Filter";

function BookingTableOperations() {
  return (
    <div>
      <Filter
        options={["all", "Unconfirmed", "checked-in", "checked-out"]}
        param={"bookings"}
      />
    </div>
  );
}

export default BookingTableOperations;
