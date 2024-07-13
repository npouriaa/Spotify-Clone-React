import axios from "axios";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useEffect, useState } from "react";

const Discover = () => {
  const [genreName, setGenreName] = useState("Pop");
  const [genreData, setGenreData] = useState([]);
  const [genreDataLoading, setGenreDataLoading] = useState(false);
  const [genreDataError, setGenreDataError] = useState("");

  const GetByGenre = async () => {
    const options = {
      method: "GET",
      url: "https://shazam-core7.p.rapidapi.com/charts/get-top-songs-in_world_by_genre",
      params: { genre: genreName || "pop" },
      headers: {
        "X-RapidAPI-Key": "5ea2e1d844msh1cfce842e7192dep12cd96jsn75764fde1511",
        "X-RapidAPI-Host": "shazam-core7.p.rapidapi.com",
      },
    };

    setGenreDataLoading(true);
    try {
      const response = await axios.request(options);
      setGenreData(response.data?.tracks);
    } catch (error) {
      console.error(error);
      setGenreDataError(error);
    }

    setGenreDataLoading(false);
  };

  useEffect(() => {
    GetByGenre();
  }, [genreName]);

  if (genreDataLoading) {
    return <Loader />;
  }

  if (genreDataError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-xl text-white text-left">
          Discover {genreName}
        </h2>
        <select
          onChange={(e) => {
            setGenreName(e.target.value);
          }}
          value={genreName || "POP"}
          className="bg-black text-gray-300 rounded-lg p-3 text-sm outline-none sm:mt-0 mt-5 cursor-pointer"
        >
          {genres.map((genre) => (
            <option className="cursor-pointer" key={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-6 ">
        {genreData?.map((song, i) => (
          <SongCard key={song.key} song={song} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
