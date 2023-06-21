import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSearchTermsQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSearchTermsQuery({ searchTerm });
  const songs = data?.tracks?.hits?.map((song) => song.track);

  if (isFetching) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  console.log(activeSong);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-xl text-white text-left mt-4 mb-10">
        Showing Results for : <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start xl:justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
