import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchBar = () => {
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        className="block w-full p-2 lg:p-3 rounded-lg border border-main-btn-color focus:outline-none focus:ring-main-btn-color text-slate-600 text-left"
        placeholder="Search products..."
      />{" "}
      {keyword && (
        <p
          className="absolute right-10 top-0 md:top-1 end-0 p-2.5 text-sm text-slate-700 font-bold h-4 cursor-pointer"
          onClick={() => setKeyword("")}
        >
          X
        </p>
      )}
      <button
        type="submit"
        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#630000] rounded-e-lg border border-main-btn-color hover:bg-[#b20000] focus:outline-none focus:ring-green-700"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
