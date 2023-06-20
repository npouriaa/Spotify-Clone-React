import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const Searchbar = () => {
  return (
    <form
      autoComplete="off"
      className="p-2 text-gray-300"
    >
      <label htmlFor="search-filed" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          type="text"
          name="search-filed"
          id="search-filed"
          placeholder="search"
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base tecxt-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
