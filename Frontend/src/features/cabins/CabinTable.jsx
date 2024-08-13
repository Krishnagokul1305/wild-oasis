import CabinRow from "./CabinRow";

function CabinTable({ cabins }) {
  return (
    <div className="border border-grey-200 text-sm bg-grey-0 rounded-lg overflow-hidden mt-5">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-grey-50 border-b border-grey-100 uppercase tracking-wider font-semibold text-grey-600">
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Cabin</th>
            <th className="p-4 text-left">Capacity</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Discount</th>
            <th className="p-4 text-left"></th>
          </tr>
        </thead>
        <tbody className="">
          {cabins.map(cabin=><CabinRow cabin={cabin} key={cabin._id}/>)}
        </tbody>
      </table>
    </div>
  );
}

export default CabinTable;
