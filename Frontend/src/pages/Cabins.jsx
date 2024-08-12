import { getAllCabins } from "../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";

function Cabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getAllCabins,
  });

  let [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex items-center justify-between ">
        <h1 className="font-bold">All cabins</h1>
        <p className="text-lg">Filter / sort</p>
      </div>
      <CabinTable cabins={cabins} />
      <button
        className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-lg mt-5 ms-auto block"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add cabin
      </button>
      {isOpen && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
