import { useEffect } from "react";
import { getAllCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(function () {
    getAllCabins()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>All cabins</h1>
      <p>TEST</p>
    </div>
  );
}

export default Cabins;
