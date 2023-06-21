import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerms, setSerachTerms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerms}`);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} autoComplete="off" className="p-2 text-gray-300">
      <label htmlFor="search-filed" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
        value={searchTerms}
        onChange={(e) => setSerachTerms(e.target.value)}
          type="text"
          name="search-filed"
          id="search-filed"
          placeholder="search"
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
