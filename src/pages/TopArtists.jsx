import { ArtistCard, Error, Loader, SongCard } from "../components";
import useAxios from "../components/CustomHooks/useAxios";

const TopArtists = () => {
  const { data, loading, error } = useAxios('charts/track');

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {data?.tracks.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
