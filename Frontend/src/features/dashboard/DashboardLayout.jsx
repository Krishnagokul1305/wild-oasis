import Stats from "./Stats"

const fakeBookings = [
  { id: 1, totalPrice: 300 },
  { id: 2, totalPrice: 450 },
  { id: 3, totalPrice: 200 },
  { id: 4, totalPrice: 600 },
];

const fakeConfirmedStays = [
  { id: 1, numNights: 3 },
  { id: 2, numNights: 5 },
  { id: 3, numNights: 2 },
  { id: 4, numNights: 7 },
];

const fakeNumDays = 30;
const fakeCabinCount = 10;

// Usage in DashboardLayout
function DashboardLayout() {
  const bookings = fakeBookings;
  const confirmedStays = fakeConfirmedStays;
  const numDays = fakeNumDays;
  const cabinCount = fakeCabinCount;

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_34rem_auto] gap-6">
      <div className="col-span-4 grid grid-cols-4 gap-6">
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabinCount}
        />
      </div>
      {/* <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </div>
  );
}

export default DashboardLayout
