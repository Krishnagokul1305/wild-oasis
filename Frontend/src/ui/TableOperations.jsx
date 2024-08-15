import Filter from "./Filter";

function TableOperations() {
  return (
    <div>
      <Filter
        options={["all", "discounted", "no-discount"]}
        param="discount"
      />
    </div>
  );
}

export default TableOperations;
