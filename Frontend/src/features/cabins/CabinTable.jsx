// import styled from "styled-components";

import CabinRow from "./CabinRow";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

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
