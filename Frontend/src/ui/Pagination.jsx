import { HiOutlineChevronLeft } from "react-icons/hi";
import { HiOutlineChevronRight } from "react-icons/hi";
import { RES_PER_PAGE } from "../../config/config";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const P = ({ children }) => {
  return <p className="text-lg ml-2">{children}</p>;
};

const Buttons = ({ children }) => {
  return <div className="flex gap-5">{children}</div>;
};

const PaginationButton = ({ active, children, disabled, onClick }) => {
  const baseClasses =
    "flex items-center justify-center gap-1 p-1.5 px-3 rounded-sm font-medium text-lg transition-all";
  const activeClasses = active
    ? "bg-brand-600 text-brand-50"
    : "bg-gray-50 text-inherit";
  const hoverClasses = "hover:bg-brand-600 hover:text-brand-50";

  return (
    <button
      className={`${baseClasses} ${activeClasses} ${hoverClasses}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Pagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPage = Math.ceil(count / RES_PER_PAGE);
  let [currentPage, setPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1
  );

  function previousPage() {
    if (currentPage == 1) {
      return;
    }
    currentPage = currentPage - 1;
    setPage(currentPage);
    setSearchParams({ page: currentPage });
  }
  function nextPage() {
    if (currentPage == totalPage) return;
    currentPage = currentPage + 1;
    setPage(currentPage);
    setSearchParams({ page: currentPage });
  }

  return (
    <div className="w-full flex items-center justify-between py-2 px-5">
      <P>
        Showing <span>{(currentPage - 1) * RES_PER_PAGE + 1}</span> to{" "}
        <span>
          {currentPage == totalPage ? count : currentPage * RES_PER_PAGE}
        </span>{" "}
        of <span>{currentPage}</span> / <span>{totalPage}</span>
      </P>
      <Buttons>
        <PaginationButton onClick={previousPage} disabled={currentPage == 1}>
          <HiOutlineChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage == totalPage}
        >
          Next
          <HiOutlineChevronRight />
        </PaginationButton>
      </Buttons>
    </div>
  );
};

export default Pagination;
