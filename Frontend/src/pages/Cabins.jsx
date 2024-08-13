import { getAllCabins } from "../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import { useState } from "react";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getAllCabins,
  });


  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex items-center justify-between ">
        <h1 className="font-bold">All cabins</h1>
        <p className="text-lg">Filter / sort</p>
      </div>
      <CabinTable cabins={cabins} />
      <AddCabin />
    </>
  );
}

export default Cabins;
