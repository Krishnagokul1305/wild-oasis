import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import TableOperations from "../ui/TableOperations";

function Cabins() {
 
  return (
    <>
      <div className="flex items-center justify-between ">
        <h1 className="font-bold text-grey-400">All cabins</h1>
        <TableOperations/>
      </div>
      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
