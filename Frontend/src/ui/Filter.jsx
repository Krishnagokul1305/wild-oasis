import { useSearchParams } from "react-router-dom";

const Filter = ({ options, activeOption, param }) => {
  const [searchParam, setSearchParam] = useSearchParams();

  function handleClick(opt) {
    setSearchParam({ [param]: opt });
  }
  const active = searchParam.get(param) || options[0];
  return (
    <div className="border border-grey-100  shadow-sm rounded-sm p-1 flex gap-1 bg-grey-0 text-grey-500">
      {options.map((option) => (
        <button
          key={option}
          className={` border-none rounded-sm font-medium text-sm px-3 py-1 transition-all duration-300 ${
            active === option ? "bg-indigo-600 text-blue-50" : ""
          } hover:bg-indigo-600 hover:text-blue-50`}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Filter;
