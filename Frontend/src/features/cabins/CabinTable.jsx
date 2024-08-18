import { useSearchParams } from "react-router-dom";
import CabinRow from "./CabinRow";
import { getAllCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, data: cabins = [] } = useQuery({
    queryKey: ["cabin"],
    queryFn: getAllCabins,
  });
  const [searchParam] = useSearchParams();

  let filterOption = searchParam.get("discount") || "all";
  const filtered = cabins.filter((cabin) => {
    if (filterOption === "all") return true;
    if (filterOption === "discounted") return cabin.discount !== 0;
    if (filterOption === "no-discount") return cabin.discount === 0;
  });

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <div className="border border-grey-200 text-sm bg-grey-0 rounded-lg  mt-5">
        <Table>
          <Table.TableHead>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Cabin</th>
            <th className="p-4 text-left">Capacity</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Discount</th>
            <th className="p-4 text-left"></th>
          </Table.TableHead>
          <Table.TableBody
            data={filtered}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
          />
        </Table>
      </div>
    </Menus>
  );
}

export default CabinTable;
