import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Searchbar = () => {
  const [searchTerms, setSerachTerms] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerms}`);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
      className="p-2 top-0 text-gray-300 fixed bg-black w-full "
    >
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
