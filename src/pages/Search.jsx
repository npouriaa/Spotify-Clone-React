import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useParams } from "react-router-dom";
import useAxios from "../components/CustomHooks/useAxios";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, loading, error } = useAxios('search' , { term : searchTerm } , searchTerm);
  const songs = data?.tracks?.hits?.map((song) => song.track);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-base text-lg text-white text-left mt-4 mb-10">
        Showing Results for : <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {songs
          ? songs?.map((song, i) => (
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                i={i}
                data={data}
              />
            ))
          : <p className="text-white">Nothing found...</p>}
      </div>
    </div>
  );
};

export default Search;
