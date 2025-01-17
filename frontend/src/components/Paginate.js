import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Paginate = ({ page, setPage, data }) => {
  return (
    <div className="flex justify-center items-center text-center p-2 dark:bg-slate-600 bg-white">
      <button
        className={`${
          page !== 1
            ? "text-gray-800 items-center px-4 text-sm font-medium"
            : "px-4 text-sm font-medium text-gray-300 "
        }
        `}
        disabled={page < data.pages - 1}
        onClick={() => setPage(page - 1)}
      >
        <FaChevronLeft />
      </button>

      <span className="text-sm  dark:text-slate-50">
        <span className="font-medium"> {page} </span> of
        <span className="font-medium ">
          {" "}
          {data.pages > 1
            ? `${Math.ceil(data.count / data.pageSize)} pages`
            : `${Math.ceil(data.count / data.pageSize)} page`}
        
        </span>
      </span>

      <button
        className={
          page === 1 || page < data.pages
            ?
              "px-4 text-gray-800 text-sm font-medium"
            : " text-gray-300 px-4 text-sm font-medium"
        }
        disabled={page > data.pages - 1}
        onClick={() => setPage(page + 1)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Paginate;
